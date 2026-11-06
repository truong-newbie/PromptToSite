export type IndustryType = "spa" | "coffee" | "course" | "fashion" | "general";

export interface ProjectData {
  id: string;
  name: string;
  industry: IndustryType;
  primaryColor: string;
  secondaryColor: string;
  html: string;
  updatedAt: string;
}

export interface LeadSubmission {
  id: string;
  projectId?: string;
  projectName?: string;
  fullName: string;
  phone: string;
  note?: string;
  submittedAt: string;
}

export interface GenerationRequest {
  prompt: string;
  industry?: IndustryType;
  primaryColor?: string;
  brandName?: string;
  discount?: string;
}

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

