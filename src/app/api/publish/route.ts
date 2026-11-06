import { NextResponse } from "next/server";
import { INDUSTRY_PRESETS, generateLandingPageHtml, normalizeConfig } from "@/lib/blocks/template-engine";
import { newSlug, savePublished } from "@/lib/store";

// Xuất bản: dựng HTML tĩnh, lưu lại và phục vụ tại /s/{slug}. Lead từ trang này tự gửi về Telegram của chủ trang.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const config = normalizeConfig(body.config, INDUSTRY_PRESETS.general);
    const slug = newSlug();

    const botToken = typeof body.botToken === "string" ? body.botToken.trim() : "";
    const chatId = typeof body.chatId === "string" ? body.chatId.trim() : "";

    const html = generateLandingPageHtml(config, { leadEndpoint: `/api/leads?site=${slug}` });
    await savePublished({
      slug,
      html,
      brandName: config.brandName,
      telegram: botToken && chatId ? { botToken, chatId } : undefined,
      createdAt: new Date().toISOString(),
    });

    const origin = new URL(req.url).origin;
    return NextResponse.json({ success: true, slug, url: `${origin}/s/${slug}` });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Xuất bản thất bại" }, { status: 500 });
  }
}
