// Escenas de la unidad 6: el reloj (ángulo entre las agujas).
(function(){
const fondo=`<rect x="0" y="0" width="360" height="240" fill="#15232B"/><rect x="0" y="238" width="360" height="2" fill="#15232B"/>`;
const t=(x,y,s,c,txt,a='')=>`<text x="${x}" y="${y}" font-size="${s}" font-weight="900" fill="${c}" text-anchor="middle" dominant-baseline="central"${a}>${txt}</text>`;
const cx=180,cy=122,R=92;
const pol=(deg,r)=>{const a=(deg-90)*Math.PI/180;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r]};
const esfera=(w)=>`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#F1F7FB" stroke="#9AB0BC" stroke-width="6"/>`+
  Array.from({length:12},(_,i)=>{const [x,y]=pol((i+1)*30,R-20);return t(x.toFixed(1),y.toFixed(1),15,'#131F24',i+1,w?` data-w="${w}"`:'')}).join('');
const aguja=(deg,len,ancho,col,a='')=>{const [x,y]=pol(deg,len);return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${col}" stroke-width="${ancho}" stroke-linecap="round"${a}/>`};
const arco=(d1,d2,r,col,a='')=>{const [x1,y1]=pol(d1,r),[x2,y2]=pol(d2,r);return `<path d="M${cx} ${cy} L${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}Z" fill="${col}" opacity=".45"${a}/>`};
Object.assign(ESCENAS,{
 'u6-reloj30':()=>`<svg viewBox="0 0 360 240">${fondo}${esfera('doce números')}
  <g data-w="treinta grados">${arco(0,30,R-6,'#FFC800')}${t(...pol(15,R+18).map(v=>v.toFixed(1)),16,'#FFC800','30°')}</g>
  ${aguja(0,70,5,'#131F24')}${aguja(30,70,5,'#131F24',' data-w="del siguiente"')}<circle cx="${cx}" cy="${cy}" r="6" fill="#131F24"/></svg>
  <div class="cap big" data-w="trescientos sesenta">360° ÷ 12 = 30°</div>`,
 'u6-reloj315':()=>`<svg viewBox="0 0 360 240">${fondo}${esfera()}
  <g data-w="un cuarto del camino">${arco(90,97.5,R-6,'#FF4B4B')}</g>
  ${aguja(90,78,4,'#1CB0F6',' data-w="el minutero"')}${aguja(97.5,52,7,'#131F24',' data-w="el horario"')}<circle cx="${cx}" cy="${cy}" r="6" fill="#131F24"/>
  ${t(312,122,13,'#1CB0F6','minutero',' data-w="el minutero"')}${t(300,170,13,'#F1F7FB','horario',' data-w="el horario"')}</svg>
  <div class="cap big" data-w="un cuarto del camino">3:15 → el horario avanzó ¼</div>`,
});
})();
