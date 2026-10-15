import {venues} from './venues.mjs';
import {films, DATE, AEON, cuisines} from './data.mjs';

export const defaults = {v:2, step:0, cafe:'', cafeCustom:'', food:'', foodCustom:'', film:'', filmCustom:'', order:'film-cafe', time:'14:00', notes:''};
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export const byId = id => venues.find(v => v.id === id);

export function sanitize(raw = {}) {
  const s = {...defaults};
  for (const k of ['cafeCustom', 'foodCustom', 'filmCustom', 'notes']) if (typeof raw[k] === 'string') s[k] = raw[k].slice(0, k === 'notes' ? 1200 : 160);
  const ok = (id, kind) => id === 'custom' || venues.some(v => v.id === id && v.kind === kind);
  if (ok(raw.cafe, 'cafe')) s.cafe = raw.cafe;
  if (ok(raw.food, 'food')) s.food = raw.food;
  if ([...films.map(f => f.id), 'custom', 'none'].includes(raw.film)) s.film = raw.film;
  if (['film-cafe', 'film-first', 'dinner-first'].includes(raw.order)) s.order = raw.order;
  if (typeof raw.time === 'string' && TIME.test(raw.time)) s.time = raw.time;
  if (Number.isInteger(raw.step) && raw.step >= 0 && raw.step <= 3) s.step = raw.step;
  return s;
}

export function pickName(s, key) {
  if (s[key] === 'custom') return s[key + 'Custom'].trim() || 'Một nơi bạn chọn';
  if (key === 'film') return s.film === 'none' ? 'Không xem phim, đi dạo' : films.find(f => f.id === s.film)?.name || '';
  return byId(s[key])?.name || '';
}

export const stepDone = (s, key) => !!s[key] && (s[key] !== 'custom' || !!s[key + 'Custom'].trim());
export const complete = s => ['cafe', 'food', 'film'].every(k => stepDone(s, k)) && TIME.test(s.time);

export function dateLabel() {
  return new Intl.DateTimeFormat('vi-VN', {weekday:'long', day:'numeric', month:'numeric', timeZone:'Asia/Ho_Chi_Minh'}).format(new Date(DATE + 'T12:00:00+07:00'));
}

// Thời gian di chuyển ước lượng giữa hai điểm theo cụm khu vực.
function travel(a, b) {
  const ca = a?.cluster || 'custom', cb = b?.cluster || 'custom';
  const near = new Set(['aeon', 'duong-noi']);
  if (ca === cb && ca !== 'custom') return 5;
  return near.has(ca) && near.has(cb) ? 5 : 15; // quán sát AEON: Dương Nội, FLC Garden City
}
const toMin = hm => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };
const fmt = n => `${String(Math.floor(n / 60) % 24).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
const ADS = 17; // quảng cáo trước phim ở CGV

// Lịch trình gồm các điểm dừng (stop) và khoảng nghỉ giữa chúng (gap: di chuyển, đi dạo, lượn lờ).
export function itinerary(s) {
  let t = toMin(s.time);
  const cafe = byId(s.cafe), food = byId(s.food), cinema = {cluster:'aeon'};
  const film = films.find(f => f.id === s.film);
  const items = [];
  const stop = (key, icon, title, sub, minutes, place, extra = {}) => { items.push({type:'stop', key, icon, title, sub, start:fmt(t), end:fmt(t + minutes), place, pending:!stepDone(s, key === 'walk' ? 'film' : key), ...extra}); t += minutes; };
  const gap = (title, minutes) => { if (minutes <= 0) return; items.push({type:'gap', title, start:fmt(t), end:fmt(t + minutes), minutes}); t += minutes; };
  const foodSub = food ? `${cuisines[food.cuisine] ? 'Món ' + cuisines[food.cuisine].title + ' · ' : ''}${food.inAeon ? 'trong AEON' : food.area}` : 'Ăn tối cùng nhau';
  const dinner = () => stop('food', '🍜', pickName(s, 'food') || 'Bữa tối', foodSub, 90, food);
  const movie = (waitLabel = 'Lượn AEON, mua bắp nước', minLead = 0) => {
    const ready = t + minLead;
    const show = film?.times?.map(toMin).find(m => m >= ready);
    const late = show !== undefined && show - t > 90; // suất gần nhất cách giờ hẹn quá xa
    const start = late ? ready : show ?? ready;
    if (start - t >= 10) gap(waitLabel, start - t);
    t = start;
    const sub = !film ? 'CGV AEON Hà Đông'
      : show === undefined ? 'Chưa có suất phù hợp, chọn giờ khác nhé'
      : late ? `Không có suất gần giờ này (gần nhất ${fmt(show)}), chọn phim khác nhé`
      : 'Suất ' + fmt(show) + (film.tags?.[fmt(show)] ? ' · phòng ' + film.tags[fmt(show)] : '') + ' · CGV AEON Hà Đông';
    stop('film', '🎬', pickName(s, 'film') || 'Một bộ phim', sub, (film?.minutes || 105) + ADS, cinema, {noShow:!!film && (show === undefined || late)});
  };
  const coffee = (minutes = 90) => stop('cafe', '☕', pickName(s, 'cafe') || 'Một góc cafe', cafe ? (cafe.inAeon ? 'trong AEON' : cafe.area) : 'Ngồi nói chuyện', minutes, cafe);
  if (s.film !== 'none' && s.order === 'film-cafe') {
    movie('Gặp nhau ở AEON, mua bắp nước', 10);
    gap('Di chuyển sang quán cafe', travel(cinema, cafe));
    coffee(75);
    gap('Đi dạo, lượn lờ rồi qua quán', 30 + travel(cafe, food));
    dinner();
    return items;
  }
  coffee();
  if (s.film === 'none') {
    gap('Đi dạo, lượn lờ rồi qua quán', 45 + travel(cafe, food));
    dinner();
    stop('walk', '✦', 'Đi dạo buổi tối', 'Công viên Thiên Văn Học, gần AEON', 45, null);
  } else if (s.order === 'film-first') {
    gap('Di chuyển sang AEON', travel(cafe, cinema));
    movie();
    gap('Di chuyển, đi dạo nhẹ', 20 + travel(cinema, food));
    dinner();
  } else {
    gap('Đi dạo, lượn lờ rồi qua quán', 45 + travel(cafe, food));
    dinner();
    gap('Di chuyển sang AEON', travel(food, cinema));
    movie();
  }
  return items;
}

export function routeLink(s) {
  const stops = itinerary(s).filter(i => i.type === 'stop').map(i => i.key === 'film' ? AEON.address : i.place?.address && `${i.place.name}, ${i.place.address}`).filter(Boolean);
  if (stops.length < 2) return null;
  const q = new URLSearchParams({api:'1', origin:stops[0], destination:stops[stops.length - 1], travelmode:'driving'});
  if (stops.length > 2) q.set('waypoints', stops.slice(1, -1).join('|'));
  return 'https://www.google.com/maps/dir/?' + q.toString().replace(/\+/g, '%20');
}

export function responseText(s) {
  const lines = itinerary(s).filter(i => i.type === 'stop').map(i => `${i.start}  ${i.icon} ${i.title}`);
  return `Kèo cuối tuần của tụi mình ♡\n${dateLabel()} · Hà Đông\n\n${lines.join('\n')}\n${s.notes.trim() ? '\nLời nhắn: ' + s.notes.trim() + '\n' : ''}\nHẹn gặp nhé!`;
}
