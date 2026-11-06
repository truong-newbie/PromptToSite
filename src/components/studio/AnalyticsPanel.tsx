"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, Eye, MousePointerClick, Percent, RefreshCw, Users } from "lucide-react";

interface DailyMetric {
  date: string;
  views: number;
  clicks: number;
  leads: number;
}

interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  totalLeads: number;
  conversionRate: number;
  daily: DailyMetric[];
}

export function AnalyticsPanel({ projectId }: { projectId: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const qs = projectId ? `?projectId=${encodeURIComponent(projectId)}` : "";
      const res = await fetch(`/api/analytics${qs}`, { cache: "no-store" });
      const d = await res.json();
      if (d.success) {
        setData({
          totalViews: d.totalViews || 0,
          totalClicks: d.totalClicks || 0,
          totalLeads: d.totalLeads || 0,
          conversionRate: d.conversionRate || 0,
          daily: Array.isArray(d.daily) ? d.daily : [],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const maxBar = Math.max(
    1,
    ...(data?.daily.map((d) => Math.max(d.views, d.clicks, d.leads)) || [1])
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Thống kê chuyển đổi (7 ngày qua)</h3>
          <p className="text-[11px] text-slate-400">Không dùng cookie, băm ẩn danh SHA-256</p>
        </div>
        <button
          onClick={loadAnalytics}
          className="btn-ghost px-2.5 py-1.5 text-xs"
          title="Làm mới số liệu"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* 4 chỉ số chính */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Lượt xem trang</span>
            <Eye className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{data?.totalViews ?? 0}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Lượt bấm nút CTA</span>
            <MousePointerClick className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{data?.totalClicks ?? 0}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Khách để lại SĐT</span>
            <Users className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600">{data?.totalLeads ?? 0}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Tỷ lệ chuyển đổi</span>
            <Percent className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{data?.conversionRate ?? 0}%</p>
        </div>
      </div>

      {/* Biểu đồ cột SVG 7 ngày */}
      <div className="p-4 rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>Biểu đồ 7 ngày gần nhất</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-semibold">
            <span className="inline-flex items-center gap-1 text-blue-600">
              <span className="w-2 h-2 rounded-full bg-blue-600" /> Lượt xem
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Khách hàng
            </span>
          </div>
        </div>

        <div className="pt-2">
          <svg viewBox="0 0 320 150" className="w-full h-40 overflow-visible">
            {[0, 0.5, 1].map((r, idx) => (
              <line
                key={idx}
                x1={0}
                x2={320}
                y1={120 - r * 100}
                y2={120 - r * 100}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            ))}
            {(data?.daily || []).map((d, i) => {
              const x = 14 + i * 44;
              const viewH = Math.max(3, Math.round((d.views / maxBar) * 96));
              const leadH = Math.max(3, Math.round((d.leads / maxBar) * 96));
              return (
                <g key={d.date}>
                  <rect
                    x={x}
                    y={120 - viewH}
                    width={12}
                    height={viewH}
                    rx={4}
                    fill="#2563eb"
                  >
                    <title>{`${d.date}: ${d.views} lượt xem`}</title>
                  </rect>
                  <rect
                    x={x + 14}
                    y={120 - leadH}
                    width={12}
                    height={leadH}
                    rx={4}
                    fill="#10b981"
                  >
                    <title>{`${d.date}: ${d.leads} khách hàng`}</title>
                  </rect>
                  <text
                    x={x + 13}
                    y={138}
                    textAnchor="middle"
                    className="fill-slate-400 text-[9px] font-semibold"
                  >
                    {d.date}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
