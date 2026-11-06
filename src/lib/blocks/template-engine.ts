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

export const INDUSTRY_PRESETS: Record<IndustryType, TemplateBlockConfig> = {
  spa: {
    brandName: "Viện Thẩm Mỹ Ban Mai",
    tagline: "ĐÁNH THỨC VẺ ĐẸP TỰ NHIÊN THUẦN KHIẾT",
    headline: "Lấy Lại Vóc Dáng Thon Gọn & Làn Da Căng Bóng Chỉ Sau 60 Phút",
    subheadline: "Công nghệ hủy mỡ đa tầng Hoa Kỳ kết hợp cấy tinh chất tái sinh tế bào gốc. Cam kết văn bản: Giảm 5–10cm vòng eo, không đau, không nghỉ dưỡng.",
    discountText: "ƯU ĐÃI KHAI TRƯƠNG: GIẢM 40% CHO 50 KHÁCH HÀNG ĐẦU TIÊN",
    primaryColorHex: "#0d9488", // Teal 600
    accentColorHex: "#d97706",  // Amber 600
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    hotline: "0988.123.456",
    features: [
      { title: "Bác Sĩ 15 Năm Kinh Nghiệm", desc: "Trực tiếp thăm khám, siêu âm và lên phác đồ chuẩn y khoa riêng cho từng cơ địa.", icon: "👩‍⚕️" },
      { title: "Cam Kết Hoàn Tiền 100%", desc: "Ký cam kết hiệu quả bằng văn bản pháp lý trước khi thực hiện liệu trình.", icon: "📜" },
      { title: "Bảo Mật Dữ Liệu Khách Hàng", desc: "Hệ thống bảo vệ thông tin cá nhân tuyệt đối theo chuẩn Luật DLCN 91/2025.", icon: "🛡️" }
    ],
    pricing: [
      { name: "Gói Trải Nghiệm", price: "299.000đ", originalPrice: "500.000đ", desc: "Thăm khám chuyên sâu + 01 buổi massage giải cơ săn chắc bụng." },
      { name: "Gói Điêu Khắc Eo Thon VIP", price: "1.890.000đ", originalPrice: "3.200.000đ", desc: "Liệu trình hủy mỡ 5 buổi công nghệ cao + tặng gói thải độc collagen.", badge: "BÁN CHẠY NHẤT" },
      { name: "Gói Trọn Gói Tái Sinh Toàn Diện", price: "4.500.000đ", originalPrice: "7.500.000đ", desc: "Cam kết giảm 10-15cm vòng eo + bảo hành duy trì vóc dáng 2 năm." }
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
    discountText: "MUA 1 TẶNG 1 TOÀN BỘ MENU TRONG TUẦN LỄ RA MẮT",
    primaryColorHex: "#78350f", // Amber 900 / Warm Brown
    accentColorHex: "#b45309",  // Amber 700
    heroImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    hotline: "0909.888.999",
    features: [
      { title: "Hạt Cà Phê Hái Chín 100%", desc: "Chọn lọc từng quả chín mọng từ nông trại độ cao 1.500m tại Cầu Đất, Đà Lạt.", icon: "☕" },
      { title: "Rang Mộc Mẻ Nhỏ Hằng Ngày", desc: "Đảm bảo hạt cà phê luôn giữ trọn hương vị tươi mới và lớp crema vàng óng.", icon: "🔥" },
      { title: "Giao Nhanh Tận Nơi 30 Phút", desc: "Đóng gói túi zip van 1 chiều cao cấp hoặc ly cách nhiệt giữ lạnh 4 tiếng.", icon: "⚡" }
    ],
    pricing: [
      { name: "Cold Brew Mộc", price: "39.000đ", originalPrice: "55.000đ", desc: "Ủ lạnh 16 tiếng với hạt Arabica Cầu Đất, vị chua thanh dịu ngọt hậu." },
      { name: "Combo Cà Phê Hạt Pha Phin (500g)", price: "145.000đ", originalPrice: "190.000đ", desc: "Tặng kèm phin nhôm mạ anot cao cấp + cẩm nang pha chế tại nhà.", badge: "HOT" },
      { name: "Gói Đăng Ký Tháng (30 Ly)", price: "899.000đ", originalPrice: "1.350.000đ", desc: "Mỗi sáng 1 ly giao tận bàn làm việc miễn phí ship toàn quận." }
    ],
    testimonials: [
      { name: "Anh Hoàng Nam", role: "Lập trình viên", comment: "Vị cà phê ở đây rất sạch, uống không bị ép tim hay nôn nao như cà phê tẩm bắp rang ngoài đường.", rating: 5 },
      { name: "Thu Trang", role: "Graphic Designer", comment: "Giao hàng siêu nhanh, túi cà phê mở ra thơm nức mũi cả phòng làm việc!", rating: 5 }
    ]
  },
  course: {
    brandName: "Học Viện Kỹ Năng Số NextGen",
    tagline: "BỨT PHÁ THU NHẬP TRONG KỶ NGUYÊN TRÍ TUỆ NHÂN TẠO",
    headline: "Làm Chủ Kỹ Năng AI & Marketing Để Tăng Gấp Đôi Thu Nhập Trong 30 Ngày",
    subheadline: "Khóa học thực chiến 'Cầm tay chỉ việc': Tự động hóa bán hàng, ứng dụng ChatGPT & Canva để sáng tạo nội dung triệu view mà không cần biết lập trình.",
    discountText: "HỌC BỔNG TRỢ GIÁ 50% – CHỈ CÒN 30 SUẤT HỌC THÁNG NÀY",
    primaryColorHex: "#2563eb", // Blue 600
    accentColorHex: "#7c3aed",  // Violet 600
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    hotline: "0918.555.777",
    features: [
      { title: "Giáo Trình Thực Chiến 100%", desc: "Học xong áp dụng được ngay vào công việc bán hàng, không lý thuyết suông.", icon: "🎯" },
      { title: "Cố Vấn 1:1 Cùng Giảng Viên", desc: "Chấm bài trực tiếp, giải đáp thắc mắc và hỗ trợ trọn đời qua nhóm kín VIP.", icon: "👨‍🏫" },
      { title: "Bộ Template & Prompt Độc Quyền", desc: "Tặng kèm kho 500+ Prompt AI triệu đô và bộ 100 mẫu Landing Page chuẩn SEO.", icon: "🎁" }
    ],
    pricing: [
      { name: "Gói Khởi Động (Online)", price: "499.000đ", originalPrice: "1.200.000đ", desc: "Truy cập trọn đời 20 bài giảng video + tài liệu thực hành." },
      { name: "Gói Kèm Cặp Chuyên Sâu VIP", price: "1.490.000đ", originalPrice: "2.990.000đ", desc: "4 tuần Zoom trực tiếp + 1:1 sửa dự án kinh doanh thật của bạn.", badge: "ĐỀ XUẤT" },
      { name: "Gói Doanh Nghiệp / Đội Nhóm", price: "4.900.000đ", originalPrice: "9.000.000đ", desc: "Đào tạo in-house tối đa 10 nhân sự + setup quy trình tự động hóa." }
    ],
    testimonials: [
      { name: "Hải Đăng", role: "Chủ shop phụ kiện", comment: "Áp dụng công thức viết bài AI từ buổi 3 mà shop mình tăng gấp 3 lượng tin nhắn hỏi mua hàng!", rating: 5 },
      { name: "Phương Linh", role: "Sinh viên năm cuối", comment: "Khóa học rất thực tế, giúp em nhận được job freelance đầu tiên ngay trong tháng học.", rating: 5 }
    ]
  },
  fashion: {
    brandName: "L'AURA Chic Boutique",
    tagline: "PHONG CÁCH THANH LỊCH & THỜI THƯỢNG CHO PHÁI ĐẸP",
    headline: "Bộ Sưu Tập Thời Trang Thu Đông 2026: Tôn Vinh Khí Chất Quý Cô",
    subheadline: "Chất liệu lụa satin & dạ tweed nhập khẩu cao cấp. Thiết kế form dáng chuẩn eo phụ nữ Á Đông, che khuyết điểm hoàn hảo, tự tin tỏa sáng mọi sự kiện.",
    discountText: "GIẢM 30% TOÀN BỘ BỘ SƯU TẬP MỚI + FREESHIP ĐƠN TỪ 500K",
    primaryColorHex: "#9d174d", // Rose 800
    accentColorHex: "#be185d",  // Pink 700
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    hotline: "0934.666.777",
    features: [
      { title: "Chất Liệu Tuyển Chọn Cao Cấp", desc: "Vải mềm mịn, thoáng khí, không nhăn xù, giữ màu bền đẹp sau nhiều lần giặt.", icon: "👗" },
      { title: "Đổi Trả Miễn Phí Trong 7 Ngày", desc: "Thử đồ tại nhà, không vừa size hoặc không ưng chất vải được đổi trả tận nơi.", icon: "🔄" },
      { title: "Tư Vấn Phối Đồ Cá Nhân Hóa", desc: "Stylist chuyên nghiệp hỗ trợ mix đồ theo từng vóc dáng và màu da hoàn toàn miễn phí.", icon: "✨" }
    ],
    pricing: [
      { name: "Đầm Lụa Dạ Tiệc L'Aura", price: "650.000đ", originalPrice: "950.000đ", desc: "Thiết kế cổ yếm quyến rũ, chất lụa rủ thướt tha tôn dáng cực đỉnh." },
      { name: "Set Áo Dạ Tweed + Chân Váy", price: "1.190.000đ", originalPrice: "1.700.000đ", desc: "Form dáng sang chảnh tiểu thư, cúc ngọc trai tinh xảo cao cấp.", badge: "BEST-SELLER" },
      { name: "Măng Tô Dạ Ép Lông Cừu", price: "1.890.000đ", originalPrice: "2.600.000đ", desc: "Ấm áp nhẹ tênh, chuẩn phong cách quý cô Paris thanh lịch." }
    ],
    testimonials: [
      { name: "Khánh Vy", role: "MC Truyền hình", comment: "Vải đầm cực kỳ xịn, đường may tỉ mỉ từng milimet. Lên sóng ai cũng khen đầm sang trọng!", rating: 5 },
      { name: "Ngọc Mai", role: "Chủ viện nha khoa", comment: "Giao hàng nhanh, đóng hộp có nơ thơm tho như mở quà sinh nhật. Sẽ ủng hộ shop dài dài!", rating: 5 }
    ]
  },
  general: {
    brandName: "SmartGrowth Solutions",
    tagline: "GIẢI PHÁP TĂNG TRƯỞNG KINH DOANH ĐỘT PHÁ",
    headline: "Tăng Trưởng Doanh Số Bán Hàng Vượt Bậc Với Giải Pháp Toàn Diện",
    subheadline: "Tối ưu hóa quy trình marketing, thu hút khách hàng tiềm năng chất lượng cao và tự động hóa khâu chuyển đổi chốt đơn chỉ trên 1 nền tảng.",
    discountText: "DÙNG THỬ MIỄN PHÍ 14 NGÀY – KHÔNG CẦN THẺ TÍN DỤNG",
    primaryColorHex: "#1e3a8a", // Blue 900
    accentColorHex: "#0284c7",  // Sky 600
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    hotline: "0901.234.567",
    features: [
      { title: "Triển Khai Nhanh Chóng", desc: "Chỉ mất 5 phút để kích hoạt hệ thống và bắt đầu đón khách hàng đầu tiên.", icon: "🚀" },
      { title: "Báo Cáo Thời Gian Thực", desc: "Đo lường chính xác từng đồng chi phí và tỷ lệ chuyển đổi đơn hàng.", icon: "📊" },
      { title: "Hỗ Trợ 24/7", desc: "Đội ngũ chuyên gia kỹ thuật đồng hành xuyên suốt quá trình vận hành.", icon: "💬" }
    ],
    pricing: [
      { name: "Gói Khởi Nghiệp", price: "199.000đ", originalPrice: "350.000đ", desc: "Đầy đủ tính năng thiết yếu cho cá nhân và chủ shop nhỏ." },
      { name: "Gói Tăng Tốc Pro", price: "499.000đ", originalPrice: "800.000đ", desc: "Không giới hạn lưu lượng, kết nối tên miền riêng và CRM tự động.", badge: "PHỔ BIẾN" },
      { name: "Gói Doanh Nghiệp", price: "1.299.000đ", originalPrice: "2.000.000đ", desc: "Phân quyền đa tài khoản, webhook CRM và hỗ trợ ưu tiên 1:1." }
    ],
    testimonials: [
      { name: "Nguyễn Văn Tuấn", role: "CEO TechStart", comment: "Sản phẩm giúp công ty mình tiết kiệm hơn 70% chi phí làm trang đích cho các chiến dịch marketing.", rating: 5 },
      { name: "Trần Bảo Ngọc", role: "Chủ chuỗi cửa hàng", comment: "Giao diện thân thiện, báo lead về điện thoại tức thì giúp nhân viên chốt sale cực kỳ kịp thời.", rating: 5 }
    ]
  }
};

/**
 * Hàm sinh HTML Landing Page hoàn chỉnh từ cấu hình
 */
export function generateLandingPageHtml(cfg: TemplateBlockConfig): string {
  const pCol = cfg.primaryColorHex;
  const aCol = cfg.accentColorHex;

  return `<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cfg.brandName} - ${cfg.tagline}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .primary-bg { background-color: ${pCol}; }
    .primary-text { color: ${pCol}; }
    .primary-border { border-color: ${pCol}; }
    .accent-bg { background-color: ${aCol}; }
    .accent-text { color: ${aCol}; }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased selection:bg-teal-500 selection:text-white">

  <!-- TOP BANNER ƯU ĐÃI -->
  <div class="primary-bg text-white text-xs md:text-sm font-semibold py-2.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
    <span>🔥</span>
    <span class="editable" data-key="discountText">${cfg.discountText}</span>
  </div>

  <!-- NAVBAR -->
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-2xl font-black primary-text tracking-tight editable" data-key="brandName">${cfg.brandName}</span>
      </div>
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a href="#loi-ich" class="hover:text-slate-900 transition">Lợi Ích</a>
        <a href="#bang-gia" class="hover:text-slate-900 transition">Bảng Giá</a>
        <a href="#danh-gia" class="hover:text-slate-900 transition">Đánh Giá</a>
      </div>
      <a href="#dat-hang" class="primary-bg text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md hover:opacity-95 transition transform hover:-translate-y-0.5">
        Đăng Ký Ngay
      </a>
    </div>
  </nav>

  <!-- HERO SECTION -->
  <section class="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <!-- Cột Nội Dung Trái (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold primary-text">
          <span>✨</span>
          <span class="editable" data-key="tagline">${cfg.tagline}</span>
        </div>
        <h1 class="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight editable" data-key="headline">
          ${cfg.headline}
        </h1>
        <p class="text-base md:text-lg text-slate-600 leading-relaxed editable" data-key="subheadline">
          ${cfg.subheadline}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <a href="#dat-hang" class="accent-bg text-white font-bold text-center px-8 py-4 rounded-xl shadow-lg hover:opacity-95 transition transform hover:-translate-y-0.5 text-base">
            NHẬN ƯU ĐÃI NGAY ➔
          </a>
          <a href="#bang-gia" class="border border-slate-300 bg-white text-slate-700 font-bold text-center px-8 py-4 rounded-xl hover:bg-slate-50 transition text-base">
            Xem Bảng Giá
          </a>
        </div>

        <!-- Social Proof Thống kê -->
        <div class="pt-6 border-t border-slate-200 flex items-center gap-8 text-xs md:text-sm text-slate-500 font-medium">
          <div class="flex items-center gap-2">
            <span class="text-emerald-500 text-base">✓</span> 1.500+ Khách hài lòng
          </div>
          <div class="flex items-center gap-2">
            <span class="text-amber-500 text-base">★</span> 4.9/5 Đánh giá tích cực
          </div>
          <div class="flex items-center gap-2">
            <span class="text-blue-500 text-base">🛡️</span> Bảo hành chính hãng
          </div>
        </div>
      </div>

      <!-- Cột Form Đăng Ký Phải (5 cols) -->
      <div class="lg:col-span-5" id="dat-hang">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 relative">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 primary-bg text-white text-xs font-bold px-4 py-1 rounded-full shadow">
            ĐẶT LỊCH / GIỮ CHỖ HÔM NAY
          </div>

          <h3 class="text-xl font-bold text-slate-900 text-center mt-2 mb-2">Điền Thông Tin Nhận Ưu Đãi</h3>
          <p class="text-xs text-slate-500 text-center mb-6">Chuyên viên sẽ liên hệ lại xác nhận trong vòng 5 phút</p>

          <!-- Form bắt Lead -->
          <form id="leadCaptureForm" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Họ và tên của bạn:</label>
              <input type="text" name="fullName" required placeholder="Ví dụ: Nguyễn Văn A" class="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Số điện thoại nhận mã Zalo/SMS:</label>
              <input type="tel" name="phone" required placeholder="Ví dụ: 0912 345 678" class="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Ghi chú hoặc dịch vụ quan tâm:</label>
              <input type="text" name="note" placeholder="Ví dụ: Tư vấn liệu trình phù hợp" class="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50">
            </div>

            <button type="submit" id="submitBtn" class="w-full accent-bg text-white font-bold py-3.5 rounded-lg text-sm shadow-md hover:opacity-95 transition transform hover:scale-[1.01]">
              GỬI ĐĂNG KÝ NGAY
            </button>
            <p class="text-[11px] text-slate-400 text-center">Cam kết bảo mật thông tin 100% theo Luật DLCN 91/2025.</p>
          </form>

          <!-- Thông báo sau khi submit -->
          <div id="successMsg" class="hidden text-center py-8 space-y-3">
            <div class="text-4xl text-emerald-500">🎉</div>
            <h4 class="text-lg font-bold text-slate-900">Đăng Ký Thành Công!</h4>
            <p class="text-xs text-slate-600">Cảm ơn bạn! Đội ngũ tư vấn sẽ liên hệ lại với bạn ngay trong ít phút.</p>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- FEATURES SECTION -->
  <section id="loi-ich" class="py-16 bg-white border-y border-slate-100">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900">Tại Sao Khách Hàng Luôn Tin Chọn Chúng Tôi?</h2>
        <p class="text-sm text-slate-500 mt-2">Chất lượng dịch vụ chuẩn mực và sự tận tâm hướng đến sự hài lòng tối đa</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${cfg.features.map(f => `
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition">
            <div class="text-3xl mb-4">${f.icon}</div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">${f.title}</h3>
            <p class="text-sm text-slate-600 leading-relaxed">${f.desc}</p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- PRICING SECTION -->
  <section id="bang-gia" class="py-16 bg-slate-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900">Bảng Giá Dịch Vụ Minh Bạch</h2>
        <p class="text-sm text-slate-500 mt-2">Nhiều lựa chọn phù hợp với nhu cầu và ngân sách của bạn</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        ${cfg.pricing.map(p => `
          <div class="bg-white rounded-2xl p-6 md:p-8 border ${p.badge ? 'primary-border ring-2 ring-teal-500/20' : 'border-slate-200'} shadow-sm flex flex-col justify-between relative">
            ${p.badge ? `<div class="absolute -top-3 right-6 accent-bg text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow">${p.badge}</div>` : ''}
            <div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">${p.name}</h3>
              <p class="text-xs text-slate-500 mb-4">${p.desc}</p>
              <div class="mb-6 flex items-baseline gap-2">
                <span class="text-3xl font-extrabold primary-text">${p.price}</span>
                <span class="text-xs text-slate-400 line-through">${p.originalPrice}</span>
              </div>
            </div>
            <a href="#dat-hang" class="w-full block text-center py-3 rounded-lg font-bold text-sm ${p.badge ? 'primary-bg text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} transition">
              Đăng Ký Gói Này
            </a>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS SECTION -->
  <section id="danh-gia" class="py-16 bg-white border-t border-slate-100">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900">Cảm Nhận Từ Khách Hàng Thực Tế</h2>
        <p class="text-sm text-slate-500 mt-2">Hơn 98% khách hàng giới thiệu người thân sau khi trải nghiệm</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${cfg.testimonials.map(t => `
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div class="text-amber-400 text-sm">${'★'.repeat(t.rating)}</div>
            <p class="text-sm text-slate-700 italic leading-relaxed">"${t.comment}"</p>
            <div class="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <span class="font-bold text-slate-900">${t.name}</span>
              <span class="text-slate-500">${t.role}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
    <div class="max-w-6xl mx-auto px-4 text-center space-y-3">
      <p class="font-bold text-slate-200 text-sm">${cfg.brandName}</p>
      <p>Hotline hỗ trợ: <span class="text-white">${cfg.hotline}</span> • Địa chỉ: Hệ thống cơ sở toàn quốc</p>
      <p class="text-slate-600">Trang được xuất bản tự động qua nền tảng PromptToSite AI Platform.</p>
    </div>
  </footer>

  <!-- SCRIPT BẮT LEAD & GIAO TIẾP VỚI PARENT STUDIO QUA POSTMESSAGE -->
  <script>
    const form = document.getElementById('leadCaptureForm');
    const successMsg = document.getElementById('successMsg');
    const submitBtn = document.getElementById('submitBtn');

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

      // 1. Gửi thông tin về Parent Window (Web Studio) để bắn thông báo và kích hoạt Telegram Bot
      window.parent.postMessage({
        type: 'PROMPTTOSITE_LEAD_SUBMITTED',
        payload: leadData
      }, '*');

      // 2. Gọi API server (nếu có endpoint)
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

    // Lắng nghe lệnh cập nhật nội dung từ Parent Window (Click-to-edit)
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'PROMPTTOSITE_UPDATE_FIELD') {
        const { key, value } = event.data;
        const el = document.querySelector(\`[data-key="\${key}"]\`);
        if (el) el.innerText = value;
      }
    });
  </script>
</body>
</html>`;
}

