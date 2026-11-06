# PROMPTTOSITE - BẢN THỰC THI TOÀN DIỆN MVP (Minimum Viable Product)
## Nền Tảng AI Tạo & Xuất Bản Landing Page Bán Hàng Tự Động Trong 30 Giây

* **Dự án tham dự cuộc thi:** HaUI - STARTUP MINDSET 2026
* **Tác giả / Founder:** Đỗ Đăng Trường
* **Techstack lõi:** Next.js 14 App Router, TypeScript, Tailwind CSS, MCP (Model Context Protocol) 2024-11-05, Telegram Bot API, Canvas Confetti, JSZip, Docker Sandbox Compose.

---

## 1. Các Tính Năng Đã Hoàn Thiện Trong Bản MVP

### 1.1. Giao Diện Web Studio 2 Cột Chuyên Nghiệp
* **Cột trái (Chat Studio & Quản trị):**
  * **Trợ lý AI:** Nhận diện ngôn ngữ tự nhiên, gợi ý sẵn 4 prompt mẫu nhanh cho 4 ngành lớn (Thẩm mỹ & Spa, Cà phê Mộc, Khóa học Kỹ năng AI, Thời trang Nữ Chic).
  * **Quản lý Khách hàng (CRM Mini):** Bắt lead thời gian thực, tìm kiếm/lọc khách hàng nhanh theo Tên, SĐT, Nhu cầu; **Nút xuất Excel/CSV chuẩn Tiếng Việt UTF-8 BOM** chỉ với 1 click.
  * **Cài đặt & MCP:** Tích hợp mô hình AI BYOK (Gemini 2.0 Flash, OpenAI GPT-4o-mini, Smart Offline Engine), cấu hình Telegram Bot Token & Chat ID, thông tin cổng MCP Server Endpoint.
* **Cột phải (Live Preview Canvas):**
  * Giả lập thanh URL trình duyệt có biểu tượng bảo mật SSL.
  * Chuyển đổi 3 chế độ xem responsive: **Desktop (100%)**, **Tablet (768px)**, **Mobile (390px)**.
  * Hiệu ứng pháo hoa Confetti chúc mừng khi sinh trang hoặc chốt lead thành công.

### 1.2. Công Cụ Sửa Trực Quan "Click-to-Edit" & Bảng Chọn 6 Màu Sắc (Theme Palette Switcher)
* **Sửa Nhanh Trực Tiếp (Click-to-Edit):**
  * Bấm nút **"Sửa Nhanh"** ở góc phải thanh URL: toàn bộ các đoạn văn bản (Tiêu đề, Mô tả, Ưu đãi, Bảng giá, Hotline, Tên thương hiệu) chuyển sang viền nét đứt xanh và cho phép người dùng click vào gõ sửa văn bản trực tiếp.
  * Đồng bộ qua `postMessage`: mỗi chỉnh sửa được ghi ngược vào cấu hình trang (không lưu cả DOM), nên file ZIP và bản xuất bản luôn mang đúng nội dung đã sửa và iframe không bị tải lại.
* **Theme Palette Switcher:**
  * Bộ 6 bảng màu: **Xanh Hoàng Gia (SaaS)**, **Ngọc Lam (Spa/Y tế)**, **Xám Đen (Minimalist/Tech)**, **Xanh Rừng (Eco/F&B)**, **Hồng Rượu Vang (Thời trang/Mỹ phẩm)**, **Nâu Ấm (Cà phê/Thủ công)**.
  * Đổi màu toàn trang web ngay lập tức thông qua CSS variables mà không bị giật lag hay reload trang.

### 1.3. Multi-LLM Engine Hỗ Trợ BYOK & Fallback Không Lỗi
* Hỗ trợ gọi trực tiếp **Google Gemini 2.0 Flash** hoặc **OpenAI GPT-4o-mini** với System Prompt chuyên sâu về CRO (Tối ưu Tỷ lệ Chuyển đổi) và công thức AIDA.
* **Semantic Extraction Fallback:** Khi chạy offline hoặc không có API Key, hệ thống tự động nhận diện thực thể thông minh (Thương hiệu, Ngành nghề, Mức giảm giá %, Số hotline) để sinh trang trong 100ms mà không bao giờ gặp lỗi gián đoạn bài thuyết trình.

### 1.4. Chuẩn Kết Nối Model Context Protocol (MCP) Chuẩn Anthropic
* Cung cấp endpoint chuẩn JSON-RPC 2.0 tại `/api/mcp` (hỗ trợ cả GET và POST).
* Công cụ (MCP Tools) hoạt động trên dữ liệu thật dùng chung với Web Studio:
  * `generate_landing_page`: tạo trang theo prompt và đặt làm trang đang soạn (Studio tự cập nhật sau vài giây).
  * `update_landing_page_block`: sửa tiêu đề, ưu đãi, hotline, màu sắc... của trang đang soạn.
  * `publish_landing_page`: xuất bản và trả về đường dẫn `/s/{slug}`.
  * `get_crm_leads`: đọc danh sách khách từ CRM.
* Kèm file cấu hình mẫu `mcp_config.json` (dùng `mcp-remote` để nối Claude Desktop) và kiến trúc `docker-compose.sandbox.yml` mô phỏng môi trường Sandbox On-Demand cô lập cho từng khách hàng.

