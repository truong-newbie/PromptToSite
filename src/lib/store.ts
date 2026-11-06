import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { LeadSubmission, IndustryType, LeadStatus, PlanTier, ProjectVersionItem, ApiTokenItem } from "./types";
import { TemplateBlockConfig, INDUSTRY_PRESETS, generateLandingPageHtml, normalizeConfig } from "./blocks/template-engine";
import { getPrisma } from "./db";

/**
 * Tầng lưu trữ hợp nhất cho PromptToSite:
 * - Khi có DATABASE_URL (PostgreSQL + Prisma): đọc/ghi trực tiếp vào cơ sở dữ liệu quan hệ.
 * - Khi chưa cấu hình DATABASE_URL (chạy cục bộ/demo): tự động lưu vào ./data/*.json kèm bộ đệm RAM.
 */
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const SITE_FILE = path.join(DATA_DIR, "site.json");
const SITES_DIR = path.join(DATA_DIR, "sites");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const VERSIONS_FILE = path.join(DATA_DIR, "versions.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const TOKENS_FILE = path.join(DATA_DIR, "tokens.json");
const INTEGRATIONS_FILE = path.join(DATA_DIR, "integrations.json");
const EVENTS_FILE = path.join(DATA_DIR, "events.json");
const FLAGS_FILE = path.join(DATA_DIR, "moderation_flags.json");
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, "subscriptions.json");
const ORDERS_FILE = path.join(DATA_DIR, "billing_orders.json");

export interface SiteState {
  projectId?: string;
  userId?: string;
  name?: string;
  config: TemplateBlockConfig;
  industry: IndustryType;
  version: number;
  source: "studio" | "mcp" | "ai";
  customDomain?: string;
  domainVerifyCode?: string;
  domainStatus?: "pending" | "verified" | "active";
  publishedSlug?: string;
  updatedAt: string;
}

export interface PublishedSite {
  slug: string;
  projectId?: string;
  userId?: string;
  html: string;
  brandName: string;
  telegram?: { botToken: string; chatId: string };
  createdAt: string;
}

