"use client";

import React, { useMemo, useState } from "react";
import { Download, Inbox, Phone, Search, Trash2 } from "lucide-react";
import { LeadStatus, LeadSubmission } from "@/lib/types";

const STATUS_LABELS: Record<LeadStatus, { label: string; badgeClass: string }> = {
  new: { label: "Mới", badgeClass: "bg-blue-50 text-blue-700 border-blue-200" },
  contacted: { label: "Đã gọi", badgeClass: "bg-amber-50 text-amber-700 border-amber-200" },
  closed: { label: "Đã chốt", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

interface Props {
  leads: LeadSubmission[];
  currentProjectId?: string;
  projects?: { id: string; name: string }[];
  onLeadsChange?: (next: LeadSubmission[]) => void;
}

export function LeadsPanel({ leads, currentProjectId, projects = [], onLeadsChange }: Props) {
  const [query, setQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>(currentProjectId || "all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (projectFilter !== "all" && l.projectId && l.projectId !== projectFilter) return false;
      if (!q) return true;
      return (
        l.fullName.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        (l.note || "").toLowerCase().includes(q) ||
        (l.projectName || "").toLowerCase().includes(q)
      );
    });
  }, [leads, query, projectFilter]);

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    const res = await fetch(`/api/leads/${encodeURIComponent(leadId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success && onLeadsChange) {
      onLeadsChange(leads.map((l) => (l.id === leadId ? { ...l, status } : l)));
    }
  };

  const handleDeleteLead = async (lead: LeadSubmission) => {
    if (!window.confirm(`Xóa dữ liệu cá nhân của khách hàng "${lead.fullName}" theo yêu cầu BVDLCN?`)) return;
    const res = await fetch(`/api/leads/${encodeURIComponent(lead.id)}`, { method: "DELETE" });
    if (res.ok && onLeadsChange) {
      onLeadsChange(leads.filter((l) => l.id !== lead.id));
    }
  };

  const csvHref =
    projectFilter && projectFilter !== "all"
      ? `/api/leads?export=csv&projectId=${encodeURIComponent(projectFilter)}`
      : "/api/leads?export=csv";

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-4 space-y-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Khách hàng tiềm năng</h3>
            <p className="text-[11px] text-slate-400">Quản lý trạng thái tư vấn & bảo vệ dữ liệu cá nhân</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 px-2.5 py-1 rounded-full">
            {filtered.length} khách
          </span>
        </div>

        {projects.length > 0 && (
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="field py-1.5 text-xs"
            aria-label="Lọc theo dự án"
          >
            <option value="all">Tất cả dự án ({leads.length})</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                Dự án: {p.name}
              </option>
            ))}
          </select>
        )}

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
          <a href={csvHref} download className="btn-primary px-3 text-xs">
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
          filtered.map((l) => {
            const st = l.status || "new";
            const stCfg = STATUS_LABELS[st] || STATUS_LABELS.new;
            return (
              <div key={l.id} className="p-3.5 rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft space-y-2.5 animate-fade-up">
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

                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <select
                    value={st}
                    onChange={(e) => handleStatusChange(l.id, e.target.value as LeadStatus)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${stCfg.badgeClass} focus:outline-none cursor-pointer`}
                    aria-label="Trạng thái khách hàng"
                  >
                    <option value="new">● Mới tiếp nhận</option>
                    <option value="contacted">● Đã gọi tư vấn</option>
                    <option value="closed">✓ Đã chốt đơn</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDeleteLead(l)}
                    className="px-2 py-1 rounded-lg text-[11px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 inline-flex items-center gap-1 transition"
                    title="Xóa dữ liệu khách hàng (Tuân thủ Luật BVDLCN)"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Xóa dữ liệu</span>
                  </button>
                </div>

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
            );
          })
        )}
      </div>
    </div>
  );
}
