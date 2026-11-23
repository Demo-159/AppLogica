// Genera los íconos y la pantalla de inicio de Android a partir de icons/icon.svg.
// Uso: node scripts/iconos-android.js   (requiere Playwright)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const res = path.join(raiz, "android/app/src/main/res");
const svg = fs.readFileSync(path.join(raiz, "icons/icon.svg"), "utf8");
// Solo el trazo blanco, para el primer plano del ícono adaptativo
const trazo = svg.replace(/<rect[^>]*\/>/, "").replace(/<defs>.*?<\/defs>/s, "");
const densidades = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };

function pngSize(f) {
  const b = fs.readFileSync(f);
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

(async () => {
  const b = await chromium.launch();
  const page = await b.newPage();
  async function render(file, w, h, html) {
    await page.setViewportSize({ width: w, height: h });
    await page.setContent(`<html><body style="margin:0;width:${w}px;height:${h}px;overflow:hidden">${html}</body></html>`);
    await page.screenshot({ path: file, omitBackground: true });
  }
  const conTam = (s, px) => s.replace("<svg ", `<svg width="${px}" height="${px}" `);
  for (const [d, k] of Object.entries(densidades)) {
    const dir = path.join(res, "mipmap-" + d);
    const n = Math.round(48 * k);
    await render(path.join(dir, "ic_launcher.png"), n, n, conTam(svg, n));
    await render(path.join(dir, "ic_launcher_round.png"), n, n, `<div style="width:${n}px;height:${n}px;border-radius:50%;overflow:hidden">${conTam(svg.replace('rx="112"', 'rx="0"'), n)}</div>`);
    const f = Math.round(108 * k), logo = Math.round(f * 0.62);
    await render(path.join(dir, "ic_launcher_foreground.png"), f, f, `<div style="width:${f}px;height:${f}px;display:grid;place-items:center">${conTam(trazo, logo)}</div>`);
  }
  // Pantallas de inicio: mismos tamaños que las originales
  for (const dir of fs.readdirSync(res).filter((x) => x.startsWith("drawable"))) {
    const file = path.join(res, dir, "splash.png");
    if (!fs.existsSync(file)) continue;
    const [w, h] = pngSize(file);
    const lado = Math.round(Math.min(w, h) * 0.28);
    await render(file, w, h, `<div style="width:${w}px;height:${h}px;background:#f6f7fb;display:grid;place-items:center">${conTam(svg, lado)}</div>`);
  }
  await b.close();
  console.log("Íconos y pantallas de inicio generados.");
})();