export interface StoredUser {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface StoredProject extends SiteState {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
}

export interface StoredVersion extends ProjectVersionItem {
  configSnapshot: TemplateBlockConfig;
  htmlSnapshot: string;
}

export interface StoredToken extends ApiTokenItem {
  userId: string;
  tokenHash: string;
}

export interface StoredIntegration {
  id: string;
  projectId: string;
  type: "telegram" | "email" | "webhook";
  config: Record<string, any>;
  isActive: boolean;
  updatedAt: string;
}

export interface StoredEvent {
  id: string;
  siteSlug: string;
  projectId?: string;
  type: "pageview" | "cta_click";
  visitorHash: string;
  label?: string;
  createdAt: string;
}

export interface StoredModerationFlag {
  id: string;
  projectId?: string;
  userId?: string;
  reason: string;
  matched?: string;
  snapshot: Record<string, any>;
  createdAt: string;
}

export interface StoredSubscription {
  id: string;
  userId: string;
  planTier: PlanTier;
  aiCreditsRemaining: number;
  aiUsedThisMonth: number;
  leadsThisMonth: number;
  maxActiveDomains: number;
  currentPeriodEnd?: string;
  status: "active" | "past_due" | "canceled";
  updatedAt: string;
}

export interface StoredBillingOrder {
  id: string;
  orderCode: number;
  userId: string;
  planTier: PlanTier;
  amount: number;
  status: "pending" | "paid" | "canceled";
  createdAt: string;
  paidAt?: string;
}

export const PLAN_LIMITS: Record<
  PlanTier,
  { name: string; priceVnd: number; maxProjects: number; maxLeadsPerMonth: number; maxAiPerMonth: number; maxDomains: number; hideBadge: boolean }
> = {
  free: { name: "Free Trial", priceVnd: 0, maxProjects: 1, maxLeadsPerMonth: 50, maxAiPerMonth: 20, maxDomains: 0, hideBadge: false },
  starter: { name: "Starter", priceVnd: 199000, maxProjects: 3, maxLeadsPerMonth: 200, maxAiPerMonth: 100, maxDomains: 1, hideBadge: false },
  pro: { name: "Pro Marketer", priceVnd: 499000, maxProjects: 10, maxLeadsPerMonth: 999999, maxAiPerMonth: 300, maxDomains: 999, hideBadge: true },
  agency: { name: "Agency / Business", priceVnd: 1299000, maxProjects: 9999, maxLeadsPerMonth: 999999, maxAiPerMonth: 999999, maxDomains: 9999, hideBadge: true },
};

const g = globalThis as unknown as {
  __p2s?: {
    leads: LeadSubmission[] | null;
    site: SiteState | null;
    published: Map<string, PublishedSite>;
    projects: StoredProject[] | null;
    versions: StoredVersion[] | null;
    users: StoredUser[] | null;
    tokens: StoredToken[] | null;
    integrations: StoredIntegration[] | null;
    events: StoredEvent[] | null;
    flags: StoredModerationFlag[] | null;
    subscriptions: StoredSubscription[] | null;
    orders: StoredBillingOrder[] | null;
    lock: Promise<unknown>;
  };
};

const mem = (g.__p2s ??= {
  leads: null,
  site: null,
  published: new Map(),
  projects: null,
  versions: null,
  users: null,
  tokens: null,
  integrations: null,
  events: null,
  flags: null,
  subscriptions: null,
  orders: null,
  lock: Promise.resolve(),
});

function serialize<T>(fn: () => Promise<T>): Promise<T> {
  const run = mem.lock.then(fn, fn);
  mem.lock = run.catch(() => undefined);
  return run;
}

async function readJson<T>(file: string): Promise<T | null> {
  try {
    return JSON.parse(await fs.readFile(file, "utf-8")) as T;
  } catch {
    return null;
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  try {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Không ghi được file, chỉ giữ trong bộ nhớ:", file, err);
  }
}

async function loadList<T>(key: keyof typeof mem, file: string): Promise<T[]> {
  const cur = mem[key] as T[] | null;
  if (cur) return cur;
  const stored = await readJson<T[]>(file);
  const arr = Array.isArray(stored) ? stored : [];
  (mem[key] as unknown) = arr;
  return arr;
}

// ----------------------------- Người dùng (Users - A2) -----------------------------
export async function getOrCreateUser(email: string, fullName?: string): Promise<StoredUser> {
  const cleanEmail = email.trim().toLowerCase();
  const name = (fullName || cleanEmail.split("@")[0] || "Người dùng").trim();
  const prisma = getPrisma();
  if (prisma) {
    const u = await prisma.user.upsert({
      where: { email: cleanEmail },
      update: fullName ? { fullName: name } : {},
      create: { email: cleanEmail, fullName: name, role: "user" },
    });
    return { id: u.id, email: u.email, fullName: u.fullName || name, role: (u.role as "user" | "admin") || "user", createdAt: u.createdAt.toISOString() };
  }
  return serialize(async () => {
    const users = await loadList<StoredUser>("users", USERS_FILE);
    let found = users.find((u) => u.email === cleanEmail);
    if (!found) {
      found = {
        id: `usr_${crypto.randomBytes(6).toString("hex")}`,
        email: cleanEmail,
        fullName: name,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      users.push(found);
      await writeJson(USERS_FILE, users);
    } else if (fullName && found.fullName !== name) {
      found.fullName = name;
      await writeJson(USERS_FILE, users);
    }
    return found;
  });
}

export async function getUserById(userId: string): Promise<StoredUser | null> {
  if (!userId) return null;
  const prisma = getPrisma();
  if (prisma) {
    const u = await prisma.user.findUnique({ where: { id: userId } });
    if (!u) return null;
    return { id: u.id, email: u.email, fullName: u.fullName || u.email, role: (u.role as "user" | "admin") || "user", createdAt: u.createdAt.toISOString() };
  }
  const users = await loadList<StoredUser>("users", USERS_FILE);
  return users.find((u) => u.id === userId) || null;
}

// ----------------------------- Gói cước (Subscriptions - D2) -----------------------------
export async function getUserSubscription(userId: string): Promise<StoredSubscription> {
  const prisma = getPrisma();
  if (prisma) {
    const sub = await prisma.subscription.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        planTier: "free",
        aiCreditsRemaining: PLAN_LIMITS.free.maxAiPerMonth,
        maxActiveDomains: PLAN_LIMITS.free.maxDomains,
        status: "active",
      },
    });
    return {
      id: sub.id,
      userId: sub.userId,
      planTier: (sub.planTier as PlanTier) || "free",
      aiCreditsRemaining: sub.aiCreditsRemaining,
      aiUsedThisMonth: sub.aiUsedThisMonth,
      leadsThisMonth: sub.leadsThisMonth,
      maxActiveDomains: sub.maxActiveDomains,
      currentPeriodEnd: sub.currentPeriodEnd?.toISOString(),
      status: (sub.status as StoredSubscription["status"]) || "active",
      updatedAt: sub.updatedAt.toISOString(),
    };
  }
  return serialize(async () => {
    const subs = await loadList<StoredSubscription>("subscriptions", SUBSCRIPTIONS_FILE);
    let sub = subs.find((s) => s.userId === userId);
    if (!sub) {
      sub = {
        id: `sub_${crypto.randomBytes(6).toString("hex")}`,
        userId,
        planTier: "free",
        aiCreditsRemaining: PLAN_LIMITS.free.maxAiPerMonth,
        aiUsedThisMonth: 0,
        leadsThisMonth: 0,
        maxActiveDomains: PLAN_LIMITS.free.maxDomains,
        status: "active",
        updatedAt: new Date().toISOString(),
      };
      subs.push(sub);
      await writeJson(SUBSCRIPTIONS_FILE, subs);
    }
    return sub;
  });
}

export async function updateUserPlan(userId: string, planTier: PlanTier): Promise<StoredSubscription> {
  const limits = PLAN_LIMITS[planTier] || PLAN_LIMITS.free;
  const periodEnd = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();
  const prisma = getPrisma();
  if (prisma) {
    const sub = await prisma.subscription.upsert({
      where: { userId },
      update: {
        planTier,
        aiCreditsRemaining: limits.maxAiPerMonth,
        maxActiveDomains: limits.maxDomains,
        currentPeriodEnd: new Date(periodEnd),
        status: "active",
      },
      create: {
        userId,
        planTier,
        aiCreditsRemaining: limits.maxAiPerMonth,
        maxActiveDomains: limits.maxDomains,
        currentPeriodEnd: new Date(periodEnd),
        status: "active",
      },
    });
    return {
      id: sub.id,
      userId: sub.userId,
      planTier: sub.planTier as PlanTier,
      aiCreditsRemaining: sub.aiCreditsRemaining,
      aiUsedThisMonth: sub.aiUsedThisMonth,
      leadsThisMonth: sub.leadsThisMonth,
      maxActiveDomains: sub.maxActiveDomains,
      currentPeriodEnd: sub.currentPeriodEnd?.toISOString(),
      status: "active",
      updatedAt: sub.updatedAt.toISOString(),
    };
  }
  return serialize(async () => {
    const subs = await loadList<StoredSubscription>("subscriptions", SUBSCRIPTIONS_FILE);
    let sub = subs.find((s) => s.userId === userId);
    if (!sub) {
      sub = await getUserSubscription(userId);
    }
    sub.planTier = planTier;
    sub.aiCreditsRemaining = limits.maxAiPerMonth;
    sub.maxActiveDomains = limits.maxDomains;
    sub.currentPeriodEnd = periodEnd;
    sub.status = "active";
    sub.updatedAt = new Date().toISOString();
    await writeJson(SUBSCRIPTIONS_FILE, subs);
    return sub;
  });
}

