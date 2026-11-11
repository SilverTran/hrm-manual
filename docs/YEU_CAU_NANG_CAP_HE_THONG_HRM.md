# TÀI LIỆU YÊU CẦU NÂNG CẤP KỸ THUẬT HỆ THỐNG HRM (SIMS V26.10)
> **Kính gửi:** Đội ngũ Lập trình viên / Trưởng nhóm Phát triển Phần mềm HRM  
> **Người lập:** Bộ phận Nghiệp vụ Quản trị Nhân sự & Tiền lương  
> **Ngày lập:** 04/11/2026  
> **Mục tiêu:** Chuẩn hóa toàn bộ 38 màn hình của hệ thống về tính năng Lọc (Filter), Xuất dữ liệu (Export Excel), Đánh số thứ tự (STT) và Định dạng báo cáo (In đậm Tiêu đề + Dòng tổng).

---

## I. TỔNG QUAN 4 HẠNG MỤC NÂNG CẤP BẮT BUỘC

| STT | Hạng mục nâng cấp | Hiện trạng hệ thống | Yêu cầu kỹ thuật cần đạt |
| :---: | :--- | :--- | :--- |
| **1** | **Filter dữ liệu trống (Blanks)** | Hộp lọc cột (`btnFilterByColumn`) tự loại bỏ chuỗi rỗng (`if (mFilterMasterDatas[i].length > 0)`), không có tùy chọn lọc dòng trống. | Bổ sung tùy chọn `(Blanks)` / `(Trống)` ở đầu danh sách lọc trên tất cả các cột. Khi tick chọn, hệ thống lọc ra các dòng có giá trị `NULL` hoặc rỗng `""`. |
| **2** | **Export file Excel toàn hệ thống** | 22 trang có nút trực tiếp; 5 trang có gián tiếp (trong Modal/Trang View/API); còn **11 trang hoàn toàn thiếu xuất Excel**. | Bổ sung nút **Export** trên thanh công cụ của các trang còn thiếu (nhóm 11 trang + nhóm gián tiếp); xuất đúng dữ liệu đang hiển thị và tuân thủ các bộ lọc đang chọn. |
| **3** | **Cột Số thứ tự (STT) khi Export** | File Excel xuất ra bị thiếu cột STT ở cột đầu tiên (Cột A bắt đầu ngay bằng Mã NV hoặc dữ liệu khác), người dùng phải tự chèn cột và kéo số tay. | Tất cả file Excel xuất ra bắt buộc phải có **Cột A là Cột STT (No.)**, tự động đánh số tăng dần từ `1, 2, 3...` đến hết dòng dữ liệu. |
| **4** | **In đậm Tiêu đề và Dòng Tổng** | Tiêu đề cột và Dòng tổng cộng trong file Excel (và một số trang web) đang để font chữ thường, mờ nhạt, khó phân biệt. | **In đậm (`font.bold = true`)** toàn bộ Hàng tiêu đề (Header row) và Hàng Tổng cộng (Total/Summary row ở cuối bảng). |

---

## II. CHI TIẾT KỸ THUẬT CẦN SỬA CHO LẬP TRÌNH VIÊN

### 1. Chi tiết Hạng mục 1: Filter cho dữ liệu trống (Blanks / Empty)
- **Vấn đề mã nguồn hiện tại:**
  Trong file JavaScript xử lý filter chung (`manage_information.js`, `manage_registration.js`, `manage_payroll.js`...), hàm `updateFilter()` đang viết:
  ```javascript
  for (var i = 0; i < mFilterMasterDatas.length; i++) {
      if (mFilterMasterDatas[i].length > 0) {  // <-- Lỗi: Bỏ qua hoàn toàn dữ liệu rỗng!
          data.push({ CONTENT: mFilterMasterDatas[i] });
      }
  }
  ```
