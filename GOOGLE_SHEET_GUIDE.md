# HƯỚNG DẪN KẾT NỐI GOOGLE SHEET TIẾP NHẬN YÊU CẦU NGƯỜI DÙNG

Tài liệu này hướng dẫn bạn cách tạo một bảng tính Google Sheet tự động nhận phản hồi từ trang web hướng dẫn người dùng HRM (`index.html`) mà **người gửi hoàn toàn ẩn danh, không cần tài khoản GitHub hay tài khoản Google**.

---

## 1. Cơ chế hoạt động

```
[Người dùng trên Web] 
       │ (Nhập Yêu cầu + Tùy chọn Tên Zalo & Tên Công ty)
       ▼
[Nút Bấm "Gửi yêu cầu ngay"] 
       │ (Gửi POST JSON ẩn danh qua Webhook)
       ▼
[Google Apps Script (Web App)] 
       │ (Tự động append dòng mới)
       ▼
[Bảng tính Google Sheet của Bạn] 
       │ (Lưu trữ tập trung: Thời gian, Yêu cầu, Zalo, Công ty, Trạng thái)
       ▼
[Tôi - AI Agent] (Đọc định kỳ / Phân tích sự cố / Soạn câu trả lời / Báo cáo cho Bạn)
```

---

## 2. Các bước cài đặt (Mất khoảng 2 phút)

### Bước 1: Tạo Google Sheet
1. Truy cập [Google Sheets](https://sheets.google.com) và tạo một bảng tính mới.
2. Đặt tên bảng tính: **`HRM_YeuCau_NguoiDung`**.

### Bước 2: Dán mã Google Apps Script
1. Trên thanh menu của Google Sheets, chọn: **Tiện ích mở rộng** (Extensions) > **Apps Script**.
2. Xóa sạch đoạn code mẫu đang có.
3. Mở file [`google_sheet_setup.js`](file:///D:/SVG/AI_Agent/manual/google_sheet_setup.js), copy toàn bộ nội dung và dán vào trình soạn thảo Apps Script.
4. Bấm biểu tượng **Lưu** (Ctrl + S).

### Bước 3: Xuất bản thành Web App (Deploy)
1. Ở góc trên bên phải, bấm nút màu xanh **Triển khai** (Deploy) > chọn **Quản lý bản triển khai** hoặc **Tùy chọn triển khai mới** (New deployment).
2. Nhấp vào biểu tượng bánh răng ⚙️ (chọn loại), chọn **Ứng dụng web** (Web app).
3. Cấu hình 3 dòng như sau:
   - **Mô tả:** Tiếp nhận phản hồi HRM.
   - **Thực thi dưới dạng (Execute as):** `Tôi (email_cua_ban@gmail.com)`
   - **Ai có quyền truy cập (Who has access):** `Bất kỳ ai (Anyone)` *(Rất quan trọng: Phải chọn mục này để người dùng gửi được ẩn danh mà không bị bắt đăng nhập Google)*.
4. Bấm **Triển khai** (Deploy). Nếu Google hỏi quyền, bấm *Xem lại quyền (Review Permissions)* > Chọn tài khoản của bạn > Bấm *Nâng cao (Advanced)* > Chọn *Đi tới [Tên script] (Không an toàn)* > Bấm *Cho phép (Allow)*.
5. Sao chép dòng **URL ứng dụng web** (có dạng `https://script.google.com/macros/s/AKfycb.../exec`).

### Bước 4: Dán URL vào file `index.html`
Mở file `index.html`, tìm dòng cấu hình ở phần script:
```javascript
const GOOGLE_SHEET_WEBAPP_URL = "DÁN_URL_GOOGLE_APPS_SCRIPT_VÀO_ĐÂY";
```
Dán URL bạn vừa sao chép vào thay thế. Lưu file lại là xong!

---

## 3. Cách Tôi (AI Agent) đọc và hỗ trợ bạn xử lý

Khi có người gửi yêu cầu vào Google Sheet:
1. Bạn có thể xuất link chia sẻ (CSV / Viewer) hoặc tải file về đặt vào thư mục `D:\SVG\AI_Agent\`.
2. Tôi sẽ:
   - Đọc danh sách các dòng yêu cầu mới nhất.
   - Phân tích nội dung thắc mắc (ví dụ: lỗi tính công, lỗi mất cột bảo hiểm khi thôi việc, cách đăng ký tăng ca,...).
   - Kiểm tra đối soát với hệ thống HRM thực tế.
   - Soạn sẵn tin nhắn mẫu chi tiết, ngắn gọn để bạn chỉ việc copy gửi lại Zalo cho người hỏi!

---

## 4. XỬ LÝ SỰ CỐ: TẠI SAO TEST GỬI MÀ KHÔNG THẤY DỮ LIỆU VÀO SHEET?

### Nguyên nhân chính: Lỗi chặn quyền truy cập (HTTP 403 Forbidden)
Google mặc định thiết lập quyền của Web App là **"Chỉ mình tôi" (Only myself)**. Khi người dùng ẩn danh từ trang web gửi dữ liệu lên, máy chủ Google chặn lại và báo: *"Truy cập bị từ chối / Bạn cần có quyền truy cập"*, dữ liệu không được phép ghi vào sheet.

### Cách xử lý trong 30 giây:
1. Mở lại Google Sheet > Vào **Tiện ích mở rộng** (Extensions) > **Apps Script**.
2. Bấm nút **Triển khai** (Deploy) màu xanh ở góc trên bên phải > Chọn **Quản lý bản triển khai** (Manage deployments).
3. Bấm vào biểu tượng **Cây bút chì ✏️** ở góc trên cửa sổ để chỉnh sửa.
4. Tại dòng **Ai có quyền truy cập (Who has access)**: Bấm chọn lại là **`Bất kỳ ai` (Anyone)**.
5. Tại dòng **Phiên bản (Version)**: Chọn **`Phiên bản mới` (New version)**.
6. Bấm nút **Triển khai** (Deploy) để hoàn tất.

### Cách kiểm tra URL đã chạy đúng hay chưa:
- Copy đường dẫn Web App URL (dạng `https://script.google.com/macros/s/.../exec`) và mở tab ẩn danh trên trình duyệt (hoặc tab bình thường).
- **Nếu chạy đúng:** Màn hình sẽ hiện dòng chữ JSON: `{"status":"online","message":"Google Apps Script Web App đang hoạt động..."}`.
- **Nếu vẫn bị lỗi:** Màn hình sẽ bắt đăng nhập Google hoặc báo "Bạn cần có quyền truy cập".
