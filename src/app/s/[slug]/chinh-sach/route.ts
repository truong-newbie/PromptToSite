import { escapeHtml } from "@/lib/blocks/template-engine";
import { getPublished } from "@/lib/store";

/**
 * Trang Chính sách bảo mật dữ liệu cá nhân tự động sinh theo thông tin thương hiệu (Mục C4 - Luật BVDLCN 91/2025).
 */
export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const site = await getPublished(params.slug);
  const brand = escapeHtml(site?.brandName || "Đơn vị cung cấp dịch vụ");

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chính sách bảo vệ dữ liệu cá nhân - ${brand}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 antialiased py-12 px-4">
  <main class="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
    <div class="border-b border-slate-100 pb-4 space-y-1">
      <p class="text-xs font-bold uppercase tracking-wider text-blue-600">Tuân thủ Luật Bảo vệ dữ liệu cá nhân 91/2025</p>
      <h1 class="text-2xl font-extrabold text-slate-900">Chính Sách Bảo Mật & Xử Lý Dữ Liệu Cá Nhân</h1>
      <p class="text-xs text-slate-500">Đơn vị tiếp nhận và xử lý dữ liệu: <strong>${brand}</strong></p>
    </div>

    <section class="space-y-2 text-sm leading-relaxed text-slate-600">
      <h2 class="font-bold text-slate-900 text-base">1. Mục đích thu thập dữ liệu</h2>
      <p>
        <strong>${brand}</strong> chỉ thu thập các thông tin do Quý khách chủ động cung cấp qua biểu mẫu đăng ký
        (bao gồm: Họ và tên, Số điện thoại liên hệ, và Nhu cầu tư vấn) nhằm mục đích liên hệ tư vấn dịch vụ/sản phẩm,
        báo giá và chăm sóc khách hàng theo yêu cầu của Quý khách.
      </p>
    </section>

    <section class="space-y-2 text-sm leading-relaxed text-slate-600">
      <h2 class="font-bold text-slate-900 text-base">2. Phạm vi lưu trữ và bảo mật</h2>
      <p>
        Dữ liệu của Quý khách được lưu trữ an toàn trên hệ thống quản lý khách hàng (CRM) của <strong>${brand}</strong>,
        không chia sẻ, mua bán hoặc chuyển giao cho bất kỳ bên thứ ba nào nếu không có sự đồng ý rõ ràng của Quý khách
        hoặc yêu cầu từ cơ quan nhà nước có thẩm quyền.
      </p>
    </section>

    <section class="space-y-2 text-sm leading-relaxed text-slate-600">
      <h2 class="font-bold text-slate-900 text-base">3. Quyền của chủ thể dữ liệu (Rút lại sự đồng ý & Xóa dữ liệu)</h2>
      <p>
        Theo quy định của Luật Bảo vệ dữ liệu cá nhân, Quý khách có toàn quyền yêu cầu kiểm tra, cập nhật, điều chỉnh,
        rút lại sự đồng ý hoặc yêu cầu <strong>xóa hoàn toàn dữ liệu cá nhân</strong> của mình khỏi hệ thống bất cứ lúc nào
        bằng cách liên hệ trực tiếp qua số Hotline hiển thị trên trang chủ của <strong>${brand}</strong>.
      </p>
    </section>

    <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
      <span>Cập nhật lần cuối: ${new Date().toLocaleDateString("vi-VN")}</span>
      <a href="/s/${escapeHtml(params.slug)}" class="text-blue-600 font-bold hover:underline">← Quay lại trang chính</a>
    </div>
  </main>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
