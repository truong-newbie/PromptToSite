import { NextResponse } from "next/server";
import { getSite, setSite } from "@/lib/store";
import { INDUSTRY_PRESETS, normalizeConfig } from "@/lib/blocks/template-engine";
import { IndustryType } from "@/lib/types";

// Trạng thái trang đang soạn. Studio và các AI Agent (qua MCP) cùng đọc/ghi để luôn đồng bộ.
export async function GET() {
  return NextResponse.json({ success: true, site: await getSite() });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const industry: IndustryType = body.industry in INDUSTRY_PRESETS ? body.industry : "general";
    const config = normalizeConfig(body.config, INDUSTRY_PRESETS[industry]);
    const site = await setSite(config, industry, "studio");
    return NextResponse.json({ success: true, version: site.version });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Không lưu được trang" }, { status: 400 });
  }
}
