"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Smartphone,
  Flame,
  CheckCircle2,
  Globe,
  Bell,
  Download,
  Code2,
  Server,
  Share2,
  Lock,
  ChevronRight,
  ExternalLink,
  Award,
  Users,
  Target,
  BarChart3,
  Bot,
  Terminal,
  RefreshCw,
  Star,
  Check,
} from "lucide-react";

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState<"mvp" | "future">("mvp");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* =========================================================================
          TOP NAVIGATION BAR
      ========================================================================= */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 md:px-8 py-3.5 transition">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Subtitle */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/25 group-hover:scale-105 transition duration-300">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white tracking-tight text-lg group-hover:text-cyan-400 transition">
                  PromptToSite
                </span>
                <span className="text-[10px] bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  PITCH SHOWCASE 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Đề án tham dự cuộc thi: <b>HaUI - Startup Mindset 2026</b>
              </p>
            </div>
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition duration-200"
            >
              <span>Vào Trải Nghiệm Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO SECTION: CHẤN ĐỘNG & ĐẦY NĂNG LƯỢNG KHỞI NGHIỆP
      ========================================================================= */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Ambient Glow Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/25 via-indigo-600/20 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          {/* Badge phát sáng */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-300 text-xs font-bold shadow-inner">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>ĐỀ ÁN ĐỔI MỚI SÁNG TẠO SỐ • ĐẠI HỌC CÔNG NGHIỆP HÀ NỘI (HaUI)</span>
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Từ Câu Lệnh Đến Doanh Số: <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Dân Chủ Hóa Thương Mại Số
            </span>{" "}
            Cho 5 Triệu Hộ Kinh Doanh
          </h1>

          {/* Mô tả truyền cảm hứng */}
          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Không cần biết lập trình, không tốn hàng tuần chờ đợi agency. <b>PromptToSite</b> biến ý tưởng bán hàng thành{" "}
            <b>Landing Page chuẩn CRO trong 30 giây</b> — sẵn sàng kết nối cổng AI mở (MCP Server), máy chủ Docker Sandbox On-Demand và hệ thống chốt khách tự động reo chuông Telegram.
          </p>

          {/* Nút hành động chính */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition duration-200"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Trải Nghiệm Trực Tiếp Web Studio (MVP)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#future-roadmap"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <span>Xem Tầm Nhìn & Lộ Trình Tương Lai</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-1">
              <p className="text-2xl md:text-3xl font-black text-cyan-400 font-mono">30 Giây</p>
              <p className="text-xs text-slate-400 font-medium">Từ Prompt thô đến Landing Page tương tác thật</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-1">
              <p className="text-2xl md:text-3xl font-black text-emerald-400 font-mono">0 Đồng</p>
              <p className="text-xs text-slate-400 font-medium">Chi phí khóa nền tảng (Tự do tải mã nguồn sạch .zip)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-1">
              <p className="text-2xl md:text-3xl font-black text-amber-400 font-mono">&lt; 2 Giây</p>
              <p className="text-xs text-slate-400 font-medium">Bắn thông báo Lead về Telegram reo chuông điện thoại</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-1">
              <p className="text-2xl md:text-3xl font-black text-indigo-400 font-mono">100%</p>
              <p className="text-xs text-slate-400 font-medium">Chuẩn Responsive, không bao giờ vỡ giao diện Mobile</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: VẤN ĐỀ THỊ TRƯỜNG & NỖI ĐAU CỦA 5 TRIỆU TIỂU THƯƠNG
      ========================================================================= */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-400">
              Bối Cảnh & Thách Thức Thực Tế
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-white">
              Tại Sao 5 Triệu Hộ Kinh Doanh Vẫn "Kẹt Lại" Trong Kỷ Nguyên Số?
            </p>
            <p className="text-xs sm:text-sm text-slate-400">
              Theo Báo cáo Thương mại điện tử Việt Nam 2025, hơn 82% tiểu thương muốn xây dựng kênh bán hàng độc lập nhưng gặp phải rào cản quá lớn:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-red-500/20 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center text-2xl font-bold">
                💸
              </div>
              <h3 className="text-lg font-bold text-white">Thuê Agency Quá Đắt Đỏ</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Chi phí từ <b>5 – 15 triệu VNĐ</b> cho 1 trang đơn giản, mất từ <b>2 – 4 tuần</b> hoàn thiện. Khi cần sửa giá hoặc chạy chiến dịch flash sale trong ngày thì hoàn toàn bị động và phụ thuộc.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl font-bold">
                🧩
              </div>
              <h3 className="text-lg font-bold text-white">Công Cụ Kéo Thả Quá Phức Tạp</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Các nền tảng như Ladipage, Wix hay Webflow đòi hỏi hàng trăm thao tác căn chỉnh pixel, canh lề CSS. Người dùng phổ thông thường xuyên gặp lỗi <b>vỡ khung hình trên điện thoại di động</b>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-2xl font-bold">
                📉
              </div>
              <h3 className="text-lg font-bold text-white">Mất Khách Do Phản Hồi Chậm</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Khách hàng để lại thông tin nhưng không có hệ thống CRM tự động. Đến khi người bán mở email kiểm tra thì khách đã mua của đối thủ. Cần một cơ chế <b>bắn chuông báo Telegram tức thì dưới 2 giây</b>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BẢN MVP ĐANG LÀM ĐƯỢC GÌ HÔM NAY (PROVEN & TESTED)
      ========================================================================= */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thực Tế Đã Triển Khai (Ready to Use)</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Bản MVP Hôm Nay: Đã Hoàn Thiện & Đang Hoạt Động 100%
              </h2>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-cyan-300 transition"
            >
              <span>Xem trực tiếp trên Web Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tính năng 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">AI Block-Driven Engine Chuẩn CRO</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tự động trích xuất thực thể (Thương hiệu, Ngành hàng, Mức giảm giá, Hotline) và ghép 6 khối Tailwind CSS đạt chuẩn tâm lý AIDA: Banner khẩn cấp, Navbar, Hero, Cam kết 3 cột, Bảng giá & Form đăng ký.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Đã có sẵn 4 preset ngành lớn
              </div>
            </div>

            {/* Tính năng 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Click-to-Edit: Sửa Trực Quan 1-Click</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bấm nút "Sửa Nhanh" trên thanh URL, toàn bộ chữ trên trang chuyển sang viền nét đứt. Người dùng click trực tiếp vào văn bản để sửa tiêu đề, bảng giá; dữ liệu tự động đồng bộ 2 chiều qua <code>postMessage</code>.
              </p>
              <div className="pt-2 text-[11px] font-mono text-amber-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Chỉnh sửa tức thì không reload
              </div>
            </div>

            {/* Tính năng 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/40 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Theme Palette Switcher 6 Màu Sắc</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tích hợp 6 bảng màu chuẩn UX (Spa Ngọc Lam, Tech Tím, Nông sản Xanh lá, Thời trang Hồng, Cà phê Nâu, Sang trọng Đen). Thay đổi màu chủ đạo và điểm nhấn toàn trang web ngay trong 100ms bằng CSS variables.
              </p>
              <div className="pt-2 text-[11px] font-mono text-pink-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 6 Bảng màu thiết kế cao cấp
              </div>
            </div>

            {/* Tính năng 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Mini CRM Bền Vững & Bắn Telegram</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bắt sự kiện điền form trực tiếp, kích hoạt hiệu ứng pháo hoa, lưu vĩnh viễn vào <code>data/leads.json</code> và bắn tin nhắn về điện thoại qua Telegram Bot API dưới 2 giây. Hỗ trợ <b>Xuất file Excel/CSV chuẩn UTF-8 Tiếng Việt</b>.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Reo chuông & Xuất Excel 1-click
              </div>
            </div>

            {/* Tính năng 5 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Cổng Model Context Protocol (MCP)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Endpoint JSON-RPC 2.0 chuẩn hóa tại <code>/api/mcp</code>. Cho phép Claude Desktop, ChatGPT hay Cursor kết nối điều khiển: sinh trang mới (<code>generate_landing_page</code>), sửa khối (<code>update_landing_page_block</code>) và lấy leads CRM.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Chuẩn Anthropic MCP Protocol
              </div>
            </div>

            {/* Tính năng 6 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Xuất Bản Mã QR & Tải Trọn Bộ ZIP</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tạo mã QR tức thì để Ban Giám khảo quét camera vào xem trang web thật trên điện thoại. Nút <b>"Tải ZIP"</b> cho phép trích xuất mã nguồn HTML/JS sạch sẽ để tải lên bất kỳ hosting nào (Vercel, cPanel, Netlify) mà không bị giữ chân.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Không khóa nền tảng (No Lock-in)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TƯƠNG LAI KHI HOÀN THÀNH (THE VISION & MOONSHOT ROADMAP)
      ========================================================================= */}
      <section id="future-roadmap" className="py-20 bg-slate-900/50 border-t border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
              Tầm Nhìn Đột Phá • Roadmap 2026 - 2028
            </span>
            <p className="text-2xl sm:text-4xl font-extrabold text-white">
              Sản Phẩm Sẽ Làm Được Gì Khi Hoàn Thành Trọn Vẹn?
            </p>
            <p className="text-xs sm:text-sm text-slate-400">
              PromptToSite không dừng lại ở một trang tạo web. Khi hoàn thiện, đây sẽ là <b>Nền tảng Tác nhân Thương mại Toàn diện (Autonomous Commerce Agent Ecosystem)</b> với 4 trụ cột chiến lược:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Trụ cột tương lai 1 */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/30 border border-blue-500/30 space-y-4 relative overflow-hidden shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-2xl">
                🐳
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Trụ Cột 1 • Hạ Tầng Đám Mây</span>
                <h3 className="text-xl font-black text-white">On-Demand Docker Sandbox & Caddy TLS Tự Động</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mỗi tiểu thương khi đăng ký sẽ được khởi tạo <b>1 Container Docker độc lập</b> trên nền tảng. Dữ liệu, mã nguồn và tệp khách hàng được mã hóa cô lập hoàn toàn, giải quyết triệt để rủi ro rò rỉ dữ liệu giữa các doanh nghiệp.
              </p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><b>Caddy On-Demand TLS:</b> Tự động cấp phát chứng chỉ SSL Let's Encrypt cho tên miền riêng của khách hàng (VD: <code>tiembanhbanmai.vn</code>) trong 5 giây mà không cần cấu hình DNS phức tạp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><b>Zero-Cold-Start Hibernation:</b> Tự động "ngủ đông" container khi không có truy cập và "đánh thức" trong 300ms khi có khách vào xem, tiết kiệm 70% chi phí máy chủ.</span>
                </li>
              </ul>
            </div>

            {/* Trụ cột tương lai 2 */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/30 border border-indigo-500/30 space-y-4 relative overflow-hidden shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-2xl">
                🧠
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Trụ Cột 2 • Trí Tuệ Nhân Tạo Mở</span>
                <h3 className="text-xl font-black text-white">Bring Your Own Key (BYOK) & Chợ Kỹ Năng Agent Harness</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Người dùng không bị ép buộc dùng AI đóng kín của nền tảng. Khách hàng có thể kết nối tài khoản ChatGPT Plus, Claude Team, hoặc Gemini cá nhân (BYOK). Hệ thống cung cấp sẵn khung <b>Agent Harness</b> chuyên biệt hóa cho thương mại:
              </p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span><b>Tự Động A/B Testing Bằng AI:</b> Tác nhân AI tự động tạo ra 3 biến thể tiêu đề và ảnh bìa khác nhau, luân phiên phân phối và tự chọn phương án có tỷ lệ chốt lead cao nhất.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span><b>Chợ Kỹ Năng (PromptToSite Skills Marketplace):</b> Các chuyên gia marketing có thể đăng bán các skill tối ưu bán hàng (như Skill viết kịch bản Flash Sale, Skill bán thời trang GenZ) với tỷ lệ chia sẻ doanh thu 70/30.</span>
                </li>
              </ul>
            </div>

            {/* Trụ cột tương lai 3 */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-emerald-500/30 space-y-4 relative overflow-hidden shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-2xl">
                ⚡
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Trụ Cột 3 • Chốt Đơn Đa Kênh</span>
                <h3 className="text-xl font-black text-white">Omni-Channel Lead Hub & Telesale AI Voice Agent</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Khách hàng điền form không chỉ nằm im trong trang quản trị. Toàn bộ thông tin được phân luồng tự động đa kênh để biến cơ hội thành tiền mặt ngay trong 5 phút đầu tiên:
              </p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><b>Tự Động Bắn Zalo ZNS & SMS Brandname:</b> Khách vừa bấm submit, tin nhắn xác nhận ưu đãi kèm mã voucher xuất hiện ngay trên Zalo của họ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><b>Telesale AI Voice Gọi Xác Nhận:</b> Trợ lý giọng nói AI (giọng 3 miền tự nhiên) tự động quay số gọi cho khách hàng để xác nhận địa chỉ giao hàng và khung giờ tư vấn.</span>
                </li>
              </ul>
            </div>

            {/* Trụ cột tương lai 4 */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/30 border border-amber-500/30 space-y-4 relative overflow-hidden shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-2xl">
                🛡️
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Trụ Cột 4 • Pháp Lý & Chủ Quyền Số</span>
                <h3 className="text-xl font-black text-white">Chuẩn Hóa Pháp Lý Số Việt Nam 2026</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                PromptToSite định vị là nền tảng tiên phong tuân thủ đầy đủ khuôn khổ pháp lý mới nhất của Quốc hội Việt Nam ban hành, bảo vệ tuyệt đối uy tín và pháp lý cho người bán:
              </p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span><b>Luật Bảo vệ Dữ liệu Cá nhân số 91/2025/QH15:</b> Cơ chế xin phép thu thập thông tin (Consent Management), mã hóa một chiều số điện thoại khách hàng, quyền yêu cầu xóa dữ liệu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span><b>Luật Công nghiệp Công nghệ Số & Luật AI số 134/2025/QH15:</b> Gắn nhãn nhận diện nội dung do AI tạo ra (AI Watermarking & Disclosure), ngăn ngừa gian lận thương mại trực tuyến.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SO SÁNH TRỰC DIỆN (COMPETITIVE ADVANTAGE)
      ========================================================================= */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-400">
              Bảng So Sánh Năng Lực
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">
              PromptToSite Vượt Trội Như Thế Nào So Với Giải Pháp Truyền Thống?
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse rounded-2xl overflow-hidden border border-slate-800">
              <thead className="bg-slate-900 text-slate-300 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-4">Tiêu Chí So Sánh</th>
                  <th className="p-4 text-slate-400">Thuê Agency Ngoài</th>
                  <th className="p-4 text-slate-400">Nền Tảng Kéo Thả (Wix, Ladipage)</th>
                  <th className="p-4 text-cyan-400 bg-blue-950/40">PromptToSite (Đề án)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/60 text-slate-300">
                <tr>
                  <td className="p-4 font-bold text-white">Thời gian hoàn thiện</td>
                  <td className="p-4 text-red-400">2 – 4 tuần</td>
                  <td className="p-4 text-amber-400">3 – 7 ngày tự kéo thả</td>
                  <td className="p-4 font-bold text-emerald-400 bg-blue-950/20">⚡ 30 Giây bằng câu lệnh</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Chi phí ban đầu</td>
                  <td className="p-4 text-red-400">5 – 15 triệu VNĐ</td>
                  <td className="p-4 text-amber-400">1.5 – 3 triệu/năm phí duy trì</td>
                  <td className="p-4 font-bold text-emerald-400 bg-blue-950/20">🎉 Miễn phí bắt đầu (0đ)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Độ khó khi chỉnh sửa</td>
                  <td className="p-4 text-red-400">Phải gọi thợ, trả thêm phí</td>
                  <td className="p-4 text-amber-400">Phức tạp, dễ lệch layout mobile</td>
                  <td className="p-4 font-bold text-emerald-400 bg-blue-950/20">✨ Click-to-Edit trực quan</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Tốc độ chốt khách (Lead Alert)</td>
                  <td className="p-4 text-slate-400">Nhận qua Email (chậm)</td>
                  <td className="p-4 text-slate-400">Cần mua thêm gói Webhook nâng cao</td>
                  <td className="p-4 font-bold text-emerald-400 bg-blue-950/20">🔔 Bắn Telegram reo chuông &lt; 2s</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Quyền sở hữu mã nguồn</td>
                  <td className="p-4 text-slate-400">Bị tính phí nếu xin file</td>
                  <td className="p-4 text-red-400">Bị khóa chặt (Vendor Lock-in)</td>
                  <td className="p-4 font-bold text-emerald-400 bg-blue-950/20">📦 Tải file .zip sạch 100%</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Khả năng mở rộng AI (MCP)</td>
                  <td className="p-4 text-slate-400">Không hỗ trợ</td>
                  <td className="p-4 text-slate-400">Hệ sinh thái đóng</td>
                  <td className="p-4 font-bold text-emerald-400 bg-blue-950/20">🚀 Cổng MCP Server mở chuẩn 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: THÔNG ĐIỆP GỬI BAN GIÁM KHẢO (PITCH CALL-TO-ACTION)
      ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center text-3xl mx-auto shadow-xl shadow-blue-500/20">
            🎯
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white">
            "Không Phải Sản Phẩm Trình Diễn – Đây Là Cỗ Máy Khởi Nghiệp Thật"
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Kính thưa Hội đồng Ban Giám khảo cuộc thi <b>HaUI - Startup Mindset 2026</b>,<br />
            Đề án <b>PromptToSite</b> được xây dựng không chỉ để giải một bài toán lý thuyết. Chúng tôi mang đến một sản phẩm thực tế, có thể vận hành ngay hôm nay và mang lại giá trị gia tăng tức thì cho hàng triệu tiểu thương Việt Nam trong làn sóng chuyển đổi số quốc gia.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition duration-200"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Chuyển Sang Trải Nghiệm Web Studio Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 pt-6">
            Dự án được phát triển bởi sinh viên Đỗ Đăng Trường • Đại học Công nghiệp Hà Nội (HaUI) • Tháng 11/2026
          </p>
        </div>
      </section>

      {/* =========================================================================
          FOOTER
      ========================================================================= */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-600">
        <p>© 2026 PromptToSite AI Platform. Đổi mới sáng tạo & Khát vọng số vì cộng đồng kinh doanh Việt Nam.</p>
      </footer>
    </div>
  );
}

