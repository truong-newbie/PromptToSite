/**
 * Giới hạn tần suất (Rate Limiting) cho POST /api/leads và POST /api/mcp (Mục A5).
 * - Nếu đã cấu hình UPSTASH_REDIS_REST_URL và UPSTASH_REDIS_REST_TOKEN, sử dụng Upstash REST API (bền vững trên serverless).
 * - Nếu chưa cấu hình, tự động dùng bộ nhớ trong (in-memory sliding window).
 */
const memWindows = new Map<string, number[]>();

export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowSec = 60
): Promise<{ limited: boolean; remaining: number }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (upstashUrl && upstashToken) {
    try {
      const bucket = `p2s:rl:${key}:${Math.floor(Date.now() / (windowSec * 1000))}`;
      const res = await fetch(`${upstashUrl.replace(/\/$/, "")}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", bucket],
          ["EXPIRE", bucket, windowSec],
        ]),
        signal: AbortSignal.timeout(2500),
      });
      if (res.ok) {
        const data = await res.json();
        const count = Number(data?.[0]?.result ?? 1);
        return {
          limited: count > maxRequests,
          remaining: Math.max(0, maxRequests - count),
        };
      }
    } catch {
      // Lỗi kết nối Upstash -> tự động rơi về bộ nhớ RAM
    }
  }

  const now = Date.now();
  const windowMs = windowSec * 1000;
  const recent = (memWindows.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  memWindows.set(key, recent);
  if (memWindows.size > 5000) memWindows.clear();

  return {
    limited: recent.length > maxRequests,
    remaining: Math.max(0, maxRequests - recent.length),
  };
}
