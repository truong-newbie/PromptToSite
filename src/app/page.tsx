"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import confetti from "canvas-confetti";
import {
  Award,
  Bell,
  Check,
  CircleCheck,
  Download,
  Eye,
  Globe,
  Lock,
  Monitor,
  MessageSquare,
  Pencil,
  Settings,
  Smartphone,
  Tablet,
  TriangleAlert,
  Users,
} from "lucide-react";
import { PromptToSiteLogo } from "@/components/Logo";
import { ChatMessage, ChatPanel, GENERATION_STEPS } from "@/components/studio/ChatPanel";
import { LeadsPanel } from "@/components/studio/LeadsPanel";
import { SettingsPanel, StudioSettings } from "@/components/studio/SettingsPanel";
import { PublishModal, PublishState } from "@/components/studio/PublishModal";
import {
  COLOR_THEMES,
  ColorTheme,
  INDUSTRY_PRESETS,
  TemplateBlockConfig,
  applyFieldEdit,
  generateLandingPageHtml,
} from "@/lib/blocks/template-engine";
import { IndustryType, LeadSubmission } from "@/lib/types";

type Device = "desktop" | "tablet" | "mobile";
type Tab = "chat" | "crm" | "settings";
type ToastState = { text: string; tone: "ok" | "error" } | null;

const DEVICE_WIDTH: Record<Device, string> = { desktop: "100%", tablet: "768px", mobile: "390px" };
const TELEGRAM_STORAGE_KEY = "p2s.telegram";

const WELCOME: ChatMessage = {
  role: "assistant",
  text: "Xin chào! Mình là trợ lý của PromptToSite. Bạn muốn tạo landing page cho ngành hay sản phẩm nào? Hãy gõ mô tả, hoặc chọn nhanh một ngành mẫu bên dưới.",
  time: "Vừa xong",
};

const clock = () => new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") || "trangcuaban";

