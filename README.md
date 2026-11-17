# SIMS HRM Onboarding Guide - Static Website

Trang web hướng dẫn người dùng mới cho Hệ thống Quản trị Nhân sự & Tiền lương **SIMS HRM V26.10**.

Website được thiết kế hoàn toàn theo mô hình **Static Web độc lập**:
- ✅ Không cần cơ sở dữ liệu (Database).
- ✅ Không phụ thuộc backend hoặc server HRM nội bộ.
- ✅ Không yêu cầu đăng nhập.
- ✅ Tối ưu cho người ngại đọc văn bản dài: thiết kế dạng checklist, đánh số bước hành động cụ thể, khung mô phỏng giao diện trực quan và cảnh báo sai sót thực tế.
- ✅ Sẵn sàng deploy trực tiếp lên **GitHub Pages** (hỗ trợ cả root domain và subpath repository).

---

## 1. CẤU TRÚC THƯ MỤC

```
site/
├── index.html        # Trang giao diện chính (HTML5 + CSS3 nhúng + Vanilla JS, không phụ thuộc thư viện CDN bên ngoài)
└── README.md         # Hướng dẫn chạy và triển khai
```

---

## 2. HƯỚNG DẪN CHẠY LOCAL TRÊN MÁY TÍNH

Bạn có thể chạy trang web này trên máy tính cá nhân bằng bất kỳ cách nào dưới đây:

### Cách 1: Mở trực tiếp bằng trình duyệt (Không cần cài đặt gì)
- Nhấp đúp chuột (Double click) vào file `index.html` hoặc chuột phải chọn `Open with` -> `Google Chrome` / `Microsoft Edge`.
- File chạy hoàn toàn bình thường ở chế độ offline.

### Cách 2: Chạy qua Live Server hoặc Python HTTP Server
Nếu muốn chạy dưới dạng máy chủ cục bộ:
```bash
# Sử dụng Python 3 (nếu có sẵn trên máy):
cd site
python -m http.server 8080

# Sau đó mở trình duyệt truy cập:
http://localhost:8080/
```

---

## 3. HƯỚNG DẪN TRIỂN KHAI LÊN GITHUB PAGES

Trang web sử dụng 100% đường dẫn tương đối (relative paths) và nhúng toàn bộ tài nguyên (inline SVG, embedded styling), do đó hoạt động hoàn hảo khi được triển khai dưới dạng **GitHub Pages Project Subpath** (ví dụ: `https://<username>.github.io/<repo-name>/`).

### Các bước triển khai chi tiết:

1. **Khởi tạo và đẩy mã nguồn lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: add HRM user onboarding guide static site"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```

2. **Kích hoạt tính năng GitHub Pages trên Repository:**
   - Mở repository của bạn trên GitHub.
   - Nhấp vào tab **Settings** (Cài đặt) ở thanh menu trên cùng.
   - Chọn mục **Pages** ở thanh menu bên trái.
   - Tại mục **Build and deployment** -> **Source**: chọn `Deploy from a branch`.
   - Tại mục **Branch**:
     - Chọn nhánh: `main` (hoặc nhánh chứa thư mục của bạn).
     - Chọn thư mục: `/ (root)` nếu đặt file `index.html` ở thư mục gốc, hoặc chọn `/site` nếu bạn đưa thư mục `site` lên.
     - Nhấn nút **Save**.

3. **Truy cập trang web:**
   - Sau khoảng 1-2 phút, GitHub sẽ hoàn tất build và cung cấp đường link truy cập công khai dạng:
     `https://<username>.github.io/<repo-name>/`
   - Bất kỳ nhân viên mới hoặc quản lý nào đều có thể truy cập ngay lập tức từ máy tính hoặc điện thoại mà không cần đăng nhập hay cài đặt phần mềm.

---

## 4. AN TOÀN BẢO MẬT & BẢO VỆ DỮ LIỆU
- Trang hướng dẫn chỉ chứa dữ liệu giả định mô phỏng phục vụ hướng dẫn thao tác.
- Hoàn toàn **không chứa thông tin cá nhân thật**, không chứa tài khoản/mật khẩu quản trị, không chứa URL hay API key nội bộ của doanh nghiệp.

---

## 5. TÍCH HỢP CHATBOT TRA CỨU & TIẾP NHẬN YÊU CẦU QUA GOOGLE SHEET
Trang web đã tích hợp sẵn một **Floating Widget** ở góc phải màn hình:
1. **🤖 Trợ lý tra cứu tức thì:** Trả lời tự động các câu hỏi thường gặp về HRM (lỗi mất lương thôi việc, tăng ca, tính công, khóa lương,...).
2. **📝 Form gửi yêu cầu ẩn danh:**
   - Người dùng **không cần đăng nhập, không cần tài khoản GitHub/Google**.
   - Nhập: *Nội dung yêu cầu / thắc mắc* (bắt buộc), *Tên Zalo/SĐT* (tùy chọn), *Tên Công ty/Xưởng* (tùy chọn).
   - Dữ liệu được gửi tự động và lưu trữ trên **Google Sheet** của bạn thông qua Google Apps Script Web App.
   - Hướng dẫn cấu hình chi tiết có trong file [`GOOGLE_SHEET_GUIDE.md`](file:///D:/SVG/AI_Agent/manual/GOOGLE_SHEET_GUIDE.md) và mã nguồn Apps Script trong file [`google_sheet_setup.js`](file:///D:/SVG/AI_Agent/manual/google_sheet_setup.js).
