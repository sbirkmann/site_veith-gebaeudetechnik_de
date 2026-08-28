#!/usr/bin/env python3
"""
Outlines the "GEBÄUDETECHNIK" subline of the VEITH lockup to flat SVG path data
and writes it to scripts/subline-path.txt, which build-logo.mjs embeds verbatim.

The logo must render identically wherever it is used, so the subline cannot rely
on a webfont being loaded at runtime. Inter SemiBold is the closest match on
hand to the neo-grotesque in the original artwork.

Letter positions and widths are taken from the original (marke_weiss.png, rows
y84..96) rather than from the font's own metrics, so the traced line keeps the
original's rhythm exactly. Each glyph is scaled to cap height 13, fitted to its
measured width, and placed at its measured x.

Run:  python3 scripts/gen-subline.py
"""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.misc.transform import Transform
from pathlib import Path

FONT = "/usr/share/fonts/rsms-inter-fonts/Inter-SemiBold.ttf"
CAP = 13.0

# (char, x, inked width) measured on the original artwork
LETTERS = [
    ("G", 1, 10), ("E", 16, 7), ("B", 29, 8), ("Ä", 41, 10), ("U", 56, 9),
    ("D", 71, 9), ("E", 85, 7), ("T", 96, 9), ("E", 109, 8), ("C", 121, 9),
    ("H", 135, 9), ("N", 149, 10), ("I", 164, 2), ("K", 172, 8),
]


def main() -> None:
    font = TTFont(FONT)
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    cap_units = font["OS/2"].sCapHeight

    out = []
    for ch, x, w in LETTERS:
        name = cmap[ord(ch)]
        bounds = BoundsPen(glyphs)
        glyphs[name].draw(bounds)
        if bounds.bounds is None:
            continue
        x0, _, x1, _ = bounds.bounds

        scale = CAP / cap_units
        inked = (x1 - x0) * scale
        fit = (w / inked) if inked else 1.0

        # SVG y grows downward, font y upward from the baseline: flip on y, put
        # the baseline at CAP, and pull the inked left edge onto the measured x.
        t = Transform().translate(x, CAP).scale(scale * fit, -scale).translate(-x0, 0)

        pen = SVGPathPen(glyphs, ntos=lambda v: f"{v:.2f}")
        glyphs[name].draw(TransformPen(pen, t))
        out.append(pen.getCommands())

    dest = Path(__file__).parent / "subline-path.txt"
    dest.write_text("".join(out))
    print(f"wrote {dest.name}: {len(''.join(out))} chars, {len(out)} glyphs")


if __name__ == "__main__":
    main()
