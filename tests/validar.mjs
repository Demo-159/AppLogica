// Valida el banco de preguntas, la lógica de repaso espaciado y la lista de archivos sin conexión.
// Uso: npm test
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errores = [];
const fallo = (m) => errores.push(m);

// 1. Cargar los scripts en el mismo orden que index.html
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
const datos = scripts.filter((s) => s.startsWith("js/data/"));
const ctx = vm.createContext({});
ctx.window = ctx; // en el navegador, window es el objeto global
for (const s of datos) vm.runInContext(fs.readFileSync(path.join(raiz, s), "utf8"), ctx, { filename: s });
const L = ctx.LOGICA;

// 2. Banco de preguntas
const ids = new Set();
let total = 0;
for (const m of L.modulos) {
  const lista = L.preguntas[m.id];
  if (!lista) {
    fallo(`El módulo ${m.id} no tiene preguntas (¿falta js/data/${m.id}.js en index.html?)`);
    continue;
  }
  if (lista.length < 10) fallo(`El módulo ${m.id} tiene solo ${lista.length} preguntas (mínimo 10)`);
  if (!Array.isArray(m.teoria) || m.teoria.length < 3) fallo(`El módulo ${m.id} necesita al menos 3 puntos de teoría`);
  for (const p of lista) {
    total++;
    const donde = `${p.id || "(sin id)"} [${m.id}]`;
    if (!p.id || !p.id.startsWith(m.id + "-")) fallo(`${donde}: el id debe empezar por "${m.id}-"`);
    if (ids.has(p.id)) fallo(`${donde}: id duplicado`);
    ids.add(p.id);
    if (typeof p.q !== "string" || p.q.length < 10) fallo(`${donde}: enunciado vacío o muy corto`);
    if (!Array.isArray(p.o) || p.o.length < 3 || p.o.length > 4) fallo(`${donde}: debe tener 3 o 4 opciones`);
    else {
      if (new Set(p.o.map((x) => x.trim().toLowerCase())).size !== p.o.length) fallo(`${donde}: opciones repetidas`);
      if (p.o.some((x) => typeof x !== "string" || !x.trim())) fallo(`${donde}: opción vacía`);
      if (p.o.some((x) => /todas las anteriores|ninguna de las anteriores/i.test(x)))
        fallo(`${donde}: evita "todas/ninguna de las anteriores": las opciones se barajan`);
    }
    if (!Number.isInteger(p.a) || p.a < 0 || p.a >= (p.o || []).length) fallo(`${donde}: índice de respuesta correcta fuera de rango`);
    if (typeof p.e !== "string" || p.e.length < 30) fallo(`${donde}: falta una explicación (mínimo 30 caracteres)`);
    if (![1, 2, 3].includes(p.d)) fallo(`${donde}: dificultad debe ser 1, 2 o 3`);
  }
}
if (total < 35) fallo(`Se necesitan al menos 35 preguntas para el simulacro (hay ${total})`);

// 3. Repetición espaciada
const require = createRequire(import.meta.url);
const SRS = require(path.join(raiz, "js/srs.js"));
const DIA = 86400000;
const t0 = 1_700_000_000_000;
let s = SRS.actualizar(null, true, "seguro", t0);
if (s.box !== 1 || s.due !== t0 + DIA) fallo("SRS: un primer acierto seguro debe ir a la caja 1 (repaso en 1 día)");
s = SRS.actualizar(s, true, "dudoso", t0);
if (s.box !== 2 || s.due !== t0 + 3 * DIA) fallo("SRS: el segundo acierto debe ir a la caja 2 (3 días)");
s = SRS.actualizar(s, false, "seguro", t0);
if (s.box !== 0 || !s.wrong || !SRS.pendiente(s, t0)) fallo("SRS: un error debe volver a la caja 0 y quedar pendiente");
s = SRS.actualizar({ box: 4, n: 4, ok: 4 }, true, "adivino", t0);
if (s.box !== 1) fallo("SRS: acertar adivinando debe devolver la pregunta a la caja 1");
let t = { box: 0, n: 0, ok: 0 };
for (let i = 0; i < 20; i++) t = SRS.actualizar(t, true, "seguro", t0);
if (t.box !== SRS.INTERVALOS.length - 1) fallo("SRS: la caja no debe pasar del máximo");
if (SRS.dominio(t) !== 1 || SRS.dominio(null) !== 0) fallo("SRS: el dominio debe estar entre 0 y 1");

// 4. Archivos sin conexión
const sw = fs.readFileSync(path.join(raiz, "sw.js"), "utf8");
for (const s of scripts.concat(["css/app.css", "manifest.webmanifest"])) {
  if (!sw.includes(`"${s}"`)) fallo(`sw.js no guarda en caché ${s}`);
}
for (const m of sw.matchAll(/"((?:js|css|icons)\/[^"]+|index\.html|manifest\.webmanifest)"/g)) {
  if (!fs.existsSync(path.join(raiz, m[1]))) fallo(`sw.js referencia un archivo inexistente: ${m[1]}`);
}

if (errores.length) {
  console.error(`✗ ${errores.length} problema(s):\n - ` + errores.join("\n - "));
  process.exit(1);
}
console.log(`✓ ${L.modulos.length} módulos, ${total} preguntas, repetición espaciada y caché sin conexión correctos.`);
