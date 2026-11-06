"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PromptToSiteLogo } from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(mode: "email" | "google" | "demo", e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          email: mode === "google" ? "founder@prompttosite.vn" : email,
          fullName: mode === "google" ? "Tài khoản Google" : fullName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại.");
        setLoading(false);
        return;
      }
      router.push(data.defaultProjectId ? `/?project=${data.defaultProjectId}` : "/");
      router.refresh();
    } catch {
      setError("Không thể kết nối máy chủ.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/showcase" className="inline-flex items-center gap-2.5">
            <PromptToSiteLogo className="w-10 h-10" />
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-2">
            Đăng nhập vào PromptToSite
          </h1>
          <p className="text-xs text-slate-500 max-w-xs">
            Quản lý các dự án Landing Page, khách hàng tiềm năng (CRM) và cấu hình xuất bản riêng biệt.
          </p>
        </div>

        {/* Nút Dùng thử nhanh cho BGK / Demo */}
        <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Chế độ thuyết trình & Chấm thi (Demo Mode)</span>
          </div>
          <p className="text-[11px] text-blue-700 leading-relaxed">
            Trải nghiệm ngay toàn bộ tính năng Web Studio, AI Builder và CRM trong 24 giờ không cần tạo tài khoản.
          </p>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleLogin("demo")}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>Dùng thử không cần đăng nhập</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            Hoặc đăng nhập tài khoản
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Đăng nhập Google */}
        <button
          type="button"
          disabled={loading}
          onClick={() => handleLogin("google")}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition flex items-center justify-center gap-2.5 shadow-sm disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
          <span>Tiếp tục với Google</span>
        </button>

        {/* Form Email Magic Link */}
        <form onSubmit={(e) => handleLogin("email", e)} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên (tùy chọn)</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Địa chỉ Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ban@congty.vn"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition disabled:opacity-50"
          >
            {loading ? "Đang xác thực..." : "Đăng nhập bằng Email"}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Bảo mật phiên HTTP-only
          </span>
          <Link href="/showcase" className="text-blue-600 hover:underline font-medium">
            Xem trang giới thiệu
          </Link>
        </div>
      </div>
    </div>
  );
}
