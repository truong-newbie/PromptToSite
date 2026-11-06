import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập | PromptToSite - AI Landing Page Builder",
  description: "Đăng nhập hoặc dùng thử ngay để quản lý các dự án Landing Page và khách hàng tiềm năng CRM.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

