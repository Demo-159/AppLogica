LOGICA.add("cond", [
  {
    id: "cond-01", d: 1,
    q: "“Si el motor se recalienta, se enciende la luz roja. El motor se recalentó.” ¿Qué se concluye?",
    o: ["La luz roja se encendió.", "La luz roja no se encendió.", "El motor no se recalentó.", "No se puede concluir nada."],
    a: 0,
    e: "Modus ponens: de p → q y p se sigue q. Es la forma de deducción más básica y siempre es válida."
  },
  {
    id: "cond-02", d: 1,
    q: "“Si es un perro, es un mamífero. Rex no es un mamífero.” ¿Qué se concluye?",
    o: ["Rex no es un perro.", "Rex es un perro.", "Rex es un gato.", "No se puede concluir nada."],
    a: 0,
    e: "Modus tollens: de p → q y ¬q se sigue ¬p. Si fuera perro, sería mamífero; como no lo es, no puede ser perro."
  },
  {
    id: "cond-03", d: 1,
    q: "“Si hay fuego, hay humo. Hay humo. Por lo tanto, hay fuego.” ¿Es válido este razonamiento?",
    o: ["No: es la falacia de afirmar el consecuente.", "Sí: es modus ponens.", "Sí: es modus tollens.", "No: es la falacia de negar el antecedente."],
    a: 0,
    e: "De p → q y q no se sigue p. El humo podría venir de otra fuente (una máquina de humo, vapor). El razonamiento puede acertar a veces, pero no es válido."
  },
  {
    id: "cond-04", d: 2,
    q: "“Si estudias medicina, sabes biología. No estudias medicina. Por lo tanto, no sabes biología.” ¿Qué error hay?",
    o: ["Negar el antecedente.", "Afirmar el consecuente.", "Ninguno: es válido.", "Ad hominem."],
    a: 0,
    e: "De p → q y ¬p no se sigue ¬q. Se puede saber biología por muchos otros caminos (ser biólogo, profesor, autodidacta)."
  },
  {
    id: "cond-05", d: 3,
    q: "Cada carta tiene una letra en una cara y un número en la otra. Ves: A, K, 4, 7. Regla: “Si una carta tiene vocal, la otra cara tiene un número par”. ¿Qué cartas debes dar vuelta, como mínimo, para comprobar la regla?",
    o: ["A y 7", "A y 4", "Solo A", "A, 4 y 7"],
    a: 0,
    e: "Tarea de selección de Wason. Debes revisar p (la A) y ¬q (el 7, impar): si el 7 tuviera vocal detrás, la regla sería falsa. El 4 no sirve: la regla no dice nada sobre lo que hay detrás de los pares. Menos del 10% de las personas acierta al primer intento."
  },
  {
    id: "cond-06", d: 2,
    q: "En un bar rige la regla “Si alguien bebe alcohol, debe ser mayor de 18”. ¿A quiénes debes revisar? (1) bebe cerveza, (2) bebe jugo, (3) tiene 25 años, (4) tiene 16 años.",
    o: ["A quien bebe cerveza y a quien tiene 16.", "A quien bebe cerveza y a quien tiene 25.", "Solo a quien bebe cerveza.", "A todos."],
    a: 0,
    e: "Es la misma estructura lógica que la tarea de Wason con letras, pero en contexto social casi todos aciertan. Revisa p (bebe alcohol) y ¬q (menor de 18). Reconocer la estructura te permite transferirla a problemas abstractos."
  },
  {
    id: "cond-07", d: 1,
    q: "Si A → B y B → C, ¿qué se puede concluir?",
    o: ["A → C", "C → A", "B → A", "A ∧ C"],
    a: 0,
    e: "Silogismo hipotético (transitividad): las implicaciones se encadenan. Si A, entonces B; y si B, entonces C; por lo tanto, si A, entonces C."
  },
  {
    id: "cond-08", d: 1,
    q: "“Si llueve, llevo paraguas. Hoy llevo paraguas.” ¿Qué sabemos sobre si llueve?",
    o: ["No podemos saberlo.", "Llueve.", "No llueve.", "Va a llover."],
    a: 0,
    e: "Concluir que llueve sería afirmar el consecuente. Podrías llevar paraguas por el sol o porque lo olvidaste en la mochila."
  },
  {
    id: "cond-09", d: 2,
    q: "“Si apruebo, viajo. Si repruebo, trabajo. Aprobaré o reprobaré.” ¿Qué se concluye?",
    o: ["Viajaré o trabajaré.", "Viajaré y trabajaré.", "Viajaré.", "No se puede concluir nada."],
    a: 0,
    e: "Dilema constructivo: de (p → q), (r → s) y (p ∨ r) se sigue (q ∨ s)."
  },
  {
    id: "cond-10", d: 2,
    q: "“Todo el que aprobó el examen estudió. Pedro estudió.” ¿Aprobó Pedro?",
    o: ["No se puede saber.", "Sí.", "No.", "Sí, si estudió lo suficiente."],
    a: 0,
    e: "La premisa dice aprobar → estudió, no al revés. Que Pedro estudiara es compatible con aprobar y con reprobar (afirmar el consecuente)."
  },
  {
    id: "cond-11", d: 2,
    q: "“Si algo es una planta, necesita agua. Las rosas necesitan agua. Por lo tanto, las rosas son plantas.” ¿Cómo evalúas el argumento?",
    o: ["Inválido, aunque la conclusión sea verdadera.", "Válido, porque la conclusión es verdadera.", "Válido y sólido.", "Inválido porque una premisa es falsa."],
    a: 0,
    e: "Afirma el consecuente: los animales también necesitan agua. La conclusión es verdadera por otras razones, pero no se sigue de las premisas. Que una conclusión nos parezca creíble no hace válido el argumento (sesgo de creencia)."
  },
  {
    id: "cond-12", d: 2,
    q: "¿Qué significa que un argumento sea VÁLIDO?",
    o: ["Que es imposible que las premisas sean verdaderas y la conclusión falsa.", "Que sus premisas son verdaderas.", "Que su conclusión es verdadera.", "Que lo acepta la mayoría de los expertos."],
    a: 0,
    e: "La validez depende solo de la forma. Un argumento válido puede tener premisas falsas (“todos los peces vuelan; Nemo es un pez; Nemo vuela”). Si además las premisas son verdaderas, el argumento es sólido."
  },
  {
    id: "cond-13", d: 3,
    q: "“Si el sospechoso estuvo en la escena, hay huellas. Si hay huellas, el laboratorio las detecta. El laboratorio no detectó huellas.” ¿Qué se concluye?",
    o: ["El sospechoso no estuvo en la escena.", "El sospechoso estuvo en la escena.", "Hay huellas, pero no se detectaron.", "No se puede concluir nada."],
    a: 0,
    e: "Se encadenan: escena → huellas → detección. Por modus tollens, si no hubo detección no hubo huellas, y si no hubo huellas el sospechoso no estuvo. (En la vida real conviene revisar si las premisas son verdaderas: ¿siempre deja huellas?)"
  }
]);