export async function incrementAiUsage(userId: string): Promise<void> {
  if (!userId) return;
  const prisma = getPrisma();
  if (prisma) {
    await prisma.subscription.updateMany({
      where: { userId },
      data: { aiUsedThisMonth: { increment: 1 }, aiCreditsRemaining: { decrement: 1 } },
    });
    return;
  }
  return serialize(async () => {
    const subs = await loadList<StoredSubscription>("subscriptions", SUBSCRIPTIONS_FILE);
    const sub = subs.find((s) => s.userId === userId);
    if (sub) {
      sub.aiUsedThisMonth += 1;
      sub.aiCreditsRemaining = Math.max(0, sub.aiCreditsRemaining - 1);
      sub.updatedAt = new Date().toISOString();
      await writeJson(SUBSCRIPTIONS_FILE, subs);
    }
  });
}

// ----------------------------- Dự án (Projects - A1/A2/B3) -----------------------------
export async function listProjects(userId?: string): Promise<StoredProject[]> {
  const prisma = getPrisma();
  if (prisma) {
    const rows = await prisma.project.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { updatedAt: "desc" },
    });
    return rows.map((r) => ({
      id: r.id,
      projectId: r.id,
      userId: r.userId || "demo",
      name: r.name,
      industry: (r.industry as IndustryType) || "spa",
      config: normalizeConfig(r.themeConfig, INDUSTRY_PRESETS[(r.industry as IndustryType) || "spa"] || INDUSTRY_PRESETS.spa),
      version: r.version,
      source: (r.source as SiteState["source"]) || "studio",
      customDomain: r.customDomain || undefined,
      domainVerifyCode: r.domainVerifyCode || undefined,
      domainStatus: (r.domainStatus as SiteState["domainStatus"]) || "pending",
      publishedSlug: r.subdomain || undefined,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));
  }

  const projects = await loadList<StoredProject>("projects", PROJECTS_FILE);
  if (projects.length === 0) {
    // Khởi tạo dự án mặc định từ site.json (nếu có) hoặc preset spa
    const legacy = await readJson<SiteState>(SITE_FILE);
    const defaultCfg = legacy?.config || INDUSTRY_PRESETS.spa;
    const defaultInd = legacy?.industry || "spa";
    const initial: StoredProject = {
      id: "proj_default",
      projectId: "proj_default",
      userId: userId || "usr_demo",
      name: defaultCfg.brandName || "Viện Thẩm Mỹ Ban Mai",
      industry: defaultInd,
      config: defaultCfg,
      version: legacy?.version || 1,
      source: legacy?.source || "studio",
      createdAt: legacy?.updatedAt || new Date().toISOString(),
      updatedAt: legacy?.updatedAt || new Date().toISOString(),
    };
    projects.push(initial);
    await writeJson(PROJECTS_FILE, projects);
  }
  if (!userId) return projects;
  const userProjects = projects.filter((p) => p.userId === userId || p.id === "proj_default");
  return userProjects;
}

export async function getProjectById(projectId: string, userId?: string): Promise<StoredProject | null> {
  const prisma = getPrisma();
  if (prisma) {
    const r = await prisma.project.findUnique({ where: { id: projectId } });
    if (!r) return null;
    if (userId && r.userId && r.userId !== userId) return null;
    return {
      id: r.id,
      projectId: r.id,
      userId: r.userId || "demo",
      name: r.name,
      industry: (r.industry as IndustryType) || "spa",
      config: normalizeConfig(r.themeConfig, INDUSTRY_PRESETS[(r.industry as IndustryType) || "spa"] || INDUSTRY_PRESETS.spa),
      version: r.version,
      source: (r.source as SiteState["source"]) || "studio",
      customDomain: r.customDomain || undefined,
      domainVerifyCode: r.domainVerifyCode || undefined,
      domainStatus: (r.domainStatus as SiteState["domainStatus"]) || "pending",
      publishedSlug: r.subdomain || undefined,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    };
  }
  const all = await listProjects();
  const p = all.find((x) => x.id === projectId);
  if (!p) return null;
  return p;
}

export async function ensureDefaultProject(userId: string): Promise<StoredProject> {
  const existing = await listProjects(userId);
  if (existing.length > 0) return existing[0];
  return createProject({
    userId,
    name: INDUSTRY_PRESETS.spa.brandName,
    industry: "spa",
    config: INDUSTRY_PRESETS.spa,
  });
}

export async function createProject(input: {
  userId: string;
  name: string;
  industry: IndustryType;
  config?: TemplateBlockConfig;
}): Promise<StoredProject> {
  const cfg = input.config || {
    ...INDUSTRY_PRESETS[input.industry || "spa"],
    brandName: input.name.trim() || INDUSTRY_PRESETS[input.industry || "spa"].brandName,
  };
  const now = new Date().toISOString();
  const prisma = getPrisma();
  if (prisma) {
    const created = await prisma.project.create({
      data: {
        userId: input.userId,
        name: input.name.trim() || cfg.brandName,
        industry: input.industry,
        themeConfig: cfg as unknown as Record<string, any>,
        version: 1,
        source: "studio",
        domainVerifyCode: `p2s-verify-${crypto.randomBytes(6).toString("hex")}`,
      },
    });
    const proj: StoredProject = {
      id: created.id,
      projectId: created.id,
      userId: created.userId || input.userId,
      name: created.name,
      industry: input.industry,
      config: cfg,
      version: 1,
      source: "studio",
      domainVerifyCode: created.domainVerifyCode || undefined,
      domainStatus: "pending",
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
    };
    await recordProjectVersion(proj, "Khởi tạo dự án");
    return proj;
  }

  return serialize(async () => {
    const projects = await loadList<StoredProject>("projects", PROJECTS_FILE);
    const id = `proj_${crypto.randomBytes(5).toString("hex")}`;
    const proj: StoredProject = {
      id,
      projectId: id,
      userId: input.userId,
      name: input.name.trim() || cfg.brandName,
      industry: input.industry,
      config: cfg,
      version: 1,
      source: "studio",
      domainVerifyCode: `p2s-verify-${crypto.randomBytes(6).toString("hex")}`,
      domainStatus: "pending",
      createdAt: now,
      updatedAt: now,
    };
    projects.unshift(proj);
    await writeJson(PROJECTS_FILE, projects);
    await recordProjectVersion(proj, "Khởi tạo dự án");
    return proj;
  });
}

