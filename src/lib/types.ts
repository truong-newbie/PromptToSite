export type IndustryType = "spa" | "coffee" | "course" | "fashion" | "general";

export type LeadStatus = "new" | "contacted" | "closed";

export type PlanTier = "free" | "starter" | "pro" | "agency";

export interface ProjectData {
  id: string;
  userId?: string;
  name: string;
  industry: IndustryType;
  primaryColor: string;
  secondaryColor: string;
  subdomain?: string;
  customDomain?: string;
  domainVerifyCode?: string;
  domainStatus?: "pending" | "verified" | "active";
  isPublished?: boolean;
  publishedSlug?: string;
  leadCount?: number;
  version?: number;
  updatedAt: string;
}

export interface LeadSubmission {
  id: string;
  projectId?: string;
  projectName?: string;
  siteSlug?: string;
  fullName: string;
  phone: string;
  note?: string;
  status?: LeadStatus;
  consentAt?: string;
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

export interface ProjectVersionItem {
  id: string;
  projectId: string;
  versionNumber: number;
  source: "studio" | "mcp" | "ai";
  promptHistory?: string;
  createdAt: string;
}

export interface ApiTokenItem {
  id: string;
  name: string;
  tokenHint: string;
  lastUsedAt?: string | null;
  createdAt: string;
  revokedAt?: string | null;
}
