"use client";

import React, { useEffect, useState } from "react";
import { Clock, RotateCcw, Sparkles, Terminal, User, X } from "lucide-react";
import { TemplateBlockConfig } from "@/lib/blocks/template-engine";

export interface VersionRecord {
  id: string;
  projectId: string;
  versionNumber: number;
  source: "studio" | "mcp" | "ai";
  promptHistory?: string;
  createdAt: string;
  config: TemplateBlockConfig;
}

interface Props {
  projectId: string;
  open: boolean;
  onClose: () => void;
  onRestore: (version: VersionRecord) => void;
}

export function HistoryDrawer({ projectId, open, onClose, onRestore }: Props) {
  const [versions, setVersions] = useState<VersionRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !projectId) return;
    setLoading(true);
    fetch(`/api/projects/${encodeURIComponent(projectId)}/versions`)
      .then((r) => r.json())
      .then((d) => d.success && Array.isArray(d.versions) && setVersions(d.versions))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open, projectId]);

  if (!open) return null;

  const badge = (source: VersionRecord["source"]) => {
    if (source === "mcp") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
          <Terminal className="w-3 h-3" /> MCP
        </span>
      );
    }
    if (source === "ai") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">
          <Sparkles className="w-3 h-3" /> AI
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
        <User className="w-3 h-3" /> Studio
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900">Lịch sử phiên bản (Tối đa 50 bản)</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {loading ? (
            <p className="text-xs text-slate-400 text-center py-8">Đang tải lịch sử phiên bản...</p>
          ) : versions.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">Chưa có phiên bản nào được lưu.</p>
          ) : (
            versions.map((v, idx) => (
              <div
                key={v.id}
                className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-blue-300 bg-white shadow-xs transition flex items-start justify-between gap-3"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">Phiên bản #{v.versionNumber}</span>
                    {badge(v.source)}
                    {idx === 0 && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Hiện tại
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 truncate font-medium">
                    {v.promptHistory || v.config?.headline || v.config?.brandName}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {new Date(v.createdAt).toLocaleString("vi-VN")}
                  </p>
                </div>

                {idx > 0 && (
                  <button
                    onClick={() => onRestore(v)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold flex items-center gap-1 transition flex-shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Khôi phục
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
