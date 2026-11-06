import { INDUSTRY_PRESETS, TemplateBlockConfig } from "./blocks/template-engine";
import { IndustryType } from "./types";

// Mỗi ngành có danh sách từ khóa; từ khóa phải khớp nguyên từ (không khớp "ai" trong "hair").
const RULES: [IndustryType, string[]][] = [
  ["coffee", ["cà phê", "cafe", "coffee", "trà", "trà sữa", "f&b", "đồ uống", "nhà hàng", "quán ăn", "ăn uống", "bánh"]],
  ["course", ["khóa học", "khoá học", "đào tạo", "tiếng anh", "học viện", "lớp học", "kỹ năng", "học bổng", "học viên", "ai", "workshop"]],
  ["fashion", ["thời trang", "áo", "quần", "váy", "đầm", "túi", "giày", "boutique", "bộ sưu tập", "phụ kiện"]],
  ["spa", ["spa", "thẩm mỹ", "giảm béo", "làn da", "chăm sóc da", "nha khoa", "mỹ phẩm", "triệt lông", "massage", "trị mụn", "da"]],
];

const isWordChar = (ch: string | undefined) => !!ch && /[\p{L}\p{N}]/u.test(ch);

function hasTerm(text: string, term: string): boolean {
  let from = 0;
  for (;;) {
    const i = text.indexOf(term, from);
    if (i === -1) return false;
    if (!isWordChar(text[i - 1]) && !isWordChar(text[i + term.length])) return true;
    from = i + 1;
  }
}

export function detectIndustry(prompt: string): IndustryType {
  const text = (prompt || "").toLowerCase();
  let best: IndustryType = "general";
  let bestScore = 0;
  for (const [industry, terms] of RULES) {
    const score = terms.filter((t) => hasTerm(text, t)).length;
    if (score > bestScore) {
      best = industry;
      bestScore = score;
    }
  }
  return best;
}

/** Sinh cấu hình offline: chọn preset theo ngành rồi thay thương hiệu, ưu đãi, hotline trích được từ câu lệnh. */
export function extractSemanticConfig(
  prompt: string,
  explicitIndustry?: IndustryType
): { industry: IndustryType; config: TemplateBlockConfig } {
  const industry = explicitIndustry && explicitIndustry in INDUSTRY_PRESETS ? explicitIndustry : detectIndustry(prompt);
  const config: TemplateBlockConfig = JSON.parse(JSON.stringify(INDUSTRY_PRESETS[industry]));

  const discount = prompt.match(/\d{1,2}\s*%|\d{1,2}\s*phần trăm|mua 1 tặng 1|free ?ship|miễn phí vận chuyển/i);
  if (discount) config.discountText = `Ưu đãi đặc biệt: ${discount[0].trim()} cho khách hàng đăng ký hôm nay`;

  const quoted = prompt.match(/[“"]([^”"]{3,50})[”"]/);
  const afterCho = prompt.match(
    /(?:cho|của)\s+(\p{Lu}[^,.\n]{2,48}?)(?=,|\.|$|\s+(?:giảm|khuyến|ưu đãi|mua|có|với|học bổng|trợ giá))/u
  );
  const brand = (quoted?.[1] || afterCho?.[1] || "").trim();
  if (brand.length > 2) config.brandName = brand;

  const phone = prompt.match(/(0\d{9,10}|\+84\d{9,10})/);
  if (phone) config.hotline = phone[0];

  return { industry, config };
}
