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

Thiệp "Dear chị Tú iu ♡" cho thứ Bảy **17/10/2026**: chọn đồ uống (theo không gian) → bữa tối (Á/Âu → Nhật, Việt, Hàn, Thái, Âu) → phim và thứ tự → xem lại, gửi kèo, mở đường đi trên Google Maps.

Dữ liệu 28 quán đã chọn lọc nằm ở `research/v3/<nhóm>/venues.json` (điểm, giờ mở cửa và review đối chiếu Google Maps, fanpage, Lemon8 ngày 15/10/2026; vòng tìm rộng ở `research/v2`). Sau khi sửa dữ liệu, chạy `python -X utf8 invitation/build_venues.py` (cần Pillow) để sinh lại `invitation/dist/venues.mjs` và ảnh WebP. Lựa chọn chỉ lưu trong trình duyệt người xem; nút "Gửi kèo" dùng Web Share hoặc sao chép.

## Kiểm tra và triển khai

```sh
cd invitation
node check.mjs
```

Không cần chạy script lấy ảnh để xem hoặc sửa thiệp. `prepare_assets.py` là script chuẩn bị ban đầu, còn tham chiếu thư mục ảnh sinh trên máy cũ; ảnh gốc và WebP đã được lưu sẵn. `refresh_cafes.py` dùng ảnh trong `research/cafe-refresh` và cần Python với Pillow.

`browser-check.mjs` là kiểm tra tùy chọn bằng Playwright; trên máy mới cần cài bằng `npm install --prefix .local playwright` và chỉnh `executablePath` cho Chrome của máy đó. File này hiện dùng đường dẫn Chrome trên Windows. Khi chạy kiểm tra trình duyệt, server ở cổng 4173 phải đang hoạt động.

Netlify: chọn base directory `invitation`, publish directory `dist`, không cần build command; hoặc tải trực tiếp nội dung `invitation/dist` lên Netlify Drop. Cache, dependency đã cài và file nén xuất bản không đưa vào Git.
