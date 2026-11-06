import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { decryptSecret, encryptSecret, maskSecret } from "@/lib/crypto";
import { getProjectIntegration, getProjectIntegrations, getSite, saveProjectIntegration } from "@/lib/store";
import { dispatchLeadWebhook, sendEmailLeadNotification } from "@/lib/notifications";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  let projectId = searchParams.get("projectId") || "";
  if (!projectId) {
    const site = await getSite(undefined, user.id);
    projectId = site?.projectId || "proj_default";
  }

  const list = await getProjectIntegrations(projectId);
  const emailInt = list.find((i) => i.type === "email");
  const webhookInt = list.find((i) => i.type === "webhook");

  const encSecret = String(webhookInt?.config?.encryptedSecret || "");
  const plainSecret = encSecret ? decryptSecret(encSecret) : "";

  return NextResponse.json({
    success: true,
    projectId,
    email: {
      recipient: String(emailInt?.config?.recipient || ""),
      isActive: emailInt ? emailInt.isActive : false,
    },
    webhook: {
      url: String(webhookInt?.config?.url || ""),
      maskedSecret: plainSecret ? maskSecret(plainSecret) : "",
      isActive: webhookInt ? webhookInt.isActive : false,
    },
  });
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const body = await req.json();
    let projectId = String(body.projectId || "").trim();
    if (!projectId) {
      const site = await getSite(undefined, user.id);
      projectId = site?.projectId || "proj_default";
    }

    const type = body.type as "email" | "webhook";
    if (type === "email") {
      const recipient = String(body.recipient || "").trim();
      const isActive = Boolean(body.isActive);
      await saveProjectIntegration(projectId, "email", { recipient }, isActive);
      return NextResponse.json({ success: true, type: "email", recipient, isActive });
    }

    if (type === "webhook") {
      const existing = await getProjectIntegration(projectId, "webhook");
      const prevEnc = String(existing?.config?.encryptedSecret || "");
      const url = String(body.url || "").trim();
      const rawSecret = typeof body.secret === "string" ? body.secret.trim() : "";
      const encryptedSecret = rawSecret ? encryptSecret(rawSecret) : prevEnc;
      const isActive = Boolean(body.isActive);
      await saveProjectIntegration(projectId, "webhook", { url, encryptedSecret }, isActive);
      const plain = encryptedSecret ? decryptSecret(encryptedSecret) : "";
      return NextResponse.json({
        success: true,
        type: "webhook",
        url,
        maskedSecret: plain ? maskSecret(plain) : "",
        isActive,
      });
    }

    return NextResponse.json({ error: "Loại tích hợp không hợp lệ" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Lưu tích hợp thất bại" }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const body = await req.json();
    const type = body.type as "email" | "webhook";
    const sampleLead = {
      id: "lead_test_sample",
      projectId: body.projectId || "proj_default",
      projectName: "Dự án thử nghiệm PromptToSite",
      fullName: "Nguyễn Văn An (Khách thử)",
      phone: "0988123456",
      note: "Kiểm tra kết nối thông báo tự động",
      submittedAt: new Date().toLocaleString("vi-VN"),
    };

    if (type === "email") {
      const res = await sendEmailLeadNotification(sampleLead, String(body.recipient || ""));
      return NextResponse.json(res, { status: res.success ? 200 : 400 });
    }

    if (type === "webhook") {
      const res = await dispatchLeadWebhook(sampleLead, String(body.url || ""), String(body.secret || ""), 1);
      return NextResponse.json(res, { status: res.success ? 200 : 400 });
    }

    return NextResponse.json({ error: "Loại thử nghiệm không hợp lệ" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Lỗi gửi thử" }, { status: 500 });
  }
}
