#!/usr/bin/env python3
"""Arma la app (el mismo diseño de Ruta B: mapa-camino, sesiones con tutor, práctica, repaso, prueba de unidad,
simulacro y progreso) en www/, la carpeta que Capacitor empaqueta en el APK.

Regla: nada se pregunta sin haberse enseñado antes. Cada pregunta de contenido/preguntas.json pertenece a la
sesión con tutor cuyo guion la marca en un paso ("q": [...] en tools/sesiones/specs/<id>.json). Si alguna pregunta
no está marcada en ningún guion, este script falla. En la app, la práctica, el repaso, la prueba y el simulacro
solo usan preguntas de sesiones ya vistas.

Uso: python3 tools/app/build.py      (antes: python3 tools/sesiones/build.py <ids> para compilar las sesiones)
"""
import base64, glob, json, os, re, shutil, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(HERE))
WWW = os.path.join(ROOT, "www"); DIST = os.path.join(ROOT, "tools/sesiones/dist")
contenido = json.load(open(os.path.join(ROOT, "contenido/preguntas.json"), encoding="utf-8"))
specs = {os.path.basename(f)[:-5]: json.load(open(f, encoding="utf-8")) for f in glob.glob(os.path.join(ROOT, "tools/sesiones/specs/*.json"))}
clave = lambda sid: tuple(int(x) for x in re.match(r"u(\d+)s(\d+)$", sid).groups())
orden = sorted(specs, key=clave)

# a qué sesión pertenece cada pregunta (si un guion la marca en varias sesiones, cuenta la última)
ses = {}
for sid in orden:
    for p in specs[sid]["pasos"]:
        for q in p.get("q", []): ses[q] = sid
errores = [f"{q['id']}: ningún guion la enseña (marca con \"q\" el paso que la enseña)" for q in contenido["preguntas"] if q["id"] not in ses]
errores += [f"{q}: está en un guion pero no en contenido/preguntas.json" for q in ses if q not in {x['id'] for x in contenido['preguntas']}]
for q in contenido["preguntas"]:
    if len(q["o"]) != 4 or len(set(q["o"])) != 4: errores.append(f"{q['id']}: debe tener 4 opciones distintas")
    if not q.get("e"): errores.append(f"{q['id']}: falta la explicación")
    if q["id"] in ses and clave(ses[q["id"]])[0] != q["u"]: errores.append(f"{q['id']}: es de la unidad {q['u']} pero la enseña {ses[q['id']]}")
VALIDAR = "--validar" in sys.argv   # solo revisa el contenido (para npm test, sin sesiones compiladas)
faltan = [] if VALIDAR else [sid for sid in orden if not os.path.exists(os.path.join(DIST, sid + ".html"))]
if faltan: errores.append("faltan sesiones compiladas (python3 tools/sesiones/build.py " + " ".join(faltan) + ")")
if errores:
    print("✗ " + "\n✗ ".join(errores)); sys.exit(1)

if VALIDAR:
    print(f"✓ {len(contenido['preguntas'])} preguntas, todas enseñadas en alguna de las {len(orden)} sesiones con tutor"); sys.exit(0)
C = []
for u in contenido["unidades"]:
    C.append({"n": u["n"], "et": f"Unidad {u['n']}", "t": u["titulo"],
              "ses": [{"id": sid, "t": specs[sid]["titulo"], "ic": specs[sid].get("icono", "🎧"), "m": specs[sid].get("minutos", 3)}
                      for sid in orden if clave(sid)[0] == u["n"]]})
Q = [{"id": q["id"], "s": ses[q["id"]], "q": q["q"], "o": q["o"], "e": q["e"]} for q in contenido["preguntas"]]
bank = {"C": C, "Q": Q}
F = os.path.join(ROOT, "tools/fuentes")
b64 = lambda f: base64.b64encode(open(os.path.join(F, f), "rb").read()).decode()
css = "@font-face{font-family:'Nunito';font-style:normal;font-weight:600 900;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2')}" % b64("Nunito-latin.woff2")
css += "@font-face{font-family:'RBEmoji';font-display:block;src:url(data:font/woff2;base64,%s) format('woff2')}" % b64("NotoColorEmoji-rutab.woff2")
for fam, arch in (("RBSimbolos", "NotoSansMath-rutab.woff2"), ("RBSimbolos2", "NotoSansSymbols2-rutab.woff2"), ("RBSimbolos3", "NotoSans-rutab.woff2")):
    css += "@font-face{font-family:'%s';font-display:block;src:url(data:font/woff2;base64,%s) format('woff2')}" % (fam, b64(arch))
html = open(os.path.join(HERE, "index.tpl.html"), encoding="utf-8").read().replace("/*FUENTE*/", css, 1).replace("__BANK__", json.dumps(bank, ensure_ascii=False, separators=(",", ":")))
shutil.rmtree(WWW, ignore_errors=True); os.makedirs(WWW)
open(os.path.join(WWW, "index.html"), "w", encoding="utf-8").write(html)
for sid in orden: shutil.copy(os.path.join(DIST, sid + ".html"), WWW)
print(f"✓ www/: {len(C)} unidades, {len(orden)} sesiones con tutor, {len(Q)} preguntas (todas enseñadas en alguna sesión)")
