#!/usr/bin/env python3
"""Construye sesiones con tutor a partir de tools/sesiones/specs/<id>.json.
(Adaptado del motor de Ruta B: mismo formato de guion, misma voz y mismo reproductor.)

Especificación (resumen):
{
 "id": "c1s5", "titulo": "...", "icono": "🚶", "minutos": 3,
 "pasos": [
   {"voz": "frase", "escena": {"tipo": "cifra", ...}, "dato": "c1-27"},      # dato(s) del libro que enseña
   {"voz": "pregunta", "elige": {"pregunta": "...", "opciones": ["correcta", ...], "bien": "frase", "mal": "frase"}},
   {"voz": "instrucción", "desliza": {"escena": "peaton", "min": 30, "max": 70, "paso": 5, "desde": 30, "hasta": 65}}
 ]
}
Escenas: titulo, tarjeta, cifra, barras, iconos, lista, vs, imagen, peaton (ver engine.html).

Reglas que se verifican (falla si no se cumplen):
 - La voz no empieza con muletillas ni usa "Exacto" (con esta voz suena mal: usar "Así es").
 - Cada escena "anim" existe en escenas/*.js.
Con --revisar-voz se comprueba además con un reconocedor que cada audio suene en español.

Uso: python build.py u1s1 [u1s2 ...] | --unidad 1   [--revisar-voz]
Salida: tools/sesiones/dist/<id>.html (página autónoma con audio e imágenes incrustadas).
"""
import base64, glob, hashlib, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
CACHE = os.path.join(HERE, ".cache"); DIST = os.path.join(HERE, "dist")
VOICE = "it-IT-GiuseppeMultilingualNeural"
FILLERS = ("bueno,", "a ver,", "mira,", "mira:", "oye,", "oye:")
TTS = os.environ.get("EDGE_TTS", "edge-tts")

def escenas_js():
    return "\n".join(open(f, encoding="utf-8").read() for f in sorted(glob.glob(os.path.join(HERE, "escenas", "*.js"))))

def textos(spec):
    for p in spec["pasos"]:
        if p.get("voz"): yield p["voz"]
        e = p.get("elige") or {}
        for k in ("bien", "mal"):
            if e.get(k): yield e[k]

def reglas(spec, js):
    err = []
    for t in textos(spec):
        if t.strip().lower().startswith(FILLERS): err.append(f"muletilla al inicio: {t[:60]}")
        if re.search(r"\bexacto\b", t.lower()): err.append(f"evita 'Exacto' (usa 'Así es'): {t[:60]}")
    for p in spec["pasos"]:
        e = p.get("escena") or {}
        if e.get("tipo") == "anim" and f"'{e['id']}'" not in js: err.append(f"falta la escena {e['id']}")
    return err

def audio(text):
    os.makedirs(CACHE, exist_ok=True)
    h = hashlib.sha1((VOICE + "|v2|" + text).encode()).hexdigest()[:16]
    out = os.path.join(CACHE, h + ".mp3")
    if not os.path.exists(out):
        raw = out + ".raw.mp3"
        cmd = [TTS, "--voice", VOICE, "--rate=+10%", "--pitch=+3Hz", "--text", text, "--write-media", raw]
        if os.environ.get("HTTPS_PROXY"): cmd[1:1] = ["--proxy", os.environ["HTTPS_PROXY"]]
        subprocess.run(cmd, check=True, capture_output=True)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-af",
                        "silenceremove=start_periods=1:start_threshold=-45dB,highpass=f=90,equalizer=f=3200:t=q:w=1:g=3,"
                        "acompressor=threshold=-18dB:ratio=3,atempo=0.89", "-ac", "1", "-b:a", "48k", out], check=True)
        os.remove(raw)
    return out

