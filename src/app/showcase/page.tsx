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
  ArrowUpRight,
  HelpCircle,
} from "lucide-react";

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* =========================================================================
          TOP NAVIGATION BAR (LIGHT THEME)
      ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 transition shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Subtitle */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition duration-300">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg group-hover:text-blue-600 transition">
                  PromptToSite
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full border border-blue-200">
                  PITCH SHOWCASE 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Đề án dự thi: <span className="font-semibold text-slate-700">HaUI - Startup Mindset 2026</span>
              </p>
            </div>
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-md shadow-blue-600/25 transition duration-200"
            >
              <span>Vào Web Studio Trực Tiếp</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO SECTION (BRIGHT LIGHT THEME WITH AMBIENT GLOW)
      ========================================================================= */}
      <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-blue-50/30 to-slate-50">
        {/* Soft Ambient Light Gradient */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-blue-200/50 via-indigo-100/40 to-teal-100/30 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          {/* Badge danh dự */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-blue-700 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-500" />
            <span>ĐỀ ÁN ĐỔI MỚI SÁNG TẠO SỐ • ĐẠI HỌC CÔNG NGHIỆP HÀ NỘI (HaUI)</span>
          </div>

          {/* Tiêu đề chính lớn cuốn hút */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Từ Câu Lệnh Đến Doanh Số: <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600">
              Dân Chủ Hóa Thương Mại Số
            </span>{" "}
            Cho 5 Triệu Hộ Kinh Doanh
          </h1>

          {/* Mô tả giải pháp */}
          <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Không cần biết lập trình, không tốn hàng tuần chờ đợi agency. <b>PromptToSite</b> biến ý tưởng kinh doanh thành{" "}
            <span className="text-slate-900 font-bold">Landing Page bán hàng chuẩn CRO trong 30 giây</span> — tích hợp bộ sửa trực quan Click-to-Edit, cổng AI mở (MCP Server), máy chủ On-Demand Sandbox và hệ thống chốt khách reo chuông Telegram.
          </p>

          {/* Nhóm nút hành động */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transition duration-200"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Trải Nghiệm Trực Tiếp Web Studio (MVP)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#future-roadmap"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm"
            >
              <span>Xem Tầm Nhìn & Lộ Trình Tương Lai</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Metrics Bar Nổi Bật (Thẻ Trắng Nổi) */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1 hover:shadow-md transition">
              <p className="text-2xl md:text-3xl font-black text-blue-600 font-mono">30 Giây</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Từ câu lệnh thô đến Landing Page tương tác thật</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1 hover:shadow-md transition">
              <p className="text-2xl md:text-3xl font-black text-emerald-600 font-mono">0 Đồng</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Chi phí bản quyền ban đầu (Tự do tải mã nguồn sạch .zip)</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1 hover:shadow-md transition">
              <p className="text-2xl md:text-3xl font-black text-amber-600 font-mono">&lt; 2 Giây</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Bắn thông báo Lead về Telegram reo chuông điện thoại</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1 hover:shadow-md transition">
              <p className="text-2xl md:text-3xl font-black text-indigo-600 font-mono">100%</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Chuẩn Responsive, không bao giờ vỡ giao diện Mobile</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: VẤN ĐỀ THỊ TRƯỜNG & NỖI ĐAU CỦA 5 TRIỆU TIỂU THƯƠNG
      ========================================================================= */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-600">
              Bối Cảnh & Thách Thức Thực Tế
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Tại Sao 5 Triệu Hộ Kinh Doanh Vẫn "Kẹt Lại" Trong Kỷ Nguyên Số?
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              Theo Báo cáo Thương mại điện tử Việt Nam 2025, hơn 82% tiểu thương muốn xây dựng kênh bán hàng độc lập nhưng gặp phải rào cản quá lớn:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-red-200/60 shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold shadow-inner">
                💸
              </div>
              <h3 className="text-base font-bold text-slate-900">Thuê Agency Quá Đắt Đỏ</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chi phí từ <b>5 – 15 triệu VNĐ</b> cho 1 trang web cơ bản, mất từ <b>2 – 4 tuần</b> hoàn thiện. Khi cần sửa giá hoặc chạy chiến dịch flash sale trong ngày thì hoàn toàn bị động và phụ thuộc.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-amber-200/60 shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-bold shadow-inner">
                🧩
              </div>
              <h3 className="text-base font-bold text-slate-900">Công Cụ Kéo Thả Quá Phức Tạp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Các nền tảng như Ladipage, Wix hay Webflow đòi hỏi hàng trăm thao tác căn chỉnh pixel, canh lề CSS. Người dùng phổ thông thường xuyên gặp lỗi <b>vỡ khung hình trên điện thoại di động</b>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-cyan-200/60 shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl font-bold shadow-inner">
                📉
              </div>
              <h3 className="text-base font-bold text-slate-900">Mất Khách Do Phản Hồi Chậm</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khách hàng để lại thông tin nhưng không có hệ thống CRM tự động. Đến khi người bán mở email kiểm tra thì khách đã mua của đối thủ. Cần một cơ chế <b>bắn chuông báo Telegram tức thì dưới 2 giây</b>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BẢN MVP ĐANG LÀM ĐƯỢC GÌ HÔM NAY (PROVEN & TESTED)
      ========================================================================= */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-600 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Thực Tế Đã Triển Khai (Live & Ready)</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Bản MVP Hôm Nay: Đã Hoàn Thiện & Đang Hoạt Động 100%
              </h2>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
            >
              <span>Xem trực tiếp trên Web Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tính năng 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:scale-110 transition border border-blue-100">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">AI Block-Driven Engine Chuẩn CRO</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tự động trích xuất thực thể (Thương hiệu, Ngành hàng, Mức giảm giá, Hotline) và ghép 6 khối Tailwind CSS đạt chuẩn tâm lý AIDA: Banner khẩn cấp, Navbar, Hero, Cam kết 3 cột, Bảng giá & Form đăng ký.
              </p>
              <div className="pt-2 text-[11px] font-mono text-blue-600 flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" /> Đã có sẵn 4 preset ngành lớn
              </div>
            </div>

            {/* Tính năng 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:scale-110 transition border border-amber-100">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Click-to-Edit: Sửa Trực Quan 1-Click</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bấm nút "Sửa Nhanh" trên thanh URL, toàn bộ chữ trên trang chuyển sang viền nét đứt. Người dùng click trực tiếp vào văn bản để sửa tiêu đề, bảng giá; dữ liệu tự động đồng bộ 2 chiều qua <code>postMessage</code>.
              </p>
              <div className="pt-2 text-[11px] font-mono text-amber-600 flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" /> Chỉnh sửa tức thì không reload
              </div>
            </div>

            {/* Tính năng 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-pink-400 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:scale-110 transition border border-rose-100">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Theme Palette Switcher 6 Màu Sắc</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tích hợp 6 bảng màu chuẩn UX (Spa Ngọc Lam, Tech Tím, Nông sản Xanh lá, Thời trang Hồng, Cà phê Nâu, Sang trọng Đen). Thay đổi màu chủ đạo và điểm nhấn toàn trang web ngay trong 100ms bằng CSS variables.
              </p>
              <div className="pt-2 text-[11px] font-mono text-rose-600 flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" /> 6 Bảng màu thiết kế cao cấp
              </div>
            </div>

            {/* Tính năng 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition border border-emerald-100">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Mini CRM Bền Vững & Bắn Telegram</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bắt sự kiện điền form trực tiếp, kích hoạt hiệu ứng pháo hoa, lưu vĩnh viễn vào <code>data/leads.json</code> và bắn tin nhắn về điện thoại qua Telegram Bot API dưới 2 giây. Hỗ trợ <b>Xuất file Excel/CSV chuẩn UTF-8 Tiếng Việt</b>.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-600 flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" /> Reo chuông & Xuất Excel 1-click
              </div>
            </div>

            {/* Tính năng 5 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-400 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-110 transition border border-indigo-100">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Cổng Model Context Protocol (MCP)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Endpoint JSON-RPC 2.0 chuẩn hóa tại <code>/api/mcp</code>. Cho phép Claude Desktop, ChatGPT hay Cursor kết nối điều khiển: sinh trang mới (<code>generate_landing_page</code>), sửa khối (<code>update_landing_page_block</code>) và lấy leads CRM.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-600 flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" /> Chuẩn Anthropic MCP Protocol
              </div>
            </div>

            {/* Tính năng 6 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 transition group space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold group-hover:scale-110 transition border border-cyan-100">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Xuất Bản Mã QR & Tải Trọn Bộ ZIP</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tạo mã QR tức thì để Ban Giám khảo quét camera vào xem trang web thật trên điện thoại. Nút <b>"Tải ZIP"</b> cho phép trích xuất mã nguồn HTML/JS sạch sẽ để tải lên bất kỳ hosting nào (Vercel, cPanel, Netlify) mà không bị giữ chân.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-600 flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" /> Không khóa nền tảng (No Lock-in)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TƯƠNG LAI KHI HOÀN THÀNH (THE VISION & MOONSHOT ROADMAP)
      ========================================================================= */}
      <section id="future-roadmap" className="py-20 bg-white border-t border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-extrabold text-blue-700 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full">
              Tầm Nhìn Đột Phá • Roadmap 2026 - 2028
            </span>
            <p className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Sản Phẩm Sẽ Làm Được Gì Khi Hoàn Thành Trọn Vẹn?
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              PromptToSite không dừng lại ở một trang tạo web. Khi hoàn thiện, đây sẽ là <b>Nền tảng Tác nhân Thương mại Toàn diện (Autonomous Commerce Agent Ecosystem)</b> với 4 trụ cột chiến lược:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Trụ cột tương lai 1 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-blue-200/80 space-y-4 relative overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-2xl shadow-inner">
                🐳
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Trụ Cột 1 • Hạ Tầng Đám Mây</span>
                <h3 className="text-xl font-black text-slate-900">On-Demand Docker Sandbox & Caddy TLS Tự Động</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mỗi tiểu thương khi đăng ký sẽ được khởi tạo <b>1 Container Docker độc lập</b> trên nền tảng. Dữ liệu, mã nguồn và tệp khách hàng được mã hóa cô lập hoàn toàn, giải quyết triệt để rủi ro rò rỉ dữ liệu giữa các doanh nghiệp.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><b>Caddy On-Demand TLS:</b> Tự động cấp phát chứng chỉ SSL Let's Encrypt cho tên miền riêng của khách hàng (VD: <code>tiembanhbanmai.vn</code>) trong 5 giây mà không cần cấu hình DNS phức tạp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><b>Zero-Cold-Start Hibernation:</b> Tự động "ngủ đông" container khi không có truy cập và "đánh thức" trong 300ms khi có khách vào xem, tiết kiệm 70% chi phí máy chủ.</span>
                </li>
              </ul>
            </div>

            {/* Trụ cột tương lai 2 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-indigo-200/80 space-y-4 relative overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-2xl shadow-inner">
                🧠
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Trụ Cột 2 • Trí Tuệ Nhân Tạo Mở</span>
                <h3 className="text-xl font-black text-slate-900">Bring Your Own Key (BYOK) & Chợ Kỹ Năng Agent Harness</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Người dùng không bị ép buộc dùng AI đóng kín của nền tảng. Khách hàng có thể kết nối tài khoản ChatGPT Plus, Claude Team, hoặc Gemini cá nhân (BYOK). Hệ thống cung cấp sẵn khung <b>Agent Harness</b> chuyên biệt hóa cho thương mại:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span><b>Tự Động A/B Testing Bằng AI:</b> Tác nhân AI tự động tạo ra 3 biến thể tiêu đề và ảnh bìa khác nhau, luân phiên phân phối và tự chọn phương án có tỷ lệ chốt lead cao nhất.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span><b>Chợ Kỹ Năng (PromptToSite Skills Marketplace):</b> Các chuyên gia marketing có thể đăng bán các skill tối ưu bán hàng (như Skill viết kịch bản Flash Sale, Skill bán thời trang GenZ) với tỷ lệ chia sẻ doanh thu 70/30.</span>
                </li>
              </ul>
            </div>

            {/* Trụ cột tương lai 3 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-emerald-200/80 space-y-4 relative overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl shadow-inner">
                ⚡
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Trụ Cột 3 • Chốt Đơn Đa Kênh</span>
                <h3 className="text-xl font-black text-slate-900">Omni-Channel Lead Hub & Telesale AI Voice Agent</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed text-slate-600">
                Khách hàng điền form không chỉ nằm im trong trang quản trị. Toàn bộ thông tin được phân luồng tự động đa kênh để biến cơ hội thành tiền mặt ngay trong 5 phút đầu tiên:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><b>Tự Động Bắn Zalo ZNS & SMS Brandname:</b> Khách vừa bấm submit, tin nhắn xác nhận ưu đãi kèm mã voucher xuất hiện ngay trên Zalo của họ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><b>Telesale AI Voice Gọi Xác Nhận:</b> Trợ lý giọng nói AI (giọng 3 miền tự nhiên) tự động quay số gọi cho khách hàng để xác nhận địa chỉ giao hàng và khung giờ tư vấn.</span>
                </li>
              </ul>
            </div>

            {/* Trụ cột tương lai 4 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-amber-200/80 space-y-4 relative overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-2xl shadow-inner">
                🛡️
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Trụ Cột 4 • Pháp Lý & Chủ Quyền Số</span>
                <h3 className="text-xl font-black text-slate-900">Chuẩn Hóa Pháp Lý Số Việt Nam 2026</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                PromptToSite định vị là nền tảng tiên phong tuân thủ đầy đủ khuôn khổ pháp lý mới nhất của Quốc hội Việt Nam ban hành, bảo vệ tuyệt đối uy tín và pháp lý cho người bán:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><b>Luật Bảo vệ Dữ liệu Cá nhân số 91/2025/QH15:</b> Cơ chế xin phép thu thập thông tin (Consent Management), mã hóa một chiều số điện thoại khách hàng, quyền yêu cầu xóa dữ liệu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
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
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-600">
              Bảng So Sánh Năng Lực
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              PromptToSite Vượt Trội Như Thế Nào So Với Giải Pháp Truyền Thống?
            </p>
          </div>

          <div className="overflow-x-auto shadow-sm rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Tiêu Chí So Sánh</th>
                  <th className="p-4 text-slate-500">Thuê Agency Ngoài</th>
                  <th className="p-4 text-slate-500">Nền Tảng Kéo Thả (Wix, Ladipage)</th>
                  <th className="p-4 text-blue-700 bg-blue-50/80 border-l border-blue-200">PromptToSite (Đề án)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-bold text-slate-900">Thời gian hoàn thiện</td>
                  <td className="p-4 text-red-600">2 – 4 tuần</td>
                  <td className="p-4 text-amber-600">3 – 7 ngày tự kéo thả</td>
                  <td className="p-4 font-bold text-emerald-600 bg-blue-50/40 border-l border-blue-200">⚡ 30 Giây bằng câu lệnh</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-bold text-slate-900">Chi phí ban đầu</td>
                  <td className="p-4 text-red-600">5 – 15 triệu VNĐ</td>
                  <td className="p-4 text-amber-600">1.5 – 3 triệu/năm phí duy trì</td>
                  <td className="p-4 font-bold text-emerald-600 bg-blue-50/40 border-l border-blue-200">🎉 Miễn phí bắt đầu (0đ)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-bold text-slate-900">Độ khó khi chỉnh sửa</td>
                  <td className="p-4 text-red-600">Phải gọi thợ, trả thêm phí</td>
                  <td className="p-4 text-amber-600">Phức tạp, dễ lệch layout mobile</td>
                  <td className="p-4 font-bold text-emerald-600 bg-blue-50/40 border-l border-blue-200">✨ Click-to-Edit trực quan</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-bold text-slate-900">Tốc độ chốt khách (Lead Alert)</td>
                  <td className="p-4 text-slate-500">Nhận qua Email (chậm)</td>
                  <td className="p-4 text-slate-500">Cần mua thêm gói Webhook nâng cao</td>
                  <td className="p-4 font-bold text-emerald-600 bg-blue-50/40 border-l border-blue-200">🔔 Bắn Telegram reo chuông &lt; 2s</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-bold text-slate-900">Quyền sở hữu mã nguồn</td>
                  <td className="p-4 text-slate-500">Bị tính phí nếu xin file</td>
                  <td className="p-4 text-red-600">Bị khóa chặt (Vendor Lock-in)</td>
                  <td className="p-4 font-bold text-emerald-600 bg-blue-50/40 border-l border-blue-200">📦 Tải file .zip sạch 100%</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-bold text-slate-900">Khả năng mở rộng AI (MCP)</td>
                  <td className="p-4 text-slate-500">Không hỗ trợ</td>
                  <td className="p-4 text-slate-500">Hệ sinh thái đóng</td>
                  <td className="p-4 font-bold text-emerald-600 bg-blue-50/40 border-l border-blue-200">🚀 Cổng MCP Server mở chuẩn 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: THÔNG ĐIỆP GỬI BAN GIÁM KHẢO (PITCH CALL-TO-ACTION)
      ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50/40 to-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl mx-auto shadow-xl shadow-blue-500/20">
            🎯
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-950">
            "Không Phải Sản Phẩm Trình Diễn – Đây Là Cỗ Máy Khởi Nghiệp Thật"
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Kính thưa Hội đồng Ban Giám khảo cuộc thi <b>HaUI - Startup Mindset 2026</b>,<br />
            Đề án <b>PromptToSite</b> được xây dựng không chỉ để giải một bài toán lý thuyết. Chúng tôi mang đến một sản phẩm thực tế, có thể vận hành ngay hôm nay và mang lại giá trị gia tăng tức thì cho hàng triệu tiểu thương Việt Nam trong làn sóng chuyển đổi số quốc gia.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transition duration-200"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Chuyển Sang Trải Nghiệm Web Studio Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-slate-400 pt-6">
            Dự án được phát triển bởi sinh viên Đỗ Đăng Trường • Đại học Công nghiệp Hà Nội (HaUI) • Tháng 11/2026
          </p>
        </div>
      </section>

      {/* =========================================================================
          FOOTER (LIGHT THEME)
      ========================================================================= */}
      <footer className="py-8 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <p>© 2026 PromptToSite AI Platform. Đổi mới sáng tạo & Khát vọng số vì cộng đồng kinh doanh Việt Nam.</p>
      </footer>
    </div>
  );
}
