/* ==========================================================
   JULIO NAILS — interacción
   ========================================================== */
(() => {
'use strict';

/* ----------------------------------------------------------
   DATOS
---------------------------------------------------------- */
// minutos desde medianoche · 0 = domingo
const HOURS = { 0: null, 1: [570, 1230], 2: [570, 1230], 3: [570, 1230], 4: [570, 1230], 5: [570, 1230], 6: [570, 1230] };
const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const POLISH = [
  ['Rojo cereza', '#E0233F'], ['Rosa chicle', '#FF8DB5'], ['Azul cielo', '#5AA9FF'], ['Amarillo', '#FFD84D'],
  ['Menta', '#9FE3C9'], ['Lila', '#B79CFF'], ['Negro', '#1C1013']
];

const SERVICES = [
  { t: 'Manicura', d: 'Limado, cutícula y esmaltado: tradicional o semipermanente.', img: 'Dd5mgDgTz0E_0.jpg', c: '#FF8DB5' },
  { t: 'Pedicura', d: 'Quitamos durezas, cuidamos la cutícula y te damos un buen masaje.', img: 'DYm4J0eDUOw_8.jpg', c: '#9FE3C9' },
  { t: 'Uñas acrílicas', d: 'Largo y forma a tu gusto: almendra, coffin, stiletto…', img: 'DYm4J0eDUOw_4.jpg', c: '#5AA9FF' },
  { t: 'Esmalte permanente', d: 'Color con brillo que dura mucho más que el esmalte normal.', img: 'DYm4J0eDUOw_6.jpg', c: '#E0233F' },
  { t: 'Encapsuladas', d: 'Flores, glitter o lo que imagines, atrapado dentro del gel.', img: 'DYm4J0eDUOw_5.jpg', c: '#FFD84D' },
  { t: 'Baby boomer & francesa', d: 'El degradado más elegante y la francesa de siempre (o de colores).', img: 'DYm4J0eDUOw_0.jpg', c: '#FFE1E6' },
  { t: 'Decoración 3D', d: 'Flores en relieve, estrellas de mar, dibujos a mano y efecto aura.', img: 'DbLH3ceDfCV_2.jpg', c: '#FF8DB5' },
  { t: 'Para ellos', d: 'Manicura y pedicura masculina: limpia, cómoda y sin complicaciones.', img: 'DLAGA91C8qM_0.jpg', c: '#5AA9FF' }
];

const GALLERY = [
  'DYm4J0eDUOw_7', 'DbLH3ceDfCV_0', 'DdPOpZUDTZ7_0', 'DYm4J0eDUOw_4', 'DbLH3ceDfCV_2', 'Ddcv5Qtkwq__1', 'DYm4J0eDUOw_6',
  'DbLH3ceDfCV_3', 'Dd5mbPBE1k3_0', 'DYm4J0eDUOw_9', 'DbLH3ceDfCV_5', 'DdnnpB-T4eQ_0', 'DYm4J0eDUOw_5', 'DbLH3ceDfCV_1',
  'Ddcv2G2zwpn_0', 'DYm4J0eDUOw_3', 'DbLH3ceDfCV_6', 'DdcvxfEzItL_0', 'DYm4J0eDUOw_1', 'DbLH3ceDfCV_4', 'Dd5mipNzr-7_0',
  'DYm4J0eDUOw_2', 'DbLH3ceDfCV_9', 'Ddcv5Qtkwq__0', 'DYm4J0eDUOw_0', 'DbLH3ceDfCV_7', 'DdPOpZUDTZ7_1', 'Dd5mgDgTz0E_0',
  'DYm4J0eDUOw_8', 'DbLH3ceDfCV_8', 'Ddnnj70znOm_0', 'Dd5mbPBE1k3_1'
];

const STORIES = [
  ['Dd5mipNzr-7_0', 'nude + flores'], ['DdPOpZUDTZ7_0', 'aura azul'], ['Dd5mbPBE1k3_0', 'leopardo'],
  ['DdnnpB-T4eQ_0', 'azul & choco'], ['Ddcv5Qtkwq__1', 'flores azules'], ['Ddcv2G2zwpn_0', 'cromado perla'],
  ['DdcvxfEzItL_0', 'puntitos'], ['Ddnnj70znOm_0', 'francesa'], ['Dd5mgDgTz0E_0', 'rosa clean']
];

// Nail Lab
const SHAPES = [['almendra', 'Almendra'], ['stiletto', 'Stiletto'], ['coffin', 'Coffin'], ['cuadrada', 'Cuadrada'], ['redonda', 'Redonda']];
const COLORS = [
  ['Rojo cereza', '#E0233F'], ['Rosa chicle', '#FF8DB5'], ['Nude', '#E9B7A8'], ['Lila', '#B79CFF'], ['Azul cielo', '#5AA9FF'],
  ['Menta', '#9FE3C9'], ['Amarillo', '#FFD84D'], ['Burdeos', '#6E0F24'], ['Negro', '#1C1013'], ['Blanco', '#FFFFFF']
];
const FINISHES = [['brillo', 'Brillo'], ['mate', 'Mate'], ['francesa', 'Francesa'], ['babyboomer', 'Baby boomer'], ['aura', 'Aura'], ['cromado', 'Cromado'], ['flores', 'Flores 3D'], ['puntos', 'Puntitos']];
const SKINS = [['Clara', '#F5D3C2'], ['Media', '#E2AE8C'], ['Morena', '#B97D5B'], ['Oscura', '#7A4A33']];
// dedos: base (B), punta (T), grosor (w)
const FINGERS = [
  { B: [144, 300], T: [126, 126], w: 46 },
  { B: [192, 290], T: [190, 96], w: 48 },
  { B: [240, 296], T: [252, 122], w: 45 },
  { B: [284, 312], T: [306, 178], w: 37 },
  { B: [128, 360], T: [58, 262], w: 50 }
];

/* ----------------------------------------------------------
   UTILIDADES
---------------------------------------------------------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const IMG = f => `assets/img/${f}${f.endsWith('.jpg') ? '' : '.jpg'}`;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = window.matchMedia('(hover:none), (pointer:coarse)').matches;
const hasGsap = typeof window.gsap !== 'undefined';
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
};
const rnd = a => a[Math.random() * a.length | 0];

/* ----------------------------------------------------------
   HORARIO
---------------------------------------------------------- */
function madridNow() {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const g = t => p.find(x => x.type === t).value;
  return { d: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday')), m: +g('hour') * 60 + +g('minute') };
}
const hhmm = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
function getStatus() {
  const { d, m } = madridNow();
  const h = HOURS[d];
  if (h && m >= h[0] && m < h[1]) return { open: true, short: `Abierto · hasta las ${hhmm(h[1])}`, neon: `Sí, ven ahora: estamos hasta las ${hhmm(h[1])} y sin cita.` };
  if (h && m < h[0]) return { open: false, short: `Abrimos a las ${hhmm(h[0])}`, neon: `Todavía no: abrimos hoy a las ${hhmm(h[0])}. ¡Te esperamos!` };
  for (let i = 1; i <= 7; i++) {
    const nd = (d + i) % 7;
    if (HOURS[nd]) {
      const when = i === 1 ? 'mañana' : `el ${DAY_NAMES[nd].toLowerCase()}`;
      return { open: false, short: `Cerrado · abre ${when} ${hhmm(HOURS[nd][0])}`, neon: `Ahora no, pero abrimos ${when} a las ${hhmm(HOURS[nd][0])}.` };
    }
  }
  return { open: false, short: 'Cerrado', neon: '' };
}
function renderStatus() {
  const s = getStatus();
  $$('[data-status]').forEach(el => { el.classList.toggle('is-open', s.open); $('.status__text', el).textContent = s.short; });
  const neon = $('[data-neon]');
  neon.classList.toggle('is-closed', !s.open);
  $('[data-neon-word]').textContent = s.open ? 'ABIERTO' : 'CERRADO';
  $('[data-neon-sub]').textContent = s.neon;
}
function renderHours() {
  const { d } = madridNow();
  $('[data-hours]').innerHTML = [1, 2, 3, 4, 5, 6, 0].map(i => {
    const h = HOURS[i];
    return `<li class="${i === d ? 'is-today' : ''}"><span>${DAY_NAMES[i]}${i === d ? ' · hoy' : ''}</span><span>${h ? `${hhmm(h[0])} – ${hhmm(h[1])}` : 'Cerrado'}</span></li>`;
  }).join('');
}

/* ----------------------------------------------------------
   HERO: PINTA CON ESMALTE
---------------------------------------------------------- */
let polishColor = POLISH[0][1];
function setPolish(c) {
  polishColor = c;
  document.documentElement.style.setProperty('--polish', c);
  $$('.pbottle').forEach(b => b.setAttribute('aria-checked', String(b.dataset.c === c)));
}
function setupPaint() {
  const row = $('.polish__row');
  row.innerHTML = POLISH.map(([n, c]) => `<button type="button" class="pbottle" role="radio" aria-label="${n}" data-c="${c}" style="--c:${c}"><i></i></button>`).join('');
  row.addEventListener('click', e => { const b = e.target.closest('.pbottle'); if (b) setPolish(b.dataset.c); });
  setPolish(polishColor);

  const hero = $('.hero');
  const cv = $('.hero__paint');
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = 1, last = null, drips = [], visible = true, lastT = 0;
  function size() {
    const r = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function stroke(a, b, color) {
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const w = Math.max(14, 40 - dist * .35);
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = color; ctx.lineWidth = w;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    // brillo de laca
    ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = Math.max(3, w * .16);
    ctx.beginPath(); ctx.moveTo(a.x - w * .18, a.y - w * .22); ctx.lineTo(b.x - w * .18, b.y - w * .22); ctx.stroke();
    if (Math.random() < .035 && drips.length < 26) drips.push({ x: b.x + (Math.random() - .5) * w * .5, y: b.y + w * .3, len: 0, max: 30 + Math.random() * 90, w: 5 + Math.random() * 7, c: color });
  }
  function frame(t) {
    if (visible) {
      // se "seca" y desaparece poco a poco
      if (t - lastT > 40) {
        lastT = t;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,.022)';
        ctx.fillRect(0, 0, W, H);
      }
      ctx.globalCompositeOperation = 'source-over';
      drips.forEach(d => {
        if (d.len >= d.max) return;
        const step = Math.max(.4, (d.max - d.len) * .035);
        ctx.fillStyle = d.c;
        ctx.beginPath(); ctx.arc(d.x, d.y + d.len, d.w / 2, 0, Math.PI * 2); ctx.fill();
        ctx.fillRect(d.x - d.w / 2, d.y, d.w, d.len);
        d.len += step;
      });
      drips = drips.filter(d => d.len < d.max);
    }
    requestAnimationFrame(frame);
  }
  const pos = e => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  hero.addEventListener('pointermove', e => {
    if (e.target.closest('.sticker, .polish, a, button')) { last = null; return; }
    if (e.pointerType !== 'mouse' && e.buttons === 0) return;
    const p = pos(e);
    if (last) stroke(last, p, polishColor);
    last = p;
  });
  hero.addEventListener('pointerleave', () => last = null);
  hero.addEventListener('pointerup', () => { if (coarse) last = null; });
  hero.addEventListener('pointerdown', e => { if (!e.target.closest('.sticker, .polish, a, button')) last = pos(e); });
  new IntersectionObserver(([en]) => visible = en.isIntersecting).observe(hero);
  window.addEventListener('resize', size);
  size();
  requestAnimationFrame(frame);
  // demo automática: una pincelada para invitar a pintar
  if (!reduce) setTimeout(() => {
    const y0 = H * .62, pts = [];
    for (let i = 0; i <= 40; i++) pts.push({ x: W * .05 + (W * .55) * i / 40, y: y0 + Math.sin(i / 5) * 28 });
    let i = 1;
    (function draw() { if (i < pts.length) { stroke(pts[i - 1], pts[i], POLISH[1][1]); i++; requestAnimationFrame(draw); } })();
  }, 2900);
}

/* ----------------------------------------------------------
   PEGATINAS ARRASTRABLES
---------------------------------------------------------- */
function setupStickers() {
  $$('[data-drag]').forEach(el => {
    let sx, sy, ox = 0, oy = 0, vx = 0, lastX = 0, dragging = false;
    const base = getComputedStyle(el).getPropertyValue('--r').trim() || '0deg';
    el.addEventListener('pointerdown', e => {
      dragging = true; el.classList.add('is-drag'); el.setPointerCapture(e.pointerId);
      sx = e.clientX - ox; sy = e.clientY - oy; lastX = e.clientX;
      el.parentNode.appendChild(el);
    });
    el.addEventListener('pointermove', e => {
      if (!dragging) return;
      ox = e.clientX - sx; oy = e.clientY - sy;
      vx = e.clientX - lastX; lastX = e.clientX;
      el.style.transform = `translate(${ox}px,${oy}px) rotate(calc(${base} + ${Math.max(-18, Math.min(18, vx * 1.4))}deg)) scale(1.05)`;
    });
    const up = () => {
      if (!dragging) return;
      dragging = false; el.classList.remove('is-drag');
      el.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1), box-shadow .3s';
      el.style.transform = `translate(${ox}px,${oy}px) rotate(${base})`;
      setTimeout(() => el.style.transition = '', 520);
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  });
}

/* ----------------------------------------------------------
   SERVICIOS (lista con imagen flotante)
---------------------------------------------------------- */
function setupServices() {
  const list = $('[data-slist]');
  list.innerHTML = SERVICES.map((s, i) => `
    <li class="srow" style="--c:${s.c}" data-i="${i}" tabindex="0">
      <span class="srow__n">${String(i + 1).padStart(2, '0')}</span>
      <span class="srow__t">${s.t}</span>
      <span class="srow__d">${s.d}</span>
      <span class="srow__img"><img src="${IMG(s.img)}" alt="${s.t} en Julio Nails" loading="lazy"></span>
    </li>`).join('');
  const fl = $('.sfloat'), img = $('img', fl);
  let x = 0, y = 0, cx = 0, cy = 0, show = false;
  SERVICES.forEach(s => { const i = new Image(); i.src = IMG(s.img); });
  list.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
  $$('.srow', list).forEach(r => {
    r.addEventListener('mouseenter', () => { const s = SERVICES[+r.dataset.i]; img.src = IMG(s.img); img.alt = s.t; show = true; fl.classList.add('is-show'); });
    r.addEventListener('mouseleave', () => { show = false; fl.classList.remove('is-show'); });
    r.addEventListener('click', () => { if (window.innerWidth <= 640) { const on = !r.classList.contains('is-on'); $$('.srow', list).forEach(o => o.classList.remove('is-on')); r.classList.toggle('is-on', on); } });
  });
  (function loop() {
    cx += (x - cx) * .14; cy += (y - cy) * .14;
    const rot = Math.max(-12, Math.min(12, (x - cx) * .06));
    fl.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${show ? 1 : .6}) rotate(${rot}deg)`;
    requestAnimationFrame(loop);
  })();
}

/* ----------------------------------------------------------
   NAIL LAB
---------------------------------------------------------- */
const LAB = { shape: 'almendra', color: '#E0233F', finish: 'brillo', skin: '#F5D3C2', len: 55 };
function nailPath(shape, w, H) {
  const h = w / 2, cut = `Q 0,${(w * .3).toFixed(1)} ${-h},0 Z`;
  const f = n => n.toFixed(1);
  switch (shape) {
    case 'cuadrada': { const r = 4; return `M ${-h},0 L ${-h},${f(-H + r)} Q ${-h},${f(-H)} ${f(-h + r)},${f(-H)} L ${f(h - r)},${f(-H)} Q ${h},${f(-H)} ${h},${f(-H + r)} L ${h},0 ${cut}`; }
    case 'redonda': return `M ${-h},0 L ${-h},${f(-H + h)} A ${h},${h} 0 0 1 ${h},${f(-H + h)} L ${h},0 ${cut}`;
    case 'stiletto': return `M ${-h},0 L ${-h},${f(-H * .32)} C ${-h},${f(-H * .68)} ${f(-w * .06)},${f(-H * .94)} 0,${f(-H * 1.06)} C ${f(w * .06)},${f(-H * .94)} ${h},${f(-H * .68)} ${h},${f(-H * .32)} L ${h},0 ${cut}`;
    case 'coffin': return `M ${-h},0 L ${f(-w * .47)},${f(-H * .45)} L ${f(-w * .3)},${f(-H)} L ${f(w * .3)},${f(-H)} L ${f(w * .47)},${f(-H * .45)} L ${h},0 ${cut}`;
    default: return `M ${-h},0 L ${-h},${f(-H * .45)} C ${-h},${f(-H * .82)} ${f(-w * .2)},${f(-H)} 0,${f(-H)} C ${f(w * .2)},${f(-H)} ${h},${f(-H * .82)} ${h},${f(-H * .45)} L ${h},0 ${cut}`;
  }
}
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const ch = s => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) + amt * 255)));
  return '#' + [16, 8, 0].map(s => ch(s).toString(16).padStart(2, '0')).join('');
}
function renderLab() {
  const svg = $('.hand'), defs = $('[data-defs]', svg), g = $('[data-hand]', svg);
  const { shape, color, finish, skin, len } = LAB;
  const ext = 4 + len / 100 * 74;
  defs.innerHTML = `
    <linearGradient id="gBB" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F3C4BC"/><stop offset=".35" stop-color="#F3C4BC"/><stop offset="1" stop-color="${color}"/></linearGradient>
    <radialGradient id="gAura" cx=".5" cy=".62" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${shade(color, .25)}"/><stop offset="1" stop-color="${shade(color, -.12)}"/></radialGradient>
    <linearGradient id="gChrome" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(color, -.25)}"/><stop offset=".3" stop-color="${shade(color, .35)}"/><stop offset=".45" stop-color="#fff"/><stop offset=".6" stop-color="${color}"/><stop offset="1" stop-color="${shade(color, -.3)}"/></linearGradient>
    <pattern id="pDots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="2" fill="${color === '#FFFFFF' ? '#E0233F' : '#fff'}"/></pattern>
    ${FINGERS.map((F, i) => {
      const w = F.w * .72;
      const bed = w * .55 + F.w / 2;
      return `<clipPath id="nc${i}"><path d="${nailPath(shape, w, bed + ext)}"/></clipPath>`;
    }).join('')}`;
  const skinD = shade(skin, -.12);
  const palm = `<path class="finger" fill="${skin}" d="M112,300 C104,262 128,246 162,248 L272,250 C302,252 316,272 310,310 L300,392 C296,430 270,460 228,470 L172,470 C128,466 112,432 112,392 Z"/>`;
  let fingers = '', nails = '';
  FINGERS.forEach((F, i) => {
    const [bx, by] = F.B, [tx, ty] = F.T;
    fingers += `<line class="finger" x1="${bx}" y1="${by}" x2="${tx}" y2="${ty}" stroke="${skin}" stroke-width="${F.w}" stroke-linecap="round"/>`;
    // pliegues de nudillo
    const mx = bx + (tx - bx) * .45, my = by + (ty - by) * .45;
    const ang = Math.atan2(ty - by, tx - bx);
    const px = Math.cos(ang + Math.PI / 2) * F.w * .2, py = Math.sin(ang + Math.PI / 2) * F.w * .2;
    fingers += `<path d="M${(mx - px).toFixed(1)},${(my - py).toFixed(1)} Q${(mx + Math.cos(ang) * 4).toFixed(1)},${(my + Math.sin(ang) * 4).toFixed(1)} ${(mx + px).toFixed(1)},${(my + py).toFixed(1)}" stroke="${skinD}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
    const L = Math.hypot(tx - bx, ty - by), ux = (tx - bx) / L, uy = (ty - by) / L;
    const w = F.w * .72, bed = w * .55 + F.w / 2, H = bed + ext;
    const cx = tx - ux * w * .55, cy = ty - uy * w * .55;
    const rot = Math.atan2(uy, ux) * 180 / Math.PI + 90;
    const d = nailPath(shape, w, H);
    let fill = color, over = '';
    if (finish === 'babyboomer') fill = 'url(#gBB)';
    if (finish === 'aura') fill = 'url(#gAura)';
    if (finish === 'cromado') fill = 'url(#gChrome)';
    if (finish === 'francesa') {
      fill = '#F6D5CE';
      over = `<path clip-path="url(#nc${i})" d="M ${-w},${(-H * .7).toFixed(1)} Q 0,${(-H * .52).toFixed(1)} ${w},${(-H * .7).toFixed(1)} L ${w},${(-H * 1.3).toFixed(1)} L ${-w},${(-H * 1.3).toFixed(1)} Z" fill="${color}"/>`;
    }
    if (finish === 'puntos') over = `<rect clip-path="url(#nc${i})" x="${-w}" y="${(-H * 1.2).toFixed(1)}" width="${w * 2}" height="${(H * 1.3).toFixed(1)}" fill="url(#pDots)"/>`;
    if (finish === 'flores' && (i === 2 || i === 4 || i === 0)) {
      const fy = -H * .52, r = w * .17, pc = color === '#FFFFFF' ? '#FF8DB5' : '#fff';
      over = `<g clip-path="url(#nc${i})">${[0, 72, 144, 216, 288].map(a => `<circle cx="${(Math.cos(a * Math.PI / 180) * r * 1.1).toFixed(1)}" cy="${(fy + Math.sin(a * Math.PI / 180) * r * 1.1).toFixed(1)}" r="${r.toFixed(1)}" fill="${pc}" stroke="rgba(0,0,0,.12)" stroke-width=".8"/>`).join('')}<circle cx="0" cy="${fy.toFixed(1)}" r="${(r * .62).toFixed(1)}" fill="#FFD84D"/></g>`;
    }
    const gloss = finish === 'mate' ? '' : `<path clip-path="url(#nc${i})" d="M ${(-w * .3).toFixed(1)},${(-H * .18).toFixed(1)} Q ${(-w * .34).toFixed(1)},${(-H * .55).toFixed(1)} ${(-w * .18).toFixed(1)},${(-H * .8).toFixed(1)}" stroke="rgba(255,255,255,.65)" stroke-width="${(w * .1).toFixed(1)}" stroke-linecap="round" fill="none"/>`;
    const matte = finish === 'mate' ? `<path d="${d}" fill="rgba(255,255,255,.12)"/>` : '';
    nails += `<g transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${rot.toFixed(1)})"><path class="nail" d="${d}" fill="${fill}" stroke="rgba(28,16,19,.55)" stroke-width="1.6"/>${over}${matte}${gloss}</g>`;
  });
  g.innerHTML = fingers + palm + nails;
  // etiqueta
  const nm = (arr, v) => (arr.find(a => a[0] === v || a[1] === v) || [])[1] || '';
  const colorName = (COLORS.find(c => c[1] === color) || [''])[0];
  $('[data-lab-tag]').textContent = `${nm(SHAPES, shape)} · ${colorName} · ${nm(FINISHES, finish)}`;
  $$('[data-opt] [data-v]').forEach(b => b.setAttribute('aria-checked', String(LAB[b.closest('[data-opt]').dataset.opt] === b.dataset.v)));
  $('[data-len]').value = len;
}
function setupLab() {
  const shapeIcon = s => `<svg viewBox="-12 -40 24 44"><path d="${nailPath(s, 20, 36)}"/></svg>`;
  $('[data-opt="shape"]').innerHTML = SHAPES.map(([v, n]) => `<button type="button" class="opt" role="radio" data-v="${v}">${shapeIcon(v)}${n}</button>`).join('');
  $('[data-opt="finish"]').innerHTML = FINISHES.map(([v, n]) => `<button type="button" class="opt" role="radio" data-v="${v}">${n}</button>`).join('');
  $('[data-opt="color"]').innerHTML = COLORS.map(([n, c]) => `<button type="button" class="sw" role="radio" aria-label="${n}" data-v="${c}" style="--c:${c}"></button>`).join('');
  $('[data-opt="skin"]').innerHTML = SKINS.map(([n, c]) => `<button type="button" class="sw" role="radio" aria-label="Piel ${n.toLowerCase()}" data-v="${c}" style="--c:${c}"></button>`).join('');
  $$('[data-opt]').forEach(grp => grp.addEventListener('click', e => {
    const b = e.target.closest('[data-v]');
    if (!b) return;
    LAB[grp.dataset.opt] = b.dataset.v;
    renderLab();
  }));
  $('[data-len]').addEventListener('input', e => { LAB.len = +e.target.value; renderLab(); });
  $('[data-lab-random]').addEventListener('click', () => {
    LAB.shape = rnd(SHAPES)[0]; LAB.color = rnd(COLORS)[1]; LAB.finish = rnd(FINISHES)[0]; LAB.len = 20 + Math.random() * 80 | 0;
    renderLab();
    const s = $('.hand'); s.animate([{ transform: 'rotate(-4deg) scale(.96)' }, { transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.34,1.56,.64,1)' });
  });
  $('[data-lab-download]').addEventListener('click', downloadDesign);
  renderLab();
}
function downloadDesign() {
  const svg = $('.hand').cloneNode(true);
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', '800'); svg.setAttribute('height', '920');
  const data = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  img.onload = () => {
    const cv = document.createElement('canvas');
    cv.width = 1000; cv.height = 1250;
    const c = cv.getContext('2d');
    c.fillStyle = '#FFE1E6'; c.fillRect(0, 0, 1000, 1250);
    c.fillStyle = '#FFFBF7'; c.strokeStyle = '#1C1013'; c.lineWidth = 6;
    c.beginPath(); c.roundRect ? c.roundRect(40, 40, 920, 1170, 40) : c.rect(40, 40, 920, 1170); c.fill(); c.stroke();
    c.drawImage(img, 100, 70, 800, 920);
    c.fillStyle = '#E0233F'; c.font = '800 64px "Bricolage Grotesque", sans-serif'; c.textAlign = 'center';
    c.fillText('Mi diseño · Julio Nails', 500, 1060);
    c.fillStyle = '#1C1013'; c.font = '700 40px Caveat, cursive';
    c.fillText($('[data-lab-tag]').textContent, 500, 1120);
    c.font = '600 26px "Bricolage Grotesque", sans-serif'; c.fillStyle = '#7A6466';
    c.fillText("Carrer de l'Oliva 49 · Lloret de Mar · sin cita previa", 500, 1170);
    cv.toBlob(b => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b); a.download = 'mi-diseno-julio-nails.png';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    });
  };
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data);
}

