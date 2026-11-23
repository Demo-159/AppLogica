// Catálogo de módulos. Cada módulo tiene teoría breve (instrucción explícita)
// y un banco de preguntas en js/data/<id>.js que se registra con LOGICA.add().
window.LOGICA = window.LOGICA || { modulos: [], preguntas: {} };
LOGICA.add = function (moduloId, lista) {
  LOGICA.preguntas[moduloId] = lista.map(function (p) {
    p.m = moduloId;
    return p;
  });
};

LOGICA.modulos = [
  {
    id: "prop",
    nombre: "Lógica proposicional",
    emoji: "∧",
    color: "#6366f1",
    resumen: "Conectores, condicionales, negaciones y equivalencias.",
    teoria: [
      "Una <b>proposición</b> es una afirmación que puede ser verdadera o falsa. Se combinan con conectores: <b>¬</b> (no), <b>∧</b> (y), <b>∨</b> (o), <b>→</b> (si… entonces) y <b>↔</b> (si y solo si).",
      "El condicional <b>p → q</b> solo es falso cuando p es verdadero y q es falso. Equivale a <b>¬p ∨ q</b>.",
      "La <b>contrapositiva</b> de p → q es ¬q → ¬p y es equivalente. La <b>recíproca</b> (q → p) y la <b>inversa</b> (¬p → ¬q) NO lo son.",
      "<b>Leyes de De Morgan</b>: ¬(p ∧ q) ≡ ¬p ∨ ¬q, y ¬(p ∨ q) ≡ ¬p ∧ ¬q.",
      "“p solo si q” significa p → q (q es condición <b>necesaria</b>). “p si q” significa q → p (q es condición <b>suficiente</b>)."
    ]
  },
  {
    id: "cond",
    nombre: "Razonamiento condicional",
    emoji: "⇒",
    color: "#8b5cf6",
    resumen: "Modus ponens, modus tollens y las falacias formales más comunes.",
    teoria: [
      "<b>Modus ponens</b> (válido): si p → q y p, entonces q.",
      "<b>Modus tollens</b> (válido): si p → q y ¬q, entonces ¬p.",
      "<b>Afirmar el consecuente</b> (inválido): de p → q y q NO se sigue p.",
      "<b>Negar el antecedente</b> (inválido): de p → q y ¬p NO se sigue ¬q.",
      "Un argumento es <b>válido</b> si es imposible que las premisas sean verdaderas y la conclusión falsa. Es <b>sólido</b> si además sus premisas son verdaderas. Validez no es lo mismo que verdad.",
      "Para poner a prueba una regla “si p entonces q”, busca los casos que podrían falsarla: los que tienen p y los que tienen ¬q."
    ]
  },
  {
    id: "silo",
    nombre: "Silogismos y deducción",
    emoji: "⊂",
    color: "#a855f7",
    resumen: "Todos, algunos, ninguno: cuándo una conclusión se sigue de verdad.",
    teoria: [
      "Un silogismo une dos premisas con un término medio. Ej.: Todos los A son B; todos los B son C ⇒ todos los A son C.",
      "“Algunos A son B” + “algunos B son C” NO permite concluir nada sobre A y C.",
      "“Todos los A son B” NO implica “todos los B son A”. En cambio, “ningún A es B” sí equivale a “ningún B es A”.",
      "<b>Sesgo de creencia</b>: tendemos a aceptar argumentos inválidos si la conclusión nos parece creíble. Evalúa la forma, no si te gusta la conclusión.",
      "Dibujar diagramas de Venn o reemplazar los términos por letras ayuda a ver la estructura."
    ]
  },
  {
    id: "mat",
    nombre: "Lógica matemática y conjuntos",
    emoji: "∀",
    color: "#0ea5e9",
    resumen: "Cuantificadores, conjuntos, tablas de verdad y métodos de demostración.",
    teoria: [
      "<b>∀</b> significa “para todo” y <b>∃</b> “existe al menos uno”. La negación invierte el cuantificador: ¬∀x P(x) ≡ ∃x ¬P(x), y ¬∃x P(x) ≡ ∀x ¬P(x).",
      "El orden importa: ∀x ∃y (y > x) dice que todo número tiene uno mayor; ∃y ∀x (y > x) dice que hay un número mayor que todos.",
      "Una tabla de verdad con n variables tiene 2ⁿ filas. Un conjunto de n elementos tiene 2ⁿ subconjuntos.",
      "Principio de inclusión-exclusión: |A ∪ B| = |A| + |B| − |A ∩ B|.",
      "Métodos de demostración: directa, por <b>contrapositiva</b>, por <b>contradicción</b> (suponer lo contrario y llegar a un absurdo) e <b>inducción</b>. Un solo <b>contraejemplo</b> basta para refutar una afirmación universal."
    ]
  },
  {
    id: "num",
    nombre: "Razonamiento numérico",
    emoji: "%",
    color: "#14b8a6",
    resumen: "Porcentajes, proporciones, promedios y crecimiento exponencial.",
    teoria: [
      "Los porcentajes se aplican sobre bases distintas: subir 20% y bajar 20% no te deja igual (1,2 × 0,8 = 0,96).",
      "Distingue <b>puntos porcentuales</b> (de 10% a 12% = +2 pp) de cambio <b>relativo</b> (+20%).",
      "Riesgo relativo vs. absoluto: “reduce el riesgo a la mitad” puede significar pasar de 2 a 1 caso por cada 1.000.",
      "El promedio de velocidades en tramos iguales es la <b>media armónica</b>, no la aritmética.",
      "Crecimiento exponencial: lo que se duplica crece mucho más rápido de lo que intuimos. Regla del 72: algo que crece r% al año se duplica en ≈ 72/r años."
    ]
  },
  {
    id: "prob",
    nombre: "Probabilidad y Bayes",
    emoji: "⚄",
    color: "#22c55e",
    resumen: "Tasas base, probabilidad condicional y las trampas de la intuición.",
    teoria: [
      "La <b>tasa base</b> (qué tan común es algo) es fundamental. Ignorarla es uno de los errores más frecuentes.",
      "P(A|B) no es lo mismo que P(B|A). Que la mayoría de los enfermos dé positivo no significa que la mayoría de los positivos esté enferma.",
      "Truco con evidencia sólida: traduce porcentajes a <b>frecuencias naturales</b> (“de cada 1.000 personas…”). Mejora mucho el razonamiento bayesiano.",
      "Eventos independientes no tienen memoria: tras 5 caras, la siguiente sigue siendo 50% (<b>falacia del jugador</b>).",
      "P(A y B) nunca puede ser mayor que P(A) (<b>falacia de la conjunción</b>)."
    ]
  },
  {
    id: "est",
    nombre: "Estadística y causalidad",
    emoji: "📊",
    color: "#eab308",
    resumen: "Correlación, confusores, sesgos de muestra y cómo leer evidencia.",
    teoria: [
      "<b>Correlación no implica causalidad</b>: puede haber una <b>variable de confusión</b>, <b>causalidad inversa</b> o simple azar.",
      "<b>Regresión a la media</b>: tras un resultado extremo, el siguiente tiende a ser más normal, aunque nadie haga nada.",
      "<b>Sesgo de selección y de supervivencia</b>: si solo observas a quienes “pasaron un filtro”, tus conclusiones se distorsionan.",
      "Los <b>ensayos controlados aleatorizados</b> asignan al azar para equilibrar confusores; el doble ciego evita el efecto de las expectativas.",
      "Un valor p no es la probabilidad de que la hipótesis sea cierta. Muestras pequeñas producen resultados extremos con más frecuencia."
    ]
  },
  {
    id: "fal",
    nombre: "Falacias informales",
    emoji: "⚠",
    color: "#f97316",
    resumen: "Reconoce los trucos retóricos que se hacen pasar por argumentos.",
    teoria: [
      "<b>Ad hominem</b>: atacar a la persona en vez del argumento. <b>Tu quoque</b>: “tú también lo haces”.",
      "<b>Hombre de paja</b>: deformar la postura del otro para refutarla con facilidad.",
      "<b>Falso dilema</b>: presentar solo dos opciones cuando hay más. <b>Pendiente resbaladiza</b>: suponer una cadena de consecuencias sin justificarla.",
      "<b>Ad populum</b> (“todos lo hacen”), <b>falsa autoridad</b> (experto en otro tema), <b>apelación a la naturaleza</b> y <b>apelación a la ignorancia</b>.",
      "<b>Post hoc</b>: “ocurrió después, luego fue causado por”. <b>Petición de principio</b>: la conclusión ya está en las premisas.",
      "Ojo: apelar al consenso de expertos en su área, con evidencia, NO es una falacia."
    ]
  },
  {
    id: "ses",
    nombre: "Sesgos y pensamiento reflexivo",
    emoji: "🧠",
    color: "#ef4444",
    resumen: "Detecta cuándo tu intuición te engaña y aprende a frenarla.",
    teoria: [
      "Tenemos un pensamiento rápido e intuitivo y otro lento y deliberado. Muchos errores ocurren cuando la respuesta intuitiva “se siente” correcta y no la revisamos.",
      "Estrategia útil: antes de responder, pregúntate <b>“¿cómo podría estar equivocado?”</b> (considerar lo contrario).",
      "<b>Anclaje</b>: un número inicial influye en nuestras estimaciones. <b>Disponibilidad</b>: juzgamos la frecuencia por lo fácil que es recordar ejemplos.",
      "<b>Sesgo de confirmación</b>: buscar solo lo que confirma lo que ya creemos. <b>Encuadre</b>: la misma información, presentada distinto, cambia decisiones.",
      "<b>Costo hundido</b>: lo ya gastado no debería pesar en decisiones futuras. <b>Sesgo retrospectivo</b>: “yo sabía que pasaría”."
    ]
  },
  {
    id: "arg",
    nombre: "Análisis de argumentos",
    emoji: "⚖",
    color: "#ec4899",
    resumen: "Premisas, supuestos, fortalecer, debilitar y evaluar fuentes.",
    teoria: [
      "Un argumento tiene <b>premisas</b> (razones) y una <b>conclusión</b>. Palabras como “porque”, “ya que” o “puesto que” introducen premisas; “por lo tanto” o “así que”, conclusiones.",
      "Busca los <b>supuestos implícitos</b>: lo que el argumento necesita para funcionar pero no dice.",
      "Para <b>debilitar</b> una conclusión causal, busca explicaciones alternativas; para <b>fortalecerla</b>, descártalas (grupos de control, aleatorización).",
      "<b>Deducción</b>: la conclusión se sigue con certeza. <b>Inducción</b>: la conclusión es probable a partir de casos.",
      "Principio de caridad: evalúa la mejor versión del argumento contrario. La <b>carga de la prueba</b> está en quien afirma."
    ]
  },
  {
    id: "pat",
    nombre: "Patrones y razonamiento abstracto",
    emoji: "◆",
    color: "#64748b",
    resumen: "Series, analogías, códigos y problemas de estructura.",
    teoria: [
      "En una serie, prueba primero las diferencias entre términos; si no hay patrón, prueba cocientes o diferencias de las diferencias.",
      "Series clásicas: cuadrados (1, 4, 9…), primos (2, 3, 5, 7…), Fibonacci (cada término es la suma de los dos anteriores) y factoriales (1, 2, 6, 24…).",
      "Las series alternadas combinan dos operaciones (por ejemplo, ×2 y −2).",
      "En analogías, identifica la relación exacta (función, parte-todo, causa-efecto) antes de mirar las opciones.",
      "Para problemas de calendario o ciclos usa el resto de la división (aritmética modular)."
    ]
  }
];
