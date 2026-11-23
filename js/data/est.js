LOGICA.add("est", [
  {
    id: "est-01", d: 1,
    q: "Cuando aumenta la venta de helados también aumentan los ahogamientos. ¿Cuál es la explicación más probable?",
    o: ["Una variable de confusión: el calor del verano.", "Los helados causan ahogamientos.", "Los ahogamientos aumentan la venta de helados.", "Es pura coincidencia."],
    a: 0,
    e: "El calor hace que se consuman más helados y que más gente nade. Ambas variables se mueven juntas sin que una cause la otra."
  },
  {
    id: "est-02", d: 2,
    q: "Un instructor nota que, tras felicitar a un piloto por un aterrizaje excelente, el siguiente suele ser peor, y que tras regañarlo por uno malo, el siguiente suele ser mejor. ¿Qué explica mejor esto?",
    o: ["La regresión a la media.", "Los regaños funcionan mejor que los elogios.", "Los elogios desconcentran.", "El efecto placebo."],
    a: 0,
    e: "Un resultado extremo se debe en parte al azar, así que el siguiente tiende a acercarse al promedio, hagas lo que hagas. Kahneman contó este caso real de instructores de vuelo."
  },
  {
    id: "est-03", d: 2,
    q: "En la Segunda Guerra Mundial se estudiaron los aviones que volvían con agujeros de bala, sobre todo en alas y fuselaje. ¿Dónde convenía reforzarlos?",
    o: ["En las zonas SIN agujeros, como los motores.", "En las alas y el fuselaje.", "En todas partes por igual.", "En ningún lugar."],
    a: 0,
    e: "Sesgo de supervivencia (Abraham Wald): solo se veían los aviones que regresaron. Los impactados en el motor no volvían, así que esas zonas eran las críticas."
  },
  {
    id: "est-04", d: 1,
    q: "Una revista de viajes encuesta a sus lectores y concluye: “El 80% de los chilenos viaja al extranjero cada año”. ¿Cuál es el principal problema?",
    o: ["Sesgo de selección: sus lectores no representan a la población.", "La muestra es demasiado grande.", "Debería usar la mediana.", "Ninguno."],
    a: 0,
    e: "Quienes leen una revista de viajes viajan más que el promedio. Una muestra útil debe parecerse a la población sobre la que se quiere concluir."
  },
  {
    id: "est-05", d: 2,
    q: "¿Por qué en un buen experimento se asigna a los participantes AL AZAR a los grupos de tratamiento y de control?",
    o: ["Para que los grupos sean comparables en todo salvo el tratamiento.", "Para ahorrar dinero.", "Para que el estudio sea más rápido.", "Para que los participantes no se aburran."],
    a: 0,
    e: "La aleatorización reparte por igual las variables de confusión, incluso las que no conocemos. Así, una diferencia en los resultados se puede atribuir al tratamiento."
  },
  {
    id: "est-06", d: 2,
    q: "¿Qué evita un estudio “doble ciego”?",
    o: ["Que las expectativas de pacientes e investigadores influyan en los resultados.", "Que los pacientes vean los medicamentos.", "Que se publiquen los resultados.", "Que haya grupo de control."],
    a: 0,
    e: "Ni el participante ni quien mide saben quién recibe el tratamiento. Así se evitan el efecto placebo y el sesgo del observador."
  },
  {
    id: "est-07", d: 3,
    q: "Un tratamiento A tiene mejores resultados que B tanto en hombres como en mujeres, pero peores resultados al juntar a todos. ¿Es posible?",
    o: ["Sí, es la paradoja de Simpson.", "No, es matemáticamente imposible.", "Solo si hay un error en los datos.", "Solo con muestras pequeñas."],
    a: 0,
    e: "Puede ocurrir si los grupos tienen tamaños muy distintos en cada tratamiento (por ejemplo, si A se dio sobre todo a casos graves). Al agregar datos hay que revisar cómo se reparten los subgrupos."
  },
  {
    id: "est-08", d: 3,
    q: "Un estudio informa p = 0,03. ¿Qué significa?",
    o: ["Si no hubiera efecto real, resultados así de extremos aparecerían el 3% de las veces.", "Hay un 97% de probabilidad de que la hipótesis sea cierta.", "Hay un 3% de probabilidad de que el resultado sea falso.", "El efecto es grande."],
    a: 0,
    e: "El valor p se calcula suponiendo que la hipótesis nula es cierta. No dice cuán probable es la hipótesis ni cuán grande es el efecto. Es uno de los conceptos más malinterpretados en la ciencia."
  },
  {
    id: "est-09", d: 2,
    q: "Las personas que más van al médico tienen más enfermedades. ¿Concluyes que ir al médico enferma?",
    o: ["No: probablemente es causalidad inversa.", "Sí, es una correlación clara.", "Sí, por los contagios en las salas de espera.", "No se puede decir nada."],
    a: 0,
    e: "Es más probable que la enfermedad cause las visitas al médico y no al revés. Pregúntate siempre en qué dirección va la flecha causal."
  },
  {
    id: "est-10", d: 2,
    q: "“La mayoría de los accidentes de tránsito ocurren cerca de casa.” ¿Significa que es más peligroso manejar cerca de casa?",
    o: ["No: la mayoría de los trayectos ocurren cerca de casa.", "Sí: nos relajamos al llegar.", "Sí: las calles del barrio son peores.", "No: es un mito."],
    a: 0,
    e: "Falta la tasa de exposición. Si el 70% de los kilómetros se manejan cerca de casa, es esperable que allí ocurran más accidentes aunque el riesgo por kilómetro sea igual."
  },
  {
    id: "est-11", d: 1,
    q: "“Mi abuelo fumó toda su vida y vivió hasta los 95.” ¿Qué dice esto sobre los efectos del tabaco?",
    o: ["Muy poco: un caso no refuta un efecto medido en millones de personas.", "Que el tabaco no es dañino.", "Que el tabaco alarga la vida.", "Que los estudios están equivocados."],
    a: 0,
    e: "Los efectos de salud son probabilísticos: aumentan el riesgo, no lo garantizan. Una anécdota es una muestra de tamaño 1, y además recordamos más los casos llamativos."
  },
  {
    id: "est-12", d: 2,
    q: "¿Qué tipo de evidencia es, en general, la más fuerte para saber si un tratamiento funciona?",
    o: ["Una revisión sistemática de ensayos aleatorizados.", "Un estudio observacional grande.", "La opinión de un experto.", "Testimonios de pacientes."],
    a: 0,
    e: "Las revisiones sistemáticas y los metaanálisis combinan varios ensayos aleatorizados y reducen el efecto del azar y de los sesgos de un solo estudio. Los testimonios están en lo más bajo de la jerarquía."
  },
  {
    id: "est-13", d: 1,
    q: "Un gráfico de barras muestra ventas de 98 y 100, pero el eje vertical empieza en 97. ¿Qué efecto tiene?",
    o: ["Exagera visualmente una diferencia pequeña.", "Muestra los datos de forma más precisa.", "Ninguno.", "Oculta la diferencia."],
    a: 0,
    e: "Con el eje truncado, una barra parece el triple de alta que la otra, aunque la diferencia real es de 2%. Revisa siempre dónde empiezan los ejes."
  },
  {
    id: "est-14", d: 2,
    q: "Dos estudios encuentran el mismo efecto: uno con 12 personas y otro con 12.000. ¿Cuál es la diferencia principal?",
    o: ["El de 12 personas es mucho menos confiable y su estimación es más incierta.", "Ninguna, el efecto es el mismo.", "El pequeño es mejor porque es más detallado.", "El grande siempre está sesgado."],
    a: 0,
    e: "Las muestras pequeñas tienen intervalos de confianza amplios y producen efectos extremos por azar con más frecuencia. Además, muchos resultados de estudios pequeños no se replican."
  }
]);
