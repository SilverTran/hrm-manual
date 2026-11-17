# 02 - KẾ HOẠCH HƯỚNG DẪN NGƯỜI DÙNG HỆ THỐNG HRM (ONBOARDING PLAN)

**Mục tiêu:** Chuyển hóa danh mục 53 chức năng đã kiểm kê thành các kịch bản hướng dẫn theo hành trình sử dụng thực tế của người dùng, loại bỏ thuật ngữ kỹ thuật, tối ưu hóa cho người ngại đọc văn bản dài.

---

## 1. CẤU TRÚC HÀNH TRÌNH NGƯỜI DÙNG (USER JOURNEY MAP)

```
[BƯỚC 1: TIẾP CẬN & ĐĂNG NHẬP]
   │
   ├─► [BƯỚC 2: THIẾT LẬP NỀN TẢNG (LẦN ĐẦU / ĐẦU NĂM)]
   │     ├─ Khai báo phòng ban & chức vụ (Section)
   │     ├─ Cài đặt ca làm việc & Lịch làm việc (Shift, Schedule)
   │     └─ Cài đặt ngày nghỉ Lễ/Tết (Holiday)
   │
   ├─► [BƯỚC 3: QUẢN LÝ NHÂN SỰ HÀNG NGÀY]
   │     ├─ Tiếp nhận & kích hoạt nhân viên mới (Registration)
   │     ├─ Cập nhật hồ sơ cá nhân, CCCD, Ngân hàng (Information)
   │     ├─ Ký hợp đồng lao động & In thẻ nhân viên (Contract)
   │     ├─ Đăng ký kế hoạch tăng ca trước (Set Overtime)
   │     └─ Đăng ký xin nghỉ phép (Leave)
   │
   ├─► [BƯỚC 4: CHU TRÌNH TÍNH CÔNG & TÍNH LƯƠNG HÀNG THÁNG (C&B)]
   │     ├─ Chặng 1: Đồng bộ dữ liệu quẹt thẻ & Chạy tính công (Working hours)
   │     ├─ Chặng 2: Đối soát bảng chấm công 31 ngày (Attendance)
   │     ├─ Chặng 3: Khóa kỳ chấm công (Lock work hours)
   │     ├─ Chặng 4: Kích hoạt tính bảng lương tự động (Salary Calculation)
   │     ├─ Chặng 5: Chỉnh sửa phụ cấp / thưởng phạt & Tính lại cá nhân (RE-CALC)
   │     ├─ Chặng 6: Chốt khóa bảng lương (Payroll Lock)
   │     └─ Chặng 7: Xuất file chuyển khoản BIDV / Tiền mặt & In phiếu lương (Payslip)
   │
   ├─► [BƯỚC 5: QUY TRÌNH NGHỈ VIỆC & TÍNH LƯƠNG THÔI VIỆC / NGHỈ NGANG]
   │     ├─ Khai báo hợp đồng QUIT_JOB kèm bắt buộc nhập lương bảo hiểm
   │     ├─ Kiểm tra danh sách thôi việc (Resignation)
   │     ├─ Tính lương ngày làm việc cuối tại tab Stopped của Payroll
   │     ├─ Gán tuần chi trả lương (Choose Week)
   │     └─ Tính trợ cấp thôi việc theo thâm niên (Severance)
   │
   ├─► [BƯỚC 6: CHẾ ĐỘ THAI SẢN, CON NHỎ & PHÚC LỢI LAO ĐỘNG NỮ]
   │     ├─ Đăng ký con nhỏ dưới 7 tuổi để cộng phụ cấp hàng tháng
   │     ├─ Ghi nhận ngày nghỉ khám thai định kỳ (Pregnancy Exam)
   │     └─ Ghi nhận nghỉ sinh con 6 tháng (Maternity Benefit)
   │
   ├─► [BƯỚC 7: QUẢN TRỊ NGƯỜI DÙNG & BẢO MẬT HỆ THỐNG]
   │     ├─ Tạo tài khoản nhân sự mới & Cấp nhóm quyền
   │     └─ Phân quyền chi tiết từng màn hình thao tác
   │
   └─► [BƯỚC 8: TRA CỨU NHANH & XỬ LÝ SỰ CỐ / LỖI THƯỜNG GẶP]
         ├─ Lỗi mất cột Insurance Salary và Basic Salary khi tính lương thôi việc
         ├─ Lỗi quẹt thẻ vân tay không nhận đủ giờ công
         ├─ Lỗi không chỉnh sửa được ô tiền lương (do bảng lương bị khóa)
         └─ Lỗi trùng lặp ngày đi làm và xin nghỉ phép
```

