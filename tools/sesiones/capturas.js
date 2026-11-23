// Capturas de cada paso de una sesión compilada (para revisar las escenas sin escuchar toda la sesión).
// Uso: node tools/sesiones/capturas.js u1s2 [carpeta]   → <carpeta>/u1s2-NN.png
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const id = process.argv[2], out = process.argv[3] || path.join(__dirname, 'capturas');
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 780 }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.join(__dirname, 'dist', id + '.html'));
  await p.evaluate(() => { document.getElementById('start').remove(); });
  const n = await p.evaluate(() => S.pasos.length);
  for (let i = 0; i < n; i++) {
    await p.evaluate(async i => {
      const q = S.pasos[i]; await setBg(FONDO[i]);
      if (q.elige) { const it = q.elige; await ponerEscena(null); await swap(`<div class="ask"><small>❓ TU TURNO</small>${it.pregunta}</div><div class="choices">${it.opciones.map((o, k) => `<button class="opt${k === 0 ? ' good' : ''}">${o}</button>`).join('')}</div>`); }
      else await show(q.escena);
      document.querySelectorAll('[data-w]').forEach(e => marca({ el: e, h: 0 }));
    }, i);
    await p.waitForTimeout(1600);
    await p.screenshot({ path: path.join(out, `${id}-${String(i).padStart(2, '0')}.png`) });
  }
  if (errs.length) console.log('ERRORES', id, errs);
  await b.close();
})();