_model = None
def revisar(path, text):
    """Devuelve (probabilidad de español, tasa de error de palabras)."""
    global _model
    import numpy as np
    from faster_whisper import WhisperModel
    from num2words import num2words
    import unicodedata
    if _model is None: _model = WhisperModel("base", device="cpu", compute_type="int8")
    def norm(s):
        s = re.sub(r"\d+", lambda m: " " + num2words(int(m.group()), lang="es") + " ", s.replace(".", "").replace("%", " por ciento"))
        s = s.replace("setecientas", "setecientos").replace("doscientas", "doscientos").replace("cuatrocientas", "cuatrocientos")
        s = "".join(c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn")
        return re.findall(r"[a-zñ]+", s)
    pcm = subprocess.check_output(["ffmpeg", "-loglevel", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", "16000", "-"])
    x = np.frombuffer(pcm, np.float32)
    segs, info = _model.transcribe(x, beam_size=1)
    es = dict(info.all_language_probs).get("es", 0)
    a, b = norm(text), norm(" ".join(s.text for s in segs))
    d = list(range(len(b) + 1))
    for i, w in enumerate(a, 1):
        prev, d[0] = d[0], i
        for j, v in enumerate(b, 1): prev, d[j] = d[j], min(d[j] + 1, d[j - 1] + 1, prev + (w != v))
    return es, d[len(b)] / max(1, len(a))

def palabras(t):
    import unicodedata
    t = "".join(c for c in unicodedata.normalize("NFD", t.lower()) if unicodedata.category(c) != "Mn")
    return {w for w in re.findall(r"[a-z0-9]+", t) if len(w) > 3}

def repite(spec):
    """Para cada pregunta (elige), los pasos que la explican, para el botón "Explícamelo de nuevo".
    Usa el campo "repite" del guion (índice o lista de índices) si está; si no, el paso anterior cuya voz
    comparte más palabras con la pregunta, su respuesta correcta y la frase "bien"."""
    out, P = {}, spec["pasos"]
    for i, p in enumerate(P):
        if "elige" not in p: continue
        if "repite" in p: r = p["repite"]; out[i] = r if isinstance(r, list) else [r]; continue
        e = p["elige"]; clave = palabras(" ".join([e["pregunta"], e["opciones"][0], e.get("bien", ""), p.get("voz", "")]))
        cand = [(len(clave & palabras(P[k].get("voz", ""))), k) for k in range(i) if P[k].get("escena") and P[k]["escena"].get("tipo") != "titulo" and "elige" not in P[k]]
        cand = [c for c in cand if c[0] > 0]
        if cand:  # el mejor, y un segundo si casi empata (preguntas que combinan dos ideas)
            cand.sort(reverse=True); sel = [cand[0][1]] + [k for n, k in cand[1:2] if n >= max(2, cand[0][0] * .75)]
            out[i] = sorted(sel)
    return out

def duracion(path):
    """Segundos del audio (el WebView de Android no siempre informa la duración de un audio incrustado)."""
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path], capture_output=True, text=True).stdout
    return round(float(out.strip() or 0), 2)

def b64(path, mime): return f"data:{mime};base64," + base64.b64encode(open(path, "rb").read()).decode()

def build(sid, check):
    spec = json.load(open(os.path.join(HERE, "specs", sid + ".json"), encoding="utf-8"))
    js = escenas_js()
    err = reglas(spec, js)
    if err: print(f"✗ {sid}:\n  " + "\n  ".join(err)); return False
    aud, txt, dur, malas = {}, {}, {}, []
    for t in dict.fromkeys(textos(spec)):
        key = "a" + hashlib.sha1(t.encode()).hexdigest()[:8]
        path = audio(t); aud[key] = b64(path, "audio/mpeg"); txt[key] = t
        dur[key] = duracion(path)
        if check:
            es, wer = revisar(path, t)
            if es < 0.93 or wer > 0.35: malas.append(f"{es:.2f} es · {wer:.2f} error · {t}")
    keyof = lambda t: "a" + hashlib.sha1(t.encode()).hexdigest()[:8] if t else None
    pasos = []
    rep = repite(spec)
    for i, p in enumerate(spec["pasos"]):
        q = dict(p); q["voz"] = keyof(p.get("voz"))
        if "elige" in p:
            q["elige"] = dict(p["elige"], bien=keyof(p["elige"].get("bien")), mal=keyof(p["elige"].get("mal")))
            q["repite"] = rep.get(i, [])
        pasos.append(q)
    imgs = {}
    for p in spec["pasos"]:
        src = (p.get("escena") or {}).get("src")
        if src: imgs[src] = b64(os.path.join(ROOT, src), "image/" + src.rsplit(".", 1)[-1])
    S = {"id": sid, "titulo": spec["titulo"], "icono": spec.get("icono"), "minutos": spec.get("minutos", 3),
         "pasos": pasos, "audio": aud, "textos": txt, "dur": dur, "imagenes": imgs}
    html = open(os.path.join(HERE, "engine.html"), encoding="utf-8").read()
    html = html.replace("/*ESCENAS*/", js, 1)
    fuente = b64(os.path.join(ROOT, "tools/fuentes/Nunito-latin.woff2"), "font/woff2")  # Nunito, licencia OFL
    emoji = b64(os.path.join(ROOT, "tools/fuentes/NotoColorEmoji-rutab.woff2"), "font/woff2")  # emojis iguales en todo teléfono
    html = html.replace("/*FUENTE*/", "@font-face{font-family:'Nunito';font-weight:600 900;font-display:swap;src:url(%s) format('woff2')}"
                        "@font-face{font-family:'RBEmoji';font-display:block;src:url(%s) format('woff2')}"
                        "@font-face{font-family:'RBSimbolos';font-display:block;src:url(%s) format('woff2')}"
                        "@font-face{font-family:'RBSimbolos2';font-display:block;src:url(%s) format('woff2')}"
                        % (fuente, emoji, b64(os.path.join(ROOT, "tools/fuentes/NotoSansMath-rutab.woff2"), "font/woff2"),
                           b64(os.path.join(ROOT, "tools/fuentes/NotoSansSymbols2-rutab.woff2"), "font/woff2")), 1)
    html = html.replace("<script>\nconst S=window.SESSION", "<script>window.SESSION=" + json.dumps(S, ensure_ascii=False) + ";</script>\n<script>\nconst S=window.SESSION", 1)
    os.makedirs(DIST, exist_ok=True)
    open(os.path.join(DIST, sid + ".html"), "w", encoding="utf-8").write(html)
    print(f"✓ {sid}: {len(pasos)} pasos, {len(aud)} audios")
    for m in malas: print("  ⚠ voz:", m)
    return not malas

if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if "--unidad" in sys.argv:
        n = sys.argv[sys.argv.index("--unidad") + 1]; args = sorted(os.path.basename(f)[:-5] for f in glob.glob(os.path.join(HERE, f"specs/u{n}s*.json")))
        args = [a for a in args if a != n]
    ok = all([build(s, "--revisar-voz" in sys.argv) for s in args])
    sys.exit(0 if ok else 1)
