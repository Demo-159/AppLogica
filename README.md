# Razona: lógica y pensamiento crítico

App para entrenar **lógica, lógica matemática, razonamiento numérico, probabilidad, estadística y pensamiento crítico**. Sigue el esquema de las apps para el examen de conducir (temas, práctica, simulacro de examen, repaso de errores y progreso), pero aplicado a razonar mejor y usando métodos de estudio respaldados por la investigación.

## Qué incluye

- **11 temas y 151 preguntas**, cada una con su explicación: lógica proposicional, razonamiento condicional, silogismos, lógica matemática y conjuntos, razonamiento numérico, probabilidad y Bayes, estadística y causalidad, falacias, sesgos cognitivos, análisis de argumentos y patrones.
- **Teoría clave** en cada tema, para estudiar los principios antes de practicar.
- **Desafío diario**: 10 preguntas que mezclan todos los temas e incluyen tus repasos pendientes.
- **Repaso inteligente**: repetición espaciada. Cada pregunta vuelve a los 1, 3, 7, 14, 30 y 60 días según cómo la respondas.
- **Simulacro de examen**: 35 preguntas en 45 minutos (se aprueba con 30), con resultados por tema.
- **Confianza y calibración**: antes de ver la respuesta indicas qué tan seguro estás. La app muestra si tu seguridad coincide con tus aciertos.
- **Progreso**: racha, meta diaria, actividad de los últimos 14 días, dominio por tema e historial de simulacros.
- **Sección Ciencia**: el respaldo de cada técnica, con 26 referencias, y una advertencia honesta sobre los límites del “entrenamiento cerebral”.
- Funciona **sin conexión**, se puede **instalar** en el celular (PWA), tiene **modo oscuro** y permite exportar e importar el progreso.

## Base científica (resumen)

| Técnica en la app | Evidencia |
|---|---|
| Aprender respondiendo preguntas (práctica de recuperación) | Roediger y Karpicke, 2006; Dunlosky et al., 2013 |
| Repetición espaciada | Cepeda et al., 2006 |
| Práctica intercalada (desafío diario y simulacro) | Rohrer y Taylor, 2007; Kornell y Bjork, 2008 |
| Retroalimentación con explicación | Hattie y Timperley, 2007 |
| Indicar la confianza / efecto de hipercorrección | Butterfield y Metcalfe, 2001; Butler et al., 2008 |
| Instrucción explícita de pensamiento crítico | Abrami et al., 2008 y 2015 |
| Frecuencias naturales para el razonamiento bayesiano | Gigerenzer y Hoffrage, 1995; Sedlmeier y Gigerenzer, 2001 |
| Entrenamiento para reducir sesgos | Morewedge et al., 2015; Sellier et al., 2019 |

**Honestidad:** la evidencia indica que los minijuegos de “entrenamiento cerebral” casi no se transfieren a la inteligencia general (Simons et al., 2016; Melby-Lervåg et al., 2016; Sala y Gobet, 2017). Por eso Razona enseña directamente las habilidades de razonamiento que quieres usar, y no promete subir tu CI. La lista completa de referencias está en la sección *Ciencia* de la app.

## Ejecutar

No necesita instalación ni compilación: es HTML, CSS y JavaScript sin dependencias.

```bash
python3 -m http.server 8080   # o: npm start
# abre http://localhost:8080
```

Para que funcione sin conexión e instalable, publícala en un servidor HTTPS. La opción más simple es **GitHub Pages**: en el repositorio, ve a Settings → Pages → *Deploy from a branch*, elige la rama y la carpeta `/ (root)`.

## Agregar preguntas

Las preguntas están en `js/data/<tema>.js`:

```js
{
  id: "prop-15",        // prefijo del tema + número único
  d: 2,                 // dificultad 1–3
  q: "Enunciado…",
  o: ["Correcta", "Distractor 1", "Distractor 2", "Distractor 3"],
  a: 0,                 // índice de la correcta (las opciones se barajan al mostrarse)
  e: "Explicación de por qué es correcta y por qué fallan las demás."
}
```

Para crear un tema nuevo, agrégalo en `js/data/modulos.js`, crea su archivo, inclúyelo en `index.html` y en la lista de `sw.js`, y sube `VERSION` en `sw.js` para que los usuarios reciban la actualización.

Después de cualquier cambio, ejecuta la validación:

```bash
npm test
```

Revisa que los identificadores sean únicos, que la respuesta correcta exista, que haya explicaciones, que la repetición espaciada funcione y que todos los archivos estén en la caché sin conexión.

## Estructura

```
index.html              Página y navegación
css/app.css             Estilos (claro y oscuro)
js/app.js               Vistas, sesiones, estadísticas
js/srs.js               Repetición espaciada (cajas de Leitner + confianza)
js/data/*.js            Temas, teoría y preguntas
sw.js                   Caché sin conexión
manifest.webmanifest    Instalación como app
tests/validar.mjs       Validación del contenido
```

## Ideas para seguir

- Publicarla en Google Play como app con TWA o Capacitor.
- Cuentas y sincronización entre dispositivos.
- Preguntas visuales (matrices, diagramas de Venn interactivos).
- Más preguntas por tema y niveles de dificultad adaptativos.
- Comparar el resultado de una prueba inicial con uno final para medir el progreso real.
