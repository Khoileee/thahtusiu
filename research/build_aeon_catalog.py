import json
from pathlib import Path

root = Path(__file__).parent
items = json.loads((root / 'aeon-food-directory.json').read_text(encoding='utf-8'))
groups = [
    ('Nhật: sushi, ramen, udon, cơm và món nóng', ['ippudo','tokyo-tan-tan-ramen','isushi','marukame-udon','coco-ichibanya','chibo-okonomiyaki','botejyu','pepper-lunch','yakimono','chixmax']),
    ('Việt: cuốn, bò, món miền Nam/Huế, chả cá và sườn', ['hang-cuon','bo-to-quan-moc','nha-hang-phuong-nam','net-hue','vua-cha-ca','suon-muoi']),
    ('Pizza, mì Ý và món Âu/Mỹ', ['pizza-4ps','al-frescos','pizza-hut','the-pizza-company']),
    ('Nướng/lẩu và món Hàn', ['gogi-house','king-bbq','mr-dakgalbi','dookki','spicy-box']),
    ('Thái và Lào', ['khrua-baan-thai','thai-express','khao-lao']),
    ('Lẩu nấm và lẩu băng chuyền', ['ashima','kichi-kichi']),
    ('Trung/Đài: có trong danh mục, không thuộc nhánh ưu tiên của buổi hẹn', ['meiwei','tian-long','manwah','wulao','yutang','cua-dang-jia']),
    ('Các quán khác: lẩu hấp, mì, thương hiệu chưa đủ mô tả', ['long-wang','star-noodle','woomaster']),
    ('Gà rán, burger và đồ ăn nhanh', ['kfc','lotteria','texas-chicken','jollibee','mcdonalds']),
    ('Café, trà và nước uống', ['starbucks','highlands-coffee','katinat','universal-coffee','mocha-cat-cafe','koi','ding-tea','23927','foremost','mana-juice']),
    ('Bánh, đồ ăn vặt, kem và đặc sản', ['chichiko','mama-bakery','breadtalk','langfarm','azabu-sabo','swensens','quiches','bing-xue','mixue','hulu','magic-candy','candy-land-nina-de-printa']),
]

text = '''# Danh mục ăn uống AEON Hà Đông và các lựa chọn quanh mall

Rà soát ngày 14/10/2026. Đã đọc đủ 12 trang danh mục chính thức, tổng 179 cửa hàng; chọn ra 66 điểm ăn uống/café/bánh/kem. Có 39 mục được AEON gắn nhãn Nhà hàng; các điểm còn lại gồm foodcourt, café và ăn vặt. Danh sách này là kiểm kê nguồn công khai, không phải 66 quán đều đã được kiểm chứng chất lượng, giá mới nhất hoặc khả năng phục vụ dị ứng.

Nguồn chính: [danh mục AEON](https://aeonmall-hadong.com.vn/danh-muc-cua-hang/). Đối chiếu thêm [bảng gian hàng chương trình tháng 10/2026](https://aeonmall-hadong.com.vn/su-kien/chuong-trinh-khuyen-mai-waon-x5/). Tầng dưới đây theo danh mục chi nhánh; một số mục trống được bổ sung từ bảng tháng 10. Không sử dụng mức giá quảng bá cũ trên trang giới thiệu như báo giá hiện hành.

## Những lựa chọn cần xem trước cho buổi hẹn

| Hướng | Quán | Vị trí | Điều cần cân nhắc |
|---|---|---|---|
| Cuốn Việt | Hàng Cuốn | Tầng 1 T153-2 | Dữ liệu menu đã xem là 2024; cần hỏi giá mới, nhân và nước chấm |
| Bò Việt | Bò Tơ Quán Mộc | Tầng 2 T273 | Chi nhánh có menu riêng theo AEON; không áp giá/menu quán ngoài mall |
| Món Việt miền Nam | Phương Nam | Tầng 1 T167 | Có nhiều món chia sẻ; tránh mặc định bánh xèo/gỏi không chứa tôm |
| Món Huế | Nét Huế | Tầng 1 T146 | Nhiều món tôm/chả/sốt phải hỏi thành phần; không chọn combo tùy tiện |
| Chả cá | Vua Chả Cá | Tầng 2 T262–263 | Hỏi mắm tôm/nước chấm thay thế và dụng cụ dùng chung; cá vẫn cần bạn ấy xác nhận ăn được |
| Ramen | IPPUDO | Tầng 1 T155 | Có ramen, gyoza và cơm; chưa tìm được giá đúng chi nhánh đủ chắc |
| Ramen | Tokyo Tan Tan Ramen | Tầng 3 T334, foodcourt | AEON xếp vào vườn ẩm thực; cần xem góc ngồi và kiểm tra nước dùng |
| Sushi | iSushi | Tầng 2 T251 | Buffet; nguồn cũ ghi tầng 1 T162 nên có mâu thuẫn. Chưa chốt giá buffet hiện tại; không mặc định rẻ |
| Cơm cà ri Nhật | CoCo Ichibanya | Tầng 1 T149 | Giá online của đơn vị vận hành chưa xác nhận cho Hà Đông |
| Udon | Marukame Udon | Tầng 1 T150–151 | Tự phục vụ; kiểm tra nước dùng, sốt và khu tempura có tôm |

Đề xuất trên thiệp giữ tối đa 4 card: Hàng Cuốn, Bò Tơ Quán Mộc, IPPUDO, iSushi. Các card khác dùng để đổi lựa chọn. Đây là shortlist để tìm hiểu sâu tiếp, chưa coi tất cả đã hoàn tất kiểm chứng.

## Toàn bộ điểm ăn uống trong danh mục
'''

