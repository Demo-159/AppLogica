LOGICA.add("silo", [
  {
    id: "silo-01", d: 1,
    q: "“Todos los A son B. Todos los B son C.” ¿Qué se sigue necesariamente?",
    o: ["Todos los A son C.", "Todos los C son A.", "Algunos C no son A.", "Ningún A es C."],
    a: 0,
    e: "Si A está dentro de B y B dentro de C, entonces A está dentro de C. No sabemos si C es más grande que A, así que no podemos afirmar nada de “todos los C”."
  },
  {
    id: "silo-02", d: 2,
    q: "“Algunos médicos son músicos. Algunos músicos son zurdos.” ¿Se sigue que algunos médicos son zurdos?",
    o: ["No necesariamente.", "Sí, necesariamente.", "No, ningún médico es zurdo.", "Sí, todos los médicos son zurdos."],
    a: 0,
    e: "Los músicos que son médicos y los músicos que son zurdos podrían ser grupos totalmente distintos. Con dos premisas particulares (“algunos”) no se puede concluir nada."
  },
  {
    id: "silo-03", d: 1,
    q: "“Ningún pez es mamífero. Todos los tiburones son peces.” ¿Qué se sigue?",
    o: ["Ningún tiburón es mamífero.", "Algunos tiburones son mamíferos.", "Ningún mamífero es pez, salvo los tiburones.", "No se puede concluir nada."],
    a: 0,
    e: "Los tiburones están dentro del conjunto de los peces, que no se cruza con el de los mamíferos. Por lo tanto ningún tiburón es mamífero."
  },
  {
    id: "silo-04", d: 2,
    q: "“Todos los gatos son animales. Algunos animales son negros.” ¿Se sigue que algunos gatos son negros?",
    o: ["No se sigue de las premisas.", "Sí, se sigue.", "No, ningún gato es negro.", "Sí, todos los gatos son negros."],
    a: 0,
    e: "Los animales negros podrían ser solo cuervos y panteras. Sabemos que existen gatos negros, pero ese conocimiento no viene de estas premisas: es el sesgo de creencia en acción."
  },
  {
    id: "silo-05", d: 2,
    q: "“Todo lo que tiene motor necesita mantención. Las bicicletas necesitan mantención. Por lo tanto, las bicicletas tienen motor.” ¿Es válido?",
    o: ["No: el término medio no conecta las premisas.", "Sí: es un silogismo correcto.", "Sí, porque algunas bicicletas tienen motor.", "No, porque la primera premisa es falsa."],
    a: 0,
    e: "Que todo lo que tiene motor necesite mantención no significa que todo lo que necesita mantención tenga motor. Es la falacia del término medio no distribuido."
  },
  {
    id: "silo-06", d: 2,
    q: "“Todos los mamíferos pueden volar. Las ballenas son mamíferos. Por lo tanto, las ballenas pueden volar.” ¿Cómo lo evalúas?",
    o: ["Válido, pero no sólido.", "Inválido.", "Válido y sólido.", "Inválido porque la conclusión es falsa."],
    a: 0,
    e: "La forma es perfecta: si las premisas fueran verdaderas, la conclusión también lo sería. Pero la primera premisa es falsa, así que el argumento no es sólido. Separar forma y contenido es una habilidad clave."
  },
  {
    id: "silo-07", d: 1,
    q: "Si “Ningún reptil es mamífero” es verdadero, ¿qué otra afirmación también lo es?",
    o: ["Ningún mamífero es reptil.", "Todos los mamíferos son reptiles.", "Algunos mamíferos son reptiles.", "Algunos reptiles son mamíferos."],
    a: 0,
    e: "Las proposiciones “ningún A es B” se pueden invertir sin perder validez: si dos conjuntos no se cruzan, da igual cuál nombres primero."
  },
  {
    id: "silo-08", d: 1,
    q: "Si “Todos los cuadrados son rectángulos” es verdadero, ¿“Todos los rectángulos son cuadrados” también lo es?",
    o: ["No necesariamente.", "Sí, siempre.", "Sí, por la conversión.", "Solo en geometría euclidiana."],
    a: 0,
    e: "“Todos los A son B” no se puede invertir. De hecho, aquí es falso: un rectángulo de 2 × 5 no es un cuadrado."
  },
  {
    id: "silo-09", d: 3,
    q: "“Algunos estudiantes no son puntuales. Todos los delegados son puntuales.” ¿Qué se sigue?",
    o: ["Algunos estudiantes no son delegados.", "Ningún estudiante es delegado.", "Algunos delegados no son estudiantes.", "No se sigue nada."],
    a: 0,
    e: "Toma a un estudiante impuntual: no puede ser delegado, porque todos los delegados son puntuales. Así que existe al menos un estudiante que no es delegado. No sabemos nada del resto."
  },
  {
    id: "silo-10", d: 1,
    q: "“Todos los médicos son profesionales. Ningún profesional de esta lista llega tarde.” Si Laura es médica de la lista, ¿qué se sigue?",
    o: ["Laura no llega tarde.", "Laura llega tarde a veces.", "No se puede saber.", "Laura no es profesional."],
    a: 0,
    e: "Laura es médica → es profesional → no llega tarde. Encadenar afirmaciones universales da conclusiones seguras."
  },
  {
    id: "silo-11", d: 2,
    q: "Ana es más alta que Beto. Beto es más alto que Carla. Dani es más baja que Carla. ¿Quién es la segunda persona más baja?",
    o: ["Carla", "Beto", "Dani", "Ana"],
    a: 0,
    e: "Ordena: Ana > Beto > Carla > Dani. La más baja es Dani y la segunda más baja es Carla. Escribir el orden en una línea evita errores de memoria."
  },
  {
    id: "silo-12", d: 3,
    q: "Si “Algunos estudiantes son deportistas” es verdadero, ¿qué sabemos de “Algunos estudiantes NO son deportistas”?",
    o: ["Que podría ser verdadero o falso.", "Que es verdadero.", "Que es falso.", "Que es una contradicción."],
    a: 0,
    e: "En lógica, “algunos” significa “al menos uno”, y es compatible con “todos”. Que algunos sean deportistas no nos dice si el resto lo es o no."
  },
  {
    id: "silo-13", d: 2,
    q: "“Todos los metales conducen electricidad. Ningún plástico conduce electricidad.” ¿Qué se sigue?",
    o: ["Ningún plástico es metal.", "Algunos plásticos son metales.", "Todos los conductores son metales.", "No se sigue nada."],
    a: 0,
    e: "Si algo fuera plástico y metal a la vez, conduciría y no conduciría electricidad: contradicción. Por lo tanto los conjuntos no se cruzan. (Con estas premisas simplificadas; en la realidad hay plásticos conductores, lo que haría falsa la segunda premisa.)"
  }
]);