export default function StudioPage() {
  const [device, setDevice] = useState<Device>("desktop");
  const [tab, setTab] = useState<Tab>("chat");
  const [mobileView, setMobileView] = useState<"panel" | "preview">("panel");

  const [industry, setIndustry] = useState<IndustryType>("spa");
  const [config, setConfig] = useState<TemplateBlockConfig>(INDUSTRY_PRESETS.spa);
  // HTML nạp vào iframe. Chỉ đổi khi tạo/tải trang mới, nên sửa trực tiếp không làm iframe tải lại.
  const [previewHtml, setPreviewHtml] = useState<string>(() => generateLandingPageHtml(INDUSTRY_PRESETS.spa));

  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);

  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [leadAlert, setLeadAlert] = useState<{ lead: LeadSubmission; telegram: boolean } | null>(null);
  const [settings, setSettings] = useState<StudioSettings>({ aiProvider: "mock", apiKey: "", telegramToken: "", telegramChatId: "" });
  const [publish, setPublish] = useState<PublishState | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hydrated = useRef(false);
  const knownVersion = useRef(0);
  const remoteApplied = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const alertTimer = useRef<ReturnType<typeof setTimeout>>();
  const ownLeadIds = useRef(new Set<string>());
  const leadsRef = useRef<LeadSubmission[]>([]);
  const latest = useRef({ settings, config });
  latest.current = { settings, config };
  leadsRef.current = leads;

  const selectedThemeId = COLOR_THEMES.find((t) => t.primary === config.primaryColorHex)?.id;

  const showToast = useCallback((text: string, tone: "ok" | "error" = "ok") => {
    setToast({ text, tone });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const loadPage = useCallback((cfg: TemplateBlockConfig, ind: IndustryType, html?: string) => {
    setConfig(cfg);
    setIndustry(ind);
    setPreviewHtml(html ?? generateLandingPageHtml(cfg));
    setIsEditMode(false);
  }, []);

  // ---------- Nạp dữ liệu ban đầu ----------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(TELEGRAM_STORAGE_KEY);
      if (raw) {
        const t = JSON.parse(raw);
        setSettings((s) => ({ ...s, telegramToken: String(t.token || ""), telegramChatId: String(t.chatId || "") }));
      }
    } catch {
      /* bỏ qua dữ liệu lưu hỏng */
    }

    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => d.success && Array.isArray(d.leads) && setLeads(d.leads))
      .catch(() => {});

    fetch("/api/site")
      .then((r) => r.json())
      .then((d) => {
        if (d.site) {
          knownVersion.current = d.site.version;
          remoteApplied.current = true; // đã khớp với máy chủ, không cần đẩy ngược lại
          loadPage(d.site.config, d.site.industry);
        }
      })
      .catch(() => {})
      .finally(() => {
        hydrated.current = true;
      });
  }, [loadPage]);

  useEffect(() => {
    try {
      if (settings.telegramToken || settings.telegramChatId) {
        localStorage.setItem(TELEGRAM_STORAGE_KEY, JSON.stringify({ token: settings.telegramToken, chatId: settings.telegramChatId }));
      }
    } catch {
      /* localStorage bị chặn */
    }
  }, [settings.telegramToken, settings.telegramChatId]);

  // ---------- Đồng bộ trang đang soạn lên máy chủ (để MCP đọc được) ----------
  useEffect(() => {
    if (!hydrated.current) return;
    if (remoteApplied.current) {
      remoteApplied.current = false;
      return;
    }
    const t = setTimeout(() => {
      fetch("/api/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, industry }),
      })
        .then((r) => r.json())
        .then((d) => typeof d.version === "number" && (knownVersion.current = d.version))
        .catch(() => {});
    }, 600);
    return () => clearTimeout(t);
  }, [config, industry]);

  // ---------- Theo dõi thay đổi từ AI Agent (MCP) và lead mới từ trang đã xuất bản ----------
  useEffect(() => {
    const poll = async () => {
      if (document.hidden) return;
      try {
        const [siteRes, leadRes] = await Promise.all([
          fetch("/api/site", { cache: "no-store" }).then((r) => r.json()),
          fetch("/api/leads", { cache: "no-store" }).then((r) => r.json()),
        ]);

        const site = siteRes.site;
        if (site && site.source === "mcp" && site.version > knownVersion.current) {
          knownVersion.current = site.version;
          remoteApplied.current = true;
          loadPage(site.config, site.industry);
          showToast("AI Agent vừa cập nhật trang qua MCP");
        }

        if (leadRes.success && Array.isArray(leadRes.leads)) {
          const known = new Set(leadsRef.current.map((l) => l.id));
          const fresh: LeadSubmission[] = leadRes.leads.filter((l: LeadSubmission) => !known.has(l.id) && !ownLeadIds.current.has(l.id));
          if (leadRes.leads.length !== leadsRef.current.length || fresh.length) setLeads(leadRes.leads);
          if (fresh.length) {
            setLeadAlert({ lead: fresh[0], telegram: false });
            confetti({ particleCount: 70, spread: 70, origin: { y: 0.3, x: 0.8 } });
            clearTimeout(alertTimer.current);
            alertTimer.current = setTimeout(() => setLeadAlert(null), 6000);
          }
        }
      } catch {
        /* mất kết nối tạm thời, lần sau thử lại */
      }
    };
    const id = setInterval(poll, 3500);
    return () => clearInterval(id);
  }, [loadPage, showToast]);

  // ---------- Nhận sự kiện từ iframe (lead, sửa trực tiếp) ----------
  useEffect(() => {
    const onMessage = async (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow || !event.data) return;

      if (event.data.type === "PROMPTTOSITE_LEAD_SUBMITTED") {
        const { settings: s, config: c } = latest.current;
        const p = event.data.payload || {};
        try {
          const res = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: p.fullName,
              phone: p.phone,
              note: p.note,
              brandName: p.brandName || c.brandName,
              botToken: s.telegramToken,
              chatId: s.telegramChatId,
            }),
          });
          const data = await res.json();
          if (!res.ok || !data.success) throw new Error(data.error || "Không lưu được khách hàng");

          ownLeadIds.current.add(data.lead.id);
          setLeads((prev) => [data.lead, ...prev.filter((l) => l.id !== data.lead.id)]);
          setLeadAlert({ lead: data.lead, telegram: data.telegramNotification?.success === true });
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          clearTimeout(alertTimer.current);
          alertTimer.current = setTimeout(() => setLeadAlert(null), 6000);
        } catch (err: any) {
          showToast(err?.message || "Không lưu được khách hàng", "error");
        }
      }

      if (event.data.type === "PROMPTTOSITE_TEXT_UPDATED") {
        const { key, value } = event.data.payload || {};
        if (typeof key !== "string" || typeof value !== "string" || !value.trim()) return;
        setConfig((prev) => applyFieldEdit(prev, key, value));
        showToast("Đã lưu chỉnh sửa");
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [showToast]);

  // ---------- Hành động ----------
  const postToPreview = (message: Record<string, unknown>) => iframeRef.current?.contentWindow?.postMessage(message, "*");

  const toggleEditMode = () => {
    const next = !isEditMode;
    setIsEditMode(next);
    postToPreview({ type: "PROMPTTOSITE_TOGGLE_EDIT_MODE", active: next });
  };

  const applyTheme = (theme: ColorTheme) => {
    setConfig((prev) => ({ ...prev, primaryColorHex: theme.primary, accentColorHex: theme.accent }));
    postToPreview({ type: "PROMPTTOSITE_SET_PALETTE", primary: theme.primary, accent: theme.accent });
    showToast(`Đã đổi sang màu ${theme.name.split(" (")[0]}`);
  };

  const handleGenerate = async (prompt: string) => {
    setTab("chat");
    setMessages((prev) => [...prev, { role: "user", text: prompt, time: clock() }]);
    setGenerating(true);
    setStep(0);
    const ticker = setInterval(() => setStep((s) => Math.min(s + 1, GENERATION_STEPS.length - 1)), 650);

    try {
      const [res] = await Promise.all([
        fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, provider: settings.aiProvider, apiKey: settings.apiKey }),
        }),
        sleep(1100), // đủ thời gian để người dùng thấy các bước xử lý
      ]);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Không tạo được trang");

      loadPage(data.config, data.industry, data.html);
      setStep(GENERATION_STEPS.length);
      setMobileView("preview");

      const engine = data.provider === "smart-template-engine" ? "Smart Template Engine" : data.provider;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            `Đã tạo trang cho “${data.config.brandName}” bằng ${engine}.\n` +
            `• Gồm thanh ưu đãi, hero, 3 lợi thế, bảng giá, đánh giá và form nhận khách.\n` +
            `• Bấm “Sửa nhanh” phía trên để gõ sửa chữ trực tiếp, hoặc đổi màu thương hiệu bằng các chấm màu.` +
            (data.fallbackReason ? `\n\nLưu ý: ${data.fallbackReason}` : ""),
          time: clock(),
        },
      ]);
      confetti({ particleCount: 50, spread: 60, origin: { x: 0.7, y: 0.5 } });
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Chưa tạo được trang: ${err?.message || "lỗi không xác định"}. Bạn thử lại nhé.`, time: clock() },
      ]);
    } finally {
      clearInterval(ticker);
      setGenerating(false);
    }
  };

  const handleExportZip = async () => {
    const html = generateLandingPageHtml(config, { leadEndpoint: `${window.location.origin}/api/leads` });
    const zip = new JSZip();
    zip.file("index.html", html);
    zip.file(
      "README.md",
      `# Mã nguồn Landing Page: ${config.brandName}\n\nTạo bằng PromptToSite.\n\n- Mở index.html trực tiếp, hoặc tải lên bất kỳ hosting nào (Vercel, Netlify, cPanel).\n- Form đăng ký gửi dữ liệu về ${window.location.origin}/api/leads. Nếu bạn tự triển khai, hãy đổi địa chỉ này trong thẻ <script> cuối file.\n`
    );
    saveAs(await zip.generateAsync({ type: "blob" }), `LandingPage_${slugify(config.brandName)}.zip`);
    showToast("Đã tải mã nguồn (.zip)");
  };

  const handlePublish = async () => {
    setPublish({ status: "loading" });
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, botToken: settings.telegramToken, chatId: settings.telegramChatId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Máy chủ từ chối yêu cầu");
      setPublish({ status: "done", url: data.url });
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.4 } });
    } catch (err: any) {
      setPublish({ status: "error", message: err?.message || "Vui lòng thử lại." });
    }
  };

  const brandSlug = useMemo(() => slugify(config.brandName), [config.brandName]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "chat", label: "Trợ lý AI", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "crm", label: "Khách hàng", icon: <Users className="w-4 h-4" />, badge: leads.length },
    { id: "settings", label: "Cài đặt", icon: <Settings className="w-4 h-4" /> },
  ];

  const devices: { id: Device; label: string; icon: React.ReactNode }[] = [
    { id: "desktop", label: "Máy tính", icon: <Monitor className="w-4 h-4" /> },
    { id: "tablet", label: "Máy tính bảng", icon: <Tablet className="w-4 h-4" /> },
    { id: "mobile", label: "Điện thoại", icon: <Smartphone className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden text-slate-800">
      {/* ============================ THANH TRÊN ============================ */}
      <header className="h-14 glass border-b border-slate-200/70 px-3 sm:px-5 flex items-center justify-between gap-3 flex-shrink-0 z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <PromptToSiteLogo className="w-8 h-8" />
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight">
                Prompt<span className="text-blue-600">ToSite</span>
              </span>
              <span className="hidden sm:inline text-[10px] font-bold text-blue-700 bg-blue-50 ring-1 ring-blue-200 px-1.5 py-0.5 rounded-md">MVP</span>
            </div>
            <p className="text-[10px] text-slate-400 hidden md:block truncate">Từ câu lệnh đến landing page bán hàng trong 30 giây</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-0.5 bg-slate-100 p-1 rounded-xl ring-1 ring-slate-200/70" role="tablist" aria-label="Kích thước xem trước">
          {devices.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={device === d.id}
              onClick={() => setDevice(d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                device === d.id ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {d.icon}
              <span className="hidden xl:inline">{d.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/showcase" className="btn-ghost px-3 py-2 text-xs" title="Trang giới thiệu đề án">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden md:inline">Giới thiệu đề án</span>
          </Link>
          <button onClick={handleExportZip} className="btn-ghost px-3 py-2 text-xs" title="Tải mã nguồn sạch (.zip)">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Tải ZIP</span>
          </button>
          <button onClick={handlePublish} className="btn-primary px-3.5 py-2 text-xs">
            <Globe className="w-3.5 h-3.5" />
            Xuất bản
          </button>
        </div>
      </header>

      {/* ============================ THÂN TRANG ============================ */}
      <div className="flex-1 flex min-h-0">
        {/* ---------- Cột trái: trợ lý, khách hàng, cài đặt ---------- */}
        <aside
          className={`${mobileView === "panel" ? "flex" : "hidden"} lg:flex w-full lg:w-[400px] xl:w-[430px] flex-shrink-0 flex-col bg-white border-r border-slate-200/80 min-h-0`}
        >
          <nav className="flex gap-1 p-2 border-b border-slate-100" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  tab === t.id ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {t.icon}
                {t.label}
                {t.badge ? (
                  <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {t.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          {tab === "chat" && <ChatPanel messages={messages} generating={generating} step={step} onSend={handleGenerate} />}
          {tab === "crm" && <LeadsPanel leads={leads} />}
          {tab === "settings" && <SettingsPanel settings={settings} onChange={setSettings} />}
        </aside>

        {/* ---------- Cột phải: xem trước ---------- */}
        <main className={`${mobileView === "preview" ? "flex" : "hidden"} lg:flex flex-1 min-w-0 canvas-dots p-3 md:p-6 relative`}>
          <div
            className="mx-auto w-full h-full flex flex-col rounded-2xl bg-white shadow-float ring-1 ring-slate-300/60 overflow-hidden transition-[max-width] duration-300 ease-out"
            style={{ maxWidth: DEVICE_WIDTH[device] }}
          >
            {/* Thanh địa chỉ */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 min-w-0 flex items-center justify-center gap-1.5 bg-white ring-1 ring-slate-200 rounded-lg px-3 py-1.5 text-[11px] text-slate-500 font-mono">
                <Lock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{brandSlug}.prompttosite.site</span>
              </div>
              <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wide flex-shrink-0">
                <Eye className="w-3 h-3" />
                Xem trước
              </span>
            </div>

            {/* Thanh công cụ: màu sắc + sửa nhanh */}
            <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-slate-100 bg-white flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="hidden sm:block text-[11px] font-semibold text-slate-400">Màu thương hiệu</span>
                <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Màu thương hiệu">
                  {COLOR_THEMES.map((theme) => {
                    const active = selectedThemeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        role="radio"
                        aria-checked={active}
                        aria-label={theme.name}
                        title={theme.name}
                        onClick={() => applyTheme(theme)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition hover:scale-110 ${theme.previewBg} ${
                          active ? "ring-2 ring-offset-2 ring-blue-500" : "ring-1 ring-black/5"
                        }`}
                      >
                        {active && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={toggleEditMode}
                aria-pressed={isEditMode}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition flex-shrink-0 ${
                  isEditMode ? "bg-amber-500 text-white shadow-md ring-4 ring-amber-200/70" : "btn-ghost !rounded-xl"
                }`}
                title="Bật để gõ sửa chữ trực tiếp trên trang"
              >
                <Pencil className="w-3.5 h-3.5" />
                {isEditMode ? "Đang sửa trực tiếp" : "Sửa nhanh"}
              </button>
            </div>

            {/* Khung trang */}
            <div className="flex-1 relative min-h-0 bg-white">
              <iframe
                ref={iframeRef}
                srcDoc={previewHtml}
                title="Xem trước landing page"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-forms allow-same-origin"
              />

              {generating && (
                <div className="absolute inset-0 bg-white/85 backdrop-blur-sm p-8 space-y-6 animate-pop">
                  <div className="h-8 w-1/3 rounded-lg skeleton animate-shimmer" />
                  <div className="space-y-3 pt-6">
                    <div className="h-10 w-3/4 rounded-lg skeleton animate-shimmer" />
                    <div className="h-10 w-1/2 rounded-lg skeleton animate-shimmer" />
                    <div className="h-4 w-2/3 rounded skeleton animate-shimmer mt-4" />
                    <div className="h-4 w-1/2 rounded skeleton animate-shimmer" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-6">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-28 rounded-2xl skeleton animate-shimmer" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Thông báo nhỏ */}
          {toast && (
            <div
              role="status"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full bg-slate-900 text-white pl-3 pr-4 py-2 text-xs font-semibold shadow-float animate-fade-up"
            >
              {toast.tone === "ok" ? <CircleCheck className="w-4 h-4 text-emerald-400" /> : <TriangleAlert className="w-4 h-4 text-rose-400" />}
              {toast.text}
            </div>
          )}

          {/* Khách mới */}
          {leadAlert && (
            <div className="absolute top-6 right-6 z-40 w-72 rounded-2xl bg-slate-900 text-white p-4 shadow-float ring-1 ring-emerald-400/30 flex gap-3 animate-slide-in">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div className="min-w-0 text-xs space-y-0.5">
                <p className="font-extrabold text-emerald-400">Có khách hàng mới</p>
                <p className="font-semibold truncate">{leadAlert.lead.fullName}</p>
                <p className="font-mono text-cyan-300">{leadAlert.lead.phone}</p>
                <p className="text-[10px] text-slate-400 pt-1">
                  Đã lưu vào CRM{leadAlert.telegram ? " và báo về Telegram" : ". Chưa gửi Telegram (kiểm tra mục Cài đặt)"}.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Chuyển qua lại giữa trò chuyện và xem trước trên điện thoại */}
      <div className="lg:hidden grid grid-cols-2 gap-1 p-1.5 bg-white border-t border-slate-200 flex-shrink-0">
        {(["panel", "preview"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setMobileView(v)}
            className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              mobileView === v ? "bg-blue-50 text-blue-700" : "text-slate-500"
            }`}
          >
            {v === "panel" ? <MessageSquare className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {v === "panel" ? "Trợ lý & khách hàng" : "Xem trang"}
          </button>
        ))}
      </div>

      {publish && <PublishModal state={publish} onClose={() => setPublish(null)} onExportZip={handleExportZip} />}
    </div>
  );
}
