// Escenas de la unidad 8: los aviones de la Segunda Guerra Mundial (sesgo de supervivencia).
(function(){
const fondo=`<rect x="0" y="0" width="360" height="240" fill="#2B4A6A"/><rect x="0" y="238" width="360" height="2" fill="#3C5F80"/>`;
const t=(x,y,s,c,txt,a='')=>`<text x="${x}" y="${y}" font-size="${s}" font-weight="900" fill="${c}" text-anchor="middle" dominant-baseline="central" paint-order="stroke" stroke="rgba(14,23,28,.6)" stroke-width="3"${a}>${txt}</text>`;
// avión visto desde arriba, centrado en 180,120
const avion=`<g><path d="M172 30 Q180 18 188 30 L192 200 Q180 214 168 200Z" fill="#8FA3B3"/><path d="M174 88 L40 128 L40 142 L174 120Z M186 88 L320 128 L320 142 L186 120Z" fill="#9FB4C3"/>
 <path d="M172 180 L134 200 L134 208 L172 198Z M188 180 L226 200 L226 208 L188 198Z" fill="#9FB4C3"/>
 <rect x="92" y="108" width="16" height="30" rx="5" fill="#5D6D78"/><rect x="252" y="108" width="16" height="30" rx="5" fill="#5D6D78"/></g>`;
const agujeros=(a)=>[[70,132],[90,128],[128,122],[140,126],[230,126],[244,122],[280,130],[300,134],[178,60],[182,150],[176,170],[184,118],[150,204],[212,204]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.5" fill="#FF4B4B"${a}/>`).join('');
Object.assign(ESCENAS,{
 'u8-avion':()=>`<svg viewBox="0 0 360 240">${fondo}${avion}<g data-w="agujeros de bala">${agujeros('')}</g>${t(60,30,13,'#F1F7FB','alas',' data-w="las alas"')}${t(300,30,13,'#F1F7FB','fuselaje',' data-w="fuselaje"')}</svg>
  <div class="cap big" data-w="agujeros de bala">Los aviones que volvieron</div>`,
 'u8-avion2':()=>`<svg viewBox="0 0 360 240">${fondo}${avion}${agujeros(' opacity=".35"')}
  <g data-w="los motores"><circle cx="100" cy="123" r="20" fill="none" stroke="#FFC800" stroke-width="4" class="late"/><circle cx="260" cy="123" r="20" fill="none" stroke="#FFC800" stroke-width="4" class="late"/></g>
  ${t(100,160,13,'#FFC800','motor',' data-w="los motores"')}${t(260,160,13,'#FFC800','motor',' data-w="los motores"')}</svg>
  <div class="cap big" data-w="reforzar">Reforzar donde NO hay agujeros</div>`,
});
})();
