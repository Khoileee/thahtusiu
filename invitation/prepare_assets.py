"""Copy research assets and encode web formats; do not alter the originals."""
from pathlib import Path
import json, shutil, requests
from PIL import Image
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
WORKSPACE = ROOT.parent
OUT = ROOT / 'dist' / 'assets'
OUT.mkdir(parents=True, exist_ok=True)
generated = Path(r'C:\Users\ooOoo\.codex\generated_images\01a135e1-8f43-70a2-8d9e-5a2468e2bedb')
for src, dest in [('exec-2f8ccfbf-220e-4ccd-8f2d-e451c20853a4.png','hero'),('exec-b22cd2bc-7f5f-4c2c-a736-88c142977889.png','tickets')]:
    originals = ROOT / 'artwork'
    originals.mkdir(exist_ok=True)
    shutil.copy2(generated / src, originals / (dest + '.png'))
    Image.open(generated / src).save(OUT / (dest + '.webp'), 'WEBP', quality=88, method=6)
for src, dest in [('matcha-vibe-2.jpg','matcha-an-hung.webp'),('aeon-ippudo-source.jpg','ippudo.webp'),('hang-cuon-interior.jpg','hang-cuon.webp'),('aeon-bo-to-quan-moc-source.png','bo-to.webp'),('aeon-isushi-source.jpg','isushi.webp'),('lets-sushi-1.jpg','lets-sushi.webp'),('phu-cuong-cs3-interior.jpg','phu-cuong.webp')]:
    Image.open(WORKSPACE / 'research' / 'photos' / src).save(OUT / dest, 'WEBP', quality=88, method=6)

session = requests.Session()
session.headers['User-Agent'] = 'Mozilla/5.0'
sources = [
    ('matcha-ha-cau.webp', 'https://matchavibe.vn/blogs/news/matcha-vibe-co-so-27'),
    ('film-poppy.webp', 'https://www.momo.vn/cinema/ngon-doi-hoa-hong-anh-25142'),
    ('film-shaun.webp', 'https://www.momo.vn/cinema/shaun-the-sheep-quai-la-ghe-nha-25151'),
]
manifest = []
for dest, url in sources:
    res = session.get(url, timeout=30); res.raise_for_status()
    soup = BeautifulSoup(res.text, 'html.parser')
    if dest.startswith('matcha'):
        imgs = [i.get('src') for i in soup.select('img') if 'co-so-27' in str(i.get('src','')) and '.jpg' in str(i.get('src',''))]
        image_url = imgs[0] if imgs else soup.select_one('meta[property="og:image"]')['content']
    else:
        image_url = soup.select_one('meta[property="og:image"]')['content']
    if image_url.startswith('//'): image_url = 'https:' + image_url
    r = session.get(image_url, timeout=30); r.raise_for_status()
    original = ROOT / 'artwork' / dest.replace('.webp','.source')
    original.write_bytes(r.content)
    with Image.open(original) as im: im.save(OUT / dest, 'WEBP', quality=88, method=6)
    manifest.append({'file':dest,'source':url,'image_url':image_url,'checked':'2026-10-14'})
    print(dest, image_url)
(ROOT / 'asset-sources.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
print('Asset preparation complete.')
