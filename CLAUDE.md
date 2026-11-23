# Razona – reglas del proyecto

Razona es la versión de **Ruta B** (repo `Demo-159/AppDaniel`) para lógica y pensamiento crítico: **la app tiene que
ser lo más parecida posible a Ruta B y solo cambia la temática**. Ante cualquier duda de diseño o de funcionamiento,
copiar lo que hace Ruta B (`tools/demo-app/index.tpl.html` y `tools/sesiones/` en ese repo).

## Regla primordial: nada se pregunta sin haberse enseñado antes

- **Toda pregunta** de `contenido/preguntas.json` tiene que enseñarse en una sesión con tutor: el paso del guion que la
  enseña la marca con `"q": ["id"]` (`tools/sesiones/specs/<id>.json`). `npm test` falla si alguna queda sin marcar.
- Lo que se marca debe **enseñar de verdad** lo que la pregunta pide: el concepto, el nombre (de la falacia, del
  sesgo, de la regla…) y los símbolos que aparecen en el enunciado y en las opciones (→, ∧, ∀, ⊆…).
- En la app, la práctica, el repaso, la prueba de unidad y el simulacro solo usan preguntas de sesiones **ya vistas**.
  El simulacro completo se habilita al terminar todas las sesiones.
- Las preguntas dentro de la sesión (`elige`) solo tratan lo que se acaba de explicar, con 3 opciones del mismo tipo
  y plausibles (la primera es la correcta). Un solo intento: si falla, se marca la correcta y la voz dice `mal`.

## Igual que Ruta B

- Mapa-camino con paradas por unidad, repaso 🔋 y prueba 🏁 por unidad, simulacro 🏆 al final; pestañas Ruta,
  Repaso, Examen y Progreso; repetición espaciada (cajas de Leitner); racha; bienvenida de 3 pantallas.
- **Sonidos** al acertar, al fallar y al terminar (Web Audio, volumen bajo), en la práctica y en las sesiones.
- Sesiones con tutor como un video interactivo: voz (edge-tts Giuseppe, solo español neutro), escenas que aparecen
  cuando la voz dice su palabra (`w`), fondo animado, mascota (la ampolleta) y "Explícamelo de nuevo".
- Emojis y símbolos iguales en todos los teléfonos: si usas uno nuevo, `python3 tools/fuentes/regenerar.py`.

## Voz y textos

- Español neutro, sin muletillas al inicio ("Bueno", "A ver", "Mira", "Oye"). No usar "Exacto": usar "Así es".
- La voz no lee símbolos: escribe "pe", "cu", "flecha", "para todo"… En pantalla sí van los símbolos.
- Explicar con gráficos (fichas, Venn, tablas, cadenas, series), pocos elementos a la vez.
