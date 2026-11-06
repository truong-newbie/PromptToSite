"use client";

import React, { useEffect, useState } from "react";
import { Bell, Check, Copy, KeyRound, Loader2, Plug, Send, Zap } from "lucide-react";

export interface StudioSettings {
  aiProvider: "mock" | "gemini" | "openai";
  apiKey: string;
  telegramToken: string;
  telegramChatId: string;
}

interface Props {
  settings: StudioSettings;
  onChange: (next: StudioSettings) => void;
}

function Section({ icon, title, desc, children }: { icon: React.ReactNode; title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft p-4 space-y-3">
      <div className="flex items-start gap-3">
        <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">{icon}</span>
        <div>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          {desc && <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{desc}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">{children}</label>
);

export function SettingsPanel({ settings, onChange }: Props) {
  const [origin, setOrigin] = useState("http://localhost:3000");
  const [copied, setCopied] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => setOrigin(window.location.origin), []);

  const set = <K extends keyof StudioSettings>(key: K, value: StudioSettings[K]) => onChange({ ...settings, [key]: value });

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* trình duyệt chặn clipboard */
    }
  };

  const testTelegram = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/telegram-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botToken: settings.telegramToken, chatId: settings.telegramChatId }),
      });
      const data = await res.json();
      setTestResult(data.success ? { ok: true, message: "Đã gửi tin thử, hãy kiểm tra Telegram của bạn." } : { ok: false, message: data.error || "Gửi thất bại" });
    } catch {
      setTestResult({ ok: false, message: "Không kết nối được máy chủ." });
    } finally {
      setTesting(false);
    }
  };

  const mcpSnippet = JSON.stringify(
    { mcpServers: { prompttosite: { command: "npx", args: ["-y", "mcp-remote", `${origin}/api/mcp`] } } },
    null,
    2
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <Section
        icon={<Zap className="w-4 h-4 text-amber-500" />}
        title="Trí tuệ nhân tạo (BYOK)"
        desc="Dùng Smart Template Engine miễn phí, hoặc nhập key Gemini / OpenAI của riêng bạn."
      >
        <div>
          <Label>Mô hình</Label>
          <select
            value={settings.aiProvider}
            onChange={(e) => set("aiProvider", e.target.value as StudioSettings["aiProvider"])}
            className="field"
          >
            <option value="mock">Smart Template Engine (không cần key)</option>
            <option value="gemini">Google Gemini 2.0 Flash</option>
            <option value="openai">OpenAI GPT-4o mini</option>
          </select>
        </div>
        {settings.aiProvider !== "mock" && (
          <div>
            <Label>API key</Label>
            <div className="relative">
              <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={settings.apiKey}
                onChange={(e) => set("apiKey", e.target.value)}
                placeholder="Dán API key"
                autoComplete="off"
                className="field pl-9 font-mono text-xs"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">Key chỉ giữ trong phiên làm việc này, không được lưu lại.</p>
          </div>
        )}
      </Section>

      <Section
        icon={<Bell className="w-4 h-4 text-blue-600" />}
        title="Thông báo khách mới qua Telegram"
        desc="Chat với @BotFather để lấy Bot Token, chat với @userinfobot để lấy Chat ID."
      >
        <div>
          <Label>Bot Token</Label>
          <input
            value={settings.telegramToken}
            onChange={(e) => set("telegramToken", e.target.value)}
            placeholder="7123456789:AAH..."
            autoComplete="off"
            className="field font-mono text-xs"
          />
        </div>
        <div>
          <Label>Chat ID</Label>
          <input
            value={settings.telegramChatId}
            onChange={(e) => set("telegramChatId", e.target.value)}
            placeholder="123456789"
            autoComplete="off"
            className="field font-mono text-xs"
          />
        </div>
        <button
          onClick={testTelegram}
          disabled={testing || !settings.telegramToken || !settings.telegramChatId}
          className="btn-ghost w-full py-2.5 text-xs disabled:opacity-50"
        >
          {testing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          Gửi tin nhắn thử
        </button>
        {testResult && (
          <p className={`text-[11px] font-semibold ${testResult.ok ? "text-emerald-600" : "text-rose-600"}`}>{testResult.message}</p>
        )}
        <p className="text-[10px] text-slate-400">Thông tin này được lưu trên trình duyệt của bạn.</p>
      </Section>

      <Section
        icon={<Plug className="w-4 h-4 text-indigo-600" />}
        title="Kết nối MCP"
        desc="Cho phép Claude Desktop, Cursor hoặc ChatGPT tạo và sửa trang trực tiếp. Studio sẽ tự cập nhật theo."
      >
        <div>
          <Label>Endpoint</Label>
          <div className="flex gap-2">
            <code className="flex-1 min-w-0 truncate rounded-xl bg-slate-900 text-emerald-400 text-[11px] px-3 py-2.5 font-mono">{origin}/api/mcp</code>
            <button onClick={() => copy("url", `${origin}/api/mcp`)} className="btn-ghost px-3" aria-label="Sao chép endpoint">
              {copied === "url" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
        <div>
          <Label>Cấu hình cho Claude Desktop</Label>
          <div className="relative">
            <pre className="rounded-xl bg-slate-900 text-slate-200 text-[10px] leading-relaxed p-3 overflow-x-auto font-mono">{mcpSnippet}</pre>
            <button
              onClick={() => copy("cfg", mcpSnippet)}
              className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center transition"
              aria-label="Sao chép cấu hình"
            >
              {copied === "cfg" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
        <p className="text-[10px] text-slate-400">
          Công cụ: generate_landing_page, update_landing_page_block, publish_landing_page, get_crm_leads.
        </p>
      </Section>
    </div>
  );
}
