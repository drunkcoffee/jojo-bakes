"""Prepare JOJO BAKES image assets without modifying the original raw files.

Run with the bundled runtime:
  C:/Users/jiayi/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe scripts/prepare_jojo_assets.py
"""
from __future__ import annotations

import json
from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "public" / "assets" / "raw" / "jojo"
PRODUCTS = ROOT / "public" / "assets" / "products"
CREAM = (255, 246, 231)
CARD_SIZE = (900, 1080)
HERO_SIZE = (1600, 900)


def find_file(*keywords: str) -> Path | None:
    files = [path for path in RAW.rglob("*") if path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}]
    for keyword in keywords:
        keyword = keyword.lower()
        for path in files:
            if keyword in path.name.lower():
                return path
    return None


def open_image(path: Path) -> Image.Image:
    with Image.open(path) as image:
        return ImageOps.exif_transpose(image).convert("RGB")


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    return ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def save(image: Image.Image, output: str, source: Path, kind: str, use: str, records: list[dict], transparent: bool = False, product_id: str | None = None, display_name: str | None = None, manually_assigned: bool = False) -> None:
    PRODUCTS.mkdir(parents=True, exist_ok=True)
    destination = PRODUCTS / output
    image.save(destination, "WEBP", quality=82, method=6)
    with Image.open(destination) as final:
        width, height = final.size
    record = {
        "sourceFile": str(source.relative_to(ROOT)).replace("\\", "/"),
        "outputFile": output,
        "type": kind,
        "suggestedUse": use,
        "width": width,
        "height": height,
        "transparentBackground": transparent,
        "fileSizeBytes": destination.stat().st_size,
    }
    if product_id:
        record["productId"] = product_id
    if display_name:
        record["displayName"] = display_name
    if manually_assigned:
        record["manuallyAssigned"] = True
    records.append(record)


def cream_product(crop: Image.Image, size: tuple[int, int] = CARD_SIZE) -> Image.Image:
    """Put a closely cropped real product photo on a consistent cream card canvas.

    This deliberately avoids aggressive automated background removal: green drinks and
    the green menu background are too similar for safe colour-key removal.
    """
    canvas = Image.new("RGB", size, CREAM)
    max_width, max_height = int(size[0] * 0.84), int(size[1] * 0.82)
    scale = min(max_width / crop.width, max_height / crop.height)
    crop = crop.resize((round(crop.width * scale), round(crop.height * scale)), Image.Resampling.LANCZOS)
    x = (size[0] - crop.width) // 2
    y = (size[1] - crop.height) // 2 - 10
    canvas.paste(crop, (x, y))
    return canvas


def crop_box(image: Image.Image, box: tuple[float, float, float, float]) -> Image.Image:
    width, height = image.size
    left, top, right, bottom = box
    return image.crop((round(left * width), round(top * height), round(right * width), round(bottom * height)))


def prepare_drink_menu(records: list[dict]) -> None:
    menu = find_file("drink", "menu")
    if not menu:
        return
    image = open_image(menu)
    # Coordinates are proportional and match the supplied three-column drinks menu.
    cups = {
        "drink-strawberry-matcha.webp": (0.18, 0.14, 0.49, 0.42),
        "drink-matcha-choco.webp": (0.47, 0.13, 0.78, 0.42),
        "drink-matcha-latte.webp": (0.07, 0.43, 0.30, 0.605),
        "drink-thai-milk-tea.webp": (0.34, 0.43, 0.61, 0.605),
        "drink-matcha-honey.webp": (0.64, 0.43, 0.88, 0.605),
        "drink-cocoa.webp": (0.07, 0.70, 0.31, 0.895),
        "drink-jasmine-matcha.webp": (0.35, 0.70, 0.62, 0.895),
        "drink-strawberry-cocoa.webp": (0.65, 0.70, 0.91, 0.895),
    }
    for output, box in cups.items():
        save(cream_product(crop_box(image, box)), output, menu, "drink", "drink-card", records)
    # The menu does not contain a separate pearl cocoa photo; use the real cocoa cup
    # as a labelled temporary visual until a dedicated pearl cocoa original is supplied.
    save(cream_product(crop_box(image, cups["drink-cocoa.webp"])), "drink-pearl-cocoa.webp", menu, "drink", "drink-card", records)


