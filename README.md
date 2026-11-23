# Razona: lógica y pensamiento crítico 🧠

App para entrenar **lógica, lógica matemática, razonamiento numérico, patrones, probabilidad, estadística, falacias,
sesgos y análisis de argumentos**. Tiene el mismo diseño y funcionamiento que **Ruta B** (la app para la licencia de
conducir); solo cambia la temática.

## Instalar en Android

1. Descarga [`release/Razona-2.0.apk`](release/Razona-2.0.apk) en tu teléfono Android (7.0 o superior).
2. Ábrelo y permite "Instalar apps desconocidas" si te lo pide.

> El APK está firmado con una clave fija de depuración (`android/app/firma/razona.keystore`, contraseña `android`),
> igual que Ruta B: así cada versión nueva se instala encima de la anterior sin borrar el progreso.
> Para publicar en Google Play hay que firmar con una clave propia guardada fuera del repositorio.

## Qué incluye

- **Mapa-camino** con 11 unidades y **44 sesiones con tutor**: como un video interactivo, con voz, escenas animadas
  que aparecen al ritmo de la voz, preguntas a mitad de la sesión y el botón "Explícamelo de nuevo".
- **Nada se pregunta sin haberse enseñado antes**: cada una de las 151 preguntas está ligada al paso de la sesión que
  la enseña. La práctica, el repaso, la prueba y el simulacro solo usan lo que ya viste.
- **Práctica** al terminar cada sesión, con **sonidos** al acertar y al fallar; lo fallado vuelve al final de la ronda.
- **Repaso 🔋** con repetición espaciada (vuelve a los 1, 3, 7, 14 y 30 días) y **prueba 🏁** por unidad.
- **Simulacro 🏆**: 35 preguntas en 45 minutos, apruebas con 30. El completo se habilita al terminar la ruta.
- Racha 🔥, progreso por unidad, bienvenida, funciona sin conexión y con emojis iguales en todos los teléfonos.

| Etapa | Unidades |
|---|---|
| Fundamentos de lógica | 1. Lógica proposicional · 2. Razonamiento condicional · 3. Silogismos y deducción |
| Matemática y patrones | 4. Lógica matemática y conjuntos · 5. Razonamiento numérico · 6. Patrones |
| Incertidumbre y evidencia | 7. Probabilidad y Bayes · 8. Estadística y causalidad |
| Pensamiento crítico | 9. Falacias informales · 10. Sesgos y pensamiento reflexivo · 11. Análisis de argumentos |

## Base científica (resumen)

| Técnica en la app | Evidencia |
|---|---|
| Aprender respondiendo preguntas (práctica de recuperación) | Roediger y Karpicke, 2006; Dunlosky et al., 2013 |
| Repetición espaciada | Cepeda et al., 2006 |
| Práctica intercalada (prueba y simulacro) | Rohrer y Taylor, 2007; Kornell y Bjork, 2008 |
| Retroalimentación con explicación | Hattie y Timperley, 2007 |
| Instrucción explícita de pensamiento crítico | Abrami et al., 2008 y 2015 |
| Tutor con ejemplos resueltos y paso a paso | Sweller y Cooper, 1985; VanLehn, 2011 |
| Frecuencias naturales para el razonamiento bayesiano | Gigerenzer y Hoffrage, 1995 |
| Entrenamiento para reducir sesgos | Morewedge et al., 2015; Sellier et al., 2019 |

**Honestidad:** los minijuegos de "entrenamiento cerebral" casi no se transfieren a la inteligencia general
(Simons et al., 2016; Sala y Gobet, 2017). Por eso Razona enseña directamente las habilidades de razonamiento.

## Cómo está hecho

```
contenido/preguntas.json     unidades y preguntas (la primera opción es la correcta; la app las baraja)
tools/sesiones/specs/*.json  guiones de las 44 sesiones con tutor (uNsM); "q" marca qué pregunta enseña cada paso
tools/sesiones/escenas/*.js  escenas dibujadas a mano (reloj, aviones…)
tools/sesiones/engine.html   reproductor de las sesiones (el de Ruta B, con escenas de lógica: Venn, tablas…)
tools/sesiones/build.py      guion → página con voz (edge-tts) e imágenes incrustadas, en tools/sesiones/dist/
tools/app/index.tpl.html     la app: mapa-camino, práctica, repaso, prueba, simulacro, progreso (diseño de Ruta B)
tools/app/build.py           arma www/ (la app + las sesiones) y verifica que toda pregunta se enseñe
tools/fuentes/               fuentes recortadas (licencia OFL); regenerar.py al usar emojis o símbolos nuevos
android/                     proyecto Android (Capacitor)
```

### Compilar

Necesitas Node 22+, Python 3, ffmpeg, JDK 21 y el SDK de Android (`ANDROID_HOME`):

```bash
npm install
pip install edge-tts
npm test                      # toda pregunta tiene que estar enseñada en alguna sesión
npm run sesiones              # compila las 44 sesiones con voz (usa caché en tools/sesiones/.cache)
npm run android:sync          # arma www/ y lo copia al proyecto Android
cd android && ./gradlew assembleRelease   # APK en android/app/build/outputs/apk/release/
```

Para revisar las escenas de una sesión sin escucharla entera: `node tools/sesiones/capturas.js u1s2 carpeta/`.

### Agregar una pregunta

1. Agrégala en `contenido/preguntas.json` (`id`, `u` = unidad, `q`, `o` con la correcta primero, `e` = explicación).
2. En el guion de la sesión que la enseña, marca el paso con `"q": ["id"]`. Si ninguna sesión la enseña todavía,
   agrega los pasos que la expliquen. `npm test` no deja compilar una pregunta sin enseñar.