- **Giải pháp lập trình:**
  1. **Frontend JS:**
     - Cho phép nhận giá trị rỗng và chèn thêm 1 item cố định ở dòng đầu tiên:  
       `{ CONTENT: '(Blanks)', VALUE: '__BLANK__' }`.
     - Khi người dùng tick chọn `(Blanks)`, gửi chuỗi giá trị `__BLANK__` về server cùng các giá trị khác.
  2. **Backend (SQL Stored Procedure / LINQ query):**
     - Tại các Stored Procedure nhận chuỗi filter:
       ```sql
       -- Nếu chuỗi filter có chứa '__BLANK__':
       WHERE (@FilterVal IS NULL OR ColumnValue IN (SELECT Value FROM dbo.SplitString(@FilterVal, ',')) 
              OR (@HasBlank = 1 AND (ColumnValue IS NULL OR LTRIM(RTRIM(ColumnValue)) = '')))
       ```
- **Ý nghĩa nghiệp vụ:** Giúp nhân sự lọc ngay những người chưa nhập CCCD, chưa có số tài khoản Bank, chưa có ngày vào, chưa có ngày thôi việc, chưa có hợp đồng... mà không phải dò thủ công hàng nghìn dòng.

---

### 2. Chi tiết Hạng mục 2: Rà soát & Phân loại Cơ chế Export Excel toàn bộ 38 trang

Qua rà soát chuyên sâu toàn bộ mã nguồn giao diện HTML, cấu hình `APP_CONFIG`, các cửa sổ Modal/Trang View và thư viện JavaScript của 38 màn hình trên hệ thống SIMS HRM V26.10, hiện trạng tính năng Export được phân loại thành **3 nhóm rõ rệt**:

#### 🟢 NHÓM 1: Các trang ĐÃ CÓ nút Export trực tiếp trên thanh công cụ / bảng chính (22 trang)
Các trang này đã có sẵn các nút `Export`, `EXCEL`, `D/L` trên toolbar ngoài bảng chính:
- **Khối MANAGE (7 trang):** `Registration`, `Information`, `< 7yrs old`, `Benefit Payment`, `Maternity Benefit`, `Pregnancy Exam`, `Leave` (có 4 nút D/L: theo tháng, nhiều ngày, hiếu hỉ, về sớm).
- **Khối ATTENDANCE (13 trang):** `Working hours`, `Attendance (31 ngày)`, `Annual leave`, `Late & leave early`, `OvertimeYear (Năm)`, `Payroll` (có D/L, Template, PAYROLL, EXCEL), `Summary`, `VT Office`, `Stop VT Office`, `Fac Sum`, `Bank` (BIDV), `Cash`, `Severance` (có Export & Bank).
- **Khối EMPLOYEE (2 trang):** `Working hours (OT Over)`, `Payroll (OT Over)`.
> **Nhiệm vụ cho Lập trình viên đối với Nhóm 1:** Không cần tạo thêm nút mới, nhưng **bắt buộc phải sửa lại file xuất ra** theo 2 yêu cầu:
> 1. Thêm **Cột STT (Số thứ tự: 1, 2, 3...)** ở Cột A đầu tiên.
> 2. **In đậm (`font.bold = true`)** toàn bộ Hàng Tiêu đề (Header) và Dòng Tổng cộng (Total/Summary).

---

#### 🟡 NHÓM 2: Các trang ĐÃ CÓ cơ chế Export/Download nhưng nằm GIÁN TIẾP trong Modal, Trang View hoặc mới cấu hình ở API (5 trang)

