import { GenerationRequest, IndustryType } from "../types";

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

export function generateLandingPageHtml(cfg: TemplateBlockConfig, options?: { editMode?: boolean }): string {
  const isEditActive = !!options?.editMode;

  return `<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cfg.brandName} - ${cfg.tagline}</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    :root {
      --primary-color: ${cfg.primaryColorHex};
      --accent-color: ${cfg.accentColorHex};
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1e293b;
      background-color: #ffffff;
    }
    .bg-brand-primary {
      background-color: var(--primary-color) !important;
    }
    .text-brand-primary {
      color: var(--primary-color) !important;
    }
    .border-brand-primary {
      border-color: var(--primary-color) !important;
    }

    /* Click-to-edit Visual Styles */
    .editable-text {
      position: relative;
      transition: all 0.2s ease;
    }
    body.edit-mode-active .editable-text {
      outline: 2px dashed #3b82f6 !important;
      outline-offset: 3px !important;
      cursor: text !important;
      background: rgba(59, 130, 246, 0.05) !important;
      border-radius: 4px !important;
    }
    body.edit-mode-active .editable-text:hover {
      outline: 2px solid #2563eb !important;
      background: rgba(59, 130, 246, 0.1) !important;
    }
    body.edit-mode-active .editable-text:focus {
      outline: 2px solid #1d4ed8 !important;
      background: rgba(59, 130, 246, 0.15) !important;
    }
    
    .edit-mode-badge {
      display: none;
    }
    body.edit-mode-active .edit-mode-badge {
      display: flex;
    }
  </style>
</head>
<body class="antialiased ${isEditActive ? 'edit-mode-active' : ''}">

  <!-- FLOATING EDIT MODE NOTIFICATION -->
  <div class="edit-mode-badge fixed bottom-4 left-4 z-50 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg items-center gap-1.5">
    <span>✏️ Chế độ Sửa Nhanh đang bật: Bấm vào văn bản để chỉnh sửa trực tiếp</span>
  </div>

  <!-- TOP ANNOUNCEMENT BAR (THIẾT KẾ NHÃ NHẶN, TINH TẾ) -->
  <div class="bg-slate-900 text-slate-200 py-2 px-4 text-center text-xs font-medium flex items-center justify-center gap-2 border-b border-slate-800">
    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
    <span class="editable-text truncate" data-key="discountText" contenteditable="${isEditActive}">${cfg.discountText}</span>
  </div>

  <!-- HEADER / NAVBAR (CHUẨN CHỈNH, KHÔNG BAO GIỜ ĐÈ CHỮ TRÊN MOBILE) -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
      {/* Cụm Thương Hiệu */}
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
          ${cfg.brandName.charAt(0)}
        </div>
        <div class="min-w-0">
          <span class="font-bold text-slate-900 text-sm sm:text-base tracking-tight truncate block editable-text" data-key="brandName" contenteditable="${isEditActive}">
            ${cfg.brandName}
          </span>
          <span class="text-[10px] text-slate-400 uppercase tracking-wider block font-medium truncate hidden sm:block editable-text" data-key="tagline" contenteditable="${isEditActive}">
            ${cfg.tagline}
          </span>
        </div>
      </div>

      {/* Hotline & Nút CTA */}
      <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <a href="tel:${cfg.hotline}" class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition">
          <span class="text-slate-500">📞</span>
          <span class="editable-text hidden sm:inline" data-key="hotline" contenteditable="${isEditActive}">${cfg.hotline}</span>
        </a>
        <a href="#orderSection" class="px-3.5 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-bold shadow-sm hover:opacity-95 transition">
          <span>Đăng Ký</span>
        </a>
      </div>
    </div>
  </header>

  <!-- HERO SECTION (THANH LỊCH, HIỆN ĐẠI, KHÔNG RƯỜM RÀ) -->
  <section class="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50/60 to-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <!-- Cột Nội Dung -->
        <div class="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>Cam kết dịch vụ chất lượng cao</span>
          </div>

          <h1 class="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.25] tracking-tight editable-text" data-key="headline" contenteditable="${isEditActive}">
            ${cfg.headline}
          </h1>

          <p class="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal editable-text max-w-xl mx-auto lg:mx-0" data-key="subheadline" contenteditable="${isEditActive}">
            ${cfg.subheadline}
          </p>

          <div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a href="#orderSection" class="px-6 py-3 rounded-xl bg-brand-primary text-white text-xs sm:text-sm font-bold text-center shadow-md hover:shadow-lg hover:opacity-95 transition">
              Đăng Ký Tư Vấn Miễn Phí
            </a>
            <a href="#pricingSection" class="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold text-center border border-slate-200 shadow-sm transition">
              Xem Bảng Giá Dịch Vụ
            </a>
          </div>

          <!-- Social Proof Stars -->
          <div class="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500">
            <div class="flex text-amber-400 text-xs">★★★★★</div>
            <span>Được hơn <b>2.500+</b> khách hàng tin tưởng lựa chọn</span>
          </div>
        </div>

        <!-- Cột Ảnh Bìa -->
        <div class="lg:col-span-5">
          <div class="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-2">
            <img src="${cfg.heroImage}" alt="${cfg.brandName}" class="w-full h-64 sm:h-80 md:h-[380px] object-cover rounded-xl">
            <div class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-sm text-xs">
              <p class="font-bold text-slate-900">Dịch vụ chu đáo, tận tâm</p>
              <p class="text-slate-500 text-[11px] mt-0.5">Tư vấn hỗ trợ trực tiếp 24/7 trên toàn quốc.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURES / CAM KẾT (TỐI GIẢN, SẠCH SẼ) -->
  <section class="py-14 sm:py-18 bg-white border-y border-slate-200/80">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
        <h2 class="text-xs uppercase tracking-widest font-bold text-brand-primary">Lợi Thế Nổi Bật</h2>
        <p class="text-xl sm:text-3xl font-extrabold text-slate-900">Tại Sao Khách Hàng Luôn Tin Chọn Chúng Tôi?</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${cfg.features.map((f, i) => `
          <div class="p-6 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:bg-white hover:shadow-md transition space-y-2.5">
            <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shadow-sm">
              ${f.icon}
            </div>
            <h3 class="text-base font-bold text-slate-900 editable-text" data-key="feature-title-${i}" contenteditable="${isEditActive}">
              ${f.title}
            </h3>
            <p class="text-xs text-slate-500 leading-relaxed editable-text" data-key="feature-desc-${i}" contenteditable="${isEditActive}">
              ${f.desc}
            </p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- PRICING PACKAGES (MINH BẠCH, GỌN GÀNG) -->
  <section id="pricingSection" class="py-14 sm:py-20 bg-slate-50/50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-12 space-y-1.5">
        <h2 class="text-xs uppercase tracking-widest font-bold text-brand-primary">Bảng Giá Công Khai</h2>
        <p class="text-xl sm:text-3xl font-extrabold text-slate-900">Các Gói Dịch Vụ Phổ Biến</p>
        <p class="text-xs text-slate-500">Chi phí hợp lý, minh bạch, cam kết không phát sinh phụ phí.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        ${cfg.pricing.map((p, i) => `
          <div class="p-6 rounded-2xl border ${p.badge ? 'border-brand-primary bg-white shadow-md relative ring-1 ring-brand-primary/20' : 'border-slate-200 bg-white shadow-sm'} flex flex-col justify-between space-y-5">
            ${p.badge ? `<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">${p.badge}</div>` : ''}
            <div>
              <h3 class="font-bold text-slate-900 text-base editable-text" data-key="price-name-${i}" contenteditable="${isEditActive}">${p.name}</h3>
              <p class="text-xs text-slate-500 mt-1 editable-text" data-key="price-desc-${i}" contenteditable="${isEditActive}">${p.desc}</p>
              
              <div class="mt-4 flex items-baseline gap-2">
                <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 editable-text" data-key="price-val-${i}" contenteditable="${isEditActive}">${p.price}</span>
                <span class="text-xs text-slate-400 line-through editable-text" data-key="price-orig-${i}" contenteditable="${isEditActive}">${p.originalPrice}</span>
              </div>
            </div>

            <a href="#orderSection" class="w-full py-2.5 rounded-xl ${p.badge ? 'bg-brand-primary text-white hover:opacity-95' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'} text-xs font-bold text-center transition">
              Đăng Ký Gói Này
            </a>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS (CHÂN THẬT) -->
  <section class="py-14 bg-white border-t border-slate-200/80">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-xl mx-auto mb-10 space-y-1">
        <h2 class="text-xs uppercase tracking-widest font-bold text-brand-primary">Đánh Giá Thực Tế</h2>
        <p class="text-xl sm:text-2xl font-extrabold text-slate-900">Cảm Nhận Từ Khách Hàng</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        ${cfg.testimonials.map((t, i) => `
          <div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2.5">
            <div class="flex text-amber-400 text-xs">★★★★★</div>
            <p class="text-xs text-slate-600 leading-relaxed editable-text" data-key="testi-comment-${i}" contenteditable="${isEditActive}">"${t.comment}"</p>
            <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <div>
                <p class="text-xs font-bold text-slate-900 editable-text" data-key="testi-name-${i}" contenteditable="${isEditActive}">${t.name}</p>
                <p class="text-[10px] text-slate-400 editable-text" data-key="testi-role-${i}" contenteditable="${isEditActive}">${t.role}</p>
              </div>
              <span class="text-[10px] bg-slate-200/60 text-slate-600 font-semibold px-2 py-0.5 rounded">Đã trải nghiệm</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- LEAD CAPTURE FORM / ĐẶT HÀNG -->
  <section id="orderSection" class="py-14 sm:py-20 bg-slate-50/50 border-t border-slate-200">
    <div class="max-w-md mx-auto px-4">
      <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-5">
        <div class="text-center space-y-1">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">Đăng Ký Nhận Tư Vấn</h2>
          <p class="text-xs text-slate-500">Chuyên viên sẽ liên hệ lại hỗ trợ bạn trong vòng 10 phút.</p>
        </div>

        <form id="leadCaptureForm" class="space-y-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Họ và tên của bạn:</label>
            <input 
              type="text" 
              name="fullName" 
              required 
              placeholder="Nguyễn Văn A" 
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50/50"
            >
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Số điện thoại liên hệ:</label>
            <input 
              type="tel" 
              name="phone" 
              required 
              placeholder="0988123456" 
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50/50"
            >
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Nhu cầu hoặc câu hỏi cần tư vấn:</label>
            <textarea 
              name="note" 
              rows="2" 
              placeholder="Bạn quan tâm gói nào hoặc cần thêm thông tin gì..." 
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50/50"
            ></textarea>
          </div>

          <button 
            type="submit" 
            id="submitBtn" 
            class="w-full py-3 rounded-xl bg-brand-primary text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition"
          >
            Gửi Yêu Cầu Tư Vấn
          </button>

          <p class="text-[10px] text-center text-slate-400">
            Cam kết bảo mật thông tin khách hàng tuyệt đối theo quy định.
          </p>
        </form>

        <!-- THÔNG BÁO GỬI THÀNH CÔNG -->
        <div id="successMsg" class="hidden text-center py-6 space-y-1.5">
          <div class="text-3xl text-emerald-600">✓</div>
          <h3 class="font-bold text-slate-900 text-sm">Gửi Yêu Cầu Thành Công</h3>
          <p class="text-xs text-slate-500">Chúng tôi đã tiếp nhận thông tin và sẽ liên hệ hỗ trợ bạn sớm nhất.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
    <div class="max-w-6xl mx-auto px-4 text-center space-y-2">
      <p class="font-bold text-slate-200 editable-text" data-key="brandNameFooter" contenteditable="${isEditActive}">${cfg.brandName}</p>
      <p>Hotline: <span class="text-white editable-text" data-key="hotlineFooter" contenteditable="${isEditActive}">${cfg.hotline}</span></p>
      <p class="text-slate-500">Trang web được xuất bản trên nền tảng PromptToSite.</p>
    </div>
  </footer>

  <!-- SCRIPT BẮT LEAD & GIAO TIẾP VỚI PARENT STUDIO QUA POSTMESSAGE -->
  <script>
    const form = document.getElementById('leadCaptureForm');
    const successMsg = document.getElementById('successMsg');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerText = 'Đang xử lý...';

        const formData = new FormData(form);
        const leadData = {
          fullName: formData.get('fullName'),
          phone: formData.get('phone'),
          note: formData.get('note'),
          brandName: "${cfg.brandName}",
          submittedAt: new Date().toISOString()
        };

        window.parent.postMessage({
          type: 'PROMPTTOSITE_LEAD_SUBMITTED',
          payload: leadData
        }, '*');

        try {
          await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
          });
        } catch (err) {
          console.log('Lead submitted locally via postMessage');
        }

        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
      });
    }

    // Lắng nghe sự kiện gõ sửa trực quan (Click-to-edit)
    function notifyParentOfChange(key, value) {
      window.parent.postMessage({
        type: 'PROMPTTOSITE_TEXT_UPDATED',
        payload: {
          key: key,
          value: value,
          html: document.documentElement.outerHTML
        }
      }, '*');
    }

    document.querySelectorAll('.editable-text').forEach((el) => {
      el.addEventListener('blur', () => {
        const key = el.getAttribute('data-key');
        const val = el.innerText.trim();
        notifyParentOfChange(key, val);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          el.blur();
        }
      });
    });

    // Lắng nghe lệnh điều khiển từ Parent Window (Web Studio)
    window.addEventListener('message', (event) => {
      if (!event.data) return;

      if (event.data.type === 'PROMPTTOSITE_TOGGLE_EDIT_MODE') {
        const active = !!event.data.active;
        if (active) {
          document.body.classList.add('edit-mode-active');
        } else {
          document.body.classList.remove('edit-mode-active');
        }
        document.querySelectorAll('.editable-text').forEach((el) => {
          el.setAttribute('contenteditable', active ? 'true' : 'false');
        });
      }

      if (event.data.type === 'PROMPTTOSITE_SET_PALETTE') {
        const { primary, accent } = event.data;
        if (primary) document.documentElement.style.setProperty('--primary-color', primary);
        if (accent) document.documentElement.style.setProperty('--accent-color', accent);
        setTimeout(() => {
          window.parent.postMessage({
            type: 'PROMPTTOSITE_HTML_STATE',
            payload: { html: document.documentElement.outerHTML }
          }, '*');
        }, 100);
      }

      if (event.data.type === 'PROMPTTOSITE_UPDATE_FIELD') {
        const { key, value } = event.data;
        const target = document.querySelector(\`[data-key="\${key}"]\`);
        if (target) target.innerText = value;
      }
    });
  </script>
</body>
</html>`;
}
