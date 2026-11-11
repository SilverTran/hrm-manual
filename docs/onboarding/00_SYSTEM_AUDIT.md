# 00 - KHẢO SÁT TOÀN DIỆN HỆ THỐNG HRM (SYSTEM AUDIT)

**Hệ thống khảo sát:** SIMS - HRM Version 26.10  
**Địa chỉ truy cập khảo sát:** Hệ thống HRM nội bộ  
**Thời gian thực hiện khảo sát:** Ngày 03/11/2026  
**Phương pháp khảo sát:** Thu thập cấu trúc DOM thực tế (HTML crawl), phân tích mã nguồn client (Javascript bundle), kiểm tra các endpoint API backend thực tế, phân tích dữ liệu đối soát trên hệ thống đang chạy.

---

## 1. TỔNG QUAN CÔNG NGHỆ VÀ GIAO DIỆN

- **Nền tảng Backend:** Microsoft IIS 10.0, ASP.NET MVC 5.2, .NET Framework 4.0.30319.
- **Frontend Framework & Thư viện:**
  - Base Theme: Material Design Admin (Super Admin v2.1, dark/themed layout `data-sa-theme="4"`).
  - Thư viện thao tác: jQuery 3.x, Popper.js, Bootstrap 4.
  - Xử lý bảng dữ liệu: DataTables tùy biến cao (hỗ trợ filter theo cột, sort, kéo dãn kích thước cột, phân trang máy chủ).
  - Form & Input: Select2 (dropdown tìm kiếm), Flatpickr (chọn ngày tháng), AutoNumeric / Custom format tiền tệ và phân cách hàng nghìn.
  - Bộ icon: Material Design Iconic Font (`zmdi`).
- **Cơ chế xác thực & Phân quyền:**
  - Đăng nhập phiên làm việc thông qua form POST `ID` & `PASSWORD`, quản lý bằng Cookie phiên `ASP.NET_SessionId`.
  - Phân quyền theo Nhóm tài khoản (`User Group`) và cờ phân quyền thao tác (`PER_EDIT = 1` hoặc `0`), điều khiển hiển thị/ẩn các nút hành động (Add, Edit, Delete, Lock, Calculate).
- **Ngôn ngữ giao diện hệ thống:** Hiện tại hiển thị 100% bằng **Tiếng Anh (English Interface)**. Trên mã HTML trang Login có thành phần chọn ngôn ngữ nhưng đã bị ẩn (`class="language hidden"`) và đường dẫn API `/hrm/language` trả về lỗi HTTP 404 (chưa hỗ trợ đa ngôn ngữ). Do đó, toàn bộ quy trình và tài liệu hướng dẫn được thiết kế theo phương pháp **đối chiếu trực tiếp các nhãn/nút bấm tiếng Anh thực tế** và giải thích ngắn gọn bằng tiếng Việt.

---

## 2. PHÂN RÃ CÁC MODULE VÀ MÀN HÌNH HOẠT ĐỘNG

Hệ thống được chia thành 5 nhóm module chính với 38 màn hình nghiệp vụ đang hoạt động thực tế:

```
[HRM SYSTEM V26.10]
├── 1. MANAGE (Quản lý hồ sơ nhân sự)
│   ├── Registration (/hrm/manage/registration)
│   ├── Information (/hrm/manage/information)
│   ├── Contract (Terminate) (/hrm/manage/contract)
│   ├── Resignation (/hrm/manage/resignation)
│   ├── < 7yrs old (/hrm/manage/7yrs-old)
│   ├── Warning (/hrm/manage/warning)
│   ├── Set Overtime (/hrm/manage/set-overtime)
│   ├── Leave (/hrm/manage/leave)
│   ├── Pregnancy Examination (/hrm/Manage/PregnancyExam)
│   ├── Maternity Benefit (/hrm/Manage/MaternityBenefit)
│   └── Benefit Payment (/hrm/Manage/BenefitPayment)
│
├── 2. ATTENDANCE (Chấm công & Tính lương)
│   ├── Working hours (/hrm/attendance/working-hours)
│   ├── Attendance (/hrm/attendance/attendance)
│   ├── Annual leave (/hrm/attendance/annual-leave)
│   ├── Late & leave early (/hrm/Attendance/LateOrLeaveEarly)
│   ├── Overtime (/hrm/attendance/overtime)
│   ├── Overtime (Year) (/hrm/Attendance/OvertimeYear)
│   ├── Payroll (/hrm/attendance/payroll)
│   ├── Summary (/hrm/Attendance/Summary)
│   ├── VT - Office (/hrm/Attendance/VTOffice)
│   ├── Stop VT - Office (/hrm/Attendance/StopVTOffice)
│   ├── Fac Sum (/hrm/Attendance/FacSum)
│   ├── Bank (/hrm/Attendance/Bank)
│   ├── Cash (/hrm/Attendance/Cash)
│   └── Severance (/hrm/Attendance/Severance)
│
├── 3. EMPLOYEE (Lương ngoài định mức)
│   ├── Working hours (OT Over) (/hrm/employee/working-hours)
│   └── Payroll (OT Over) (/hrm/employee/payroll)
│
├── 4. CONFIG (Cấu hình hệ thống & Tham số)
│   ├── Section (/hrm/config/section)
│   ├── Leave elderly (/hrm/config/leave-elderly)
│   ├── Etc (/hrm/config/etc)
│   ├── Shift (/hrm/config/shift)
│   ├── Schedule (/hrm/config/schedule)
│   ├── Lock / Work hours (/hrm/config/lock-working-hours)
│   ├── Holiday (/hrm/Config/Holiday)
│   └── Config (/hrm/config/config)
│
└── 5. ADMIN (Quản trị hệ thống & Bảo mật)
    ├── Account (/hrm/admin/account)
    ├── Login history (/hrm/admin/login-history)
    └── White list (/hrm/admin/white-list)
```