| STT | Màn hình | URL | Hiện trạng Export thực tế | Yêu cầu kỹ thuật cần xử lý |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Manage > Resignation** | `/hrm/manage/resignation` | • Trong màn hình **DETAIL / VIEW** khi kích hoạt đơn nghỉ việc (`modal-manage`): **ĐÃ CÓ tính năng Print và Export**.<br>• Trong file JS đã khai báo sẵn `APP_CONFIG.PostLinkExport: '/hrm/Api/GetData/PostLinkExport'`. | 1. Chuẩn hóa file Excel xuất từ trang View: bổ sung Cột STT và In đậm tiêu đề.<br>2. **Bổ sung thêm 01 nút `Export` ngay trên thanh công cụ ngoài bảng danh sách chính** để HR có thể xuất báo cáo tổng hợp danh sách nghỉ việc theo khoảng thời gian/bộ lọc mà không phải vào từng trang View. |
| **2** | **Manage > Contract (Terminate)** | `/hrm/manage/contract` | • Đã có nút `Template` (tải mẫu hợp đồng Excel).<br>• Đã có nút `CONTRACT` (tải file văn bản Hợp đồng đã điền thông tin).<br>• Đã có nút `CARD` (xuất file in thẻ nhân viên).<br>• Có nút `Printed check`, `Sign contract`.<br>• JS có sẵn API `PostLinkExport`. | Bổ sung nút **`Export`** danh sách hợp đồng (toàn bộ hoặc theo bộ lọc) ra file Excel bảng tính, có cột STT và in đậm Header/Total. |
| **3** | **Manage > Set Overtime** | `/hrm/manage/set-overtime` | • Thanh công cụ có nút `Template`.<br>• Trong modal chi tiết có nút `EXCEL` (`btnDL_EXCEL`).<br>• JS có sẵn API `PostLinkExport`. | Đưa nút **`Export`** ra thanh công cụ chính để người dùng tải nhanh toàn bộ danh sách đăng ký tăng ca mà không cần mở modal; định dạng chuẩn có STT và in đậm. |
| **4** | **Manage > Warning** | `/hrm/manage/warning` | • Trong mã nguồn JS đã cấu hình sẵn API: `PostLinkExport: '/hrm/Api/GetData/PostLinkExport'`.<br>• Có modal upload thư cảnh cáo (`btnAddFileWarning`).<br>• **Giao diện thanh công cụ đang bị thiếu nút bấm.** | Bổ sung nút **`Export`** lên thanh công cụ (chỉ cần gắn sự kiện gọi API `PostLinkExport` đã có sẵn), kèm chuẩn Cột STT và In đậm tiêu đề. |
| **5** | **Config > Etc** | `/hrm/config/etc` | • Đã có nút `Template` (tải file Excel mẫu để import danh mục). | Bổ sung thêm nút **`Export`** danh sách các danh mục dùng chung hiện có ra Excel (chuẩn có STT, in đậm). |

---

#### 🔴 NHÓM 3: Các trang HOÀN TOÀN CHƯA CÓ tính năng Export ra Excel (11 trang)

Các trang này chưa có nút Export trên giao diện và backend chưa hỗ trợ xuất Excel cho danh sách:

| STT | Màn hình | URL | Loại nghiệp vụ | Yêu cầu lập trình |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Attendance > Overtime** | `/hrm/attendance/overtime` | Chi tiết tăng ca theo ngày (Config JS đã có `PostLinkExport` nhưng UI chưa có nút). | Bổ sung nút `Export` trên thanh công cụ, xuất bảng chi tiết tăng ca ngày có STT và in đậm. |
| **2** | **Config > Section** | `/hrm/config/section` | Sơ đồ Phòng ban / Xưởng / Tổ chuyền | Thêm nút `Export` danh mục cơ cấu tổ chức & chức danh ra Excel. |
| **3** | **Config > Shift** | `/hrm/config/shift` | Cấu hình Ca làm việc & Giờ quy chuẩn | Thêm nút `Export` danh sách ca làm việc ra Excel. |
| **4** | **Config > Schedule** | `/hrm/config/schedule` | Lịch phân ca theo tháng của công nhân | Thêm nút `Export` bảng ma trận lịch phân ca ra Excel. |
| **5** | **Config > Holiday** | `/hrm/Config/Holiday` | Lịch ngày nghỉ Lễ / Tết hưởng lương | Thêm nút `Export` danh mục ngày lễ theo năm ra Excel. |
| **6** | **Config > Lock / Work hours** | `/hrm/config/lock-working-hours` | Lịch sử chốt công / khóa lương tháng | Thêm nút `Export` nhật ký khóa công ra Excel. |
| **7** | **Config > Leave elderly** | `/hrm/config/leave-elderly` | Danh sách công nhân hưởng chế độ người già | Thêm nút `Export` danh sách đối tượng người già ra Excel. |
| **8** | **Config > Config** | `/hrm/config/config` | Cấu hình tham số hệ thống | Thêm nút `Export` danh sách tham số cấu hình ra Excel. |
| **9** | **Admin > Account** | `/hrm/admin/account` | Danh sách tài khoản & Phân quyền User Group | Thêm nút `Export` danh sách tài khoản & quyền ra Excel. |
| **10** | **Admin > Login history** | `/hrm/admin/login-history` | Nhật ký đăng nhập, IP, thiết bị | Thêm nút `Export` nhật ký truy cập ra Excel phục vụ kiểm toán IT. |
| **11** | **Admin > White list** | `/hrm/admin/white-list` | Danh sách IP mạng nội bộ cho phép | Thêm nút `Export` danh sách dải IP được cấp phép ra Excel. |

