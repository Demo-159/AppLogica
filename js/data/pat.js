LOGICA.add("pat", [
  {
    id: "pat-01", d: 1,
    q: "¿Qué número sigue? 1, 1, 2, 3, 5, 8, …",
    o: ["13", "11", "12", "16"],
    a: 0,
    e: "Sucesión de Fibonacci: cada término es la suma de los dos anteriores (5 + 8 = 13)."
  },
  {
    id: "pat-02", d: 1,
    q: "¿Qué número sigue? 3, 9, 27, 81, …",
    o: ["243", "162", "108", "324"],
    a: 0,
    e: "Cada término se multiplica por 3: 81 × 3 = 243. Si las diferencias crecen mucho, prueba con cocientes."
  },
  {
    id: "pat-03", d: 1,
    q: "¿Qué número sigue? 2, 3, 5, 7, 11, …",
    o: ["13", "12", "15", "17"],
    a: 0,
    e: "Son los números primos. 12 y 15 no son primos, y 17 viene después del 13."
  },
  {
    id: "pat-04", d: 1,
    q: "¿Qué número sigue? 1, 4, 9, 16, 25, …",
    o: ["36", "30", "35", "49"],
    a: 0,
    e: "Son los cuadrados perfectos (1², 2², 3²…). También se ve en las diferencias: 3, 5, 7, 9, 11 (los impares)."
  },
  {
    id: "pat-05", d: 1,
    q: "Libro es a leer como cuchillo es a…",
    o: ["Cortar", "Cocina", "Metal", "Tenedor"],
    a: 0,
    e: "La relación es objeto → su función. Cocina es un lugar, metal un material y tenedor un objeto relacionado, pero ninguno es su función."
  },
  {
    id: "pat-06", d: 2,
    q: "¿Qué letra sigue? A, C, F, J, …",
    o: ["O", "N", "M", "P"],
    a: 0,
    e: "Los saltos crecen: +2, +3, +4, +5. A(1), C(3), F(6), J(10) → 10 + 5 = 15 → O (en el alfabeto sin Ñ)."
  },
  {
    id: "pat-07", d: 1,
    q: "¿Qué número sigue? 64, 32, 16, 8, …",
    o: ["4", "6", "2", "0"],
    a: 0,
    e: "Cada término es la mitad del anterior (se divide por 2): 8 / 2 = 4. Es una progresión geométrica de razón 1/2."
  },
  {
    id: "pat-08", d: 2,
    q: "¿Qué número sigue? 1, 2, 6, 24, 120, …",
    o: ["720", "240", "600", "144"],
    a: 0,
    e: "Son factoriales: se multiplica por 2, 3, 4, 5 y luego por 6. 120 × 6 = 720."
  },
  {
    id: "pat-09", d: 2,
    q: "Si ROMA se codifica como SPNB, ¿cómo se codifica LUNA?",
    o: ["MVOB", "KTMZ", "MVNB", "LVOB"],
    a: 0,
    e: "Cada letra se reemplaza por la siguiente del alfabeto: R→S, O→P, M→N, A→B. Entonces L→M, U→V, N→O, A→B."
  },
  {
    id: "pat-10", d: 2,
    q: "¿Qué número sigue? 5, 10, 8, 16, 14, …",
    o: ["28", "12", "18", "30"],
    a: 0,
    e: "Serie alternada: ×2, −2, ×2, −2, ×2. 14 × 2 = 28."
  },
  {
    id: "pat-11", d: 3,
    q: "¿Qué ángulo forman las agujas de un reloj a las 3:15?",
    o: ["7,5°", "0°", "15°", "90°"],
    a: 0,
    e: "El minutero está en el 3 (90°). El horario avanzó un cuarto de hora: 30° × 1/4 = 7,5° más allá del 3, así que está en 97,5°. La diferencia es 7,5°."
  },
  {
    id: "pat-12", d: 2,
    q: "Hoy es lunes. ¿Qué día de la semana será dentro de 100 días?",
    o: ["Miércoles", "Martes", "Jueves", "Lunes"],
    a: 0,
    e: "100 = 14 × 7 + 2. Cada 7 días vuelve a ser lunes, así que solo cuenta el resto: lunes + 2 días = miércoles."
  },
  {
    id: "pat-13", d: 2,
    q: "Fila 1: 2, 4, 8. Fila 2: 3, 6, 12. Fila 3: 5, 10, ?",
    o: ["20", "15", "25", "18"],
    a: 0,
    e: "En cada fila, cada número es el doble del anterior. 10 × 2 = 20. Busca la regla que funciona en TODAS las filas, no solo en una."
  },
  {
    id: "pat-14", d: 3,
    q: "¿Qué número sigue? 2, 6, 12, 20, 30, …",
    o: ["42", "40", "36", "44"],
    a: 0,
    e: "Las diferencias son 4, 6, 8, 10, así que la siguiente es 12: 30 + 12 = 42. También es n × (n + 1): 1×2, 2×3, 3×4… 6×7 = 42."
  }
]);