---

## 3. CHI TIẾT CÁC MÀN HÌNH VÀ FORM THAO TÁC ĐÃ KHẢO SÁT

### 3.1. Khối Quản lý nhân sự (MANAGE)

1. **Registration (`/hrm/manage/registration`)**
   - **Mục đích:** Quản lý nhân viên mới đăng ký vào hệ thống HRM, tiếp nhận nhân sự, đồng bộ dữ liệu từ máy chấm công vân tay.
   - **Các bộ lọc:** Năm, Tháng, Trạng thái đăng ký (`REG_STATUS`), Loại nhân viên (`EMP_TYPE`), Đã nghỉ việc (`OFF`).
   - **Nút thao tác:** `Search`, `Import` (file Excel), `Export` (Excel), `Sync employee` (đồng bộ từ máy chấm công), `IGNORE`, `UNREGISTER`.
   - **Thao tác trên dòng:** Nút `MANAGE` mở modal chỉnh sửa chi tiết: Tên, Mã NV, CCCD, Quê quán, Lương đóng bảo hiểm (`SALARY_INSURANCE`), Xăng xe (`GASOLINE`), Bộ phận, Chức vụ, Ca làm việc.

2. **Information (`/hrm/manage/information`)**
   - **Mục đích:** Hồ sơ lý lịch chi tiết đầy đủ của nhân sự đang làm việc tại công ty.
   - **Đặc trưng:** Chỉnh sửa trực tiếp trên từng ô (Inline Cell Editing qua click vào dữ liệu có class `editor_data`).
   - **Thông tin quản lý:** Ngày cấp CCCD, Hạn CCCD, Nơi sinh, Số người phụ thuộc giảm trừ gia cảnh, Số điện thoại người thân, Số sổ BHXH, BHYT, Tài khoản ngân hàng 1 & 2, Trình độ văn hóa.
   - **Nút thao tác:** `Search`, `Import`, `Export`, `IGNORE`, `UNREGISTER`.

3. **Contract (Terminate) (`/hrm/manage/contract`)**
   - **Mục đích:** Quản lý hợp đồng lao động, phụ lục hợp đồng và ghi nhận chấm dứt hợp đồng (thôi việc / nghỉ ngang).
   - **Loại hợp đồng hỗ trợ (`CONTRACT_TYPE`):**
     - `PROBATION`: Thử việc - 2 tháng.
     - `FIXED_TERM_1`: Có thời hạn 1 năm lần 1.
     - `FIXED_TERM_2`: Có thời hạn 1 năm lần 2.
     - `INDEFINITE_TERM`: Không xác định thời hạn.
     - `CONTRACT_APPENDIX`: Phụ lục hợp đồng.
     - `QUIT_JOB`: Nghỉ việc / Thôi việc / Nghỉ ngang.
   - **Nút thao tác:** `Search`, `Import`, `Template` (tải mẫu hợp đồng), `CONTRACT` (in hợp đồng hàng loạt), `CARD` (in thẻ nhân viên), `STATUS` (cập nhật trạng thái ký duyệt), `ADD CONTRACT` (thêm dòng hợp đồng cho nhân viên).
   - **Lưu ý nghiệp vụ sống còn:** Khi thêm dòng `QUIT_JOB`, cột `INSURANCE SALARY` mặc định hiển thị `0`, người dùng phải kiểm tra và cập nhật mức lương để bảng tính lương thôi việc không bị hụt dữ liệu.