/* ----------------------------------------------------------
   GALERÍA: MAZO + MOODBOARD
---------------------------------------------------------- */
let liked = store.get('jn-liked', []);
function renderMood() {
  const grid = $('[data-mood]');
  $('[data-mood-n]').textContent = `${liked.length} favorito${liked.length === 1 ? '' : 's'}`;
  $('[data-mood-clear]').hidden = !liked.length;
  grid.innerHTML = liked.length
    ? liked.map(f => `<button type="button" data-lb="${IMG(f)}" aria-label="Ver diseño"><img src="${IMG(f)}" alt="Diseño favorito" loading="lazy"></button>`).join('')
    : '<p class="mood__empty">Desliza ♥ para guardar diseños aquí.</p>';
}
function setupDeck() {
  const deck = $('[data-deck]');
  let idx = 0;
  function render() {
    deck.innerHTML = '';
    if (idx >= GALLERY.length) {
      deck.innerHTML = `<div class="deck__end"><b>¡Lo has visto todo! ✦</b><span>${liked.length ? `Tienes ${liked.length} diseño${liked.length === 1 ? '' : 's'} en tu moodboard.` : 'Seguro que alguno te ha encantado.'}</span><button type="button" class="btn btn--cherry btn--sm" data-deck-reset>Volver a empezar</button></div>`;
      $('[data-deck-count]').textContent = `${GALLERY.length} / ${GALLERY.length}`;
      return;
    }
    const slice = GALLERY.slice(idx, idx + 3);
    slice.slice().reverse().forEach((f, k) => {
      const depth = slice.length - 1 - k;
      const c = document.createElement('div');
      c.className = 'card';
      c.style.transform = `translateY(${depth * 14}px) scale(${1 - depth * .05}) rotate(${depth ? (depth % 2 ? 3 : -3) : 0}deg)`;
      c.style.zIndex = 10 - depth;
      c.innerHTML = `<img src="${IMG(f)}" alt="Diseño de uñas de Julio Nails" draggable="false"><span class="card__stamp card__stamp--yes">Me encanta</span><span class="card__stamp card__stamp--no">Next</span><span class="card__n">#${idx + depth + 1}</span>`;
      if (!depth) bindDrag(c, f);
      deck.appendChild(c);
    });
    $('[data-deck-count]').textContent = `${idx + 1} / ${GALLERY.length}`;
  }
  function decide(card, f, like) {
    if (!card || card.dataset.out) return;
    card.dataset.out = '1';
    const dir = like ? 1 : -1;
    $('.card__stamp--' + (like ? 'yes' : 'no'), card).style.opacity = 1;
    card.style.transition = 'transform .55s cubic-bezier(.2,.8,.1,1), opacity .55s';
    card.style.transform = `translate(${dir * 140}%, -10%) rotate(${dir * 26}deg)`;
    card.style.opacity = 0;
    if (like && !liked.includes(f)) { liked.unshift(f); store.set('jn-liked', liked); renderMood(); }
    setTimeout(() => { idx++; render(); }, 380);
  }
  function bindDrag(card, f) {
    let sx = 0, sy = 0, dx = 0, dy = 0, down = false;
    const yes = $('.card__stamp--yes', card), no = $('.card__stamp--no', card);
    card.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sy = e.clientY; card.setPointerCapture(e.pointerId); card.style.transition = 'none'; });
    card.addEventListener('pointermove', e => {
      if (!down) return;
      dx = e.clientX - sx; dy = e.clientY - sy;
      card.style.transform = `translate(${dx}px,${dy * .4}px) rotate(${dx * .07}deg)`;
      yes.style.opacity = Math.max(0, Math.min(1, dx / 110));
      no.style.opacity = Math.max(0, Math.min(1, -dx / 110));
    });
    const up = () => {
      if (!down) return; down = false;
      if (Math.abs(dx) > 110) decide(card, f, dx > 0);
      else if (Math.abs(dx) < 6 && Math.abs(dy) < 6) { card.style.transform = ''; openLightbox(IMG(f)); }
      else { card.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)'; card.style.transform = ''; yes.style.opacity = no.style.opacity = 0; }
      dx = dy = 0;
    };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);
  }
  const top = () => $$('.card', deck).pop();
  $('[data-deck-yes]').addEventListener('click', () => { const c = top(); if (c) decide(c, GALLERY[idx], true); });
  $('[data-deck-no]').addEventListener('click', () => { const c = top(); if (c) decide(c, GALLERY[idx], false); });
  deck.addEventListener('click', e => { if (e.target.closest('[data-deck-reset]')) { idx = 0; render(); } });
  deck.setAttribute('tabindex', '0');
  deck.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { const c = top(); if (c) decide(c, GALLERY[idx], true); }
    if (e.key === 'ArrowLeft') { const c = top(); if (c) decide(c, GALLERY[idx], false); }
  });
  $('[data-mood-clear]').addEventListener('click', () => { liked = []; store.set('jn-liked', liked); renderMood(); });
  render(); renderMood();
}
function setupStrip() {
  const half = Math.ceil(GALLERY.length / 2);
  const rows = [GALLERY.slice(0, half), GALLERY.slice(half)];
  rows.forEach((r, i) => {
    const html = r.map(f => `<button type="button" data-lb="${IMG(f)}" aria-label="Ampliar diseño"><img src="${IMG(f)}" alt="Diseño de uñas" loading="lazy"></button>`).join('');
    $(`[data-strip="${i + 1}"]`).innerHTML = html + html;
  });
}
function openLightbox(src) {
  const lb = $('.lightbox');
  $('img', lb).src = src;
  lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
}
function setupLightbox() {
  const lb = $('.lightbox');
  document.addEventListener('click', e => { const b = e.target.closest('[data-lb]'); if (b) openLightbox(b.dataset.lb); });
  const close = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); };
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lightbox__close')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ----------------------------------------------------------
   REEL + STORIES
