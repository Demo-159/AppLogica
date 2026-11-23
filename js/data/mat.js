LOGICA.add("mat", [
  {
    id: "mat-01", d: 1,
    q: "¿Cuál es la negación de “Todos los cisnes son blancos”?",
    o: ["Existe al menos un cisne que no es blanco.", "Ningún cisne es blanco.", "Todos los cisnes son negros.", "Algunos cisnes son blancos."],
    a: 0,
    e: "¬∀x P(x) ≡ ∃x ¬P(x). Para refutar una afirmación universal basta un contraejemplo; no hace falta que todos sean de otro color."
  },
  {
    id: "mat-02", d: 2,
    q: "¿Cuál es la negación de “Existe un número primo que es par”?",
    o: ["Ningún número primo es par.", "Existe un número primo que es impar.", "Todos los números pares son primos.", "Algunos números primos no son pares."],
    a: 0,
    e: "¬∃x P(x) ≡ ∀x ¬P(x): “todo primo es no-par”, es decir, ningún primo es par. (La afirmación original es verdadera, porque 2 es primo y par, así que su negación es falsa.)"
  },
  {
    id: "mat-03", d: 1,
    q: "Si A = {1, 2, 3, 4} y B = {3, 4, 5}, ¿cuánto es A ∩ B?",
    o: ["{3, 4}", "{1, 2, 3, 4, 5}", "{1, 2}", "{5}"],
    a: 0,
    e: "La intersección contiene los elementos que están en ambos conjuntos a la vez: 3 y 4. {1, 2, 3, 4, 5} sería la unión."
  },
  {
    id: "mat-04", d: 2,
    q: "En un curso de 30 alumnos, 18 juegan fútbol, 15 juegan básquetbol y 8 juegan ambos. ¿Cuántos no juegan ninguno?",
    o: ["5", "0", "3", "13"],
    a: 0,
    e: "Inclusión-exclusión: |F ∪ B| = 18 + 15 − 8 = 25. Si sumas 18 + 15 cuentas dos veces a los 8 que juegan ambos. 30 − 25 = 5."
  },
  {
    id: "mat-05", d: 1,
    q: "¿Cuántas filas tiene la tabla de verdad de una fórmula con 4 variables?",
    o: ["16", "8", "4", "32"],
    a: 0,
    e: "Cada variable puede ser V o F, así que hay 2 × 2 × 2 × 2 = 2⁴ = 16 combinaciones."
  },
  {
    id: "mat-06", d: 1,
    q: "¿Cuál es un contraejemplo de “Todo número primo es impar”?",
    o: ["2", "9", "1", "15"],
    a: 0,
    e: "2 es primo (solo es divisible por 1 y por sí mismo) y es par. 9 y 15 son impares, pero no son primos, y 1 no es primo por definición."
  },
  {
    id: "mat-07", d: 2,
    q: "Para demostrar por contradicción que √2 es irracional, ¿qué se supone al principio?",
    o: ["Que √2 es racional.", "Que √2 es irracional.", "Que √2 es entero.", "Que 2 es un cuadrado perfecto."],
    a: 0,
    e: "En una demostración por contradicción se supone lo contrario de lo que se quiere probar y se deduce un absurdo. Aquí, suponer √2 = a/b en su forma irreducible lleva a que a y b son ambos pares."
  },
  {
    id: "mat-08", d: 2,
    q: "Se demuestra que P(1) es verdadero y que, para todo n, P(n) implica P(n+1). ¿Qué se concluye?",
    o: ["P(n) es verdadero para todo n ≥ 1.", "Solo P(1) y P(2) son verdaderos.", "P(n) es verdadero para algunos n.", "Nada, falta probar P(2)."],
    a: 0,
    e: "Es el principio de inducción matemática, como una fila de dominós: el primero cae, y cada uno hace caer al siguiente."
  },
  {
    id: "mat-09", d: 3,
    q: "En los números naturales, ¿cuál fórmula dice “existe un número mayor que todos los números”?",
    o: ["∃y ∀x (y > x)", "∀x ∃y (y > x)", "∀x ∀y (y > x)", "∃x ∃y (y > x)"],
    a: 0,
    e: "∃y ∀x: hay un mismo y que supera a todos los x (es falso: no existe un natural máximo). ∀x ∃y: para cada x hay algún y mayor (es verdadero: x + 1). El orden de los cuantificadores cambia el significado."
  },
  {
    id: "mat-10", d: 3,
    q: "En una sala no hay ningún unicornio. En la lógica clásica, ¿qué valor tiene “Todos los unicornios de esta sala son azules”?",
    o: ["Verdadero (vacuamente).", "Falso.", "Indeterminado.", "Contradictorio."],
    a: 0,
    e: "“Para todo x, si x es unicornio de la sala, x es azul”: como el antecedente nunca se cumple, el condicional es verdadero en cada caso. Se llama verdad vacua."
  },
  {
    id: "mat-11", d: 2,
    q: "¿Cuántos subconjuntos tiene el conjunto {a, b, c}?",
    o: ["8", "6", "3", "9"],
    a: 0,
    e: "Cada elemento puede estar o no estar: 2³ = 8. Incluye el conjunto vacío y el propio {a, b, c}."
  },
  {
    id: "mat-12", d: 3,
    q: "Quieres probar “si n² es par, entonces n es par”. ¿Cuál es la estrategia más simple?",
    o: ["Probar la contrapositiva: si n es impar, n² es impar.", "Probar la recíproca: si n es par, n² es par.", "Probar algunos casos: 2, 4, 6…", "Probar que n² es siempre par."],
    a: 0,
    e: "Si n = 2k + 1, entonces n² = 4k² + 4k + 1 es impar. La contrapositiva es equivalente al enunciado y es fácil de probar. Probar casos no demuestra nada, y la recíproca es otra afirmación distinta."
  },
  {
    id: "mat-13", d: 1,
    q: "Si A ⊆ B y B ⊆ A, ¿qué se concluye?",
    o: ["A = B", "A ∩ B = ∅", "A ⊂ B estrictamente", "B está vacío"],
    a: 0,
    e: "Si cada elemento de A está en B y cada elemento de B está en A, tienen exactamente los mismos elementos. Es la forma estándar de demostrar que dos conjuntos son iguales."
  },
  {
    id: "mat-14", d: 2,
    q: "En un grupo de 13 personas, ¿qué podemos asegurar?",
    o: ["Al menos dos nacieron el mismo mes.", "Al menos dos cumplen años el mismo día.", "Alguien nació en enero.", "Nada en particular."],
    a: 0,
    e: "Principio del palomar: si repartes 13 personas en 12 meses, al menos un mes tiene dos personas. Es un argumento de existencia sin necesidad de saber quiénes son."
  }
]);
