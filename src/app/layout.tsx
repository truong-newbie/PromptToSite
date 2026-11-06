import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PromptToSite | AI Landing Page & Web Studio",
  description: "Nền tảng tạo và xuất bản Landing Page bán hàng chuẩn CRO tự động trong 30 giây",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "PromptToSite | Nền tảng AI Tạo Landing Page Trong 30 Giây",
    description: "Biến mô tả tự nhiên thành Website bán hàng chuẩn chuyển đổi, tối ưu tỷ lệ chốt đơn và thu thập Leads CRM tự động.",
    type: "website",
    locale: "vi_VN",
    siteName: "PromptToSite",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={jakarta.variable}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-slate-50 text-slate-800">{children}</body>
    </html>
  );
}
