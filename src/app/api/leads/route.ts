import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";
import { addLead, getLeads, getPublished } from "@/lib/store";

// Giới hạn tần suất đơn giản theo IP (đủ cho MVP; production nên dùng Redis).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 10;
}

// Trang xuất bản có thể chạy ở domain khác nên endpoint nhận lead cần CORS. Chỉ áp dụng cho POST.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

const PHONE_RE = /^(\+84|0)\d{9,10}$/;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Bạn gửi quá nhanh, vui lòng thử lại sau ít phút." }, { status: 429, headers: CORS });
    }

    const body = await req.json();
    const fullName = String(body.fullName ?? "").trim().slice(0, 80);
    const phone = String(body.phone ?? "").replace(/[\s.\-]/g, "");
    const note = String(body.note ?? "").trim().slice(0, 300);
    const brandName = String(body.brandName ?? "").trim().slice(0, 80);

    if (fullName.length < 2) {
      return NextResponse.json({ error: "Vui lòng nhập họ và tên." }, { status: 400, headers: CORS });
    }
    if (!PHONE_RE.test(phone)) {
      return NextResponse.json({ error: "Số điện thoại không hợp lệ." }, { status: 400, headers: CORS });
    }

    // Thông tin Telegram: lấy từ trang đã xuất bản (?site=slug), hoặc do Studio gửi lên khi demo.
    const siteSlug = new URL(req.url).searchParams.get("site");
    const published = siteSlug ? await getPublished(siteSlug) : null;
    const botToken = published?.telegram?.botToken ?? (typeof body.botToken === "string" ? body.botToken : undefined);
    const chatId = published?.telegram?.chatId ?? (typeof body.chatId === "string" ? body.chatId : undefined);

    const lead = await addLead({
      projectName: brandName || published?.brandName || "Landing Page Bán Hàng",
      fullName,
      phone,
      note,
    });

    const telegramNotification = await sendTelegramNotification(lead, botToken, chatId);

    return NextResponse.json(
      { success: true, lead, telegramNotification, totalLeads: (await getLeads()).length },
      { headers: CORS }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Lỗi xử lý Lead" }, { status: 500, headers: CORS });
  }
}

// Chặn công thức Excel (=, +, -, @) trong ô CSV do khách nhập.
function csvCell(value: unknown): string {
  let s = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const leads = await getLeads();

    if (searchParams.get("export") === "csv") {
      const header = ["STT", "Thời Gian Đăng Ký", "Họ Và Tên", "Số Điện Thoại", "Ghi Chú Nhu Cầu", "Dự Án / Thương Hiệu"]
        .map(csvCell)
        .join(",");
      const rows = leads.map((l, i) =>
        [i + 1, l.submittedAt, l.fullName, `'${l.phone}`, l.note, l.projectName].map(csvCell).join(",")
      );
      // BOM UTF-8 giúp Excel hiển thị đúng tiếng Việt.
      const csv = "﻿" + [header, ...rows].join("\r\n") + "\r\n";

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="PromptToSite_Leads_${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({ success: true, leads, total: leads.length });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Lỗi lấy danh sách Lead" }, { status: 500 });
  }
}
