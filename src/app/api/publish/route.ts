import { NextResponse } from "next/server";
import { INDUSTRY_PRESETS, generateLandingPageHtml, normalizeConfig } from "@/lib/blocks/template-engine";
import { getSite, newSlug, savePublished } from "@/lib/store";
import { getCurrentUser } from "@/lib/auth";

// Xuất bản: dựng HTML tĩnh, lưu lại và phục vụ tại /s/{slug}. Lead từ trang này tự tra cứu cấu hình thông báo phía máy chủ.
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const config = normalizeConfig(body.config, INDUSTRY_PRESETS.general);
    const slug = newSlug();

    const currentSite = await getSite(body.projectId, user?.id);
    const projectId = body.projectId || currentSite?.projectId || "proj_default";

    const html = generateLandingPageHtml(config, { leadEndpoint: `/api/leads?site=${slug}` });
    await savePublished({
      slug,
      projectId,
      userId: user?.id,
      html,
      brandName: config.brandName,
      createdAt: new Date().toISOString(),
    });

    const origin = new URL(req.url).origin;
    return NextResponse.json({ success: true, slug, projectId, url: `${origin}/s/${slug}` });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Xuất bản thất bại" }, { status: 500 });
  }
}
