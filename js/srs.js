// Repetición espaciada tipo Leitner con ajuste por confianza.
// Cada pregunta vive en una "caja" 0..6; cada caja tiene un intervalo de repaso.
// Acertar sube de caja (el repaso se aleja); fallar la devuelve a la caja 0.
// Acertar "adivinando" no cuenta como dominio: se repasa pronto.
(function (root) {
  var DIA = 24 * 60 * 60 * 1000;
  var INTERVALOS = [0, 1, 3, 7, 14, 30, 60]; // días por caja
  var CAJA_MAX = INTERVALOS.length - 1;
  var CAJA_DOMINIO = 4; // caja desde la que se considera dominada

  function actualizar(estado, correcta, confianza, ahora) {
    ahora = ahora || Date.now();
    var s = estado ? Object.assign({}, estado) : { box: 0, n: 0, ok: 0 };
    s.n += 1;
    if (correcta) {
      s.ok += 1;
      if (confianza === "adivino") s.box = 1;
      else s.box = Math.min(s.box + 1, CAJA_MAX);
    } else {
      s.box = 0;
    }
    s.last = ahora;
    s.due = ahora + INTERVALOS[s.box] * DIA;
    s.wrong = !correcta;
    return s;
  }

  function pendiente(s, ahora) {
    return !!s && s.due <= (ahora || Date.now());
  }

  function dominio(s) {
    if (!s) return 0;
    return Math.min(s.box, CAJA_DOMINIO) / CAJA_DOMINIO;
  }

  var api = {
    INTERVALOS: INTERVALOS,
    CAJA_DOMINIO: CAJA_DOMINIO,
    actualizar: actualizar,
    pendiente: pendiente,
    dominio: dominio
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.SRS = api;
})(typeof window !== "undefined" ? window : globalThis);
