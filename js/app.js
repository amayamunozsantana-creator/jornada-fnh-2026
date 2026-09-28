/* Comportamiento del sitio: cursor, parallax, menú lateral, acordeón del programa,
   huso horario, cuenta regresiva por tramos y enlaces. Los destinos de los enlaces
   se editan en js/enlaces.js, no aquí. */
// Custom cursor
const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', (e) => { cursor.style.left = e.clientX+'px'; cursor.style.top = e.clientY+'px'; });
document.querySelectorAll('button, a').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});
window.addEventListener('mouseleave', () => cursor.classList.add('hide'));
window.addEventListener('mouseenter', () => cursor.classList.remove('hide'));

// Parallax
const layers = document.querySelectorAll('[data-speed]');
function onScroll(){
  const y = window.scrollY;
  layers.forEach(l => { l.style.transform = 'translateY(' + (y*parseFloat(l.dataset.speed)) + 'px)'; });
}
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) window.addEventListener('scroll', onScroll, {passive:true});

// Off-canvas
const offcanvas = document.getElementById('offcanvas');
const overlay = document.getElementById('overlay');
document.getElementById('openMenu').addEventListener('click', () => { offcanvas.classList.add('open'); overlay.classList.add('show'); });
document.getElementById('closeMenu').addEventListener('click', () => { offcanvas.classList.remove('open'); overlay.classList.remove('show'); });
overlay.addEventListener('click', () => { offcanvas.classList.remove('open'); overlay.classList.remove('show'); });

// Programa accordion
document.querySelectorAll('.mod-row').forEach(row => {
  row.querySelector('.mod-btn').addEventListener('click', () => {
    const wasOpen = row.classList.contains('open');
    document.querySelectorAll('.mod-row').forEach(r => r.classList.remove('open'));
    if (!wasOpen) row.classList.add('open');
  });
});

// Timezone conversion for Programa
const tzSelect = document.getElementById('tz-select');
const tzRange = document.getElementById('tz-range');
const tzNote = document.getElementById('tz-note');
const tzClRef = document.getElementById('tz-cl-ref');

function fmtInTz(dateUTC, tz){
  return new Intl.DateTimeFormat('es-CL', { hour:'2-digit', minute:'2-digit', hour12:false, timeZone: tz }).format(dateUTC);
}
function dayInTz(dateUTC, tz){
  return new Intl.DateTimeFormat('es-CL', { day:'2-digit', month:'2-digit', timeZone: tz }).format(dateUTC);
}
// Event start/end declared in Chile time (America/Santiago), 2026-11-30 08:30/18:00.
// Construct as UTC instants by reading Chile's offset for that date (CLST = UTC-3 in Nov 2026).
const eventStartUTC = new Date('2026-11-30T08:30:00-03:00');
const eventEndUTC   = new Date('2026-11-30T18:00:00-03:00');

function renderTz(tz){
  const startStr = fmtInTz(eventStartUTC, tz);
  const endStr = fmtInTz(eventEndUTC, tz);
  const startDay = dayInTz(eventStartUTC, tz);
  const endDay = dayInTz(eventEndUTC, tz);
  tzRange.textContent = startStr + ' – ' + endStr + (startDay !== endDay ? ' (' + endDay + ')' : '');
  if (tz === 'America/Santiago') {
    tzNote.textContent = '';
    tzClRef.textContent = '';
  } else {
    tzNote.textContent = 'Convertido — huso seleccionado';
    tzClRef.textContent = 'Hora de Chile: 08:30 – 18:00';
  }
}

