import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PromptToSite | Đề Án Khởi Nghiệp AI Landing Page - HaUI Startup Mindset 2026",
  description: "Bản thuyết trình đề án PromptToSite - Nền tảng AI tạo và xuất bản Landing Page bán hàng tự động chuẩn CRO trong 30 giây.",
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

