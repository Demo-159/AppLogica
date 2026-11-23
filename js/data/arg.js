LOGICA.add("arg", [
  {
    id: "arg-01", d: 1,
    q: "“Deberíamos llevar paraguas, ya que el pronóstico anuncia lluvia y el cielo está muy nublado.” ¿Cuál es la conclusión?",
    o: ["Deberíamos llevar paraguas.", "El pronóstico anuncia lluvia.", "El cielo está muy nublado.", "Va a llover."],
    a: 0,
    e: "“Ya que” introduce las premisas (el pronóstico y el cielo). La conclusión es lo que se intenta justificar: llevar paraguas."
  },
  {
    id: "arg-02", d: 2,
    q: "“Marta es abogada, así que debe tener mucho dinero.” ¿Qué supuesto implícito necesita este argumento?",
    o: ["Que los abogados (casi siempre) tienen mucho dinero.", "Que Marta trabaja mucho.", "Que el dinero importa.", "Que Marta estudió en la universidad."],
    a: 0,
    e: "Para pasar de “es abogada” a “tiene dinero” se necesita un puente no declarado. Hacer explícitos los supuestos permite ver si son razonables."
  },
  {
    id: "arg-03", d: 2,
    q: "“Las ventas subieron 15% después de la campaña publicitaria, así que la campaña funcionó.” ¿Qué dato DEBILITA más esta conclusión?",
    o: ["En las ciudades sin campaña las ventas también subieron 15%.", "La campaña fue muy cara.", "A la gente le gustaron los anuncios.", "La campaña ganó un premio."],
    a: 0,
    e: "Si las ventas subieron igual sin la campaña, la causa probablemente es otra (temporada, economía). Ese dato funciona como un grupo de control."
  },
  {
    id: "arg-04", d: 2,
    q: "“Los estudiantes que desayunan rinden más en las pruebas; por lo tanto, desayunar mejora el rendimiento.” ¿Qué dato lo FORTALECE más?",
    o: ["En un experimento, a estudiantes elegidos al azar se les dio desayuno y rindieron más que el grupo control.", "Los estudiantes que desayunan suelen tener familias con más recursos.", "El desayuno es la comida más importante del día.", "Muchos nutricionistas recomiendan desayunar."],
    a: 0,
    e: "La aleatorización descarta explicaciones alternativas, como el nivel socioeconómico. De hecho, la segunda opción DEBILITA el argumento al sugerir un confusor."
  },
  {
    id: "arg-05", d: 1,
    q: "¿Cuál de estas expresiones suele introducir una PREMISA?",
    o: ["Puesto que", "Por lo tanto", "En consecuencia", "Así que"],
    a: 0,
    e: "“Puesto que”, “porque” y “dado que” presentan razones. “Por lo tanto”, “en consecuencia” y “así que” anuncian conclusiones."
  },
  {
    id: "arg-06", d: 2,
    q: "“Todos los cuervos observados hasta hoy son negros. Por lo tanto, el próximo cuervo que veamos será negro.” ¿Qué tipo de razonamiento es?",
    o: ["Inductivo", "Deductivo", "Circular", "Por contradicción"],
    a: 0,
    e: "Generaliza a partir de casos observados: la conclusión es probable, pero no segura. En un razonamiento deductivo válido, la conclusión se sigue con certeza."
  },
  {
    id: "arg-07", d: 2,
    q: "¿Qué propone el “principio de caridad” al analizar un argumento?",
    o: ["Interpretarlo en su versión más fuerte y razonable.", "Aceptarlo para no ofender.", "Buscar su punto más débil.", "Ignorar sus errores menores."],
    a: 0,
    e: "Si refutas la versión más débil, no has ganado nada (sería un hombre de paja). Evaluar la mejor versión del argumento contrario es más honesto y más útil."
  },
  {
    id: "arg-08", d: 2,
    q: "Quieres saber si una vacuna es segura. ¿Qué fuente es, en general, la más confiable?",
    o: ["Una revisión sistemática publicada en una revista científica con revisión por pares.", "Un video viral de un médico.", "El testimonio de un conocido.", "Una página web que vende tratamientos alternativos."],
    a: 0,
    e: "Al evaluar una fuente pregúntate: ¿quién lo dice?, ¿con qué evidencia?, ¿tiene conflictos de interés?, ¿pasó por la revisión de otros expertos?"
  },
  {
    id: "arg-09", d: 1,
    q: "Pedro afirma que tiene un dragón invisible en el garaje y te pide que demuestres que no existe. ¿Quién tiene la carga de la prueba?",
    o: ["Pedro, porque es quien afirma.", "Tú, porque dudas.", "Nadie.", "Ambos por igual."],
    a: 0,
    e: "La carga de la prueba recae en quien hace la afirmación. Exigir al otro que pruebe un negativo es una forma de apelación a la ignorancia."
  },
  {
    id: "arg-10", d: 2,
    q: "Dos explicaciones dan cuenta igual de bien de un fenómeno; una requiere 2 supuestos y otra 7. ¿Qué recomienda la navaja de Occam?",
    o: ["Preferir provisionalmente la de menos supuestos.", "Preferir la de más supuestos porque es más completa.", "Rechazar ambas.", "Elegir la más interesante."],
    a: 0,
    e: "No es una ley que garantice la verdad, sino un criterio práctico: cada supuesto extra es otra oportunidad de error. Solo se aplica si ambas explican igual de bien."
  },
  {
    id: "arg-11", d: 3,
    q: "¿Cuál de estas afirmaciones es falsable (se podría demostrar falsa con una observación)?",
    o: ["“Todos los metales se dilatan al calentarse.”", "“Existen fuerzas que nunca pueden detectarse.”", "“Todo pasa por algo.”", "“El universo tiene un propósito que no podemos conocer.”"],
    a: 0,
    e: "Basta encontrar un metal que no se dilate para refutarla. Según Popper, una afirmación que ninguna observación podría contradecir no es una hipótesis científica."
  },
  {
    id: "arg-12", d: 3,
    q: "“Toda ley tiene un legislador. La gravedad es una ley. Por lo tanto, la gravedad tiene un legislador.” ¿Cuál es el problema?",
    o: ["Usa “ley” con dos significados distintos (equívoco).", "Es una pendiente resbaladiza.", "Es una generalización apresurada.", "Ninguno: es válido."],
    a: 0,
    e: "“Ley” jurídica (una norma creada por alguien) y “ley” natural (una regularidad descrita) son conceptos diferentes. El argumento parece válido solo porque usa la misma palabra."
  },
  {
    id: "arg-13", d: 3,
    q: "“El 80% de los accidentes de tránsito involucra a conductores sobrios; por lo tanto, manejar sobrio es más peligroso.” ¿Qué dato necesitas para evaluarlo?",
    o: ["Qué porcentaje de los conductores en la vía están sobrios.", "Cuántos accidentes hay al año.", "La edad de los conductores.", "El tipo de vehículo."],
    a: 0,
    e: "Si el 98% de los conductores está sobrio, que protagonicen “solo” el 80% de los accidentes significa que los ebrios (2%) causan el 20%: un riesgo muchísimo mayor. Sin la tasa base, el dato engaña."
  },
  {
    id: "arg-14", d: 2,
    q: "“Un país es como una familia: si una familia no debe gastar más de lo que gana, el Estado tampoco.” ¿Cómo se evalúa mejor una analogía así?",
    o: ["Viendo si las semejanzas relevantes superan a las diferencias relevantes.", "Aceptándola si es fácil de entender.", "Rechazándola, porque toda analogía es una falacia.", "Viendo si la usa un experto."],
    a: 0,
    e: "Una analogía es tan buena como la semejanza en lo que importa. Aquí hay diferencias relevantes: un Estado emite moneda, cobra impuestos y no tiene “jubilación”. Eso no la hace falsa, pero obliga a justificarla."
  }
]);