indexed = {x['url'].strip('/').split('/')[-1]: x for x in items}
used = set()
floor_extra = {'woomaster':'Tầng 1 (bảng tháng 10)', 'wulao':'Tầng 1 (bảng tháng 10)', 'long-wang':'Tầng 2 (bảng tháng 10)', 'spicy-box':'Tầng 2 (bảng tháng 10)'}
for label, slugs in groups:
    text += f'\n### {label}\n\n| Quán | Tầng/gian |\n|---|---|\n'
    for slug in slugs:
        if slug not in indexed:
            continue
        x = indexed[slug]
        used.add(slug)
        floor = next((m.replace('|','/') for m in x['meta'] if 'Tầng' in m), floor_extra.get(slug,'Chưa ghi trong danh mục'))
        text += f"| [{x['name']}]({x['url']}) | {floor} |\n"

remaining = set(indexed) - used
assert not remaining, f'Unclassified venues: {remaining}'

text += '''
### Khu/quầy bổ sung ngoài 66 mục trên

- **Lẩu Á / Asia Pot & Food**: bảng tháng 10 ghi tầng 3; [thông báo foodcourt năm 2026](https://aeonmall-hadong.com.vn/su-kien/foodcourt-x-amusement/) nêu Lẩu Á cùng Botejyu, Tokyo Tantan, Star Noodle và Chixmax. Chưa có gian hàng cụ thể trong danh mục 12 trang.
- **Delica và khu đồ ăn của siêu thị AEON**: sushi, cơm hộp và món chế biến sẵn; đây là khu ăn uống/quầy tự chọn, không phải một nhà hàng sushi có phục vụ tại bàn. [Nguồn AEON Việt Nam](https://corp.aeon.com.vn/aeon-mall-ha-dong/).

Các bài/menu lưu trữ còn có Sushi Kei, Chotto, Thai Pattaya, Meat Plus, Yang Hao… nhưng các tên này không xuất hiện trong 179 cửa hàng của lần rà này. Không kết luận mọi thương hiệu đã đóng cửa; chỉ không đưa chúng vào danh sách hiện hành khi chưa có chứng cứ bổ sung. iSushi còn mâu thuẫn ngay giữa website thương hiệu (T162 tầng 1) và AEON/bảng tháng 10 (T251 tầng 2); dùng AEON làm mốc tạm, cần kiểm tra thực tế.

## Ngoài mall, trong cụm An Hưng–Dương Nội–Văn Khê

| Quán | Địa chỉ được nguồn công khai ghi | Món và độ phù hợp |
|---|---|---|
| Bò An Khang | BT02-12 KĐT An Hưng | Bò tơ cuốn bánh tráng, bò/lẩu/phở; nhà hàng lớn thiên về nhóm/gia đình. Menu và độ ồn hiện tại chưa xác nhận |
| An Lộc Hưng / Phở Hoàng | LK15, lô 18–20 KĐT An Hưng | Bê cuốn bánh tráng, bê hấp tía tô, bò nhúng dấm/phở. Có phòng nhóm và karaoke, không suy ra yên tĩnh cho bàn hai người |
| Mỏ Khoét HĐ | V11-B07 Terra An Hưng | Phở cuốn bò 50k/5 chiếc, gỏi cuốn thịt nướng 50k/3 chiếc trên beFood; không gian tại chỗ chưa rõ, phản hồi giao hàng không đồng nhất |
| Nabeyaki | Biệt thự M09-L05 KĐT Dương Nội | Buffet nướng/lẩu Nhật có sushi. PasGo đã dừng nhận đặt chỗ; chưa xác nhận kinh doanh tại chỗ hiện nay, giữ ở mức ứng viên cần kiểm tra |
| Wakamono Sushi | Ô 32 LK16 KĐT An Hưng | Chỉ tìm được danh bạ; thông tin giờ 24/7 đáng nghi, chưa có menu/ảnh/review mới đủ chắc. Không dùng làm điểm hẹn chính |
| Hoàng Quân Seafood | V3-A04 Terra An Hưng, 102 Nguyễn Thanh Bình | Sushi/sashimi, ShopeeFood ghi Shop Online; không coi là nhà hàng ngồi ăn đã xác nhận |
| Tasty — Bún Cuốn, Phở Cuốn & Trộn | Số 8 LK9 KĐT Văn Khê | Có danh sách giao hàng; chưa đủ thông tin phòng ăn và giờ hiện tại |

Nguồn:

- [Review Bò An Khang](https://angiday.me/quan-bo-an-khang), [địa chỉ đối chiếu](https://hotel84.com/nha-hang/bo-an-khang-bt02-12-kdt-an-hung-ha-dong.html). Các trang boankhang.com/boankhang.vn tự mô tả demo/khách hàng làm, không coi menu của chúng là nguồn chính thức.
- [An Lộc Hưng trên PATO](https://pato.com.vn/products/an-loc-hung-kdt-an-hung), [PasGo](https://www.pasgo.vn/blog/danh-sach-quan-an-ngon-nhat-khu-vuc-quan-ha-dong-612).
- [Mỏ Khoét beFood](https://food.be.com.vn/ha-noi/mo-khoet-hd-pho-chien-phong-goi-cuon-the-terra-an-hung-77379). Chữ “Đóng cửa” ở trang giao hàng chỉ là trạng thái thời điểm xem, không phải bằng chứng đóng vĩnh viễn. Khoảng cách/ETA tự sinh ở trang không dùng để tính tuyến đi.
- [Nabeyaki PasGo](https://pasgo.vn/nha-hang/nabeyaki-kdt-duong-noi-3560), [Foody](https://www.foody.vn/ha-noi/nabeyaki-nuong-lau-nhat-ban-kdt-duong-noi).
- [Wakamono danh bạ](https://www.viet-biz.com/wakamono-sushi-094-555-53-88). Không lấy menu của Wakamono Chicago cùng tên.
- [Hoàng Quân ShopeeFood](https://shopeefood.vn/ha-noi/hoang-quan-seafood-sashimi-sushi-nguyen-thanh-binh-shop-online.jesmmc).
- [Tasty ShopeeFood](https://shopeefood.vn/ha-noi/bun-cuon-pho-cuon-tron-tasty-van-khe).

Chưa có số đo tuyến/ETA từ Google Maps. Các địa chỉ thuộc cùng khu vực rộng, không có nghĩa đi bộ sát nhau. Có thể mở tìm kiếm bằng [Maps An Hưng](https://www.google.com/maps/search/?api=1&query=Khu+do+thi+An+Hung+Ha+Dong) và [Maps AEON Hà Đông](https://www.google.com/maps/search/?api=1&query=AEON+Mall+Ha+Dong).

## Nếu mở rộng sang cụm Mộ Lao, xa hơn AEON–An Hưng

- **Let’s Sushi**: 53 khu A TSQ Nguyễn Văn Lộc; đã nghiên cứu menu/ảnh trong [bản Nhật–Việt](first-date-nhat-viet.md), [website chính thức](https://letsushi.vn/).
- **Darumen — mì ramen và cơm Nhật**: nguồn Foody/ShopeeFood ghi số 56 Nguyễn Văn Lộc, LK6A Mộ Lao. Chưa xác nhận menu và ảnh mới tại chỗ. [Foody](https://www.foody.vn/ha-noi/darumen-mi-ramen-com-nhat-nguyen-van-loc), [ShopeeFood](https://shopeefood.vn/ha-noi/darumen-mi-ramen-com-nhat-nguyen-van-loc).
- **Phú Cường Hồ Gươm Plaza**: 102 Trần Phú; cuốn heo/bò có giá website rõ hơn; [menu chính thức](https://banhtrangphucuong.vn/banh-trang/).

Đây là tuyến mở rộng riêng, không ghép mặc định với phim AEON nếu ưu tiên ít di chuyển.

## Hai thứ tự để bạn ấy chọn

| Phương án | Khung giờ đề xuất | Khi nào hợp |
|---|---|---|
| Café → phim → ăn | Café 15:30–16:15; di chuyển/đệm; nhắm phim khoảng 17:00; ăn khoảng 19:00 | Xem phim rồi có chủ đề nói chuyện lúc ăn |
| Café → ăn → phim | Café 15:30–16:15; ăn tại AEON khoảng 17:00–18:15; nhắm phim 19:00 | Nếu muốn ăn sớm và xem phim tối |

Các giờ là khung nhắm tới, không phải suất phim/đặt bàn đã xác nhận. Phim dự kiến 80–100 phút, giữ thêm thời gian vào rạp và quảng cáo. Trước phim nên ưu tiên gọi món; không ghép buffet cần ngồi lâu vào một khoảng ăn ngắn. Café 45–60 phút là mặc định, không bắt buộc ngồi đủ thời lượng.

Vẫn chưa có nhà hàng nào xác nhận đáp ứng dị ứng tôm/cua. Với ramen kiểm tra nước dùng/sốt; sushi kiểm tra nhân/sốt và dụng cụ; cuốn Việt kiểm tra nước chấm/nhân; chả cá kiểm tra mắm tôm và lựa chọn thay thế. Không ghi trên thiệp rằng các quán này an toàn cho dị ứng.
'''

(root / 'aeon-food-options.md').write_text(text, encoding='utf-8')
print(f'Saved {len(used)} directory venues to aeon-food-options.md')
