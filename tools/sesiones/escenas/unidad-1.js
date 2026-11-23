// Escenas de la unidad 1: Lógica proposicional.
// Cada parte aparece cuando la voz dice su palabra (data-w = fragmento de la frase del paso).
(function(){
const em=(x,y,ic,s=26,a='')=>`<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" dominant-baseline="central"${a}>${ic}</text>`;
// Con a=' stroke="none"' el texto va sin contorno (sobre fondos claros)
const lbl=(x,y,t,s=13,c='#F1F7FB',a='')=>{const sin=a.includes('stroke="none"');a=a.replace(' stroke="none"','');
  return `<text x="${x}" y="${y}" font-size="${s}" font-weight="900" fill="${c}" text-anchor="middle" dominant-baseline="central"${sin?'':' paint-order="stroke" stroke="rgba(14,23,28,.55)" stroke-width="3"'}${a}>${t}</text>`};
// Fondo liso (primer y último rect a lo ancho: el motor extiende su color a toda la pantalla, sin cortes)
const pizarra=(h=240)=>`<rect x="0" y="0" width="360" height="${h}" fill="#15232B"/><rect x="0" y="${h-2}" width="360" height="2" fill="#15232B"/>`;
const tarjeta=(x,y,w,h,borde='#37464F',a='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#1E2B32" stroke="${borde}" stroke-width="2.5"${a}/>`;
// Examen con nota: verde si aprueba, rojo si reprueba
const examen=(x,y,nota,aprueba,w)=>`<g data-w="${w}"><rect x="${x-34}" y="${y-44}" width="68" height="88" rx="6" fill="#F1F7FB"/>
  ${[0,1,2,3].map(i=>`<rect x="${x-24}" y="${y-30+i*12}" width="${i%2?36:48}" height="4" rx="2" fill="#B9C6CE"/>`).join('')}
  <circle cx="${x+14}" cy="${y+22}" r="17" fill="none" stroke="${aprueba?'#58CC02':'#FF4B4B'}" stroke-width="3"/>
  ${lbl(x+14,y+23,nota,14,aprueba?'#3A8A00':'#D93636',' stroke="none"')}</g>`;
// Sello que cae con fuerza al decir su palabra
const sello=(x,y,t,c,w,rot=-8,ancho)=>{const an=ancho||t.length*12.5+36;return `<g transform="translate(${x},${y}) rotate(${rot})"><g class="sello" data-w="${w}">
  <rect x="${-an/2}" y="-19" width="${an}" height="38" rx="8" fill="rgba(14,23,28,.85)" stroke="${c}" stroke-width="3.5"/>${lbl(0,1,t,17,c,' stroke="none" letter-spacing="1"')}</g></g>`};
const flecha=(x1,y,x2,c='#9AB0BC',a='')=>`<g${a}><line x1="${x1}" y1="${y}" x2="${x2-8}" y2="${y}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><path d="M${x2} ${y} l-12 -8 v16z" fill="${c}"/></g>`;

Object.assign(ESCENAS,{
 'u1-promesa':()=>`<svg viewBox="0 0 360 240">${pizarra()}
  ${em(78,150,'🧑‍🎓',70)}${examen(132,196,'¿?',true,'examen').replace('#58CC02','#9AB0BC')}
  ${em(292,150,'🙋‍♀️',70)}
  <g data-w="si apruebas"><path d="M150 26 h176 a14 14 0 0 1 14 14 v44 a14 14 0 0 1 -14 14 h-40 l-6 18 -14 -18 h-116 a14 14 0 0 1 -14 -14 v-44 a14 14 0 0 1 14 -14z" fill="#F1F7FB"/>
  ${lbl(238,50,'Si apruebas,',17,'#1CB0F6',' stroke="none"')}${lbl(238,76,'te invito a comer 🍝',17,'#C98A00',' stroke="none"')}</g></svg>
  <div class="cap big" data-w="promesa">Una promesa condicional</div>`,

 'u1-partes':()=>`<svg viewBox="0 0 360 240">${pizarra()}
  <g data-w="condición"><rect x="14" y="78" width="150" height="62" rx="16" fill="#1CB0F6"/>${lbl(89,109,'Si apruebas',19,'#fff',' stroke="none"')}
   ${lbl(89,164,'CONDICIÓN',14,'#1CB0F6')}</g>
  ${flecha(168,109,196,'#9AB0BC',' data-w="después"')}
  <g data-w="prometido"><rect x="198" y="78" width="150" height="62" rx="16" fill="#FFC800"/>${lbl(273,101,'te invito',18,'#3A2A00',' stroke="none"')}${lbl(273,122,'a comer',18,'#3A2A00',' stroke="none"')}
   ${lbl(273,164,'LO PROMETIDO',14,'#FFC800')}</g></svg>
  <div class="cap big" data-w="dos partes">Dos partes</div>`,

 'u1-caso1':()=>`<svg viewBox="0 0 360 240">${pizarra()}
  ${lbl(180,26,'CASO 1',14,'#9AB0BC',' data-w="primer caso"')}
  ${tarjeta(28,48,130,150,'#58CC02',' data-w="apruebas"')}${examen(93,122,'7,0',true,'apruebas')}
  ${lbl(180,123,'y',20,'#9AB0BC',' data-w="invita"')}
  ${tarjeta(202,48,130,150,'#58CC02',' data-w="invita"')}<g data-w="invita">${em(267,118,'🍝',62)}</g>
  ${sello(180,214,'✓ CUMPLIÓ','#58CC02','cumplió',-6)}</svg>
  <div class="cap big" data-w="cumplió" style="color:#58CC02">La frase es verdadera</div>`,

 'u1-caso2':()=>`<svg viewBox="0 0 360 240">${pizarra()}
  ${lbl(180,26,'CASO 2',14,'#9AB0BC',' data-w="segundo caso"')}
  ${tarjeta(28,48,130,150,'#58CC02',' data-w="apruebas"')}${examen(93,122,'7,0',true,'apruebas')}
  ${lbl(180,123,'y',20,'#9AB0BC',' data-w="no te invita"')}
  ${tarjeta(202,48,130,150,'#FF4B4B',' data-w="no te invita"')}<g data-w="no te invita">${em(267,118,'🍽️',62)}<path d="M240 92 l54 54 M294 92 l-54 54" stroke="#FF4B4B" stroke-width="7" stroke-linecap="round"/></g>
  ${sello(180,214,'✗ ROMPIÓ LA PROMESA','#FF4B4B','rompió',-5)}</svg>
  <div class="cap big" data-w="falsa" style="color:#FF4B4B">Es el único caso falso</div>`,

 'u1-caso34':()=>`<svg viewBox="0 0 360 240">${pizarra()}
  ${lbl(180,26,'CASOS 3 Y 4',14,'#9AB0BC',' data-w="repruebas"')}
  ${tarjeta(28,48,130,150,'#FF4B4B',' data-w="repruebas"')}${examen(93,122,'3,5',false,'repruebas')}
  <g data-w="nada">${lbl(180,123,'?',26,'#9AB0BC')}</g>
  <g data-w="te invite">${tarjeta(202,48,130,70)}${em(267,84,'🍝',40)}</g>
  <g data-w="no te invite">${tarjeta(202,128,130,70)}${em(267,164,'🍽️',40)}</g>
  ${sello(180,214,'NO LA ROMPIÓ','#C9D4D8','no la rompió',-5)}</svg>
  <div class="cap big" data-w="no la rompió">Verdadera en los dos casos</div>`,

 'u1-tabla':()=>{const filas=[['✓','✓','Verdadera','#58CC02'],['✓','✗','Falsa','#FF4B4B'],['✗','✓','Verdadera','#58CC02'],['✗','✗','Verdadera','#58CC02']];
  return `<svg viewBox="0 0 360 240">${pizarra()}
  <g data-w="resumen">${lbl(80,28,'¿Aprueba?',13,'#1CB0F6')}${lbl(170,28,'¿Invita?',13,'#FFC800')}${lbl(275,28,'La frase es…',13,'#9AB0BC')}</g>
  ${filas.map((f,i)=>{const y=48+i*46,mala=i===1;return `<g data-w="${mala?'solo es falsa':'resumen'}" style="transition-delay:${mala?0:i*250}ms">
    <rect x="22" y="${y}" width="316" height="38" rx="10" fill="${mala?'rgba(255,75,75,.18)':'#1E2B32'}" stroke="${mala?'#FF4B4B':'#37464F'}" stroke-width="2"/>
    ${lbl(80,y+19,f[0],20,f[0]==='✓'?'#58CC02':'#FF4B4B')}${lbl(170,y+19,f[1],20,f[1]==='✓'?'#58CC02':'#FF4B4B')}${lbl(275,y+19,f[2],16,f[3])}</g>`}).join('')}</svg>
  <div class="cap big" data-w="no se cumple lo prometido">Solo es falsa en un caso</div>`},

 'u1-trampa':()=>`<svg viewBox="0 0 360 240">${pizarra()}
  <g data-w="invita">${tarjeta(214,40,124,118,'#FFC800')}${em(276,99,'🍝',58)}</g>
  <g data-w="aprobaste">${examen(82,99,'¿?',true,'aprobaste').replace('#58CC02','#9AB0BC')}</g>
  <g data-w="aprobaste"><path d="M206 99 H140" stroke="#9AB0BC" stroke-width="4" stroke-dasharray="7 6"/><path d="M132 99 l12 -8 v16z" fill="#9AB0BC"/></g>
  <g data-w="no prueba"><path d="M156 78 l40 42 M196 78 l-40 42" stroke="#FF4B4B" stroke-width="7" stroke-linecap="round"/></g>
  <g data-w="cumpleaños">${em(150,198,'🎂',50)}<path d="M180 190 Q240 190 262 166" fill="none" stroke="#FFC800" stroke-width="4"/><path d="M266 158 l1 15 -13 -6z" fill="#FFC800"/>${lbl(84,198,'Otro motivo',14,'#FFC800')}</g></svg>
  <div class="cap big" data-w="no prueba">Lo prometido no prueba la condición</div>`,
});
})();