4. **Resignation (`/hrm/manage/resignation`)**
   - **Mục đích:** Báo cáo tổng hợp danh sách nhân viên đã nghỉ việc theo khoảng thời gian.
   - **Dữ liệu hiển thị:** Mã NV, Họ tên, Bộ phận, Chức danh, Ngày vào làm, Ngày nghỉ việc (`QUIT_JOB_DATE`), Số BHXH, Lý do nghỉ (`EMP_CONTRACT_REMARK`), Trạng thái đơn xin nghỉ (`REG_LETTER`: Có đơn hoặc Không đơn).
   - **Nút thao tác:** `Search`, Filter cột, `DETAIL` (xem chi tiết lịch sử hợp đồng).

5. **< 7yrs old (`/hrm/manage/7yrs-old`)**
   - **Mục đích:** Danh sách và chứng từ con nhỏ dưới 7 tuổi của người lao động để tính phụ cấp con nhỏ hàng tháng.
   - **Nút thao tác:** `Search`, `Export`, `Add` (thêm thông tin con nhỏ: họ tên con, ngày sinh, giới tính, giấy khai sinh).

6. **Warning (`/hrm/manage/warning`)**
   - **Mục đích:** Quản lý vi phạm kỷ luật lao động, lập biên bản cảnh cáo, lưu trữ file thư cảnh cáo đã ký.
   - **Nút thao tác:** `Search`, `WARNING` (xuất biên bản), `ADD WARNING` (thêm sự vụ vi phạm, mức độ cảnh cáo, ngày vi phạm), `Upload warning letter` (tải lên file đính kèm dạng scan/ảnh).

7. **Set Overtime (`/hrm/manage/set-overtime`)**
   - **Mục đích:** Đăng ký kế hoạch làm việc ngoài giờ (tăng ca) trước khi thực hiện ca làm.
   - **Nút thao tác:** `Search`, `Add` (đăng ký tăng ca cho bộ phận/cá nhân, giờ bắt đầu, giờ kết thúc, hệ số), `Template` (tải mẫu Excel), Import kế hoạch tăng ca.

8. **Leave (`/hrm/manage/leave`)**
   - **Mục đích:** Quản lý xin nghỉ phép và ghi nhận các loại nghỉ trong tháng.
   - **Các loại phép:** Phép năm (`PN`), Nghỉ ốm/khám thai, Nghỉ việc riêng hưởng lương (`Wedd & Funeral` - Cưới, Tang), Nghỉ không lương, Đi trễ/về sớm.
   - **Nút thao tác:** `Search`, `Add` (nhập phép thủ công), `Import Leave (Full)`, `D/L Leave (Month)`, `Import Leave (Multi-day)`, `Template Leave (Multi-day)`, `D/L Wedd & Funeral`, `D/L Leave Early`.

9. **Pregnancy Examination (`/hrm/Manage/PregnancyExam`)**
   - **Mục đích:** Đăng ký và theo dõi ngày nghỉ khám thai định kỳ của lao động nữ mang thai (hưởng trợ cấp BHXH).
   - **Nút thao tác:** `Search`, `Add`, `Export`, `Import`, `Template`.

10. **Maternity Benefit (`/hrm/Manage/MaternityBenefit`) & Benefit Payment (`/hrm/Manage/BenefitPayment`)**
    - **Mục đích:** Quản lý lao động nghỉ thai sản sinh con (thường là 6 tháng) và theo dõi đợt chi trả trợ cấp từ cơ quan bảo hiểm xã hội.

---

### 3.2. Khối Chấm công & Tính lương (ATTENDANCE)

1. **Working hours (`/hrm/attendance/working-hours`)**
   - **Mục đích:** Trung tâm xử lý giờ công thô từ máy quét vân tay sang giờ công làm việc tiêu chuẩn và làm ngoài giờ.
   - **Nút thao tác:** `Search`, `Sync data` (lấy dữ liệu từ máy chấm công), `Calculation` (chạy tính toán công dựa theo ca và lịch làm việc), `D/L` (tải bảng công), `Import` (nhập file công ngoài nếu có), `Export`.

2. **Attendance (`/hrm/attendance/attendance`)**
   - **Mục đích:** Bảng chấm công chi tiết theo lưới 31 ngày trong tháng.
   - **Ký hiệu công thường gặp:** Công thường (số giờ hoặc `X`), `L` (Lễ), `PN` (Phép năm), `OFF` (Nghỉ hàng tuần), `PHHT1` (Phép học tập/đào tạo), `SN` (Nghỉ sinh con), `SN1/2` (Nửa ngày).

