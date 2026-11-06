"use client";

import React, { useEffect, useState } from "react";
import { Bell, Check, Copy, KeyRound, Loader2, Plug, Plus, Send, ShieldAlert, Trash2, Zap } from "lucide-react";
import { ApiTokenItem } from "@/lib/types";

export interface StudioSettings {
  aiProvider: "mock" | "gemini" | "openai";
  apiKey: string;
  telegramToken: string;
  telegramChatId: string;
}

interface Props {
  settings: StudioSettings;
  onChange: (next: StudioSettings) => void;
  projectId?: string;
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

  // Quản lý MCP Token (A3)
  const [tokens, setTokens] = useState<ApiTokenItem[]>([]);
  const [tokenName, setTokenName] = useState("");
  const [creatingToken, setCreatingToken] = useState(false);
  const [newlyCreatedToken, setNewlyCreatedToken] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch("/api/tokens")
      .then((r) => r.json())
      .then((d) => d.success && Array.isArray(d.tokens) && setTokens(d.tokens))
      .catch(() => {});
  }, []);

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

  const handleCreateToken = async () => {
    setCreatingToken(true);
    try {
      const res = await fetch("/api/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tokenName || "Claude Desktop Token" }),
      });
      const data = await res.json();
      if (data.success && data.token && data.item) {
        setNewlyCreatedToken(data.token);
        setTokens((prev) => [data.item, ...prev]);
        setTokenName("");
      }
    } finally {
      setCreatingToken(false);
    }
  };

  const handleRevokeToken = async (id: string) => {
    await fetch(`/api/tokens?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setTokens((prev) => prev.map((t) => (t.id === id ? { ...t, revokedAt: new Date().toISOString() } : t)));
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

  const displayToken = newlyCreatedToken || "<token>";
  const mcpSnippet = JSON.stringify(
    {
      mcpServers: {
        prompttosite: {
          command: "npx",
          args: ["-y", "mcp-remote", `${origin}/api/mcp`, "--header", `Authorization: Bearer ${displayToken}`],
        },
      },
    },
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
      </Section>

      <Section
        icon={<Plug className="w-4 h-4 text-indigo-600" />}
        title="Kết nối MCP & API Token"
        desc="Tạo khóa cá nhân (SHA-256) để Claude Desktop, Cursor điều khiển dự án của bạn an toàn."
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

        {/* Tạo API Token */}
        <div className="pt-1 space-y-2">
          <Label>Tạo API Token mới</Label>
          <div className="flex gap-2">
            <input
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="Tên gợi nhớ (VD: Máy bàn văn phòng)"
              className="field flex-1 text-xs"
            />
            <button
              onClick={handleCreateToken}
              disabled={creatingToken}
              className="btn-primary px-3 py-2 text-xs flex-shrink-0"
            >
              {creatingToken ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              Tạo token
            </button>
          </div>
        </div>

        {newlyCreatedToken && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
            <p className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              Hãy sao chép ngay – Token chỉ hiển thị duy nhất 1 lần:
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate bg-white px-2.5 py-1.5 rounded-lg border border-amber-200 font-mono text-[11px] text-slate-900">
                {newlyCreatedToken}
              </code>
              <button
                onClick={() => copy("newtok", newlyCreatedToken)}
                className="btn-ghost px-2.5 py-1.5 text-xs"
              >
                {copied === "newtok" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {tokens.length > 0 && (
          <div className="space-y-1.5">
            <Label>Danh sách Token đã cấp</Label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {tokens.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{t.name}</p>
                    <p className="text-[10px] font-mono text-slate-500">
                      {t.tokenHint} {t.revokedAt ? "• Đã thu hồi" : t.lastUsedAt ? "• Đã dùng" : "• Chưa dùng"}
                    </p>
                  </div>
                  {!t.revokedAt && (
                    <button
                      onClick={() => handleRevokeToken(t.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Thu hồi token"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
