import { LeadSubmission } from "./types";

/**
 * Gửi thông báo Lead mới về Telegram Bot của người dùng
 */
export async function sendTelegramNotification(
  lead: LeadSubmission,
  botToken?: string,
  chatId?: string
): Promise<{ success: boolean; error?: string }> {
  const token = botToken || process.env.TELEGRAM_BOT_TOKEN;
  const chat = chatId || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chat) {
    return {
      success: false,
      error: "Chưa cấu hình Telegram Bot Token hoặc Chat ID.",
    };
  }

  const message = `🔥 *[CÓ KHÁCH HÀNG MỚI TỪ LANDING PAGE]*
━━━━━━━━━━━━━━━━━━━━
🌐 *Trang:* ${lead.projectName || "Landing Page"}
👤 *Khách hàng:* ${lead.fullName}
📞 *Số điện thoại:* \`${lead.phone}\`
📝 *Nhu cầu / Ghi chú:* ${lead.note || "Không có"}
⏱️ *Thời gian:* ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
━━━━━━━━━━━━━━━━━━━━
⚡ *Hệ thống PromptToSite AI CRM*`;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chat,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const data = await res.json();
    if (!data.ok) {
      return { success: false, error: data.description || "Gửi Telegram thất bại" };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Lỗi kết nối Telegram" };
  }
}

