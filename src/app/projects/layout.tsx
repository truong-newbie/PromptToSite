import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Dự án | PromptToSite - AI Landing Page Builder",
  description: "Danh sách và quản lý các dự án Landing Page của bạn trên PromptToSite.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

