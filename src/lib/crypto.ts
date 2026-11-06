import crypto from "crypto";

/**
 * Mã hóa đối xứng AES-256-GCM để bảo vệ các khóa bí mật (Telegram Bot Token, Webhook Secret)
 * khi lưu trong cơ sở dữ liệu phía máy chủ (Mục A4).
 */
function getMasterKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY?.trim();
  if (raw) {
    try {
      const buf = Buffer.from(raw, "base64");
      if (buf.length === 32) return buf;
    } catch {
      // Nếu không phải base64 chuẩn 32 byte, băm SHA-256 ra 32 byte
    }
    return crypto.createHash("sha256").update(raw).digest();
  }
  const fallback = process.env.AUTH_SECRET?.trim() || "prompttosite-default-aes-256-gcm-key-2026";
  return crypto.createHash("sha256").update(fallback).digest();
}

export function encryptSecret(plainText: string): string {
  if (!plainText) return "";
  const key = getMasterKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}:${tag.toString("base64")}:${encrypted.toString("base64")}`;
}

export function decryptSecret(cipherText: string): string {
  if (!cipherText || !cipherText.includes(":")) return "";
  try {
    const [ivB64, tagB64, dataB64] = cipherText.split(":");
    if (!ivB64 || !tagB64 || !dataB64) return "";
    const key = getMasterKey();
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(ivB64, "base64"));
    decipher.setAuthTag(Buffer.from(tagB64, "base64"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(dataB64, "base64")),
      decipher.final(),
    ]);
    return decrypted.toString("utf8");
  } catch {
    return "";
  }
}

export function maskSecret(secret: string): string {
  const s = secret.trim();
  if (!s) return "";
  if (s.length <= 8) return "••••";
  return `${s.slice(0, 4)}…${s.slice(-3)}`;
}
