import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";
import { getProjectIntegration, getSite } from "@/lib/store";
import { decryptSecret } from "@/lib/crypto";
import { getCurrentUser } from "@/lib/auth";

// Gửi tin thử để người dùng kiểm tra cấu hình Telegram (không lưu vào CRM).
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let botToken = typeof body.botToken === "string" ? body.botToken.trim() : "";
    let chatId = typeof body.chatId === "string" ? body.chatId.trim() : "";

    if (!botToken || !chatId) {
      const user = await getCurrentUser();
      const site = await getSite(body.projectId, user?.id);
      const projId = body.projectId || site?.projectId || "proj_default";
      const stored = await getProjectIntegration(projId, "telegram");
      if (stored?.config) {
        if (!botToken && stored.config.encryptedToken) {
          botToken = decryptSecret(String(stored.config.encryptedToken));
        }
        if (!chatId && stored.config.chatId) {
          chatId = String(stored.config.chatId);
        }
      }
    }

    const result = await sendTelegramNotification(
      {
        id: "test",
        projectName: "Tin nhắn thử từ PromptToSite",
        fullName: "Khách hàng thử nghiệm",
        phone: "0900000000",
        note: "Nếu bạn thấy tin này, Telegram đã kết nối thành công.",
        submittedAt: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      },
      botToken || undefined,
      chatId || undefined
    );
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Lỗi gửi tin thử" }, { status: 500 });
  }
}
