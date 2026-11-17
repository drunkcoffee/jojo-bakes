from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "jojo-waffle-a3-menu-preview.png"
IMG = ROOT / "public" / "assets" / "products"

W, H = 2480, 3508
M = 90
GAP = 28

COLORS = {
    "bg": "#f5dfbd",
    "paper": "#fffaf0",
    "cream": "#fff7e8",
    "ink": "#3f281b",
    "brown": "#6f4229",
    "caramel": "#b96d38",
    "muted": "#80604b",
    "line": "#dfc297",
    "soft": "#f1dcb9",
    "white": "#fffdf7",
}


def font(name, size):
    files = {
        "serif": "C:/Windows/Fonts/NotoSerifSC-VF.ttf",
        "sans": "C:/Windows/Fonts/NotoSansSC-VF.ttf",
        "bold": "C:/Windows/Fonts/msyhbd.ttc",
        "regular": "C:/Windows/Fonts/msyh.ttc",
    }
    return ImageFont.truetype(files[name], size)


F = {
    "h1": font("serif", 96),
    "h2": font("bold", 64),
    "h3": font("bold", 40),
    "h4": font("bold", 31),
    "body": font("regular", 28),
    "small": font("regular", 22),
    "tiny": font("regular", 19),
    "price": font("bold", 34),
    "price_big": font("bold", 45),
    "kicker": font("bold", 24),
}


def rect(draw, box, fill, outline=None, width=2, radius=0):
    if radius:
        draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)
    else:
        draw.rectangle(box, fill=fill, outline=outline, width=width)


