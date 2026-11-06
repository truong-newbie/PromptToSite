import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptToSite - AI Landing Page & Web Builder",
  description: "Tạo và xuất bản Landing Page bán hàng bằng câu lệnh trong 30 giây",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
