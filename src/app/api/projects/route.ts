import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createProject, deleteProject, getLeads, listProjects, renameProject } from "@/lib/store";
import { IndustryType } from "@/lib/types";
import { INDUSTRY_PRESETS } from "@/lib/blocks/template-engine";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const [projects, leads] = await Promise.all([
    listProjects(user.id),
    getLeads({ userId: user.id }),
  ]);

  const items = projects.map((p) => ({
    id: p.id,
    name: p.name,
    industry: p.industry,
    primaryColor: p.config.primaryColorHex,
    secondaryColor: p.config.accentColorHex,
    publishedSlug: p.publishedSlug,
    leadCount: leads.filter((l) => l.projectId === p.id || (!l.projectId && p.id === "proj_default")).length,
    version: p.version,
    updatedAt: p.updatedAt,
  }));

  return NextResponse.json({ success: true, projects: items });
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const industry: IndustryType = body.industry in INDUSTRY_PRESETS ? body.industry : "spa";
    const name = String(body.name || INDUSTRY_PRESETS[industry].brandName).trim();

    const created = await createProject({
      userId: user.id,
      name,
      industry,
    });

    return NextResponse.json({ success: true, project: created });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Không tạo được dự án" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const body = await req.json();
    const projectId = String(body.projectId || "");
    const name = String(body.name || "").trim();
    if (!projectId || !name) {
      return NextResponse.json({ error: "Thiếu mã dự án hoặc tên mới." }, { status: 400 });
    }
    const updated = await renameProject(projectId, name, user.id);
    if (!updated) return NextResponse.json({ error: "Không tìm thấy dự án." }, { status: 404 });
    return NextResponse.json({ success: true, project: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Không đổi tên được dự án" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";
    if (!id) return NextResponse.json({ error: "Thiếu mã dự án" }, { status: 400 });
    const ok = await deleteProject(id, user.id);
    return NextResponse.json({ success: ok });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Không xóa được dự án" }, { status: 500 });
  }
}

