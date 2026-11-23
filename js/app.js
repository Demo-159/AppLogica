(function () {
  "use strict";

  // ---------- Datos ----------
  const MODS = LOGICA.modulos;
  const MOD = {};
  MODS.forEach((m) => (MOD[m.id] = m));
  const TODAS = [];
  const POR_ID = {};
  MODS.forEach((m) =>
    (LOGICA.preguntas[m.id] || []).forEach((p) => {
      TODAS.push(p);
      POR_ID[p.id] = p;
    })
  );

  const EXAMEN = { n: 35, minutos: 45, aprueba: 30 };

  // ---------- Ruta de aprendizaje ----------
  // Lista lineal de nodos: cada uno se desbloquea al completar el anterior.
  const RUTA = [];
  const NODO = {};
  (LOGICA.etapas || []).forEach((et, ie) => {
    et.mods.forEach((mid) => {
      const m = MOD[mid];
      const qs = (LOGICA.preguntas[mid] || []).slice().sort((a, b) => a.d - b.d || (a.id < b.id ? -1 : 1));
      const nLec = Math.max(1, Math.ceil(qs.length / 5));
      if (LOGICA.tutor && LOGICA.tutor[mid])
        RUTA.push({ id: mid + "-tutor", tipo: "tutor", etapa: et.id, mid, titulo: "Sesión con tutor", desc: "Ada te explica los conceptos de " + m.nombre.toLowerCase() + " paso a paso, con ejemplos resueltos y pistas." });
      for (let k = 0; k < nLec; k++) {
        const ids = qs.slice(Math.round((k * qs.length) / nLec), Math.round(((k + 1) * qs.length) / nLec)).map((p) => p.id);
        RUTA.push({ id: mid + "-l" + (k + 1), tipo: "leccion", etapa: et.id, mid, titulo: "Lección " + (k + 1), desc: ids.length + " preguntas. Las que falles se repiten al final de la lección.", ids, pasa: Math.ceil(ids.length * 0.6) });
      }
      RUTA.push({ id: mid + "-rep", tipo: "repaso", etapa: et.id, mid, titulo: "Repaso de la unidad", desc: "8 preguntas de toda la unidad, priorizando tus errores. Necesitas 7 aciertos.", n: 8, pasa: 7 });
    });
    RUTA.push({ id: et.id + "-final", tipo: "etapa", etapa: et.id, titulo: "Repaso de etapa " + (ie + 1), desc: "12 preguntas mezcladas de toda la etapa “" + et.nombre + "”. Apruébalo con 10 aciertos para pasar a la siguiente etapa.", mods: et.mods, n: 12, pasa: 10 });
  });
  RUTA.forEach((n, i) => {
    n.i = i;
    NODO[n.id] = n;
  });
  const KEY = "razona.v1";
  const CONF = {
    seguro: "Seguro",
    dudoso: "Creo que sí",
    adivino: "Adivinando"
  };

  // ---------- Estado persistente ----------
  function base() {
    return {
      q: {},
      days: {},
      conf: { seguro: { n: 0, ok: 0 }, dudoso: { n: 0, ok: 0 }, adivino: { n: 0, ok: 0 } },
      exams: [],
      daily: null,
      ruta: {},
      ses: null,
      ultimo: null,
      settings: { goal: 20, askConf: true, theme: "auto", libre: false }
    };
  }
  function normalizar(s) {
    const b = base();
    if (!s || typeof s !== "object") return b;
    return Object.assign(b, s, {
      settings: Object.assign(b.settings, s.settings || {}),
      conf: Object.assign(b.conf, s.conf || {}),
      q: s.q || {},
      days: s.days || {},
      ruta: s.ruta || {},
      exams: Array.isArray(s.exams) ? s.exams : []
    });
  }
  function cargar() {
    try {
      return normalizar(JSON.parse(localStorage.getItem(KEY)));
    } catch (e) {
      return base();
    }
  }
  let S = cargar();
  function guardar() {
    try {
      localStorage.setItem(KEY, JSON.stringify(S));
    } catch (e) {
      /* almacenamiento no disponible: la app sigue funcionando en memoria */
    }
  }

  // ---------- Utilidades ----------
  const $app = document.getElementById("app");
  const esc = (t) =>
    String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function claveDia(d) {
    d = d || new Date();
    const z = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
  }
  const hoy = () => claveDia();
  function go(h) {
    if (location.hash === h) render();
    else location.hash = h;
  }
  function mmss(ms) {
    const s = Math.max(0, Math.round(ms / 1000));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }
  const fecha = (t) => new Date(t).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" });

  // ---------- Estadísticas ----------
  function statsModulo(mid) {
    const lista = LOGICA.preguntas[mid] || [];
    let vistas = 0, n = 0, ok = 0, dom = 0, pend = 0, errores = 0;
    const ahora = Date.now();
    lista.forEach((p) => {
      const s = S.q[p.id];
      if (!s) return;
      vistas++;
      n += s.n;
      ok += s.ok;
      dom += SRS.dominio(s);
      if (SRS.pendiente(s, ahora)) pend++;
      if (s.wrong) errores++;
    });
    return { total: lista.length, vistas, n, ok, dominio: lista.length ? dom / lista.length : 0, pend, errores };
  }
  function global() {
    let n = 0, ok = 0, dom = 0, pend = 0;
    const ahora = Date.now();
    TODAS.forEach((p) => {
      const s = S.q[p.id];
      if (!s) return;
      n += s.n;
      ok += s.ok;
      dom += SRS.dominio(s);
      if (SRS.pendiente(s, ahora)) pend++;
    });
    return { n, ok, dominio: TODAS.length ? dom / TODAS.length : 0, pend };
  }
  function racha() {
    const d = new Date();
    if (!S.days[claveDia(d)]) d.setDate(d.getDate() - 1); // hoy aún no cuenta: la racha sigue viva
    let r = 0;
    while (S.days[claveDia(d)]) {
      r++;
      d.setDate(d.getDate() - 1);
    }
    return r;
  }
  const respondidasHoy = () => S.days[hoy()] || 0;

  // ---------- Selección de preguntas ----------
  // Prioridad: pendientes falladas > pendientes > nuevas > el resto (más peso a lo menos dominado).
  function prioridad(p, ahora) {
    const s = S.q[p.id];
    const r = Math.random();
    if (!s) return 2 + r;
    if (SRS.pendiente(s, ahora)) return (s.wrong ? 4 : 3) + r;
    return r * (1 - SRS.dominio(s) * 0.8);
  }
  function ordenarPorPrioridad(lista) {
    const ahora = Date.now();
    return lista
      .map((p) => ({ p, v: prioridad(p, ahora) }))
      .sort((a, b) => b.v - a.v)
      .map((x) => x.p);
  }
  function pendientes() {
    const ahora = Date.now();
    return TODAS.filter((p) => SRS.pendiente(S.q[p.id], ahora)).sort((a, b) => {
      const sa = S.q[a.id], sb = S.q[b.id];
      return (sb.wrong ? 1 : 0) - (sa.wrong ? 1 : 0) || sa.due - sb.due;
    });
  }
  // Intercalado: toma por turnos la pregunta más prioritaria de cada módulo.
  function intercalar(n, excluir) {
    const ex = new Set(excluir || []);
    const colas = shuffle(MODS).map((m) => ordenarPorPrioridad((LOGICA.preguntas[m.id] || []).filter((p) => !ex.has(p.id))));
    const out = [];
    let k = 0;
    while (out.length < n && colas.some((c) => c.length)) {
      const c = colas[k % colas.length];
      if (c.length) out.push(c.shift().id);
      k++;
    }
    return out;
  }

  // ---------- Sesiones ----------
  function nuevaSesion(modo, ids, titulo, extra) {
    if (!ids.length) {
      alert("No hay preguntas disponibles para esta sesión.");
      return;
    }
    S.ses = {
      modo,
      titulo,
      items: ids.map((id) => ({
        id,
        orden: shuffle(POR_ID[id].o.map((_, i) => i)),
        sel: null,
        conf: null,
        ok: null
      })),
      i: 0,
      fase: "responder",
      inicio: Date.now(),
      limite: modo === "examen" ? EXAMEN.minutos * 60000 : 0
    };
    Object.assign(S.ses, extra || {});
    guardar();
    go("#/quiz");
  }
  const iniciar = {
    modulo(mid) {
      const lista = ordenarPorPrioridad(LOGICA.preguntas[mid] || []).slice(0, 10);
      nuevaSesion("practica", shuffle(lista).map((p) => p.id), MOD[mid].nombre);
    },
    erroresModulo(mid) {
      const ids = (LOGICA.preguntas[mid] || []).filter((p) => S.q[p.id] && S.q[p.id].wrong).map((p) => p.id);
      nuevaSesion("practica", shuffle(ids), "Errores · " + MOD[mid].nombre);
    },
    diario() {
      const rep = pendientes().slice(0, 4).map((p) => p.id);
      const ids = rep.concat(intercalar(10 - rep.length, rep));
      nuevaSesion("diario", shuffle(ids), "Desafío diario");
    },
    repaso() {
      nuevaSesion("repaso", pendientes().slice(0, 20).map((p) => p.id), "Repaso inteligente");
    },
    examen() {
      let ids = [];
      MODS.forEach((m) => {
        ids = ids.concat(shuffle(LOGICA.preguntas[m.id] || []).slice(0, 3).map((p) => p.id));
      });
      const resto = shuffle(TODAS.filter((p) => !ids.includes(p.id)));
      ids = ids.concat(resto.slice(0, Math.max(0, EXAMEN.n - ids.length)).map((p) => p.id));
      nuevaSesion("examen", shuffle(ids).slice(0, EXAMEN.n), "Simulacro de examen");
    },
    lista(ids, titulo) {
      nuevaSesion("practica", shuffle(ids), titulo);
    },
    nodo(n) {
      const extra = { nodo: n.id, pasa: n.pasa, reintentos: true };
      if (n.tipo === "tutor") return go("#/tutor/" + n.mid);
      if (n.tipo === "leccion") return nuevaSesion("leccion", n.ids.slice(), MOD[n.mid].nombre + " · " + n.titulo, extra);
      if (n.tipo === "repaso") {
        const ids = ordenarPorPrioridad(LOGICA.preguntas[n.mid] || []).slice(0, n.n).map((p) => p.id);
        return nuevaSesion("leccion", shuffle(ids), MOD[n.mid].nombre + " · Repaso", extra);
      }
      if (n.tipo === "etapa") {
        const colas = shuffle(n.mods).map((mid) => ordenarPorPrioridad(LOGICA.preguntas[mid] || []));
        const ids = [];
        for (let k = 0; ids.length < n.n && colas.some((c) => c.length); k++) {
          const c = colas[k % colas.length];
          if (c.length) ids.push(c.shift().id);
        }
        return nuevaSesion("leccion", ids, n.titulo, extra);
      }
    }
  };

  // Estado de un nodo de la ruta: "hecho", "actual" o "bloqueado".
  function estadoNodo(n) {
    if (S.ruta[n.id] && S.ruta[n.id].done) return "hecho";
    if (n.i === 0 || S.settings.libre) return "actual";
    const prev = RUTA[n.i - 1];
    return S.ruta[prev.id] && S.ruta[prev.id].done ? "actual" : "bloqueado";
  }
  const nodoActual = () => RUTA.find((n) => estadoNodo(n) === "actual" && !(S.ruta[n.id] && S.ruta[n.id].done)) || null;
  const estrellas = (acc) => (acc >= 1 ? 3 : acc >= 0.8 ? 2 : 1);
  function completarNodo(id, acc) {
    const prev = S.ruta[id] || {};
    S.ruta[id] = {
      done: true,
      stars: Math.max(prev.stars || 0, estrellas(acc)),
      best: Math.max(prev.best || 0, acc),
      veces: (prev.veces || 0) + 1,
      fecha: Date.now()
    };
  }

  function registrar(p, ok, conf) {
    S.q[p.id] = SRS.actualizar(S.q[p.id], ok, conf);
    const d = hoy();
    S.days[d] = (S.days[d] || 0) + 1;
    if (conf && S.conf[conf]) {
      S.conf[conf].n++;
      if (ok) S.conf[conf].ok++;
    }
  }

  function elegirOpcion(idx) {
    const ses = S.ses;
    if (!ses) return;
    const it = ses.items[ses.i];
    if (ses.fase !== "responder") return;
    it.sel = idx;
    guardar();
    render();
  }
  function comprobar(conf) {
    const ses = S.ses;
    if (!ses || ses.modo === "examen" || ses.fase !== "responder") return;
    const it = ses.items[ses.i];
    if (it.sel === null) return;
    const p = POR_ID[it.id];
    it.conf = conf || null;
    it.ok = it.sel === p.a;
    if (it.retry) {
      const d = hoy();
      S.days[d] = (S.days[d] || 0) + 1;
    } else registrar(p, it.ok, it.conf);
    // En la ruta, una pregunta fallada vuelve al final de la sesión (una vez).
    if (!it.ok && ses.reintentos && !it.retry)
      ses.items.push({ id: it.id, orden: shuffle(p.o.map((_, i) => i)), sel: null, conf: null, ok: null, retry: true });
    ses.fase = "feedback";
    guardar();
    render();
  }
  function mover(delta) {
    const ses = S.ses;
    if (!ses) return;
    const j = ses.i + delta;
    if (j < 0) return;
    if (j >= ses.items.length) return ses.modo === "examen" ? acciones.terminarExamen() : terminar();
    ses.i = j;
    ses.fase = "responder";
    guardar();
    render();
    window.scrollTo(0, 0);
  }
  function terminar() {
    const ses = S.ses;
    if (!ses) return;
    if (ses.modo === "examen") {
      ses.items.forEach((it) => {
        const p = POR_ID[it.id];
        it.ok = it.sel !== null && it.sel === p.a;
        registrar(p, it.ok, null);
      });
    }
    const primeros = ses.items.filter((it) => !it.retry);
    const ok = primeros.filter((it) => it.ok).length;
    const res = {
      modo: ses.modo,
      titulo: ses.titulo,
      items: primeros,
      ok,
      total: primeros.length,
      secs: Math.round((Date.now() - ses.inicio) / 1000),
      fecha: Date.now()
    };
    if (ses.modo === "examen") {
      res.aprobado = ok >= EXAMEN.aprueba;
      S.exams.push({ fecha: res.fecha, ok, total: res.total, secs: res.secs, aprobado: res.aprobado });
    }
    if (ses.modo === "diario") S.daily = { fecha: hoy() };
    if (ses.nodo) {
      res.nodo = ses.nodo;
      res.pasa = ses.pasa;
      res.aprobado = ok >= ses.pasa;
      if (res.aprobado) {
        completarNodo(ses.nodo, ok / res.total);
        res.stars = S.ruta[ses.nodo].stars;
      }
    }
    S.ultimo = res;
    S.ses = null;
    guardar();
    go("#/resultado");
  }

  // ---------- Componentes ----------
  function barra(v, color) {
    return `<div class="bar"><span style="width:${Math.round(v * 100)}%;${color ? "background:" + color : ""}"></span></div>`;
  }
  function anillo(v, etiqueta, sub) {
    const r = 26, c = 2 * Math.PI * r;
    return `<div class="ring" role="img" aria-label="${esc(etiqueta)}">
      <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="${r}" class="ring-bg"/><circle cx="32" cy="32" r="${r}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - Math.min(1, v))}"/></svg>
      <div class="ring-txt"><b>${esc(etiqueta)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</div></div>`;
  }
  function cabecera(titulo, atras) {
    return `<header class="top">${atras ? `<a class="icon-btn" href="${atras}" aria-label="Volver">‹</a>` : ""}<h1>${titulo}</h1></header>`;
  }

  // ---------- Vistas ----------
  function kpisHoy() {
    const g = global();
    const r = racha();
    const hoyN = respondidasHoy();
    const meta = S.settings.goal;
    return `<section class="kpis">
      <div class="kpi">${anillo(hoyN / meta, hoyN + "/" + meta, "hoy")}</div>
      <div class="kpi"><span class="kpi-v">🔥 ${r}</span><span class="kpi-l">${r === 1 ? "día de racha" : "días de racha"}</span></div>
      <div class="kpi"><span class="kpi-v">${Math.round(g.dominio * 100)}%</span><span class="kpi-l">dominio total</span></div>
    </section>`;
  }

  function tarjetaSesion() {
    const ses = S.ses;
    if (!ses) return "";
    return `<section class="card continuar">
      <div><b>Sesión en curso</b><p class="muted">${esc(ses.titulo)} · pregunta ${ses.i + 1} de ${ses.items.length}</p></div>
      <div class="row"><button class="btn" data-act="continuar">Continuar</button><button class="btn ghost" data-act="descartar">Descartar</button></div>
    </section>`;
  }

  // ---------- Ruta ----------
  const ICONO = { tutor: "🎓", leccion: "★", repaso: "↻", etapa: "🏆" };
  function vRuta() {
    const g = global();
    const hechos = RUTA.filter((n) => S.ruta[n.id] && S.ruta[n.id].done).length;
    const actual = nodoActual();
    let html = `<header class="hero">
        <p class="eyebrow">Razona</p>
        <h1>Tu ruta</h1>
        <p class="muted">${hechos} de ${RUTA.length} pasos completados</p>
        ${barra(hechos / RUTA.length)}
      </header>
      ${kpisHoy()}
      ${tarjetaSesion()}
      ${g.pend ? `<button class="accion a2 aviso" data-act="repaso"><span class="accion-ico">↻</span><span><b>Repaso espaciado</b><small>${g.pend} ${g.pend === 1 ? "pregunta vuelve" : "preguntas vuelven"} hoy para que no se te olviden</small></span></button>` : ""}`;
    let unidad = 0;
    LOGICA.etapas.forEach((et, ie) => {
      html += `<div class="etapa"><small>Etapa ${ie + 1}</small><b>${esc(et.nombre)}</b></div>`;
      const grupos = et.mods.map((mid) => ({ mid, nodos: RUTA.filter((n) => n.mid === mid) }));
      grupos.push({ mid: null, nodos: RUTA.filter((n) => n.etapa === et.id && n.tipo === "etapa") });
      grupos.forEach((gr) => {
        if (gr.mid) {
          unidad++;
          const m = MOD[gr.mid];
          html += `<a class="unidad" href="#/m/${gr.mid}" style="--c:${m.color}">
            <span class="mod-ico">${m.emoji}</span>
            <span><small>Unidad ${unidad}</small><b>${esc(m.nombre)}</b></span>
            <span class="unidad-ver">Teoría ›</span></a>`;
        }
        html += `<div class="camino">`;
        gr.nodos.forEach((n, k) => {
          const est = estadoNodo(n);
          const st = S.ruta[n.id];
          const color = n.mid ? MOD[n.mid].color : "#f59e0b";
          const desplaz = [0, 1, 2, 1, 0, -1, -2, -1][k % 8] * 44;
          html += `<div class="paso" style="--dx:${desplaz}px">
            <button class="nodo ${est} t-${n.tipo} ${actual && actual.id === n.id ? "foco" : ""}" style="--c:${color}" data-act="abrirNodo" data-id="${n.id}" aria-label="${esc(n.titulo)} (${est})">
              <span>${est === "bloqueado" ? "🔒" : ICONO[n.tipo]}</span>
            </button>
            ${actual && actual.id === n.id ? `<span class="globo">${n.tipo === "tutor" ? "¡Empieza con tu tutor!" : "¡Sigue aquí!"}</span>` : ""}
            ${st && st.done && n.tipo !== "tutor" ? `<span class="estrellas">${"★".repeat(st.stars)}${"☆".repeat(3 - st.stars)}</span>` : ""}
          </div>`;
        });
        html += `</div>`;
      });
    });
    html += `<div class="meta-final">🎉<b>${hechos === RUTA.length ? "¡Completaste la ruta!" : "Al final de la ruta"}</b><small>Sigue con el repaso espaciado, el desafío diario y los simulacros para mantener lo aprendido.</small></div>`;
    return html;
  }

  function hojaNodo(id) {
    const n = NODO[id];
    if (!n) return;
    const est = estadoNodo(n);
    const st = S.ruta[n.id];
    const m = n.mid ? MOD[n.mid] : null;
    const cerrar = () => {
      const h = document.getElementById("hoja");
      if (h) h.remove();
    };
    cerrar();
    const div = document.createElement("div");
    div.id = "hoja";
    div.className = "hoja-fondo";
    div.innerHTML = `<div class="hoja" role="dialog" aria-modal="true" aria-label="${esc(n.titulo)}" style="--c:${m ? m.color : "#f59e0b"}">
      <span class="hoja-ico">${ICONO[n.tipo]}</span>
      <small class="muted">${m ? esc(m.nombre) : "Etapa"}</small>
      <h2>${esc(n.titulo)}</h2>
      <p class="muted">${esc(n.desc)}</p>
      ${st && st.done ? `<p class="small">${n.tipo === "tutor" ? "Sesión completada ✓" : `Mejor resultado: ${Math.round(st.best * 100)}% · ${"★".repeat(st.stars)}${"☆".repeat(3 - st.stars)}`}</p>` : ""}
      ${est === "bloqueado"
        ? `<p class="small"><b>🔒 Bloqueado.</b> Completa el paso anterior para desbloquearlo.</p><button class="btn full ghost" data-act="cerrarHoja">Entendido</button>`
        : `<button class="btn full" data-act="iniciarNodo" data-id="${n.id}">${st && st.done ? "Repetir" : "Comenzar"}</button>
           <button class="btn full ghost" data-act="cerrarHoja">Ahora no</button>`}
    </div>`;
    div.addEventListener("click", (e) => {
      if (e.target === div) cerrar();
    });
    document.body.appendChild(div);
    const b = div.querySelector(".btn");
    if (b) b.focus();
  }

  function vPractica() {
    const g = global();
    const diarioHecho = S.daily && S.daily.fecha === hoy();
    return `${cabecera("Práctica libre")}
    <p class="muted">Practica cualquier tema cuando quieras, sin seguir el orden de la ruta.</p>
    ${tarjetaSesion()}

    <section class="acciones">
      <button class="accion a1" data-act="diario">
        <span class="accion-ico">☀</span>
        <span><b>Desafío diario</b><small>${diarioHecho ? "Completado hoy ✓ · puedes repetirlo" : "10 preguntas mezcladas de todos los temas"}</small></span>
      </button>
      <button class="accion a2" data-act="repaso" ${g.pend ? "" : "disabled"}>
        <span class="accion-ico">↻</span>
        <span><b>Repaso inteligente</b><small>${g.pend ? g.pend + (g.pend === 1 ? " pregunta pendiente" : " preguntas pendientes") : "Nada pendiente por ahora"}</small></span>
      </button>
      <button class="accion a3" data-act="examen">
        <span class="accion-ico">⏱</span>
        <span><b>Simulacro de examen</b><small>${EXAMEN.n} preguntas · ${EXAMEN.minutos} min · apruebas con ${EXAMEN.aprueba}</small></span>
      </button>
    </section>

    <h2 class="sec">Temas</h2>
    <section class="mods">
      ${MODS.map((m) => {
        const st = statsModulo(m.id);
        return `<a class="mod" href="#/m/${m.id}" style="--c:${m.color}">
          <span class="mod-ico">${m.emoji}</span>
          <span class="mod-body"><b>${esc(m.nombre)}</b><small>${esc(m.resumen)}</small>
          ${barra(st.dominio, m.color)}
          <small class="muted">${Math.round(st.dominio * 100)}% dominio · ${st.vistas}/${st.total} vistas${st.pend ? ` · <span class="pend">${st.pend} por repasar</span>` : ""}</small></span>
        </a>`;
      }).join("")}
    </section>`;
  }

  function vModulo(mid) {
    const m = MOD[mid];
    if (!m) return vNoEncontrado();
    const st = statsModulo(mid);
    return `${cabecera(esc(m.nombre), "#/practica")}
    <section class="card mod-head" style="--c:${m.color}">
      <span class="mod-ico big">${m.emoji}</span>
      <p>${esc(m.resumen)}</p>
      <div class="mini-kpis">
        <div><b>${Math.round(st.dominio * 100)}%</b><small>dominio</small></div>
        <div><b>${st.n ? pct(st.ok, st.n) + "%" : "—"}</b><small>precisión</small></div>
        <div><b>${st.vistas}/${st.total}</b><small>vistas</small></div>
      </div>
      ${barra(st.dominio, m.color)}
      <div class="row wrap">
        <button class="btn" data-act="modulo" data-id="${mid}">Practicar 10 preguntas</button>
        ${st.errores ? `<button class="btn ghost" data-act="erroresModulo" data-id="${mid}">Repasar mis ${st.errores} errores</button>` : ""}
      </div>
    </section>
    <h2 class="sec">Teoría clave</h2>
    <section class="card teoria">
      <p class="muted small">Lee esto antes de practicar: enseñar los principios de forma explícita mejora mucho más el pensamiento crítico que esperar que se “absorban” solos.</p>
      <ul>${m.teoria.map((t) => `<li>${t}</li>`).join("")}</ul>
    </section>`;
  }

  function vQuiz() {
    const ses = S.ses;
    if (!ses) return null;
    const it = ses.items[ses.i];
    const p = POR_ID[it.id];
    if (!p) {
      S.ses = null;
      guardar();
      return null;
    }
    const m = MOD[p.m];
    const examen = ses.modo === "examen";
    const fb = ses.fase === "feedback";
    const letras = "ABCDEF";
    const opciones = it.orden
      .map((oi, k) => {
        let cls = "opt";
        if (fb) {
          if (oi === p.a) cls += " correct";
          else if (oi === it.sel) cls += " wrong";
          else cls += " dim";
        } else if (oi === it.sel) cls += " sel";
        return `<button class="${cls}" data-act="opcion" data-i="${oi}" ${fb ? "disabled" : ""}>
          <span class="letra">${letras[k]}</span><span>${esc(p.o[oi])}</span></button>`;
      })
      .join("");

    let pie = "";
    if (examen) {
      const ult = ses.i === ses.items.length - 1;
      const respondidas = ses.items.filter((x) => x.sel !== null).length;
      pie = `<div class="row between">
          <button class="btn ghost" data-act="mover" data-d="-1" ${ses.i === 0 ? "disabled" : ""}>Anterior</button>
          ${ult ? `<button class="btn" data-act="terminarExamen">Terminar examen</button>` : `<button class="btn" data-act="mover" data-d="1">Siguiente</button>`}
        </div>
        <p class="muted small center">${respondidas} de ${ses.items.length} respondidas</p>
        <div class="grid-nav">${ses.items
          .map((x, k) => `<button class="${x.sel !== null ? "done" : ""} ${k === ses.i ? "cur" : ""}" data-act="ir" data-i="${k}" aria-label="Pregunta ${k + 1}">${k + 1}</button>`)
          .join("")}</div>`;
    } else if (!fb) {
      if (it.sel === null) pie = `<p class="muted small center">Elige una respuesta${S.settings.askConf ? " y luego indica qué tan seguro estás" : ""}.</p>`;
      else if (S.settings.askConf)
        pie = `<div class="conf"><p>¿Qué tan seguro estás?</p><div class="row">
          <button class="btn conf-btn" data-act="comprobar" data-c="seguro">Seguro</button>
          <button class="btn conf-btn" data-act="comprobar" data-c="dudoso">Creo que sí</button>
          <button class="btn conf-btn" data-act="comprobar" data-c="adivino">Adivinando</button></div></div>`;
      else pie = `<button class="btn full" data-act="comprobar">Comprobar</button>`;
    } else {
      const ult = ses.i === ses.items.length - 1;
      const sorpresa = !it.ok && it.conf === "seguro";
      pie = `<div class="feedback ${it.ok ? "ok" : "ko"}">
          <b>${it.ok ? "¡Correcto!" : "Incorrecto"}</b>
          ${sorpresa ? `<p class="small">Estabas seguro y fallaste. Justamente estos errores son los que mejor se corrigen si lees la explicación con calma.</p>` : ""}
          ${it.ok && it.conf === "adivino" ? `<p class="small">Acertaste adivinando: volverá pronto para que la domines de verdad.</p>` : ""}
          <p>${esc(p.e)}</p>
        </div>
        <button class="btn full" data-act="mover" data-d="1">${ult ? "Ver resultados" : "Siguiente"}</button>`;
    }

    const progreso = (ses.i + (fb ? 1 : 0)) / ses.items.length;
    return `<header class="quiz-top">
        <button class="icon-btn" data-act="salir" aria-label="Salir">✕</button>
        <div class="quiz-title"><b>${esc(ses.titulo)}</b><small>${ses.i + 1} de ${ses.items.length}</small></div>
        ${examen ? `<span class="timer" id="timer">${mmss(ses.limite - (Date.now() - ses.inicio))}</span>` : `<span></span>`}
      </header>
      ${barra(progreso)}
      <section class="pregunta">
        <span class="chip" style="--c:${m.color}">${m.emoji} ${esc(m.nombre)}</span>
        ${it.retry ? `<span class="chip reintento">↻ Segunda oportunidad</span>` : ""}
        <h2>${esc(p.q)}</h2>
        <div class="opts">${opciones}</div>
        ${pie}
      </section>`;
  }

  function vResultado() {
    const r = S.ultimo;
    if (!r) return null;
    const errores = r.items.filter((it) => !it.ok);
    let porModulo = "";
    if (r.modo === "examen") {
      const agg = {};
      r.items.forEach((it) => {
        const mid = POR_ID[it.id] ? POR_ID[it.id].m : null;
        if (!mid) return;
        agg[mid] = agg[mid] || { n: 0, ok: 0 };
        agg[mid].n++;
        if (it.ok) agg[mid].ok++;
      });
      porModulo = `<h2 class="sec">Por tema</h2><section class="card">${Object.keys(agg)
        .map((mid) => `<div class="fila"><span>${MOD[mid].emoji} ${esc(MOD[mid].nombre)}</span><b>${agg[mid].ok}/${agg[mid].n}</b></div>${barra(agg[mid].ok / agg[mid].n, MOD[mid].color)}`)
        .join("")}</section>`;
    }
    const enRuta = !!r.nodo;
    const evaluado = r.modo === "examen" || enRuta;
    const titulo = evaluado ? (r.aprobado ? (enRuta ? "¡Paso superado!" : "¡Aprobado!") : enRuta ? "Casi… inténtalo de nuevo" : "Reprobado") : r.ok === r.total ? "¡Perfecto!" : "Sesión completada";
    const necesita = enRuta ? r.pasa : EXAMEN.aprueba;
    const sig = enRuta ? nodoActual() : null;
    return `${cabecera("Resultados", "#/")}
    <section class="card resultado ${evaluado ? (r.aprobado ? "aprobado" : "reprobado") : ""}">
      ${anillo(r.ok / r.total, r.ok + "/" + r.total, pct(r.ok, r.total) + "%")}
      <div>
        <h2>${titulo}</h2>
        ${enRuta && r.aprobado ? `<p class="estrellas grande">${"★".repeat(r.stars)}${"☆".repeat(3 - r.stars)}</p>` : ""}
        <p class="muted">${esc(r.titulo)} · ${mmss(r.secs * 1000)} min</p>
        ${evaluado ? `<p class="small">Necesitas ${necesita} de ${r.total} aciertos en el primer intento.</p>` : ""}
      </div>
    </section>
    <div class="row wrap">
      ${enRuta && r.aprobado ? `<a class="btn" href="#/">${sig ? "Continuar la ruta" : "Ver la ruta"}</a>` : ""}
      ${enRuta && !r.aprobado ? `<button class="btn" data-act="iniciarNodo" data-id="${r.nodo}">Reintentar</button>` : ""}
      ${errores.length ? `<button class="btn ${enRuta ? "ghost" : ""}" data-act="repasarUltimos">Practicar mis ${errores.length} errores</button>` : ""}
      ${enRuta ? "" : `<a class="btn ghost" href="#/">Volver a la ruta</a>`}
    </div>
    ${porModulo}
    ${errores.length ? `<h2 class="sec">Revisa tus errores</h2>
      <p class="muted small">Leer por qué te equivocaste es lo que convierte un error en aprendizaje.</p>
      ${errores
        .map((it) => {
          const p = POR_ID[it.id];
          if (!p) return "";
          return `<details class="card error">
            <summary>${esc(p.q)}</summary>
            <p><span class="tag ko">Tu respuesta</span> ${it.sel === null ? "<i>Sin responder</i>" : esc(p.o[it.sel])}</p>
            <p><span class="tag ok">Correcta</span> ${esc(p.o[p.a])}</p>
            <p class="muted">${esc(p.e)}</p>
          </details>`;
        })
        .join("")}` : ""}`;
  }

  // ---------- Sesión con tutor ----------
  // Guion interactivo: mensajes, ejemplos resueltos paso a paso, preguntas con
  // pistas graduadas y retroalimentación específica, y autoexplicación.
  let T = null;
  function tutorIniciar(mid) {
    T = { mid, paso: -1, log: [], marca: 0, ctrl: "continuar", sub: 0, intentos: 0, descartadas: [], orden: [], primeras: 0, pregs: 0 };
    tutorAvanzar();
  }
  const tutorDecir = (html, cls) => T.log.push({ de: "tutor", html, cls: cls || "" });
  const yoDecir = (html) => T.log.push({ de: "yo", html });
  function tutorAvanzar() {
    const guion = LOGICA.tutor[T.mid];
    T.marca = T.log.length;
    T.paso++;
    const st = guion[T.paso];
    if (!st) return;
    if (st.t === "msg") {
      tutorDecir(st.x);
      T.ctrl = "continuar";
    } else if (st.t === "ej") {
      tutorDecir(`<span class="etq">📘 Ejemplo resuelto</span>${st.x}`);
      T.sub = 0;
      T.ctrl = "ej";
    } else if (st.t === "preg") {
      tutorDecir(`<span class="etq">❓ Tu turno</span>${st.x}`);
      T.intentos = 0;
      T.descartadas = [];
      T.orden = shuffle(st.o.map((_, i) => i));
      T.pregs++;
      T.ctrl = "preg";
    } else if (st.t === "explica") {
      tutorDecir(`<span class="etq">✍️ Explícalo con tus palabras</span>${st.x}`);
      T.ctrl = "explica";
    } else if (st.t === "fin") {
      tutorDecir(`<span class="etq">📌 Resumen</span><ul>${st.puntos.map((x) => `<li>${x}</li>`).join("")}</ul>Ahora practica en las lecciones: recordar lo que acabas de aprender es lo que lo fija en la memoria.`);
      T.ctrl = "fin";
      completarNodo(T.mid + "-tutor", T.pregs ? T.primeras / T.pregs : 1);
      guardar();
    }
  }
  const tutorAcc = {
    seguir() {
      tutorAvanzar();
    },
    paso() {
      const st = LOGICA.tutor[T.mid][T.paso];
      T.marca = T.log.length;
      tutorDecir(`<b>Paso ${T.sub + 1}.</b> ${st.pasos[T.sub]}`, "paso-ej");
      T.sub++;
      if (T.sub >= st.pasos.length) T.ctrl = "continuar";
    },
    resp(i) {
      const st = LOGICA.tutor[T.mid][T.paso];
      if (T.ctrl !== "preg" || T.descartadas.includes(i)) return;
      T.marca = T.log.length;
      yoDecir(esc(st.o[i]));
      if (T.intentos === 0) S.days[hoy()] = (S.days[hoy()] || 0) + 1;
      if (i === st.a) {
        if (T.intentos === 0) T.primeras++;
        tutorDecir(`✅ ${st.ok}`, "bien");
        T.ctrl = "continuar";
      } else {
        T.intentos++;
        T.descartadas.push(i);
        let msg = `🤔 ${st.fb[i] || "No es esa."}`;
        if (T.intentos === 1) msg += `<br><b>Pista:</b> ${st.pista} ¿Lo intentas otra vez?`;
        else {
          msg += `<br>La respuesta correcta es: <b>${esc(st.o[st.a])}</b>. ${st.ok}`;
          T.ctrl = "continuar";
        }
        tutorDecir(msg, "mal");
      }
      guardar();
    },
    explica() {
      const st = LOGICA.tutor[T.mid][T.paso];
      const ta = document.getElementById("autoexp");
      const txt = ta ? ta.value.trim() : "";
      T.marca = T.log.length;
      yoDecir(txt ? esc(txt) : "<i>(Prefiero ver la respuesta)</i>");
      tutorDecir(`Una buena respuesta sería:<br><i>${st.modelo}</i><br><br>¿Se parece a la tuya? Explicar con tus palabras, aunque cueste, ayuda a entender de verdad.`);
      T.ctrl = "continuar";
    }
  };

  function vTutor(mid) {
    if (!LOGICA.tutor || !LOGICA.tutor[mid]) return null;
    if (!T || T.mid !== mid) tutorIniciar(mid);
    const m = MOD[mid];
    const guion = LOGICA.tutor[mid];
    const st = guion[T.paso];
    const burbujas = T.log
      .map((b, k) =>
        b.de === "tutor"
          ? `<div class="msg tutor ${b.cls} ${k >= T.marca ? "nuevo" : ""}"><span class="avatar" aria-hidden="true">A</span><div class="burbuja">${b.html}</div></div>`
          : `<div class="msg yo ${k >= T.marca ? "nuevo" : ""}"><div class="burbuja">${b.html}</div></div>`
      )
      .join("");
    let ctrl = "";
    if (T.ctrl === "continuar") ctrl = `<button class="btn full" data-act="tutor" data-a="seguir">Continuar</button>`;
    else if (T.ctrl === "ej") ctrl = `<button class="btn full" data-act="tutor" data-a="paso">Ver paso ${T.sub + 1} de ${st.pasos.length}</button>`;
    else if (T.ctrl === "preg")
      ctrl = `<div class="opts">${T.orden
        .map((i) => `<button class="opt ${T.descartadas.includes(i) ? "tachada" : ""}" data-act="tutor" data-a="resp" data-i="${i}" ${T.descartadas.includes(i) ? "disabled" : ""}><span>${esc(st.o[i])}</span></button>`)
        .join("")}</div>`;
    else if (T.ctrl === "explica")
      ctrl = `<textarea id="autoexp" rows="3" placeholder="Escribe tu explicación (no se califica)…"></textarea>
        <button class="btn full" data-act="tutor" data-a="explica">Comparar con la respuesta de Ada</button>`;
    else if (T.ctrl === "fin")
      ctrl = `<a class="btn full" href="#/" data-act="tutorFin">Volver a la ruta</a>`;
    return `<header class="quiz-top">
        <button class="icon-btn" data-act="salir" aria-label="Salir">✕</button>
        <div class="quiz-title"><b>Sesión con tutor</b><small>${m.emoji} ${esc(m.nombre)}</small></div>
        <span></span>
      </header>
      ${barra((T.paso + 1) / guion.length, m.color)}
      <section class="chat">${burbujas}</section>
      <section class="chat-ctrl">${ctrl}</section>`;
  }

  function vProgreso() {
    const g = global();
    const dias = [];
    const d = new Date();
    d.setDate(d.getDate() - 13);
    for (let i = 0; i < 14; i++) {
      dias.push({ k: claveDia(d), n: S.days[claveDia(d)] || 0, l: d.toLocaleDateString("es-CL", { weekday: "narrow" }) });
      d.setDate(d.getDate() + 1);
    }
    const max = Math.max(S.settings.goal, ...dias.map((x) => x.n));
    const diasActivos = Object.keys(S.days).length;
    const calib = Object.keys(CONF)
      .map((k) => {
        const c = S.conf[k] || { n: 0, ok: 0 };
        return `<tr><td>${CONF[k]}</td><td>${c.n}</td><td><b>${c.n ? pct(c.ok, c.n) + "%" : "—"}</b></td></tr>`;
      })
      .join("");
    const exams = S.exams.slice(-10).reverse();
    return `${cabecera("Tu progreso")}
    <section class="kpis four">
      <div class="kpi"><span class="kpi-v">${g.n}</span><span class="kpi-l">respuestas</span></div>
      <div class="kpi"><span class="kpi-v">${g.n ? pct(g.ok, g.n) + "%" : "—"}</span><span class="kpi-l">precisión</span></div>
      <div class="kpi"><span class="kpi-v">${racha()}</span><span class="kpi-l">racha</span></div>
      <div class="kpi"><span class="kpi-v">${diasActivos}</span><span class="kpi-l">días activos</span></div>
    </section>

    <h2 class="sec">Últimos 14 días</h2>
    <section class="card">
      <div class="chart" role="img" aria-label="Respuestas por día en los últimos 14 días">
        ${dias.map((x) => `<div class="col" title="${x.k}: ${x.n}"><span class="${x.n >= S.settings.goal ? "meta" : ""}" style="height:${max ? (100 * x.n) / max : 0}%"></span><small>${x.l}</small></div>`).join("")}
      </div>
      <p class="muted small">Las barras resaltadas alcanzan tu meta diaria (${S.settings.goal}). Practicar un poco cada día rinde más que una sesión larga.</p>
    </section>

    <h2 class="sec">Dominio por tema</h2>
    <section class="card">
      ${MODS.map((m) => {
        const st = statsModulo(m.id);
        return `<a class="fila link" href="#/m/${m.id}"><span>${m.emoji} ${esc(m.nombre)}</span><span class="muted small">${st.n ? pct(st.ok, st.n) + "% aciertos" : "sin datos"}</span></a>${barra(st.dominio, m.color)}`;
      }).join("")}
    </section>

    <h2 class="sec">Calibración</h2>
    <section class="card">
      <table class="tabla"><thead><tr><th>Cuando dices…</th><th>Respuestas</th><th>Aciertas</th></tr></thead><tbody>${calib}</tbody></table>
      <p class="muted small">Si estás bien calibrado, aciertas casi siempre cuando dices “Seguro” y cerca de un 25% cuando adivinas. Conocer los límites de lo que sabes también es pensar mejor.</p>
    </section>

    <h2 class="sec">Simulacros</h2>
    <section class="card">
      ${exams.length
        ? exams.map((e) => `<div class="fila"><span>${fecha(e.fecha)}</span><span><b>${e.ok}/${e.total}</b> <span class="tag ${e.aprobado ? "ok" : "ko"}">${e.aprobado ? "Aprobado" : "Reprobado"}</span></span></div>`).join("")
        : `<p class="muted">Aún no has hecho ningún simulacro.</p>`}
    </section>`;
  }

  function vCiencia() {
    const metodo = [
      ["Práctica de recuperación", "Responder preguntas fortalece la memoria mucho más que releer. Por eso Razona se basa en preguntas, no en lectura.", "Roediger y Karpicke, 2006; Dunlosky et al., 2013"],
      ["Repetición espaciada", "Las preguntas vuelven a intervalos crecientes (1, 3, 7, 14, 30 y 60 días). Espaciar el estudio mejora la retención a largo plazo.", "Cepeda et al., 2006"],
      ["Práctica intercalada", "El desafío diario y el simulacro mezclan temas. Eso te obliga a reconocer qué tipo de problema tienes delante, y no solo a aplicar el último procedimiento visto.", "Rohrer y Taylor, 2007; Kornell y Bjork, 2008"],
      ["Retroalimentación explicada", "Cada respuesta incluye el porqué. La retroalimentación sobre la tarea es una de las intervenciones educativas más efectivas.", "Hattie y Timperley, 2007"],
      ["Confianza y metacognición", "Indicar qué tan seguro estás mejora la calibración. Los errores cometidos con mucha seguridad se corrigen mejor tras la explicación (efecto de hipercorrección).", "Butterfield y Metcalfe, 2001; Butler et al., 2008"],
      ["Una ruta con dominio progresivo", "Cada unidad avanza de lo simple a lo complejo y no pasas al siguiente paso sin dominar el anterior. El aprendizaje para el dominio tiene efectos positivos consistentes.", "Kulik, Kulik y Bangert-Drowns, 1990"],
      ["Sesiones con tutor", "La tutora explica con ejemplos resueltos paso a paso, da pistas graduadas y una explicación específica para cada error. Los tutores que guían paso a paso logran efectos cercanos a los de un tutor humano.", "Sweller y Cooper, 1985; VanLehn, 2011"],
      ["Explicar con tus palabras", "El tutor te pide explicar las ideas antes de mostrar una respuesta modelo. La autoexplicación mejora la comprensión.", "Chi et al., 1994; Bisra et al., 2018"],
      ["Instrucción explícita", "Cada tema tiene su teoría clave. Enseñar el pensamiento crítico de forma explícita es más efectivo que esperar que surja solo.", "Abrami et al., 2008 y 2015"],
      ["Razonamiento estadístico y sesgos", "Entrenar con reglas estadísticas, frecuencias naturales y ejemplos de sesgos mejora el razonamiento en problemas cotidianos, y el efecto se mantiene meses después.", "Fong, Krantz y Nisbett, 1986; Sedlmeier y Gigerenzer, 2001; Morewedge et al., 2015"]
    ];
    const habitos = [
      ["Dormir bien", "El sueño consolida lo aprendido, y la privación de sueño deteriora la atención y la memoria de trabajo.", "Diekelmann y Born, 2010; Lim y Dinges, 2010"],
      ["Ejercicio aeróbico", "La actividad física regular tiene efectos pequeños pero consistentes sobre las funciones ejecutivas y la cognición.", "Northey et al., 2018; Ludyga et al., 2020"],
      ["Seguir aprendiendo", "Es el factor con mejor evidencia causal: cada año adicional de educación formal se asocia con un aumento de 1 a 5 puntos de CI.", "Ritchie y Tucker-Drob, 2018"]
    ];
    const refs = [
      "Abrami, P. C. et al. (2008). Instructional interventions affecting critical thinking skills and dispositions: A stage 1 meta-analysis. Review of Educational Research, 78(4), 1102–1134.",
      "Abrami, P. C. et al. (2015). Strategies for teaching students to think critically: A meta-analysis. Review of Educational Research, 85(2), 275–314.",
      "Bisra, K., Liu, Q., Nesbit, J. C., Salimi, F. y Winne, P. H. (2018). Inducing self-explanation: A meta-analysis. Educational Psychology Review, 30(3), 703–725.",
      "Butler, A. C., Karpicke, J. D. y Roediger, H. L. (2008). Correcting a metacognitive error: Feedback increases retention of low-confidence correct responses. JEP: Learning, Memory, and Cognition, 34(4), 918–928.",
      "Butterfield, B. y Metcalfe, J. (2001). Errors committed with high confidence are hypercorrected. JEP: Learning, Memory, and Cognition, 27(6), 1491–1494.",
      "Cepeda, N. J. et al. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological Bulletin, 132(3), 354–380.",
      "Chi, M. T. H., de Leeuw, N., Chiu, M.-H. y LaVancher, C. (1994). Eliciting self-explanations improves understanding. Cognitive Science, 18(3), 439–477.",
      "Diekelmann, S. y Born, J. (2010). The memory function of sleep. Nature Reviews Neuroscience, 11(2), 114–126.",
      "Dunlosky, J. et al. (2013). Improving students’ learning with effective learning techniques. Psychological Science in the Public Interest, 14(1), 4–58.",
      "Fong, G. T., Krantz, D. H. y Nisbett, R. E. (1986). The effects of statistical training on thinking about everyday problems. Cognitive Psychology, 18(3), 253–292.",
      "Frederick, S. (2005). Cognitive reflection and decision making. Journal of Economic Perspectives, 19(4), 25–42.",
      "Gigerenzer, G. y Hoffrage, U. (1995). How to improve Bayesian reasoning without instruction: Frequency formats. Psychological Review, 102(4), 684–704.",
      "Hattie, J. y Timperley, H. (2007). The power of feedback. Review of Educational Research, 77(1), 81–112.",
      "Kornell, N. y Bjork, R. A. (2008). Learning concepts and categories: Is spacing the “enemy of induction”? Psychological Science, 19(6), 585–592.",
      "Kulik, C.-L. C., Kulik, J. A. y Bangert-Drowns, R. L. (1990). Effectiveness of mastery learning programs: A meta-analysis. Review of Educational Research, 60(2), 265–299.",
      "Lim, J. y Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. Psychological Bulletin, 136(3), 375–389.",
      "Ludyga, S. et al. (2020). Systematic review and meta-analysis investigating moderators of long-term effects of exercise on cognition in healthy individuals. Nature Human Behaviour, 4, 603–612.",
      "Melby-Lervåg, M., Redick, T. S. y Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of “far transfer”. Perspectives on Psychological Science, 11(4), 512–534.",
      "Morewedge, C. K. et al. (2015). Debiasing decisions: Improved decision making with a single training intervention. Policy Insights from the Behavioral and Brain Sciences, 2(1), 129–140.",
      "Northey, J. M. et al. (2018). Exercise interventions for cognitive function in adults older than 50. British Journal of Sports Medicine, 52(3), 154–160.",
      "Ritchie, S. J. y Tucker-Drob, E. M. (2018). How much does education improve intelligence? A meta-analysis. Psychological Science, 29(8), 1358–1369.",
      "Roediger, H. L. y Karpicke, J. D. (2006). Test-enhanced learning. Psychological Science, 17(3), 249–255.",
      "Rohrer, D. y Taylor, K. (2007). The shuffling of mathematics problems improves learning. Instructional Science, 35, 481–498.",
      "Sala, G. y Gobet, F. (2017). Does far transfer exist? Negative evidence from chess, music, and working memory training. Current Directions in Psychological Science, 26(6), 515–520.",
      "Sedlmeier, P. y Gigerenzer, G. (2001). Teaching Bayesian reasoning in less than two hours. Journal of Experimental Psychology: General, 130(3), 380–400.",
      "Sellier, A.-L., Scopelliti, I. y Morewedge, C. K. (2019). Debiasing training improves decision making in the field. Psychological Science, 30(9), 1371–1379.",
      "Simons, D. J. et al. (2016). Do “brain-training” programs work? Psychological Science in the Public Interest, 17(3), 103–186.",
      "Sweller, J. y Cooper, G. A. (1985). The use of worked examples as a substitute for problem solving in learning algebra. Cognition and Instruction, 2(1), 59–89.",
      "Tversky, A. y Kahneman, D. (1983). Extensional versus intuitive reasoning: The conjunction fallacy in probability judgment. Psychological Review, 90(4), 293–315.",
      "VanLehn, K. (2011). The relative effectiveness of human tutoring, intelligent tutoring systems, and other tutoring systems. Educational Psychologist, 46(4), 197–221.",
      "Wason, P. C. (1968). Reasoning about a rule. Quarterly Journal of Experimental Psychology, 20(3), 273–281."
    ];
    const item = (x) => `<li><b>${x[0]}.</b> ${x[1]} <span class="cita">${x[2]}</span></li>`;
    return `${cabecera("La ciencia detrás")}
    <section class="card honesto">
      <h2>Sin promesas mágicas</h2>
      <p>Muchas apps de “entrenamiento cerebral” prometen aumentar tu inteligencia. Las revisiones más rigurosas muestran que practicar juegos cognitivos te mejora <b>en esos juegos</b>, pero casi no se transfiere a la inteligencia general (Simons et al., 2016; Melby-Lervåg et al., 2016; Sala y Gobet, 2017).</p>
      <p>Por eso Razona no te entrena en minijuegos abstractos: te enseña <b>directamente</b> las habilidades que quieres usar, como deducir correctamente, razonar con probabilidades, detectar falacias y sesgos y evaluar evidencia. Estas habilidades sí mejoran con instrucción y práctica, y se aplican a problemas reales.</p>
    </section>

    <h2 class="sec">Cómo aprendes aquí</h2>
    <section class="card"><ul class="lista">${metodo.map(item).join("")}</ul></section>

    <h2 class="sec">Fuera de la app</h2>
    <section class="card"><ul class="lista">${habitos.map(item).join("")}</ul></section>

    <h2 class="sec">Referencias</h2>
    <section class="card refs"><ol>${refs.map((r) => `<li>${esc(r)}</li>`).join("")}</ol></section>`;
  }

  function vAjustes() {
    const st = S.settings;
    const sel = (v, x) => (String(v) === String(x) ? "selected" : "");
    return `${cabecera("Ajustes")}
    <section class="card form">
      <label class="campo"><span>Meta diaria de preguntas</span>
        <select data-set="goal">${[10, 20, 30, 50].map((n) => `<option value="${n}" ${sel(st.goal, n)}>${n}</option>`).join("")}</select></label>
      <label class="campo"><span>Preguntar qué tan seguro estoy<small>Entrena tu calibración y ajusta los repasos</small></span>
        <input type="checkbox" data-set="askConf" ${st.askConf ? "checked" : ""}></label>
      <label class="campo"><span>Ruta libre<small>Desbloquea todos los pasos de la ruta</small></span>
        <input type="checkbox" data-set="libre" ${st.libre ? "checked" : ""}></label>
      <label class="campo"><span>Tema</span>
        <select data-set="theme"><option value="auto" ${sel(st.theme, "auto")}>Automático</option><option value="light" ${sel(st.theme, "light")}>Claro</option><option value="dark" ${sel(st.theme, "dark")}>Oscuro</option></select></label>
    </section>
    <h2 class="sec">Tus datos</h2>
    <section class="card">
      <p class="muted small">Tu progreso se guarda solo en este dispositivo. Exporta una copia para respaldarlo o pasarlo a otro.</p>
      <div class="row wrap">
        <button class="btn ghost" data-act="exportar">Exportar progreso</button>
        <label class="btn ghost">Importar progreso<input type="file" accept="application/json" data-act-change="importar" hidden></label>
        <button class="btn danger" data-act="reiniciar">Borrar todo</button>
      </div>
    </section>
    <p class="muted small center">Razona · ${TODAS.length} preguntas en ${MODS.length} temas</p>`;
  }

  function vNoEncontrado() {
    return `${cabecera("No encontrado", "#/")}<p class="card">Esta página no existe.</p>`;
  }

  // ---------- Render / router ----------
  let reloj = null;
  let ultimaRuta = null;
  function aplicarTema() {
    const t = S.settings.theme;
    if (t === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }
  function render() {
    clearInterval(reloj);
    const h = location.hash || "#/";
    const [ruta, arg] = h.replace(/^#\/?/, "").split("/");
    let html = null;
    let nav = ruta || "ruta";
    switch (ruta) {
      case "":
      case undefined:
        html = vRuta();
        break;
      case "practica":
        html = vPractica();
        break;
      case "tutor":
        html = vTutor(arg);
        break;
      case "m":
        html = vModulo(arg);
        nav = "practica";
        break;
      case "quiz":
        html = vQuiz();
        break;
      case "resultado":
        html = vResultado();
        nav = "ruta";
        break;
      case "progreso":
        html = vProgreso();
        break;
      case "ciencia":
        html = vCiencia();
        break;
      case "ajustes":
        html = vAjustes();
        break;
      default:
        html = vNoEncontrado();
    }
    if (html === null) return go("#/");
    const hoja = document.getElementById("hoja");
    if (hoja) hoja.remove();
    document.body.classList.toggle("enfoque", ruta === "quiz" || ruta === "tutor");
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("on", a.dataset.nav === nav));
    $app.innerHTML = html;
    if (ruta === "tutor") window.scrollTo(0, document.body.scrollHeight);
    else if (!ruta) {
      const foco = document.querySelector(".nodo.foco");
      if (foco && h !== ultimaRuta) foco.scrollIntoView({ block: "center" });
      else if (!foco && h !== ultimaRuta) window.scrollTo(0, 0);
    } else if (h !== ultimaRuta && ruta !== "quiz") window.scrollTo(0, 0);
    ultimaRuta = h;
    if (ruta === "quiz" && S.ses && S.ses.modo === "examen") {
      const tick = () => {
        const restante = S.ses ? S.ses.limite - (Date.now() - S.ses.inicio) : 0;
        const el = document.getElementById("timer");
        if (el) {
          el.textContent = mmss(restante);
          el.classList.toggle("poco", restante < 5 * 60000);
        }
        if (restante <= 0) {
          clearInterval(reloj);
          alert("Se acabó el tiempo del simulacro.");
          terminar();
        }
      };
      tick();
      reloj = setInterval(tick, 1000);
    }
  }

  // ---------- Acciones ----------
  const acciones = {
    diario: () => iniciar.diario(),
    repaso: () => iniciar.repaso(),
    examen: () => {
      if (confirm(`Simulacro: ${EXAMEN.n} preguntas en ${EXAMEN.minutos} minutos. No verás las respuestas hasta el final. ¿Comenzar?`)) iniciar.examen();
    },
    modulo: (d) => iniciar.modulo(d.id),
    erroresModulo: (d) => iniciar.erroresModulo(d.id),
    continuar: () => go("#/quiz"),
    descartar: () => {
      if (confirm("¿Descartar la sesión en curso? Lo que ya respondiste queda guardado.")) {
        S.ses = null;
        guardar();
        render();
      }
    },
    opcion: (d) => elegirOpcion(Number(d.i)),
    comprobar: (d) => comprobar(d.c),
    mover: (d) => mover(Number(d.d)),
    ir: (d) => {
      S.ses.i = Number(d.i);
      guardar();
      render();
    },
    terminarExamen: () => {
      const sin = S.ses.items.filter((x) => x.sel === null).length;
      if (confirm(sin ? `Tienes ${sin} preguntas sin responder (cuentan como incorrectas). ¿Terminar igual?` : "¿Terminar el examen y ver tus resultados?")) terminar();
    },
    salir: () => go("#/"),
    abrirNodo: (d) => hojaNodo(d.id),
    cerrarHoja: () => {
      const h = document.getElementById("hoja");
      if (h) h.remove();
    },
    iniciarNodo: (d) => {
      const n = NODO[d.id];
      if (!n || estadoNodo(n) === "bloqueado") return;
      if (n.tipo === "tutor") T = null; // empezar la sesión desde el inicio
      iniciar.nodo(n);
    },
    tutor: (d) => {
      if (!T) return;
      if (d.a === "resp") tutorAcc.resp(Number(d.i));
      else tutorAcc[d.a]();
      render();
    },
    tutorFin: () => {
      T = null;
      go("#/");
    },
    repasarUltimos: () => {
      const ids = S.ultimo.items.filter((it) => !it.ok).map((it) => it.id);
      iniciar.lista(ids, "Repaso de errores");
    },
    exportar: () => {
      const blob = new Blob([JSON.stringify(S, null, 1)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "razona-progreso-" + hoy() + ".json";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 500);
    },
    reiniciar: () => {
      if (confirm("Esto borra todo tu progreso en este dispositivo. ¿Continuar?")) {
        const settings = S.settings;
        S = base();
        S.settings = settings;
        guardar();
        go("#/");
      }
    }
  };

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-act]");
    if (!t || t.disabled) return;
    const f = acciones[t.dataset.act];
    if (f) {
      e.preventDefault();
      f(t.dataset, t);
    }
  });

  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.set) {
      const k = t.dataset.set;
      S.settings[k] = t.type === "checkbox" ? t.checked : k === "goal" ? Number(t.value) : t.value;
      guardar();
      aplicarTema();
      if (k === "libre") render();
    }
    if (t.dataset.actChange === "importar" && t.files && t.files[0]) {
      const fr = new FileReader();
      fr.onload = () => {
        try {
          const datos = JSON.parse(fr.result);
          if (!datos || typeof datos.q !== "object") throw new Error("formato");
          S = normalizar(datos);
          guardar();
          aplicarTema();
          alert("Progreso importado.");
          render();
        } catch (err) {
          alert("El archivo no es un respaldo válido de Razona.");
        }
      };
      fr.readAsText(t.files[0]);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (T && location.hash.startsWith("#/tutor") && e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      if (T.ctrl === "continuar") tutorAcc.seguir();
      else if (T.ctrl === "ej") tutorAcc.paso();
      else return;
      e.preventDefault();
      return render();
    }
    if (!S.ses || !location.hash.startsWith("#/quiz") || e.altKey || e.ctrlKey || e.metaKey) return;
    const ses = S.ses;
    const it = ses.items[ses.i];
    const k = e.key.toLowerCase();
    const idx = "1234".indexOf(k) >= 0 ? "1234".indexOf(k) : "abcd".indexOf(k);
    if (idx >= 0 && idx < it.orden.length && ses.fase === "responder") {
      elegirOpcion(it.orden[idx]);
    } else if (e.key === "Enter") {
      if (ses.modo === "examen") mover(1);
      else if (ses.fase === "feedback") mover(1);
      else if (it.sel !== null && !S.settings.askConf) comprobar();
      else return;
    } else if (ses.modo === "examen" && e.key === "ArrowRight") mover(1);
    else if (ses.modo === "examen" && e.key === "ArrowLeft") mover(-1);
    else return;
    e.preventDefault();
  });

  window.addEventListener("hashchange", render);
  aplicarTema();
  render();
})();
