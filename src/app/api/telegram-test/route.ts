import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";

// Gửi tin thử để người dùng kiểm tra cấu hình Telegram (không lưu vào CRM).
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await sendTelegramNotification(
      {
        id: "test",
        projectName: "Tin nhắn thử từ PromptToSite",
        fullName: "Khách hàng thử nghiệm",
        phone: "0900000000",
        note: "Nếu bạn thấy tin này, Telegram đã kết nối thành công.",
        submittedAt: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      },
      typeof body.botToken === "string" ? body.botToken.trim() : undefined,
      typeof body.chatId === "string" ? body.chatId.trim() : undefined
    );
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Lỗi gửi tin thử" }, { status: 500 });
  }
}
