LOGICA.add("num", [
  {
    id: "num-01", d: 1,
    q: "Un producto sube 20% y después baja 20%. Respecto del precio original, ¿cómo queda?",
    o: ["4% más barato", "Igual", "4% más caro", "2% más barato"],
    a: 0,
    e: "1,20 × 0,80 = 0,96. El descuento de 20% se aplica sobre un precio ya aumentado, así que se pierde más de lo que se ganó."
  },
  {
    id: "num-02", d: 2,
    q: "Una hoja de 0,1 mm de grosor se dobla por la mitad 10 veces (en teoría). ¿Qué grosor alcanza aproximadamente?",
    o: ["10 cm", "1 mm", "1 cm", "10 metros"],
    a: 0,
    e: "Cada doblez duplica el grosor: 0,1 mm × 2¹⁰ = 0,1 × 1.024 ≈ 102 mm ≈ 10 cm. Con 42 dobleces llegaría a la Luna: la intuición falla con el crecimiento exponencial."
  },
  {
    id: "num-03", d: 2,
    q: "La tasa de desempleo pasa de 10% a 12%. ¿Qué descripción es correcta?",
    o: ["Subió 2 puntos porcentuales, un 20% relativo.", "Subió 2%.", "Subió 12%.", "Subió 20 puntos porcentuales."],
    a: 0,
    e: "La diferencia absoluta es de 2 puntos porcentuales (12 − 10). El cambio relativo es 2/10 = 20%. Los medios a veces eligen la cifra que suena más impactante."
  },
  {
    id: "num-04", d: 3,
    q: "Un medicamento reduce el riesgo de un infarto de 2 de cada 1.000 personas a 1 de cada 1.000. Se anuncia: “¡reduce el riesgo un 50%!”. ¿Cuál es la reducción absoluta del riesgo?",
    o: ["0,1 puntos porcentuales (1 de cada 1.000)", "50%", "1%", "2%"],
    a: 0,
    e: "La reducción relativa es 50%, pero la absoluta es de 0,2% a 0,1%: hay que tratar a 1.000 personas para evitar un infarto. Pide siempre las cifras absolutas."
  },
  {
    id: "num-05", d: 3,
    q: "Un auto va de A a B a 60 km/h y vuelve por el mismo camino a 40 km/h. ¿Cuál fue su velocidad media en todo el viaje?",
    o: ["48 km/h", "50 km/h", "45 km/h", "52 km/h"],
    a: 0,
    e: "Si cada tramo mide 120 km: ida 2 h, vuelta 3 h. Total 240 km en 5 h = 48 km/h. Pasa más tiempo a velocidad baja, por eso la media es menor que 50."
  },
  {
    id: "num-06", d: 1,
    q: "Inviertes $1.000 al 10% anual de interés compuesto. ¿Cuánto tienes después de 2 años?",
    o: ["$1.210", "$1.200", "$1.100", "$1.020"],
    a: 0,
    e: "Año 1: 1.000 × 1,1 = 1.100. Año 2: 1.100 × 1,1 = 1.210. El interés del segundo año se calcula sobre el interés ya ganado."
  },
  {
    id: "num-07", d: 2,
    q: "Según la regla del 72, ¿en cuánto tiempo se duplica algo que crece un 6% anual?",
    o: ["Unos 12 años", "Unos 6 años", "Unos 17 años", "Unos 36 años"],
    a: 0,
    e: "72 / 6 = 12 años. Es una aproximación muy útil para estimar mentalmente el crecimiento compuesto (de inversiones, deudas, poblaciones o inflación)."
  },
  {
    id: "num-08", d: 1,
    q: "3 personas construyen un muro en 6 días. ¿Cuánto tardarían 6 personas trabajando al mismo ritmo?",
    o: ["3 días", "12 días", "6 días", "2 días"],
    a: 0,
    e: "Proporción inversa: el trabajo total es 3 × 6 = 18 días-persona. Con 6 personas: 18 / 6 = 3 días."
  },
  {
    id: "num-09", d: 2,
    q: "En un barrio, 9 personas ganan $800.000 al mes y una gana $50.000.000. ¿Qué medida representa mejor el ingreso típico?",
    o: ["La mediana", "La media aritmética", "El máximo", "La suma"],
    a: 0,
    e: "La media es (9 × 0,8 + 50) / 10 ≈ $5,7 millones, que no describe a nadie. La mediana ($800.000) no se ve afectada por los valores extremos."
  },
  {
    id: "num-10", d: 1,
    q: "Una oferta dice “lleve 3, pague 2”. ¿A qué descuento equivale por unidad?",
    o: ["≈ 33%", "50%", "66%", "25%"],
    a: 0,
    e: "Pagas 2 de 3 unidades: ahorras 1/3 ≈ 33,3%. Útil para comparar con ofertas tipo “segunda unidad al 50%”, que equivalen a un 25%."
  },
  {
    id: "num-11", d: 2,
    q: "Tras un descuento del 25% pagas $600. ¿Cuál era el precio original?",
    o: ["$800", "$750", "$825", "$900"],
    a: 0,
    e: "Pagaste el 75% del precio: 600 / 0,75 = 800. El error típico es sumar el 25% de 600 ($750), pero el descuento se calculó sobre el precio original, no sobre el final."
  },
  {
    id: "num-12", d: 3,
    q: "Una prueba tiene 20 preguntas de 4 opciones. Si alguien responde todas al azar, ¿cuántas acertará en promedio?",
    o: ["5", "4", "10", "2"],
    a: 0,
    e: "Valor esperado: 20 × 1/4 = 5. Por eso muchas pruebas descuentan puntos por respuesta errónea: para que adivinar no compense."
  },
  {
    id: "num-13", d: 2,
    q: "Una población de bacterias se duplica cada hora. Si a las 10:00 llena el frasco, ¿a qué hora llenaba un cuarto del frasco?",
    o: ["8:00", "7:30", "5:00", "9:00"],
    a: 0,
    e: "Retrocede: a las 9:00 llenaba la mitad y a las 8:00 un cuarto. En el crecimiento exponencial, casi todo ocurre al final."
  }
]);
