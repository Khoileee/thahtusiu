# thahtusiu

Workspace gồm trang xin lỗi ban đầu, thiệp mời hẹn và dữ liệu nghiên cứu địa điểm ở Hà Đông. Bản đã dựng và ảnh cần thiết đều có trong repo, có thể chạy ngay sau khi clone; không cần database.

## Tiếp tục trên máy khác

```sh
git clone https://github.com/Khoileee/thahtusiu.git
cd thahtusiu
python -m http.server 4173 --directory invitation/dist
```

Mở **http://localhost:4173** để xem thiệp hẹn. Trên máy dùng lệnh `python3`, thay `python` bằng `python3`. Phải dùng HTTP vì thiệp sử dụng JavaScript ES modules.

## Cấu trúc

- `invitation/dist/`: mã nguồn chạy trực tiếp của thiệp hẹn, gồm HTML, CSS, JavaScript và ảnh.
- `invitation/artwork/`: ảnh gốc và minh họa đã tạo.
- `invitation/README.md`: cách chạy, triển khai Netlify và kiểm tra.
- `invitation/CAFE-REFRESH.md`: lý do thay lựa chọn café và giới hạn xác minh.
- `research/`: ghi chú kế hoạch, nguồn web, danh mục quán, ảnh đã tải và script nghiên cứu.
- `src/letter.html`, `src/build.py`: mã nguồn và script dựng trang xin lỗi cũ.
- `dist/`: trang xin lỗi cũ đã dựng. Chạy `python -m http.server 4174 --directory dist` để xem riêng.

## Trạng thái bàn giao

Thiệp hẹn dự kiến thứ Bảy **17/10/2026**, theme navy, chọn café → món Việt/Nhật → phim và thứ tự hoạt động → xem lại/chia sẻ. Có quay lại, lựa chọn tự nhập và ghi chú. Lựa chọn lưu trong trình duyệt; chưa có hệ thống tự gửi phản hồi về cho chủ thiệp.

Café hiện tại: **AN’ Garden (Văn Quán)** và **Meicha (Mộ Lao)**. Cần xác nhận oat milk, khả năng pha không thêm đường, menu/giá mới và bàn phù hợp. Cần chốt suất chiếu thực tế tại CGV AEON Hà Đông và hỏi nhà hàng về dị ứng tôm/cua trước khi đặt. Chi tiết và nguồn nằm trong từng thẻ và các file nghiên cứu.

Thiệp đã xuất bản riêng tư tại https://hen-cau-chieu-thu-bay.ngockhoile03.chatgpt.site. GitHub và Sites có quyền truy cập riêng; push repo không đổi quyền truy cập Site. Giữ `invitation/.openai/hosting.json` nếu tiếp tục sửa đúng Site này.

## Kiểm tra và triển khai

```sh
cd invitation
node check.mjs
```

Không cần chạy script lấy ảnh để xem hoặc sửa thiệp. `prepare_assets.py` là script chuẩn bị ban đầu, còn tham chiếu thư mục ảnh sinh trên máy cũ; ảnh gốc và WebP đã được lưu sẵn. `refresh_cafes.py` dùng ảnh trong `research/cafe-refresh` và cần Python với Pillow.

`browser-check.mjs` là kiểm tra tùy chọn bằng Playwright; trên máy mới cần cài bằng `npm install --prefix .local playwright` và chỉnh `executablePath` cho Chrome của máy đó. File này hiện dùng đường dẫn Chrome trên Windows. Khi chạy kiểm tra trình duyệt, server ở cổng 4173 phải đang hoạt động.

Netlify: chọn base directory `invitation`, publish directory `dist`, không cần build command; hoặc tải trực tiếp nội dung `invitation/dist` lên Netlify Drop. Cache, dependency đã cài và file nén xuất bản không đưa vào Git.
