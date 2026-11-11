/**
 * GOOGLE APPS SCRIPT - TIẾP NHẬN PHẢN HỒI / YÊU CẦU TỪ TRANG HƯỚNG DẪN HRM
 * 
 * HƯỚNG DẪN CÀI ĐẶT 2 PHÚT:
 * 1. Mở https://sheets.google.com và tạo một Bảng tính mới (đặt tên ví dụ: "HRM_User_Requests").
 * 2. Đặt tiêu đề cho Hàng 1 (Dòng tiêu đề):
 *    - Cột A: Thời gian
 *    - Cột B: Nội dung yêu cầu / Thắc mắc
 *    - Cột C: Tên Zalo / Số điện thoại
 *    - Cột D: Tên Công ty / Xưởng
 *    - Cột E: Trạng thái xử lý
 *    - Cột F: Ghi chú của Admin / AI Agent
 * 3. Trên menu Google Sheets, bấm: Tiện ích mở rộng (Extensions) > Apps Script.
 * 4. Xóa hết code mặc định, dán toàn bộ đoạn mã bên dưới vào.
 * 5. Bấm nút "Triển khai" (Deploy) màu xanh ở góc trên bên phải > "Tùy chọn triển khai mới" (New deployment).
 *    - Loại triển khai: Ứng dụng web (Web app).
 *    - Mô tả: HRM Feedback Receiver.
 *    - Thực thi dưới dạng (Execute as): Tôi (Me / your email).
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone). -> RẤT QUAN TRỌNG ĐỂ NGƯỜI DÙNG ẨN DANH GỬI ĐƯỢC!
 * 6. Bấm "Triển khai" (Deploy), cấp quyền truy cập tài khoản Google của bạn nếu được hỏi.
 * 7. Copy đường dẫn "URL ứng dụng web" (dạng https://script.google.com/macros/s/AKfycb.../exec)
 *    và dán vào biến GOOGLE_SHEET_WEBAPP_URL trong file index.html!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Nếu trang tính chưa có tiêu đề cột thì tự động tạo
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian",
        "Nội dung yêu cầu / Thắc mắc",
        "Tên Zalo / SĐT",
        "Tên Công ty / Xưởng",
        "Trạng thái xử lý",
        "Ghi chú của Admin / AI Agent"
      ]);
      // Định dạng dòng tiêu đề
      var headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1e88e5");
      headerRange.setFontColor("#ffffff");
    }
    
    // Đọc dữ liệu gửi lên (hỗ trợ cả JSON body lẫn Form Data)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    var timeFormatted = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    var requestText = data.request || data.content || data.message || "Không có nội dung";
    var zalo = data.zalo || data.phone || "Ẩn danh";
    var company = data.company || data.factory || "Không điền";
    var status = "Mới tiếp nhận";
    var note = "";
    
    // Ghi vào dòng tiếp theo của Google Sheet
    sheet.appendRow([
      timeFormatted,
      requestText,
      zalo,
      company,
      status,
      note
    ]);
    
    // Tự động căn lề và định dạng
    sheet.autoResizeColumns(1, 6);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Đã lưu yêu cầu vào Google Sheet thành công!",
      timestamp: timeFormatted
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Hỗ trợ kiểm tra khi truy cập thử bằng trình duyệt (GET test)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    message: "Google Apps Script Web App đang hoạt động sẵn sàng tiếp nhận phản hồi HRM!"
  })).setMimeType(ContentService.MimeType.JSON);
}
