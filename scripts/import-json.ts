import fs from "fs/promises";
import path from "path";
import { getPrisma } from "../src/lib/db";

/**
 * Script chuyển dữ liệu từ ./data/*.json (bản MVP cũ) sang cơ sở dữ liệu PostgreSQL (Prisma).
 * Cách chạy: npx tsx scripts/import-json.ts
 */
async function main() {
  const prisma = getPrisma();
  if (!prisma) {
    console.error("Chưa cấu hình DATABASE_URL hợp lệ trong .env.local. Bỏ qua bước nhập dữ liệu.");
    process.exit(1);
  }

  const dataDir = path.join(process.cwd(), "data");
  const siteFile = path.join(dataDir, "site.json");
  const leadsFile = path.join(dataDir, "leads.json");
  const sitesDir = path.join(dataDir, "sites");

  const defaultUser = await prisma.user.upsert({
    where: { email: "demo@prompttosite.vn" },
    update: {},
    create: { email: "demo@prompttosite.vn", fullName: "Tài khoản Demo", role: "user" },
  });

  let projectId: string | undefined;

  // 1. Nhập site.json thành Project mặc định
  try {
    const rawSite = JSON.parse(await fs.readFile(siteFile, "utf-8"));
    if (rawSite?.config) {
      const proj = await prisma.project.create({
        data: {
          userId: defaultUser.id,
          name: rawSite.config.brandName || "Dự án nhập từ JSON",
          industry: rawSite.industry || "spa",
          themeConfig: rawSite.config,
          version: rawSite.version || 1,
          source: rawSite.source || "studio",
        },
      });
      projectId = proj.id;
      console.log("Đã nhập site.json -> Project:", proj.id);
    }
  } catch {
    console.log("Không tìm thấy data/site.json hoặc file rỗng, bỏ qua.");
  }

  // 2. Nhập data/sites/*.json thành PublishedSite
  try {
    const files = await fs.readdir(sitesDir);
    for (const f of files) {
      if (!f.endsWith(".json")) continue;
      const pub = JSON.parse(await fs.readFile(path.join(sitesDir, f), "utf-8"));
      if (pub?.slug && pub?.html) {
        await prisma.publishedSite.upsert({
          where: { slug: pub.slug },
          update: { html: pub.html, brandName: pub.brandName || "PromptToSite", projectId: projectId || null },
          create: { slug: pub.slug, html: pub.html, brandName: pub.brandName || "PromptToSite", projectId: projectId || null },
        });
        console.log("Đã nhập trang xuất bản:", pub.slug);
      }
    }
  } catch {
    console.log("Không có thư mục data/sites/, bỏ qua.");
  }

  // 3. Nhập data/leads.json thành Lead
  try {
    const leads = JSON.parse(await fs.readFile(leadsFile, "utf-8"));
    if (Array.isArray(leads)) {
      for (const l of leads) {
        await prisma.lead.create({
          data: {
            projectId: projectId || null,
            projectName: l.projectName || null,
            fullName: l.fullName || "Khách hàng",
            phone: l.phone || "",
            note: l.note || null,
            submittedAt: l.submittedAt || new Date().toLocaleString("vi-VN"),
            data: l,
          },
        });
      }
      console.log(`Đã nhập ${leads.length} khách hàng từ data/leads.json.`);
    }
  } catch {
    console.log("Không tìm thấy data/leads.json, bỏ qua.");
  }

  await prisma.$disconnect();
  console.log("Hoàn tất chuyển dữ liệu JSON sang PostgreSQL!");
}

main().catch((err) => {
  console.error("Lỗi khi chạy import-json:", err);
  process.exit(1);
});
