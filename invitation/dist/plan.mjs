import {cafes, restaurants, films} from './data.mjs';
export const defaults = {version:1,step:0,cafe:'',cafeCustom:'',cuisine:'viet',restaurant:'',restaurantCustom:'',film:'',filmCustom:'',order:'film-first',date:'2026-10-17',time:'15:30',notes:''};
export function sanitize(raw={}) {
 const s={...defaults};
 for(const key of ['cafeCustom','restaurantCustom','filmCustom','notes']) if(typeof raw[key]==='string')s[key]=raw[key].slice(0,key==='notes'?1200:160);
 for(const [key,list,extra] of [['cafe',cafes,['custom']],['restaurant',restaurants,['custom']],['film',films,['custom','none']]]) if([...list.map(x=>x.id),...extra].includes(raw[key]))s[key]=raw[key];
 if(['nhat','viet'].includes(raw.cuisine))s.cuisine=raw.cuisine;
 const r=restaurants.find(x=>x.id===s.restaurant);if(r)s.cuisine=r.type;
 if(['film-first','dinner-first'].includes(raw.order))s.order=raw.order;
 if(validDate(raw.date))s.date=raw.date;
 if(typeof raw.time==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(raw.time))s.time=raw.time;
 if(Number.isInteger(raw.step)&&raw.step>=0&&raw.step<=3)s.step=raw.step;
 return s;
}
export function validDate(date){if(typeof date!=='string'||!/^20\d{2}-\d{2}-\d{2}$/.test(date))return false;const d=new Date(date+'T12:00:00Z');return !Number.isNaN(+d)&&d.toISOString().slice(0,10)===date;}
export function selectedName(s,key){if(s[key]==='custom')return s[key+'Custom'].trim()||'Cậu chọn một nơi khác';if(key==='film'&&s.film==='none')return 'Bỏ qua phim, đi dạo một chút';return ({cafe:cafes,restaurant:restaurants,film:films}[key].find(x=>x.id===s[key])?.name)||'';}
export function stepValid(s,n){const key=['cafe','restaurant','film'][n];return !key||!!s[key]&&(s[key]!=='custom'||!!s[key+'Custom'].trim());}
export function complete(s){return [0,1,2].every(i=>stepValid(s,i))&&validDate(s.date)&&/^([01]\d|2[0-3]):[0-5]\d$/.test(s.time);}
export function dateLabel(date){return new Intl.DateTimeFormat('vi-VN',{weekday:'long',day:'2-digit',month:'2-digit',year:'numeric',timeZone:'Asia/Ho_Chi_Minh'}).format(new Date(date+'T12:00:00+07:00'));}
export function itinerary(s){
 const start=s.time.split(':').reduce((a,v,i)=>a+Number(v)*(i===0?60:1),0);
 const t=n=>`${String(Math.floor((start+n)/60)%24).padStart(2,'0')}:${String((start+n)%60).padStart(2,'0')}${start+n>=1440?' (+1 ngày)':''}`;
 const range=(a,b)=>t(a)+'–'+t(b);
 const coffee={key:'cafe',icon:'☕',time:range(0,45),title:selectedName(s,'cafe')||'Một góc café',sub:'45 phút · mở đầu nhẹ nhàng',pending:!s.cafe};
 const meal=s.restaurant==='isushi'?90:75;
 const dinner=(offset)=>({key:'restaurant',icon:'♧',time:range(offset,offset+meal),title:selectedName(s,'restaurant')||'Một bữa tối ngon',sub:s.restaurant==='isushi'?'90 phút · thong thả ăn buffet':'Gọi món · cùng nhau trò chuyện',pending:!s.restaurant});
 const movie=offset=>({key:'film',icon:'▷',time:'Khoảng '+t(offset),title:selectedName(s,'film')||'Một bộ phim nhỏ',sub:'Chờ suất chiếu · dự trù 105 phút',pending:!s.film});
 if(s.film==='none')return [coffee,dinner(90),{key:'film',icon:'✧',time:'Sau bữa tối',title:'Đi dạo nếu còn muốn',sub:'Cũng có thể về sớm, tùy cậu',pending:false}];
 return s.order==='film-first'?[coffee,movie(90),dinner(210)]:[coffee,dinner(90),movie(90+meal+30)];
}
export function responseText(s){return `Một chiếc hẹn của chúng mình ✦\n${dateLabel(s.date)}\nKhu vực: Hà Đông, Hà Nội\n\n${itinerary(s).map(x=>`${x.time} — ${x.title}`).join('\n')}\n\n${s.film==='none'?'Mình chọn không xem phim.':'Giờ phim là dự kiến, cùng chốt lại theo suất chiếu thật nhé.'}\n${!!s.cafe?'Đồ uống: matcha đắng, không thêm đường, oat milk (cần hỏi quán).\n':''}${s.notes.trim()?'\nLời nhắn: '+s.notes.trim()+'\n':''}\nHẹn cậu nhé!`;}
