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

export const COLOR_THEMES: ColorTheme[] = [
  { id: "teal", name: "Ngọc Lam (Spa/Y tế)", primary: "#0d9488", accent: "#0284c7", previewBg: "bg-teal-600" },
  { id: "indigo", name: "Tím Công Nghệ (Tech/SaaS)", primary: "#4f46e5", accent: "#7c3aed", previewBg: "bg-indigo-600" },
  { id: "emerald", name: "Xanh Sinh Thái (Eco/Nông sản)", primary: "#059669", accent: "#10b981", previewBg: "bg-emerald-600" },
  { id: "rose", name: "Hồng Nữ Tính (Fashion/Mỹ phẩm)", primary: "#e11d48", accent: "#f43f5e", previewBg: "bg-rose-600" },
  { id: "amber", name: "Nâu Cà Phê (F&B/Coffee)", primary: "#78350f", accent: "#b45309", previewBg: "bg-amber-800" },
  { id: "slate", name: "Đen Sang Trọng (Luxury/BĐS)", primary: "#0f172a", accent: "#334155", previewBg: "bg-slate-900" },
];

export const INDUSTRY_PRESETS: Record<IndustryType, TemplateBlockConfig> = {
  spa: {
    brandName: "Viện Thẩm Mỹ Ban Mai",
    tagline: "ĐÁNH THỨC VẺ ĐẸP TỰ NHIÊN THUẦN KHIẾT",
    headline: "Lấy Lại Vóc Dáng Thon Gọn & Làn Da Căng Bóng Chỉ Sau 60 Phút",
    subheadline: "Công nghệ hủy mỡ đa tầng kết hợp cấy tinh chất tái sinh tế bào gốc. Cam kết bằng văn bản: Giảm 5–10cm vòng eo, không đau, không nghỉ dưỡng.",
    discountText: "Ưu Đãi Khai Trương: Giảm 40% Cho 50 Khách Hàng Đăng Ký Hôm Nay",
    primaryColorHex: "#0d9488",
    accentColorHex: "#0284c7",
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    hotline: "0988.123.456",
    features: [
      { title: "Bác Sĩ 15 Năm Kinh Nghiệm", desc: "Trực tiếp thăm khám, siêu âm và lên phác đồ chuẩn y khoa riêng cho từng cơ địa.", icon: "👩‍⚕️" },
      { title: "Cam Kết Bằng Văn Bản", desc: "Ký cam kết hiệu quả bằng văn bản pháp lý trước khi thực hiện liệu trình.", icon: "📜" },
      { title: "Bảo Mật Dữ Liệu Tuyệt Đối", desc: "Hệ thống bảo vệ thông tin cá nhân khách hàng theo chuẩn Luật DLCN 91/2025.", icon: "🛡️" }
    ],
    pricing: [
      { name: "Gói Trải Nghiệm", price: "299.000đ", originalPrice: "500.000đ", desc: "Thăm khám chuyên sâu + 01 buổi massage giải cơ săn chắc bụng." },
      { name: "Gói Điêu Khắc Eo Thon VIP", price: "1.890.000đ", originalPrice: "3.200.000đ", desc: "Liệu trình hủy mỡ 5 buổi công nghệ cao + tặng gói thải độc collagen.", badge: "BÁN CHẠY NHẤT" },
      { name: "Gói Trọn Gói Tái Sinh", price: "4.500.000đ", originalPrice: "7.500.000đ", desc: "Cam kết giảm 10-15cm vòng eo + bảo hành duy trì vóc dáng 2 năm." }
    ],
    testimonials: [
      { name: "Chị Minh Thư (32 tuổi, Hà Nội)", role: "Nhân viên văn phòng", comment: "Sau khi sinh bé thứ 2 bụng mình nhiều mỡ thừa lắm. Làm gói 5 buổi ở Ban Mai mà eo giảm hẳn 8cm, mặc vừa lại váy cưới cũ!", rating: 5 },
      { name: "Chị Lan Anh (28 tuổi, Cầu Giấy)", role: "Chủ shop thời trang", comment: "Không gian spa thư giãn, dịch vụ chu đáo, bác sĩ nhiệt tình. Rất đáng đồng tiền bát gạo!", rating: 5 }
    ]
  },
  coffee: {
    brandName: "The Mộc Specialty Coffee",
    tagline: "CÀ PHÊ NGUYÊN BẢN – ĐẬM VỊ ĐẤT TRỜI TÂY NGUYÊN",
    headline: "Khởi Đầu Ngày Mới Với Tách Cà Phê Mộc Rang Tay Thượng Hạng",
    subheadline: "100% hạt Arabica Cầu Đất & Robusta Pleiku hái chín cây. Không tẩm ướp, không hương liệu hóa chất, thơm nồng nàn vị mộc tự nhiên.",
    discountText: "Ưu Đãi Tuần Lễ Ra Mắt: Mua 1 Tặng 1 Toàn Bộ Menu Hạt Rang Mộc",
    primaryColorHex: "#78350f",
    accentColorHex: "#b45309",
    heroImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    hotline: "0905.888.999",
    features: [
      { title: "Hạt Chín Cây 100%", desc: "Hái tuyển thủ công từng quả cà phê chín mọng từ độ cao 1.500m tại Cầu Đất, Đà Lạt.", icon: "🌱" },
      { title: "Rang Mộc Bằng Máy Probat Đức", desc: "Giữ trọn hương vị trái cây tự nhiên, hậu vị ngọt sâu lắng, hoàn toàn không chất bảo quản.", icon: "🔥" },
      { title: "Giao Hỏa Tốc Trong 30 Phút", desc: "Đóng gói van một chiều bảo quản độ tươi mới tối đa, giao tận bàn làm việc của bạn.", icon: "⚡" }
    ],
    pricing: [
      { name: "Gói Mộc Trải Nghiệm (250g)", price: "125.000đ", originalPrice: "160.000đ", desc: "Blend 70% Robusta & 30% Arabica, thích hợp pha phin truyền thống đậm đà." },
      { name: "Gói Cầu Đất Đặc Biệt (500g)", price: "249.000đ", originalPrice: "320.000đ", desc: "100% Arabica Cầu Đất thơm hương hoa quả, chua thanh dịu ngọt.", badge: "ĐƯỢC YÊU THÍCH NHẤT" },
      { name: "Combo Quà Tặng Tinh Hoa (1kg)", price: "480.000đ", originalPrice: "650.000đ", desc: "Tặng kèm phin nhôm mạ anot cao cấp + hộp quà ép kim sang trọng." }
    ],
    testimonials: [
      { name: "Anh Tuấn (35 tuổi, Quận 1)", role: "Lập trình viên", comment: "Vị cà phê rất mộc, đậm mà êm ru, không bị say hay ép tim như cà phê pha tạp ngoài quán. Mua uống hằng ngày luôn!", rating: 5 },
      { name: "Chị Thảo (29 tuổi, Bình Thạnh)", role: "Nhà thiết kế đồ họa", comment: "Bao bì đẹp mắt, pha phin hay pour over đều thơm lừng cả phòng làm việc.", rating: 5 }
    ]
  },
  course: {
    brandName: "NextGen AI Academy",
    tagline: "LÀM CHỦ KỸ NĂNG AI THỰC CHIẾN NĂM 2026",
    headline: "Tăng 500% Hiệu Suất Công Việc & Xây Dựng Thu Nhập Mới Cùng Generative AI",
    subheadline: "Khóa huấn luyện chuyên sâu 30 ngày: Từ viết prompt đỉnh cao, tự động hóa quy trình kinh doanh bằng n8n, đến xây dựng ứng dụng AI không cần viết code.",
    discountText: "Học Bổng Trợ Giá 50% – Chỉ Còn 15 Suất Cuối Cùng Trong Tháng Này",
    primaryColorHex: "#4f46e5",
    accentColorHex: "#7c3aed",
    heroImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    hotline: "0912.333.444",
    features: [
      { title: "Giáo Trình Cập Nhật 2026", desc: "Thực hành trực tiếp trên Claude 3.7 Sonnet, GPT-4.5, Gemini 2.0 Flash và MCP Architecture.", icon: "🚀" },
      { title: "Kèm Cặp 1:1 Qua Discord", desc: "Đội ngũ trợ giảng hỗ trợ giải đáp thắc mắc và sửa bài tập thực chiến 24/7.", icon: "💡" },
      { title: "Cấp Chứng Chỉ Uy Tín", desc: "Được các doanh nghiệp công nghệ đối tác ưu tiên tuyển dụng vị trí AI Operator.", icon: "🎓" }
    ],
    pricing: [
      { name: "Vé Tiêu Chuẩn (Self-paced)", price: "990.000đ", originalPrice: "1.990.000đ", desc: "Truy cập trọn đời kho video 40 bài giảng + thư viện 500+ Prompt độc quyền." },
      { name: "Lớp Thực Chiến Mentor (VIP)", price: "2.490.000đ", originalPrice: "4.990.000đ", desc: "8 buổi Zoom trực tiếp cùng chuyên gia + Review dự án cá nhân 1:1.", badge: "KHUYÊN DÙNG" },
      { name: "Coaching Doanh Nghiệp (In-house)", price: "9.990.000đ", originalPrice: "18.000.000đ", desc: "Đào tạo đội ngũ 5 người + chuyển giao hệ thống tự động hóa Marketing & Sales." }
    ],
    testimonials: [
      { name: "Hoàng Nam (24 tuổi, Đà Nẵng)", role: "Content Creator", comment: "Trước đây mất 2 ngày mới xong một kịch bản video. Giờ áp dụng workflow của khóa học chỉ tốn 30 phút mà chất lượng cao hơn hẳn!", rating: 5 },
      { name: "Thanh Hương (31 tuổi, TP.HCM)", role: "Trưởng phòng Marketing", comment: "Khóa học rất thực tế, không lý thuyết suông. Đã ứng dụng tiết kiệm được cho công ty 20 triệu tiền thuê ngoài mỗi tháng.", rating: 5 }
    ]
  },
  fashion: {
    brandName: "L'AURA Boutique",
    tagline: "PHONG CÁCH TỐI GIẢN – KHẲNG ĐỊNH KHÍ CHẤT THANH LỊCH",
    headline: "Bộ Sưu Tập Mùa Hè 2026: Vẻ Đẹp Sang Trọng Trong Từng Đường May Tinh Tế",
    subheadline: "Chất liệu lụa satin & tơ tằm thiên nhiên cao cấp, thoáng mát tuyệt đối. Thiết kế độc quyền tôn vinh nét quyến rũ tự nhiên của người phụ nữ hiện đại.",
    discountText: "Ưu Đãi Đặc Biệt: Giảm 30% Cho Mọi Đơn Hàng Từ 2 Sản Phẩm",
    primaryColorHex: "#e11d48",
    accentColorHex: "#f43f5e",
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    hotline: "0977.654.321",
    features: [
      { title: "Chất Liệu Tuyển Chọn", desc: "100% vải lụa dệt tự nhiên, thấm hút mồ hôi tối ưu, nhẹ nhàng và an toàn với làn da nhạy cảm.", icon: "✨" },
      { title: "Đổi Trả Miễn Phí 7 Ngày", desc: "Hỗ trợ đổi size hoặc đổi mẫu tận nhà nếu không vừa ý, cam kết bảo vệ quyền lợi khách hàng.", icon: "🔄" },
      { title: "Hộp Quà Sang Trọng", desc: "Mỗi sản phẩm đều kèm hộp cứng phủ nhung và thiệp cảm ơn chỉn chu, thích hợp làm quà tặng.", icon: "🎁" }
    ],
    pricing: [
      { name: "Đầm Lụa Midi Dạo Phố", price: "485.000đ", originalPrice: "690.000đ", desc: "Thiết kế cổ chữ V thanh thoát, dáng suông xếp ly nhẹ nhàng che khuyết điểm tôn dáng." },
      { name: "Set Blazer Công Sở", price: "890.000đ", originalPrice: "1.250.000đ", desc: "Áo vest cúc mạ vàng kèm chân váy chữ A cao cấp, phong cách thanh lịch hiện đại.", badge: "BST BÁN CHẠY" },
      { name: "Đầm Dạ Hội Tơ Tằm", price: "1.650.000đ", originalPrice: "2.300.000đ", desc: "Chất liệu tơ tằm thêu hoa văn thủ công, tỏa sáng lộng lẫy trong các buổi dạ tiệc." }
    ],
    testimonials: [
      { name: "Chị Ngọc Hà (27 tuổi, Hà Nội)", role: "MC Truyền hình", comment: "Váy mặc lên form chuẩn từng milimet, chất vải mướt mịn và mát lịm. Sẽ tiếp tục ủng hộ BST tiếp theo!", rating: 5 },
      { name: "Chị Mai Linh (33 tuổi, Hải Phòng)", role: "Giám đốc đối ngoại", comment: "Set đồ đi làm vừa kín đáo vừa sang trọng, đồng nghiệp ai cũng hỏi mua ở đâu.", rating: 5 }
    ]
  },
  general: {
    brandName: "Việt Phát Solutions",
    tagline: "GIẢI PHÁP TĂNG TRƯỞNG KINH DOANH BỀN VỮNG",
    headline: "Đột Phá Doanh Thu & Tiếp Cận Hàng Nghìn Khách Hàng Tiềm Năng Mỗi Ngày",
    subheadline: "Hệ thống giải pháp dịch vụ trọn gói chuẩn 2026. Tối ưu chi phí vận hành, nâng cao tỷ lệ chuyển đổi đơn hàng vượt trội.",
    discountText: "Ưu Đãi Doanh Nghiệp: Trợ Giá 35% Cho Khách Hàng Mới Trong Tháng",
    primaryColorHex: "#2563eb",
    accentColorHex: "#3b82f6",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    hotline: "0968.999.888",
    features: [
      { title: "Quy Trình Chuyên Nghiệp", desc: "Đội ngũ chuyên gia giàu kinh nghiệm trực tiếp tư vấn và đồng hành cùng khách hàng.", icon: "⭐" },
      { title: "Hiệu Quả Được Đo Lường", desc: "Báo cáo số liệu minh bạch, cam kết rõ ràng về chất lượng dịch vụ cung cấp.", icon: "📈" },
      { title: "Hỗ Trợ Nhanh Chóng 24/7", desc: "Kênh chăm sóc khách hàng tận tâm, xử lý yêu cầu phát sinh trong vòng 15 phút.", icon: "⚡" }
    ],
    pricing: [
      { name: "Gói Khởi Động", price: "499.000đ", originalPrice: "800.000đ", desc: "Phù hợp cho khách hàng trải nghiệm lần đầu với đầy đủ tính năng cơ bản." },
      { name: "Gói Chuyên Nghiệp Pro", price: "1.990.000đ", originalPrice: "3.500.000đ", desc: "Tối ưu hiệu quả toàn diện, hỗ trợ ưu tiên và cam kết chất lượng.", badge: "PHỔ BIẾN NHẤT" },
      { name: "Gói Doanh Nghiệp VIP", price: "4.990.000đ", originalPrice: "8.000.000đ", desc: "Dịch vụ trọn gói tùy chỉnh riêng theo nhu cầu đặc thù của doanh nghiệp." }
    ],
    testimonials: [
      { name: "Anh Quang Huy (Hà Nội)", role: "Chủ doanh nghiệp", comment: "Dịch vụ rất chu đáo và chuyên nghiệp. Tôi rất hài lòng với kết quả đạt được!", rating: 5 },
      { name: "Chị Phương Thảo (Đà Nẵng)", role: "Quản lý kinh doanh", comment: "Tư vấn nhiệt tình, triển khai đúng tiến độ cam kết. Chắc chắn sẽ tiếp tục hợp tác.", rating: 5 }
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
      font-family: 'Plus Jakarta Sans', sans-serif;
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
    .bg-brand-accent {
      background-color: var(--accent-color) !important;
    }
    .text-brand-accent {
      color: var(--accent-color) !important;
    }

    /* Click-to-edit Visual Styles */
    .editable-text {
      position: relative;
      transition: all 0.2s ease;
    }
    body.edit-mode-active .editable-text {
      outline: 2px dashed #3b82f6 !important;
      outline-offset: 2px !important;
      cursor: text !important;
      background: rgba(59, 130, 246, 0.06) !important;
      border-radius: 4px !important;
    }
    body.edit-mode-active .editable-text:hover {
      outline: 2px solid #2563eb !important;
      background: rgba(59, 130, 246, 0.12) !important;
    }
    body.edit-mode-active .editable-text:focus {
      outline: 2px solid #1d4ed8 !important;
      background: rgba(59, 130, 246, 0.18) !important;
    }
    
    .edit-mode-badge {
      display: none;
    }
    body.edit-mode-active .edit-mode-badge {
      display: flex;
    }
  </style>
</head>
<body class="bg-white text-slate-800 antialiased ${isEditActive ? 'edit-mode-active' : ''}">

  <!-- FLOATING EDIT MODE NOTIFICATION -->
  <div class="edit-mode-badge fixed bottom-4 left-4 z-50 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg items-center gap-1.5 animate-pulse">
    <span>✏️ Chế độ Sửa Nhanh đang BẬT: Bạn có thể click trực tiếp vào văn bản để sửa</span>
  </div>

  <!-- TOP ANNOUNCEMENT BAR (TINH TẾ, KHÔNG CHÓI LỌI, KHÔNG ĐÈ CHỮ) -->
  <div class="bg-slate-900 text-slate-200 py-2 px-3 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    <span class="editable-text" data-key="discountText" contenteditable="${isEditActive}">${cfg.discountText}</span>
  </div>

  <!-- HEADER / NAVBAR (CHUẨN RESPONSIVE CHO MỌI KÍCH THƯỚC) -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition">
    <div class="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3">
      {/* Brand logo & name */}
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white font-black text-base sm:text-lg shadow-sm flex-shrink-0">
          ${cfg.brandName.charAt(0)}
        </div>
        <div class="min-w-0">
          <span class="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight truncate block editable-text" data-key="brandName" contenteditable="${isEditActive}">
            ${cfg.brandName}
          </span>
          <span class="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold truncate hidden sm:block editable-text" data-key="tagline" contenteditable="${isEditActive}">
            ${cfg.tagline}
          </span>
        </div>
      </div>

      {/* Actions / Hotline */}
      <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <a href="tel:${cfg.hotline}" class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition">
          <span>📞</span>
          <span class="editable-text hidden sm:inline" data-key="hotline" contenteditable="${isEditActive}">${cfg.hotline}</span>
        </a>
        <a href="#orderSection" class="px-3 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-bold shadow-sm hover:opacity-95 transition">
          <span>Đăng Ký</span>
        </a>
      </div>
    </div>
  </header>

  <!-- HERO SECTION (MODERN SAAS AESTHETIC) -->
  <section class="relative overflow-hidden py-10 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50/70 via-white to-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <!-- Cột Nội Dung -->
        <div class="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Cam kết hiệu quả chuẩn 2026</span>
          </div>

          <h1 class="text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 leading-[1.2] tracking-tight editable-text" data-key="headline" contenteditable="${isEditActive}">
            ${cfg.headline}
          </h1>

          <p class="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal editable-text" data-key="subheadline" contenteditable="${isEditActive}">
            ${cfg.subheadline}
          </p>

          <div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a href="#orderSection" class="px-6 py-3.5 rounded-xl bg-brand-primary text-white text-xs sm:text-sm font-extrabold text-center shadow-lg hover:shadow-xl hover:opacity-95 transition">
              ĐĂNG KÝ NHẬN TƯ VẤN NGAY
            </a>
            <a href="#pricingSection" class="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold text-center border border-slate-200 transition">
              Xem Bảng Giá Ưu Đãi
            </a>
          </div>

          <!-- Social Proof Stars -->
          <div class="pt-3 flex items-center justify-center lg:justify-start gap-2.5 text-xs text-slate-500">
            <div class="flex text-amber-400 text-sm">★★★★★</div>
            <span>Được hơn <b>2.500+</b> khách hàng tin dùng và đánh giá 4.9/5 sao</span>
          </div>
        </div>

        <!-- Cột Ảnh Bìa -->
        <div class="lg:col-span-5">
          <div class="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white p-2">
            <img src="${cfg.heroImage}" alt="${cfg.brandName}" class="w-full h-64 sm:h-80 md:h-[380px] object-cover rounded-xl hover:scale-105 transition duration-500">
            <div class="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/60 shadow-lg text-xs">
              <p class="font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>⚡</span>
                <span>Chương trình ưu đãi độc quyền</span>
              </p>
              <p class="text-slate-600 text-[11px] mt-0.5">Hỗ trợ giao hàng & tư vấn trực tiếp 24/7 toàn quốc.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURES / CAM KẾT (CLEAN MODERN CARDS) -->
  <section class="py-12 sm:py-16 bg-slate-50/70 border-y border-slate-200/80">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
        <h2 class="text-xs uppercase tracking-widest font-extrabold text-brand-primary">Lợi Thế Vượt Trội</h2>
        <p class="text-xl sm:text-3xl font-extrabold text-slate-900">Tại Sao Khách Hàng Luôn Tin Chọn Chúng Tôi?</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${cfg.features.map((f, i) => `
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
              ${f.icon}
            </div>
            <h3 class="text-base font-bold text-slate-900 editable-text" data-key="feature-title-${i}" contenteditable="${isEditActive}">
              ${f.title}
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed editable-text" data-key="feature-desc-${i}" contenteditable="${isEditActive}">
              ${f.desc}
            </p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- PRICING PACKAGES (TRANH THỦ CHUYỂN ĐỔI CAO) -->
  <section id="pricingSection" class="py-14 sm:py-18 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-12 space-y-1.5">
        <h2 class="text-xs uppercase tracking-widest font-extrabold text-brand-primary">Bảng Giá Minh Bạch</h2>
        <p class="text-xl sm:text-3xl font-extrabold text-slate-900">Chọn Gói Dịch Vụ Phù Hợp Nhất</p>
        <p class="text-xs text-slate-500">Tiết kiệm chi phí tối đa với các gói combo ưu đãi trong tuần này.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        ${cfg.pricing.map((p, i) => `
          <div class="p-6 rounded-2xl border ${p.badge ? 'border-brand-primary shadow-xl bg-slate-50/40 relative ring-1 ring-brand-primary/20' : 'border-slate-200 bg-white shadow-sm'} flex flex-col justify-between space-y-5">
            ${p.badge ? `<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">${p.badge}</div>` : ''}
            <div>
              <h3 class="font-extrabold text-slate-900 text-base editable-text" data-key="price-name-${i}" contenteditable="${isEditActive}">${p.name}</h3>
              <p class="text-xs text-slate-500 mt-1 editable-text" data-key="price-desc-${i}" contenteditable="${isEditActive}">${p.desc}</p>
              
              <div class="mt-4 flex items-baseline gap-2">
                <span class="text-2xl sm:text-3xl font-black text-brand-primary editable-text" data-key="price-val-${i}" contenteditable="${isEditActive}">${p.price}</span>
                <span class="text-xs text-slate-400 line-through editable-text" data-key="price-orig-${i}" contenteditable="${isEditActive}">${p.originalPrice}</span>
              </div>
            </div>

            <a href="#orderSection" class="w-full py-2.5 rounded-xl ${p.badge ? 'bg-brand-primary text-white' : 'bg-slate-900 text-white hover:bg-slate-800'} text-xs font-bold text-center transition shadow-sm">
              Đăng Ký Gói Này
            </a>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS (CHÂN THẬT, UY TÍN) -->
  <section class="py-14 bg-slate-50/70 border-t border-slate-200/80">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-xl mx-auto mb-10 space-y-1">
        <h2 class="text-xs uppercase tracking-widest font-extrabold text-brand-primary">Khách Hàng Chia Sẻ</h2>
        <p class="text-xl sm:text-2xl font-extrabold text-slate-900">Cảm Nhận Thực Tế Từ Khách Hàng</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        ${cfg.testimonials.map((t, i) => `
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div class="flex text-amber-400 text-sm">★★★★★</div>
            <p class="text-xs text-slate-600 italic leading-relaxed editable-text" data-key="testi-comment-${i}" contenteditable="${isEditActive}">"${t.comment}"</p>
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p class="text-xs font-bold text-slate-900 editable-text" data-key="testi-name-${i}" contenteditable="${isEditActive}">${t.name}</p>
                <p class="text-[10px] text-slate-400 editable-text" data-key="testi-role-${i}" contenteditable="${isEditActive}">${t.role}</p>
              </div>
              <span class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">Đã xác thực</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- LEAD CAPTURE FORM / ĐẶT HÀNG (SANG TRỌNG) -->
  <section id="orderSection" class="py-14 sm:py-20 bg-white border-t border-slate-200">
    <div class="max-w-lg mx-auto px-4">
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        <div class="text-center space-y-1.5">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 text-brand-primary text-xl flex items-center justify-center mx-auto border border-blue-100">
            📋
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900">ĐĂNG KÝ TƯ VẤN NGAY</h2>
          <p class="text-xs text-slate-500">Để lại thông tin, chuyên viên sẽ gọi lại tư vấn và giữ suất ưu đãi trong 10 phút.</p>
        </div>

        <form id="leadCaptureForm" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Họ và tên của bạn:</label>
            <input 
              type="text" 
              name="fullName" 
              required 
              placeholder="Ví dụ: Nguyễn Văn A" 
              class="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Số điện thoại liên hệ (Zalo):</label>
            <input 
              type="tel" 
              name="phone" 
              required 
              placeholder="Ví dụ: 0988123456" 
              class="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Ghi chú hoặc dịch vụ quan tâm:</label>
            <textarea 
              name="note" 
              rows="2" 
              placeholder="Bạn quan tâm gói nào hoặc có câu hỏi gì cần tư vấn thêm..." 
              class="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50"
            ></textarea>
          </div>

          <button 
            type="submit" 
            id="submitBtn" 
            class="w-full py-3.5 rounded-xl bg-brand-primary text-white font-extrabold text-sm shadow-lg hover:shadow-xl hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            <span>GỬI ĐĂNG KÝ NGAY</span>
            <span>🚀</span>
          </button>

          <p class="text-[10px] text-center text-slate-400">
            🔒 Cam kết bảo mật thông tin 100% theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.
          </p>
        </form>

        <!-- THÔNG BÁO GỬI THÀNH CÔNG -->
        <div id="successMsg" class="hidden text-center py-6 space-y-2">
          <div class="text-4xl text-emerald-500">🎉</div>
          <h3 class="font-extrabold text-slate-900 text-base">Đăng Ký Thành Công!</h3>
          <p class="text-xs text-slate-600">Chúng tôi đã tiếp nhận thông tin và sẽ liên hệ hỗ trợ bạn sớm nhất.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
    <div class="max-w-6xl mx-auto px-4 text-center space-y-3">
      <p class="font-bold text-slate-200 text-sm editable-text" data-key="brandNameFooter" contenteditable="${isEditActive}">${cfg.brandName}</p>
      <p>Hotline hỗ trợ: <span class="text-white editable-text" data-key="hotlineFooter" contenteditable="${isEditActive}">${cfg.hotline}</span> • Địa chỉ: Hệ thống cơ sở toàn quốc</p>
      <p class="text-slate-500">Trang được xuất bản tự động qua nền tảng PromptToSite AI Platform.</p>
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

        // Gửi thông tin về Parent Window (Web Studio) để cập nhật CRM & kích hoạt Telegram Bot
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

      // 1. Bật/Tắt chế độ Edit trực quan
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

      // 2. Đổi Palette Màu sắc trực tiếp
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

      // 3. Cập nhật trường dữ liệu cụ thể
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
