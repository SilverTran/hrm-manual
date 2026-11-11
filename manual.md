# CẨM NANG HƯỚNG DẪN SỬ DỤNG HỆ THỐNG HRM (SIMS V26.10)

> **Dành cho:** Nhân viên mới, Quản lý xưởng/chuyền, Chuyên viên Nhân sự & Tiền lương (C&B), Quản trị viên (Admin).  
> **Phiên bản:** SIMS HRM V26.10  
> **Trang xem trực quan (Web tĩnh):** Mở file [`index.html`](file:///D:/SVG/AI_Agent/manual/HRM/index.html) trực tiếp bằng trình duyệt.

---

## 1. MỤC LỤC NHANH (BẠN MUỐN LÀM GÌ?)

1. [Đăng nhập & Làm quen giao diện Tiếng Anh](#1-đăng-nhập--làm-quen-giao-diện-tiếng-anh)
2. [Tiếp nhận & Kích hoạt nhân viên mới](#2-tiếp-nhận--kích-hoạt-nhân-viên-mới)
3. [Ký hợp đồng lao động & In thẻ nhân viên](#3-ký-hợp-đồng-lao-động--in-thẻ-nhân-viên)
4. [Khai báo Thôi việc / Nghỉ ngang (Tránh lỗi mất lương bảo hiểm)](#4-khai-báo-thôi-việc--nghỉ-ngang-trọng-tâm)
5. [Đăng ký tăng ca trước (Set Overtime)](#5-đăng-ký-tăng-ca-trước-set-overtime)
6. [Đăng ký nghỉ phép (Leave)](#6-đăng-ký-nghỉ-phép-leave)
7. [Đồng bộ vân tay & Tính giờ công (Working hours)](#7-đồng-bộ-vân-tay--tính-giờ-công-working-hours)
8. [Tính bảng lương tự động hàng tháng (Salary Calculation)](#8-tính-bảng-lương-tự-động-hàng-tháng-payroll)
9. [Tính & Xem lương người Thôi việc / Nghỉ ngang (Tab Stopped)](#9-tính--xem-lương-người-thôi-việc--nghỉ-ngang-tab-stopped)
10. [Chốt khóa bảng lương & In phiếu lương (Payslip)](#10-chốt-khóa-bảng-lương--in-phiếu-lương-payslip)
11. [Xuất file chuyển khoản BIDV & Ký nhận tiền mặt](#11-xuất-file-chuyển-khoản-bidv--ký-nhận-tiền-mặt)
12. [Bảng tra cứu thuật ngữ Tiếng Anh trên hệ thống](#12-bảng-tra-cứu-thuật-ngữ-tiếng-anh-trên-hệ-thống)
13. [Giải đáp sự cố & Câu hỏi thường gặp (FAQ)](#13-giải-đáp-sự-cố--câu-hỏi-thường-gặp-faq)

---

## 2. NỘI DUNG HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC

### 1. Đăng nhập & Làm quen giao diện Tiếng Anh
> ⚠️ **LƯU Ý QUAN TRỌNG VỀ NGÔN NGỮ:**  
> Hệ thống HRM hiện tại **hiển thị 100% bằng tiếng Anh** (thành phần chuyển đổi ngôn ngữ trên trang web đang bị ẩn và endpoint máy chủ trả về 404). Người dùng không cần tìm nút đổi tiếng Việt. Toàn bộ tài liệu bên dưới đã ánh xạ chuẩn xác từng nút bấm tiếng Anh thực tế trên màn hình.

- **Đăng nhập:** Mở cổng thông tin hệ thống SIMS HRM nội bộ
- **Bước 1:** Nhập **User ID** (tài khoản) và **Password** (mật khẩu).
- **Bước 2:** Bấm nút tròn màu xanh có mũi tên `➔` bên phải ô mật khẩu để đăng nhập.
- **Bước 3:** Sau khi đăng nhập thành công, bạn sẽ vào màn hình Dashboard với thanh menu ngang ở trên cùng gồm: `MANAGE`, `ATTENDANCE`, `EMPLOYEE`, `CONFIG`, `ADMIN`.

---

### 2. Tiếp nhận & Kích hoạt nhân viên mới
- **Vị trí Menu:** `MANAGE › Registration`
- **Bước 1:** Bấm nút **Sync employee** để lấy mã vân tay nhân viên mới từ máy chấm công.
- **Bước 2:** Tại dòng nhân viên mới, bấm nút màu xanh **MANAGE**.
- **Bước 3:** Nhập: Họ tên, CCCD, chọn Phòng ban, Chức vụ, Ca làm việc, nhập mức Lương bảo hiểm (`Insurance salary`) và Xăng xe (`Gasoline`).
- **Bước 4:** Bấm **LƯU**.

---

### 3. Ký hợp đồng lao động & In thẻ nhân viên
- **Vị trí Menu:** `MANAGE › Contract (Terminate)`
- **Bước 1:** Tại dòng nhân viên cần ký hợp đồng, bấm nút **MANAGE**.
- **Bước 2:** Bấm **ADD CONTRACT**.
- **Bước 3:** Chọn loại hợp đồng (Thử việc 2 tháng, 1 năm, KTH), ngày hiệu lực, nhập mức lương bảo hiểm.
- **Bước 4:** Bấm **CREATE**.
- **Bước 5 (In hợp đồng/thẻ):** Tick chọn nhân sự ở bảng ngoài, bấm nút **CONTRACT** để tải file in, hoặc nút **CARD** để in thẻ đeo.

---

### 4. Khai báo Thôi việc / Nghỉ ngang (TRỌNG TÂM)
> ⚠️ **CẢNH BÁO:** Hệ thống tự điền cột mức lương mặc định là `0`. **Bắt buộc phải gõ lại mức lương đóng bảo hiểm**, nếu không bảng lương tháng đó sẽ bị mất dữ liệu ở 2 cột `Insurance Salary` và `Basic Salary`!

- **Vị trí Menu:** `MANAGE › Contract (Terminate)`
- **Bước 1:** Tìm nhân viên nghỉ việc, bấm **MANAGE**.
- **Bước 2:** Bấm **ADD CONTRACT**.
- **Bước 3:** Tại cột `TYPE`, chọn **`QUIT JOB`**.
- **Bước 4:** Tại cột `FROM / TO`, chọn ngày bắt đầu nghỉ.
- **Bước 5 (QUYẾT ĐỊNH):** Tại cột `INSURANCE SALARY (VND)`, nhấp vào và nhập đúng mức lương đóng bảo hiểm (ví dụ: `10,000,000`).
- **Bước 6:** Tại cột `REMARK`, nhập lý do (ví dụ: *Nghỉ ngang* hoặc *Nghỉ có đơn*). Bấm **CREATE**.

---

### 5. Đăng ký tăng ca trước (Set Overtime)
- **Vị trí Menu:** `MANAGE › Set Overtime`
- **Bước 1:** Chọn Ngày và Bộ phận cần tăng ca.
- **Bước 2:** Bấm **Add**, tick chọn những nhân viên tham gia.
- **Bước 3:** Nhập giờ bắt đầu và giờ kết thúc (ví dụ: 17:00 ~ 20:00). Bấm **LƯU**.

---

### 6. Đăng ký nghỉ phép (Leave)
- **Vị trí Menu:** `MANAGE › Leave`
- **Cách 1 (Ít người):** Bấm **Add**, chọn nhân viên, ngày nghỉ, loại nghỉ (Phép năm, ốm, việc riêng có lương...) và bấm Lưu.
- **Cách 2 (Nhiều người bằng Excel):** Bấm **Template Leave (Multi-day)** tải file mẫu về điền, sau đó bấm **Import Leave (Multi-day)** để tải lên.

---

### 7. Đồng bộ vân tay & Tính giờ công (Working hours)
- **Vị trí Menu:** `ATTENDANCE › Working hours`
- **Bước 1:** Chọn Năm và Tháng cần xử lý công.
- **Bước 2:** Bấm **Sync data** để kéo toàn bộ lần quẹt thẻ từ máy chấm công về máy chủ.
- **Bước 3:** Bấm nút màu xanh lá **Calculation** để phần mềm tự tính giờ công chuẩn và giờ tăng ca.

---

### 8. Tính bảng lương tự động hàng tháng (Payroll)
- **Vị trí Menu:** `ATTENDANCE › Payroll`
- **Bước 1:** Chọn Năm và Tháng cần tính lương.
- **Bước 2:** Để ô trạng thái là **`Working`** (người đang làm).
- **Bước 3:** Bấm nút màu xanh **Salary Calculation** (chờ 3-5 giây để hệ thống tính toàn bộ công ty).
- **Bước 4 (Sửa phụ cấp):** Nhấp trực tiếp vào ô cần sửa (Thưởng, Tiền ăn, Khác...).
- **Bước 5 (Tính lại người vừa sửa):** Tick chọn dòng người vừa sửa, bấm nút **RE-CALC** ở cuối trang.

---

### 9. Tính & Xem lương người Thôi việc / Nghỉ ngang (Tab Stopped)
- **Vị trí Menu:** `ATTENDANCE › Payroll`
- **Bước 1:** Tại ô chọn trạng thái nhân viên (cạnh ô chọn Tháng), **chọn `Stopped`** thay vì `Working`.
- **Bước 2:** Bấm **Search** (hoặc bấm **Salary Calculation**).
- **Bước 3:** Bảng lương chỉ hiển thị những nhân sự nghỉ việc với số công thực tế trước ngày nghỉ.
- **Bước 4 (Gán tuần chi trả):** Tại cột cuối, bấm nút **Choose Week** để chọn tuần giải ngân tiền cho người nghỉ việc.

---

### 10. Chốt khóa bảng lương & In phiếu lương (Payslip)
- **Vị trí Menu:** `ATTENDANCE › Payroll`
- **Khóa bảng lương:** Khi đã duyệt xong số tiền, tick chọn tất cả nhân viên, bấm nút **Lock** để đóng băng dữ liệu.
- **In phiếu lương (Payslip):** Bấm nút **D/L**, chọn **Main (PDF)** để xuất phiếu lương phát cho từng người.

---

### 11. Xuất file chuyển khoản BIDV & Ký nhận tiền mặt
- **Chuyển khoản BIDV:** Vào `ATTENDANCE › Bank`, chọn Tháng lương, bấm **Export** tải file nộp ngân hàng.
- **Ký nhận tiền mặt:** Vào `ATTENDANCE › Cash`, chọn Tháng lương, bấm **Export** in danh sách ký nhận tay.

---

### 12. Bảng tra cứu thuật ngữ Tiếng Anh trên hệ thống

| Nhãn tiếng Anh trên Web | Ý nghĩa Tiếng Việt | Nơi xuất hiện |
| :--- | :--- | :--- |
| **Registration** | Tiếp nhận & Đăng ký nhân viên mới | Menu `MANAGE` |
| **Information** | Hồ sơ lý lịch & Tài khoản ngân hàng | Menu `MANAGE` |
| **Contract (Terminate)** | Quản lý hợp đồng & Khai báo thôi việc | Menu `MANAGE` |
| **QUIT JOB** | Nghỉ việc / Thôi việc / Nghỉ ngang | Cột loại hợp đồng |
| **Set Overtime** | Đăng ký kế hoạch tăng ca trước | Menu `MANAGE` |
| **Leave** | Quản lý & Đăng ký nghỉ phép | Menu `MANAGE` |
| **Working hours** | Tính toán bảng giờ công thực tế | Menu `ATTENDANCE` |
| **Sync data** | Đồng bộ dữ liệu quẹt thẻ từ máy chấm công | Trang `Working hours` |
| **Calculation** | Chạy tính công tự động | Trang `Working hours` |
| **Payroll** | Bảng thanh toán lương tổng hợp | Menu `ATTENDANCE` |
| **Salary Calculation** | Chạy tính lương toàn công ty | Trang `Payroll` |
| **Working / Stopped** | Đang làm việc / Đã thôi việc | Bộ lọc trạng thái trên `Payroll` |
| **RE-CALC** | Tính lại lương cho các dòng được tick chọn | Cuối trang `Payroll` |
| **Lock / Unlock** | Khóa dữ liệu bảng lương / Mở khóa | Trang `Payroll` |
| **Severance** | Trợ cấp thôi việc | Menu `ATTENDANCE` |
| **Bank / Cash** | Danh sách nhận lương qua BIDV / Tiền mặt | Menu `ATTENDANCE` |

---

## 3. GIẢI ĐÁP SỰ CỐ & CÂU HỎI THƯỜNG GẶP (FAQ)

### Q1: Công nhân đã nghỉ việc nhưng tại sao vẫn hiển thị trong danh sách đi làm (Working)?
- **Trả lời:** Do chưa tạo dòng hợp đồng `QUIT JOB` trong trang `Manage › Contract (Terminate)`. Chỉ khi tạo dòng này, hệ thống mới tự chuyển người đó sang nhóm `Stopped`.

### Q2: Tại sao nhấp chuột vào ô tiền lương trên bảng Payroll không thể chỉnh sửa được?
- **Trả lời:** Do bảng lương tháng đó đã bấm nút **Lock** (Khóa). Cần tài khoản Admin vào chọn nhân viên và bấm **Unlock** (Mở khóa) trước khi sửa.

---

## 4. TÍCH HỢP CHATBOT TRA CỨU & GỬI YÊU CẦU GOOGLE SHEET

Trang web [`index.html`](file:///D:/SVG/AI_Agent/manual/HRM/index.html) đã được tích hợp sẵn một Widget nổi ở góc dưới bên phải màn hình:
1. **🤖 Trợ lý tra cứu tức thì:** Trả lời tự động các câu hỏi thường gặp về HRM (lỗi mất lương thôi việc, tăng ca, tính công, khóa lương,...).
2. **📝 Form gửi yêu cầu ẩn danh:**
   - Người dùng **hoàn toàn ẩn danh, không cần tài khoản GitHub hay Google**.
   - Nhập: *Nội dung yêu cầu / thắc mắc* (bắt buộc), *Tên Zalo / SĐT* (tùy chọn để liên hệ lại), *Tên Công ty / Xưởng* (tùy chọn).
   - Yêu cầu được gửi tự động và lưu trữ vào **Google Sheet** của Quản trị viên.
   - Hướng dẫn cấu hình kết nối có tại: [`GOOGLE_SHEET_GUIDE.md`](file:///D:/SVG/AI_Agent/manual/HRM/GOOGLE_SHEET_GUIDE.md) và mã nguồn tại [`google_sheet_setup.js`](file:///D:/SVG/AI_Agent/manual/HRM/google_sheet_setup.js).

---

## 5. CẤU TRÚC THƯ MỤC CÁC TÀI NGUYÊN ĐÍNH KÈM

```
D:\SVG\AI_Agent\manual\HRM\
├── index.html                     # Trang web hướng dẫn sử dụng HRM trực quan (chạy offline hoặc deploy Web)
├── manual.md                      # File cẩm nang hướng dẫn văn bản chi tiết (file này)
├── README.md                      # Hướng dẫn chạy và deploy lên GitHub Pages
├── GOOGLE_SHEET_GUIDE.md          # Hướng dẫn cấu hình Google Sheet nhận phản hồi
├── google_sheet_setup.js          # Mã nguồn Google Apps Script Web App
├── docs/                          # Tài liệu khảo sát và thiết kế quy trình HRM
│   └── onboarding/
│       ├── 00_SYSTEM_AUDIT.md     # Báo cáo khảo sát thực tế 38 màn hình
│       ├── 01_FEATURE_INVENTORY.md# Bảng kiểm kê 53 chức năng chi tiết
│       ├── 02_ONBOARDING_PLAN.md  # Kế hoạch hướng dẫn theo hành trình
│       ├── 03_CONTENT_CHECKLIST.md# Biên bản tự kiểm thử qua 5 Persona
│       └── 04_TEST_REPORT.md      # Báo cáo kiểm thử đối chiếu ngược
└── pages/                         # Bản crawl 38 màn hình HTML thực tế phục vụ đối soát
```
