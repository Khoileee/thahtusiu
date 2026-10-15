import assert from 'node:assert/strict';
import fs from 'node:fs';
import {defaults, sanitize, itinerary, complete, responseText, routeLink} from './dist/plan.mjs';
import {venues} from './dist/venues.mjs';
import {films, cafeMoods, cuisines} from './dist/data.mjs';

assert.equal(complete(defaults), false);
assert.equal(sanitize({step:100, cafe:'fake', time:'99:99'}).step, 0);
assert.equal(sanitize({cafe:'nama-sushi'}).cafe, '', 'quán ăn không được chọn ở bước đồ uống');
const state = {...defaults, order:'dinner-first', time:'15:30', cafe:'ken-coffee-dai-mo', food:'nama-sushi', film:'street-fighter'};
assert.equal(complete(state), true);
const keys = st => itinerary(st).filter(x => x.type === 'stop').map(x => x.key);
assert.deepEqual(keys(state), ['cafe', 'food', 'film']);
assert.equal(itinerary({...state, time:'15:00'}).find(x => x.key === 'film').start, '19:30', 'khớp suất chiếu thật');
assert.equal(itinerary({...state, film:'scotty', time:'17:00'}).find(x => x.key === 'film').noShow, true, 'báo khi lỡ suất cuối');
assert.deepEqual(keys({...state, order:'film-first'}), ['cafe', 'film', 'food']);
assert.deepEqual(keys({...state, film:'none'}), ['cafe', 'food', 'walk']);
assert.equal(itinerary(state)[0].start, '15:30');
assert.deepEqual(keys({...state, order:'film-cafe', time:'14:00'}), ['film', 'cafe', 'food']);
assert.equal(itinerary({...state, order:'film-cafe', time:'14:00'}).find(x => x.key === 'film').start, '14:30', 'phim chiều');
assert.equal(itinerary({...state, order:'film-cafe', time:'14:00', film:'scotty'}).find(x => x.key === 'film').noShow, true, 'báo phim không có suất chiều');
assert.equal(defaults.order, 'film-cafe');
assert.equal(complete({...state, cafe:'custom', cafeCustom:'   '}), false);
assert.match(responseText({...state, cafe:'custom', cafeCustom:'Một góc khác', notes:'Về trước 21h'}), /Một góc khác[\s\S]*Về trước 21h/);
assert.match(routeLink(state), /destination=AEON/);
assert.doesNotMatch(responseText(state), /oat|matcha đắng|tôm|cua/i, 'không còn ghi chú cá nhân');

for (const m of cafeMoods) for (const id of m.ids) assert.ok(venues.some(v => v.kind === 'cafe' && v.id === id), `thiếu café ${id}`);
for (const c of Object.keys(cuisines)) assert.ok(venues.some(v => v.cuisine === c), `chưa có quán: ${c}`);
for (const v of venues) {
  assert.ok(v.photos.length >= 2, `${v.id} thiếu ảnh`);
  for (const p of v.photos) assert.ok(fs.existsSync('dist/' + p.src), `thiếu ${p.src}`);
  assert.ok(fs.existsSync('dist/' + v.photos[0].src.replace('.webp', '-s.webp')), `thiếu ảnh bìa ${v.id}`);
}
for (const f of films) assert.ok(fs.existsSync('dist/' + f.image));
for (const f of ['index.html', 'style.css', 'app.mjs', 'assets/hero.webp']) assert.ok(fs.existsSync('dist/' + f));
console.log(`PASS: ${venues.length} quán, lịch trình 3 kiểu, nội dung tự nhập, link chỉ đường, ảnh đầy đủ.`);
