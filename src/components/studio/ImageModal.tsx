"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Loader2, Upload, X, Link as LinkIcon } from "lucide-react";
import { IndustryType } from "@/lib/types";

const INDUSTRY_UNSPLASH: Record<IndustryType, { label: string; url: string }[]> = {
  spa: [
    { label: "Không gian Spa thư giãn", url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" },
    { label: "Chăm sóc da chuyên sâu", url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80" },
    { label: "Liệu trình tinh dầu thảo mộc", url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80" },
    { label: "Thẩm mỹ viện chuẩn y khoa", url: "https://images.unsplash.com/photo-1512290900672-1f85b18c6e0a?auto=format&fit=crop&w=1200&q=80" },
    { label: "Mỹ phẩm thiên nhiên", url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80" },
    { label: "Phòng trị liệu cao cấp", url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80" },
  ],
  coffee: [
    { label: "Quán cà phê Specialty", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80" },
    { label: "Tách Latte Art thủ công", url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80" },
    { label: "Hạt cà phê rang mộc", url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80" },
    { label: "Góc quán ấm cúng", url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80" },
    { label: "Pha chế Pour Over", url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80" },
    { label: "Bánh ngọt & Cà phê sáng", url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80" },
  ],
  course: [
    { label: "Lớp học công nghệ hiện đại", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80" },
    { label: "Hội thảo & Đào tạo", url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80" },
    { label: "Làm việc nhóm sáng tạo", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" },
    { label: "Học trực tuyến 1:1", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" },
    { label: "Thư viện học liệu số", url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80" },
    { label: "Chứng chỉ & Tốt nghiệp", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" },
  ],
  fashion: [
    { label: "Bộ sưu tập thời trang nữ", url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" },
    { label: "Showroom tối giản", url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80" },
    { label: "Phong cách công sở thanh lịch", url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80" },
    { label: "Chất liệu lụa cao cấp", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" },
    { label: "Phụ kiện & Túi xách", url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80" },
    { label: "Lookbook mùa hè", url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80" },
  ],
  general: [
    { label: "Giải pháp doanh nghiệp số", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
    { label: "Đội ngũ chuyên gia tư vấn", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" },
    { label: "Văn phòng hiện đại", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" },
    { label: "Tăng trưởng doanh thu", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
    { label: "Hợp tác chiến lược", url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80" },
    { label: "Chăm sóc khách hàng", url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80" },
  ],
};

interface Props {
  open: boolean;
  industry: IndustryType;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function ImageModal({ open, industry, onClose, onSelect }: Props) {
  const [uploading, setUploading] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const presets = INDUSTRY_UNSPLASH[industry] || INDUSTRY_UNSPLASH.general;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    if (file.size > 3 * 1024 * 1024) {
      setError("Ảnh tải lên không được vượt quá 3 MB.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Tải ảnh lên thất bại.");
      } else {
        onSelect(data.url);
        onClose();
      }
    } catch {
      setError("Không kết nối được máy chủ khi tải ảnh.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-pop">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900">Đổi ảnh Hero của trang</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* 1. Tải ảnh từ máy */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">1. Tải ảnh từ máy tính (Tối đa 3 MB – JPG, PNG, WebP)</label>
            <label className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/40 cursor-pointer transition text-xs font-semibold text-slate-600">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> : <Upload className="w-4 h-4 text-blue-600" />}
              <span>{uploading ? "Đang tải ảnh lên..." : "Bấm để chọn file ảnh từ máy"}</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          {/* 2. Dán đường dẫn HTTPS */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">2. Hoặc dán đường dẫn ảnh HTTPS</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="field pl-9 text-xs"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!/^https:\/\//i.test(customUrl.trim())) {
                    setError("Đường dẫn ảnh phải bắt đầu bằng https://");
                    return;
                  }
                  onSelect(customUrl.trim());
                  onClose();
                }}
                className="btn-primary px-4 text-xs"
              >
                Áp dụng
              </button>
            </div>
          </div>

          {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

          {/* 3. Bộ 6 ảnh mẫu theo ngành */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-slate-700">3. Chọn nhanh 6 ảnh mẫu chất lượng cao theo ngành</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {presets.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onSelect(img.url);
                    onClose();
                  }}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-600 aspect-[4/3] bg-slate-100 text-left shadow-xs hover:shadow-md transition"
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-2">
                    <p className="text-[10px] font-semibold text-white truncate">{img.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

