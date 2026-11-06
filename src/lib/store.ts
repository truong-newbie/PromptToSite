import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { LeadSubmission, IndustryType } from "./types";
import type { TemplateBlockConfig } from "./blocks/template-engine";

/**
 * Lưu trữ phía server cho MVP: ghi file JSON trong ./data, có bộ nhớ đệm dự phòng
 * khi môi trường không cho ghi đĩa (ví dụ serverless). Khi lên production cần thay bằng PostgreSQL.
 */
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const SITE_FILE = path.join(DATA_DIR, "site.json");
const SITES_DIR = path.join(DATA_DIR, "sites");

export interface SiteState {
  config: TemplateBlockConfig;
  industry: IndustryType;
  version: number;
  source: "studio" | "mcp";
  updatedAt: string;
}

export interface PublishedSite {
  slug: string;
  html: string;
  brandName: string;
  telegram?: { botToken: string; chatId: string };
  createdAt: string;
}

const g = globalThis as unknown as {
  __p2s?: { leads: LeadSubmission[] | null; site: SiteState | null; published: Map<string, PublishedSite>; lock: Promise<unknown> };
};
const mem = (g.__p2s ??= { leads: null, site: null, published: new Map(), lock: Promise.resolve() });

/** Tuần tự hóa các thao tác ghi để tránh ghi đè lẫn nhau. */
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

// ----------------------------- Leads -----------------------------
export async function getLeads(): Promise<LeadSubmission[]> {
  if (mem.leads) return mem.leads;
  const stored = await readJson<LeadSubmission[]>(LEADS_FILE);
  mem.leads = Array.isArray(stored) ? stored : [];
  return mem.leads;
}

export function addLead(input: Omit<LeadSubmission, "id" | "submittedAt">): Promise<LeadSubmission> {
  return serialize(async () => {
    const leads = await getLeads();
    const lead: LeadSubmission = {
      ...input,
      id: `lead_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`,
      submittedAt: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
    };
    leads.unshift(lead);
    mem.leads = leads;
    await writeJson(LEADS_FILE, leads);
    return lead;
  });
}

// ----------------------------- Site hiện tại -----------------------------
export async function getSite(): Promise<SiteState | null> {
  if (mem.site) return mem.site;
  mem.site = await readJson<SiteState>(SITE_FILE);
  return mem.site;
}

export function setSite(config: TemplateBlockConfig, industry: IndustryType, source: SiteState["source"]): Promise<SiteState> {
  return serialize(async () => {
    const prev = await getSite();
    const site: SiteState = {
      config,
      industry,
      source,
      version: (prev?.version ?? 0) + 1,
      updatedAt: new Date().toISOString(),
    };
    mem.site = site;
    await writeJson(SITE_FILE, site);
    return site;
  });
}

// ----------------------------- Trang đã xuất bản -----------------------------
const SLUG_RE = /^[a-f0-9]{8}$/;
export const newSlug = () => crypto.randomBytes(4).toString("hex");

export async function savePublished(site: PublishedSite): Promise<void> {
  mem.published.set(site.slug, site);
  await writeJson(path.join(SITES_DIR, `${site.slug}.json`), site);
}

export async function getPublished(slug: string): Promise<PublishedSite | null> {
  if (!SLUG_RE.test(slug)) return null;
  const cached = mem.published.get(slug);
  if (cached) return cached;
  const stored = await readJson<PublishedSite>(path.join(SITES_DIR, `${slug}.json`));
  if (stored) mem.published.set(slug, stored);
  return stored;
}
