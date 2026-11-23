LOGICA.add("ses", [
  {
    id: "ses-01", d: 2,
    q: "Un bate y una pelota cuestan $1.100 en total. El bate cuesta $1.000 más que la pelota. ¿Cuánto cuesta la pelota?",
    o: ["$50", "$100", "$110", "$10"],
    a: 0,
    e: "La intuición dice $100, pero entonces el bate costaría $1.100 y el total sería $1.200. Si la pelota cuesta x: x + (x + 1.000) = 1.100 → x = 50. Es parte del Test de Reflexión Cognitiva (Frederick, 2005)."
  },
  {
    id: "ses-02", d: 2,
    q: "Si 5 máquinas fabrican 5 piezas en 5 minutos, ¿cuánto tardan 100 máquinas en fabricar 100 piezas?",
    o: ["5 minutos", "100 minutos", "20 minutos", "1 minuto"],
    a: 0,
    e: "Cada máquina hace 1 pieza en 5 minutos. 100 máquinas hacen 100 piezas en esos mismos 5 minutos. El patrón “5-5-5 → 100-100-100” engaña a la intuición."
  },
  {
    id: "ses-03", d: 2,
    q: "En un lago, una mancha de nenúfares duplica su tamaño cada día. Si tarda 48 días en cubrir todo el lago, ¿cuántos días tarda en cubrir la mitad?",
    o: ["47 días", "24 días", "36 días", "12 días"],
    a: 0,
    e: "Si se duplica cada día, el día antes de cubrirlo entero cubría la mitad. La respuesta intuitiva (24) supone crecimiento lineal."
  },
  {
    id: "ses-04", d: 2,
    q: "A un grupo le preguntan si Gandhi murió antes o después de los 140 años, y luego que estime su edad al morir. Sus estimaciones resultan más altas que las de un grupo al que le preguntaron por 9 años. ¿Qué sesgo es?",
    o: ["Anclaje", "Disponibilidad", "Costo hundido", "Sesgo retrospectivo"],
    a: 0,
    e: "Un número inicial, aunque sea absurdo, “ancla” las estimaciones posteriores. Por eso los precios de lista inflados funcionan en las negociaciones."
  },
  {
    id: "ses-05", d: 1,
    q: "Sofía cree que un político es corrupto, así que solo lee noticias que lo critican y descarta las demás como “propaganda”. ¿Qué sesgo muestra?",
    o: ["Sesgo de confirmación", "Anclaje", "Efecto de encuadre", "Error fundamental de atribución"],
    a: 0,
    e: "Buscamos, recordamos e interpretamos la información de modo que confirme lo que ya creemos. Antídoto: buscar activamente la mejor evidencia contra tu postura."
  },
  {
    id: "ses-06", d: 2,
    q: "A unos pacientes les dicen que una cirugía tiene “90% de supervivencia” y a otros “10% de mortalidad”. Los primeros la aceptan mucho más. ¿Qué sesgo es?",
    o: ["Efecto de encuadre", "Sesgo de confirmación", "Falacia del jugador", "Anclaje"],
    a: 0,
    e: "Las dos frases dan exactamente la misma información, pero el marco positivo o negativo cambia la decisión. Reformular en ambos sentidos ayuda a decidir mejor."
  },
  {
    id: "ses-07", d: 2,
    q: "Pagaste $8.000 por una entrada al cine. A los 20 minutos la película te aburre profundamente. ¿Cuál es el razonamiento más racional?",
    o: ["Decidir solo según lo que disfrutarás de ahora en adelante.", "Quedarte para no perder los $8.000.", "Quedarte hasta la mitad y decidir.", "Pedir el reembolso siempre."],
    a: 0,
    e: "Los $8.000 ya se gastaron, te quedes o no (costo hundido). La pregunta relevante es: ¿qué uso de las próximas 1,5 horas me conviene más?"
  },
  {
    id: "ses-08", d: 1,
    q: "Tras ver varias noticias de accidentes aéreos, Marcos decide viajar 800 km en auto porque “es más seguro”. ¿Qué sesgo influye?",
    o: ["Heurística de disponibilidad", "Efecto de encuadre", "Sesgo de supervivencia", "Costo hundido"],
    a: 0,
    e: "Juzgamos la probabilidad por lo fácil que es recordar ejemplos. Los accidentes aéreos son muy visibles, pero por kilómetro recorrido el auto es mucho más peligroso."
  },
  {
    id: "ses-09", d: 1,
    q: "Después de una elección, muchas personas dicen “era obvio que ganaría”, aunque antes estaban indecisas. ¿Qué sesgo es?",
    o: ["Sesgo retrospectivo", "Anclaje", "Sesgo de confirmación", "Falacia de la conjunción"],
    a: 0,
    e: "Una vez que conocemos el resultado, reescribimos nuestra memoria y lo vemos como predecible. Anotar predicciones antes de los hechos ayuda a calibrarse."
  },
  {
    id: "ses-10", d: 2,
    q: "Un conductor te adelanta bruscamente y piensas “¡qué persona más agresiva!”, sin considerar que podría ir a una emergencia. ¿Qué sesgo es?",
    o: ["Error fundamental de atribución", "Sesgo retrospectivo", "Heurística de disponibilidad", "Efecto de encuadre"],
    a: 0,
    e: "Tendemos a explicar la conducta ajena por su carácter e ignorar la situación, mientras que nuestra propia conducta la explicamos por las circunstancias."
  },
  {
    id: "ses-11", d: 2,
    q: "Juan es el 15.º más alto y también el 15.º más bajo de su curso. ¿Cuántos alumnos hay?",
    o: ["29", "30", "31", "15"],
    a: 0,
    e: "Hay 14 alumnos más altos que Juan y 14 más bajos: 14 + 14 + 1 = 29. La respuesta rápida (30) cuenta a Juan dos veces."
  },
  {
    id: "ses-12", d: 1,
    q: "Un granjero tenía 15 ovejas y se le murieron todas menos 8. ¿Cuántas le quedan?",
    o: ["8", "7", "15", "0"],
    a: 0,
    e: "“Todas menos 8” significa que sobrevivieron 8. La tendencia a restar automáticamente (15 − 8 = 7) muestra cómo una lectura rápida nos hace fallar."
  },
  {
    id: "ses-13", d: 2,
    q: "Según la investigación, ¿qué estrategia reduce mejor el exceso de confianza en tus juicios?",
    o: ["Pensar activamente en razones por las que podrías estar equivocado.", "Confiar en tu primera impresión.", "Repetirte la respuesta varias veces.", "Pedir opinión solo a quienes piensan como tú."],
    a: 0,
    e: "“Considerar lo contrario” obliga a buscar evidencia que normalmente ignoraríamos. Es una de las técnicas de reducción de sesgos con mejor respaldo empírico."
  },
  {
    id: "ses-14", d: 3,
    q: "La mayoría de las personas cree ser menos sesgada que el promedio. ¿Cómo se llama este fenómeno?",
    o: ["Punto ciego del sesgo", "Efecto de encuadre", "Sesgo de supervivencia", "Ilusión de control"],
    a: 0,
    e: "Vemos con facilidad los sesgos de los demás, pero no los nuestros. Conocer los sesgos no basta: hacen falta práctica y hábitos como la retroalimentación y pedir críticas."
  }
]);