export async function renameProject(projectId: string, name: string, userId?: string): Promise<StoredProject | null> {
  const cleanName = name.trim().slice(0, 80);
  if (!cleanName) return null;
  const prisma = getPrisma();
  if (prisma) {
    const cur = await getProjectById(projectId, userId);
    if (!cur) return null;
    const nextCfg = { ...cur.config, brandName: cleanName };
    const updated = await prisma.project.update({
      where: { id: projectId },
      data: { name: cleanName, themeConfig: nextCfg as unknown as Record<string, any> },
    });
    return { ...cur, name: updated.name, config: nextCfg, updatedAt: updated.updatedAt.toISOString() };
  }
  return serialize(async () => {
    const projects = await loadList<StoredProject>("projects", PROJECTS_FILE);
    const idx = projects.findIndex((p) => p.id === projectId);
    if (idx === -1) return null;
    projects[idx].name = cleanName;
    projects[idx].config = { ...projects[idx].config, brandName: cleanName };
    projects[idx].updatedAt = new Date().toISOString();
    await writeJson(PROJECTS_FILE, projects);
    return projects[idx];
  });
}

export async function deleteProject(projectId: string, userId?: string): Promise<boolean> {
  const prisma = getPrisma();
  if (prisma) {
    const cur = await getProjectById(projectId, userId);
    if (!cur) return false;
    await prisma.project.delete({ where: { id: projectId } });
    return true;
  }
  return serialize(async () => {
    const projects = await loadList<StoredProject>("projects", PROJECTS_FILE);
    const idx = projects.findIndex((p) => p.id === projectId);
    if (idx === -1) return false;
    projects.splice(idx, 1);
    await writeJson(PROJECTS_FILE, projects);
    return true;
  });
}

// ----------------------------- Lịch sử phiên bản (Versions - B1) -----------------------------
async function recordProjectVersion(project: StoredProject, promptHistory?: string): Promise<void> {
  const html = generateLandingPageHtml(project.config);
  const now = new Date();
  const prisma = getPrisma();
  if (prisma) {
    const latest = await prisma.projectVersion.findFirst({
      where: { projectId: project.id },
      orderBy: { versionNumber: "desc" },
    });
    // Gộp các lần sửa nhanh liên tiếp trong 10 giây cùng nguồn
    if (
      latest &&
      latest.source === project.source &&
      now.getTime() - latest.createdAt.getTime() < 10_000 &&
      !promptHistory
    ) {
      await prisma.projectVersion.update({
        where: { id: latest.id },
        data: {
          configSnapshot: project.config as unknown as Record<string, any>,
          htmlSnapshot: html,
          createdAt: now,
        },
      });
      return;
    }
    const nextVer = (latest?.versionNumber ?? 0) + 1;
    await prisma.projectVersion.create({
      data: {
        projectId: project.id,
        versionNumber: nextVer,
        source: project.source,
        promptHistory: promptHistory || null,
        configSnapshot: project.config as unknown as Record<string, any>,
        htmlSnapshot: html,
      },
    });
    // Giữ tối đa 50 bản gần nhất
    const all = await prisma.projectVersion.findMany({
      where: { projectId: project.id },
      orderBy: { versionNumber: "desc" },
      skip: 50,
      select: { id: true },
    });
    if (all.length > 0) {
      await prisma.projectVersion.deleteMany({ where: { id: { in: all.map((a) => a.id) } } });
    }
    return;
  }

  const versions = await loadList<StoredVersion>("versions", VERSIONS_FILE);
  const projVers = versions.filter((v) => v.projectId === project.id).sort((a, b) => b.versionNumber - a.versionNumber);
  const latest = projVers[0];
  if (
    latest &&
    latest.source === project.source &&
    now.getTime() - new Date(latest.createdAt).getTime() < 10_000 &&
    !promptHistory
  ) {
    latest.configSnapshot = project.config;
    latest.htmlSnapshot = html;
    latest.createdAt = now.toISOString();
    await writeJson(VERSIONS_FILE, versions);
    return;
  }
  const nextVer = (latest?.versionNumber ?? 0) + 1;
  versions.unshift({
    id: `ver_${crypto.randomBytes(5).toString("hex")}`,
    projectId: project.id,
    versionNumber: nextVer,
    source: project.source,
    promptHistory,
    configSnapshot: project.config,
    htmlSnapshot: html,
    createdAt: now.toISOString(),
  });
  // Cắt quá 50 bản cho dự án này
  let count = 0;
  const trimmed = versions.filter((v) => {
    if (v.projectId !== project.id) return true;
    count += 1;
    return count <= 50;
  });
  mem.versions = trimmed;
  await writeJson(VERSIONS_FILE, trimmed);
}

export async function listProjectVersions(projectId: string): Promise<StoredVersion[]> {
  const prisma = getPrisma();
  if (prisma) {
    const rows = await prisma.projectVersion.findMany({
      where: { projectId },
      orderBy: { versionNumber: "desc" },
      take: 50,
    });
    return rows.map((r) => ({
      id: r.id,
      projectId: r.projectId,
      versionNumber: r.versionNumber,
      source: (r.source as StoredVersion["source"]) || "studio",
      promptHistory: r.promptHistory || undefined,
      configSnapshot: normalizeConfig(r.configSnapshot, INDUSTRY_PRESETS.spa),
      htmlSnapshot: r.htmlSnapshot,
      createdAt: r.createdAt.toISOString(),
    }));
  }
  const versions = await loadList<StoredVersion>("versions", VERSIONS_FILE);
  return versions.filter((v) => v.projectId === projectId).sort((a, b) => b.versionNumber - a.versionNumber);
}

