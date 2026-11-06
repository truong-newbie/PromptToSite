import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";
import { LeadSubmission } from "@/lib/types";

// In-memory leads storage cho bản MVP (kèm thời gian submit)
const leadsStore: LeadSubmission[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, note, brandName, botToken, chatId } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ họ tên và số điện thoại." },
        { status: 400 }
      );
    }

    const lead: LeadSubmission = {
      id: "lead_" + Date.now(),
      projectName: brandName || "Landing Page",
      fullName,
      phone,
      note,
      submittedAt: new Date().toISOString(),
    };

    leadsStore.unshift(lead);

    // Bắn thông báo Telegram (nếu có cấu hình)
    const telegramResult = await sendTelegramNotification(lead, botToken, chatId);

    return NextResponse.json({
      success: true,
      lead,
      telegramNotification: telegramResult,
      totalLeads: leadsStore.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Lỗi xử lý Lead" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    leads: leadsStore,
    total: leadsStore.length,
  });
}