---

## 2. MA TRẬN PHÂN LOẠI & ÁNH XẠ 53 CHỨC NĂNG VÀO KẾ HOẠCH HƯỚNG DẪN

| Mã chức năng (trong Inventory) | Tên chức năng | Phân loại hướng dẫn | Mã kịch bản hướng dẫn tương ứng | Lý do phân loại |
| :---: | :--- | :---: | :---: | :--- |
| **FN-01** | Đăng nhập hệ thống | Hướng dẫn riêng | **HD-01** | Thao tác bắt buộc đầu tiên cho mọi người dùng |
| **FN-02** | Kiểm tra ngôn ngữ hiển thị | Quy trình chung | **HD-01** | Lưu ý người dùng: Hệ thống hiển thị 100% Tiếng Anh; tài liệu hướng dẫn kèm bảng tra cứu nhãn tiếng Anh sang tiếng Việt |
| **FN-03** | Đăng xuất khỏi hệ thống | Quy trình chung | **HD-01** | Nằm trong thao tác tài khoản cơ bản |
| **FN-04** | Đồng bộ NV từ máy chấm công | Quy trình lớn | **HD-02** | Nằm trong quy trình tiếp nhận nhân sự mới |
| **FN-05** | Tiếp nhận & Đăng ký nhân viên mới | Hướng dẫn riêng | **HD-02** | Nghiệp vụ cốt lõi của HR khi có người mới |
| **FN-06** | Import danh sách NV từ Excel | Quy trình lớn | **HD-02** | Phương án nhập liệu nhanh khi tuyển dụng số lượng lớn |
| **FN-07** | Xuất danh sách nhân viên | Không cần riêng | **HD-02** | Nút tiện ích tải file dữ liệu tiêu chuẩn |
| **FN-08** | Bỏ qua hoặc Hủy đăng ký NV | Quy trình lớn | **HD-02** | Xử lý nhân sự nhập nhầm / hủy thử việc |
| **FN-09** | Cập nhật hồ sơ chi tiết (Information) | Hướng dẫn riêng | **HD-03** | Hướng dẫn thao tác nhấp đúp/nhấp chuột sửa trực tiếp (Inline edit) |
| **FN-10** | Ký mới hợp đồng lao động | Hướng dẫn riêng | **HD-04** | Quyết định mức lương và quyền lợi pháp lý |
| **FN-11** | In hợp đồng lao động | Quy trình lớn | **HD-04** | Bước xuất bản in sau khi tạo hợp đồng |
| **FN-12** | In thẻ nhân viên | Quy trình lớn | **HD-04** | Bước cấp phát thẻ đeo cho nhân viên |
| **FN-13** | Cập nhật trạng thái hợp đồng | Quy trình lớn | **HD-04** | Theo dõi tiến độ ký kết giấy tờ |
| **FN-14** | Khai báo nghỉ việc / Thôi việc / Nghỉ ngang | Hướng dẫn riêng | **HD-05** | **CỰC KỲ QUAN TRỌNG:** Hướng dẫn tránh lỗi mất lương bảo hiểm |
| **FN-15** | Tra cứu danh sách người nghỉ việc | Quy trình lớn | **HD-05** | Màn hình đối soát sau khi khai báo thôi việc |
| **FN-16** | Đăng ký trợ cấp con nhỏ < 7 tuổi | Hướng dẫn riêng | **HD-06** | Nghiệp vụ phúc lợi thường xuyên phát sinh |
| **FN-17** | Lập biên bản cảnh cáo kỷ luật | Hướng dẫn riêng | **HD-07** | Quản lý vi phạm và căn cứ trừ chuyên cần |
| **FN-18** | Tải lên thư cảnh cáo có chữ ký | Quy trình lớn | **HD-07** | Đính kèm minh chứng biên bản |
| **FN-19** | Đăng ký kế hoạch tăng ca trước (Set OT) | Hướng dẫn riêng | **HD-08** | Nghiệp vụ hàng ngày của Quản lý xưởng/chuyền may |
| **FN-20** | Đăng ký nghỉ phép đơn lẻ | Hướng dẫn riêng | **HD-09** | Nghiệp vụ chấm công hàng ngày |
| **FN-21** | Import nghỉ phép hàng loạt từ Excel | Quy trình lớn | **HD-09** | Dành cho các đợt nghỉ dài hoặc đông công nhân |
| **FN-22** | Theo dõi khám thai định kỳ | Quy trình lớn | **HD-06** | Chế độ thai sản cho lao động nữ |
| **FN-23** | Ghi nhận nghỉ thai sản sinh con | Hướng dẫn riêng | **HD-06** | Tạm dừng đóng bảo hiểm khi nghỉ sinh 6 tháng |
| **FN-24** | Theo dõi chi trả trợ cấp BHXH | Quy trình lớn | **HD-06** | Khâu giải ngân tiền cơ quan bảo hiểm về |
| **FN-25** | Đồng bộ dữ liệu chấm công thô | Quy trình lớn | **HD-10** | Khâu đầu tiên của chu trình làm lương tháng |
| **FN-26** | Chạy tính giờ công (Working hours) | Hướng dẫn riêng | **HD-10** | Động cơ tính công quy đổi từ quẹt thẻ |
| **FN-27** | Xem bảng chấm công 31 ngày (Attendance) | Hướng dẫn riêng | **HD-11** | Đối soát công và các ký hiệu nghỉ |
| **FN-28** | Tra cứu quỹ phép năm (Annual leave) | Hướng dẫn riêng | **HD-12** | Quản lý phép tồn và thâm niên |
| **FN-29** | Báo cáo đi trễ về sớm | Không cần riêng | **HD-10** | Màn hình báo cáo đối soát phụ |
| **FN-30** | Tổng hợp giờ làm thêm (Overtime) | Quy trình lớn | **HD-10** | Đối chiếu tổng giờ OT trước khi lên lương |
| **FN-31** | Giám sát giờ tăng ca năm | Không cần riêng | **HD-10** | Báo cáo tuân thủ luật lao động |
| **FN-32** | Tính lương tự động (Salary Calculation) | Hướng dẫn riêng | **HD-13** | **TRỌNG TÂM:** Kích hoạt tính lương toàn công ty |
| **FN-33** | Tính lại lương cá nhân (RE-CALC) | Hướng dẫn riêng | **HD-13** | Xử lý điều chỉnh sau khi sửa tiền riêng lẻ |
| **FN-34** | Tính & xem lương người nghỉ ngang (Stopped) | Hướng dẫn riêng | **HD-14** | **TRỌNG TÂM:** Xử lý triệt để phản hồi của người dùng |
| **FN-35** | Gán tuần chi trả lương (Choose Week) | Quy trình lớn | **HD-14** | Phân đợt chi tiền lương người nghỉ việc |
| **FN-36** | Khóa bảng lương (Lock) | Hướng dẫn riêng | **HD-15** | Bảo vệ số liệu sau khi hoàn tất kiểm tra |
| **FN-37** | Mở khóa bảng lương (Unlock) | Quy trình lớn | **HD-15** | Mở lại quyền khi cần điều chỉnh đặc cách |
| **FN-38** | Tải bảng lương Excel & In phiếu lương Payslip | Hướng dẫn riêng | **HD-16** | Xuất dữ liệu in ấn phát cho công nhân |
| **FN-39** | Báo cáo tổng hợp chi phí lương (Summary) | Không cần riêng | **HD-13** | Báo cáo tổng hợp số liệu cho kế toán trưởng |
| **FN-40** | Xuất danh sách chuyển khoản BIDV (Bank) | Hướng dẫn riêng | **HD-17** | Chi trả tiền qua tài khoản ngân hàng |
| **FN-41** | Xuất danh sách ký nhận tiền mặt (Cash) | Hướng dẫn riêng | **HD-17** | Chi trả tiền trực tiếp cho công nhân mới |
| **FN-42** | Tính trợ cấp thôi việc thâm niên (Severance) | Hướng dẫn riêng | **HD-18** | Tính tiền thôi việc thời gian trước 2009 |
| **FN-43** | Chấm công tăng ca ngoài định mức (OT Over) | Quy trình lớn | **HD-19** | Quản lý sổ sách tăng ca đặc thù |
| **FN-44** | Tính lương tăng ca ngoài định mức (OT Over) | Quy trình lớn | **HD-19** | Bảng thanh toán lương ngoài định mức |
| **FN-45** | Khai báo Phòng ban & Chức vụ (Section) | Hướng dẫn riêng | **HD-20** | Cấu hình cơ cấu tổ chức nền tảng |
| **FN-46** | Cấu hình ca làm việc (Shift) | Hướng dẫn riêng | **HD-21** | Định nghĩa khung giờ làm việc |
| **FN-47** | Xếp lịch làm việc theo ca (Schedule) | Hướng dẫn riêng | **HD-21** | Phân ca cho công nhân và văn phòng |
| **FN-48** | Thiết lập ngày nghỉ Lễ/Tết (Holiday) | Hướng dẫn riêng | **HD-22** | Cấu hình ngày lễ đầu mỗi năm |
| **FN-49** | Khóa kỳ công chống sửa đổi | Quy trình lớn | **HD-10** | Khóa chốt bảng công trước khi sang tính lương |
| **FN-50** | Tạo tài khoản người dùng mới (Account) | Hướng dẫn riêng | **HD-23** | Cấp quyền cho nhân sự phụ trách mới |
| **FN-51** | Phân quyền truy cập theo màn hình | Hướng dẫn riêng | **HD-23** | Đảm bảo an toàn thông tin và quyền hạn |
| **FN-52** | Xem nhật ký đăng nhập | Không cần riêng | **HD-23** | Báo cáo kỹ thuật dành cho Admin IT |
| **FN-53** | Cấu hình danh sách IP tin cậy (White list) | Không cần riêng | **HD-23** | Cài đặt bảo mật mạng nội bộ |

---

## 3. THỐNG KÊ MẬT ĐỘ HƯỚNG DẪN

- **Tổng số chức năng được kiểm kê:** 53 chức năng.
- **Số kịch bản hướng dẫn chuyên biệt được đóng gói:** 23 kịch bản chính (`HD-01` đến `HD-23`).
- **Tỷ lệ bao phủ nghiệp vụ:** 100% (toàn bộ 53/53 chức năng đều được lồng ghép trong các kịch bản hành trình phù hợp, không bỏ sót bất kỳ tính năng nào).
- **Trọng tâm giải quyết vấn đề của người dùng:** Dành riêng `HD-05` và `HD-14` để làm rõ tường tận quy trình nhập lương khi khai báo `QUIT_JOB` và quy trình kiểm tra lương thôi việc tại tab `Stopped` trong `Payroll`.
