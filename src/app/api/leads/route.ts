import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";
import { addLead, getLeads, getProjectIntegration, getPublished, getSite } from "@/lib/store";
import { decryptSecret } from "@/lib/crypto";
import { getCurrentUser } from "@/lib/auth";
import { checkRateLimit } from "@/lib/ratelimit";

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
    const rl = await checkRateLimit(`leads:${ip}`, 10, 60);
    if (rl.limited) {
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

    const siteSlug = new URL(req.url).searchParams.get("site") || undefined;
    const published = siteSlug ? await getPublished(siteSlug) : null;
    const currentSite = !published ? await getSite(body.projectId) : null;
    const projectId = published?.projectId || body.projectId || currentSite?.projectId || "proj_default";

    // Tra cứu cấu hình Telegram đã mã hóa từ phía máy chủ theo projectId (A4)
    let botToken: string | undefined;
    let chatId: string | undefined;
    const tgIntegration = await getProjectIntegration(projectId, "telegram");
    if (tgIntegration && tgIntegration.isActive && tgIntegration.config) {
      const enc = String(tgIntegration.config.encryptedToken || "");
      botToken = enc ? decryptSecret(enc) : undefined;
      chatId = tgIntegration.config.chatId ? String(tgIntegration.config.chatId) : undefined;
    }
    // Hỗ trợ tương thích ngược nếu bản xuất bản cũ có lưu telegram
    if (!botToken && published?.telegram?.botToken) botToken = published.telegram.botToken;
    if (!chatId && published?.telegram?.chatId) chatId = published.telegram.chatId;

    const lead = await addLead({
      projectId,
      projectName: brandName || published?.brandName || currentSite?.name || "Landing Page Bán Hàng",
      siteSlug,
      fullName,
      phone,
      note,
      consentAt: body.consentAt || new Date().toISOString(),
      ipAddress: ip,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    const telegramNotification = await sendTelegramNotification(lead, botToken, chatId);

    return NextResponse.json(
      { success: true, lead, telegramNotification, totalLeads: (await getLeads({ projectId })).length },
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
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId") || undefined;
    const leads = await getLeads({ projectId, userId: user?.id });

    if (searchParams.get("export") === "csv") {
      const header = ["STT", "Thời Gian Đăng Ký", "Họ Và Tên", "Số Điện Thoại", "Ghi Chú Nhu Cầu", "Dự Án / Thương Hiệu"]
        .map(csvCell)
        .join(",");
      const rows = leads.map((l, i) =>
        [i + 1, l.submittedAt, l.fullName, `'${l.phone}`, l.note, l.projectName].map(csvCell).join(",")
      );
      const csv = "\uFEFF" + [header, ...rows].join("\r\n") + "\r\n";

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