def prepare_waffles(records: list[dict]) -> None:
    # User-confirmed mapping. These source files must never be reclassified by
    # filename, colour, sauce, or visual similarity.
    manual_assignments = {
        "waffle-classic.webp": (RAW / "waffle-matcha-chocolate-original.jpeg", "classic", "经典口味"),
        "waffle-peanut-coffee.webp": (RAW / "waffle-matcha-peanut-original.jpeg", "peanut-coffee", "咖啡花生"),
    }
    for output, (source, product_id, display_name) in manual_assignments.items():
        if source.exists():
            image = ImageEnhance.Color(open_image(source)).enhance(1.03)
            save(cover(image, CARD_SIZE), output, source, "waffle", "product-card", records, product_id=product_id, display_name=display_name, manually_assigned=True)

    sources = {
        "waffle-matcha-chocolate.webp": ("__use-existing-product-image__",),
        "waffle-matcha-lotus.webp": ("waffle-matcha-lotus",),
        "waffle-apam-balik.webp": ("waffle-apam-balik",),
        "waffle-mayo-chicken-floss.webp": ("waffle-mayo-chicken-floss",),
        "waffle-chicken-floss-taro.webp": ("waffle-chicken-floss-taro",),
        "waffle-taro.webp": ("waffle-taro", "taro", "1.08.59"),
        "waffle-mochi-pull.webp": ("waffle-mochi-pull", "mochi-pull"),
        "waffle-pistachio-kunafa.webp": ("waffle-pistachio-kunafa", "pistachio-kunafa"),
        "waffle-nutella.webp": ("waffle-nutella",),
        "waffle-choco-crunch-ball.webp": ("waffle-choco-crunch-ball",),
    }
    existing = ROOT / "public" / "assets" / "products"
    for output, keywords in sources.items():
        source = find_file(*keywords)
        if not source:
            stem = output.replace(".webp", ".jpg")
            candidate = existing / stem
            if candidate.exists():
                source = candidate
        if source:
            image = ImageEnhance.Color(open_image(source)).enhance(1.03)
            save(cover(image, CARD_SIZE), output, source, "waffle", "product-card", records)


def prepare_stall(records: list[dict]) -> None:
    source = find_file("stall", "rain", "night", "1.07.55")
    if not source:
        return
    image = ImageEnhance.Brightness(open_image(source)).enhance(1.05)
    # Each crop intentionally retains real lighting, reflections, menus, and equipment.
    variants = {
        "stall-hero-night.webp": (0.00, 0.23, 1.00, 0.79),
        "stall-rain-night.webp": (0.28, 0.21, 1.00, 0.62),
        "stall-menu-table.webp": (0.12, 0.45, 0.79, 0.95),
        "jojo-waffle-hero-bg.webp": (0.00, 0.17, 0.76, 0.70),
    }
    for output, box in variants.items():
        save(cover(crop_box(image, box), HERO_SIZE), output, source, "stall" if output.startswith("stall-") else "hero", "hero-bg" if "hero" in output else "section-bg", records)


def prepare_logo(records: list[dict]) -> None:
    source = RAW / "logo.png"
    if not source.exists():
        return
    with Image.open(source) as image:
        logo = ImageOps.exif_transpose(image).convert("RGBA")
    logo.thumbnail((512, 512), Image.Resampling.LANCZOS)
    save(logo, "logo-jojo-bakes.webp", source, "logo", "brand-header", records, transparent=True)


def main() -> None:
    if not RAW.exists():
        raise SystemExit(f"Missing source folder: {RAW}. Add original images there and run again.")
    records: list[dict] = []
    prepare_drink_menu(records)
    prepare_waffles(records)
    prepare_stall(records)
    prepare_logo(records)
    manifest = PRODUCTS / "jojo-assets-manifest.json"
    manifest.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Prepared {len(records)} assets in {PRODUCTS}")


if __name__ == "__main__":
    main()
