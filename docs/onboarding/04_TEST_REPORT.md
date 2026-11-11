# 04 - BÁO CÁO KIỂM THỬ TÍNH ĐẦY ĐỦ (TEST REPORT)

**Đối tượng kiểm thử:** Static Onboarding Website (`site/index.html`) đối chiếu ngược với `01_FEATURE_INVENTORY.md` và `02_ONBOARDING_PLAN.md`.  
**Ngày thực hiện:** 03/11/2026.  
**Tình trạng kiểm thử:** Đạt chuẩn 100%.

---

## 1. BẢNG THỐNG KÊ ĐỐI CHIẾU NGƯỢC (REVERSE AUDIT)

| Chỉ số kiểm thử | Số lượng | Tỷ lệ (%) | Đánh giá |
| :--- | :---: | :---: | :--- |
| **Tổng số chức năng được kiểm kê (Feature Inventory)** | 53 | 100% | Toàn bộ các module đang hoạt động trên hệ thống HRM V26.10 |
| **Số chức năng có kịch bản hướng dẫn chi tiết** | 44 | 83% | Tập trung vào toàn bộ các tác vụ thao tác chính của người dùng |
| **Số chức năng phụ/tiện ích đi kèm trong quy trình chung** | 9 | 17% | Các nút tiện ích (Export, In thẻ, Xem nhật ký đăng nhập, Khóa công) được lồng ghép tự nhiên |
| **Số chức năng bị bỏ quên không có lý do** | 0 | 0% | Tuyệt đối không bỏ sót |
| **Số chức năng tự suy diễn / không tồn tại** | 0 | 0% | 100% đối soát thực tế từ DOM và API của hệ thống đang chạy |
| **Số quy trình nghiệp vụ chuỗi đã kiểm tra** | 8 quy trình | 100% | Tiếp nhận -> Hợp đồng -> Phép/OT -> Tính công -> Tính lương -> Thôi việc -> Phúc lợi -> Cấu hình |

---

## 2. KẾT QUẢ KIỂM THỬ GIAO DIỆN & TÍNH NĂNG TRANG STATIC HTML

| Hạng mục kiểm thử | Tiêu chí | Kết quả thực tế | Tình trạng |
| :--- | :--- | :--- | :---: |
| **Khả năng hoạt động độc lập** | Không backend, không database, không auth | Mở trực tiếp file `index.html` chạy mượt mà | **ĐẠT** |
| **Đường dẫn tài nguyên (Paths)** | Sử dụng relative paths, không phụ thuộc localhost | Không có link tuyệt đối máy chủ, sẵn sàng cho GitHub Pages subpath | **ĐẠT** |
| **Bảo mật dữ liệu (Data Privacy)** | Không rò rỉ dữ liệu thật, không có API key / password | Sử dụng 100% dữ liệu mẫu giả định mang tính minh họa | **ĐẠT** |
| **Tính năng Tìm kiếm nhanh (Instant Search)** | Gõ từ khóa lọc ngay lập tức không cần tải lại trang | Lọc chính xác các thẻ nhiệm vụ theo từ khóa | **ĐẠT** |
| **Tính năng Lọc theo vai trò (Role Filter)** | Chuyển đổi giữa Tất cả / C&B / Quản lý / Admin | Ẩn/hiện nội dung tương ứng mượt mà | **ĐẠT** |
| **Khung mô phỏng UI (Visual Mockup)** | Hiển thị giao diện mô phỏng có vùng sáng nhấp nháy | Trực quan, người dùng nhìn là nhận ra ngay nút trên HRM | **ĐẠT** |
| **Liên kết neo nội bộ (Anchor Jump)** | Nhấp từ Quick Tiles hoặc Sidebar nhảy đúng vị trí | Smooth scroll hoạt động chính xác | **ĐẠT** |
| **Độ co giãn Responsive** | Hoạt động trên Desktop, Tablet và Mobile | Giao diện tự động xếp dọc khi màn hình nhỏ hơn 900px | **ĐẠT** |

---

## 3. DANH SÁCH LỖI ĐÃ PHÁT HIỆN & ĐÃ KHẮC PHỤC

1. **Lỗi 1 (UI Mobile):** Khi xem trên màn hình điện thoại, bảng mô phỏng UI Mockup bị tràn chiều ngang.  
   *Đã sửa:* Bổ sung thuộc tính `overflow-x: auto;` cho toàn bộ các bảng mockup.
2. **Lỗi 2 (Tương thích Subpath GitHub Pages):** Tránh việc sử dụng đường dẫn tuyệt đối dạng `/site/...` làm hỏng link khi deploy dưới dạng repo project.  
   *Đã sửa:* Quy chuẩn 100% thành liên kết neo tương đối `#task-id` và relative link.
3. **Lỗi 3 (Nội dung phản hồi người dùng):** Người dùng đặc biệt quan tâm đến việc tại sao tháng 10 tính lương thôi việc lại mất cột `Insurance Salary` và `Basic Salary`.  
   *Đã sửa:* Làm nổi bật hẳn trong Task 05 (Khai báo thôi việc) bằng khung cảnh báo màu đỏ và FAQ mục 1 với 3 bước khắc phục cụ thể.
4. **Lỗi 4 (Xác minh ngôn ngữ hệ thống):** Kiểm tra thao tác thực tế cho thấy hệ thống HRM **không hỗ trợ tiếng Việt** (thành phần HTML chọn ngôn ngữ bị ẩn `class="language hidden"`, đường dẫn `/hrm/language` trả về lỗi HTTP 404, toàn bộ menu và nút bấm hiển thị 100% bằng tiếng Anh).  
   *Đã sửa:* Đã đính chính toàn bộ hướng dẫn, loại bỏ hướng dẫn chọn tiếng Việt sai thực tế, bổ sung thông báo trực quan trên đầu trang web và xây dựng bảng đối chiếu Anh - Việt cho toàn bộ menu và nút bấm thực tế.

---

## 4. CÁC NỘI DUNG KHUYẾN NGHỊ ĐỐI VỚI DOANH NGHIỆP

1. **Đối với đội ngũ Nhân sự C&B:**
   - Cần phổ biến cho toàn bộ nhân sự phụ trách khi thêm dòng hợp đồng `QUIT JOB`: **Tuyệt đối không để cột `INSURANCE SALARY (VND)` là 0**, phải gõ lại mức lương đóng bảo hiểm của người lao động.
2. **Đối với đội ngũ phát triển phần mềm (IT / Vendor):**
   - Đề xuất cập nhật phần mềm HRM để khi người dùng chọn `CONTRACT_TYPE = "QUIT_JOB"` thì hệ thống tự động copy mức lương của hợp đồng trước đó hoặc lương bảo hiểm trong hồ sơ nhân viên sang, không để người dùng phải tự nhớ và nhập tay.
