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
  title: "PromptToSite - AI Landing Page & Web Builder",
  description: "Tạo và xuất bản Landing Page bán hàng bằng câu lệnh trong 30 giây",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f6fb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={jakarta.variable}>
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