---

### 3. Chi tiết Hạng mục 3: Thêm Cột STT (Số thứ tự) khi Export Excel
- **Vấn đề mã nguồn hiện tại:**
  Khi Controller xuất file Excel (thông qua EPPlus / NPOI / ClosedXML), mảng dữ liệu đổ trực tiếp từ Data Reader / DataTable ra Worksheet bắt đầu từ Cột 1 là Mã NV hoặc Cột dữ liệu đầu tiên. Hoàn toàn không có cột đếm số thứ tự.
- **Giải pháp lập trình:**
  - Tại code backend tạo file Excel:
    ```csharp
    // 1. Thêm Header cột đầu tiên
    ws.Cells[headerRow, 1].Value = "STT";
    ws.Cells[headerRow, 1].Style.Font.Bold = true;
    ws.Cells[headerRow, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
    
    // 2. Chạy vòng lặp ghi số thứ tự tự tăng từ 1..N
    int stt = 1;
    for (int r = startDataRow; r <= endDataRow; r++)
    {
        ws.Cells[r, 1].Value = stt++;
        ws.Cells[r, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
    }
    ```

---

### 4. Chi tiết Hạng mục 4: Định dạng In Đậm (Bold) cho Tiêu đề & Dòng Tổng
- **Vấn đề mã nguồn hiện tại:**
  - File Excel xuất ra không thiết lập thuộc tính in đậm cho hàng tiêu đề (`Header`) và hàng tổng cộng (`Total/Summary`), dẫn đến file nhìn đơn điệu, in ra giấy khó phân biệt giữa dòng dữ liệu và dòng tổng kết.
  - Trên web: Một số bảng không có dòng `<tfoot>` tổng kết, hoặc chữ tổng bị mảnh.
- **Giải pháp lập trình:**
  ```csharp
  // 1. IN ĐẬM DÒNG TIÊU ĐỀ (HEADER)
  using (var range = ws.Cells[headerRow, 1, headerRow, totalColumns])
  {
      range.Style.Font.Bold = true;
      range.Style.Fill.PatternType = ExcelFillStyle.Solid;
      range.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 241, 250)); // Nền xám xanh nhẹ
      range.Style.Border.Top.Style = ExcelBorderStyle.Thin;
      range.Style.Border.Bottom.Style = ExcelBorderStyle.Medium;
  }
  
  // 2. IN ĐẬM DÒNG TỔNG CỘNG (TOTAL / SUMMARY) Ở CUỐI BẢNG
  int totalRow = endDataRow + 1;
  ws.Cells[totalRow, 1].Value = "TỔNG CỘNG / TOTAL";
  using (var range = ws.Cells[totalRow, 1, totalRow, totalColumns])
  {
      range.Style.Font.Bold = true;
      range.Style.Border.Top.Style = ExcelBorderStyle.Thin;
      range.Style.Border.Bottom.Style = ExcelBorderStyle.Double; // Chuẩn kế toán: Viền dưới nét đôi
  }
  ```

---

## III. BẢNG KIỂM KÊ VÀ DANH SÁCH CHI TIẾT 38 MÀN HÌNH

Dưới đây là ma trận phân tích trạng thái và nhiệm vụ cần thực hiện cho toàn bộ 38 màn hình của hệ thống:

### 1. Khối Quản trị Nhân sự & Hồ sơ (MANAGE - 11 Màn hình)

