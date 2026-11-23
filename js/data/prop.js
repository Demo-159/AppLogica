LOGICA.add("prop", [
  {
    id: "prop-01", d: 1,
    q: "“Si llueve, el suelo está mojado.” ¿Cuál es su contrapositiva?",
    o: ["Si el suelo no está mojado, no llueve.", "Si el suelo está mojado, llueve.", "Si no llueve, el suelo no está mojado.", "Llueve y el suelo no está mojado."],
    a: 0,
    e: "La contrapositiva de p → q es ¬q → ¬p, y es equivalente al original. “Si está mojado, llueve” es la recíproca y “si no llueve, no está mojado” es la inversa; ninguna de las dos es equivalente (el suelo podría mojarse por un riego)."
  },
  {
    id: "prop-02", d: 2,
    q: "¿Cuál es la negación de “Si estudio, apruebo”?",
    o: ["Estudio y no apruebo.", "Si no estudio, no apruebo.", "Si estudio, no apruebo.", "No estudio y no apruebo."],
    a: 0,
    e: "p → q solo es falso cuando p es verdadero y q es falso. Por eso ¬(p → q) ≡ p ∧ ¬q: “estudio y no apruebo”. La negación de un condicional no es otro condicional."
  },
  {
    id: "prop-03", d: 1,
    q: "¿Cuál es la negación de “Juan es alto y rubio”?",
    o: ["Juan no es alto o no es rubio.", "Juan no es alto y no es rubio.", "Juan es bajo y moreno.", "Juan es alto pero no rubio."],
    a: 0,
    e: "Ley de De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q. Basta que falle una de las dos características para que la afirmación sea falsa."
  },
  {
    id: "prop-04", d: 1,
    q: "¿Cuál es la negación de “Ana va al cine o al teatro”?",
    o: ["Ana no va al cine y no va al teatro.", "Ana no va al cine o no va al teatro.", "Ana va al cine y al teatro.", "Ana va solo al teatro."],
    a: 0,
    e: "Ley de De Morgan: ¬(p ∨ q) ≡ ¬p ∧ ¬q. Para que “va a uno u otro” sea falso, no debe ir a ninguno."
  },
  {
    id: "prop-05", d: 1,
    q: "¿En qué caso es FALSO el condicional p → q?",
    o: ["Cuando p es verdadero y q es falso.", "Cuando p es falso y q es verdadero.", "Cuando p y q son falsos.", "Cuando p y q son verdaderos."],
    a: 0,
    e: "Un condicional es una promesa: “si p, entonces q”. Solo se rompe cuando se cumple p y no se cumple q. Si p es falso, el condicional es verdadero sin importar q."
  },
  {
    id: "prop-06", d: 2,
    q: "“Puedes entrar solo si tienes entrada.” ¿Qué afirmación es equivalente?",
    o: ["Si entras, entonces tienes entrada.", "Si tienes entrada, entonces entras.", "Si no entras, no tienes entrada.", "Tener entrada garantiza que entres."],
    a: 0,
    e: "“p solo si q” se traduce como p → q. Tener entrada es condición necesaria, no suficiente: quien entró tiene entrada, pero tener entrada no garantiza entrar."
  },
  {
    id: "prop-07", d: 2,
    q: "“Ser mayor de 18 años es condición necesaria para votar.” ¿Qué se deduce?",
    o: ["Si alguien vota, es mayor de 18.", "Si alguien es mayor de 18, vota.", "Si alguien no vota, es menor de 18.", "Todos los mayores de 18 pueden votar."],
    a: 0,
    e: "“q es necesaria para p” significa p → q: votar → mayor de 18. Una condición necesaria debe cumplirse, pero no basta por sí sola."
  },
  {
    id: "prop-08", d: 1,
    q: "¿Cuándo es verdadero el bicondicional p ↔ q?",
    o: ["Cuando p y q tienen el mismo valor de verdad.", "Solo cuando ambos son verdaderos.", "Cuando al menos uno es verdadero.", "Cuando tienen valores distintos."],
    a: 0,
    e: "p ↔ q (“si y solo si”) afirma que p y q van juntos: es verdadero si ambos son verdaderos o ambos son falsos."
  },
  {
    id: "prop-09", d: 1,
    q: "Sabemos que “p ∨ q” es verdadero y que p es falso. ¿Qué podemos concluir?",
    o: ["q es verdadero.", "q es falso.", "Nada sobre q.", "p ∨ q es una contradicción."],
    a: 0,
    e: "Es el silogismo disyuntivo: si al menos una es verdadera y descartamos una, la otra debe serlo. “Está en la cocina o en el living; no está en la cocina; está en el living.”"
  },
  {
    id: "prop-10", d: 2,
    q: "¿Cuál de estas fórmulas es una tautología (siempre verdadera)?",
    o: ["p ∨ ¬p", "p ∧ ¬p", "p → ¬p", "p ↔ ¬p"],
    a: 0,
    e: "p ∨ ¬p (“llueve o no llueve”) es verdadera en todas las filas de su tabla de verdad. p ∧ ¬p es una contradicción (siempre falsa)."
  },
  {
    id: "prop-11", d: 2,
    q: "“A menos que estudies, reprobarás.” ¿Qué afirmación es equivalente?",
    o: ["Si no estudias, reprobarás.", "Si estudias, aprobarás.", "Si repruebas, es porque no estudiaste y nada más.", "Estudiar garantiza aprobar."],
    a: 0,
    e: "“A menos que p, q” equivale a “si no p, entonces q”. Ojo: no dice que estudiar garantice aprobar; eso sería añadir información."
  },
  {
    id: "prop-12", d: 2,
    q: "¿A cuál de estas fórmulas equivale p → q?",
    o: ["¬p ∨ q", "p ∨ ¬q", "¬p ∧ q", "q → p"],
    a: 0,
    e: "p → q es falso solo si p es verdadero y q falso, exactamente igual que ¬p ∨ q. Esta equivalencia permite transformar condicionales en disyunciones."
  },
  {
    id: "prop-13", d: 3,
    q: "En una isla, los caballeros siempre dicen la verdad y los bribones siempre mienten. A dice: “B y yo somos bribones”. ¿Qué son A y B?",
    o: ["A es bribón y B es caballero.", "Ambos son bribones.", "A es caballero y B es bribón.", "Ambos son caballeros."],
    a: 0,
    e: "Si A fuera caballero, diría la verdad y sería bribón: contradicción. Entonces A es bribón y su frase es falsa, así que NO son ambos bribones: B es caballero."
  },
  {
    id: "prop-14", d: 3,
    q: "Si “p → q” es verdadero y “q → r” es falso, ¿qué sabemos con certeza?",
    o: ["q es verdadero y r es falso; p puede ser cualquiera.", "p es falso.", "p es verdadero y r es falso.", "q es falso."],
    a: 0,
    e: "Un condicional solo es falso con antecedente verdadero y consecuente falso, así que q es verdadero y r es falso. Con q verdadero, p → q es verdadero sea cual sea p, por lo que no sabemos nada de p."
  }
]);
