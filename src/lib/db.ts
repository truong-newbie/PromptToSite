import { PrismaClient } from "@prisma/client";

const g = globalThis as unknown as {
  __prisma?: PrismaClient;
};

/**
 * Kiểm tra đã cấu hình chuỗi kết nối PostgreSQL thật chưa.
 * Nếu chưa có DATABASE_URL, hệ thống tự động dùng lưu trữ JSON cục bộ (./data)
 * để bản chạy thử / demo luôn hoạt động trơn tru không bị lỗi kết nối.
 */
export function hasDatabaseUrl(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url && /^postgres(ql)?:\/\//i.test(url));
}

export function getPrisma(): PrismaClient | null {
  if (!hasDatabaseUrl()) return null;
  if (!g.__prisma) {
    g.__prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }
  return g.__prisma;
}

export const db = getPrisma();
