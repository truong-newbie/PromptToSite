import React from "react";

export function PromptToSiteLogo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 select-none ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Gradient màu công nghệ cao cấp: Xanh hoàng gia -> Xanh điện tử -> Lam ngọc */}
          <linearGradient id="p2s-bg-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="55%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Dải sáng phản chiếu trên bề mặt kính */}
          <linearGradient id="p2s-surface-shine" x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Ánh sáng dạ quang cho khối Landing Page */}
          <linearGradient id="p2s-card-grad" x1="20" y1="18" x2="28" y2="27" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <filter id="p2s-inner-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0f172a" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Khối nền Squircle bo tròn hiện đại */}
        <rect width="40" height="40" rx="11" fill="url(#p2s-bg-grad)" />

        {/* Lớp phản quang vát góc trên */}
        <path d="M0 11C0 4.925 4.925 0 11 0H29C35.075 0 40 4.925 40 11V18H0V11Z" fill="url(#p2s-surface-shine)" />

        {/* Viền kim loại mỏng tinh xảo */}
        <rect x="0.5" y="0.5" width="39" height="39" rx="10.5" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />

        {/* Khung trình duyệt / Landing Page ảo */}
        <rect
          x="7.5"
          y="7.5"
          width="25"
          height="25"
          rx="5.5"
          fill="#ffffff"
          fillOpacity="0.12"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="1.3"
        />

        {/* Thanh tiêu đề trình duyệt & 2 chấm traffic lights */}
        <line x1="7.5" y1="13.5" x2="32.5" y2="13.5" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="11.5" cy="10.5" r="1.1" fill="#38bdf8" />
        <circle cx="14.5" cy="10.5" r="1.1" fill="#93c5fd" />

        {/* Dấu nhắc lệnh Prompt `>` (Biểu tượng Prompt AI) */}
        <path
          d="M12.5 18L17.5 22L12.5 26"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#p2s-inner-glow)"
        />

        {/* Khối web bán hàng tự sinh (Biểu tượng ToSite) */}
        <rect x="20.5" y="18.5" width="8" height="8.5" rx="2" fill="url(#p2s-card-grad)" />
        <line x1="22.5" y1="21.5" x2="26.5" y2="21.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
        <line x1="22.5" y1="24" x2="25.5" y2="24" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function PromptToSiteBrand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 min-w-0 ${className}`}>
      <PromptToSiteLogo className="w-9 h-9" />
      <div className="min-w-0 leading-tight">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 tracking-tight text-base">
            Prompt<span className="text-blue-600">ToSite</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50/90 border border-blue-200/80 px-2 py-0.5 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AI Studio</span>
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium hidden sm:block truncate">
          Hệ thống tạo & xuất bản Landing Page chuẩn CRO
        </p>
      </div>
    </div>
  );
}
