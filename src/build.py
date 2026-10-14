import base64, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "src/letter.html").read_text(encoding="utf-8")
def b64(name): return "data:image/webp;base64," + base64.b64encode((root / name).read_bytes()).decode()
page = src.replace("__TEARY__", b64("teary.webp")).replace("__THANKFUL__", b64("thankful.webp"))
dist = root / "dist"; dist.mkdir(exist_ok=True)
(dist / "thu-xin-loi.html").write_text(page, encoding="utf-8")  # fragment for Artifact
head, rest = page.split("<style>", 1)
full = ('<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head + "<style>" + rest.split("</style>", 1)[0] + "</style>\n</head>\n<body>\n"
        + rest.split("</style>", 1)[1] + "\n</body>\n</html>\n")
(dist / "index.html").write_text(full, encoding="utf-8")  # standalone for Netlify/GitHub Pages
print("ok", len(page))
