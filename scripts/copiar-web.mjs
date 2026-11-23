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
console.log("Web copiada a www/");
