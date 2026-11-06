import { getPublished } from "@/lib/store";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const site = await getPublished(params.slug);
  if (!site) {
    return new Response("Không tìm thấy trang này.", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
  return new Response(site.html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store",
    },
  });
}