export async function restoreProjectVersion(projectId: string, versionId: string, userId?: string): Promise<SiteState | null> {
  const versions = await listProjectVersions(projectId);
  const target = versions.find((v) => v.id === versionId);
  if (!target) return null;
  const proj = await getProjectById(projectId, userId);
  if (!proj) return null;
  return setSite(target.configSnapshot, proj.industry, "studio", {
    projectId,
    userId,
    promptHistory: `Khôi phục phiên bản #${target.versionNumber}`,
  });
}

// ----------------------------- Site hiện tại (tương thích ngược + đa dự án) -----------------------------
export async function getSite(projectId?: string, userId?: string): Promise<SiteState | null> {
  if (projectId) {
    const proj = await getProjectById(projectId, userId);
    if (proj) return proj;
  }
  const projects = await listProjects(userId);
  if (projects.length > 0) return projects[0];
  if (mem.site) return mem.site;
  mem.site = await readJson<SiteState>(SITE_FILE);
  return mem.site;
}

export function setSite(
  config: TemplateBlockConfig,
  industry: IndustryType,
  source: SiteState["source"],
  opts?: { projectId?: string; userId?: string; promptHistory?: string }
): Promise<SiteState> {
  return serialize(async () => {
    const prisma = getPrisma();
    if (prisma) {
      let target = opts?.projectId ? await getProjectById(opts.projectId, opts.userId) : (await listProjects(opts?.userId))[0];
      if (!target) {
        target = await createProject({
          userId: opts?.userId || "usr_demo",
          name: config.brandName || "Dự án mới",
          industry,
          config,
        });
      }
      const nextVersion = (target.version || 0) + 1;
      const updated = await prisma.project.update({
        where: { id: target.id },
        data: {
          name: config.brandName || target.name,
          industry,
          themeConfig: config as unknown as Record<string, any>,
          version: nextVersion,
          source,
        },
      });
      const proj: StoredProject = {
        ...target,
        name: updated.name,
        industry,
        config,
        version: nextVersion,
        source,
        updatedAt: updated.updatedAt.toISOString(),
      };
      await recordProjectVersion(proj, opts?.promptHistory);
      return proj;
    }

    const projects = await loadList<StoredProject>("projects", PROJECTS_FILE);
    let idx = opts?.projectId ? projects.findIndex((p) => p.id === opts.projectId) : 0;
    if (idx === -1 || projects.length === 0) {
      const created = await createProject({
        userId: opts?.userId || "usr_demo",
        name: config.brandName || "Dự án mới",
        industry,
        config,
      });
      mem.site = created;
      await writeJson(SITE_FILE, created);
      return created;
    }
    const prev = projects[idx];
    const next: StoredProject = {
      ...prev,
      name: config.brandName || prev.name,
      config,
      industry,
      source,
      version: (prev.version ?? 0) + 1,
      updatedAt: new Date().toISOString(),
    };
    projects[idx] = next;
    mem.site = next;
    await writeJson(PROJECTS_FILE, projects);
    await writeJson(SITE_FILE, next);
    await recordProjectVersion(next, opts?.promptHistory);
    return next;
  });
}

// ----------------------------- Leads CRM (A1/B3/C4) -----------------------------
export async function getLeads(opts?: { projectId?: string; userId?: string }): Promise<LeadSubmission[]> {
  const prisma = getPrisma();
  if (prisma) {
    const rows = await prisma.lead.findMany({
      where: opts?.projectId ? { projectId: opts.projectId } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => ({
      id: r.id,
      projectId: r.projectId || undefined,
      projectName: r.projectName || undefined,
      siteSlug: r.siteSlug || undefined,
      fullName: r.fullName,
      phone: r.phone,
      note: r.note || undefined,
      status: (r.status as LeadStatus) || "new",
      consentAt: r.consentAt?.toISOString(),
      submittedAt: r.submittedAt,
    }));
  }
  if (!mem.leads) {
    const stored = await readJson<LeadSubmission[]>(LEADS_FILE);
    mem.leads = Array.isArray(stored) ? stored : [];
  }
  let list = mem.leads;
  if (opts?.projectId && opts.projectId !== "all") {
    list = list.filter((l) => l.projectId === opts.projectId || !l.projectId);
  }
  return list;
}

export function addLead(
  input: Omit<LeadSubmission, "id" | "submittedAt"> & { ipAddress?: string; userAgent?: string }
): Promise<LeadSubmission> {
  return serialize(async () => {
    const submittedAt = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    const prisma = getPrisma();
    if (prisma) {
      const created = await prisma.lead.create({
        data: {
          projectId: input.projectId || null,
          projectName: input.projectName || null,
          siteSlug: input.siteSlug || null,
          fullName: input.fullName,
          phone: input.phone,
          note: input.note || null,
          status: input.status || "new",
          consentAt: input.consentAt ? new Date(input.consentAt) : new Date(),
          ipAddress: input.ipAddress || null,
          userAgent: input.userAgent || null,
          submittedAt,
          data: { fullName: input.fullName, phone: input.phone, note: input.note },
        },
      });
      return {
        id: created.id,
        projectId: created.projectId || undefined,
        projectName: created.projectName || undefined,
        siteSlug: created.siteSlug || undefined,
        fullName: created.fullName,
        phone: created.phone,
        note: created.note || undefined,
        status: (created.status as LeadStatus) || "new",
        consentAt: created.consentAt?.toISOString(),
        submittedAt: created.submittedAt,
      };
    }

    const leads = await getLeads();
    const lead: LeadSubmission = {
      id: `lead_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`,
      projectId: input.projectId,
      projectName: input.projectName,
      siteSlug: input.siteSlug,
      fullName: input.fullName,
      phone: input.phone,
      note: input.note,
      status: input.status || "new",
      consentAt: input.consentAt || new Date().toISOString(),
      submittedAt,
    };
    leads.unshift(lead);
    mem.leads = leads;
    await writeJson(LEADS_FILE, leads);
    return lead;
  });
}

export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<LeadSubmission | null> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const r = await prisma.lead.update({ where: { id: leadId }, data: { status } });
      return {
        id: r.id,
        projectId: r.projectId || undefined,
        projectName: r.projectName || undefined,
        fullName: r.fullName,
        phone: r.phone,
        note: r.note || undefined,
        status: r.status as LeadStatus,
        consentAt: r.consentAt?.toISOString(),
        submittedAt: r.submittedAt,
      };
    } catch {
      return null;
    }
  }
  return serialize(async () => {
    const leads = await getLeads();
    const found = leads.find((l) => l.id === leadId);
    if (!found) return null;
    found.status = status;
    await writeJson(LEADS_FILE, leads);
    return found;
  });
}

