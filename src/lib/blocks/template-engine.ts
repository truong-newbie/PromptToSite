import { IndustryType } from "../types";

export interface TemplateBlockConfig {
  brandName: string;
  tagline: string;
  headline: string;
  subheadline: string;
  discountText: string;
  primaryColorHex: string;
  accentColorHex: string;
  heroImage: string;
  hotline: string;
  features: { title: string; desc: string; icon: string }[];
  pricing: { name: string; price: string; originalPrice: string; desc: string; badge?: string }[];
  testimonials: { name: string; role: string; comment: string; rating: number }[];
}

export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  accent: string;
  previewBg: string;
}

// Bảng màu chuẩn mực, nhã nhặn, cao cấp (Không chói, không sến, chuẩn SaaS quốc tế)
export const COLOR_THEMES: ColorTheme[] = [
  { id: "blue", name: "Xanh Hoàng Gia (Chuẩn mực SaaS)", primary: "#1d4ed8", accent: "#0284c7", previewBg: "bg-blue-600" },
  { id: "teal", name: "Ngọc Lam Nhã Nhặn (Spa / Y Tế)", primary: "#0f766e", accent: "#0d9488", previewBg: "bg-teal-700" },
  { id: "slate", name: "Xám Đen Hiện Đại (Minimalist / Tech)", primary: "#0f172a", accent: "#334155", previewBg: "bg-slate-900" },
  { id: "emerald", name: "Xanh Rừng Sinh Thái (Eco / F&B)", primary: "#047857", accent: "#059669", previewBg: "bg-emerald-700" },
  { id: "rose", name: "Hồng Rượu Vang (Thời Trang / Mỹ Phẩm)", primary: "#be123c", accent: "#e11d48", previewBg: "bg-rose-700" },
  { id: "amber", name: "Nâu Ấm Cà Phê (F&B / Thủ Công)", primary: "#78350f", accent: "#92400e", previewBg: "bg-amber-800" },
];