3. **Annual leave (`/hrm/attendance/annual-leave`)**
   - **Mục đích:** Bảng theo dõi tồn phép năm, cộng dồn ngày phép theo thâm niên làm việc (mỗi 5 năm tăng thêm 1 ngày theo luật Việt Nam), số phép đã dùng trong năm và quỹ phép còn lại.

4. **Late & leave early (`/hrm/Attendance/LateOrLeaveEarly`)**
   - **Mục đích:** Báo cáo chuyên biệt về các trường hợp quẹt thẻ vào trễ hoặc ra sớm so với giờ quy định của ca làm.

5. **Overtime & Overtime Year (`/hrm/attendance/overtime`, `/hrm/Attendance/OvertimeYear`)**
   - **Mục đích:** Thống kê tổng số giờ tăng ca theo ngày thường (hệ số 1.5), ngày nghỉ tuần (hệ số 2.0), ngày nghỉ lễ (hệ số 3.0), giám sát ngưỡng trần tăng ca 200h - 300h/năm.

6. **Payroll (`/hrm/attendance/payroll`) - TRỌNG TÂM CỦA HỆ THỐNG**
   - **Mục đích:** Bảng thanh toán lương tổng hợp hàng tháng của toàn công ty.
   - **Bộ lọc điều hướng:**
     - Năm (`Q_YEAR`), Tháng (`Q_MONTH`).
     - Tuần thanh toán (`Q_FROM_WEEK` ~ `Q_TO_WEEK`).
     - Trạng thái người lao động: **`Working` (Đang làm việc)** hoặc **`Stopped` (Đã nghỉ việc / Nghỉ ngang)**.
     - Loại hợp đồng: **`Official` (Chính thức)** hoặc **`Probationary` (Thử việc)**.
   - **Các nút chức năng chính:**
     - `Salary Calculation`: Kích hoạt động cơ tính toàn bộ các cột lương trên server cho tháng được chọn.
     - `RE-CALC`: Tính lại riêng cho những nhân sự được tick chọn.
     - `Template` & `Import`: Nhập liệu các phụ cấp / điều chỉnh đặc thù qua file Excel.
     - `Lock` / `Unlock`: Chốt bảng lương chống chỉnh sửa dữ liệu sau khi đã phê duyệt.
     - `D/L` (Download): Tải bảng lương chi tiết dạng Excel hoặc PDF phiếu lương (Payslip).
     - `Choose Week`: Gán tuần chi trả lương cho người nghỉ việc.
     - `View note`: Xem lịch sử chỉnh sửa các khoản tiền trên dòng của nhân viên.
   - **Các cột tài chính quan trọng:**
     - `Insurance Salary` (`BASIC_INSURANCE_SALARY`): Mức lương đóng BHXH.
     - `Gasoline` (`BASIC_GASOLINE`): Phụ cấp xăng xe, điện thoại.
     - `Basic Salary` (`BASIC_SALARY`): Tổng lương cơ sở.
     - Các khoản phụ cấp: Chuyên cần (`AD_DILIGENT`), Nhà ở (`AD_HOUSE`), Con nhỏ (`AD_CHIL_7YRS`), PCCC, Độc hại, Đánh giá xếp loại (`AD_EVAL 1-4`).
     - Các khoản khấu trừ bảo hiểm: BHXH (8%), BHYT (1.5%), BHTN (1%), Công đoàn (1%), Thuế TNCN (`DE_PIT`).
     - Lương thực lãnh (`ACTUAL_SALARY` / Net).

7. **Các bảng tổng hợp & Kênh chi trả:**
   - `Summary` (`/hrm/Attendance/Summary`): Báo cáo tài chính tổng hợp chi phí lương và bảo hiểm doanh nghiệp phải nộp.
   - `VT - Office` & `Stop VT - Office`: Bảng lương khối văn phòng và nhân sự văn phòng nghỉ việc.
   - `Fac Sum`: Tổng hợp chi phí khối nhà xưởng sản xuất.
   - `Bank` (`/hrm/Attendance/Bank`): Xuất danh sách chuyển khoản ngân hàng (mẫu chuẩn BIDV).
   - `Cash` (`/hrm/Attendance/Cash`): Danh sách ký nhận tiền mặt cho lao động chưa có thẻ ATM.
   - `Severance` (`/hrm/Attendance/Severance`): Bảng tính tiền trợ cấp thôi việc theo thời gian làm việc không đóng BHTN.