### 1.5. CRM Lưu Trữ Bền Vững & Xuất File Excel / CSV
* Dữ liệu khách hàng được ghi bền vững vào file `data/leads.json` (kèm in-memory fallback an toàn).
* Cho phép tải toàn bộ danh sách khách hàng thành file `.csv` có mã hóa UTF-8 BOM, mở trực tiếp bằng Microsoft Excel không bị lỗi font Tiếng Việt.

---

### 1.6. Xuất Bản Thật
* Nút **Xuất bản** dựng trang tĩnh, lưu vào `data/sites/` và phục vụ tại `/s/{slug}`; có mã QR và nút sao chép liên kết.
* Form của trang đã xuất bản gửi lead về `/api/leads?site={slug}`: lưu CRM và báo về Telegram đã cấu hình lúc xuất bản. Studio tự hiện thông báo khi có lead mới từ thiết bị khác.
* Địa chỉ `localhost` chỉ mở được trên máy chạy Studio; cần triển khai lên máy chủ để quét QR bằng điện thoại.

### 1.7. Giới Hạn Hiện Tại (MVP)
* Dữ liệu lưu bằng file JSON trong `data/` (đã `.gitignore`); chưa có tài khoản, đăng nhập hay phân quyền, nên danh sách lead và MCP đang mở công khai. Chỉ chạy nội bộ hoặc demo.
* Chưa có Docker sandbox, Caddy on-demand TLS, tên miền riêng, thanh toán: các phần này nằm trong `tai_lieu_dac_ta.md` như lộ trình.

## 2. Hướng Dẫn Chạy Sản Phẩm

### Bước 1: Mở terminal tại thư mục `mvp`
```bash
cd d:\Thu_muc_C\LandingPage_Builder_Project\mvp
npm install
```

### Bước 2: Khởi động máy chủ Next.js
```bash
npm run dev
```

### Bước 3: Trải nghiệm tại trình duyệt
Mở trình duyệt truy cập: **[http://localhost:3000](http://localhost:3000)**

---

## 3. Kịch Bản Demo Trực Tiếp Dành Cho Buổi Thuyết Trình (Thời lượng 3 Phút)

| Thời gian | Hành động trên màn hình | Lời thoại thuyết trình với Ban Giám khảo |
|---|---|---|
| **0:00 - 0:30** | Mở Web Studio `http://localhost:3000`. Giới thiệu bố cục 2 màn hình. | *"Kính thưa Ban Giám khảo, đây là PromptToSite. Một tiểu thương hay chủ shop không cần biết lập trình, chỉ cần gõ câu lệnh là có ngay website bán hàng chuẩn CRO."* |
| **0:30 - 1:00** | Bấm chọn nút prompt mẫu: **"💆 Thẩm Mỹ & Spa Ban Mai"** (hoặc gõ tùy ý). | *"Hệ thống AI xử lý chỉ mất 2 giây, tự động ghép nối các khối Tailwind CSS: Từ banner ưu đãi, lý do chọn, bảng giá dịch vụ cho đến form bắt khách hàng."* |
| **1:00 - 1:30** | Bấm nút **"Mobile"** trên thanh điều hướng preview, sau đó bấm nút **"Sửa Nhanh"** (Click-to-Edit) và click vào tiêu đề gõ sửa trực tiếp. Click đổi màu sang **Hồng Nữ Tính** hoặc **Tím Công Nghệ**. | *"Khác với các công cụ tạo ảnh giả lập thông thường, đây là website tương tác thực 100%. Chủ shop có thể xem chuẩn mobile và click trực tiếp vào chữ trên màn hình để sửa giá, sửa tiêu đề chỉ trong 1 giây mà không cần vào code."* |
| **1:30 - 2:15** | Cuộn xuống Form Đăng Ký ở trang xem trước bên phải. Nhập tên *"Nguyễn Văn An"* và SĐT *"0988123456"*, bấm **"GỬI ĐĂNG KÝ NGAY"**. | *"Ngay khi khách hàng bấm gửi, pháo hoa nổ, chuông thông báo reo lên, tin nhắn Telegram được bắn về điện thoại người bán hàng trong 2 giây, và thông tin được lưu vĩnh viễn vào hệ thống CRM."* |
| **2:15 - 2:45** | Chuyển sang tab **"Khách hàng"**, bấm nút **"Excel"** để tải file CSV. Mở tab **"Cài đặt"** chỉ vào endpoint `/api/mcp`. | *"Chủ doanh nghiệp có thể tải ngay file Excel khách hàng về chốt sale. Hệ thống của chúng tôi tích hợp sẵn chuẩn MCP Server mở để kết nối thẳng vào Claude hoặc ChatGPT của người dùng."* |
| **2:45 - 3:00** | Bấm nút **"Xuất bản 1-Click"** (hiện QR Code) hoặc **"Tải ZIP"** (tải trọn bộ mã nguồn web). | *"Khách hàng quét mã QR để vào web ngay trên điện thoại, hoặc tải trọn bộ file HTML để lưu trữ mà không lo bị phụ thuộc nền tảng. Đó là lý do PromptToSite là giải pháp thương mại hóa vượt trội!"* |
