import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { restoreProjectVersion } from "@/lib/store";

export async function POST(
  _req: Request,
  { params }: { params: { id: string; versionId: string } }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const restored = await restoreProjectVersion(params.id, params.versionId, user.id);
  if (!restored) {
    return NextResponse.json({ error: "Không tìm thấy phiên bản cần khôi phục." }, { status: 404 });
  }
  return NextResponse.json({ success: true, site: restored });
}
