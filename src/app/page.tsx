"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Download,
  Send,
  Bell,
  Settings,
  ExternalLink,
  Code2,
  Users,
  CheckCircle2,
  RefreshCw,
  QrCode,
  Flame,
  Globe,
  ChevronRight,
  ShieldCheck,
  Eye,
  Edit3,
  Palette,
  Check,
  PhoneCall,
  Save,
  Server,
  Zap,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import confetti from "canvas-confetti";
import {
  INDUSTRY_PRESETS,
  COLOR_THEMES,
  ColorTheme,
  generateLandingPageHtml,
  TemplateBlockConfig,
} from "@/lib/blocks/template-engine";
import { IndustryType, LeadSubmission } from "@/lib/types";

export default function StudioPage() {
  // Trạng thái preview và responsive
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"chat" | "crm" | "settings">("chat");

  // Dữ liệu trang web hiện tại
  const [currentIndustry, setCurrentIndustry] = useState<IndustryType>("spa");
  const [currentConfig, setCurrentConfig] = useState<TemplateBlockConfig>(INDUSTRY_PRESETS.spa);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Chế độ Visual Click-to-Edit & Theme Switcher
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string>("teal");
  const [saveStatusToast, setSaveStatusToast] = useState<string | null>(null);

  // Prompt chat
  const [promptInput, setPromptInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; text: string; time: string }[]
  >([
    {
      role: "assistant",
      text: "Xin chào! Tôi là Trợ lý AI của PromptToSite. Bạn muốn tạo một trang Landing Page bán hàng cho ngành nghề hay sản phẩm nào hôm nay? (Hãy thử gõ câu lệnh hoặc bấm chọn các gợi ý bên dưới).",
      time: "Vừa xong",
    },
  ]);

  // CRM Leads
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [newLeadAlert, setNewLeadAlert] = useState<LeadSubmission | null>(null);

  // Settings: Telegram & API Provider
  const [telegramToken, setTelegramToken] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");
  const [telegramStatus, setTelegramStatus] = useState<string | null>(null);
  const [aiProvider, setAiProvider] = useState<string>("mock");
  const [apiKey, setApiKey] = useState<string>("");

  // Modal QR Code Publish
  const [showPublishModal, setShowPublishModal] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Khởi tạo HTML ban đầu
  useEffect(() => {
    const initialHtml = generateLandingPageHtml(INDUSTRY_PRESETS.spa, { editMode: false });
    setHtmlContent(initialHtml);
  }, []);

  // Lắng nghe sự kiện từ iframe (Bắt Lead & Click-to-Edit)
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (!event.data) return;

      // 1. Nhận Lead mới khi user submit form trong iframe
      if (event.data.type === "PROMPTTOSITE_LEAD_SUBMITTED") {
        const leadData = event.data.payload;
        const newLead: LeadSubmission = {
          id: "lead_" + Date.now(),
          projectName: leadData.brandName || currentConfig.brandName,
          fullName: leadData.fullName,
          phone: leadData.phone,
          note: leadData.note,
          submittedAt: new Date().toLocaleTimeString("vi-VN"),
        };

        setLeads((prev) => [newLead, ...prev]);
        setNewLeadAlert(newLead);

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });

        // Bắn Telegram thật qua API Backend
        try {
          await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...newLead,
              botToken: telegramToken,
              chatId: telegramChatId,
            }),
          });
        } catch (err) {
          console.error("Lỗi gửi Telegram", err);
        }

        setTimeout(() => {
          setNewLeadAlert(null);
        }, 6000);
      }

      // 2. Nhận cập nhật văn bản từ Click-to-edit
      if (event.data.type === "PROMPTTOSITE_TEXT_UPDATED") {
        const { key, value, html } = event.data.payload;
        if (html) setHtmlContent(html);
        setSaveStatusToast(`Đã lưu trực tiếp: "${value.slice(0, 20)}..."`);
        setTimeout(() => setSaveStatusToast(null), 2500);
      }

      // 3. Nhận đồng bộ toàn bộ HTML
      if (event.data.type === "PROMPTTOSITE_HTML_STATE") {
        const { html } = event.data.payload;
        if (html) setHtmlContent(html);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [currentConfig, telegramToken, telegramChatId]);

  // Bật/Tắt chế độ Visual Click-to-edit
  const toggleEditMode = () => {
    const nextMode = !isEditMode;
    setIsEditMode(nextMode);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "PROMPTTOSITE_TOGGLE_EDIT_MODE",
          active: nextMode,
        },
        "*"
      );
    }
  };

  // Áp dụng bộ màu Theme mới
  const handleApplyTheme = (theme: ColorTheme) => {
    setSelectedThemeId(theme.id);
    setCurrentConfig((prev) => ({
      ...prev,
      primaryColorHex: theme.primary,
      accentColorHex: theme.accent,
    }));

    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "PROMPTTOSITE_SET_PALETTE",
          primary: theme.primary,
          accent: theme.accent,
        },
        "*"
      );
    }
    setSaveStatusToast(`Đã chuyển theme màu: ${theme.name}`);
    setTimeout(() => setSaveStatusToast(null), 2000);
  };

  // Xử lý tạo trang bằng AI
  const handleGenerate = async (customPrompt?: string) => {
    const promptToRun = customPrompt || promptInput;
    if (!promptToRun.trim()) return;

    setIsGenerating(true);
    const userTime = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: promptToRun, time: userTime },
    ]);
    setPromptInput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptToRun,
          provider: aiProvider,
          apiKey: apiKey,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCurrentIndustry(data.industry);
        setCurrentConfig(data.config);
        setHtmlContent(data.html);

        // Reset edit mode về off sau khi sinh lại trang
        setIsEditMode(false);

        setChatMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `✨ Đã sinh trang thành công cho “${data.config.brandName}”!\n• Khối giao diện: Navbar, Hero ưu đãi, 3 Cam kết, Bảng giá & Form thu thập khách hàng.\n• Chuẩn responsive mobile + Form CRM. Bạn có thể bật nút "Sửa Nhanh" phía trên để chỉnh sửa câu chữ trực tiếp!`,
            time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          },
        ]);

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x: 0.7, y: 0.5 },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Tải trọn bộ mã nguồn (.zip)
  const handleExportZip = async () => {
    const zip = new JSZip();
    zip.file("index.html", htmlContent);
    zip.file(
      "README.md",
      `# Mã Nguồn Landing Page (${currentConfig.brandName})\nĐược xuất bản tự động qua nền tảng PromptToSite AI Platform.\n\n- Mở file index.html trực tiếp trên trình duyệt hoặc upload lên bất kỳ hosting nào (Vercel, Netlify, cPanel).\n- Form đăng ký đã được định tuyến tự động.`
    );
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `LandingPage_${currentConfig.brandName.replace(/\s+/g, "_")}.zip`);

    confetti({ particleCount: 60, spread: 80 });
  };

  // Xuất bản 1-click
  const handlePublish = () => {
    setShowPublishModal(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.4 },
    });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden text-slate-800">
      {/* =========================================================================
          TOP NAVBAR
      ========================================================================= */}
      <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-20 flex-shrink-0 shadow-sm">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
            P
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base">PromptToSite</span>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                MVP v0.2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Từ Prompt đến Landing Page thật trong 30 giây</p>
          </div>
        </div>

        {/* Chuyển đổi kích thước Responsive Preview */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setDevice("desktop")}
            className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition ${
              device === "desktop" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
            title="Xem trên Máy tính"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition ${
              device === "tablet" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
            title="Xem trên Máy tính bảng (768px)"
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition ${
              device === "mobile" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
            title="Xem trên Điện thoại di động (375px)"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Action Buttons: Export ZIP & 1-Click Publish */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportZip}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Tải ZIP (.zip)</span>
          </button>

          <button
            onClick={handlePublish}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-blue-600/25"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Xuất bản 1-Click</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN BODY: CHAT STUDIO (TRÁI) + LIVE PREVIEW (PHẢI)
      ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ========================= CỘT TRÁI: WORKSPACE & CHAT ========================= */}
        <aside className="w-full sm:w-[420px] md:w-[460px] bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-10 shadow-sm">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 text-xs font-bold">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1.5 transition ${
                activeTab === "chat"
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Trợ lý AI</span>
            </button>
            <button
              onClick={() => setActiveTab("crm")}
              className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1.5 transition relative ${
                activeTab === "crm"
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Khách Hàng (Leads)</span>
              {leads.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {leads.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1.5 transition ${
                activeTab === "settings"
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Cài đặt & MCP</span>
            </button>
          </div>

          {/* TAB 1: CHAT AI & PROMPT */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Danh sách tin nhắn chat */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none shadow-sm"
                          : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200 whitespace-pre-line"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}

                {isGenerating && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 text-xs rounded-xl border border-blue-200">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                    <span>Đang cấu trúc landing page theo khung CRO & Tailwind... (2-3s)</span>
                  </div>
                )}
              </div>

              {/* Gợi ý Prompt nhanh theo ngành */}
              <div className="p-3 bg-slate-50 border-t border-slate-200">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-500" />
                  <span>Prompt Mẫu Nhanh (Thử nghiệm 1-click):</span>
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleGenerate("Tạo Landing Page cho Viện Thẩm Mỹ Ban Mai, giảm 40%, có form đặt hẹn")}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-teal-500 text-left hover:bg-teal-50/50 transition"
                  >
                    <span className="font-bold text-teal-800 block text-[11px]">💆 Thẩm Mỹ & Spa</span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">Giảm béo, cam kết hoàn tiền</span>
                  </button>
                  <button
                    onClick={() => handleGenerate("Tạo trang bán cà phê The Mộc rang xay nguyên bản, mua 1 tặng 1")}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-amber-500 text-left hover:bg-amber-50/50 transition"
                  >
                    <span className="font-bold text-amber-900 block text-[11px]">☕ Quán Cà Phê Mộc</span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">Mua 1 tặng 1 tuần ra mắt</span>
                  </button>
                  <button
                    onClick={() => handleGenerate("Tạo landing page khóa học AI Marketing NextGen, học bổng 50%")}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-left hover:bg-blue-50/50 transition"
                  >
                    <span className="font-bold text-blue-800 block text-[11px]">🎓 Khóa Học Kỹ Năng AI</span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">Trợ giá 50%, kèm cặp 1:1</span>
                  </button>
                  <button
                    onClick={() => handleGenerate("Tạo trang bộ sưu tập thời trang nữ L'AURA Boutique, giảm 30%")}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-rose-500 text-left hover:bg-rose-50/50 transition"
                  >
                    <span className="font-bold text-rose-800 block text-[11px]">👗 Thời Trang Nữ Chic</span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">Lụa cao cấp, đổi trả 7 ngày</span>
                  </button>
                </div>
              </div>

              {/* Khung nhập Prompt */}
              <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  placeholder="Mô tả ý tưởng trang web của bạn..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
                />
                <button
                  onClick={() => handleGenerate()}
                  disabled={isGenerating || !promptInput.trim()}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition flex items-center justify-center shadow-md shadow-blue-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: QUẢN LÝ LEADS (CRM MINI) */}
          {activeTab === "crm" && (
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Danh Sách Khách Hàng (Leads)</span>
                </h3>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  {leads.length} khách
                </span>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <div className="text-3xl">📭</div>
                  <p className="text-xs font-medium">Chưa có khách hàng nào điền form.</p>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    Hãy thử nhập Tên & Số điện thoại vào Form ở màn hình xem trước bên phải để xem dữ liệu nhảy về đây tức thì!
                  </p>
                </div>
              ) : (
                leads.map((l) => (
                  <div key={l.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs shadow-sm">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>👤 {l.fullName}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{l.submittedAt}</span>
                    </div>
                    <div className="text-blue-600 font-mono font-bold flex items-center justify-between">
                      <span>📞 {l.phone}</span>
                      <a
                        href={`tel:${l.phone}`}
                        className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100 flex items-center gap-1"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Gọi ngay</span>
                      </a>
                    </div>
                    {l.note && <p className="text-slate-600 text-[11px]">📝 {l.note}</p>}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: CÀI ĐẶT TELEGRAM BOT & KẾT NỐI MCP */}
          {activeTab === "settings" && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {/* Cấu hình LLM Provider */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Cấu hình Trí Tuệ Nhân Tạo (BYOK)</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Sử dụng Smart Template Engine (mặc định không tốn API key) hoặc kết nối trực tiếp OpenAI / Gemini của bạn:
                </p>
                <div className="space-y-2 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Mô hình AI:</label>
                    <select
                      value={aiProvider}
                      onChange={(e) => setAiProvider(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold bg-white"
                    >
                      <option value="mock">Smart Template Engine (Không cần Key - Tốc độ 100ms)</option>
                      <option value="gemini">Google Gemini 2.0 Flash (BYOK)</option>
                      <option value="openai">OpenAI GPT-4o / GPT-4o-mini (BYOK)</option>
                    </select>
                  </div>
                  {aiProvider !== "mock" && (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">API Key của bạn:</label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Nhập API key tại đây..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Cấu hình Telegram */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                <h4 className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <span>Bắn Thông Báo Khách Về Điện Thoại (Telegram)</span>
                </h4>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Để điện thoại bạn reo chuông ngay khi khách bấm submit form:
                </p>
                <ol className="list-decimal list-inside text-[11px] text-blue-700 space-y-1">
                  <li>Mở Telegram, chat với <b>@BotFather</b> để lấy <b>Bot Token</b>.</li>
                  <li>Chat với <b>@userinfobot</b> để lấy <b>Chat ID</b> của bạn.</li>
                  <li>Điền vào 2 ô dưới đây:</li>
                </ol>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Telegram Bot Token:</label>
                  <input
                    type="text"
                    value={telegramToken}
                    onChange={(e) => setTelegramToken(e.target.value)}
                    placeholder="Ví dụ: 7123456789:AAHxyz..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Telegram Chat ID:</label>
                  <input
                    type="text"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    placeholder="Ví dụ: 123456789"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <button
                  onClick={() => {
                    if (telegramToken && telegramChatId) {
                      setTelegramStatus("Đã lưu cấu hình Telegram thành công!");
                    } else {
                      setTelegramStatus("Vui lòng điền đủ Token và Chat ID.");
                    }
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg transition"
                >
                  Lưu Cấu Hình Telegram
                </button>
                {telegramStatus && (
                  <p className="text-[11px] font-bold text-emerald-600 text-center">{telegramStatus}</p>
                )}
              </div>

              {/* Thông tin MCP Server */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 pt-3">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-slate-600" />
                  <span>Chuẩn Kết Nối MCP (Model Context Protocol)</span>
                </h4>
                <p className="text-[11px] text-slate-600">
                  Endpoint dành cho ChatGPT Plus hoặc Claude Desktop kết nối trực tiếp vào Docker Sandbox:
                </p>
                <div className="p-2 rounded bg-slate-900 text-emerald-400 font-mono text-[10px] break-all">
                  http://localhost:3000/api/mcp
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* ========================= CỘT PHẢI: LIVE PREVIEW CANVAS ========================= */}
        <main className="flex-1 bg-slate-200/80 p-3 md:p-5 flex flex-col items-center justify-start overflow-hidden relative">
          {/* Thanh công cụ phụ: Visual Click-to-Edit & Palette Switcher */}
          <div
            className={`w-full bg-white rounded-t-xl border border-slate-300 border-b-0 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs transition-all duration-300 ${
              device === "mobile" ? "max-w-[390px]" : device === "tablet" ? "max-w-[768px]" : "max-w-full"
            }`}
          >
            {/* Window dot icons */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>

            {/* URL thanh địa chỉ */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-md text-[11px] text-slate-600 font-mono">
              <span className="text-emerald-600">🔒</span>
              <span>https://{currentConfig.brandName.toLowerCase().replace(/[^a-z0-9]/g, "")}.prompttosite.site</span>
            </div>

            {/* Controls: Color Palette & Click-to-Edit Button */}
            <div className="flex items-center gap-3">
              {/* Palette 6 màu */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200" title="Đổi màu sắc thương hiệu">
                <Palette className="w-3.5 h-3.5 text-slate-500 ml-1 mr-0.5" />
                {COLOR_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleApplyTheme(theme)}
                    className={`w-4 h-4 rounded-full ${theme.previewBg} transition-transform hover:scale-125 flex items-center justify-center ${
                      selectedThemeId === theme.id ? "ring-2 ring-blue-600 ring-offset-1 scale-110" : ""
                    }`}
                    title={theme.name}
                  >
                    {selectedThemeId === theme.id && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                  </button>
                ))}
              </div>

              {/* Nút Toggle Click-to-Edit */}
              <button
                onClick={toggleEditMode}
                className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1.5 transition shadow-sm ${
                  isEditMode
                    ? "bg-amber-500 text-white hover:bg-amber-600 animate-pulse"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
                title="Bật/Tắt chế độ sửa nhanh văn bản trực tiếp trên trang"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditMode ? "Đang Sửa Trực Tiếp" : "Sửa Nhanh"}</span>
              </button>
            </div>
          </div>

          {/* Cửa sổ Iframe hiển thị Landing Page */}
          <div
            className={`w-full flex-1 bg-white rounded-b-xl border border-slate-300 shadow-xl overflow-hidden transition-all duration-300 relative ${
              device === "mobile" ? "max-w-[390px]" : device === "tablet" ? "max-w-[768px]" : "max-w-full"
            }`}
          >
            <iframe
              ref={iframeRef}
              srcDoc={htmlContent}
              title="Landing Page Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-forms allow-same-origin"
            />
          </div>

          {/* Toast thông báo lưu nội dung trực quan */}
          {saveStatusToast && (
            <div className="absolute bottom-8 right-8 z-50 bg-slate-900/90 backdrop-blur text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{saveStatusToast}</span>
            </div>
          )}

          {/* POPUP BÁO LEAD MỚI THỜI GIAN THỰC */}
          {newLeadAlert && (
            <div className="absolute top-8 right-8 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-start gap-3 animate-bounce">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                🔔
              </div>
              <div className="text-xs space-y-1">
                <p className="font-extrabold text-emerald-400 text-sm">CÓ KHÁCH HÀNG MỚI!</p>
                <p className="font-semibold text-slate-200">
                  {newLeadAlert.fullName} • <span className="font-mono text-cyan-400">{newLeadAlert.phone}</span>
                </p>
                <p className="text-[10px] text-slate-400">Đã lưu vào CRM & Bắn thông báo Telegram tức thì.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          MODAL XUẤT BẢN THỰC TẾ & MÃ QR CODE
      ========================================================================= */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
              ✓
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Xuất Bản Thành Công!</h3>
              <p className="text-xs text-slate-500 mt-1">Trang web của bạn đã được đóng gói và đưa lên mạng Internet với chứng chỉ SSL tự động.</p>
            </div>

            {/* Link & QR Code */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://prompttosite.site/demo/${currentIndustry}`}
                  alt="QR Code Website"
                  className="w-32 h-32 rounded-lg border border-slate-200 shadow-sm"
                />
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                Quét mã QR bằng Camera điện thoại để trải nghiệm trực tiếp trang web!
              </p>
              <div className="p-2 rounded bg-white border border-slate-200 text-xs font-mono text-blue-600 break-all select-all">
                https://prompttosite.site/demo/{currentIndustry}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPublishModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Đóng
              </button>
              <button
                onClick={handleExportZip}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Mã Nguồn (.zip)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