---------------------------------------------------------- */
function setupReel() {
  $$('[data-reel]').forEach(r => {
    const v = $('video', r), bar = $('.reel__bar span', r);
    const sync = () => { r.classList.toggle('is-playing', !v.paused); r.classList.toggle('is-sound', !v.muted); };
    const toggle = () => { if (v.paused) { v.muted = false; v.play().catch(() => { v.muted = true; v.play(); }); } else v.pause(); };
    $('.reel__play', r).addEventListener('click', e => { e.stopPropagation(); toggle(); });
    v.addEventListener('click', toggle);
    $('.reel__mute', r).addEventListener('click', e => { e.stopPropagation(); v.muted = !v.muted; if (v.paused) v.play(); sync(); });
    ['play', 'pause', 'volumechange'].forEach(t => v.addEventListener(t, sync));
    v.addEventListener('timeupdate', () => { if (v.duration) bar.style.width = (v.currentTime / v.duration * 100) + '%'; });
    new IntersectionObserver(([en]) => { if (!en.isIntersecting && !v.paused) v.pause(); }, { threshold: .2 }).observe(r);
  });
}
function setupStory() {
  const root = $('[data-story]');
  const DUR = 3800;
  $('[data-story-frames]').innerHTML = STORIES.map(([f, l]) => `<img src="${IMG(f)}" alt="Diseño: ${l}" loading="lazy">`).join('');
  $('[data-story-bars]').innerHTML = STORIES.map(() => '<i><span></span></i>').join('');
  const imgs = $$('[data-story-frames] img'), segs = $$('[data-story-bars] i');
  let cur = 0, prog = 0, last = performance.now(), visible = false, held = false;
  function show(i) {
    cur = (i + STORIES.length) % STORIES.length; prog = 0;
    imgs.forEach((im, k) => im.classList.toggle('is-on', k === cur));
    segs.forEach((s, k) => $('span', s).style.width = k < cur ? '100%' : '0%');
    $('[data-story-label]').textContent = STORIES[cur][1];
  }
  (function tick(now) {
    const dt = Math.min(now - last, 100); last = now;
    if (visible && !held) {
      prog += dt;
      $('span', segs[cur]).style.width = Math.min(prog / DUR * 100, 100) + '%';
      if (prog >= DUR) show(cur + 1);
    }
    requestAnimationFrame(tick);
  })(last);
  $('.story__zone--prev', root).addEventListener('click', () => show(cur - 1));
  $('.story__zone--next', root).addEventListener('click', () => show(cur + 1));
  root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  let ht;
  root.addEventListener('pointerdown', () => { ht = setTimeout(() => held = true, 250); });
  const rel = () => { clearTimeout(ht); held = false; };
  root.addEventListener('pointerup', rel); root.addEventListener('pointerleave', rel);
  new IntersectionObserver(([en]) => visible = en.isIntersecting, { threshold: .35 }).observe(root);
  show(0);
}

