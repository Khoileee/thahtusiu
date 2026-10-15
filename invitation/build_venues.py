"""Gộp dữ liệu nghiên cứu research/v3/*/venues.json thành dist/venues.mjs và ảnh WebP.

Chạy: python -X utf8 build_venues.py   (cần Pillow)
"""
import json, re, shutil
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent
SRC = ROOT.parent / 'research' / 'v3'
OUT_IMG = ROOT / 'dist' / 'assets' / 'v'
OUT_JS = ROOT / 'dist' / 'venues.mjs'
GROUPS = ['cafe', 'japanese', 'vietnamese', 'korean', 'thai', 'western']

# Ảnh bìa ưu tiên món/không gian thay cho biển hiệu (chỉ số 1-based theo thứ tự ảnh gốc).
COVER = {}
DROP = set()
# Quán đã bị loại sau khi xem (giữ nguyên dữ liệu nghiên cứu).
# Tên phụ hiển thị gọn hơn ghi chú nghiên cứu.
AKA = {'an-bistro-cafe': "Trước đây là AN'Garden, nay còn gọi là Eden Garden"}
EXCLUDE = {'torii-rooftop', 'le-monde-steak-nguyen-van-loc'}

CLUSTERS = [
    ('aeon', 'Trong AEON', lambda v, a: v.get('in_aeon') or 'trong aeon' in a),
    ('van-quan', 'Hồ Văn Quán', lambda v, a: 'văn quán' in a),
    ('mo-lao', 'Mộ Lao · Nguyễn Văn Lộc', lambda v, a: any(k in a for k in ['mộ lao', 'nguyễn văn lộc', 'ao sen', 'tsq', 'trần phú', 'quang trung'])),
    ('van-phu', 'Văn Phú · Vạn Phúc', lambda v, a: any(k in a for k in ['văn phú', 'kiến hưng', 'vạn phúc', 'tố hữu'])),
    ('duong-noi', 'Quanh AEON', lambda v, a: True),
]


def cluster(v):
    a = (v.get('area', '') + ' ' + ('trong aeon' if 'Trong AEON' in v.get('distance_to_aeon', '') else '')).lower()
    for key, label, test in CLUSTERS:
        if test(v, a):
            return key


def num(s):
    s = s.replace(' ', '')
    if re.fullmatch(r'\d{1,3}(\.\d{3})+', s):
        return int(s.replace('.', '')) // 1000
    return int(s)


def price_short(text):
    if not text:
        return None
    per_person = [s for s in re.split(r'[;(]', text) if 'người' in s and re.search(r'\d\s*[kK]?\s*[–-]\s*\d', s)]
    if per_person and ('/món' in text or 'món' in text.split(';')[0]):
        text = per_person[0]
    m = re.search(r'(\d[\d.]*)\s*(k|K|\.000|đ|₫)?\s*[–-]\s*(\d[\d.]*)\s*(k|K|đ|₫)?', text)
    if m:
        a, b = num(m.group(1)), num(m.group(3))
        if b < 20 and a < 20:
            return None
        if a <= 1:
            return f'dưới {b}k'
        return f'{a}–{b}k'
    m = re.search(r'<\s*(\d+)k', text)
    if m:
        return f'dưới {m.group(1)}k'
    return None


def distance_short(v):
    d = v.get('distance_to_aeon', '')
    if v.get('in_aeon') or d.startswith('Trong AEON'):
        return 'Ngay trong AEON'
    kms = [m for m in re.finditer(r'~?\s*([\d.,]+)\s*km(?!\s*đường chim bay)', d)]
    km = kms[0] if kms else None
    mins = re.search(r'(\d+(?:[–-]\d+)?)\s*phút', d)
    parts = []
    if km:
        parts.append(f'{km.group(1).replace(".", ",")} km')
    if mins:
        parts.append(f'{mins.group(1)} phút')
    return ' · '.join(parts) or None


def hours_short(h):
    h = re.sub(r'\s*\((Google Maps|Thứ Bảy 17/10[^)]*)\)', '', h or '').strip()
    return re.sub(r'\s*\(Google Maps[^)]*\)', '', h)


def save_webp(src, dst, size, q):
    im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
    im.thumbnail((size, size), Image.LANCZOS)
    im.save(dst, 'WEBP', quality=q, method=6)
    return im.size


def main():
    if OUT_IMG.exists():
        shutil.rmtree(OUT_IMG)
    OUT_IMG.mkdir(parents=True)
    venues = []
    for g in GROUPS:
        f = SRC / g / 'venues.json'
        if not f.exists():
            print('skip', g)
            continue
        for rank, v in enumerate(x for x in json.loads(f.read_text(encoding='utf-8')) if x['id'] not in EXCLUDE):
            photos = [(i + 1, p) for i, p in enumerate(v['photos']) if (v['id'], i + 1) not in DROP]
            c = COVER.get(v['id'], 1)
            photos.sort(key=lambda t: t[0] != c)
            out_photos = []
            for n, (orig, p) in enumerate(photos):
                src = SRC / g / p['file']
                if not src.exists():
                    continue
                base = f"{v['id']}-{n + 1}"
                w, h = save_webp(src, OUT_IMG / f'{base}.webp', 1280, 72)
                if n == 0:
                    save_webp(src, OUT_IMG / f'{base}-s.webp', 760, 72)
                out_photos.append({'src': f'assets/v/{base}.webp', 'w': w, 'h': h, 'caption': p.get('caption', ''), 'source': p.get('source_url')})
            r = v.get('rating') or {}
            links = {k: u for k, u in (v.get('links') or {}).items() if u and k != 'maps_search'}
            venues.append({
                'id': v['id'], 'group': g, 'kind': 'cafe' if g == 'cafe' else 'food',
                'cuisine': v.get('cuisine') or ('cafe' if g == 'cafe' else g),
                'rank': rank, 'name': re.sub(r'\s*\(.*$', '', v['name']).strip(), 'aka': AKA.get(v['id']) or (re.search(r'\((.*)\)', v['name']) or [None, None])[1], 'sub': v.get('subcategory'), 'tagline': v.get('tagline'),
                'desc': v.get('description'), 'address': v.get('address'), 'area': v.get('area'),
                'cluster': cluster(v), 'inAeon': cluster(v) == 'aeon',
                'distance': distance_short(v), 'distanceFull': v.get('distance_to_aeon'),
                'hours': hours_short(v.get('hours')), 'price': price_short(v.get('price_range')), 'priceFull': v.get('price_range'),
                'signature': v.get('signature') or [], 'highlights': v.get('highlights') or [],
                'rating': {'score': r.get('score'), 'count': r.get('count'), 'source': r.get('source'), 'url': r.get('url')},
                'links': links, 'photos': out_photos, 'checked': v.get('open_evidence'),
            })
    clusters = {k: l for k, l, _ in CLUSTERS}
    OUT_JS.write_text('// Tự sinh bởi build_venues.py từ research/v2. Không sửa tay.\n'
                      f'export const clusters = {json.dumps(clusters, ensure_ascii=False)};\n'
                      f'export const venues = {json.dumps(venues, ensure_ascii=False, indent=1)};\n', encoding='utf-8')
    for v in venues:
        print(f"{v['group']:12} {v['id']:24} {v['cluster']:9} {str(v['price']):12} {str(v['distance']):22} {len(v['photos'])}")
    print(len(venues), 'venues')


if __name__ == '__main__':
    main()
