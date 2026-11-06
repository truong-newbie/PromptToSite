"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ExternalLink,
  FolderKanban,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { PromptToSiteLogo } from "@/components/Logo";
import { IndustryType } from "@/lib/types";

interface ProjectCardItem {
  id: string;
  name: string;
  industry: IndustryType;
  primaryColor: string;
  secondaryColor: string;
  publishedSlug?: string;
  leadCount: number;
  version: number;
  updatedAt: string;
}

const INDUSTRY_LABELS: Record<IndustryType, string> = {
  spa: "Thẩm mỹ & Spa",
  coffee: "Cà phê & F&B",
  course: "Khóa học & Đào tạo",
  fashion: "Thời trang & Mỹ phẩm",
  general: "Doanh nghiệp & Dịch vụ",
};

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newIndustry, setNewIndustry] = useState<IndustryType>("spa");
  const [creating, setCreating] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() || undefined, industry: newIndustry }),
      });
      const data = await res.json();
      if (data.success && data.project) {
        router.push(`/?project=${encodeURIComponent(data.project.id)}`);
      }
    } finally {
      setCreating(false);
    }
  };

  const handleRename = async (proj: ProjectCardItem) => {
    const next = window.prompt("Nhập tên mới cho dự án:", proj.name);
    if (!next || !next.trim() || next.trim() === proj.name) return;
    const res = await fetch("/api/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: proj.id, name: next.trim() }),
    });
    const data = await res.json();
    if (data.success) {
      setProjects((prev) => prev.map((p) => (p.id === proj.id ? { ...p, name: next.trim() } : p)));
    }
  };

  const handleDelete = async (proj: ProjectCardItem) => {
    if (!window.confirm(`Bạn có chắc muốn xóa dự án "${proj.name}"?`)) return;
    await fetch(`/api/projects?id=${encodeURIComponent(proj.id)}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== proj.id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-3 group">
          <PromptToSiteLogo className="w-9 h-9 group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-sm">
                Prompt<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">ToSite</span>
              </span>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                Workspace
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Quản lý các dự án Landing Page & khách hàng tiềm năng</p>
          </div>
        </Link>
        <Link href="/" className="btn-primary px-4 py-2 text-xs">
          Quay lại Web Studio
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Khung tạo dự án mới */}
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 flex flex-col md:flex-row items-stretch md:items-end gap-4"
        >
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên dự án / Thương hiệu mới</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="VD: Nha Khoa Quốc Tế Ánh Dương"
              className="field text-xs"
            />
          </div>
          <div className="w-full md:w-56">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Ngành nghề</label>
            <select
              value={newIndustry}
              onChange={(e) => setNewIndustry(e.target.value as IndustryType)}
              className="field text-xs"
            >
              {(Object.keys(INDUSTRY_LABELS) as IndustryType[]).map((k) => (
                <option key={k} value={k}>
                  {INDUSTRY_LABELS[k]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={creating} className="btn-primary px-6 py-2.5 text-xs flex-shrink-0">
            {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Tạo dự án mới
          </button>
        </form>

        {/* Danh sách dự án */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">Danh sách dự án của bạn ({projects.length})</h2>
          </div>

          {loading ? (
            <p className="text-xs text-slate-400 py-10 text-center">Đang tải danh sách dự án...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-lg transition p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${p.primaryColor}, ${p.secondaryColor})` }}
                        >
                          {Array.from(p.name.trim())[0]?.toUpperCase() || "P"}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900 text-sm truncate">{p.name}</h3>
                          <span className="text-[11px] text-slate-400">{INDUSTRY_LABELS[p.industry] || p.industry}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleRename(p)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="Đổi tên dự án"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {projects.length > 1 && (
                          <button
                            onClick={() => handleDelete(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Xóa dự án"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                        <Users className="w-3 h-3" /> {p.leadCount} khách hàng
                      </span>
                      <span className="text-[11px] text-slate-400">Phiên bản #{p.version}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {p.publishedSlug ? (
                      <a
                        href={`/s/${p.publishedSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> /s/{p.publishedSlug}
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400">Chưa xuất bản</span>
                    )}

                    <Link
                      href={`/?project=${encodeURIComponent(p.id)}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 transition"
                    >
                      <span>Mở trong Studio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