let detected = 'America/Santiago';
try { detected = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Santiago'; } catch(e){}
// Lista corta de husos; el huso detectado se agrega si no está
const shortZones = [
  ['America/Santiago','Chile (Santiago)'], ['America/Argentina/Buenos_Aires','Argentina (Buenos Aires)'],
  ['America/Lima','Perú (Lima)'], ['America/Bogota','Colombia (Bogotá)'], ['America/Mexico_City','México (Ciudad de México)'],
  ['America/Sao_Paulo','Brasil (São Paulo)'], ['Europe/Madrid','España (Madrid)'],
  ['America/New_York','EE.UU. (Nueva York)'], ['America/Chicago','EE.UU. (Chicago)'], ['America/Los_Angeles','EE.UU. (Los Ángeles)']
];
const known = shortZones.map(z => z[0]);
if (!known.includes(detected)) shortZones.unshift([detected, 'Tu huso (' + detected.replace(/_/g,' ') + ')']);
let allZones = [];
try { if (typeof Intl.supportedValuesOf === 'function') allZones = Intl.supportedValuesOf('timeZone'); } catch(e){}
tzSelect.innerHTML = shortZones.map(z => `<option value="${z[0]}">${z[1]}</option>`).join('')
  + (allZones.length ? '<optgroup label="Otro huso">' + allZones.filter(z => !shortZones.some(s => s[0] === z)).map(z => `<option value="${z}">${z.replace(/_/g,' ')}</option>`).join('') + '</optgroup>' : '');
tzSelect.value = detected;
tzSelect.setAttribute('aria-label', 'Huso horario');

renderTz(tzSelect.value);
tzSelect.addEventListener('change', () => renderTz(tzSelect.value));


// Tramos en hora de Chile (UTC-3 en oct-nov 2026)
const phases = [
  { key:'pre', end:new Date('2026-10-18T23:59:00-03:00'), ghost:'18', title:'LA PREVENTA CIERRA EL DOMINGO 18 DE OCTUBRE, 23:59 (HORA DE CHILE)', note:'Desde el lunes 19 de octubre rige la <strong style="color:#fff;">tarifa regular</strong>.', band:'Preventa vigente hasta el domingo 18 de octubre, 23:59', next:'Tarifa regular desde el lunes 19 de octubre' },
  { key:'reg', end:new Date('2026-11-22T23:59:00-03:00'), ghost:'22', title:'LA TARIFA REGULAR RIGE HASTA EL DOMINGO 22 DE NOVIEMBRE, 23:59 (HORA DE CHILE)', note:'Desde el lunes 23 de noviembre rige la <strong style="color:#fff;">tarifa de última hora</strong>.', band:'Tarifa regular vigente hasta el domingo 22 de noviembre, 23:59', next:'Última hora desde el lunes 23 de noviembre' },
  { key:'ult', end:new Date('2026-11-30T08:30:00-03:00'), ghost:'30', title:'LA JORNADA COMIENZA EL LUNES 30 DE NOVIEMBRE, 08:30 (HORA DE CHILE)', note:'Venta presencial hasta el domingo 29 de noviembre, 23:59; online hasta el lunes 30, 08:00.', band:'Tarifa de última hora vigente', next:'Presencial hasta el 29 de noviembre · online hasta el 30, 08:00' }
];
function currentPhase(now){ return phases.find(p => now < p.end) || phases[phases.length-1]; }
function applyPhase(p){
  document.getElementById('cd-ghost').textContent = p.ghost;
  document.getElementById('cd-title').textContent = p.title;
  document.getElementById('cd-note').innerHTML = p.note;
  document.getElementById('v-band').textContent = p.band;
  document.getElementById('v-next').textContent = p.next;
  document.querySelectorAll('[data-tramo]').forEach(el => el.classList.toggle('now', el.dataset.tramo === p.key));
}
let shownPhase = null;
function tick(){
  const now = new Date();
  const p = currentPhase(now);
  if (p !== shownPhase) { applyPhase(p); shownPhase = p; }
  let diff = Math.max(0, p.end - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
}

// Enlaces centralizados (los destinos están en js/enlaces.js)
(function(){
  const E = window.ENLACES || {};
  document.querySelectorAll('[data-enlace]').forEach(a => {
    const id = a.dataset.enlace, url = E[id];
    if (url) {
      a.href = url;
      if (!url.startsWith('mailto:')) { a.target = '_blank'; a.rel = 'noopener'; }
      a.removeAttribute('aria-disabled'); a.classList.remove('link-pendiente');
    } else if (id.startsWith('bio-')) {
      a.style.display = 'none';
    } else if (id === 'compra-entrada') {
      a.href = '#valores'; a.classList.add('link-pendiente'); a.title = 'Enlace de venta pendiente';
    } else {
      a.removeAttribute('href'); a.setAttribute('aria-disabled','true');
      a.classList.add('link-pendiente'); a.title = 'Enlace pendiente';
    }
  });
})();
tick(); setInterval(tick, 30000);
