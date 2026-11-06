# PROMPTTOSITE - BẢN THỰC THI MVP (Minimum Viable Product)
## Nền Tảng AI Tạo & Xuất Bản Landing Page Bán Hàng Trong 30 Giây

Dự án tham dự cuộc thi: **HaUI - STARTUP MINDSET 2026**  
Tác giả / Founder: **Đỗ Đăng Trường**

---

## 1. Các Tính Năng Đã Hoàn Thiện Trong Bản MVP Này

1. **Giao Diện Web Studio 2 Cột (Next.js 14 + Tailwind CSS):**
   * Cột trái: Khung Chat AI Assistant, 4 nút chọn nhanh ngành nghề mẫu (Thẩm mỹ & Spa, Cà phê Mộc, Khóa học AI, Thời trang Nữ).
   * Cột phải: Live Preview Canvas hiển thị trực tiếp trang Landing Page hoàn chỉnh.
   * Thanh công cụ chuyển đổi kích thước thiết bị: **Desktop (100%)**, **Tablet (768px)**, **Mobile (375px)**.
2. **AI Block-Driven Engine:**
   * Tự động phân tích câu lệnh prompt để trích xuất tên thương hiệu, ngành nghề, tỷ lệ ưu đãi giảm giá.
   * Ghép nối 6 khối giao diện Tailwind CSS chuẩn hóa (Banner ưu đãi, Navbar, Hero, 3 Cam kết, Bảng giá, Testimonials và Form đăng ký).
   * Không bao giờ vỡ layout trên điện thoại di động.
3. **CRM Thu Lead & Bắn Thông Báo Telegram Tức Thì:**
   * Tự động bắt sự kiện submit của Form trên trang web xem trước.
   * Lưu thông tin khách hàng (Họ tên, SĐT, Nhu cầu) vào Tab **Quản lý Khách hàng (CRM)**.
   * **Bắn thông báo ngay lập tức về Telegram Bot** trên điện thoại cá nhân dưới 2 giây.
4. **Xuất Bản 1-Click & Tải Trọn Bộ Mã Nguồn (.zip):**
   * Nút **Xuất bản**: Mở popup cấp link web live giả lập và **mã QR Code** để Ban Giám khảo dùng điện thoại quét trực tiếp.
   * Nút **Tải ZIP**: Tải file `.zip` chứa file `index.html` sạch về máy để tự do host trên bất kỳ server nào (No vendor lock-in).
5. **Cổng Kết Nối MCP (Model Context Protocol):**
   * Sẵn sàng endpoint tích hợp cho ChatGPT Plus hoặc Claude Desktop kết nối trực tiếp vào Docker Sandbox.

---

## 2. Hướng Dẫn Chạy Sản Phẩm Trên Máy Tính

### Bước 1: Mở terminal tại thư mục `mvp`
```bash
cd d:\Thu_muc_C\LandingPage_Builder_Project\mvp
```

### Bước 2: Khởi động máy chủ phát triển
```bash
npm run dev
```

### Bước 3: Mở trình duyệt web
Truy cập địa chỉ: [http://localhost:3000](http://localhost:3000)

---

## 3. Kịch Bản Demo Trực Tiếp Dành Cho Bạn Đi Thi (3 Phút)

1. **Mở trang Web Studio:** Giới thiệu tổng quan giao diện chia 2 màn hình.
2. **Gõ câu lệnh:** Nhập: *"Tạo Landing Page cho Viện Thẩm Mỹ Ban Mai, giảm 40%, có form đặt hẹn"* (hoặc bấm nút mẫu nhanh).
3. **Quan sát Live Preview:** Bấm chuyển sang chế độ **Mobile** để chứng minh trang web tự co giãn hoàn hảo.
4. **Test Form Lead:** Điền Họ tên và SĐT của bạn vào Form bên phải $\rightarrow$ Bấm nút "Gửi đăng ký".
5. **Xem kết quả:** Pháo hoa confetti bắn lên, popup chuông reo thông báo, dữ liệu nhảy ngay vào Tab CRM và điện thoại nhận tin nhắn Telegram!
6. **Bấm Tải ZIP:** Tải file mã nguồn về máy để chứng minh tính mở của sản phẩm.