| STT | Màn hình | Đường dẫn URL | 1. Filter Blanks | 2. Export Excel | 3. Cột STT trong Excel | 4. In đậm Header & Total | Ưu tiên |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | **Registration** | `/hrm/manage/registration` | Cần thêm option Blanks | Đã có nút (Cần chuẩn hóa) | **Bổ sung cột STT** | **In đậm Header & Total** | **CAO** |
| 2 | **Information** | `/hrm/manage/information` | Cần thêm option Blanks | Đã có nút (Cần chuẩn hóa) | **Bổ sung cột STT** | **In đậm Header & Total** | **CỰC CAO** |
| 3 | **Contract (Terminate)** | `/hrm/manage/contract` | Cần thêm option Blanks | Đã có Template, CONTRACT, CARD (Cần thêm nút Export danh sách) | **Bổ sung cột STT** | **In đậm Header & Total** | **CỰC CAO** |
| 4 | **QUIT JOB** (trong Contract) | `/hrm/manage/contract` | Cần thêm option Blanks | Đã có Export | **Bổ sung cột STT** | **In đậm Header & Total** | **CỰC CAO** |
| 5 | **Resignation** | `/hrm/manage/resignation` | Cần thêm option Blanks | Đã có Export/Print trong View (Cần thêm nút Export tổng ngoài bảng) | **Bổ sung cột STT** | **In đậm Header & Total** | **CAO** |
| 6 | **Leave** | `/hrm/manage/leave` | Cần thêm option Blanks | Đã có 4 nút D/L (Tháng, nhiều ngày, hiếu hỉ, về sớm) | **Bổ sung cột STT** | **In đậm Header & Total** | **CỰC CAO** |
| 7 | **Set Overtime** | `/hrm/manage/set-overtime` | Cần thêm option Blanks | Đã có Template ngoài, EXCEL trong modal (Cần thêm nút Export toolbar) | **Bổ sung cột STT** | **In đậm Header & Total** | **CAO** |
| 8 | **< 7yrs old** | `/hrm/manage/7yrs-old` | Cần thêm option Blanks | Đã có nút Export | **Bổ sung cột STT** | **In đậm Header & Total** | Trung bình |
| 9 | **Benefit Payment** | `/hrm/Manage/BenefitPayment` | Cần thêm option Blanks | Đã có nút EXCEL | **Bổ sung cột STT** | **In đậm Header & Total** | Trung bình |
| 10 | **Maternity Benefit** | `/hrm/Manage/MaternityBenefit`| Cần thêm option Blanks | Đã có nút Export & EXCEL | **Bổ sung cột STT** | **In đậm Header & Total** | Trung bình |
| 11 | **Pregnancy Exam** | `/hrm/Manage/PregnancyExam` | Cần thêm option Blanks | Đã có nút Export & EXCEL | **Bổ sung cột STT** | **In đậm Header & Total** | Trung bình |
| 12 | **Warning** | `/hrm/manage/warning` | Cần thêm option Blanks | 🟡 Đã có API PostLinkExport nhưng thiếu nút UI (Cần thêm nút Export) | **Thêm cột STT** | **In đậm Header** | **CAO** |

---

### 2. Khối Chấm công, Bảng lương & Ngân hàng (ATTENDANCE - 14 Màn hình)

