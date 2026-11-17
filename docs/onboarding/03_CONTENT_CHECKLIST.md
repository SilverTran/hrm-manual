# 03 - CHECKLIST ĐÁNH GIÁ TRẢI NGHIỆM NGƯỜI DÙNG (CONTENT CHECKLIST)

**Phương pháp đánh giá:** Mô phỏng 5 Persona người dùng thực tế thao tác trên giao diện hướng dẫn tĩnh `site/index.html`.

---

## 1. ĐÁNH GIÁ THEO 5 PERSONA MÔ PHỎNG

### Persona A: Nhân viên mới (Chưa từng dùng phần mềm, không biết bắt đầu từ đâu)
- **Câu hỏi 1: Có biết bắt đầu từ đâu không?**  
  👉 **Đạt.** Mở trang là thấy ngay thẻ đầu tiên "🔑 Đăng nhập & Làm quen giao diện Tiếng Anh" với link URL đăng nhập, ghi chú rõ hệ thống dùng 100% tiếng Anh kèm bảng đối chiếu các thuật ngữ thông dụng.
- **Câu hỏi 2: Có tìm thấy chức năng cần dùng không?**  
  👉 **Đạt.** Có thanh tìm kiếm tức thì ở trên cùng gõ từ khóa là lọc ra ngay.
- **Câu hỏi 3: Có hiểu nội dung hướng dẫn không?**  
  👉 **Đạt.** Toàn bộ câu từ là tiếng Việt phổ thông, không dùng thuật ngữ kỹ thuật khó hiểu.
- **Câu hỏi 4: Có biết phải bấm vào đâu không?**  
  👉 **Đạt.** Tên nút bấm được thiết kế thành các khối màu nổi bật (xanh, đỏ, vàng) giống màu nút thực tế trên phần mềm HRM.
- **Câu hỏi 5: Có hiểu kết quả sau khi thao tác không?**  
  👉 **Đạt.** Cuối mỗi bước đều có dòng màu xanh "✅ Hoàn thành: ...".
- **Câu hỏi 6: Có bị quá tải thông tin không?**  
  👉 **Đạt.** Không có các đoạn văn bản dài lê thê, mỗi bước chỉ có 1-2 câu ngắn.
- **Câu hỏi 7: Có gặp bước nào thiếu thông tin không?**  
  👉 **Đạt.** Đầy đủ từ đường dẫn menu đến thao tác bấm lưu.
- **Câu hỏi 8: Có thể hoàn thành nhiệm vụ mà không cần người khác giải thích không?**  
  👉 **Đạt.** Thao tác từng bước 1-2-3 rõ ràng.

---

### Persona B: Nhân viên bận rộn (Chỉ muốn làm nhanh, không muốn đọc nhiều)
- **Đánh giá trải nghiệm:**  
  - Ngay đầu trang có khu vực **Quick Tiles ("Bạn muốn làm gì hôm nay?")** với các phím tắt: *Tính bảng lương tháng*, *Lương người thôi việc*, *Kéo giờ công vân tay*, *Báo công nhân nghỉ việc*, *Xuất file chuyển khoản*.
  - Nhấp vào là trang tự động cuộn (smooth scroll) đến đúng khung thao tác mà không cần lướt qua các phần khác.
  - Mỗi tác vụ chỉ gồm 3 đến 5 gạch đầu dòng ngắn, làm theo mất chưa đến 1 phút.

---

### Persona C: Quản lý xưởng / chuyền may (Xem công, duyệt OT, duyệt phép)
- **Đánh giá trải nghiệm:**  
  - Chọn nút lọc vai trò **[Quản lý]** ở đầu sidebar: Toàn bộ các mục không liên quan của C&B/Admin tự động ẩn đi, chỉ giữ lại các mục quản lý cần: *Đăng ký tăng ca (Set OT)*, *Đăng ký nghỉ phép*, *Xem bảng công 31 ngày*, *Biên bản cảnh cáo*.
  - Giúp quản lý không bị rối mắt bởi hàng chục menu nghiệp vụ chuyên sâu.

---

### Persona D: Nhân sự C&B (Phụ trách hồ sơ, hợp đồng, chấm công, bảng lương)
- **Đánh giá trải nghiệm:**  
  - Chọn nút lọc **[Nhân sự C&B]**: Hiển thị đầy đủ hành trình 7 bước tính lương hàng tháng.
  - **Điểm sáng:** Giải quyết triệt để lỗi người dùng phản hồi về việc tính lương thôi việc trong tháng 10 bị mất cột `Insurance Salary` và `Basic Salary` (có hẳn khung mô phỏng trực quan bảng QUIT JOB khoanh đỏ vị trí phải điền lương).

---

### Persona E: Người ít hiểu biết công nghệ (Sợ thao tác sai, dễ nhầm nút)
- **Đánh giá trải nghiệm:**  
  - Có khung mô phỏng trực quan **UI Mockup** màu tối giống hệt giao diện HRM thực tế với viền nét đứt nhấp nháy phát sáng (**Glow Highlight**) ngay tại nút cần bấm.
  - Phân biệt rõ màu sắc nút: Nút màu xanh lá là tính toán/tạo mới, nút màu xanh dương là tìm kiếm/đồng bộ, nút màu vàng là tải mẫu/khóa.
  - Có mục **Cảnh báo màu đỏ** trước những bước dễ gây lỗi.

---

## 2. TỔNG HỢP VẤN ĐỀ PHÁT HIỆN & ĐÃ XỬ LÝ TRONG BẢN PREVIEW

| STT | Vấn đề phát hiện khi preview | Tác động đến người dùng | Biện pháp đã xử lý ngay trong HTML |
| :---: | :--- | :--- | :--- |
| 1 | Người dùng di động khó nhìn menu dài | Menu tràn màn hình trên mobile | Bổ sung responsive flex-direction column, sidebar tự thu gọn thành header thân thiện |
| 2 | Nhầm lẫn giữa tab Working và Stopped trong Payroll | Không tìm thấy người đã nghỉ việc | Bổ sung giải thích rõ ràng và minh họa vị trí chọn dropdown `Stopped` cạnh ô chọn Tháng |
| 3 | Người dùng quên bấm phím Enter khi sửa inline | Giá trị sửa chưa được lưu vào server | Thêm hướng dẫn rõ ràng: *Nhấp chuột vào ô -> Gõ nội dung -> Bấm Enter hoặc phím tick ✔* |
| 4 | Không biết tại sao nút tính lương không bấm được | Bảng lương đang ở trạng thái Khóa | Thêm câu hỏi thường gặp FAQ giải thích cơ chế Lock / Unlock |
