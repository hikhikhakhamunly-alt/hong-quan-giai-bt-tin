HỒNG QUÂN GIẢI BT TIN

Các tệp:
- index.html: nội dung trang
- style.css: giao diện
- script.js: danh sách bài 1–50 và gửi yêu cầu đến Apps Script

ĐƯA LÊN GITHUB:
1. Tạo repository mới trên GitHub, ví dụ: hong-quan-giai-bt-tin.
2. Chọn Add file > Upload files.
3. Tải lên cả 4 tệp trong thư mục này (hoặc chỉ 3 tệp trang web nếu không cần README).
4. Commit changes.
5. Vào Settings > Pages, chọn Deploy from a branch, branch main và folder /(root), rồi Save.

LƯU Ý BACKEND:
- script.js đã được điền URL Apps Script mà bạn cung cấp.
- Trong Apps Script, cần đặt đúng SHEET_ID của Google Sheet và triển khai Web app.
- Backend cần đọc các trường: tenTaiKhoan, mk, bai, thanhToan, ghiChu, thoiGian.
- Trường mk ở đây chỉ là mã xác nhận không nhạy cảm; không yêu cầu hoặc lưu mật khẩu đăng nhập.
- Không yêu cầu người gửi cung cấp PIN, mã bí mật, số seri thẻ hoặc thông tin đăng nhập.
- Do trình duyệt dùng no-cors, thông báo trên trang chỉ xác nhận yêu cầu đã được gửi đi, không chứng minh rằng Google Sheet đã lưu thành công. Hãy kiểm tra Sheet để xác nhận.