export const INDUSTRY_PRESETS: Record<IndustryType, TemplateBlockConfig> = {
  spa: {
    brandName: "Viện Thẩm Mỹ Ban Mai",
    tagline: "CHĂM SÓC SẮC ĐẸP CHUẨN Y KHOA",
    headline: "Lấy lại vóc dáng thon gọn và làn da căng mịn tự nhiên",
    subheadline: "Liệu trình trẻ hóa đa tầng kết hợp công nghệ tế bào gốc Hoa Kỳ. Thăm khám trực tiếp cùng bác sĩ chuyên khoa 15 năm kinh nghiệm.",
    discountText: "Ưu đãi tuần lễ khai trương: Giảm 40% cho 50 lượt đặt hẹn đầu tiên",
    primaryColorHex: "#1d4ed8",
    accentColorHex: "#0284c7",
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    hotline: "0988.123.456",
    features: [
      { title: "Bác sĩ trực tiếp thăm khám", desc: "Soi da, phân tích chỉ số cơ thể và lên phác đồ điều trị riêng biệt cho từng cơ địa.", icon: "👩‍⚕️" },
      { title: "Cam kết văn bản minh bạch", desc: "Ký văn bản cam kết hiệu quả rõ ràng trước khi bắt đầu thực hiện liệu trình.", icon: "📜" },
      { title: "Bảo mật thông tin khách hàng", desc: "Dữ liệu hồ sơ bệnh án được bảo mật tuyệt đối theo tiêu chuẩn Luật DLCN 91/2025.", icon: "🛡️" }
    ],
    pricing: [
      { name: "Buổi Trải Nghiệm", price: "299.000đ", originalPrice: "500.000đ", desc: "Thăm khám chuyên sâu và 01 buổi massage giải cơ săn chắc bụng." },
      { name: "Liệu Trình Điêu Khắc VIP", price: "1.890.000đ", originalPrice: "3.200.000đ", desc: "Trọn gói 5 buổi công nghệ cao + tặng kèm gói thải độc da collagen.", badge: "ĐƯỢC CHỌN NHIỀU NHẤT" },
      { name: "Gói Tái Sinh Toàn Diện", price: "4.500.000đ", originalPrice: "7.500.000đ", desc: "Cam kết giảm 10-15cm vòng eo và bảo hành duy trì vóc dáng 2 năm." }
    ],
    testimonials: [
      { name: "Chị Minh Thư (32 tuổi, Hà Nội)", role: "Khách hàng thân thiết", comment: "Sau khi sinh bé thứ 2 mình rất tự ti về vòng eo. Sau gói 5 buổi ở Ban Mai eo mình gọn hẳn 8cm, dịch vụ rất nhẹ nhàng và chu đáo.", rating: 5 },
      { name: "Chị Lan Anh (28 tuổi, Cầu Giấy)", role: "Chủ cửa hàng thời trang", comment: "Không gian spa yên tĩnh, sạch sẽ, bác sĩ tư vấn rất kỹ chứ không chèo kéo bán thêm gói. Rất hài lòng!", rating: 5 }
    ]
  },
  coffee: {
    brandName: "The Mộc Specialty Coffee",
    tagline: "CÀ PHÊ NGUYÊN BẢN TÂY NGUYÊN",
    headline: "Khởi đầu ngày mới với tách cà phê mộc rang tay thượng hạng",
    subheadline: "100% hạt Arabica Cầu Đất và Robusta Pleiku hái chín cây. Rang mới mỗi mẻ bằng máy Probat, không tẩm ướp hương liệu nhân tạo.",
    discountText: "Ưu đãi trải nghiệm: Mua 1 tặng 1 toàn bộ menu cà phê hạt trong tuần này",
    primaryColorHex: "#78350f",
    accentColorHex: "#92400e",
    heroImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    hotline: "0905.888.999",
    features: [
      { title: "Hạt chín cây tuyển thủ công", desc: "Thu hoạch từng quả cà phê chín mọng từ các nông hộ trồng tự nhiên tại Cầu Đất, Đà Lạt.", icon: "🌱" },
      { title: "Rang mộc chuẩn quốc tế", desc: "Quy trình rang kiểm soát nhiệt độ nghiêm ngặt, giữ trọn hậu vị ngọt thanh và hương hoa tự nhiên.", icon: "🔥" },
      { title: "Đóng gói van một chiều", desc: "Bảo quản độ tươi mới tối ưu trong 6 tháng, giao hàng tận nơi nhanh chóng trong ngày.", icon: "📦" }
    ],
    pricing: [
      { name: "Gói Mộc Truyền Thống (250g)", price: "125.000đ", originalPrice: "160.000đ", desc: "Blend 70% Robusta & 30% Arabica, đậm đà, thích hợp pha phin mỗi sáng." },
      { name: "Gói Cầu Đất Đặc Biệt (500g)", price: "249.000đ", originalPrice: "320.000đ", desc: "100% Arabica Cầu Đất thơm nồng nàn hương trái cây, chua dịu tự nhiên.", badge: "BÁN CHẠY NHẤT" },
      { name: "Hộp Quà Tinh Hoa (1kg)", price: "480.000đ", originalPrice: "650.000đ", desc: "Tặng kèm 01 phin nhôm anot cao cấp và thiệp cảm ơn trang nhã." }
    ],
    testimonials: [
      { name: "Anh Tuấn (35 tuổi, Quận 1)", role: "Khách hàng đặt định kỳ", comment: "Vị cà phê rất mộc và sạch, uống êm bụng chứ không bị cồn cào hay say như cà phê pha độn ở quán ngoài.", rating: 5 },
      { name: "Chị Thảo (29 tuổi, Bình Thạnh)", role: "Thiết kế đồ họa", comment: "Bao bì đẹp mắt, hạt rang đều màu và thơm nức. Đã giới thiệu cho cả văn phòng cùng mua.", rating: 5 }
    ]
  },
  course: {
    brandName: "NextGen AI Academy",
    tagline: "HỌC VIỆN ĐÀO TẠO KỸ NĂNG CÔNG NGHỆ THỰC CHIẾN",
    headline: "Làm chủ công nghệ Generative AI để tăng 5x hiệu suất công việc",
    subheadline: "Khóa huấn luyện 30 ngày từ cơ bản đến chuyên sâu: Viết prompt chính xác, tự động hóa quy trình với n8n và xây dựng ứng dụng AI không cần code.",
    discountText: "Học bổng trợ giá 50% – Dành cho 20 học viên đăng ký sớm trong tháng",
    primaryColorHex: "#1d4ed8",
    accentColorHex: "#0284c7",
    heroImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    hotline: "0912.333.444",
    features: [
      { title: "Giáo trình cập nhật liên tục", desc: "Thực hành trực tiếp trên các mô hình mới nhất năm 2026: Claude 3.7, GPT-4.5, Gemini 2.0.", icon: "💻" },
      { title: "Kèm cặp đồ án thực tế 1:1", desc: "Đội ngũ mentor đồng hành hướng dẫn giải quyết bài toán cụ thể của từng học viên.", icon: "🤝" },
      { title: "Cấp chứng chỉ hoàn thành", desc: "Chứng chỉ xác thực năng lực thực hành, hỗ trợ kết nối cơ hội việc làm sau khóa học.", icon: "🎓" }
    ],
    pricing: [
      { name: "Khóa Tự Học (Self-paced)", price: "990.000đ", originalPrice: "1.990.000đ", desc: "Truy cập trọn đời kho 40 video bài giảng và thư viện câu lệnh mẫu." },
      { name: "Lớp Trực Tuyến Cùng Mentor", price: "2.490.000đ", originalPrice: "4.990.000đ", desc: "8 buổi học tương tác trực tiếp qua Zoom + sửa đồ án tốt nghiệp 1:1.", badge: "KHUYÊN DÙNG" },
      { name: "Đào Tạo Doanh Nghiệp (In-house)", price: "9.990.000đ", originalPrice: "18.000.000đ", desc: "Chuyển giao quy trình tự động hóa AI may đo riêng cho nhóm 5 người." }
    ],
    testimonials: [
      { name: "Hoàng Nam (24 tuổi, Đà Nẵng)", role: "Chuyên viên nội dung", comment: "Trước đây mình mất 2 ngày mới soạn xong kịch bản tiếp thị. Giờ áp dụng quy trình học chỉ mất 40 phút mà chất lượng tốt hơn hẳn.", rating: 5 },
      { name: "Thanh Hương (31 tuổi, TP.HCM)", role: "Quản lý kinh doanh", comment: "Nội dung rất thực tế, không lý thuyết rườm rà. Đã giúp đội ngũ của mình tiết kiệm được rất nhiều thời gian mỗi tuần.", rating: 5 }
    ]
  },
  fashion: {
    brandName: "L'AURA Studio",
    tagline: "THỜI TRANG TỐI GIẢN & THANH LỊCH",
    headline: "Bộ sưu tập mùa hè: Vẻ đẹp tinh tế trong từng đường may",
    subheadline: "Chất liệu lụa satin và tơ tằm thiên nhiên cao cấp, thoáng mát tuyệt đối. Phom dáng tôn nét đẹp tự nhiên của người phụ nữ hiện đại.",
    discountText: "Ưu đãi đặc biệt: Giảm 30% cho mọi đơn hàng từ 2 sản phẩm trở lên",
    primaryColorHex: "#be123c",
    accentColorHex: "#e11d48",
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    hotline: "0977.654.321",
    features: [
      { title: "Vải dệt tự nhiên tuyển chọn", desc: "Thoáng mát, mềm mại, thấm hút mồ hôi tối ưu và an toàn với làn da nhạy cảm.", icon: "✨" },
      { title: "Đổi size tận nơi trong 7 ngày", desc: "Hỗ trợ đổi mẫu hoặc đổi size miễn phí nếu chưa vừa ý, đảm bảo sự an tâm tuyệt đối.", icon: "🔄" },
      { title: "Đóng gói hộp quà sang trọng", desc: "Mỗi sản phẩm đều đi kèm hộp cứng và thiệp cảm ơn trang nhã, sẵn sàng làm quà tặng.", icon: "🎁" }
    ],
    pricing: [
      { name: "Đầm Lụa Dạo Phố", price: "485.000đ", originalPrice: "690.000đ", desc: "Thiết kế cổ V thanh thoát, dáng suông xếp ly nhẹ nhàng che khuyết điểm." },
      { name: "Set Blazer Công Sở", price: "890.000đ", originalPrice: "1.250.000đ", desc: "Áo vest cúc bọc kèm chân váy chữ A cao cấp, phong cách thanh lịch hiện đại.", badge: "BST BÁN CHẠY" },
      { name: "Đầm Dạ Hội Tơ Tằm", price: "1.650.000đ", originalPrice: "2.300.000đ", desc: "Chất liệu tơ tằm cao cấp thêu hoa văn thủ công, mềm mại và trang nhã." }
    ],
    testimonials: [
      { name: "Chị Ngọc Hà (27 tuổi, Hà Nội)", role: "MC sự kiện", comment: "Váy mặc lên form rất chuẩn, chất vải mướt mịn và thoáng mát. Chắc chắn sẽ tiếp tục ủng hộ các bộ sưu tập tiếp theo.", rating: 5 },
      { name: "Chị Mai Linh (33 tuổi, Hải Phòng)", role: "Trưởng phòng đối ngoại", comment: "Set blazer đi làm vừa kín đáo vừa sang trọng, đồng nghiệp trong công ty ai cũng khen đẹp.", rating: 5 }
    ]
  },
  general: {
    brandName: "Việt Phát Solutions",
    tagline: "GIẢI PHÁP PHÁT TRIỂN DOANH NGHIỆP BỀN VỮNG",
    headline: "Đột phá doanh thu và tiếp cận khách hàng tiềm năng hiệu quả",
    subheadline: "Hệ sinh thái giải pháp dịch vụ chuyên nghiệp, giúp tối ưu chi phí vận hành và nâng cao tỷ lệ chuyển đổi đơn hàng vượt trội.",
    discountText: "Ưu đãi tháng này: Hỗ trợ 35% chi phí triển khai cho khách hàng đăng ký mới",
    primaryColorHex: "#1d4ed8",
    accentColorHex: "#0284c7",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    hotline: "0968.999.888",
    features: [
      { title: "Đội ngũ chuyên môn giàu kinh nghiệm", desc: "Tư vấn tận tình, xây dựng phác thảo giải pháp phù hợp với từng mô hình kinh doanh.", icon: "⭐" },
      { title: "Số liệu minh bạch rõ ràng", desc: "Báo cáo tiến độ và hiệu quả công việc chi tiết theo tuần, đảm bảo đúng cam kết.", icon: "📊" },
      { title: "Chăm sóc khách hàng 24/7", desc: "Kênh hỗ trợ kỹ thuật tận tâm, xử lý các vướng mắc phát sinh trong vòng 15 phút.", icon: "⚡" }
    ],
    pricing: [
      { name: "Gói Khởi Động", price: "499.000đ", originalPrice: "800.000đ", desc: "Phù hợp cho cá nhân kinh doanh hoặc cửa hàng nhỏ bắt đầu chuyển đổi số." },
      { name: "Gói Chuyên Nghiệp", price: "1.990.000đ", originalPrice: "3.500.000đ", desc: "Tối ưu hiệu quả toàn diện, hỗ trợ kỹ thuật ưu tiên và cam kết số liệu.", badge: "PHỔ BIẾN NHẤT" },
      { name: "Gói Doanh Nghiệp VIP", price: "4.990.000đ", originalPrice: "8.000.000đ", desc: "Tùy biến riêng theo quy mô và yêu cầu đặc thù của doanh nghiệp." }
    ],
    testimonials: [
      { name: "Anh Quang Huy (Hà Nội)", role: "Chủ doanh nghiệp nhỏ", comment: "Dịch vụ rất chu đáo và đúng cam kết. Tôi rất yên tâm khi hợp tác lâu dài.", rating: 5 },
      { name: "Chị Phương Thảo (Đà Nẵng)", role: "Quản lý kinh doanh", comment: "Đội ngũ hỗ trợ nhanh nhẹn và nhiệt tình. Hiệu quả mang lại rất rõ ràng sau tháng đầu tiên.", rating: 5 }
    ]
  }
};

