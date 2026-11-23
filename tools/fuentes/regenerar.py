#!/usr/bin/env python3
"""Regenera las fuentes recortadas (emojis y símbolos) con todos los caracteres que usan las páginas, para que se
vean iguales en todos los teléfonos (Samsung, Xiaomi, etc. dibujan sus propios emojis). Igual que en Ruta B.

- NotoColorEmoji-rutab.woff2: los emojis.
- NotoSansMath-rutab.woff2: símbolos lógicos y matemáticos (→ ¬ ∧ ∨ ∀ ∃ ∩ ∪ ⊆ ≡ ∴ ↔ ⅓ …).
- NotoSansSymbols2-rutab.woff2: ✓ ✕ ✗ ▬.
Ejecutar después de usar un emoji o símbolo nuevo, y volver a compilar. Licencia OFL (OFL.txt).
Uso: python3 tools/fuentes/regenerar.py
"""
import glob, os, re, urllib.parse, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(HERE))
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
txt = ""
for f in ["tools/app/index.tpl.html", "tools/sesiones/engine.html", "contenido/preguntas.json"] + glob.glob(os.path.join(ROOT, "tools/sesiones/escenas/*.js")) + glob.glob(os.path.join(ROOT, "tools/sesiones/specs/*.json")):
    txt += open(os.path.join(ROOT, f), encoding="utf-8").read()
SIMB2 = set("✓✕✗▬")
MATE = set("←↑→↓↔↛↻⇒⇣∀∃∅√∧∨∩∪∴≈≠≡≤≥⊂⊆¬±×÷−·∞")
def es_emoji(c):
    o = ord(c)
    return (o >= 0x1F000 or 0x2600 <= o <= 0x27BF or 0x2B00 <= o <= 0x2BFF or 0x2300 <= o <= 0x23FF or o in (0x200D, 0xFE0F, 0x00A9, 0x21A9)) and c not in SIMB2 and c not in MATE
emojis = "".join(sorted({c for c in txt if es_emoji(c)}))
mate = "".join(sorted({c for c in txt if c in MATE} | set("←↑→↻≈")))
def bajar(familia, texto, destino):
    css = urllib.request.urlopen(urllib.request.Request("https://fonts.googleapis.com/css2?family=" + familia + "&text=" + urllib.parse.quote(texto), headers={"User-Agent": UA})).read().decode()
    url = re.search(r"url\((https://[^)]+)\)", css).group(1)
    open(os.path.join(HERE, destino), "wb").write(urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})).read())
    print(f"✓ {destino}: {len(texto)} caracteres")
bajar("Noto+Color+Emoji", emojis, "NotoColorEmoji-rutab.woff2")
bajar("Noto+Sans+Math", mate, "NotoSansMath-rutab.woff2")
bajar("Noto+Sans+Symbols+2", "".join(sorted(SIMB2)), "NotoSansSymbols2-rutab.woff2")
# superíndices y fracciones (2ⁿ, ⅓…), que no traen Nunito ni Noto Sans Math
bajar("Noto+Sans:wght@800", "⁰¹²³⁴ⁿ⅓⅔⅙", "NotoSans-rutab.woff2")
