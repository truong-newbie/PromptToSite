import crypto from "crypto";
import { cookies } from "next/headers";
import { getOrCreateUser, ensureDefaultProject, StoredUser } from "./store";

export const SESSION_COOKIE = "p2s_session";
const SESSION_TTL_SEC = 24 * 3600; // 24 giờ

export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
  isDemo?: boolean;
  exp: number;
}

function getSecret(): string {
  return process.env.AUTH_SECRET?.trim() || "prompttosite-dev-auth-secret-key-2026";
}

export function isDemoModeEnabled(): boolean {
  const v = process.env.DEMO_MODE?.trim().toLowerCase();
  if (v === "false" || v === "0") return false;
  return true; // Mặc định bật trong môi trường demo/cục bộ nếu chưa tắt
}

export function signSessionToken(payload: Omit<SessionUser, "exp">, ttlSec = SESSION_TTL_SEC): string {
  const data: SessionUser = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + ttlSec,
  };
  const body = Buffer.from(JSON.stringify(data), "utf-8").toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySessionToken(token?: string | null): SessionUser | null {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  try {
    if (
      sig.length !== expected.length ||
      !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    ) {
      return null;
    }
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf-8")) as SessionUser;
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Lấy thông tin người dùng hiện tại từ cookie phiên làm việc.
 * Nếu đang bật DEMO_MODE và chưa có cookie, trả về tài khoản Demo mặc định
 * để trải nghiệm chấm thi/demo không bị gián đoạn.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = cookies();
    const raw = cookieStore.get(SESSION_COOKIE)?.value;
    const verified = verifySessionToken(raw);
    if (verified) return verified;
  } catch {
    // Khi gọi ngoài ngữ cảnh request
  }

  if (isDemoModeEnabled()) {
    const u = await getOrCreateUser("demo@prompttosite.vn", "Khách Dùng Thử (Demo)");
    return {
      id: u.id,
      email: u.email,
      fullName: u.fullName,
      role: u.role,
      isDemo: true,
      exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC,
    };
  }
  return null;
}

export async function loginAndCreateDefaultProject(
  email: string,
  fullName?: string,
  isDemo = false
): Promise<{ user: StoredUser; token: string; defaultProjectId: string }> {
  const user = await getOrCreateUser(email, fullName);
  const proj = await ensureDefaultProject(user.id);
  const token = signSessionToken({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    isDemo,
  });
  return { user, token, defaultProjectId: proj.id };
}
