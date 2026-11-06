import crypto from "crypto";
import { LeadSubmission } from "./types";
import { escapeHtml } from "./blocks/template-engine";

/**
 * Gửi thông báo khách hàng mới qua Email (Resend API) và Webhook (HMAC-SHA256) (Mục C3).
 * Chạy bất đồng bộ để không làm chậm tốc độ phản hồi khi khách bấm gửi form.
 */
export async function sendEmailLeadNotification(
  lead: LeadSubmission,
  recipientEmail: string
): Promise<{ success: boolean; error?: string }> {
  const to = recipientEmail.trim();
  if (!to) return { success: false, error: "Chưa cấu hình địa chỉ email nhận." };

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim() || "PromptToSite <onboarding@resend.dev>";

  if (!apiKey) {
    // Ở môi trường dev chưa có RESEND_API_KEY, ghi log mô phỏng thành công
    console.info(`[Email Notification Demo] Gửi tới ${to}: Khách mới ${lead.fullName} - ${lead.phone}`);
    return { success: true };
  }

  try {
    const html = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:20px;border:1px solid #e2e8f0;border-radius:16px">
        <h2 style="color:#0f172a;margin:0 0 12px">🔔 Khách hàng mới từ ${escapeHtml(lead.projectName || "PromptToSite")}</h2>
        <p style="margin:6px 0"><strong>Họ và tên:</strong> ${escapeHtml(lead.fullName)}</p>
        <p style="margin:6px 0"><strong>Số điện thoại:</strong> <a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></p>
        <p style="margin:6px 0"><strong>Ghi chú nhu cầu:</strong> ${escapeHtml(lead.note || "Không có")}</p>
        <p style="margin:6px 0;color:#64748b;font-size:12px">Thời gian: ${escapeHtml(lead.submittedAt)}</p>
      </div>
    `;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[PromptToSite] Khách hàng mới: ${lead.fullName} (${lead.phone})`,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const errText = await res.text();
      return { success: false, error: `Resend lỗi ${res.status}: ${errText}` };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Lỗi gửi email Resend" };
  }
}

export async function dispatchLeadWebhook(
  lead: LeadSubmission,
  webhookUrl: string,
  webhookSecret?: string,
  maxRetries = 3
): Promise<{ success: boolean; status?: number; error?: string }> {
  const url = webhookUrl.trim();
  if (!url || !/^https?:\/\//i.test(url)) {
    return { success: false, error: "URL Webhook không hợp lệ" };
  }

  const payload = JSON.stringify({
    event: "lead.created",
    timestamp: new Date().toISOString(),
    lead,
    site: {
      projectId: lead.projectId,
      projectName: lead.projectName,
      siteSlug: lead.siteSlug,
    },
  });

  const secret = webhookSecret?.trim() || "prompttosite-webhook-secret";
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  let lastError = "Không gửi được webhook";
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-P2S-Signature": `sha256=${signature}`,
          "X-P2S-Attempt": String(attempt),
        },
        body: payload,
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        return { success: true, status: res.status };
      }
      lastError = `HTTP ${res.status}`;
    } catch (err: any) {
      lastError = err?.message || "Lỗi kết nối webhook";
    }
    if (attempt < maxRetries) {
      await new Promise((r) => setTimeout(r, attempt * 600));
    }
  }
  return { success: false, error: lastError };
}