/* ----------------------------------------------------------
   OPINIONES + PIE
---------------------------------------------------------- */
function setupReviews() {
  const box = $('.reviews__score');
  new IntersectionObserver(([en], io) => {
    if (!en.isIntersecting) return;
    box.classList.add('is-in');
    const el = $('[data-count]', box), to = parseFloat(el.dataset.count), t0 = performance.now();
    (function f(now) { const k = Math.min((now - t0) / 1500, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = (to * e).toFixed(1).replace('.', ','); if (k < 1) requestAnimationFrame(f); })(t0);
    io.disconnect();
  }, { threshold: .5 }).observe(box);
}
function setupFooterWord() {
  const w = $('[data-word]');
  w.innerHTML = [...w.textContent].map(ch => `<span>${ch}</span>`).join('');
  const cols = ['#FFD84D', '#1C1013', '#FF8DB5', '#5AA9FF', '#9FE3C9', '#B79CFF', '#FFFBF7'];
  $$('span', w).forEach(s => {
    s.addEventListener('mouseenter', () => { s.style.color = rnd(cols); });
    s.addEventListener('click', () => { s.style.color = rnd(cols); });
  });
}

/* ----------------------------------------------------------
   CURSOR, NAV, SCROLL
---------------------------------------------------------- */
function setupCursor() {
  if (coarse) return;
  const c = $('.cursor'), label = $('.cursor__label');
  let x = -100, y = -100, cx = x, cy = y;
  window.addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; });
  (function loop() { cx += (x - cx) * .25; cy += (y - cy) * .25; c.style.transform = `translate(${cx}px,${cy}px) rotate(-45deg)`; requestAnimationFrame(loop); })();
  [['.sticker', 'arrastra'], ['[data-deck]', 'desliza'], ['[data-reel]', 'play'], ['[data-story]', 'toca'], ['.strip', 'ver']].forEach(([s, t]) => $$(s).forEach(el => {
    el.addEventListener('mouseenter', () => { c.classList.add('is-big'); label.textContent = t; });
    el.addEventListener('mouseleave', () => c.classList.remove('is-big'));
  }));
}
function setupNav() {
  const nav = $('#nav'), burger = $('.burger'), menu = $('.menu');
  const setMenu = open => { burger.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); menu.setAttribute('aria-hidden', String(!open)); };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = $(id); if (!t) return;
    e.preventDefault(); setMenu(false);
    if (window.__lenis) window.__lenis.scrollTo(t, { offset: -90, duration: 1.3 }); else t.scrollIntoView({ behavior: 'smooth' });
  }));
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const links = $$('.nav__links a');
  const io = new IntersectionObserver(ens => ens.forEach(en => { if (en.isIntersecting) links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  ['servicios', 'lab', 'galeria', 'reels', 'opiniones', 'visitanos'].forEach(id => io.observe(document.getElementById(id)));
}
function setupScroll() {
  if (!hasGsap || reduce) { document.body.classList.add('no-gsap'); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis) {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('[data-reveal]').forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.4)', scrollTrigger: { trigger: el, start: 'top 88%' } }));
  gsap.to('.ticker', { rotate: -2, ease: 'none', scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.strip', { xPercent: 4 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: '.strip', start: 'top bottom', end: 'bottom top', scrub: true } });
}
function heroIntro() {
  if (!hasGsap || reduce) return;
  gsap.from('.hero__title .ln > span', { yPercent: 115, rotate: 4, duration: 1.1, ease: 'power4.out', stagger: .1 });
  gsap.from('.hero__eyebrow, .hero__bottom, .polish, .hero__stats', { opacity: 0, y: 30, duration: .9, ease: 'back.out(1.6)', stagger: .1, delay: .3 });
  gsap.from('.sticker', { opacity: 0, scale: .4, rotate: 30, duration: 1, ease: 'back.out(1.8)', stagger: .12, delay: .5, clearProps: 'transform,opacity' });
}
function runLoader() {
  const loader = $('.loader'), fill = $('.bottle__fill'), pct = $('.loader__pct b');
  const t0 = performance.now(), D = reduce ? 200 : 2000;
  let done = false;
  (function f(now) {
    const k = Math.min((now - t0) / D, 1), e = 1 - Math.pow(1 - k, 2);
    fill.style.height = (e * 100) + '%'; pct.textContent = Math.round(e * 100);
    if (k < 1) requestAnimationFrame(f); else finish();
  })(t0);
  function finish() {
    if (done) return; done = true;
    document.body.classList.remove('is-loading');
    if (hasGsap && !reduce) {
      gsap.to(loader, { clipPath: 'circle(0% at 50% 50%)', duration: .9, ease: 'power3.inOut', onComplete: () => loader.remove() });
      setTimeout(heroIntro, 150);
    } else loader.remove();
  }
  setTimeout(finish, 5000);
}

/* ----------------------------------------------------------
   INIT
---------------------------------------------------------- */
function init() {
  renderStatus(); renderHours(); setInterval(renderStatus, 60000);
  setupPaint();
  setupStickers();
  setupServices();
  setupLab();
  setupDeck();
  setupStrip();
  setupLightbox();
  setupReel();
  setupStory();
  setupReviews();
  setupFooterWord();
  setupCursor();
  setupNav();
  setupScroll();
  runLoader();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
