import { INDUSTRY_PRESETS, generateLandingPageHtml } from "@/lib/blocks/template-engine";
import { getSite } from "@/lib/store";

export const dynamic = "force-dynamic";

// Xem trang mới nhất (do Studio hoặc AI Agent qua MCP tạo ra) trong một tab riêng.
export async function GET() {
  const site = await getSite();
  const html = generateLandingPageHtml(site?.config ?? INDUSTRY_PRESETS.spa);
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