export async function deleteLeadById(leadId: string): Promise<boolean> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.lead.delete({ where: { id: leadId } });
      return true;
    } catch {
      return false;
    }
  }
  return serialize(async () => {
    const leads = await getLeads();
    const idx = leads.findIndex((l) => l.id === leadId);
    if (idx === -1) return false;
    leads.splice(idx, 1);
    mem.leads = leads;
    await writeJson(LEADS_FILE, leads);
    return true;
  });
}

// ----------------------------- Trang đã xuất bản (Published Sites) -----------------------------
const SLUG_RE = /^[a-f0-9]{8}$/;
export const newSlug = () => crypto.randomBytes(4).toString("hex");

export async function savePublished(site: PublishedSite): Promise<void> {
  const prisma = getPrisma();
  if (prisma) {
    await prisma.publishedSite.upsert({
      where: { slug: site.slug },
      update: { html: site.html, brandName: site.brandName, projectId: site.projectId || null },
      create: { slug: site.slug, html: site.html, brandName: site.brandName, projectId: site.projectId || null },
    });
    if (site.projectId) {
      await prisma.project.updateMany({
        where: { id: site.projectId },
        data: { isPublished: true, subdomain: site.slug, publishedHtmlUrl: `/s/${site.slug}` },
      });
    }
  }
  mem.published.set(site.slug, site);
  await writeJson(path.join(SITES_DIR, `${site.slug}.json`), site);
  if (site.projectId) {
    const projects = await loadList<StoredProject>("projects", PROJECTS_FILE);
    const p = projects.find((x) => x.id === site.projectId);
    if (p) {
      p.publishedSlug = site.slug;
      await writeJson(PROJECTS_FILE, projects);
    }
  }
}

export async function getPublished(slug: string): Promise<PublishedSite | null> {
  if (!SLUG_RE.test(slug)) return null;
  const cached = mem.published.get(slug);
  if (cached) return cached;
  const prisma = getPrisma();
  if (prisma) {
    const r = await prisma.publishedSite.findUnique({ where: { slug } });
    if (r) {
      const pub: PublishedSite = {
        slug: r.slug,
        projectId: r.projectId || undefined,
        html: r.html,
        brandName: r.brandName,
        createdAt: r.createdAt.toISOString(),
      };
      mem.published.set(slug, pub);
      return pub;
    }
  }
  const stored = await readJson<PublishedSite>(path.join(SITES_DIR, `${slug}.json`));
  if (stored) mem.published.set(slug, stored);
  return stored;
}

export async function getPublishedByCustomDomain(domain: string): Promise<PublishedSite | null> {
  const clean = domain.trim().toLowerCase().replace(/:\d+$/, "");
  const projects = await listProjects();
  const matched = projects.find((p) => p.customDomain?.toLowerCase() === clean && p.publishedSlug);
  if (matched?.publishedSlug) {
    return getPublished(matched.publishedSlug);
  }
  return null;
}

// ----------------------------- Tích hợp Thông báo (Integrations - A4/C3) -----------------------------
export async function getProjectIntegration(
  projectId: string,
  type: "telegram" | "email" | "webhook"
): Promise<StoredIntegration | null> {
  const prisma = getPrisma();
  if (prisma) {
    const r = await prisma.integration.findUnique({
      where: { projectId_type: { projectId, type } },
    });
    if (!r) return null;
    return {
      id: r.id,
      projectId: r.projectId,
      type: r.type as StoredIntegration["type"],
      config: (r.config as Record<string, any>) || {},
      isActive: r.isActive,
      updatedAt: r.updatedAt.toISOString(),
    };
  }
  const list = await loadList<StoredIntegration>("integrations", INTEGRATIONS_FILE);
  return list.find((i) => i.projectId === projectId && i.type === type) || null;
}

export async function getProjectIntegrations(projectId: string): Promise<StoredIntegration[]> {
  const prisma = getPrisma();
  if (prisma) {
    const rows = await prisma.integration.findMany({ where: { projectId } });
    return rows.map((r) => ({
      id: r.id,
      projectId: r.projectId,
      type: r.type as StoredIntegration["type"],
      config: (r.config as Record<string, any>) || {},
      isActive: r.isActive,
      updatedAt: r.updatedAt.toISOString(),
    }));
  }
  const list = await loadList<StoredIntegration>("integrations", INTEGRATIONS_FILE);
  return list.filter((i) => i.projectId === projectId);
}

export async function saveProjectIntegration(
  projectId: string,
  type: "telegram" | "email" | "webhook",
  config: Record<string, any>,
  isActive = true
): Promise<StoredIntegration> {
  const prisma = getPrisma();
  if (prisma) {
    const r = await prisma.integration.upsert({
      where: { projectId_type: { projectId, type } },
      update: { config, isActive },
      create: { projectId, type, config, isActive },
    });
    return {
      id: r.id,
      projectId: r.projectId,
      type: r.type as StoredIntegration["type"],
      config: (r.config as Record<string, any>) || {},
      isActive: r.isActive,
      updatedAt: r.updatedAt.toISOString(),
    };
  }
  return serialize(async () => {
    const list = await loadList<StoredIntegration>("integrations", INTEGRATIONS_FILE);
    let item = list.find((i) => i.projectId === projectId && i.type === type);
    if (!item) {
      item = {
        id: `int_${crypto.randomBytes(5).toString("hex")}`,
        projectId,
        type,
        config,
        isActive,
        updatedAt: new Date().toISOString(),
      };
      list.push(item);
    } else {
      item.config = config;
      item.isActive = isActive;
      item.updatedAt = new Date().toISOString();
    }
    await writeJson(INTEGRATIONS_FILE, list);
    return item;
  });
}

