import { TemplateBlockConfig } from "./blocks/template-engine";

export interface ModerationResult {
  allowed: boolean;
  reason?: string;
  matched?: string;
}

// 1. Từ khóa thu thập thông tin tài chính nhạy cảm / Phishing (C1)
const PHISHING_PATTERNS: { pattern: RegExp; reason: string }[] = [
  {
    pattern: /\b(mật\s*khẩu\s*ngân\s*hàng|nhập\s*mật\s*khẩu|mã\s*otp|nhập\s*otp|mã\s*xác\s*thực\s*otp)\b/i,
    reason: "Phát hiện nội dung yêu cầu mật khẩu ngân hàng hoặc mã OTP.",
  },
  {
    pattern: /\b(số\s*thẻ\s*tín\s*dụng|số\s*thẻ\s*atm|mã\s*cvv|mã\s*cvc|cccd\s*2\s*mặt|chứng\s*minh\s*thư\s*2\s*mặt)\b/i,
    reason: "Phát hiện yêu cầu thu thập thông tin thẻ tín dụng (CVV/CVC) hoặc giấy tờ tùy thân nhạy cảm.",
  },
  {
    pattern: /\b(cờ\s*bạc|cá\s*độ\s*bóng\s*đá|nổ\s*hũ|nhà\s*cái\s*uy\s*tín|tín\s*dụng\s*đen|vay\s*nóng\s*không\s*thế\s*chấp)\b/i,
    reason: "Phát hiện nội dung vi phạm pháp luật (cờ bạc, cá độ hoặc tín dụng đen).",
  },
];

// 2. Thương hiệu ngân hàng / ví điện tử kết hợp từ khóa xác thực tài khoản
const SENSITIVE_BRANDS_RE = /\b(vietcombank|techcombank|bidv|vpbank|mbbank|acb|tpbank|agribank|sacombank|vietinbank|momo|zalopay|vnpay|meta|paypal)\b/i;
const AUTH_VERIFY_RE = /\b(xác\s*minh\s*tài\s*khoản|khóa\s*tài\s*khoản|cập\s*nhật\s*sinh\s*trắc\s*học|đăng\s*nhập\s*ngân\s*hàng|nhận\s*quà\s*tri\s*ân\s*ngân\s*hàng|hoàn\s*tiền\s*thẻ)\b/i;

function flattenConfigText(cfg: TemplateBlockConfig): string {
  const parts: string[] = [
    cfg.brandName,
    cfg.tagline,
    cfg.headline,
    cfg.subheadline,
    cfg.discountText,
    cfg.hotline,
    ...cfg.features.flatMap((f) => [f.title, f.desc]),
    ...cfg.pricing.flatMap((p) => [p.name, p.price, p.originalPrice, p.desc, p.badge || ""]),
    ...cfg.testimonials.flatMap((t) => [t.name, t.role, t.comment]),
  ];
  return parts.join(" \n ");
}

/**
 * Kiểm duyệt cấu hình Landing Page trước khi cho phép Xuất bản công khai (Mục C1).
 */
export async function moderateLandingPage(cfg: TemplateBlockConfig): Promise<ModerationResult> {
  const fullText = flattenConfigText(cfg);

  for (const rule of PHISHING_PATTERNS) {
    const m = fullText.match(rule.pattern);
    if (m) {
      return {
        allowed: false,
        reason: rule.reason,
        matched: m[0],
      };
    }
  }

  const brandMatch = fullText.match(SENSITIVE_BRANDS_RE);
  const authMatch = fullText.match(AUTH_VERIFY_RE);
  if (brandMatch && authMatch) {
    return {
      allowed: false,
      reason: `Phát hiện dấu hiệu mạo danh tổ chức tài chính/thương hiệu lớn (${brandMatch[0]}) để yêu cầu xác minh tài khoản.`,
      matched: `${brandMatch[0]} + ${authMatch[0]}`,
    };
  }

  // Nếu có OPENAI_API_KEY, gọi thêm OpenAI Moderation API (với timeout ngắn, không làm treo nếu lỗi mạng)
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  if (openAiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/moderations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({ input: fullText.slice(0, 4000) }),
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        const result = data?.results?.[0];
        if (result?.flagged) {
          const flaggedCats = Object.entries(result.categories || {})
            .filter(([, v]) => Boolean(v))
            .map(([k]) => k)
            .join(", ");
          return {
            allowed: false,
            reason: `Nội dung bị chặn bởi bộ lọc an toàn AI (${flaggedCats || "vi phạm tiêu chuẩn cộng đồng"}).`,
            matched: flaggedCats,
          };
        }
      }
    } catch {
      // Bỏ qua nếu OpenAI Moderation không phản hồi kịp
    }
  }

  return { allowed: true };
}
