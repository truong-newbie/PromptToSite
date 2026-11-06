import { NextResponse } from "next/server";
import crypto from "crypto";
import { getPublished, recordAnalyticsEvent } from "@/lib/store";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const siteSlug = String(body.siteSlug || "").trim();
    const type = body.type === "cta_click" ? "cta_click" : "pageview";
    const label = typeof body.label === "string" ? body.label.slice(0, 80) : undefined;

    if (!siteSlug) {
      return NextResponse.json({ error: "Thiếu siteSlug" }, { status: 400, headers: CORS });
    }

    const published = await getPublished(siteSlug);
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
    const today = new Date().toISOString().slice(0, 10);
    // Băm SHA-256 của IP + ngày, không dùng cookie, tôn trọng quyền riêng tư (C2)
    const visitorHash = crypto.createHash("sha256").update(`${ip}:${today}`).digest("hex").slice(0, 24);

    await recordAnalyticsEvent({
      siteSlug,
      projectId: published?.projectId || body.projectId,
      type,
      visitorHash,
      label,
    });

    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Lỗi ghi nhận sự kiện" }, { status: 500, headers: CORS });
  }
}
