import {venues, clusters} from './venues.mjs';
import {films, cafeMoods, regions, cuisines} from './data.mjs';
import {createSong} from './song.mjs';
import {defaults, sanitize, byId, pickName, stepDone, complete, itinerary, routeLink, responseText, dateLabel} from './plan.mjs';

const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const KEY = 'dear-tu-v3';
const STEPS = [
  {key:'cafe', label:'Đồ uống', icon:'☕'},
  {key:'food', label:'Bữa tối', icon:'🍜'},
  {key:'film', label:'Phim', icon:'🎬'},
  {key:'done', label:'Chốt kèo', icon:'♡'}
];
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let state = {...defaults};
try { state = sanitize(JSON.parse(localStorage.getItem(KEY) || '{}') || {}); } catch {}
const ui = {mood:null, region:null, cuisine:null};
{
  const c = byId(state.cafe); if (c) ui.mood = cafeMoods.find(m => m.ids.includes(c.id))?.id || null;
  const f = byId(state.food); if (f) { ui.cuisine = f.cuisine; ui.region = regions.find(r => r.cuisines.includes(f.cuisine))?.id || null; }
}

const MUSIC_KEY = 'dear-tu-music';
const musicPref = () => { try { return localStorage.getItem(MUSIC_KEY); } catch { return null; } };
const setPref = v => { try { localStorage.setItem(MUSIC_KEY, v); } catch {} };
let hintTimer, closeTimer;
const song = createSong('yt-player', ({playing}) => {
  syncMusic();
  // Đã phát được thì tự thu gọn trình phát sau một chút.
  if (playing && $('#song').classList.contains('open')) { clearTimeout(closeTimer); closeTimer = setTimeout(() => setPanel(false), 1800); }
});
function setPanel(open, hint = false) {
  $('#song').classList.toggle('open', open);
  $('#song').classList.toggle('hint', open && hint);
}
function syncMusic() {
  document.querySelectorAll('.music-btn').forEach(b => { b.setAttribute('aria-pressed', song.playing); b.setAttribute('aria-label', song.playing ? 'Tắt nhạc nền' : 'Bật nhạc nền'); b.classList.toggle('playing', song.playing); });
}
// Trình duyệt chặn phát (thường gặp trên iPhone) thì mở trình phát để người xem tự chạm ▶.
function playSong() {
  song.play();
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => { if (!song.playing && !song.failed && musicPref() !== 'off') setPanel(true, true); }, 1600);
}
function toggleMusic() {
  if (song.playing) { song.pause(); setPref('off'); setPanel(false); }
  else { setPref('on'); playSong(); }
  syncMusic();
}
// Trình duyệt chỉ cho phát tiếng sau khi người xem tương tác: bật ở lần chạm/bấm/gõ phím đầu tiên ở bất kỳ đâu.
const UNLOCK = ['pointerdown', 'keydown'];
function unlockMusic(e) {
  if (e.target.closest?.('.music-btn, .song')) return; // để nút ♪ và trình phát tự xử lý
  UNLOCK.forEach(t => document.removeEventListener(t, unlockMusic, true));
  if (musicPref() !== 'off' && !song.playing) playSong();
}
if (musicPref() !== 'off') UNLOCK.forEach(t => document.addEventListener(t, unlockMusic, true));

