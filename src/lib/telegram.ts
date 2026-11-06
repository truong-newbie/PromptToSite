import { LeadSubmission } from "./types";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Gửi thông báo Lead mới về Telegram Bot của người dùng.
 * Dùng parse_mode HTML và escape nội dung khách nhập để tin nhắn không bị lỗi định dạng.
 */
export async function sendTelegramNotification(
  lead: LeadSubmission,
  botToken?: string,
  chatId?: string
): Promise<{ success: boolean; error?: string }> {
  const token = botToken || process.env.TELEGRAM_BOT_TOKEN;
  const chat = chatId || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chat) {
    return { success: false, error: "Chưa cấu hình Telegram Bot Token hoặc Chat ID." };
  }

  const message = [
    "🔔 <b>CÓ KHÁCH HÀNG MỚI TỪ LANDING PAGE</b>",
    "━━━━━━━━━━━━━━━━",
    `🌐 <b>Trang:</b> ${esc(lead.projectName || "Landing Page")}`,
    `👤 <b>Khách hàng:</b> ${esc(lead.fullName)}`,
    `📞 <b>Số điện thoại:</b> <code>${esc(lead.phone)}</code>`,
    `📝 <b>Nhu cầu:</b> ${esc(lead.note || "Không có")}`,
    `⏱ <b>Thời gian:</b> ${esc(lead.submittedAt)}`,
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text: message, parse_mode: "HTML" }),
      signal: AbortSignal.timeout(8000),
    });

    const data = await res.json();
    if (!data.ok) return { success: false, error: data.description || "Gửi Telegram thất bại" };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Lỗi kết nối Telegram" };
  }
}
