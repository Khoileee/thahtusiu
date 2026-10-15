export const DATE = '2026-10-17';
export const AEON = {name:'AEON Mall Hà Đông', address:'AEON Mall Hà Đông, Dương Nội, Hà Đông, Hà Nội'};

// Suất chiếu CGV AEON Hà Đông ngày 17/10/2026 theo Moveek (lấy ngày 15/10/2026).
export const films = [
 {id:'street-fighter',name:'Street Fighter',kicker:'Hài · hành động · T16 · IMAX',image:'assets/film-street-fighter.webp',minutes:119,
  times:['09:30','12:00','14:30','17:00','19:30','22:00'],tags:{},
  desc:'Năm 1993, Ryu và Ken bị Chun-Li kéo trở lại một giải đấu khốc liệt. Bản phim người đóng của tựa game đối kháng huyền thoại, suất nào cũng chiếu IMAX.',source:'https://moveek.com/phim/street-fighter/'},
 {id:'trai-buon-nguoi',name:'Trại Buôn Người',kicker:'Hành động Việt · T18',image:'assets/film-trai-buon-nguoi.webp',minutes:135,
  times:['08:40','09:10','09:40','10:10','11:20','11:50','12:20','12:50','14:00','14:30','15:30','16:40','17:10','17:40','18:10','19:20','19:50','20:20','20:50','22:00','22:30','23:00'],
  tags:{'09:40':'Gold Class','12:20':'Gold Class','17:40':'Gold Class','20:20':'Gold Class','23:00':'Gold Class','10:10':"L'Amour",'12:50':"L'Amour",'15:30':"L'Amour",'18:10':"L'Amour",'20:50':"L'Amour"},
  desc:'Steven Nguyễn vào vai Ny, bị lừa vào trại lừa đảo khi đi cứu em gái rồi cùng mọi người tìm đường trốn thoát. 94% khán giả trên Moveek hài lòng.',source:'https://moveek.com/phim/trai-buon-nguoi/'},
 {id:'scotty',name:'Scotty Giải Cứu Hoàng Thượng',kicker:'Hoạt hình phiêu lưu · P · lồng tiếng',image:'assets/film-scotty.webp',minutes:80,
  times:['12:45','20:30'],tags:{},
  desc:'Chú mèo hoang Scotty bất đắc dĩ dính vào chuyến phiêu lưu cùng cô mèo nhà Katie. Nhẹ nhàng, dễ thương, 80 phút là xong.',source:'https://moveek.com/phim/scotty-giai-cuu-hoang-thuong/'}
];

export const cafeMoods = [
 {id:'lake',label:'View hồ',title:'Ngắm hồ Văn Quán',icon:'≈',ids:['da-ong','nha-go-van-quan','an-bistro-cafe']},
 {id:'garden',label:'Sân vườn',title:'Rộng rãi, nhiều cây',icon:'❀',ids:['ken-coffee-dai-mo','october-coffee-van-quan','ucity-coffee','mori-coffee']},
 {id:'near',label:'Gần rạp',title:'Đi 5 phút là tới AEON',icon:'✿',ids:['ucity-coffee','kontact-coffee','ken-coffee-dai-mo']},
 {id:'mall',label:'Trong AEON',title:'Gọn, khỏi di chuyển',icon:'☂',ids:['starbucks-aeon-ha-dong','highlands-aeon-ha-dong']}
];

export const regions = [
 {id:'asia',title:'Món Á',blurb:'Nhật, Việt, Hàn, Thái',cuisines:['japanese','vietnamese','korean','thai']},
 {id:'west',title:'Món Âu',blurb:'Pizza, pasta, steak, bistro',cuisines:['western']}
];

export const cuisines = {
 japanese:{title:'Nhật',blurb:'Ramen, sushi, cơm Nhật',icon:'🍣'},
 vietnamese:{title:'Việt',blurb:'Cuốn, bún, cơm nhà, bánh xèo',icon:'🥢'},
 korean:{title:'Hàn',blurb:'Gà rán, cơm & món nhà Hàn',icon:'🍗'},
 thai:{title:'Thái',blurb:'Pad thai, cà ri, gỏi Thái',icon:'🌶️'},
 western:{title:'Âu',blurb:'Pizza, pasta, steak, bistro',icon:'🍝'}
};