| STT | Màn hình | Đường dẫn URL | 1. Filter Blanks | 2. Export Excel | 3. Cột STT trong Excel | 4. In đậm Header & Total | Ưu tiên |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 13 | **Working hours** | `/hrm/attendance/working-hours` | Cần thêm option Blanks | Đã có nút D/L & Export | **Bổ sung cột STT** | **In đậm Header & Total** | **CỰC CAO** |
| 14 | **Attendance (31 ngày)**| `/hrm/attendance/attendance` | Cần thêm option Blanks | Đã có nút D/L Attendance | **Bổ sung cột STT** | **In đậm Header & Total** | **CỰC CAO** |
| 15 | **Payroll (Bảng lương)**| `/hrm/attendance/payroll` | Cần thêm option Blanks | Đã có nút D/L Payroll | **Bổ sung cột STT** | **In đậm Header & Total** | **CỰC CAO** |
| 16 | **Payroll Stopped** | `/hrm/attendance/payroll` (tab) | Cần thêm option Blanks | Đã có nút Export | **Bổ sung cột STT** | **In đậm Header & Total** | **CỰC CAO** |
| 17 | **BANK-BIDV** | `/hrm/Attendance/Bank` | Cần thêm option Blanks | Đã có nút Export | **Bổ sung cột STT** | **In đậm Header & Total** | **CỰC CAO** |
| 18 | **Cash** | `/hrm/Attendance/Cash` | Cần thêm option Blanks | Đã có nút Export | **Bổ sung cột STT** | **In đậm Header & Total** | **CỰC CAO** |
| 19 | **Severance (Thôi việc)**| `/hrm/Attendance/Severance`| Cần thêm option Blanks | Đã có nút Export & Bank | **Bổ sung cột STT** | **In đậm Header & Total** | **CAO** |
| 20 | **Annual Leave** | `/hrm/attendance/annual-leave` | Cần thêm option Blanks | Đã có nút D/L | **Bổ sung cột STT** | **In đậm Header & Total** | **CAO** |
| 21 | **Overtime (Chi tiết)** | `/hrm/attendance/overtime` | Cần thêm option Blanks | 🟡 Đã có API PostLinkExport nhưng thiếu nút UI (Cần thêm nút Export) | **Thêm cột STT** | **In đậm Header & Total** | **CAO** |
| 22 | **OvertimeYear (Năm)** | `/hrm/Attendance/OvertimeYear` | Cần thêm option Blanks | Đã có nút Export | **Bổ sung cột STT** | **In đậm Header & Total** | Trung bình |
| 23 | **Late & Leave early** | `/hrm/Attendance/LateOrLeaveEarly` | Cần thêm option Blanks | Đã có nút EXCEL | **Bổ sung cột STT** | **In đậm Header & Total** | Trung bình |
| 24 | **Fac Sum** | `/hrm/Attendance/FacSum` | Cần thêm option Blanks | Đã có nút Export | **Bổ sung cột STT** | **In đậm Header & Total** | Trung bình |
| 25 | **Summary** | `/hrm/Attendance/Summary` | Cần thêm option Blanks | Đã có nút Export | **Bổ sung cột STT** | **In đậm Header & Total** | Trung bình |
| 26 | **VT Office / Stop VT** | `/hrm/Attendance/VTOffice` | Cần thêm option Blanks | Đã có nút Export | **Bổ sung cột STT** | **In đậm Header & Total** | Trung bình |

---

### 3. Khối Nhân sự Tăng ca Ngoài định mức (EMPLOYEE - 2 Màn hình)

| STT | Màn hình | Đường dẫn URL | 1. Filter Blanks | 2. Export Excel | 3. Cột STT trong Excel | 4. In đậm Header & Total | Ưu tiên |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 27 | **Working hours (OT Over)**| `/hrm/employee/working-hours`| Cần thêm option Blanks | Đã có nút D/L | **Bổ sung cột STT** | **In đậm Header & Total** | **CAO** |
| 28 | **Payroll (OT Over)** | `/hrm/employee/payroll` | Cần thêm option Blanks | Đã có nút D/L | **Bổ sung cột STT** | **In đậm Header & Total** | **CAO** |

---

### 4. Khối Cấu hình Hệ thống (CONFIG - 8 Màn hình)

| STT | Màn hình | Đường dẫn URL | 1. Filter Blanks | 2. Export Excel | 3. Cột STT trong Excel | 4. In đậm Header & Total | Ưu tiên |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 29 | **Section (Phòng ban/Tổ)**| `/hrm/config/section` | Cần thêm option Blanks | 🔴 **CHƯA CÓ: Cần thêm nút Export** | **Thêm cột STT** | **In đậm Header** | **CAO** |
| 30 | **Shift (Ca làm việc)** | `/hrm/config/shift` | Cần thêm option Blanks | 🔴 **CHƯA CÓ: Cần thêm nút Export** | **Thêm cột STT** | **In đậm Header** | **CAO** |
| 31 | **Schedule (Phân ca)** | `/hrm/config/schedule` | Cần thêm option Blanks | 🔴 **CHƯA CÓ: Cần thêm nút Export** | **Thêm cột STT** | **In đậm Header** | **CAO** |
| 32 | **Holiday (Lễ Tết)** | `/hrm/Config/Holiday` | Cần thêm option Blanks | 🔴 **CHƯA CÓ: Cần thêm nút Export** | **Thêm cột STT** | **In đậm Header** | Trung bình |
| 33 | **Lock / Work hours** | `/hrm/config/lock-working-hours`| Cần thêm option Blanks | 🔴 **CHƯA CÓ: Cần thêm nút Export** | **Thêm cột STT** | **In đậm Header** | Trung bình |
| 34 | **Leave / Elderly** | `/hrm/config/leave-elderly` | Cần thêm option Blanks | 🔴 **CHƯA CÓ: Cần thêm nút Export** | **Thêm cột STT** | **In đậm Header** | Thấp |
| 35 | **Config (Tham số)** | `/hrm/config/config` | Cần thêm option Blanks | 🔴 **CHƯA CÓ: Cần thêm nút Export** | **Thêm cột STT** | **In đậm Header** | Thấp |
| 36 | **Etc (Danh mục khác)**| `/hrm/config/etc` | Cần thêm option Blanks | Đã có Template (Cần thêm nút Export danh mục ra Excel) | **Bổ sung cột STT** | **In đậm Header** | Thấp |

