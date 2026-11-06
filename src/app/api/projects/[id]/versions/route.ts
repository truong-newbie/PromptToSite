import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { listProjectVersions } from "@/lib/store";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const versions = await listProjectVersions(params.id);
  const items = versions.map(({ configSnapshot, htmlSnapshot: _html, ...rest }) => ({
    ...rest,
    config: configSnapshot,
  }));
  return NextResponse.json({ success: true, versions: items });
}
