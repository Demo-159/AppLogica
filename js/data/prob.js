LOGICA.add("prob", [
  {
    id: "prob-01", d: 3,
    q: "El 1% de las mujeres de cierta edad tiene cáncer de mama. Una mamografía detecta el 90% de los casos, pero da positivo en el 9% de las mujeres sanas. Una mujer da positivo. ¿Cuál es la probabilidad aproximada de que tenga cáncer?",
    o: ["≈ 9%", "≈ 90%", "≈ 81%", "≈ 50%"],
    a: 0,
    e: "En frecuencias naturales, de 1.000 mujeres: 10 tienen cáncer y 9 dan positivo; de 990 sanas, unas 89 dan positivo. Hay 98 positivos y solo 9 enfermas: 9/98 ≈ 9%. En los estudios de Gigerenzer, la mayoría de los médicos respondió entre 50% y 90%."
  },
  {
    id: "prob-02", d: 1,
    q: "Una moneda justa salió cara 5 veces seguidas. ¿Cuál es la probabilidad de cara en el próximo lanzamiento?",
    o: ["50%", "Menos de 50%: ya “toca” sello", "Más de 50%: está en racha", "3%"],
    a: 0,
    e: "La moneda no tiene memoria: cada lanzamiento es independiente. Creer que “toca” sello es la falacia del jugador; creer en la racha es la de la mano caliente."
  },
  {
    id: "prob-03", d: 2,
    q: "Linda tiene 31 años, es soltera y brillante. Estudió filosofía y participó en marchas contra la discriminación. ¿Qué es más probable?",
    o: ["Linda es cajera de banco.", "Linda es cajera de banco y feminista activa.", "Las dos son igual de probables.", "No se puede comparar."],
    a: 0,
    e: "Falacia de la conjunción (Tversky y Kahneman, 1983): P(A y B) nunca supera a P(A). Todas las cajeras feministas son cajeras. La descripción “representativa” nos engaña."
  },
  {
    id: "prob-04", d: 1,
    q: "Lanzas dos dados. ¿Cuál es la probabilidad de que sumen 7?",
    o: ["1/6", "1/12", "1/36", "7/36"],
    a: 0,
    e: "Hay 36 resultados igual de probables y 6 suman 7: (1,6), (2,5), (3,4), (4,3), (5,2) y (6,1). 6/36 = 1/6. El 7 es la suma más probable."
  },
  {
    id: "prob-05", d: 2,
    q: "Lanzas una moneda dos veces. ¿Cuál es la probabilidad de obtener AL MENOS una cara?",
    o: ["3/4", "1/2", "1/4", "2/3"],
    a: 0,
    e: "Es más fácil calcular el complemento: P(ninguna cara) = 1/2 × 1/2 = 1/4. Entonces P(al menos una) = 1 − 1/4 = 3/4."
  },
  {
    id: "prob-06", d: 3,
    q: "¿Cuántas personas debe haber en una sala para que la probabilidad de que dos compartan cumpleaños supere el 50%?",
    o: ["23", "183", "365", "60"],
    a: 0,
    e: "La paradoja del cumpleaños: con 23 personas hay 253 parejas posibles, y la probabilidad ya pasa de 50%. Con 60 personas supera el 99%. Subestimamos cuántas combinaciones hay."
  },
  {
    id: "prob-07", d: 3,
    q: "Hay 3 puertas: tras una hay un auto y tras las otras, cabras. Eliges la puerta 1. El presentador, que sabe dónde está el auto, abre la puerta 3 y muestra una cabra. ¿Te conviene cambiar a la puerta 2?",
    o: ["Sí: cambiar gana con probabilidad 2/3.", "Da igual: es 50% y 50%.", "No: quedarse gana con 2/3.", "Depende de la suerte."],
    a: 0,
    e: "Problema de Monty Hall. Tu primera elección acierta con probabilidad 1/3. En el 2/3 restante el auto está en otra puerta, y el presentador te muestra cuál NO es. Cambiar gana siempre que tu elección inicial fue mala, es decir, 2 de cada 3 veces."
  },
  {
    id: "prob-08", d: 3,
    q: "En una ciudad, el 85% de los taxis son verdes y el 15% azules. Un testigo, que acierta el 80% de las veces, dice que el taxi del accidente era azul. ¿Cuál es la probabilidad de que lo fuera?",
    o: ["≈ 41%", "80%", "15%", "≈ 68%"],
    a: 0,
    e: "Azul y bien identificado: 0,15 × 0,8 = 0,12. Verde identificado como azul: 0,85 × 0,2 = 0,17. P(azul | dice azul) = 0,12 / 0,29 ≈ 41%. La tasa base pesa tanto como el testimonio."
  },
  {
    id: "prob-09", d: 1,
    q: "Lanzas una moneda y un dado. ¿Cuál es la probabilidad de sacar cara Y un 6?",
    o: ["1/12", "1/8", "2/3", "1/6"],
    a: 0,
    e: "Para eventos independientes, P(A y B) = P(A) × P(B) = 1/2 × 1/6 = 1/12."
  },
  {
    id: "prob-10", d: 2,
    q: "Un juego cuesta $1.000. Con probabilidad 1/4 recibes $3.000 y si no, nada. ¿Cuál es el valor esperado por jugada?",
    o: ["Pierdes $250", "Ganas $750", "Ganas $2.000", "Quedas igual"],
    a: 0,
    e: "Valor esperado = 1/4 × 3.000 − 1.000 = 750 − 1.000 = −250. Si juegas muchas veces, pierdes en promedio $250 por jugada. Así funcionan casinos y loterías."
  },
  {
    id: "prob-11", d: 3,
    q: "De todas las familias con exactamente dos hijos y al menos una hija, ¿qué fracción tiene dos hijas?",
    o: ["1/3", "1/2", "1/4", "2/3"],
    a: 0,
    e: "Los casos igual de probables son HH, HM, MH y MM. La condición “al menos una hija” descarta HH y deja HM, MH y MM. Solo uno de los tres casos es MM: 1/3."
  },
  {
    id: "prob-12", d: 3,
    q: "En un hospital grande nacen 45 bebés al día y en uno pequeño, 15. ¿Cuál registrará más días en que más del 60% de los nacidos son niños?",
    o: ["El hospital pequeño", "El hospital grande", "Ambos por igual", "Depende de la región"],
    a: 0,
    e: "Las muestras pequeñas varían más (ley de los grandes números). Con 15 nacimientos es mucho más fácil alejarse del 50% que con 45. La mayoría responde “igual” (Kahneman y Tversky, 1972)."
  },
  {
    id: "prob-13", d: 2,
    q: "El 90% de los conductores ebrios que causan un accidente dan positivo en el control. ¿Significa eso que el 90% de quienes dan positivo causaron un accidente?",
    o: ["No: P(positivo | causa) no es P(causa | positivo).", "Sí, son la misma probabilidad.", "Sí, si el test es preciso.", "No, sería el 10%."],
    a: 0,
    e: "Confundir P(A|B) con P(B|A) es la “falacia del fiscal”. Para invertir la probabilidad hace falta la tasa base: cuántos conductores dan positivo en total."
  }
]);