---

### 5. Khối Quản trị Người dùng (ADMIN - 3 Màn hình)

| STT | Màn hình | Đường dẫn URL | 1. Filter Blanks | 2. Export Excel | 3. Cột STT trong Excel | 4. In đậm Header & Total | Ưu tiên |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 37 | **Account (Tài khoản)** | `/hrm/admin/account` | Cần thêm option Blanks | 🔴 **CHƯA CÓ: Cần thêm nút Export** | **Thêm cột STT** | **In đậm Header** | Trung bình |
| 38 | **Login history** | `/hrm/admin/login-history` | Cần thêm option Blanks | 🔴 **CHƯA CÓ: Cần thêm nút Export** | **Thêm cột STT** | **In đậm Header** | Thấp |
| 39 | **White list** | `/hrm/admin/white-list` | Cần thêm option Blanks | 🔴 **CHƯA CÓ: Cần thêm nút Export** | **Thêm cột STT** | **In đậm Header** | Thấp |

---

## IV. LỘ TRÌNH VÀ THỨ TỰ ƯU TIÊN THỰC HIỆN

Để không làm gián đoạn vận hành của nhà máy và phòng Nhân sự, kiến nghị chia làm 2 đợt triển khai:

### Đợt 1: Xử lý nhóm Ưu tiên Cực cao (Core Business - Hoàn thành trước)
1. **Module Tiền lương & Ngân hàng:**
   - `Attendance > Payroll` (Bảng lương Working & Stopped).
   - `Attendance > Bank` (BIDV) & `Attendance > Cash`.
   - `Attendance > Working hours` & `Attendance > Attendance` (Bảng công).
   - *Yêu cầu bắt buộc:* Bổ sung Cột STT, In đậm Header và Dòng Tổng cộng trong file Excel; Filter dữ liệu rỗng.
2. **Module Hồ sơ & Hợp đồng:**
   - `Manage > Information` & `Manage > Contract (QUIT JOB)` & `Manage > Registration`.
   - *Yêu cầu bắt buộc:* Filter dữ liệu trống để lọc ngay nhân sự thiếu CCCD, thiếu tài khoản ngân hàng, thiếu hạn hợp đồng; Export có cột STT in đậm.

### Đợt 2: Xử lý nhóm Cấu hình & Bổ sung các trang chưa có Export
1. Bổ sung nút Export lên thanh công cụ cho các màn hình:
   - **Nhóm đã có API hoặc có trong Modal nhưng cần đưa ra Toolbar:** `Resignation` (thêm nút ngoài bảng), `Contract` (thêm xuất danh sách), `Set Overtime` (đưa ra toolbar), `Warning` (gắn nút gọi PostLinkExport đã có), `Attendance > Overtime` (gắn nút gọi PostLinkExport đã có), `Config > Etc` (thêm xuất danh mục).
   - **Nhóm 10 trang cấu hình & admin hoàn toàn thiếu:** `Shift`, `Section`, `Schedule`, `Holiday`, `Lock / Work hours`, `Leave / Elderly`, `Config`, `Account`, `Login history`, `White list`.
2. Chuẩn hóa toàn bộ cơ chế Filter `(Blanks)` dùng chung vào thư viện JS dùng chung của hệ thống.

---
*Tài liệu này được biên soạn trên cơ sở khảo sát trực tiếp mã nguồn giao diện DOM và luồng API thực tế của hệ thống SIMS HRM V26.10.*