const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
let toastTimer;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 1800); }
const cover = v => v.photos[0]?.src.replace('.webp', '-s.webp');
const nf = new Intl.NumberFormat('vi-VN');
const ext = (url, label, cls = 'link') => url ? `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true"> ↗</span></a>` : '';
const rating = (v, cls = 'rating') => v.rating?.score ? `<span class="${cls}"><b>★ ${String(v.rating.score).replace('.', ',')}</b>${v.rating.count ? `<span>${nf.format(v.rating.count)}</span>` : ''}</span>` : '';
const typeOf = v => (v.sub || '').split(/[(/+]/)[0].trim();

/* ---------- Screens ---------- */
function showScreen(name) {
  $('#cover').hidden = name !== 'cover';
  $('#planner').hidden = name !== 'planner';
  document.body.dataset.screen = name;
  if (name === 'planner') render(true);
  window.scrollTo(0, 0);
}

/* ---------- Chrome: tabs, pager, ticket ---------- */
function renderTabs() {
  $('#tabs').innerHTML = STEPS.map((s, i) => {
    const done = s.key !== 'done' && stepDone(state, s.key);
    return `<button data-go="${i}" class="tab ${state.step === i ? 'on' : ''} ${done ? 'done' : ''}" ${state.step === i ? 'aria-current="step"' : ''}><span class="tab-n" aria-hidden="true">${done ? '✓' : s.icon}</span><span>${s.label}</span></button>`;
  }).join('');
}

function renderPager() {
  const s = state.step, prev = STEPS[s - 1], next = STEPS[s + 1];
  const can = s < 3 && stepDone(state, STEPS[s].key);
  $('#pager').innerHTML = `<div class="pager-in">
    ${prev ? `<button class="pg prev" data-go="${s - 1}"><span aria-hidden="true">←</span> ${prev.label}</button>` : `<button class="pg prev" data-action="cover"><span aria-hidden="true">←</span> Thư mời</button>`}
    <span class="pg-dots" aria-hidden="true">${STEPS.map((_, i) => `<i class="${i === s ? 'on' : ''}"></i>`).join('')}</span>
    ${next ? `<button class="btn pg next" data-go="${s + 1}" ${can ? '' : 'disabled'}>${next.label} <span aria-hidden="true">→</span></button>` : `<button class="btn pg next" data-action="share" ${complete(state) ? '' : 'disabled'}>Gửi kèo ♡</button>`}
  </div>`;
}

function renderTicket() {
  $('#ticket').innerHTML = `<div class="ticket-card">
    <p class="ticket-kicker">${esc(dateLabel())}</p>
    <p class="ticket-title">Tú & tui</p>
    <ol class="timeline">${itinerary(state).map(i => i.type === 'gap' ? `<li class="gap"><time></time><span class="dot" aria-hidden="true">┊</span><small>${esc(i.title)} · ${i.minutes}′</small></li>` : `<li class="${i.pending ? 'pending' : ''}"><time>${i.start}</time><span class="dot" aria-hidden="true">${i.icon}</span><b>${esc(i.title)}</b></li>`).join('')}</ol>
  </div>`;
}

/* ---------- Building blocks ---------- */
const crumbs = items => `<nav class="crumbs" aria-label="Đang xem">${items.map((c, i) => i < items.length - 1 ? `<button data-crumb="${c.to}">← ${esc(c.label)}</button>` : '').join('')}</nav>`;
const heading = (title, lede) => `<header class="stage-head"><h2 tabindex="-1" id="stage-title">${title}</h2>${lede ? `<p>${lede}</p>` : ''}</header>`;

function collage(list) {
  const pics = list.slice(0, 3);
  return `<span class="collage n${pics.length}">${pics.map(v => `<img src="${esc(cover(v))}" alt="" loading="lazy">`).join('')}</span>`;
}

function tile({action, id, title, label, list, icon}) {
  return `<button class="tile" data-${action}="${id}">${collage(list)}
    <span class="tile-body"><span class="tile-label">${icon ? `<i aria-hidden="true">${icon}</i>` : ''}${esc(label)}</span><b>${esc(title)}</b><span class="tile-count">${list.length} quán →</span></span></button>`;
}

function card(v, key) {
  const picked = state[key] === v.id;
  return `<article class="vcard ${picked ? 'picked' : ''}">
    <button class="vcard-photo" data-open="${v.id}" aria-label="Xem ảnh và review ${esc(v.name)}">
      <img src="${esc(cover(v))}" alt="${esc(v.photos[0]?.caption || v.name)}" loading="lazy" width="760" height="570">
      ${rating(v, 'rating on-photo')}
      <span class="count-pill">${v.photos.length} ảnh</span>
      ${picked ? '<span class="picked-mark">♡ Đã chọn</span>' : ''}
    </button>
    <div class="vcard-body">
      <p class="vcard-kicker">${esc(v.inAeon ? 'Trong AEON' : clusters[v.cluster])}${v.distance && !v.inAeon ? ' · ' + esc(v.distance) : ''}</p>
      <h3>${esc(v.name)}</h3>
      <p class="vcard-tag">${esc(v.tagline)}</p>
      <div class="vcard-actions"><button class="btn ${picked ? 'ghost' : ''}" data-pick="${v.id}" data-key="${key}" aria-pressed="${picked}">${picked ? 'Đã chọn ✓' : 'Chọn'}</button><button class="link" data-open="${v.id}">Ảnh & review</button></div>
    </div></article>`;
}

function grid(list, key) {
  return `<div class="carousel"><div class="vgrid" id="vgrid">${list.map(v => card(v, key)).join('')}</div>
    ${list.length > 1 ? `<div class="car-nav"><button data-car="-1" aria-label="Quán trước">‹</button><span id="car-count">1 / ${list.length}</span><button data-car="1" aria-label="Quán sau">›</button></div>` : ''}</div>`;
}

function customBox(key, title, hint) {
  const on = state[key] === 'custom';
  return `<div class="custom ${on ? 'on' : ''}"><button class="custom-btn" data-pick="custom" data-key="${key}" aria-pressed="${on}"><span aria-hidden="true">${on ? '✓' : '+'}</span><span><b>${title}</b><small>${hint}</small></span></button>
    ${on ? `<label class="sr" for="${key}Custom">${title}</label><input id="${key}Custom" class="input" data-field="${key}Custom" maxlength="160" value="${esc(state[key + 'Custom'])}" placeholder="Ghi tên quán hoặc món nhé…">` : ''}</div>`;
}

/* ---------- Steps ---------- */
function stepCafe() {
  const cafes = venues.filter(v => v.kind === 'cafe');
  const moods = cafeMoods.map(m => ({...m, list:m.ids.map(byId).filter(Boolean)})).filter(m => m.list.length);
  if (!ui.mood) {
    return heading('Chị thích ngồi ở đâu?', 'Bắt đầu buổi chiều bằng một ly nước ở chỗ thoáng mát, nhiều cây, view nhìn ra hồ nhé!')
      + `<div class="tiles n${moods.length}">${moods.map(m => tile({action:'mood', id:m.id, title:m.title, label:m.label, icon:m.icon, list:m.list})).join('')}</div>`
      + customBox('cafe', 'Có quán ruột rồi?', 'Ghi tên quán, tui sắp xếp.');
  }
  const mood = moods.find(m => m.id === ui.mood) || moods[0];
  return crumbs([{to:'cafe', label:'Chọn kiểu khác'}, {}]) + heading(esc(mood.title)) + grid(mood.list, 'cafe');
}

function stepFood() {
  const foods = venues.filter(v => v.kind === 'food');
  const of = c => foods.filter(v => v.cuisine === c);
  const regs = regions.map(r => ({...r, list:foods.filter(v => r.cuisines.includes(v.cuisine))})).filter(r => r.list.length);
  if (!ui.region) {
    return heading('Tối nay ăn gì nhỉ?')
      + `<div class="tiles n${regs.length}">${regs.map(r => tile({action:'region', id:r.id, title:r.blurb, label:r.title, list:r.list})).join('')}</div>`
      + customBox('food', 'Đang thèm món khác?', 'Ghi tên món hoặc quán nhé.');
  }
  const region = regs.find(r => r.id === ui.region);
  const cs = region.cuisines.filter(c => of(c).length);
  if (!ui.cuisine && cs.length > 1) {
    return crumbs([{to:'food', label:'Á hay Âu'}, {}]) + heading(`${region.title}, vị nào đây?`)
      + `<div class="tiles n${cs.length}">${cs.map(c => tile({action:'cuisine', id:c, title:cuisines[c].blurb, label:'Món ' + cuisines[c].title, icon:cuisines[c].icon, list:of(c)})).join('')}</div>`;
  }
  const c = ui.cuisine || cs[0];
  return crumbs([cs.length > 1 ? {to:'region', label:'Đổi món'} : {to:'food', label:'Á hay Âu'}, {}])
    + heading(`Món ${cuisines[c].title} ${cuisines[c].icon}`) + grid(of(c), 'food');
}

function stepFilm() {
  return heading('Xem phim gì đây?', 'Suất chiếu thứ Bảy 17/10 ở CGV AEON Hà Đông.')
    + `<div class="films">${films.map(f => { const on = state.film === f.id; return `<article class="film ${on ? 'picked' : ''}"><img src="${f.image}" alt="Hình phim ${esc(f.name)}" loading="lazy"><div><p class="vcard-kicker">${esc(f.kicker)} · ${f.minutes} phút</p><h3>${esc(f.name)}</h3><p>${esc(f.desc)}</p>${f.times ? `<p class="times" aria-label="Suất chiếu thứ Bảy">${f.times.filter(x => x >= '12:00' && x <= '22:00').map(x => `<span>${x}${f.tags[x] ? `<em>${esc(f.tags[x])}</em>` : ''}</span>`).join('')}</p>` : ''}<div class="vcard-actions"><button class="btn ${on ? 'ghost' : ''}" data-pick="${f.id}" data-key="film" aria-pressed="${on}">${on ? 'Đã chọn ✓' : 'Xem phim này'}</button>${ext(f.source, 'Trailer & info')}</div></div></article>`; }).join('')}</div>`
    + `<div class="film-extra"><button class="chip-btn ${state.film === 'none' ? 'on' : ''}" data-pick="none" data-key="film" aria-pressed="${state.film === 'none'}">${state.film === 'none' ? '✓ ' : ''}Thôi khỏi phim, đi dạo</button>${customBox('film', 'Phim khác?', 'Ghi tên phim nhé.')}</div>`
    + (state.film !== 'none' ? `<div class="orders">${[['dinner-first', 'Cafe → dạo → Ăn → Phim'], ['film-first', 'Cafe → Phim → Ăn']].map(([id, t]) => `<button class="order" data-order="${id}" aria-pressed="${state.order === id}">${t}</button>`).join('')}</div>` : '');
}

function stepDoneView() {
  const plan = itinerary(state), route = routeLink(state), times = [];
  for (let h = 13; h <= 17; h++) for (const m of ['00', '30']) times.push(`${String(h).padStart(2, '0')}:${m}`);
  return heading('Kèo của tụi mình nè ♡')
    + `<div class="review">
      <ol class="review-list">${plan.map(i => { if (i.type === 'gap') return `<li class="gap"><span aria-hidden="true">┊</span><small>${i.start} · ${esc(i.title)} · ${i.minutes} phút</small></li>`; const v = i.place?.photos ? i.place : null; return `<li class="${i.pending ? 'pending' : ''}">${v ? `<img src="${esc(cover(v))}" alt="" loading="lazy">` : `<span class="ph" aria-hidden="true">${i.icon}</span>`}<div><time>${i.start} – ${i.end}</time><b>${esc(i.title)}</b><small class="${i.noShow ? 'warn' : ''}">${esc(i.sub)}</small></div>${v ? `<button class="link" data-open="${v.id}">Xem</button>` : ''}</li>`; }).join('')}</ol>
      <div class="review-form">
        <label class="field"><span>Gặp nhau lúc</span><select id="time" data-field="time">${times.map(t => `<option ${t === state.time ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        <label class="field"><span>Nhắn tui gì không?</span><textarea id="notes" data-field="notes" rows="3" maxlength="1200" placeholder="Qua đón tui nhé, hay gặp ở quán…">${esc(state.notes)}</textarea></label>
        ${route ? ext(route, 'Đường đi trên Google Maps', 'link') : ''}
        <div id="share-fallback"></div>
      </div></div>`;
}

/* ---------- Detail sheet ---------- */
function openSheet(id) {
  const v = byId(id); if (!v) return;
  const key = v.kind === 'cafe' ? 'cafe' : 'food', picked = state[key] === v.id;
  const quotes = v.highlights.filter(h => /^["“]/.test(h.trim())).map(h => {
    const [q, src] = h.trim().split(/\s+[—–]\s+(?=[^"“”]*$)/);
    return {q:q.replace(/["“”]/g, '').trim(), src};
  });
  const links = [['maps', 'Google Maps'], ['tiktok', 'TikTok'], ['instagram', 'Instagram'], ['facebook', 'Facebook'], ['menu', 'Menu'], ['website', 'Website']].filter(([k]) => v.links[k] && !(k === 'website' && v.links[k] === v.links.menu));
  const facts = [['Địa chỉ', v.address], ['Giờ mở cửa', v.hours], ['Cách AEON', v.inAeon ? 'Ngay trong AEON' : v.distance]].filter(([, x]) => x);
  $('#sheet-body').innerHTML = `
    <button class="sheet-close" data-action="close" aria-label="Đóng">×</button>
    <div class="gallery" id="gallery">${v.photos.map((p, i) => `<figure><img src="${esc(p.src)}" alt="${esc(p.caption)}" width="${p.w}" height="${p.h}" ${i ? 'loading="lazy"' : ''}></figure>`).join('')}</div>
    ${v.photos.length > 1 ? `<div class="gallery-nav"><button data-gal="-1" aria-label="Ảnh trước">‹</button><span id="gal-count">1 / ${v.photos.length}</span><button data-gal="1" aria-label="Ảnh sau">›</button></div>` : ''}
    <div class="sheet-content">
      <p class="vcard-kicker">${esc(v.inAeon ? 'Trong AEON' : clusters[v.cluster])} · ${esc(typeOf(v))}</p>
      <h2 id="sheet-title">${esc(v.name)}</h2>${v.aka ? `<p class="sheet-aka">${esc(v.aka)}</p>` : ''}
      <p class="sheet-tag">${esc(v.tagline)}</p>
      ${v.rating.score ? `<p class="sheet-rating">${rating(v)} <span class="src">đánh giá Google</span></p>` : ''}
      <p class="sheet-desc">${esc(v.desc)}</p>
      ${quotes.length ? `<div class="quotes">${quotes.slice(0, 3).map(({q, src}) => `<blockquote>${esc(q)}${src ? `<cite>${esc(src)}</cite>` : ''}</blockquote>`).join('')}</div>` : ''}
      ${v.signature.length ? `<ul class="tags">${v.signature.map(s => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
      <dl class="facts">${facts.map(([k, x]) => `<div><dt>${k}</dt><dd>${esc(x)}</dd></div>`).join('')}</dl>
      ${links.length ? `<p class="links">${links.map(([k, l]) => ext(v.links[k], l, 'pill')).join('')}</p>` : ''}
    </div>
    <div class="sheet-bar"><button class="btn big ${picked ? 'ghost' : ''}" data-pick="${v.id}" data-key="${key}" data-close="1">${picked ? 'Đã chọn ✓' : 'Chọn quán này ♡'}</button></div>`;
  const d = $('#sheet'); if (!d.open) d.showModal();
  const g = $('#gallery'); g.scrollLeft = 0;
  g.addEventListener('scroll', () => { const c = $('#gal-count'); if (c) c.textContent = `${Math.round(g.scrollLeft / g.clientWidth) + 1} / ${v.photos.length}`; }, {passive:true});
}

/* ---------- Render ---------- */
function render(top) {
  $('#planner').dataset.step = state.step;
  renderTabs();
  $('#stage').innerHTML = `<div class="stage-in" data-step="${state.step}">${[stepCafe, stepFood, stepFilm, stepDoneView][state.step]()}</div>`;
  renderPager();
  renderTicket();
  const g = $('#vgrid');
  if (g) g.addEventListener('scroll', () => { const c = $('#car-count'), w = g.firstElementChild?.getBoundingClientRect().width || 1; if (c) c.textContent = `${Math.min(g.children.length, Math.round(g.scrollLeft / (w + 16)) + 1)} / ${g.children.length}`; }, {passive:true});
  if (top) { $('#scroller').scrollTo(0, 0); $('#stage-title')?.focus({preventScroll:true}); }
}

async function share() {
  const text = responseText(state);
  try { if (navigator.share) { await navigator.share({title:'Kèo cuối tuần ♡', text}); return; } } catch (e) { if (e.name === 'AbortError') return; }
  try { await navigator.clipboard.writeText(text); toast('Đã copy kèo, gửi tui nhé ♡'); return; } catch {}
  state.step = 3; render();
  $('#share-fallback').innerHTML = `<label class="field"><span>Copy đoạn này gửi tui nhé</span><textarea id="share-text" rows="8" readonly>${esc(text)}</textarea></label>`;
  $('#share-text').select();
}

document.addEventListener('click', e => {
  const b = e.target.closest('button, [data-open]'); if (!b) return;
  const d = b.dataset;
  if (d.action === 'open') { if (musicPref() !== 'off' && !song.playing) playSong(); showScreen('planner'); return; }
  if (d.action === 'song-close') { setPanel(false); return; }
  if (d.action === 'music') { toggleMusic(); return; }
  if (d.action === 'cover') { showScreen('cover'); return; }
  if (d.go !== undefined) { state.step = +d.go; save(); render(true); return; }
  if (d.mood) { ui.mood = d.mood; render(true); return; }
  if (d.region) { ui.region = d.region; ui.cuisine = null; render(true); return; }
  if (d.cuisine) { ui.cuisine = d.cuisine; render(true); return; }
  if (d.crumb) { if (d.crumb === 'cafe') ui.mood = null; if (d.crumb === 'food') { ui.region = null; ui.cuisine = null; } if (d.crumb === 'region') ui.cuisine = null; render(true); return; }
  if (d.car) { const g = $('#vgrid'), w = g.firstElementChild.getBoundingClientRect().width + 16; g.scrollBy({left:w * +d.car, behavior:reduced() ? 'auto' : 'smooth'}); return; }
  if (d.order) { state.order = d.order; save(); render(); return; }
  if (d.open) { openSheet(d.open); return; }
  if (d.gal) { const g = $('#gallery'); g.scrollBy({left:g.clientWidth * +d.gal, behavior:reduced() ? 'auto' : 'smooth'}); return; }
  if (d.pick) {
    const k = d.key, again = state[k] === d.pick && d.pick !== 'custom';
    state[k] = d.pick; save();
    if (d.close) $('#sheet').close();
    render();
    // Giữ băng chuyền ở đúng thẻ vừa chọn và trả focus về nút chọn của thẻ đó.
    const btn = document.querySelector(`#stage [data-pick="${CSS.escape(d.pick)}"][data-key="${k}"]`);
    const g = $('#vgrid'), cardEl = btn?.closest('.vcard');
    if (g && cardEl) g.scrollLeft = cardEl.offsetLeft - g.offsetLeft;
    if (d.pick === 'custom') $(`#${k}Custom`)?.focus();
    else { btn?.focus({preventScroll:true}); if (!again) toast(`♡ Đã chọn ${pickName(state, k)}`); }
    return;
  }
  if (d.action === 'close') { $('#sheet').close(); return; }
  if (d.action === 'share') share();
});

document.addEventListener('input', e => {
  const f = e.target.dataset.field; if (!f) return;
  state[f] = e.target.value; save();
  if (f === 'time') render(); else { renderTabs(); renderPager(); renderTicket(); }
});

document.addEventListener('keydown', e => {
  if (document.body.dataset.screen !== 'planner' || $('#sheet').open || e.target.closest('input, textarea, select')) return;
  if (e.key === 'ArrowRight' && state.step < 3 && stepDone(state, STEPS[state.step].key)) { state.step++; save(); render(true); }
  if (e.key === 'ArrowLeft' && state.step > 0) { state.step--; save(); render(true); }
});

$('#sheet').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
document.body.dataset.screen = 'cover';
