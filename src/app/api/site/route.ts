import { NextResponse } from "next/server";
import { getSite, setSite } from "@/lib/store";
import { INDUSTRY_PRESETS, normalizeConfig } from "@/lib/blocks/template-engine";
import { IndustryType } from "@/lib/types";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Trạng thái trang đang soạn. Studio và các AI Agent (qua MCP) cùng đọc/ghi để luôn đồng bộ.
export async function GET(req: Request) {
  const user = await getCurrentUser();
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") || undefined;
  const site = await getSite(projectId, user?.id);
  return NextResponse.json({ success: true, site });
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const industry: IndustryType = body.industry in INDUSTRY_PRESETS ? body.industry : "general";
    const config = normalizeConfig(body.config, INDUSTRY_PRESETS[industry]);
    const projectId = typeof body.projectId === "string" ? body.projectId : undefined;
    const site = await setSite(config, industry, "studio", {
      projectId,
      userId: user?.id,
    });
    return NextResponse.json({ success: true, version: site.version, projectId: site.projectId });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Không lưu được trang" }, { status: 400 });
  }
}
