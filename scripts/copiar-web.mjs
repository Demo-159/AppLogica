// Copia los archivos de la app web a www/, la carpeta que Capacitor empaqueta en el APK.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destino = path.join(raiz, "www");
const incluir = ["index.html", "manifest.webmanifest", "sw.js", "css", "js", "icons"];

fs.rmSync(destino, { recursive: true, force: true });
fs.mkdirSync(destino);
for (const f of incluir) fs.cpSync(path.join(raiz, f), path.join(destino, f), { recursive: true });

// Sesiones animadas: tools/sesiones/dist/<id>.html (python3 tools/sesiones/build.py <id>)
const dist = path.join(raiz, "tools/sesiones/dist");
const usadas = [...fs.readFileSync(path.join(raiz, "js/data/sesiones.js"), "utf8").matchAll(/:\s*"(\w+)"/g)].map((m) => m[1]);
for (const id of usadas) {
  const f = path.join(dist, id + ".html");
  if (!fs.existsSync(f)) {
    console.error(`Falta la sesión compilada ${id}: ejecuta python3 tools/sesiones/build.py ${id}`);
    process.exit(1);
  }
  fs.copyFileSync(f, path.join(destino, id + ".html"));
}
console.log(`Web copiada a www/ (${usadas.length} sesiones animadas)`);
