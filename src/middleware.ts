import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "./lib/auth";

const PUBLIC_PATHS = ["/showcase", "/login", "/pricing", "/api/auth", "/api/mcp", "/api/events", "/api/domains/validate-ssl", "/api/billing/webhook"];

function isDemoMode(): boolean {
  const v = process.env.DEMO_MODE?.trim().toLowerCase();
  return v !== "false" && v !== "0";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Cho phép các đường dẫn tĩnh & công khai
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/s/") ||
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  ) {
    return NextResponse.next();
  }

  // 2. POST /api/leads luôn mở công khai để khách điền form từ trang xuất bản
  if (pathname === "/api/leads" && req.method === "POST") {
    return NextResponse.next();
  }

  // 3. Nếu đang bật DEMO_MODE hoặc có cookie phiên hợp lệ thì cho qua
  const hasCookie = Boolean(req.cookies.get(SESSION_COOKIE)?.value);
  if (hasCookie || isDemoMode()) {
    return NextResponse.next();
  }

  // 4. Chặn truy cập chưa đăng nhập
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Vui lòng đăng nhập để sử dụng tính năng này." }, { status: 401 });
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
