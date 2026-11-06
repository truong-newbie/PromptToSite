import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { decryptSecret, encryptSecret, maskSecret } from "@/lib/crypto";
import { getProjectIntegration, getSite, saveProjectIntegration } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  let projectId = searchParams.get("projectId") || "";
  if (!projectId) {
    const site = await getSite(undefined, user.id);
    projectId = site?.projectId || "proj_default";
  }

  const integration = await getProjectIntegration(projectId, "telegram");
  const encryptedToken = String(integration?.config?.encryptedToken || "");
  const plainToken = encryptedToken ? decryptSecret(encryptedToken) : "";
  const chatId = String(integration?.config?.chatId || "");

  return NextResponse.json({
    success: true,
    projectId,
    chatId,
    maskedToken: plainToken ? maskSecret(plainToken) : "",
    hasToken: Boolean(plainToken),
    isActive: integration ? integration.isActive : true,
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

    const existing = await getProjectIntegration(projectId, "telegram");
    const prevEncrypted = String(existing?.config?.encryptedToken || "");
    const rawToken = typeof body.botToken === "string" ? body.botToken.trim() : "";
    const chatId = typeof body.chatId === "string" ? body.chatId.trim() : String(existing?.config?.chatId || "");
    const isActive = typeof body.isActive === "boolean" ? body.isActive : true;

    const encryptedToken = rawToken ? encryptSecret(rawToken) : prevEncrypted;
    const plainToken = encryptedToken ? decryptSecret(encryptedToken) : "";

    await saveProjectIntegration(
      projectId,
      "telegram",
      { encryptedToken, chatId },
      isActive
    );

    return NextResponse.json({
      success: true,
      projectId,
      chatId,
      maskedToken: plainToken ? maskSecret(plainToken) : "",
      hasToken: Boolean(plainToken),
      isActive,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Không lưu được cấu hình Telegram" }, { status: 400 });
  }
}

