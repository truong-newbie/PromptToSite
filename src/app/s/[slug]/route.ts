import { getPublished } from "@/lib/store";

const CSP_HEADER = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://images.unsplash.com https:",
  "connect-src 'self'",
].join("; ");

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const site = await getPublished(params.slug);
  if (!site) {
    return new Response("Không tìm thấy trang này.", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  // Nhúng đoạn mã thống kê nhẹ (~25 dòng, không dùng cookie) cho trang đã xuất bản (Mục C2)
  const trackingSnippet = `<script>
(function(){
  var slug = ${JSON.stringify(params.slug)};
  function send(type, label) {
    try {
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteSlug: slug, type: type, label: label || '' }),
        keepalive: true
      }).catch(function(){});
    } catch (e) {}
  }
  send('pageview', document.title);
  document.querySelectorAll('a[href="#orderSection"], a[href^="tel:"], button[type="submit"]').forEach(function(el){
    el.addEventListener('click', function(){
      send('cta_click', (el.textContent || '').trim().slice(0, 40));
    });
  });
})();
</script>
</body>`;

  const htmlWithAnalytics = site.html.includes("</body>")
    ? site.html.replace("</body>", trackingSnippet)
    : `${site.html}\n${trackingSnippet}`;

  return new Response(htmlWithAnalytics, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": CSP_HEADER,
      "Cache-Control": "no-store",
    },
  });
}
