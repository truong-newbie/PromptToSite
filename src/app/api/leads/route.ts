import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";
import { LeadSubmission } from "@/lib/types";
import fs from "fs/promises";
import path from "path";

// Đường dẫn file lưu trữ bền vững
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// In-memory fallback
let inMemoryLeads: LeadSubmission[] = [];

// Hàm hỗ trợ đọc danh sách leads bền vững
async function loadPersistentLeads(): Promise<LeadSubmission[]> {
  try {
    const content = await fs.readFile(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      inMemoryLeads = parsed;
      return parsed;
    }
  } catch (err) {
    // File chưa tồn tại hoặc lỗi đọc file -> dùng in-memory
  }
  return inMemoryLeads;
}

// Hàm hỗ trợ lưu leads vào file
async function savePersistentLeads(leads: LeadSubmission[]): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not save leads to file system, using in-memory only", err);
  }
}

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

    const currentLeads = await loadPersistentLeads();

    const lead: LeadSubmission = {
      id: "lead_" + Date.now(),
      projectName: brandName || "Landing Page Bán Hàng",
      fullName: fullName.trim(),
      phone: phone.trim(),
      note: note ? note.trim() : "",
      submittedAt: new Date().toLocaleString("vi-VN"),
    };

    currentLeads.unshift(lead);
    inMemoryLeads = currentLeads;

    // Lưu bền vững ra đĩa
    await savePersistentLeads(currentLeads);

    // Bắn thông báo Telegram (nếu có cấu hình)
    const telegramResult = await sendTelegramNotification(lead, botToken, chatId);

    return NextResponse.json({
      success: true,
      lead,
      telegramNotification: telegramResult,
      totalLeads: currentLeads.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Lỗi xử lý Lead" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const exportFormat = searchParams.get("export");

    const leads = await loadPersistentLeads();

    // Hỗ trợ xuất trực tiếp định dạng CSV tương thích 100% Microsoft Excel tiếng Việt
    if (exportFormat === "csv") {
      const bom = "\uFEFF"; // UTF-8 BOM giúp Excel không bị lỗi font Tiếng Việt
      let csv = `${bom}"STT","Thời Gian Đăng Ký","Họ Và Tên","Số Điện Thoại","Ghi Chú Nhu Cầu","Dự Án / Thương Hiệu"\n`;

      leads.forEach((l, index) => {
        const cleanName = (l.fullName || "").replace(/"/g, '""');
        const cleanPhone = (l.phone || "").replace(/"/g, '""');
        const cleanNote = (l.note || "").replace(/"/g, '""');
        const cleanProject = (l.projectName || "").replace(/"/g, '""');
        const cleanTime = (l.submittedAt || "").replace(/"/g, '""');

        csv += `"${index + 1}","${cleanTime}","${cleanName}","'${cleanPhone}","${cleanNote}","${cleanProject}"\n`;
      });

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="PromptToSite_Leads_${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      leads,
      total: leads.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Lỗi lấy danh sách Lead" },
      { status: 500 }
    );
  }
}
