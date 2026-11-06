import { NextRequest, NextResponse } from "next/server";
import {
  getCurrentUser,
  isDemoModeEnabled,
  loginAndCreateDefaultProject,
  SESSION_COOKIE,
} from "@/lib/auth";
import { getUserSubscription, PLAN_LIMITS } from "@/lib/store";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ authenticated: false, demoMode: isDemoModeEnabled() }, { status: 401 });
  }
  const subscription = await getUserSubscription(user.id);
  const planInfo = PLAN_LIMITS[subscription.planTier] || PLAN_LIMITS.free;
  return NextResponse.json({
    authenticated: true,
    user,
    subscription,
    planInfo,
    demoMode: isDemoModeEnabled(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const mode = String(body.mode || "email");

    let email = String(body.email || "").trim().toLowerCase();
    let fullName = String(body.fullName || "").trim();
    let isDemo = false;

    if (mode === "demo") {
      if (!isDemoModeEnabled()) {
        return NextResponse.json({ error: "Chế độ dùng thử đang tắt." }, { status: 403 });
      }
      email = "demo@prompttosite.vn";
      fullName = "Khách Dùng Thử (BGK Demo)";
      isDemo = true;
    } else if (mode === "google") {
      email = email || "google.user@prompttosite.vn";
      fullName = fullName || "Tài khoản Google";
    } else {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Vui lòng nhập địa chỉ email hợp lệ." }, { status: 400 });
      }
      fullName = fullName || email.split("@")[0];
    }

    const { user, token, defaultProjectId } = await loginAndCreateDefaultProject(email, fullName, isDemo);

    const res = NextResponse.json({
      success: true,
      user,
      defaultProjectId,
    });

    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 3600,
    });
    return res;
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    return NextResponse.json({ error: "Không thể đăng nhập lúc này." }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
