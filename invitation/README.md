# Hẹn cậu một chiều thứ Bảy

Thiệp riêng cho buổi hẹn 17/10/2026 ở Hà Đông. HTML/CSS/JavaScript thuần; không cần cài dependency hoặc database. Thư mục gốc của thiệp cũ được giữ nguyên.

## Chạy ở máy

Tại thư mục `invitation`, chạy `python -m http.server 4173 --directory dist`, rồi mở `http://localhost:4173`. Dùng HTTP vì trang sử dụng ES modules.

## Nội dung

- `dist/data.mjs`: địa điểm, phim, giá và nguồn, kiểm tra ngày 14/10/2026.
- `dist/plan.mjs`: trạng thái, lịch dự kiến và nội dung chia sẻ.
- `dist/app.mjs`: chọn từng bước, quay lại, chi tiết, lưu lựa chọn và chia sẻ.
- `dist/style.css`: theme navy, gradient, responsive, hỗ trợ reduced motion.
- `artwork/`: ảnh gốc đã tạo; `dist/assets/`: bản WebP để tải nhanh.

Thiệp lưu lựa chọn vào localStorage của người xem, không gửi cho chủ thiệp. Nút Chia sẻ dùng Web Share; nếu không hỗ trợ thì sao chép, và nếu clipboard không hoạt động thì hiện ô văn bản có thể tự sao chép. Không hiển thị thông báo gửi thành công giả. Muốn nhận tự động có thể bổ sung Netlify Forms khi triển khai trên Netlify; phiên bản này không dùng backend.

## Triển khai

Sites dùng `.openai/hosting.json`; Site mặc định riêng tư để chủ thiệp xem. Chỉ đổi đối tượng truy cập khi chủ thiệp yêu cầu.

Để dùng Netlify, tải nguyên nội dung thư mục `dist` lên Netlify Drop, hoặc dùng `invitation` làm base directory và `dist` làm publish directory. `netlify.toml` đã chuẩn bị; chưa kết nối tài khoản Netlify hay bật thu thập form.

## Dữ liệu còn cần chốt

Chưa xác nhận suất chiếu CGV AEON Hà Đông ngày 17/10, giá hiện hành của tất cả quán, bàn ngoài trời/cửa sổ và khả năng phục vụ dị ứng. Các điểm này được ghi ngay trong chi tiết lựa chọn. Không tự đặt bàn, mua vé hay gửi tin nhắn.

Ảnh quán/phim có nguồn dẫn tại thẻ và manifest; không phải ảnh AI. Hai ảnh minh họa AI chỉ dùng trang trí. Xem `ARTWORK.md` và `RESEARCH.md`.

## Kiểm tra

`node check.mjs` kiểm tra logic ngày giờ, hai thứ tự, thời gian buffet, không xem phim, nội dung tự nhập và tài nguyên. `node browser-check.mjs` dùng Playwright cài riêng trong `.local` và Chrome có sẵn trên máy: đã chạy desktop 1440px, mobile 390px và 320px, kiểm tra quay lại/tải lại, dialog/Escape, đổi ngày giờ, clipboard và fallback, không lỗi JavaScript hoặc tràn ngang. Ảnh kiểm tra ở `.local/qa/`, không đưa lên website.
