"use client";

import React, { useMemo, useState } from "react";
import { Download, Inbox, Phone, Search } from "lucide-react";
import { LeadSubmission } from "@/lib/types";

export function LeadsPanel({ leads }: { leads: LeadSubmission[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(
      (l) => l.fullName.toLowerCase().includes(q) || l.phone.includes(q) || (l.note || "").toLowerCase().includes(q)
    );
  }, [leads, query]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-4 space-y-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Khách hàng tiềm năng</h3>
            <p className="text-[11px] text-slate-400">Cập nhật ngay khi có người gửi form</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 px-2.5 py-1 rounded-full">
            {leads.length} khách
          </span>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm theo tên, SĐT, nhu cầu"
              className="field pl-9 py-2 text-xs"
            />
          </div>
          <a href="/api/leads?export=csv" download className="btn-primary px-3 text-xs">
            <Download className="w-3.5 h-3.5" />
            Excel
          </a>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {leads.length === 0 ? (
          <div className="text-center py-16 px-6 space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <Inbox className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-slate-700">Chưa có khách nào đăng ký</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Điền thử Họ tên và Số điện thoại vào form ở trang xem trước bên phải, dữ liệu sẽ xuất hiện tại đây.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-10">Không tìm thấy khách phù hợp.</p>
        ) : (
          filtered.map((l) => (
            <div key={l.id} className="p-3.5 rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft space-y-2 animate-fade-up">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {Array.from(l.fullName.trim())[0]?.toUpperCase() || "K"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-slate-900 text-sm truncate">{l.fullName}</p>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{l.submittedAt}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{l.projectName}</p>
                </div>
              </div>
              {l.note && <p className="text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2 leading-relaxed">{l.note}</p>}
              <a
                href={`tel:${l.phone}`}
                className="flex items-center justify-between rounded-lg bg-blue-50 text-blue-700 px-3 py-2 text-xs font-bold hover:bg-blue-100 transition"
              >
                <span className="font-mono">{l.phone}</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Gọi ngay
                </span>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