def cover(path, size):
    im = Image.open(path).convert("RGB")
    return ImageOps.fit(im, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def contain_rgba(path, size):
    im = Image.open(path).convert("RGBA")
    im.thumbnail(size, Image.Resampling.LANCZOS)
    out = Image.new("RGBA", size, (255, 255, 255, 0))
    out.alpha_composite(im, ((size[0] - im.width) // 2, (size[1] - im.height) // 2))
    return out


def paste_cover(canvas, path, box):
    x1, y1, x2, y2 = box
    im = cover(path, (x2 - x1, y2 - y1))
    canvas.paste(im, (x1, y1))


def text(draw, xy, value, fill="ink", font_key="body", anchor=None):
    draw.text(xy, value, fill=COLORS[fill], font=F[font_key], anchor=anchor)


def wrap(draw, value, max_width, font_key="body"):
    words = list(value)
    lines, current = [], ""
    for word in words:
        test = current + word
        if draw.textlength(test, font=F[font_key]) <= max_width or not current:
            current = test
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def paragraph(draw, xy, value, max_width, fill="muted", font_key="small", leading=1.35, max_lines=None):
    x, y = xy
    lines = wrap(draw, value, max_width, font_key)
    if max_lines:
        lines = lines[:max_lines]
    line_h = int(F[font_key].size * leading)
    for line in lines:
        text(draw, (x, y), line, fill, font_key)
        y += line_h
    return y


def chip(draw, xy, label, dark=False, pad_x=18):
    x, y = xy
    f = F["small"]
    w = int(draw.textlength(label, font=f)) + pad_x * 2
    h = 48
    rect(draw, (x, y, x + w, y + h), COLORS["ink"] if dark else COLORS["white"], COLORS["line"], 2, 0)
    draw.text((x + w / 2, y + h / 2), label, fill=COLORS["white"] if dark else COLORS["ink"], font=f, anchor="mm")
    return x + w + 16


def section_header(draw, box, eyebrow, title, hint=""):
    x1, y1, x2, _ = box
    text(draw, (x1, y1), eyebrow, "caramel", "kicker")
    text(draw, (x1, y1 + 32), title, "ink", "h2")
    if hint:
        draw.text((x2, y1 + 58), hint, fill=COLORS["muted"], font=F["small"], anchor="ra")
    draw.line((x1, y1 + 105, x2, y1 + 105), fill=COLORS["line"], width=2)
    return y1 + 130


def price_row(draw, x, y, label, price, width, fs="small"):
    draw.line((x, y + 38, x + width, y + 38), fill=COLORS["line"], width=1)
    text(draw, (x, y), label, "ink", fs)
    draw.text((x + width, y), price, fill=COLORS["ink"], font=F["small"], anchor="ra")
    return y + 44


def feature_card(canvas, draw, box, image, title, price, desc, pills):
    x1, y1, x2, y2 = box
    rect(draw, box, COLORS["paper"], COLORS["line"], 2, 0)
    img_h = 225
    paste_cover(canvas, IMG / image, (x1, y1, x2, y1 + img_h))
    tx, ty = x1 + 24, y1 + img_h + 24
    text(draw, (tx, ty), title, "ink", "h3")
    draw.text((x2 - 24, ty + 4), price, fill=COLORS["ink"], font=F["price"], anchor="ra")
    paragraph(draw, (tx, ty + 50), desc, x2 - x1 - 48, "muted", "small", 1.25, 2)
    py = ty + 108
    px = tx
    for pill in pills:
        pw = int(draw.textlength(pill, font=F["tiny"])) + 22
        if px + pw > x2 - 20:
            px = tx
            py += 42
        rect(draw, (px, py, px + pw, py + 30), COLORS["white"], COLORS["line"], 1, 0)
        draw.text((px + 11, py + 6), pill, fill=COLORS["brown"], font=F["tiny"])
        px += pw + 9


def small_card(canvas, draw, box, image, title, price, desc):
    x1, y1, x2, y2 = box
    rect(draw, box, COLORS["paper"], COLORS["line"], 2, 0)
    img_h = int((y2 - y1) * 0.5)
    paste_cover(canvas, IMG / image, (x1, y1, x2, y1 + img_h))
    tx, ty = x1 + 16, y1 + img_h + 16
    text(draw, (tx, ty), title, "ink", "small")
    draw.text((x2 - 14, ty + 1), price, fill=COLORS["ink"], font=F["small"], anchor="ra")
    paragraph(draw, (tx, ty + 33), desc, x2 - x1 - 30, "muted", "tiny", 1.2, 2)


def main():
    canvas = Image.new("RGB", (W, H), COLORS["bg"])
    draw = ImageDraw.Draw(canvas)

    for y in range(0, H, 10):
        draw.line((0, y, W, y), fill="#ead6b8", width=1)

    hero = (M, M, W - M, 760)
    rect(draw, hero, COLORS["cream"], COLORS["line"], 2, 0)
    hx1, hy1, hx2, hy2 = hero
    image_x = hx1 + 1320
    paste_cover(canvas, IMG / "jojo-waffle-hero-bg.webp", (image_x, hy1, hx2, hy2))
    overlay = Image.new("RGBA", (hx2 - image_x, hy2 - hy1), (65, 36, 18, 18))
    canvas.paste(overlay, (image_x, hy1), overlay)
    logo = contain_rgba(IMG / "logo-jojo-bakes.webp", (160, 160))
    canvas.paste(logo, (hx1 + 70, hy1 + 78), logo)
    text(draw, (hx1 + 300, hy1 + 150), "TONIGHT'S SPECIAL · MADE FRESH", "caramel", "kicker")
    text(draw, (hx1 + 300, hy1 + 190), "WAFFLE ONLY MENU", "caramel", "kicker")
    text(draw, (hx1 + 60, hy1 + 330), "JOJO", "ink", "h1")
    text(draw, (hx1 + 60, hy1 + 425), "Waffle", "ink", "h1")
    paragraph(draw, (hx1 + 60, hy1 + 560), "现点现烤，跟网站一样：推荐先看，再选经典、特别、饼干、Nutella 和麻薯。", 1120, "muted", "small", 1.25, 1)
    cx = hx1 + 60
    for label, dark in [("Muslim Friendly", True), ("约 15 分钟", False), ("Cash / QR", False), ("WhatsApp 011-1078 8823", False)]:
        cx = chip(draw, (cx, hy1 + 620), label, dark)

    rec = (M, 810, W - M, 1545)
    rect(draw, rec, COLORS["white"], COLORS["line"], 2, 0)
    y = section_header(draw, (rec[0] + 36, rec[1] + 32, rec[2] - 36, rec[1] + 140), "第一次点可以看这里", "JOJO 推荐", "网站推荐顺序：抹茶系列 · 拉丝麻薯 · 开心果 Kunafa")
    card_gap = 26
    card_w = (rec[2] - rec[0] - 72 - card_gap * 2) // 3
    cards_y = y + 10
    cards_h = rec[3] - cards_y - 34
    feature_card(canvas, draw, (rec[0] + 36, cards_y, rec[0] + 36 + card_w, cards_y + cards_h), "waffle-matcha-chocolate.webp", "抹茶酱搭配", "RM8 起", "抹茶酱配喜欢的口味。", ["抹茶酱 RM8", "花生 / 巧克力 / 草莓 / 牛油 / Kaya RM9", "Oreo / Lotus Crumbs / 脆脆珠 RM10"])
    x = rec[0] + 36 + card_w + card_gap
    feature_card(canvas, draw, (x, cards_y, x + card_w, cards_y + cards_h), "waffle-mochi-pull.webp", "拉丝麻薯", "RM8 起", "内烤或外夹，再选口味。", ["经典麻薯 RM8", "特别麻薯 RM10", "Premium RM12-RM16"])
    x += card_w + card_gap
    feature_card(canvas, draw, (x, cards_y, x + card_w, cards_y + cards_h), "waffle-pistachio-kunafa.webp", "开心果 Kunafa 系列", "RM11 起", "酥脆 Kunafa 搭配开心果酱。", ["开心果酱 RM11", "开心果巧克力 Kunafa RM13", "开心果 Kunafa RM14"])

    body_y = 1595
    body_h = 1730
    col_gap = 46
    col_w = (W - M * 2 - col_gap) // 2
    left = (M, body_y, M + col_w, body_y + body_h)
    right = (M + col_w + col_gap, body_y, W - M, body_y + body_h)

    classic = (left[0], left[1], left[2], left[1] + 470)
    rect(draw, classic, COLORS["white"], COLORS["line"], 2, 0)
    y = section_header(draw, (classic[0] + 34, classic[1] + 32, classic[2] - 34, classic[1] + 140), "简单好吃", "经典口味", "可选 1 至 2 个口味")
    paste_cover(canvas, IMG / "waffle-classic.webp", (classic[0] + 34, y + 10, classic[0] + 315, classic[3] - 34))
    tx = classic[0] + 340
    text(draw, (tx, y + 24), "经典口味", "ink", "h3")
    draw.text((classic[2] - 45, y + 28), "RM5", fill=COLORS["ink"], font=F["price_big"], anchor="ra")
    paragraph(draw, (tx, y + 78), "可选一或两种喜欢的口味。", classic[2] - tx - 45, "muted", "small")
    flavours = ["巧克力", "花生", "草莓", "牛油", "蜜糖", "Kaya"]
    fx, fy = tx, y + 145
    fw = (classic[2] - tx - 45 - 18) // 3
    for idx, fl in enumerate(flavours):
        x = fx + (idx % 3) * (fw + 9)
        yy = fy + (idx // 3) * 58
        rect(draw, (x, yy, x + fw, yy + 45), COLORS["soft"], COLORS["line"], 1, 0)
        draw.text((x + fw / 2, yy + 23), fl, fill=COLORS["brown"], font=F["small"], anchor="mm")

    special = (left[0], classic[3] + GAP, left[2], left[3])
    rect(draw, special, COLORS["white"], COLORS["line"], 2, 0)
    y = section_header(draw, (special[0] + 34, special[1] + 32, special[2] - 34, special[1] + 140), "固定口味", "特别口味", "不用选择，直接点就好")
    specials = [
        ("waffle-matcha-chocolate.webp", "抹茶巧克力", "RM9", "推荐口味。"),
        ("waffle-matcha-lotus.webp", "抹茶 Lotus", "RM10", "抹茶配 Lotus。"),
        ("waffle-apam-balik.webp", "Apam Balik Waffle", "RM8", "花生香、边边脆。"),
        ("waffle-cookies-cream-oreo.jpg", "Cookies & Cream", "RM7", "奶香饼干口味。"),
        ("waffle-taro.webp", "芋泥 Waffle", "RM8", "芋泥比较温柔。"),
        ("waffle-mayo-chicken-floss.webp", "Mayo 鸡肉松", "RM8", "咸甜口。"),
        ("waffle-chicken-floss-taro.webp", "鸡肉松芋泥", "RM10", "咸香鸡肉松配芋泥。"),
        ("waffle-peanut-coffee.webp", "巧克力咖啡", "RM6", "巧克力配咖啡香。"),
        ("waffle-peanut-coffee.webp", "花生咖啡", "RM6", "花生配咖啡香。"),
    ]
    sw = (special[2] - special[0] - 68 - 24) // 3
    sh = (special[3] - y - 34 - 24) // 3
    for i, item in enumerate(specials):
        x = special[0] + 34 + (i % 3) * (sw + 12)
        yy = y + (i // 3) * (sh + 12)
        small_card(canvas, draw, (x, yy, x + sw, yy + sh), *item)

    cookies = (right[0], right[1], right[2], right[1] + 620)
    rect(draw, cookies, COLORS["white"], COLORS["line"], 2, 0)
    y = section_header(draw, (cookies[0] + 34, cookies[1] + 32, cookies[2] - 34, cookies[1] + 140), "选一种喜欢的饼干口味", "饼干系列", "Oreo · Lotus · 脆脆珠")
    for title, desc in [("Oreo 系列", "每份都有 Oreo 饼干碎，选一种口味。"), ("Lotus 系列", "每份都有 Lotus 碎，选一种口味。"), ("脆脆珠系列", "每份都有脆脆珠，选一种口味。")]:
        rect(draw, (cookies[0] + 34, y, cookies[2] - 34, y + 92), COLORS["paper"], COLORS["line"], 2, 0)
        text(draw, (cookies[0] + 58, y + 25), title, "ink", "h4")
        draw.text((cookies[2] - 58, y + 27), "RM7 起", fill=COLORS["ink"], font=F["price"], anchor="ra")
        paragraph(draw, (cookies[0] + 58, y + 61), desc, cookies[2] - cookies[0] - 116, "muted", "tiny", 1.2, 1)
        y += 106
    x1 = cookies[0] + 34
    half = (cookies[2] - cookies[0] - 68 - 24) // 2
    price_row(draw, x1, y + 8, "经典口味 + Cookies & Cream", "RM7", half)
    price_row(draw, x1, y + 55, "抹茶 / 芋泥 / Nutella", "RM10", half)
    price_row(draw, x1 + half + 24, y + 8, "开心果", "RM13", half)
    price_row(draw, x1 + half + 24, y + 55, "适用于 Oreo / Lotus / 脆脆珠", "", half)

    nutella = (right[0], cookies[3] + GAP, right[2], cookies[3] + GAP + 360)
    rect(draw, nutella, COLORS["white"], COLORS["line"], 2, 0)
    y = section_header(draw, (nutella[0] + 34, nutella[1] + 32, nutella[2] - 34, nutella[1] + 140), "Nutella 榛果巧克力酱已包含", "Nutella 系列", "RM8 起")
    paste_cover(canvas, IMG / "waffle-nutella.webp", (nutella[0] + 34, y + 10, nutella[0] + 300, nutella[3] - 34))
    x = nutella[0] + 335
    yy = y + 20
    yy = price_row(draw, x, yy, "Nutella 本身", "RM8", nutella[2] - x - 40)
    yy = price_row(draw, x, yy, "加一个经典口味", "RM9", nutella[2] - x - 40)
    px, py = x, yy + 16
    for fl in flavours:
        pw = int(draw.textlength(fl, font=F["tiny"])) + 28
        rect(draw, (px, py, px + pw, py + 34), COLORS["white"], COLORS["line"], 1, 0)
        draw.text((px + pw / 2, py + 17), fl, fill=COLORS["brown"], font=F["tiny"], anchor="mm")
        px += pw + 8

    mochi = (right[0], nutella[3] + GAP, right[2], right[3])
    rect(draw, mochi, COLORS["white"], COLORS["line"], 2, 0)
    y = section_header(draw, (mochi[0] + 34, mochi[1] + 32, mochi[2] - 34, mochi[1] + 140), "内烤或外夹，再选口味", "拉丝麻薯", "网站麻薯等级")
    rect(draw, (mochi[0] + 34, y, mochi[2] - 34, y + 94), COLORS["paper"], COLORS["line"], 2, 0)
    text(draw, (mochi[0] + 58, y + 24), "麻薯方式", "ink", "h4")
    chip(draw, (mochi[0] + 250, y + 20), "内烤麻薯")
    chip(draw, (mochi[0] + 405, y + 20), "外夹麻薯")
    y += 112
    blocks = [
        ("经典麻薯口味", "RM8", "选两种：巧克力、花生、草莓、牛油、蜜糖、Kaya。"),
        ("特别麻薯口味", "RM10", "选一种：抹茶、抹茶巧克力、Cookies & Cream、芋泥、Apam Balik、Nutella。"),
    ]
    for title, price, desc in blocks:
        rect(draw, (mochi[0] + 34, y, mochi[2] - 34, y + 105), COLORS["paper"], COLORS["line"], 2, 0)
        text(draw, (mochi[0] + 58, y + 25), title, "ink", "h4")
        draw.text((mochi[2] - 58, y + 27), price, fill=COLORS["ink"], font=F["price"], anchor="ra")
        paragraph(draw, (mochi[0] + 58, y + 65), desc, mochi[2] - mochi[0] - 116, "muted", "tiny", 1.2, 1)
        y += 124
    rect(draw, (mochi[0] + 34, y, mochi[2] - 34, mochi[3] - 34), COLORS["paper"], COLORS["line"], 2, 0)
    text(draw, (mochi[0] + 58, y + 25), "Premium 麻薯口味", "ink", "h4")
    draw.text((mochi[2] - 58, y + 27), "RM12 起", fill=COLORS["ink"], font=F["price"], anchor="ra")
    premium_items = [("芋泥鸡肉松", "RM12"), ("鸡肉松芋泥麻薯", "RM12"), ("开心果", "RM13"), ("开心果巧克力 Kunafa", "RM15"), ("开心果 Kunafa", "RM16")]
    px, py = mochi[0] + 58, y + 78
    pw = (mochi[2] - mochi[0] - 116 - 28) // 3
    for idx, (label, price) in enumerate(premium_items):
        x = px + (idx % 3) * (pw + 14)
        yy = py + (idx // 3) * 48
        rect(draw, (x, yy, x + pw, yy + 38), COLORS["white"], COLORS["line"], 1, 0)
        text(draw, (x + 12, yy + 8), label, "ink", "tiny")
        draw.text((x + pw - 12, yy + 8), price, fill=COLORS["ink"], font=F["tiny"], anchor="ra")

    footer = (M, H - 130, W - M, H - 70)
    rect(draw, footer, COLORS["white"], COLORS["line"], 2, 0)
    text(draw, (footer[0] + 28, footer[1] + 17), "JOJO BAKES · 夜市华夫饼 · 现点现烤", "ink", "small")
    draw.text((footer[2] - 28, footer[1] + 17), "取餐时间请以 WhatsApp 确认为准", fill=COLORS["muted"], font=F["small"], anchor="ra")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "PNG", optimize=True)


if __name__ == "__main__":
    main()
