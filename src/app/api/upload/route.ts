import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_BYTES = 3 * 1024 * 1024; // 3 MB
const ALLOWED_MIMES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "Vui lòng chọn file ảnh." }, { status: 400 });
    }

    const ext = ALLOWED_MIMES[file.type];
    if (!ext) {
      return NextResponse.json({ error: "Chỉ hỗ trợ định dạng JPG, PNG hoặc WebP." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Dung lượng ảnh vượt quá 3 MB." }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());

    // Thử ghi vào public/uploads nếu môi trường cho phép, đồng thời có dự phòng data URL cho serverless
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      const fileName = `hero_${Date.now()}_${crypto.randomBytes(4).toString("hex")}.${ext}`;
      await fs.writeFile(path.join(uploadDir, fileName), buf);
      return NextResponse.json({ success: true, url: `/uploads/${fileName}` });
    } catch {
      const dataUrl = `data:${file.type};base64,${buf.toString("base64")}`;
      return NextResponse.json({ success: true, url: dataUrl });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Tải ảnh thất bại" }, { status: 500 });
  }
}

