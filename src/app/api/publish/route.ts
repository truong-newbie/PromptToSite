import { NextResponse } from "next/server";
import { INDUSTRY_PRESETS, generateLandingPageHtml, normalizeConfig } from "@/lib/blocks/template-engine";
import { getSite, logModerationFlag, newSlug, savePublished } from "@/lib/store";
import { getCurrentUser } from "@/lib/auth";
import { moderateLandingPage } from "@/lib/moderation";

export const dynamic = "force-dynamic";

// Xuất bản: kiểm duyệt chống giả mạo (C1), dựng HTML tĩnh, lưu lại và phục vụ tại /s/{slug}.
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const config = normalizeConfig(body.config, INDUSTRY_PRESETS.general);

    const currentSite = await getSite(body.projectId, user?.id);
    const projectId = body.projectId || currentSite?.projectId || "proj_default";

    // Kiểm duyệt nội dung trước khi cho phép xuất bản (C1)
    const mod = await moderateLandingPage(config);
    if (!mod.allowed) {
      await logModerationFlag({
        projectId,
        userId: user?.id,
        reason: mod.reason || "Vi phạm tiêu chuẩn nội dung",
        matched: mod.matched,
        snapshot: config as unknown as Record<string, any>,
      });
      return NextResponse.json(
        {
          error: `Từ chối xuất bản: ${mod.reason}`,
          flagged: true,
        },
        { status: 422 }
      );
    }

    const slug = newSlug();
    const html = generateLandingPageHtml(config, {
      leadEndpoint: `/api/leads?site=${slug}`,
      privacyUrl: `/s/${slug}/chinh-sach`,
    });
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
