// Guiones de las sesiones con tutor (una por unidad).
// Tipos de paso:
//   msg     → mensaje del tutor (HTML)
//   ej      → ejemplo resuelto que se revela paso a paso
//   preg    → pregunta con retroalimentación específica por respuesta (fb), pista y explicación final (ok)
//   explica → pide explicar con tus palabras y luego muestra una respuesta modelo
//   fin     → resumen de la sesión
// En "preg", "a" es el índice de la correcta y "fb" usa los índices de las incorrectas.
LOGICA.tutor = {
  prop: [
    { t: "msg", x: "¡Hola! Soy <b>Ada</b>, tu tutora. En esta unidad vamos a aprender el idioma de la lógica: cómo se combinan las afirmaciones y cuándo son verdaderas." },
    { t: "msg", x: "Empecemos por el conector más traicionero: el condicional <b>si p, entonces q</b>. Piénsalo como una promesa: “Si apruebas, te invito a comer”." },
    {
      t: "preg", x: "¿En qué caso rompí mi promesa “si apruebas, te invito a comer”?",
      o: ["Aprobaste y no te invité.", "No aprobaste y te invité igual.", "No aprobaste y no te invité.", "Aprobaste y te invité."], a: 0,
      fb: { 1: "Invitarte sin que aprobaras no rompe la promesa: solo prometí qué pasaría SI aprobabas.", 2: "Si no aprobaste, la promesa no se activó, así que no la rompí.", 3: "¡Ese es justo el caso en que cumplí!" },
      pista: "Busca el caso en que se cumple la condición (aprobar) pero no lo prometido.",
      ok: "Exacto: p → q solo es falso cuando p es verdadero y q es falso. En todos los demás casos el condicional es verdadero."
    },
    { t: "msg", x: "Ahora un truco clave: la <b>contrapositiva</b>. “Si p, entonces q” dice exactamente lo mismo que “si no q, entonces no p”. Veámoslo con calma." },
    {
      t: "ej", x: "Escribir la contrapositiva de “Si es un triángulo, tiene tres lados”.",
      pasos: [
        "Identifica las partes: p = “es un triángulo”, q = “tiene tres lados”.",
        "Niega ambas: ¬q = “no tiene tres lados”, ¬p = “no es un triángulo”.",
        "Invierte el orden: ¬q → ¬p.",
        "Resultado: “Si no tiene tres lados, no es un triángulo”. Dice lo mismo que el original."
      ]
    },
    {
      t: "explica", x: "Explícalo con tus palabras: ¿por qué “Si llueve, uso paraguas” NO equivale a “Si uso paraguas, llueve”?",
      modelo: "Porque puedo usar paraguas por otras razones, como el sol. El original solo dice qué pasa cuando llueve; no dice que la lluvia sea la única razón. Invertir el condicional (la recíproca) cambia su significado."
    },
    {
      t: "preg", x: "Última: ¿cuál es la negación de “Hace frío y llueve”?",
      o: ["No hace frío o no llueve.", "No hace frío y no llueve.", "Hace calor y está soleado.", "No hace frío, pero llueve."], a: 0,
      fb: { 1: "Eso es más fuerte de lo necesario: para que “frío y lluvia” sea falso basta que falle UNA de las dos.", 2: "Eso agrega información (calor, sol) que no está en la negación.", 3: "Ese es solo uno de los casos posibles: también podría hacer frío sin que llueva." },
      pista: "Ley de De Morgan: al negar un “y”, se convierte en “o” y se niega cada parte.",
      ok: "¡Bien! ¬(p ∧ q) ≡ ¬p ∨ ¬q."
    },
    { t: "fin", puntos: ["p → q solo es falso cuando p es verdadero y q es falso.", "La contrapositiva (¬q → ¬p) equivale al original; la recíproca (q → p) no.", "De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q, y ¬(p ∨ q) ≡ ¬p ∧ ¬q."] }
  ],

  cond: [
    { t: "msg", x: "En esta unidad aprenderás a distinguir los razonamientos válidos de los que solo lo parecen." },
    { t: "msg", x: "Hay dos formas válidas con condicionales: <b>modus ponens</b> (p → q y p; entonces q) y <b>modus tollens</b> (p → q y no q; entonces no p). Y hay dos trampas: <b>afirmar el consecuente</b> y <b>negar el antecedente</b>." },
    {
      t: "ej", x: "“Si la alarma está activada, la puerta está cerrada. La puerta está abierta.” ¿Qué se concluye?",
      pasos: [
        "Traduce: p = alarma activada, q = puerta cerrada. Regla: p → q.",
        "Dato: la puerta está abierta, es decir, ¬q.",
        "La forma es p → q, ¬q: es modus tollens.",
        "Conclusión válida: la alarma NO está activada (¬p)."
      ]
    },
    {
      t: "preg", x: "“Si una persona es chilena, tiene RUT. Camila tiene RUT.” ¿Qué podemos concluir?",
      o: ["Nada seguro sobre su nacionalidad.", "Camila es chilena.", "Camila no es chilena.", "Camila no tiene RUT."], a: 0,
      fb: { 1: "Eso es afirmar el consecuente: muchos extranjeros residentes también tienen RUT.", 2: "Nada en las premisas dice que no lo sea.", 3: "Eso contradice el dato que nos dan." },
      pista: "¿La regla dice que solo los chilenos tienen RUT? Fíjate en la dirección de la flecha.",
      ok: "Correcto: de p → q y q no se sigue p."
    },
    {
      t: "explica", x: "Explica con tus palabras por qué el modus tollens es válido.",
      modelo: "Si p fuera verdadero, la regla obligaría a que q también lo fuera. Pero sabemos que q es falso. Entonces p no puede ser verdadero: suponerlo lleva a una contradicción."
    },
    {
      t: "preg", x: "Para comprobar la regla “Si un producto es orgánico, tiene sello verde”, ¿qué productos conviene revisar?",
      o: ["Los orgánicos y los que no tienen sello verde.", "Los orgánicos y los que tienen sello verde.", "Solo los que tienen sello verde.", "Todos los que no son orgánicos."], a: 0,
      fb: { 1: "Revisar los que tienen sello no sirve: la regla no prohíbe que un producto no orgánico lo tenga.", 2: "Un producto con sello no puede romper la regla, sea orgánico o no.", 3: "Los no orgánicos no pueden romper la regla: no dice nada sobre ellos." },
      pista: "¿Qué combinación rompería la regla? Revisa los productos que podrían esconderla.",
      ok: "¡Exacto! La única violación posible es “orgánico sin sello”, así que se revisan p y ¬q. Es la tarea de Wason aplicada a la vida real."
    },
    { t: "fin", puntos: ["Válidos: modus ponens y modus tollens.", "Inválidos: afirmar el consecuente y negar el antecedente.", "Para poner a prueba una regla, busca los casos que podrían refutarla (p y ¬q)."] }
  ],

  silo: [
    { t: "msg", x: "Los silogismos usan palabras como <b>todos</b>, <b>algunos</b> y <b>ninguno</b>. El truco es dibujar conjuntos, como círculos." },
    {
      t: "ej", x: "“Todos los programadores usan computador. Algunos músicos son programadores.” ¿Qué se sigue?",
      pasos: [
        "Dibuja un círculo grande: las personas que usan computador.",
        "Dentro de él, otro círculo: los programadores (todos están dentro).",
        "Los músicos se cruzan con los programadores al menos en un punto: algunos músicos son programadores.",
        "Esos músicos-programadores están dentro del círculo grande. Conclusión: algunos músicos usan computador."
      ]
    },
    {
      t: "preg", x: "“Todos los perros son mamíferos. Algunos mamíferos nadan.” ¿Se sigue que algunos perros nadan?",
      o: ["No, no se sigue.", "Sí, se sigue.", "No: ningún perro nada."], a: 0,
      fb: { 1: "Dibújalo: los mamíferos que nadan podrían estar fuera del círculo de los perros (ballenas, focas…).", 2: "Eso tampoco se sigue: las premisas no lo descartan." },
      pista: "¿Los mamíferos que nadan tienen que estar dentro del círculo de los perros?",
      ok: "Correcto. Sabemos que hay perros que nadan, pero ese dato no viene de estas premisas. Separar lo que sabes de lo que se deduce es la clave."
    },
    { t: "msg", x: "Ese error tiene nombre: <b>sesgo de creencia</b>. Tendemos a aceptar argumentos inválidos cuando su conclusión nos parece cierta." },
    {
      t: "explica", x: "¿Por qué es útil reemplazar las palabras por letras (A, B, C) al evaluar un silogismo?",
      modelo: "Porque elimina lo que sabemos o creemos sobre el tema y deja solo la estructura. Si la forma es inválida con letras, también lo es con palabras, aunque la conclusión suene verdadera."
    },
    {
      t: "preg", x: "“Ningún vegetal es mineral. Todas las zanahorias son vegetales.” ¿Qué se sigue?",
      o: ["Ninguna zanahoria es mineral.", "Algunas zanahorias son minerales.", "Ningún mineral es vegetal, salvo la zanahoria.", "No se sigue nada."], a: 0,
      fb: { 1: "Las zanahorias están dentro de los vegetales, y los vegetales no tocan a los minerales.", 2: "Esa excepción no aparece en ninguna premisa.", 3: "Sí se sigue algo: dibuja los círculos." },
      pista: "Si el círculo de las zanahorias está dentro del de los vegetales, ¿puede tocar el de los minerales?",
      ok: "¡Bien! Si un conjunto está dentro de otro que no toca a un tercero, tampoco lo toca."
    },
    { t: "fin", puntos: ["Dibuja los conjuntos: los diagramas de Venn hacen visible la estructura.", "Con dos premisas de tipo “algunos” no se puede concluir nada.", "Evalúa la forma, no si la conclusión te parece cierta (sesgo de creencia)."] }
  ],

  mat: [
    { t: "msg", x: "Hoy veremos los cuantificadores (<b>para todo</b> y <b>existe</b>) y cómo se demuestra en matemáticas." },
    { t: "msg", x: "Regla de oro para negar: negar “todos” da <b>“existe al menos uno que no”</b>, y negar “existe” da <b>“ninguno”</b>." },
    {
      t: "preg", x: "¿Cuál es la negación de “Todos los alumnos aprobaron”?",
      o: ["Al menos un alumno no aprobó.", "Ningún alumno aprobó.", "Todos los alumnos reprobaron.", "Algunos alumnos aprobaron."], a: 0,
      fb: { 1: "Eso es demasiado fuerte: para que “todos aprobaron” sea falso basta con UN alumno que no aprobó.", 2: "Es lo mismo que decir que ninguno aprobó: demasiado fuerte.", 3: "Esto es compatible con que todos hayan aprobado, así que no lo niega." },
      pista: "¿Qué necesitarías encontrar para demostrar que alguien mintió al decir “todos aprobaron”?",
      ok: "Exacto: ¬∀x P(x) ≡ ∃x ¬P(x). Un solo contraejemplo basta."
    },
    {
      t: "ej", x: "Demostrar que la suma de dos números pares es par.",
      pasos: [
        "Escribe la forma general de dos pares: 2a y 2b, con a y b enteros.",
        "Súmalos: 2a + 2b.",
        "Factoriza: 2a + 2b = 2(a + b).",
        "Como a + b es entero, 2(a + b) es par. ∎ Fíjate en que probamos TODOS los casos a la vez, no algunos ejemplos."
      ]
    },
    {
      t: "explica", x: "¿Por qué comprobar que 2 + 4, 6 + 8 y 10 + 12 son pares NO demuestra que la suma de dos pares siempre es par?",
      modelo: "Porque hay infinitos pares y solo revisé tres casos. Los ejemplos pueden sugerir un patrón, pero una demostración debe cubrir todos los casos, por ejemplo usando la forma general 2a + 2b. En cambio, un solo contraejemplo sí basta para refutar."
    },
    {
      t: "preg", x: "En un grupo de 50 personas, 30 hablan inglés, 25 hablan francés y 10 hablan ambos. ¿Cuántas no hablan ninguno de los dos?",
      o: ["5", "0", "15", "10"], a: 0,
      fb: { 1: "Si sumas 30 + 25 = 55 cuentas dos veces a las 10 personas que hablan ambos.", 2: "Revisa: quienes hablan al menos uno son 30 + 25 − 10.", 3: "Recuerda restar a las 10 personas que contaste dos veces, y luego compara con el total." },
      pista: "|A ∪ B| = |A| + |B| − |A ∩ B|.",
      ok: "Bien: 30 + 25 − 10 = 45 hablan al menos uno; 50 − 45 = 5."
    },
    { t: "fin", puntos: ["¬(todos) = existe al menos uno que no. ¬(existe) = ninguno.", "Los ejemplos no demuestran; un contraejemplo sí refuta.", "Inclusión-exclusión: |A ∪ B| = |A| + |B| − |A ∩ B|."] }
  ],

  num: [
    { t: "msg", x: "Los números engañan cuando cambia la base sobre la que se calculan. Empecemos con porcentajes." },
    {
      t: "ej", x: "Una acción cae 50% y luego sube 50%. ¿Recuperaste tu dinero?",
      pasos: [
        "Supón que tenías $100.",
        "Cae 50%: 100 × 0,5 = $50.",
        "Sube 50%, pero sobre $50: 50 × 1,5 = $75.",
        "Perdiste un 25%. Para recuperarte de una caída del 50% necesitas una subida del 100%."
      ]
    },
    {
      t: "preg", x: "Un sueldo sube 10% y al año siguiente sube otro 10%. ¿Cuánto subió en total?",
      o: ["21%", "20%", "11%", "100%"], a: 0,
      fb: { 1: "El segundo 10% se calcula sobre el sueldo ya aumentado, no sobre el original.", 2: "Recuerda multiplicar: 1,1 × 1,1.", 3: "Revisa el cálculo: multiplica 1,1 × 1,1." },
      pista: "Multiplica los factores: 1,10 × 1,10.",
      ok: "Exacto: 1,1 × 1,1 = 1,21, es decir, un 21%."
    },
    { t: "msg", x: "Otro clásico: <b>riesgo relativo vs. absoluto</b>. “Duplica el riesgo” puede significar pasar de 1 a 2 casos por cada 10.000 personas." },
    {
      t: "explica", x: "Una noticia dice: “Comer X aumenta 50% el riesgo de una enfermedad”. ¿Qué preguntarías antes de asustarte?",
      modelo: "¿Cuál es el riesgo de base? Si es 2 de cada 100.000, un aumento del 50% lo lleva a 3 de cada 100.000: un cambio absoluto mínimo. También preguntaría si el estudio es un experimento o solo encontró una correlación."
    },
    {
      t: "preg", x: "En un viaje de 120 km, haces los primeros 60 km a 60 km/h y los otros 60 km a 30 km/h. ¿Cuál fue tu velocidad media?",
      o: ["40 km/h", "45 km/h", "50 km/h", "35 km/h"], a: 0,
      fb: { 1: "45 es el promedio de 60 y 30, pero pasas más tiempo yendo lento.", 2: "Calcula cuánto tardas en cada tramo.", 3: "Revisa: 60 km a 60 km/h toman 1 hora y 60 km a 30 km/h, 2 horas." },
      pista: "Velocidad media = distancia total / tiempo total.",
      ok: "Bien: 120 km en 3 horas = 40 km/h."
    },
    { t: "fin", puntos: ["Los porcentajes sucesivos se multiplican, no se suman.", "Pregunta siempre por el riesgo absoluto.", "Velocidad media = distancia total / tiempo total."] }
  ],

  prob: [
    { t: "msg", x: "Esta es quizá la unidad más útil para la vida diaria: razonar con incertidumbre." },
    { t: "msg", x: "El truco con mejor evidencia: en vez de porcentajes, piensa en <b>personas concretas</b> (frecuencias naturales). Mira este ejemplo." },
    {
      t: "ej", x: "Una enfermedad afecta a 1 de cada 100 personas. Un test detecta al 100% de los enfermos, pero da positivo en el 10% de los sanos. Si das positivo, ¿qué probabilidad hay de que estés enfermo?",
      pasos: [
        "Imagina 1.000 personas: 10 enfermas y 990 sanas.",
        "Los 10 enfermos dan positivo (el test los detecta a todos).",
        "De los 990 sanos, el 10% da positivo: 99 falsos positivos.",
        "Positivos totales: 10 + 99 = 109, y solo 10 están enfermos. Probabilidad ≈ 10/109 ≈ 9%. ¡No 90%!"
      ]
    },
    {
      t: "explica", x: "¿Por qué la probabilidad es tan baja si el test detecta a todos los enfermos?",
      modelo: "Porque la enfermedad es rara (tasa base de 1%). Hay tantos sanos que, aunque solo el 10% dé un falso positivo, son muchos más que los enfermos reales. La mayoría de los positivos viene del grupo grande de sanos."
    },
    {
      t: "preg", x: "El 2% de los correos que recibe una empresa son estafas. Un filtro marca el 90% de las estafas, pero también el 5% de los correos legítimos. De los correos marcados, ¿qué fracción son estafas, aproximadamente?",
      o: ["≈ 27%", "≈ 90%", "≈ 95%", "≈ 50%"], a: 0,
      fb: { 1: "90% es la probabilidad de marcar una estafa, no la de que un correo marcado sea estafa.", 2: "Ese número no considera los correos legítimos marcados por error.", 3: "Haz la cuenta con 1.000 correos." },
      pista: "Con 1.000 correos: ¿cuántas estafas hay y cuántas se marcan? ¿Cuántos legítimos se marcan?",
      ok: "¡Muy bien! 18 estafas marcadas frente a 49 correos legítimos marcados: 18/67 ≈ 27%."
    },
    {
      t: "preg", x: "Una ruleta salió rojo 8 veces seguidas. ¿Qué es más probable en la próxima tirada?",
      o: ["Lo mismo que siempre: la ruleta no tiene memoria.", "Negro, porque ya toca.", "Rojo, porque está en racha."], a: 0,
      fb: { 1: "Esa es la falacia del jugador: los resultados anteriores no cambian la probabilidad.", 2: "Las rachas no existen en un mecanismo aleatorio justo." },
      pista: "¿Puede la ruleta “recordar” lo que salió antes?",
      ok: "Correcto. Cada tirada es independiente."
    },
    { t: "fin", puntos: ["No olvides la tasa base.", "Traduce los porcentajes a frecuencias: “de cada 1.000…”.", "P(A|B) no es lo mismo que P(B|A).", "Los eventos independientes no tienen memoria."] }
  ],

  est: [
    { t: "msg", x: "Todos los días aparecen titulares del tipo “X está asociado con Y”. Aprendamos a leerlos." },
    { t: "msg", x: "Ante una correlación entre A y B hay al menos cuatro explicaciones: <b>A causa B</b>, <b>B causa A</b> (causalidad inversa), <b>un factor C causa ambas</b> (confusión) o <b>azar</b>." },
    {
      t: "ej", x: "Titular: “Los niños que duermen con la luz encendida tienen más miopía”.",
      pasos: [
        "¿A causa B? Quizás la luz daña los ojos… pero no saltemos a esa conclusión.",
        "¿Hay un confusor? Tal vez los padres miopes (genética) dejan la luz encendida más a menudo.",
        "¿Causalidad inversa? Quizás los niños que ya ven mal prefieren dormir con luz.",
        "Estudios posteriores encontraron que la miopía de los padres explicaba buena parte de la asociación. Moraleja: busca el confusor antes de aceptar la causa."
      ]
    },
    {
      t: "preg", x: "Las ciudades con más bomberos tienen más incendios. ¿Cuál es la explicación más razonable?",
      o: ["Las ciudades más grandes tienen más incendios y más bomberos.", "Los bomberos provocan incendios.", "Es puro azar.", "Los incendios hacen aparecer bomberos."], a: 0,
      fb: { 1: "No hay razones para pensarlo: busca un factor común.", 2: "Con muchas ciudades, una asociación así no es azar.", 3: "Algo de eso hay (se contratan bomberos donde hay incendios), pero un factor más simple explica ambas cosas." },
      pista: "¿Qué tienen en común las ciudades con muchos bomberos y muchos incendios?",
      ok: "Exacto: el tamaño de la ciudad es una variable de confusión."
    },
    {
      t: "explica", x: "¿Por qué un experimento con asignación al azar resuelve el problema de los confusores?",
      modelo: "Porque al sortear quién recibe el tratamiento, los confusores (edad, genética, ingresos e incluso los que no conocemos) quedan repartidos por igual entre los grupos. Así, la única diferencia sistemática entre ellos es el tratamiento."
    },
    {
      t: "preg", x: "Un colegio da tutorías a los 10 alumnos con peores notas y en la siguiente prueba mejoran. ¿Qué debes considerar antes de concluir que la tutoría funcionó?",
      o: ["La regresión a la media: los resultados extremos tienden a mejorar solos.", "Nada: la mejora es clara.", "Que la prueba siguiente era más difícil.", "Que eran pocos alumnos."], a: 0,
      fb: { 1: "Los peores resultados se deben en parte a la mala suerte, que no se repite.", 2: "Si fuera más difícil, esperarías que empeoraran, no que mejoraran.", 3: "Es una limitación real, pero hay un problema más importante al elegir justo a los peores." },
      pista: "¿Qué suele pasar cuando alguien con un resultado extremo repite la prueba?",
      ok: "Correcto. Para saber si funcionó, hay que compararlos con un grupo similar que no recibió tutoría."
    },
    { t: "fin", puntos: ["Ante una correlación, considera causa, causalidad inversa, confusión y azar.", "Los experimentos aleatorizados controlan los confusores.", "Después de un resultado extremo, espera una regresión a la media."] }
  ],

  fal: [
    { t: "msg", x: "Las falacias son argumentos que parecen buenos pero no lo son. Conocerlas te protege de la manipulación y te ayuda a no usarlas." },
    { t: "msg", x: "Pregunta guía: <b>¿la respuesta ataca la idea o algo distinto?</b> Por ejemplo, a la persona, una versión exagerada o una cadena de miedos." },
    {
      t: "ej", x: "A: “Deberíamos tener más ciclovías.” B: “Claro, y que todos andemos en bicicleta y prohibamos los autos. ¡Absurdo!”",
      pasos: [
        "¿Qué dijo A? Que haya más ciclovías.",
        "¿Qué refuta B? Prohibir los autos y que todos usen bicicleta.",
        "B atacó una versión exagerada que A nunca defendió.",
        "Eso es un hombre de paja. Una respuesta justa sería: “¿Cuántas ciclovías y dónde? ¿Cuánto cuestan?”"
      ]
    },
    {
      t: "preg", x: "“Este político dice que hay que subir los impuestos, pero él mismo los evade, así que su propuesta es mala.” ¿Qué ocurre aquí?",
      o: ["Ad hominem / tu quoque", "Falso dilema", "Pendiente resbaladiza", "No hay falacia"], a: 0,
      fb: { 1: "No se plantean solo dos opciones.", 2: "No hay una cadena de consecuencias.", 3: "Su conducta puede ser reprochable, pero no dice nada sobre si la propuesta es buena." },
      pista: "¿El argumento evalúa la propuesta o a quien la propone?",
      ok: "Correcto. Su hipocresía sirve para juzgarlo a él, no a su propuesta."
    },
    {
      t: "explica", x: "¿Cuándo es razonable apelar a una autoridad y cuándo es una falacia?",
      modelo: "Es razonable cuando la autoridad es experta en ese tema, hay consenso entre los expertos y la afirmación se basa en evidencia. Es falacia cuando la autoridad es de otro campo, habla sola contra el consenso o se usa para reemplazar la evidencia."
    },
    {
      t: "preg", x: "“Si permitimos los scooters eléctricos, después querrán motos en las veredas y luego autos.” ¿Qué falacia es?",
      o: ["Pendiente resbaladiza", "Hombre de paja", "Ad populum", "Post hoc"], a: 0,
      fb: { 1: "No deforma la postura de nadie.", 2: "No apela a lo que piensa la mayoría.", 3: "No afirma que algo causó otra cosa por haber ocurrido antes." },
      pista: "Fíjate en la cadena de consecuencias que no se justifica.",
      ok: "Exacto. Cada paso de la cadena necesitaría su propia justificación."
    },
    { t: "fin", puntos: ["Pregúntate: ¿se ataca la idea o algo distinto?", "Hombre de paja: refutar algo que el otro no dijo.", "Apelar a expertos en su área, con evidencia, no es una falacia."] }
  ],

  ses: [
    { t: "msg", x: "Tu cerebro tiene un piloto automático rápido (la intuición) y otro lento (la reflexión). La intuición suele acertar, pero tiene puntos ciegos predecibles." },
    {
      t: "ej", x: "Un lápiz y una goma cuestan $1.100 en total. El lápiz cuesta $1.000 más que la goma. ¿Cuánto cuesta la goma?",
      pasos: [
        "La intuición dice $100. ¡Comprobémoslo antes de responder!",
        "Si la goma costara $100, el lápiz costaría $1.100 y el total sería $1.200. No cuadra.",
        "Planteamos: goma = x, lápiz = x + 1.000. Total: 2x + 1.000 = 1.100.",
        "x = 50: la goma cuesta $50. Moraleja: contrasta la respuesta intuitiva con los datos."
      ]
    },
    {
      t: "preg", x: "Ves una oferta: “Antes $90.000, ahora $45.000” y te parece una ganga. ¿Qué sesgo podría estar actuando?",
      o: ["Anclaje", "Costo hundido", "Sesgo retrospectivo", "Error fundamental de atribución"], a: 0,
      fb: { 1: "El costo hundido tiene que ver con lo que ya gastaste.", 2: "Ese sesgo consiste en creer después que el resultado “era obvio”.", 3: "Ese sesgo trata de cómo explicamos la conducta de otras personas." },
      pista: "¿Qué número influye en cómo percibes el precio?",
      ok: "Exacto: el “antes $90.000” ancla tu juicio. Pregúntate: ¿cuánto vale realmente para mí?"
    },
    {
      t: "explica", x: "Describe una decisión reciente en la que pudiste caer en el costo hundido o en el sesgo de confirmación.",
      modelo: "Por ejemplo: seguir viendo una serie que ya no me gusta porque “ya vi tres temporadas” (costo hundido), o buscar solo reseñas positivas de algo que ya quería comprar (confirmación). Lo útil es reconocer la señal: “ya invertí mucho” o “solo busco lo que me da la razón”."
    },
    {
      t: "preg", x: "Una mancha de algas se duplica cada día y cubre todo el lago en 30 días. ¿Qué día cubría un cuarto del lago?",
      o: ["El día 28", "El día 15", "El día 7,5", "El día 29"], a: 0,
      fb: { 1: "Eso sería crecimiento lineal, pero aquí la mancha se duplica.", 2: "Piensa en duplicaciones, no en fracciones del tiempo.", 3: "El día 29 cubría la mitad. ¿Y el día anterior?" },
      pista: "Ve hacia atrás: el día 29 cubría la mitad.",
      ok: "¡Bien! El día 29 cubría la mitad y el día 28, un cuarto."
    },
    { t: "fin", puntos: ["Antes de responder, contrasta tu intuición con los datos.", "Pregúntate: ¿cómo podría estar equivocado?", "Reconoce las señales: números ancla, “ya invertí mucho”, “solo busco lo que me da la razón”."] }
  ],

  arg: [
    { t: "msg", x: "Un argumento es una afirmación (la <b>conclusión</b>) apoyada en razones (las <b>premisas</b>). Saber separarlas es el primer paso para evaluarlo." },
    {
      t: "ej", x: "“Deberíamos prohibir los celulares en clases, porque distraen y los estudios muestran que bajan el rendimiento.”",
      pasos: [
        "Conclusión: deberíamos prohibir los celulares en clases.",
        "Premisa 1: los celulares distraen.",
        "Premisa 2: los estudios muestran que bajan el rendimiento.",
        "Supuesto implícito: los beneficios de prohibirlos superan los costos (como no poder usarlos para aprender). Evaluar el argumento incluye revisar ese supuesto."
      ]
    },
    {
      t: "preg", x: "“Los países con más bibliotecas tienen mayores ingresos, así que construir bibliotecas enriquece a un país.” ¿Qué dato lo debilita más?",
      o: ["Los países ricos construyen bibliotecas porque pueden pagarlas.", "Las bibliotecas tienen muchos libros.", "Mucha gente visita las bibliotecas.", "Las bibliotecas son edificios caros."], a: 0,
      fb: { 1: "No dice nada sobre la relación con los ingresos.", 2: "La popularidad no es evidencia de una causa.", 3: "El costo no cambia si causan riqueza o no." },
      pista: "Busca otra explicación para la correlación.",
      ok: "Exacto: es causalidad inversa. Si la riqueza causa las bibliotecas, construirlas no enriquecería al país."
    },
    {
      t: "explica", x: "¿Qué es el principio de caridad y por qué hace más fuerte tu pensamiento?",
      modelo: "Es interpretar el argumento del otro en su versión más razonable antes de criticarlo. Fortalece tu pensamiento porque, si logras refutar la mejor versión, tu conclusión es sólida; y si no puedes, quizás aprendas algo o debas cambiar de opinión."
    },
    {
      t: "preg", x: "¿Cuál de estos es un razonamiento inductivo?",
      o: ["“Los últimos 20 inviernos llovió en junio, así que el próximo junio lloverá.”", "“Todo número par es divisible por 2; 8 es par; luego 8 es divisible por 2.”", "“Si A, entonces B; A; luego B.”"], a: 0,
      fb: { 1: "Eso es deducción: la conclusión se sigue con certeza.", 2: "Eso es modus ponens, una forma deductiva." },
      pista: "La inducción generaliza a partir de casos observados: su conclusión es probable, no segura.",
      ok: "Correcto: generaliza a partir de casos y su conclusión es solo probable."
    },
    { t: "fin", puntos: ["Separa conclusión, premisas y supuestos implícitos.", "Para debilitar una afirmación causal, busca explicaciones alternativas.", "Aplica el principio de caridad."] }
  ],

  pat: [
    { t: "msg", x: "Encontrar un patrón es encontrar la regla que genera los datos. Para eso hay un método sistemático." },
    {
      t: "ej", x: "Serie: 3, 5, 9, 17, 33, … ¿Qué número sigue?",
      pasos: [
        "Calcula las diferencias: 2, 4, 8, 16.",
        "¡Las diferencias se duplican! La siguiente es 32.",
        "33 + 32 = 65.",
        "Comprobación por otro camino: cada término es el doble del anterior menos 1 (3×2−1 = 5, 5×2−1 = 9…). 33×2−1 = 65 ✓. Dos caminos llevan al mismo resultado."
      ]
    },
    {
      t: "preg", x: "¿Qué número sigue? 1, 3, 6, 10, 15, …",
      o: ["21", "20", "25", "18"], a: 0,
      fb: { 1: "Mira las diferencias: 2, 3, 4, 5…", 2: "Las diferencias crecen de uno en uno, no de cinco en cinco.", 3: "Revisa cuál sería la siguiente diferencia." },
      pista: "Calcula las diferencias entre términos consecutivos.",
      ok: "¡Bien! Las diferencias son 2, 3, 4, 5 y 6: 15 + 6 = 21. Son los números triangulares."
    },
    {
      t: "explica", x: "¿Por qué conviene comprobar una regla con TODOS los términos y no solo con los primeros?",
      modelo: "Porque muchas reglas distintas encajan con los primeros términos: 2, 4… puede ser +2 o ×2. Solo comprobando la regla con todos los datos (y, si se puede, por dos caminos) te aseguras de que es la correcta."
    },
    {
      t: "preg", x: "Hoy es miércoles. ¿Qué día será dentro de 50 días?",
      o: ["Jueves", "Miércoles", "Viernes", "Martes"], a: 0,
      fb: { 1: "50 no es múltiplo de 7.", 2: "Calcula el resto de dividir 50 entre 7.", 3: "Vas hacia adelante en el calendario, no hacia atrás." },
      pista: "50 = 7 × 7 + 1.",
      ok: "Correcto: el resto es 1, así que será el día siguiente al miércoles."
    },
    { t: "fin", puntos: ["Prueba con diferencias, luego con cocientes y luego con diferencias de diferencias.", "Comprueba la regla con todos los términos.", "Para ciclos, usa el resto de la división."] }
  ]
};
