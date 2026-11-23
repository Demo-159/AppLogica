// Service worker: la app funciona sin conexión.
// Al cambiar cualquier archivo, sube VERSION para que los usuarios reciban la actualización.
const VERSION = "razona-v3";
const ARCHIVOS = [
  "./", "index.html", "css/app.css", "js/app.js", "js/srs.js",
  "js/data/modulos.js", "js/data/prop.js", "js/data/cond.js", "js/data/silo.js", "js/data/mat.js",
  "js/data/num.js", "js/data/prob.js", "js/data/est.js", "js/data/fal.js", "js/data/ses.js",
  "js/data/arg.js", "js/data/pat.js", "js/data/tutor.js", "js/data/sesiones.js",
  "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Primero la caché (rápido y sin conexión); en segundo plano se actualiza desde la red.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(e.request, { ignoreSearch: true }).then((enCache) => {
        const red = fetch(e.request)
          .then((r) => {
            if (r.ok) cache.put(e.request, r.clone());
            return r;
          })
          .catch(() => enCache);
        return enCache || red;
      })
    )
  );
});