// ----------------------------- API Tokens cho MCP (A3) -----------------------------
export function hashApiToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

export async function listApiTokens(userId: string): Promise<ApiTokenItem[]> {
  const prisma = getPrisma();
  if (prisma) {
    const rows = await prisma.apiToken.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      tokenHint: r.tokenHint,
      lastUsedAt: r.lastUsedAt?.toISOString() || null,
      createdAt: r.createdAt.toISOString(),
      revokedAt: r.revokedAt?.toISOString() || null,
    }));
  }
  const tokens = await loadList<StoredToken>("tokens", TOKENS_FILE);
  return tokens
    .filter((t) => t.userId === userId)
    .map(({ tokenHash: _h, userId: _u, ...rest }) => rest);
}

export async function createApiToken(userId: string, name: string): Promise<{ token: string; item: ApiTokenItem }> {
  const raw = `p2s_${crypto.randomBytes(16).toString("hex")}`;
  const tokenHash = hashApiToken(raw);
  const tokenHint = `${raw.slice(0, 8)}…${raw.slice(-4)}`;
  const cleanName = name.trim().slice(0, 60) || "Claude Desktop Token";

  const prisma = getPrisma();
  if (prisma) {
    const created = await prisma.apiToken.create({
      data: { userId, name: cleanName, tokenHash, tokenHint },
    });
    return {
      token: raw,
      item: {
        id: created.id,
        name: created.name,
        tokenHint: created.tokenHint,
        lastUsedAt: null,
        createdAt: created.createdAt.toISOString(),
        revokedAt: null,
      },
    };
  }
  return serialize(async () => {
    const tokens = await loadList<StoredToken>("tokens", TOKENS_FILE);
    const item: StoredToken = {
      id: `tok_${crypto.randomBytes(5).toString("hex")}`,
      userId,
      name: cleanName,
      tokenHash,
      tokenHint,
      lastUsedAt: null,
      createdAt: new Date().toISOString(),
      revokedAt: null,
    };
    tokens.unshift(item);
    await writeJson(TOKENS_FILE, tokens);
    const { tokenHash: _h, userId: _u, ...pub } = item;
    return { token: raw, item: pub };
  });
}

export async function revokeApiToken(tokenId: string, userId: string): Promise<boolean> {
  const now = new Date();
  const prisma = getPrisma();
  if (prisma) {
    const res = await prisma.apiToken.updateMany({
      where: { id: tokenId, userId },
      data: { revokedAt: now },
    });
    return res.count > 0;
  }
  return serialize(async () => {
    const tokens = await loadList<StoredToken>("tokens", TOKENS_FILE);
    const found = tokens.find((t) => t.id === tokenId && t.userId === userId);
    if (!found) return false;
    found.revokedAt = now.toISOString();
    await writeJson(TOKENS_FILE, tokens);
    return true;
  });
}

export async function verifyApiToken(rawToken: string): Promise<{ userId: string; tokenId: string } | null> {
  if (!rawToken || !rawToken.startsWith("p2s_")) return null;
  const tokenHash = hashApiToken(rawToken.trim());
  const prisma = getPrisma();
  if (prisma) {
    const found = await prisma.apiToken.findUnique({ where: { tokenHash } });
    if (!found || found.revokedAt) return null;
    await prisma.apiToken.update({ where: { id: found.id }, data: { lastUsedAt: new Date() } }).catch(() => undefined);
    return { userId: found.userId, tokenId: found.id };
  }
  const tokens = await loadList<StoredToken>("tokens", TOKENS_FILE);
  const found = tokens.find((t) => t.tokenHash === tokenHash && !t.revokedAt);
  if (!found) return null;
  found.lastUsedAt = new Date().toISOString();
  await writeJson(TOKENS_FILE, tokens).catch(() => undefined);
  return { userId: found.userId, tokenId: found.id };
}

// ----------------------------- Thống kê sự kiện (Analytics - C2) -----------------------------
export async function recordAnalyticsEvent(input: {
  siteSlug: string;
  projectId?: string;
  type: "pageview" | "cta_click";
  visitorHash: string;
  label?: string;
}): Promise<void> {
  const prisma = getPrisma();
  if (prisma) {
    await prisma.analyticsEvent
      .create({
        data: {
          siteSlug: input.siteSlug,
          projectId: input.projectId || null,
          type: input.type,
          visitorHash: input.visitorHash,
          label: input.label || null,
        },
      })
      .catch(() => undefined);
    return;
  }
  return serialize(async () => {
    const events = await loadList<StoredEvent>("events", EVENTS_FILE);
    events.push({
      id: `evt_${crypto.randomBytes(5).toString("hex")}`,
      siteSlug: input.siteSlug,
      projectId: input.projectId,
      type: input.type,
      visitorHash: input.visitorHash,
      label: input.label,
      createdAt: new Date().toISOString(),
    });
    if (events.length > 5000) events.splice(0, events.length - 5000);
    await writeJson(EVENTS_FILE, events);
  });
}

