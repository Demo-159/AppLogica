# Razona: lógica y pensamiento crítico

App para entrenar **lógica, lógica matemática, razonamiento numérico, probabilidad, estadística y pensamiento crítico**. Sigue el esquema de las apps para el examen de conducir (temas, práctica, simulacro de examen, repaso de errores y progreso), pero aplicado a razonar mejor y usando métodos de estudio respaldados por la investigación.

## Qué incluye

- **Ruta de aprendizaje** con 4 etapas, 11 unidades y 59 pasos que se desbloquean en orden:
  1. 🎓 **Sesión con tutor**: Ada, la tutora, explica la unidad en formato de chat, con ejemplos resueltos paso a paso, pistas graduadas, una explicación específica para cada error y ejercicios en los que explicas con tus palabras.
  2. ★ **Lecciones** de unas 5 preguntas. Las que falles se repiten al final y obtienes de 1 a 3 estrellas.
  3. ↻ **Repaso de la unidad**: prioriza tus errores y se aprueba con 7 de 8.
  4. 🏆 **Repaso de etapa**: preguntas mezcladas de toda la etapa; se aprueba con 10 de 12 para pasar a la siguiente.
- **Repaso espaciado**: las preguntas vuelven a los 1, 3, 7, 14, 30 y 60 días según cómo las respondas.
- **Práctica libre**: desafío diario, repaso, simulacro de examen (35 preguntas en 45 minutos) y práctica por tema.
- **151 preguntas** con explicación y teoría clave en cada tema.
- **Confianza y calibración**: antes de ver la respuesta indicas qué tan seguro estás.
- **Progreso**: racha, meta diaria, actividad, dominio por tema e historial de simulacros.
- **Sección Ciencia** con la evidencia de cada técnica y 31 referencias.
- **APK de Android** (Capacitor), y también como web instalable que funciona sin conexión y tiene modo oscuro.

## Base científica (resumen)

| Técnica en la app | Evidencia |
|---|---|
| Aprender respondiendo preguntas (práctica de recuperación) | Roediger y Karpicke, 2006; Dunlosky et al., 2013 |
| Repetición espaciada | Cepeda et al., 2006 |
| Práctica intercalada (desafío diario y simulacro) | Rohrer y Taylor, 2007; Kornell y Bjork, 2008 |
| Retroalimentación con explicación | Hattie y Timperley, 2007 |
| Indicar la confianza / efecto de hipercorrección | Butterfield y Metcalfe, 2001; Butler et al., 2008 |
| Instrucción explícita de pensamiento crítico | Abrami et al., 2008 y 2015 |
| Ruta con dominio progresivo | Kulik, Kulik y Bangert-Drowns, 1990 |
| Tutor con ejemplos resueltos y pistas paso a paso | Sweller y Cooper, 1985; VanLehn, 2011 |
| Explicar con tus palabras (autoexplicación) | Chi et al., 1994; Bisra et al., 2018 |
| Frecuencias naturales para el razonamiento bayesiano | Gigerenzer y Hoffrage, 1995; Sedlmeier y Gigerenzer, 2001 |
| Entrenamiento para reducir sesgos | Morewedge et al., 2015; Sellier et al., 2019 |

**Honestidad:** la evidencia indica que los minijuegos de “entrenamiento cerebral” casi no se transfieren a la inteligencia general (Simons et al., 2016; Melby-Lervåg et al., 2016; Sala y Gobet, 2017). Por eso Razona enseña directamente las habilidades de razonamiento que quieres usar, y no promete subir tu CI. La lista completa de referencias está en la sección *Ciencia* de la app.

## Instalar en Android

1. Descarga [`release/Razona-1.0.apk`](release/Razona-1.0.apk) en tu teléfono Android (7.0 o superior).
2. Ábrelo y permite "Instalar apps desconocidas" si te lo pide.

> El APK está firmado con una clave fija de depuración (`android/app/firma/razona.keystore`, contraseña `android`),
> igual que Ruta B: así cada versión nueva se instala encima de la anterior sin borrar el progreso.
> Para publicar en Google Play hay que firmar con una clave propia guardada fuera del repositorio.

La unidad 1 ya tiene su **sesión con tutor animada** (voz y escenas que se animan al ritmo de la voz, hechas con el
motor de Ruta B en `tools/sesiones`). Las demás unidades todavía usan la sesión con tutor en formato chat.

### Compilar el APK en tu computador

Necesitas Node 22+, JDK 21 y Android Studio (o el SDK de Android con `ANDROID_HOME` configurado):

```bash
npm install
python3 tools/sesiones/build.py u1s1   # sesiones animadas (necesita edge-tts y ffmpeg)
npm run android:sync
cd android && ./gradlew assembleRelease   # APK en android/app/build/outputs/apk/release/
# o bien abre el proyecto en Android Studio:
npx cap open android
```

Si cambias el logo (`icons/icon.svg`), regenera los íconos de Android con `node scripts/iconos-android.js`.

## Ejecutar como web

```bash
python3 -m http.server 8080   # o: npm start
# abre http://localhost:8080
```

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

Para crear un tema nuevo: agrégalo en `js/data/modulos.js` y en una etapa de `LOGICA.etapas`, crea su archivo de preguntas, escribe su sesión con tutor en `js/data/tutor.js`, inclúyelo en `index.html` y en la lista de `sw.js`, y sube `VERSION` en `sw.js`. Las lecciones de la ruta se generan solas (unas 5 preguntas cada una, de menor a mayor dificultad).

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
js/data/*.js            Temas, teoría, preguntas y etapas de la ruta
js/data/tutor.js        Guiones de las sesiones con tutor
sw.js                   Caché sin conexión
manifest.webmanifest    Instalación como app
tests/validar.mjs       Validación del contenido
android/                Proyecto Android (Capacitor)
scripts/                Copia de la web a www/ e íconos de Android
.github/workflows/      Compilación automática del APK
```

## Ideas para seguir

- Firma de versión y publicación en Google Play.
- Tutor con IA que responda preguntas libres (requiere un servidor propio para no exponer la clave de la API).
- Cuentas y sincronización entre dispositivos.
- Preguntas visuales (matrices, diagramas de Venn interactivos).
- Más preguntas por tema y niveles de dificultad adaptativos.
- Comparar el resultado de una prueba inicial con uno final para medir el progreso real.
