import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getAnalyticsSummary } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") || undefined;
  const siteSlug = searchParams.get("site") || undefined;

  const summary = await getAnalyticsSummary(projectId, siteSlug);
  return NextResponse.json({ success: true, ...summary });
}