---

### 3.3. Khối Nhân viên & Giờ công ngoài định mức (EMPLOYEE)

1. **Working hours (OT Over) & Payroll (OT Over)**
   - **Mục đích:** Theo dõi và chi trả phần giờ tăng ca đặc biệt ngoài định mức (phù hợp với các giai đoạn cao điểm giao hàng cần tách biệt sổ sách quản lý).

---

### 3.4. Khối Cấu hình (CONFIG)

1. **Section & Job (`/hrm/config/section`)**: Tạo cơ cấu tổ chức: Phòng ban, phân xưởng, chuyền may, vị trí công việc.
2. **Shift & Schedule (`/hrm/config/shift`, `/hrm/config/schedule`)**: Cấu hình ca làm việc (giờ vào, giờ ra, số giờ tiêu chuẩn) và xếp lịch làm việc cho từng bộ phận.
3. **Lock / Work hours (`/hrm/config/lock-working-hours`)**: Khóa kỳ công và kỳ lương (theo ngày hoặc theo tháng).
4. **Holiday (`/hrm/Config/Holiday`)**: Thiết lập lịch nghỉ Lễ, Tết theo quy định nhà nước để hệ thống tự tính lương lễ và nhân hệ số OT 3.0.

---

### 3.5. Khối Quản trị (ADMIN)

1. **Account (`/hrm/admin/account`)**: Tạo tài khoản người dùng, tạo nhóm người dùng (`User Group`), phân quyền từng màn hình và quyền sửa dữ liệu.
2. **Login history (`/hrm/admin/login-history`)**: Ghi nhận thời gian, tài khoản, địa chỉ IP đăng nhập.
3. **White list (`/hrm/admin/white-list`)**: Khóa dải IP truy cập chỉ cho phép trong mạng công ty.

---

## 4. BẢNG TỔNG HỢP TRẠNG THÁI XÁC MINH CỦA AUDIT

| Nhóm Module | Số màn hình | Trạng thái truy cập | Trạng thái xác minh nghiệp vụ | Ghi chú kỹ thuật |
| :--- | :---: | :---: | :---: | :--- |
| **MANAGE** | 11 | 11/11 (100%) | Đã xác minh toàn bộ | Đã test luồng: Đăng ký -> Hợp đồng -> Thôi việc -> Cảnh cáo -> Phép |
| **ATTENDANCE** | 14 | 14/14 (100%) | Đã xác minh toàn bộ | Đã test luồng: Tính công -> Tính lương -> Khấu trừ -> Chốt lương -> Xuất ngân hàng |
| **EMPLOYEE** | 2 | 2/2 (100%) | Đã xác minh | Nghiệp vụ OT Over chạy song song bảng lương chính |
| **CONFIG** | 8 | 8/8 (100%) | Đã xác minh | Dữ liệu nền tảng cho bảng phân ca và tính công |
| **ADMIN** | 3 | 3/3 (100%) | Đã xác minh | Tài khoản `test` có đủ quyền xem và khảo sát |

---

## 5. NHỮNG LỖI / ĐIỂM CHƯA RÕ VỀ MẶT THỰC TẾ CẦN CHÚ Ý

1. **Dữ liệu lương bảo hiểm khi thôi việc (`QUIT_JOB`):**
   - Khi tạo dòng hợp đồng `QUIT_JOB`, cột `INSURANCE SALARY` tự về `0`. Nếu người dùng không điền lại lương, bảng lương thôi việc (`Payroll > Stopped`) sẽ mất `Insurance Salary` và `Basic Salary`. Đây là điểm quan trọng nhất cần cảnh báo người dùng trong tài liệu hướng dẫn.
2. **Tính trùng lặp Ngày đi làm và Nghỉ phép:**
   - Hệ thống cho phép nhập phép ngay cả khi ngày đó có bấm vân tay đi làm mà không tự động chặn cứng; người dùng phải chú ý kiểm tra đối soát giữa bảng Attendance và bảng Leave.
3. **Chốt khóa kỳ lương (`Lock`):**
   - Sau khi bấm `Payroll_Lock`, các thao tác chỉnh sửa inline cell hoặc tính lại lương sẽ bị khóa cho đến khi Admin/Quản lý mở khóa trong `Config > Lock / Work hours`.

Tài liệu này là cơ sở dữ liệu thực tế tuyệt đối để xây dựng `01_FEATURE_INVENTORY.md` và giao diện hướng dẫn cho người dùng mới.
