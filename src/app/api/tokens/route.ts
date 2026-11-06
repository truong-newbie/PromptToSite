import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createApiToken, listApiTokens, revokeApiToken } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  const tokens = await listApiTokens(user.id);
  return NextResponse.json({ success: true, tokens });
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "Claude Desktop Token").trim();
    const { token, item } = await createApiToken(user.id, name);
    return NextResponse.json({ success: true, token, item });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Không tạo được token" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";
    if (!id) return NextResponse.json({ error: "Thiếu mã token" }, { status: 400 });
    const ok = await revokeApiToken(id, user.id);
    return NextResponse.json({ success: ok });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Không thu hồi được token" }, { status: 500 });
  }
}

