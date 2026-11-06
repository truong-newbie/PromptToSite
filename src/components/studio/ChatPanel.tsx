"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, Coffee, Flower2, GraduationCap, Loader2, Shirt, Sparkles } from "lucide-react";
import { PromptToSiteLogo } from "@/components/Logo";

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  time: string;
}

export const GENERATION_STEPS = [
  "Phân tích ngành hàng và ý tưởng",
  "Chọn khối giao diện phù hợp",
  "Viết nội dung theo công thức AIDA",
  "Dựng trang và tối ưu cho mobile",
];

const SUGGESTIONS = [
  {
    title: "Thẩm mỹ & Spa",
    hint: "Giảm 40%, có form đặt hẹn",
    prompt: "Tạo Landing Page cho Viện Thẩm Mỹ Ban Mai, giảm 40%, có form đặt hẹn",
    icon: Flower2,
    tone: "bg-teal-50 text-teal-600",
  },
  {
    title: "Cà phê rang mộc",
    hint: "Mua 1 tặng 1 tuần ra mắt",
    prompt: "Tạo trang bán cà phê The Mộc rang xay nguyên bản, mua 1 tặng 1",
    icon: Coffee,
    tone: "bg-amber-50 text-amber-700",
  },
  {
    title: "Khóa học AI",
    hint: "Học bổng 50%, kèm 1:1",
    prompt: "Tạo landing page khóa học AI Marketing NextGen, học bổng 50%",
    icon: GraduationCap,
    tone: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Thời trang nữ",
    hint: "Lụa cao cấp, đổi size 7 ngày",
    prompt: "Tạo trang bộ sưu tập thời trang nữ L'AURA Boutique, giảm 30%",
    icon: Shirt,
    tone: "bg-rose-50 text-rose-600",
  },
];

interface Props {
  messages: ChatMessage[];
  generating: boolean;
  step: number;
  onSend: (prompt: string) => void;
}

export function ChatPanel({ messages, generating, step, onSend }: Props) {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, generating, step]);

  const submit = (value: string) => {
    const v = value.trim();
    if (!v || generating) return;
    onSend(v);
    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-3 space-y-5">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2.5 animate-fade-up ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            {m.role === "assistant" && <PromptToSiteLogo className="w-7 h-7 mt-0.5" />}
            <div className={`max-w-[86%] flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                  m.role === "user"
                    ? "rounded-2xl rounded-tr-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-glow"
                    : "rounded-2xl rounded-tl-md bg-slate-100 text-slate-700"
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
            </div>
          </div>
        ))}

        {generating && (
          <div className="flex gap-2.5 animate-fade-up">
            <PromptToSiteLogo className="w-7 h-7 mt-0.5" />
            <div className="rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 space-y-2 min-w-[240px]">
              {GENERATION_STEPS.map((label, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <div key={label} className={`flex items-center gap-2 text-xs transition ${done || active ? "text-slate-700" : "text-slate-400"}`}>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        done ? "bg-emerald-500 text-white" : active ? "bg-blue-100 text-blue-600" : "bg-slate-200"
                      }`}
                    >
                      {done ? <Check className="w-2.5 h-2.5" strokeWidth={3} /> : active ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                    </span>
                    <span className={active ? "font-semibold" : ""}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="px-4 pb-4 pt-3 border-t border-slate-100 space-y-3 bg-white">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Thử nhanh theo ngành</p>
          <div className="grid grid-cols-2 gap-2">
            {SUGGESTIONS.map(({ title, hint, prompt, icon: Icon, tone }) => (
              <button
                key={title}
                onClick={() => submit(prompt)}
                disabled={generating}
                className="group flex items-center gap-2.5 p-2.5 rounded-xl bg-white ring-1 ring-slate-200 text-left transition hover:ring-blue-400 hover:shadow-soft disabled:opacity-50"
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tone}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-slate-800 truncate">{title}</span>
                  <span className="block text-[10px] text-slate-400 truncate">{hint}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
            rows={2}
            maxLength={1000}
            placeholder="Mô tả trang web bạn muốn tạo. Ví dụ: Landing page bán sữa hạt, giảm 20%, hotline 0988123456"
            className="field resize-none pr-14 text-[13px] leading-relaxed"
          />
          <button
            onClick={() => submit(input)}
            disabled={generating || !input.trim()}
            aria-label="Tạo trang"
            className="btn-primary absolute right-2 bottom-2 w-9 h-9"
          >
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" strokeWidth={2.5} />}
          </button>
        </div>
        <p className="text-[10px] text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Enter để gửi, Shift + Enter để xuống dòng
        </p>
      </div>
    </div>
  );
}
