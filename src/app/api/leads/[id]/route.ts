import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { deleteLeadById, updateLeadStatus } from "@/lib/store";
import { LeadStatus } from "@/lib/types";

const ALLOWED_STATUS: LeadStatus[] = ["new", "contacted", "closed"];

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const body = await req.json();
    const status = body.status as LeadStatus;
    if (!ALLOWED_STATUS.includes(status)) {
      return NextResponse.json({ error: "Trạng thái không hợp lệ" }, { status: 400 });
    }

    const updated = await updateLeadStatus(params.id, status);
    if (!updated) return NextResponse.json({ error: "Không tìm thấy khách hàng" }, { status: 404 });
    return NextResponse.json({ success: true, lead: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Cập nhật thất bại" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const ok = await deleteLeadById(params.id);
    if (!ok) return NextResponse.json({ error: "Không tìm thấy khách hàng" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Xóa thất bại" }, { status: 500 });
  }
}
