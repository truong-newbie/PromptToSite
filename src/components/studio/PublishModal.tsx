"use client";

import React, { useEffect, useState } from "react";
import { Check, Copy, Download, ExternalLink, Loader2, TriangleAlert, X } from "lucide-react";

export type PublishState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; url: string };

interface Props {
  state: PublishState;
  onClose: () => void;
  onExportZip: () => void;
}

export function PublishModal({ state, onClose, onExportZip }: Props) {
  const [copied, setCopied] = useState(false);
  const [qrFailed, setQrFailed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isLocal = state.status === "done" && /\/\/(localhost|127\.0\.0\.1|\[::1\])/.test(state.url);

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard bị chặn */
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Xuất bản trang"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl p-7 max-w-md w-full shadow-float ring-1 ring-slate-200 animate-pop"
      >
        <button onClick={onClose} aria-label="Đóng" className="absolute top-4 right-4 w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 flex items-center justify-center transition">
          <X className="w-4 h-4" />
        </button>

        {state.status === "loading" && (
          <div className="py-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-600" />
            <p className="text-sm font-semibold text-slate-700">Đang đóng gói và xuất bản...</p>
          </div>
        )}

        {state.status === "error" && (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <TriangleAlert className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Chưa xuất bản được</h3>
            <p className="text-sm text-slate-500">{state.message}</p>
            <button onClick={onClose} className="btn-ghost px-5 py-2.5 text-sm">Đóng</button>
          </div>
        )}

        {state.status === "done" && (
          <div className="space-y-5 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Check className="w-7 h-7" strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Đã xuất bản trang</h3>
              <p className="text-sm text-slate-500 mt-1">Khách điền form trên trang này sẽ được lưu vào CRM và báo về Telegram của bạn.</p>
            </div>

            <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4 space-y-3">
              {!qrFailed && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(state.url)}`}
                  alt="Mã QR của trang"
                  onError={() => setQrFailed(true)}
                  className="w-36 h-36 mx-auto rounded-xl bg-white ring-1 ring-slate-200"
                />
              )}
              <div className="flex gap-2">
                <code className="flex-1 min-w-0 truncate text-left rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2.5 text-xs font-mono text-blue-700">{state.url}</code>
                <button onClick={() => copy(state.url)} className="btn-ghost px-3" aria-label="Sao chép liên kết">
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {isLocal && (
                <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg px-3 py-2 text-left leading-relaxed">
                  Địa chỉ localhost chỉ mở được trên máy này. Hãy triển khai Studio lên máy chủ để quét mã QR bằng điện thoại.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <a href={state.url} target="_blank" rel="noreferrer" className="btn-primary flex-1 py-3 text-sm">
                <ExternalLink className="w-4 h-4" />
                Mở trang
              </a>
              <button onClick={onExportZip} className="btn-ghost flex-1 py-3 text-sm">
                <Download className="w-4 h-4" />
                Tải mã nguồn
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