export async function getAnalyticsSummary(projectId?: string, siteSlug?: string) {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);

  let events: StoredEvent[] = [];
  const prisma = getPrisma();
  if (prisma) {
    const rows = await prisma.analyticsEvent.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        ...(siteSlug ? { siteSlug } : projectId ? { projectId } : {}),
      },
    });
    events = rows.map((r) => ({
      id: r.id,
      siteSlug: r.siteSlug,
      projectId: r.projectId || undefined,
      type: r.type as StoredEvent["type"],
      visitorHash: r.visitorHash,
      label: r.label || undefined,
      createdAt: r.createdAt.toISOString(),
    }));
  } else {
    const all = await loadList<StoredEvent>("events", EVENTS_FILE);
    events = all.filter((e) => {
      if (new Date(e.createdAt) < sevenDaysAgo) return false;
      if (siteSlug && e.siteSlug !== siteSlug) return false;
      if (projectId && e.projectId && e.projectId !== projectId) return false;
      return true;
    });
  }

  const leads = await getLeads(projectId ? { projectId } : undefined);
  const daily: { date: string; views: number; clicks: number; leads: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 3600 * 1000);
    const key = d.toISOString().slice(0, 10);
    const label = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
    const dayEvents = events.filter((e) => e.createdAt.slice(0, 10) === key);
    const dayLeads = leads.filter((l) => (l.consentAt ? l.consentAt.slice(0, 10) === key : false));
    daily.push({
      date: label,
      views: dayEvents.filter((e) => e.type === "pageview").length,
      clicks: dayEvents.filter((e) => e.type === "cta_click").length,
      leads: dayLeads.length,
    });
  }

  const totalViews = events.filter((e) => e.type === "pageview").length;
  const totalClicks = events.filter((e) => e.type === "cta_click").length;
  const totalLeads = leads.length;
  const conversionRate = totalViews > 0 ? Number(((totalLeads / totalViews) * 100).toFixed(1)) : 0;

  return {
    totalViews,
    totalClicks,
    totalLeads,
    conversionRate,
    daily,
  };
}

// ----------------------------- Kiểm duyệt nội dung (Moderation Flags - C1) -----------------------------
export async function logModerationFlag(input: {
  projectId?: string;
  userId?: string;
  reason: string;
  matched?: string;
  snapshot: Record<string, any>;
}): Promise<void> {
  const prisma = getPrisma();
  if (prisma) {
    await prisma.moderationFlag
      .create({
        data: {
          projectId: input.projectId || null,
          userId: input.userId || null,
          reason: input.reason,
          matched: input.matched || null,
          snapshot: input.snapshot,
        },
      })
      .catch(() => undefined);
    return;
  }
  return serialize(async () => {
    const flags = await loadList<StoredModerationFlag>("flags", FLAGS_FILE);
    flags.unshift({
      id: `flg_${crypto.randomBytes(5).toString("hex")}`,
      projectId: input.projectId,
      userId: input.userId,
      reason: input.reason,
      matched: input.matched,
      snapshot: input.snapshot,
      createdAt: new Date().toISOString(),
    });
    await writeJson(FLAGS_FILE, flags);
  });
}

// ----------------------------- Tên miền riêng (Custom Domain - D1) -----------------------------
export async function updateProjectCustomDomain(
  projectId: string,
  customDomain: string,
  domainStatus: "pending" | "verified" | "active"
): Promise<StoredProject | null> {
  const clean = customDomain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const prisma = getPrisma();
  if (prisma) {
    const cur = await getProjectById(projectId);
    if (!cur) return null;
    await prisma.project.update({
      where: { id: projectId },
      data: { customDomain: clean || null, domainStatus },
    });
    return { ...cur, customDomain: clean || undefined, domainStatus };
  }
  return serialize(async () => {
    const projects = await loadList<StoredProject>("projects", PROJECTS_FILE);
    const p = projects.find((x) => x.id === projectId);
    if (!p) return null;
    p.customDomain = clean || undefined;
    p.domainStatus = domainStatus;
    p.updatedAt = new Date().toISOString();
    await writeJson(PROJECTS_FILE, projects);
    return p;
  });
}

// ----------------------------- Đơn hàng thanh toán (PayOS - D3) -----------------------------
export async function createBillingOrder(userId: string, planTier: PlanTier, amount: number): Promise<StoredBillingOrder> {
  const orderCode = Number(`${Date.now()}`.slice(-8)) + Math.floor(Math.random() * 90 + 10);
  const prisma = getPrisma();
  if (prisma) {
    const created = await prisma.billingOrder.create({
      data: { orderCode, userId, planTier, amount, status: "pending" },
    });
    return {
      id: created.id,
      orderCode: created.orderCode,
      userId: created.userId,
      planTier: created.planTier as PlanTier,
      amount: created.amount,
      status: "pending",
      createdAt: created.createdAt.toISOString(),
    };
  }
  return serialize(async () => {
    const orders = await loadList<StoredBillingOrder>("orders", ORDERS_FILE);
    const order: StoredBillingOrder = {
      id: `ord_${crypto.randomBytes(5).toString("hex")}`,
      orderCode,
      userId,
      planTier,
      amount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    orders.unshift(order);
    await writeJson(ORDERS_FILE, orders);
    return order;
  });
}

export async function markOrderPaid(orderCode: number): Promise<StoredBillingOrder | null> {
  const prisma = getPrisma();
  if (prisma) {
    const found = await prisma.billingOrder.findUnique({ where: { orderCode } });
    if (!found) return null;
    const updated = await prisma.billingOrder.update({
      where: { orderCode },
      data: { status: "paid", paidAt: new Date() },
    });
    await updateUserPlan(updated.userId, updated.planTier as PlanTier);
    return {
      id: updated.id,
      orderCode: updated.orderCode,
      userId: updated.userId,
      planTier: updated.planTier as PlanTier,
      amount: updated.amount,
      status: "paid",
      createdAt: updated.createdAt.toISOString(),
      paidAt: updated.paidAt?.toISOString(),
    };
  }
  return serialize(async () => {
    const orders = await loadList<StoredBillingOrder>("orders", ORDERS_FILE);
    const found = orders.find((o) => o.orderCode === orderCode);
    if (!found) return null;
    found.status = "paid";
    found.paidAt = new Date().toISOString();
    await writeJson(ORDERS_FILE, orders);
    await updateUserPlan(found.userId, found.planTier);
    return found;
  });
}
