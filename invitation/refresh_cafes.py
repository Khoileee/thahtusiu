"""Refresh venue data and copy inspected photos without changing their content."""
from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parent
photos = root.parent / 'research' / 'cafe-refresh'
source_an = 'https://le-house.vn/projects/19-ans-garden'
source_meicha = 'https://toididau.net/place/meicha-matcha-ha-dong/30871'
assets = [
    ('an-18.jpg', 'an-garden.webp', source_an, 'https://le-house.vn/image/get-image?file=project%2Fan%27s+garden%2FANGARDENCAFE18.jpg'),
    ('an-interior.jpg', 'an-garden-interior.webp', source_an, 'https://le-house.vn/image/get-image?file=project%2Fan%27s+garden%2FANGARDENCAFE15.jpg'),
    ('meicha-4.jpg', 'meicha.webp', source_meicha, 'https://api.toididau.net/uploads/2026/04/417f810213eff435e9f99617706115bc.jpg'),
    ('meicha-5.jpg', 'meicha-front.webp', source_meicha, 'https://api.toididau.net/uploads/2026/04/93e64acc8cd0ef6ce9253de609f780c6.jpg'),
]
for src, dest, _, _ in assets:
    Image.open(photos / src).save(root / 'dist' / 'assets' / dest, 'WEBP', quality=88, method=6)
manifest_path = root / 'asset-sources.json'
manifest = [x for x in json.loads(manifest_path.read_text(encoding='utf-8')) if x['file'] not in [a[1] for a in assets]]
manifest += [{'file':dest,'source':source,'image_url':url,'checked':'2026-10-14'} for _,dest,source,url in assets]
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

cafes = [
    dict(id='an-garden', name="AN’ Garden", subtitle='Kính, nắng & khoảng xanh', location='56 BT8 Hồ Văn Quán, Hà Đông, Hà Nội', image='an-garden.webp', imageLabel='Ảnh kiến trúc · Hiroyuki Oki / Lê House', photoSource=source_an,
         gallery=[dict(image='an-garden-interior.webp',caption='Không gian thông tầng · ảnh công trình 2017, Hiroyuki Oki / Lê House')],
         kicker='VĂN QUÁN · KÍNH & ÁNH SÁNG', desc='Một góc bên cửa kính, nhiều cây và khoảng trần cao để mở đầu buổi hẹn.', meta='Ưu tiên không gian · Văn Quán, xa AEON hơn',
         price='Khoảng 30–80k/đồ uống theo danh mục Tôi Đi Cafe; chưa phải menu giá hiện hành. Chưa xác nhận oat milk.',
         vibe='Khung thép đen, cửa kính lớn, cây treo và các tầng mở nối với nhau. Mình chọn nơi này vì không gian hiện đại, thoáng và có chiều sâu. Ảnh từ hồ sơ công trình 2017 của Lê House; nội thất hiện tại có thể thay đổi.',
         note='Xin bàn hai người gần cửa kính, hỏi độ đông và menu trước khi đi. Quán ở Văn Quán, cần đi xe sang AEON; khung hẹn chừa 45 phút sau café cho di chuyển và chuẩn bị. Nếu muốn matcha đắng, không thêm đường, oat milk, cần hỏi khả năng pha đúng yêu cầu.',
         source='https://toidicafe.vn/place/an-garden-cafe', menu='https://www.facebook.com/angardencafe/',
         review='Có khu cho trẻ nhỏ theo Tôi Đi Cafe, nên chưa thể hứa yên tĩnh vào chiều thứ Bảy. Chưa xác minh điểm Google Maps trực tiếp. Đây là lựa chọn vì kiến trúc, không phải khẳng định quán đang hot trend.'),
    dict(id='meicha', name='Meicha', subtitle='Một tiệm matcha nhỏ xinh', location='7 LK6A, Mộ Lao, Hà Đông, Hà Nội', image='meicha.webp', imageLabel='Ảnh không gian · Tôi Đi Đâu', photoSource=source_meicha,
         gallery=[dict(image='meicha-front.webp',caption='Mặt tiền tiệm · ảnh trên Tôi Đi Đâu')],
         kicker='MỘ LAO · TIỆM MATCHA NHỎ', desc='Tông kem và xanh, bàn nhỏ cho hai người, một chiếc bảng nhắn gửi dễ thương.', meta='Ưu tiên matcha · Mộ Lao, xa AEON hơn',
         price='Khách kể lại mức 30–45k và 60–70k tùy dòng matcha; cần hỏi menu hiện tại và oat milk.',
         vibe='Ảnh có quầy nhỏ, ghế xanh và bảng giấy nhắn. Review nhắc chỗ ngồi ngoài và view hồ; ảnh chưa kiểm chứng được view.',
         note='Chưa xác nhận matcha đắng, không thêm đường, oat milk. Xin bàn thoáng và xem tuyến Mộ Lao → AEON trước khi chốt.',
         source=source_meicha, menu='https://www.instagram.com/heymeicha/', phone='0783891997',
         review='Review tổng hợp khen đồ uống và tư vấn; mẫu nhỏ, chưa xác minh Google Maps trực tiếp.')
]
data_path = root / 'dist' / 'data.mjs'
text = data_path.read_text(encoding='utf-8')
a = text.index('export const cafes = [')
b = text.index('export const restaurants = [')
text = text[:a] + 'export const cafes = ' + json.dumps(cafes,ensure_ascii=False,indent=2) + ';\n' + text[b:]
data_path.write_text(text,encoding='utf-8')
for filename in ['check.mjs','browser-check.mjs']:
    p=root / filename
    p.write_text(p.read_text(encoding='utf-8').replace('vibe-an-hung','an-garden'),encoding='utf-8')
p=root / 'dist' / 'plan.mjs'
text=p.read_text(encoding='utf-8').replace("s.cafe==='vibe-an-hung'||s.cafe==='vibe-ha-cau'", '!!s.cafe')
p.write_text(text,encoding='utf-8')
p=root / 'dist' / 'app.mjs'
text=p.read_text(encoding='utf-8')
text=text.replace("heading('Bắt đầu bằng một chút matcha.','Ngồi lại khoảng 45 phút, kể nhau nghe tuần vừa rồi thế nào.')", "heading('Một góc có nắng, một ly đúng gu.','Một nơi nhiều kính và khoảng xanh, hay một tiệm matcha nhỏ? Ngồi lại khoảng 45 phút thôi nhé.')")
text=text.replace("${item.menu?external(item.menu,'Xem menu'):''}", "${item.menu?external(item.menu,cafes.includes(item)?'Trang quán · hỏi menu':'Xem menu'):''}")
if 'class="venue-gallery"' not in text:
    text=text.replace('<div class="dialog-body"><div class="eyebrow">${esc(item.kicker)}', '${item.gallery?.length?`<div class="venue-gallery">${item.gallery.map(photo=>`<figure><img src="assets/${esc(photo.image)}" alt="${esc(photo.caption)}" loading="lazy"><figcaption>${esc(photo.caption)}</figcaption></figure>`).join(\'\')}</div>`:\'\'}<div class="dialog-body"><div class="eyebrow">${esc(item.kicker)}')
p.write_text(text,encoding='utf-8')
print('Updated two cafe choices, inspected photos, gallery, and response preference.')