// ---------------------------------------------------------------------------
// Tiện ích an toàn: escape HTML, kiểm tra màu / URL, chuẩn hóa cấu hình từ LLM
// ---------------------------------------------------------------------------
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const safeHex = (v: unknown, fallback: string) => (typeof v === "string" && HEX_RE.test(v.trim()) ? v.trim() : fallback);
const safeImageUrl = (v: unknown, fallback: string) => (typeof v === "string" && /^https:\/\//i.test(v.trim()) ? v.trim() : fallback);
const telHref = (v: string) => v.replace(/[^\d+]/g, "");
/** Nhúng giá trị vào <script> an toàn (chặn </script>). */
const jsLiteral = (v: unknown) => JSON.stringify(v).replace(/</g, "\\u003c").split(String.fromCharCode(0x2028)).join("").split(String.fromCharCode(0x2029)).join("");

const str = (v: unknown, fallback: string, max = 400) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : fallback;

/**
 * Chuẩn hóa JSON do LLM trả về: trường nào thiếu hoặc sai kiểu sẽ lấy từ preset,
 * nên template không bao giờ nhận dữ liệu lệch schema.
 */
export function normalizeConfig(raw: unknown, base: TemplateBlockConfig): TemplateBlockConfig {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, any>;
  const list = <T,>(value: unknown, fallback: T[], count: number, map: (item: any, fb: T) => T): T[] => {
    const arr = Array.isArray(value) ? value : [];
    return fallback.slice(0, count).map((fb, i) => (arr[i] && typeof arr[i] === "object" ? map(arr[i], fb) : fb));
  };

  return {
    brandName: str(r.brandName, base.brandName, 60),
    tagline: str(r.tagline, base.tagline, 100),
    headline: str(r.headline, base.headline, 160),
    subheadline: str(r.subheadline, base.subheadline, 320),
    discountText: str(r.discountText, base.discountText, 160),
    primaryColorHex: safeHex(r.primaryColorHex, base.primaryColorHex),
    accentColorHex: safeHex(r.accentColorHex, base.accentColorHex),
    heroImage: safeImageUrl(r.heroImage, base.heroImage),
    hotline: str(r.hotline, base.hotline, 20),
    features: list(r.features, base.features, 3, (it, fb) => ({
      title: str(it.title, fb.title, 80),
      desc: str(it.desc, fb.desc, 220),
      icon: str(it.icon, fb.icon, 8),
    })),
    pricing: list(r.pricing, base.pricing, 3, (it, fb) => ({
      name: str(it.name, fb.name, 70),
      price: str(it.price, fb.price, 30),
      originalPrice: str(it.originalPrice, fb.originalPrice, 30),
      desc: str(it.desc, fb.desc, 220),
      badge: typeof it.badge === "string" && it.badge.trim() ? it.badge.trim().slice(0, 30) : fb.badge,
    })),
    testimonials: list(r.testimonials, base.testimonials, 2, (it, fb) => ({
      name: str(it.name, fb.name, 70),
      role: str(it.role, fb.role, 70),
      comment: str(it.comment, fb.comment, 300),
      rating: Math.min(5, Math.max(1, Math.round(Number(it.rating) || fb.rating))),
    })),
  };
}

/** Áp dụng một chỉnh sửa trực tiếp (theo data-key trong preview) vào cấu hình. */
export function applyFieldEdit(cfg: TemplateBlockConfig, key: string, value: string): TemplateBlockConfig {
  const v = value.trim();
  if (!v) return cfg;
  const next: TemplateBlockConfig = {
    ...cfg,
    features: cfg.features.map((f) => ({ ...f })),
    pricing: cfg.pricing.map((p) => ({ ...p })),
    testimonials: cfg.testimonials.map((t) => ({ ...t })),
  };

  switch (key) {
    case "discountText": next.discountText = v; return next;
    case "brandName":
    case "brandNameFooter": next.brandName = v; return next;
    case "tagline": next.tagline = v; return next;
    case "hotline":
    case "hotlineFooter": next.hotline = v; return next;
    case "headline": next.headline = v; return next;
    case "subheadline": next.subheadline = v; return next;
  }

  const m = key.match(/^(feature-title|feature-desc|price-name|price-desc|price-val|price-orig|testi-comment|testi-name|testi-role)-(\d+)$/);
  if (!m) return cfg;
  const i = Number(m[2]);
  switch (m[1]) {
    case "feature-title": if (next.features[i]) next.features[i].title = v; break;
    case "feature-desc": if (next.features[i]) next.features[i].desc = v; break;
    case "price-name": if (next.pricing[i]) next.pricing[i].name = v; break;
    case "price-desc": if (next.pricing[i]) next.pricing[i].desc = v; break;
    case "price-val": if (next.pricing[i]) next.pricing[i].price = v; break;
    case "price-orig": if (next.pricing[i]) next.pricing[i].originalPrice = v; break;
    case "testi-comment": if (next.testimonials[i]) next.testimonials[i].comment = v; break;
    case "testi-name": if (next.testimonials[i]) next.testimonials[i].name = v; break;
    case "testi-role": if (next.testimonials[i]) next.testimonials[i].role = v; break;
  }
  return next;
}

export interface GenerateOptions {
  /** Bật sẵn chế độ sửa trực tiếp. */
  editMode?: boolean;
  /** Endpoint nhận lead khi trang chạy độc lập (ngoài Studio). */
  leadEndpoint?: string;
}

export function generateLandingPageHtml(cfg: TemplateBlockConfig, options?: GenerateOptions): string {
  const isEditActive = !!options?.editMode;
  const leadEndpoint = options?.leadEndpoint || "/api/leads";

  const brand = escapeHtml(cfg.brandName);
  const tagline = escapeHtml(cfg.tagline);
  const primary = safeHex(cfg.primaryColorHex, "#1d4ed8");
  const accent = safeHex(cfg.accentColorHex, "#0284c7");
  const heroImage = escapeHtml(safeImageUrl(cfg.heroImage, INDUSTRY_PRESETS.general.heroImage));
  const hotlineText = escapeHtml(cfg.hotline);
  const hotlineHref = escapeHtml(telHref(cfg.hotline));
  const ce = `contenteditable="${isEditActive}"`;
  const initial = escapeHtml(Array.from(cfg.brandName.trim())[0] || "P");

  const featureCards = cfg.features
    .map(
      (f, i) => `
        <div class="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-soft flex items-center justify-center text-2xl">${escapeHtml(f.icon)}</div>
          <h3 class="text-base font-bold text-slate-900 editable-text" data-key="feature-title-${i}" ${ce}>${escapeHtml(f.title)}</h3>
          <p class="text-sm text-slate-500 leading-relaxed editable-text" data-key="feature-desc-${i}" ${ce}>${escapeHtml(f.desc)}</p>
        </div>`
    )
    .join("");

  const pricingCards = cfg.pricing
    .map(
      (p, i) => `
        <div class="relative p-7 rounded-3xl flex flex-col justify-between gap-6 transition duration-300 ${
          p.badge ? "bg-white border-2 border-brand shadow-2xl md:-translate-y-3" : "bg-white border border-slate-200 shadow-sm hover:shadow-lg"
        }">
          ${p.badge ? `<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">${escapeHtml(p.badge)}</div>` : ""}
          <div>
            <h3 class="font-bold text-slate-900 text-lg editable-text" data-key="price-name-${i}" ${ce}>${escapeHtml(p.name)}</h3>
            <p class="text-sm text-slate-500 mt-2 leading-relaxed editable-text" data-key="price-desc-${i}" ${ce}>${escapeHtml(p.desc)}</p>
            <div class="mt-5 flex items-baseline gap-2 flex-wrap">
              <span class="text-3xl font-extrabold text-slate-900 tracking-tight editable-text" data-key="price-val-${i}" ${ce}>${escapeHtml(p.price)}</span>
              <span class="text-sm text-slate-400 line-through editable-text" data-key="price-orig-${i}" ${ce}>${escapeHtml(p.originalPrice)}</span>
            </div>
          </div>
          <a href="#orderSection" class="w-full py-3 rounded-xl text-sm font-bold text-center transition ${
            p.badge ? "btn-brand shadow-lg hover:shadow-xl hover:brightness-110" : "bg-slate-100 text-slate-800 hover:bg-slate-200"
          }">Đăng Ký Gói Này</a>
        </div>`
    )
    .join("");

  const testimonialCards = cfg.testimonials
    .map((t, i) => {
      const stars = "★".repeat(Math.min(5, Math.max(1, t.rating))) + "☆".repeat(5 - Math.min(5, Math.max(1, t.rating)));
      return `
        <figure class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div class="text-amber-400 text-sm tracking-widest" aria-label="${t.rating} sao">${stars}</div>
          <blockquote class="text-sm text-slate-600 leading-relaxed">“<span class="editable-text" data-key="testi-comment-${i}" ${ce}>${escapeHtml(t.comment)}</span>”</blockquote>
          <figcaption class="pt-3 border-t border-slate-100 flex items-center gap-3">
            <div class="w-9 h-9 rounded-full btn-brand flex items-center justify-center text-xs font-bold">${escapeHtml(Array.from(t.name.trim())[0] || "K")}</div>
            <div class="min-w-0">
              <p class="text-sm font-bold text-slate-900 editable-text" data-key="testi-name-${i}" ${ce}>${escapeHtml(t.name)}</p>
              <p class="text-xs text-slate-400 editable-text" data-key="testi-role-${i}" ${ce}>${escapeHtml(t.role)}</p>
            </div>
          </figcaption>
        </figure>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brand} - ${tagline}</title>
  <meta name="description" content="${escapeHtml(cfg.subheadline)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary-color: ${primary}; --accent-color: ${accent}; }
    body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1e293b; background: #fff; -webkit-font-smoothing: antialiased; }
    .bg-brand { background: var(--primary-color); }
    .text-brand { color: var(--primary-color); }
    .border-brand { border-color: var(--primary-color); }
    .bg-brand-soft { background: color-mix(in srgb, var(--primary-color) 9%, white); }
    .border-brand-soft { border-color: color-mix(in srgb, var(--primary-color) 22%, white); }
    .btn-brand { background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: #fff; }
    .hero-glow {
      background:
        radial-gradient(55% 60% at 88% 0%, color-mix(in srgb, var(--accent-color) 20%, transparent), transparent 70%),
        radial-gradient(45% 55% at 0% 10%, color-mix(in srgb, var(--primary-color) 14%, transparent), transparent 70%),
        #fff;
    }
    .focus-brand:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary-color) 18%, white); }
    ::selection { background: color-mix(in srgb, var(--primary-color) 25%, white); }

    .editable-text { transition: background .15s ease, outline-color .15s ease; }
    body.edit-mode-active .editable-text { outline: 2px dashed #3b82f6; outline-offset: 3px; cursor: text; border-radius: 4px; background: rgba(59,130,246,.06); }
    body.edit-mode-active .editable-text:hover { outline-style: solid; background: rgba(59,130,246,.12); }
    body.edit-mode-active .editable-text:focus { outline: 2px solid #1d4ed8; background: rgba(59,130,246,.16); }
    .edit-mode-badge { display: none; }
    body.edit-mode-active .edit-mode-badge { display: flex; }
  </style>
</head>
<body class="antialiased pb-16 md:pb-0 ${isEditActive ? "edit-mode-active" : ""}">

  <div class="edit-mode-badge fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-xl items-center gap-2 whitespace-nowrap">
    <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
    <span>Chế độ Sửa Nhanh: bấm vào văn bản để chỉnh trực tiếp</span>
  </div>

  <div class="bg-slate-900 text-slate-100 py-2 px-4 text-center text-xs font-medium flex items-center justify-center gap-2">
    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
    <span class="editable-text" data-key="discountText" ${ce}>${escapeHtml(cfg.discountText)}</span>
  </div>

  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/70">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="w-9 h-9 rounded-xl btn-brand flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">${initial}</div>
        <div class="min-w-0">
          <span class="font-bold text-slate-900 text-sm sm:text-base tracking-tight truncate block editable-text" data-key="brandName" ${ce}>${brand}</span>
          <span class="text-[10px] text-slate-400 uppercase tracking-wider font-medium truncate hidden sm:block editable-text" data-key="tagline" ${ce}>${tagline}</span>
        </div>
      </div>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <a href="#featuresSection" class="hover:text-brand transition">Lợi thế</a>
        <a href="#pricingSection" class="hover:text-brand transition">Bảng giá</a>
        <a href="#reviewSection" class="hover:text-brand transition">Đánh giá</a>
      </nav>
      <div class="flex items-center gap-2 flex-shrink-0">
        <a href="tel:${hotlineHref}" class="hidden sm:flex px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold items-center gap-1.5 transition">
          <span>📞</span><span class="editable-text" data-key="hotline" ${ce}>${hotlineText}</span>
        </a>
        <a href="#orderSection" class="px-4 py-2 rounded-xl btn-brand text-xs font-bold shadow-md hover:shadow-lg hover:brightness-110 transition">Đăng Ký</a>
      </div>
    </div>
  </header>

  <section class="hero-glow py-14 sm:py-20 md:py-24">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div class="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-soft text-brand text-xs font-bold">
            <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
            <span>Cam kết dịch vụ chất lượng cao</span>
          </div>
          <h1 class="text-3xl sm:text-5xl md:text-[3.4rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight editable-text" data-key="headline" ${ce}>${escapeHtml(cfg.headline)}</h1>
          <p class="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 editable-text" data-key="subheadline" ${ce}>${escapeHtml(cfg.subheadline)}</p>
          <div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a href="#orderSection" class="px-7 py-3.5 rounded-xl btn-brand text-sm font-bold text-center shadow-xl hover:shadow-2xl hover:brightness-110 transition">Đăng Ký Tư Vấn Miễn Phí</a>
            <a href="#pricingSection" class="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold text-center border border-slate-200 shadow-sm transition">Xem Bảng Giá</a>
          </div>
          <div class="pt-2 flex items-center justify-center lg:justify-start gap-2.5 text-xs text-slate-500">
            <span class="text-amber-400 tracking-widest text-sm">★★★★★</span>
            <span>Được nhiều khách hàng tin tưởng lựa chọn</span>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="relative mx-auto max-w-md">
            <div class="absolute -inset-3 rounded-[2rem] btn-brand opacity-15 blur-2xl"></div>
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-white bg-slate-100 aspect-[4/5] sm:aspect-[5/5]">
              <img src="${heroImage}" alt="${brand}" referrerpolicy="no-referrer" onerror="this.style.display='none'" class="w-full h-full object-cover">
              <div class="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl btn-brand flex items-center justify-center text-lg flex-shrink-0">✓</div>
                <div>
                  <p class="text-sm font-bold text-slate-900">Dịch vụ chu đáo, tận tâm</p>
                  <p class="text-xs text-slate-500">Tư vấn hỗ trợ trực tiếp trên toàn quốc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="featuresSection" class="py-16 sm:py-24 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <h2 class="text-xs uppercase tracking-[0.2em] font-bold text-brand">Lợi Thế Nổi Bật</h2>
        <p class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Tại Sao Khách Hàng Luôn Tin Chọn Chúng Tôi?</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${featureCards}
      </div>
    </div>
  </section>

  <section id="pricingSection" class="py-16 sm:py-24 bg-slate-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
        <h2 class="text-xs uppercase tracking-[0.2em] font-bold text-brand">Bảng Giá Công Khai</h2>
        <p class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Các Gói Dịch Vụ Phổ Biến</p>
        <p class="text-sm text-slate-500">Chi phí hợp lý, minh bạch, cam kết không phát sinh phụ phí.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">${pricingCards}
      </div>
    </div>
  </section>

  <section id="reviewSection" class="py-16 sm:py-24 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-xl mx-auto mb-12 space-y-2">
        <h2 class="text-xs uppercase tracking-[0.2em] font-bold text-brand">Đánh Giá Thực Tế</h2>
        <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Cảm Nhận Từ Khách Hàng</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">${testimonialCards}
      </div>
    </div>
  </section>

  <section id="orderSection" class="py-16 sm:py-24 hero-glow">
    <div class="max-w-md mx-auto px-4">
      <div class="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-2xl space-y-6">
        <div class="text-center space-y-1.5">
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Đăng Ký Nhận Tư Vấn</h2>
          <p class="text-sm text-slate-500">Chuyên viên sẽ liên hệ lại hỗ trợ bạn trong vòng 10 phút.</p>
        </div>

        <form id="leadCaptureForm" class="space-y-4" novalidate>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5" for="fullName">Họ và tên của bạn</label>
            <input id="fullName" type="text" name="fullName" required maxlength="80" autocomplete="name" placeholder="Nguyễn Văn A"
              class="focus-brand w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/60 transition">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5" for="phone">Số điện thoại liên hệ</label>
            <input id="phone" type="tel" name="phone" required maxlength="16" inputmode="tel" autocomplete="tel" placeholder="0988123456"
              class="focus-brand w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/60 transition">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5" for="note">Nhu cầu hoặc câu hỏi cần tư vấn</label>
            <textarea id="note" name="note" rows="3" maxlength="300" placeholder="Bạn quan tâm gói nào hoặc cần thêm thông tin gì..."
              class="focus-brand w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/60 transition resize-none"></textarea>
          </div>
          <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;height:0;width:0">
          <p id="formError" class="hidden text-xs font-semibold text-rose-600"></p>
          <button type="submit" id="submitBtn" class="w-full py-3.5 rounded-xl btn-brand font-bold text-sm shadow-lg hover:shadow-xl hover:brightness-110 transition disabled:opacity-60">Gửi Yêu Cầu Tư Vấn</button>
          <p class="text-[11px] text-center text-slate-400">Thông tin của bạn được bảo mật và chỉ dùng để tư vấn.</p>
        </form>

        <div id="successMsg" class="hidden text-center py-6 space-y-2">
          <div class="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold">✓</div>
          <h3 class="font-bold text-slate-900">Gửi Yêu Cầu Thành Công</h3>
          <p class="text-sm text-slate-500">Chúng tôi đã tiếp nhận thông tin và sẽ liên hệ hỗ trợ bạn sớm nhất.</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="bg-slate-900 text-slate-400 py-10 text-sm">
    <div class="max-w-6xl mx-auto px-4 text-center space-y-2">
      <p class="font-bold text-white text-base editable-text" data-key="brandNameFooter" ${ce}>${brand}</p>
      <p>Hotline: <a href="tel:${hotlineHref}" class="text-white font-semibold editable-text" data-key="hotlineFooter" ${ce}>${hotlineText}</a></p>
      <p class="text-xs text-slate-500 pt-2">Trang web được tạo bằng PromptToSite.</p>
    </div>
  </footer>

  <div class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-3 flex gap-2">
    <a href="tel:${hotlineHref}" class="flex-1 py-3 rounded-xl bg-slate-100 text-slate-800 text-sm font-bold text-center">📞 Gọi ngay</a>
    <a href="#orderSection" class="flex-[1.4] py-3 rounded-xl btn-brand text-sm font-bold text-center shadow-lg">Đăng ký tư vấn</a>
  </div>

  <script>
    (function () {
      var LEAD_ENDPOINT = ${jsLiteral(leadEndpoint)};
      var BRAND = ${jsLiteral(cfg.brandName)};
      var inStudio = window.parent !== window;

      var form = document.getElementById('leadCaptureForm');
      var successMsg = document.getElementById('successMsg');
      var submitBtn = document.getElementById('submitBtn');
      var errorEl = document.getElementById('formError');

      function showError(msg) { errorEl.textContent = msg; errorEl.classList.remove('hidden'); }

      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          errorEl.classList.add('hidden');
          var fd = new FormData(form);
          var fullName = String(fd.get('fullName') || '').trim();
          var phone = String(fd.get('phone') || '').replace(/[\\s.\\-]/g, '');
          if (fullName.length < 2) return showError('Vui lòng nhập họ và tên.');
          if (!/^(\\+84|0)\\d{9,10}$/.test(phone)) return showError('Số điện thoại chưa đúng (VD: 0988123456).');

          function done() { form.classList.add('hidden'); successMsg.classList.remove('hidden'); }
          if (fd.get('website')) return done(); // honeypot: bot

          var lead = { fullName: fullName, phone: phone, note: String(fd.get('note') || '').trim(), brandName: BRAND };
          submitBtn.disabled = true;
          submitBtn.textContent = 'Đang gửi...';

          if (inStudio) {
            window.parent.postMessage({ type: 'PROMPTTOSITE_LEAD_SUBMITTED', payload: lead }, '*');
            return done();
          }
          fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
            .then(function (r) { if (!r.ok) throw new Error('bad'); done(); })
            .catch(function () {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Gửi Yêu Cầu Tư Vấn';
              showError('Chưa gửi được, vui lòng thử lại hoặc gọi hotline.');
            });
        });
      }

      function notify(key, value) {
        window.parent.postMessage({ type: 'PROMPTTOSITE_TEXT_UPDATED', payload: { key: key, value: value } }, '*');
      }

      document.querySelectorAll('.editable-text').forEach(function (el) {
        el.addEventListener('blur', function () {
          if (el.getAttribute('contenteditable') !== 'true') return;
          notify(el.getAttribute('data-key'), el.innerText.trim());
        });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); el.blur(); }
        });
        el.addEventListener('paste', function (e) {
          e.preventDefault();
          var text = (e.clipboardData || window.clipboardData).getData('text/plain');
          document.execCommand('insertText', false, text);
        });
        el.addEventListener('click', function (e) {
          if (el.getAttribute('contenteditable') === 'true') e.preventDefault();
        });
      });

      window.addEventListener('message', function (event) {
        if (event.source !== window.parent || !event.data) return;
        var d = event.data;

        if (d.type === 'PROMPTTOSITE_TOGGLE_EDIT_MODE') {
          var active = !!d.active;
          document.body.classList.toggle('edit-mode-active', active);
          document.querySelectorAll('.editable-text').forEach(function (el) {
            el.setAttribute('contenteditable', active ? 'true' : 'false');
          });
        }
        if (d.type === 'PROMPTTOSITE_SET_PALETTE') {
          if (/^#[0-9a-fA-F]{6}$/.test(d.primary)) document.documentElement.style.setProperty('--primary-color', d.primary);
          if (/^#[0-9a-fA-F]{6}$/.test(d.accent)) document.documentElement.style.setProperty('--accent-color', d.accent);
        }
      });
    })();
  </script>
</body>
</html>`;
}
