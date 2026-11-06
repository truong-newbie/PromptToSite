import React from "react";

export function PromptToSiteLogo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="p2s-bg-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="0.6" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="p2s-glow" x1="12" y1="18" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#93c5fd" />
          </linearGradient>
        </defs>

        {/* Nền Squircle bo góc thanh lịch */}
        <rect width="40" height="40" rx="11" fill="url(#p2s-bg-grad)" />

        {/* Khung giao diện Web thu nhỏ */}
        <rect x="7" y="7" width="26" height="26" rx="5" stroke="white" strokeWidth="1.6" strokeOpacity="0.4" fill="white" fillOpacity="0.08" />
        <line x1="7" y1="13" x2="33" y2="13" stroke="white" strokeWidth="1.4" strokeOpacity="0.3" />
        <circle cx="11" cy="10" r="1" fill="white" fillOpacity="0.7" />
        <circle cx="14" cy="10" r="1" fill="white" fillOpacity="0.7" />

        {/* Dấu nhắc Prompt `>` biến hóa công nghệ */}
        <path
          d="M13 18.5L18.5 22.5L13 26.5"
          stroke="url(#p2s-glow)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Khối sáng Landing Page xuất hiện */}
        <rect x="21" y="19" width="6" height="7" rx="1.5" fill="#38bdf8" />
      </svg>
    </div>
  );
}
