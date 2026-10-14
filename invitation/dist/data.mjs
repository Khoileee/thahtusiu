export const CHECKED = '14/10/2026';
const aeon = slug => `https://aeonmall-hadong.com.vn/cua-hang/${slug}/`;
export const cafes = [
  {
    "id": "an-garden",
    "name": "AN’ Garden",
    "subtitle": "Kính, nắng & khoảng xanh",
    "location": "56 BT8 Hồ Văn Quán, Hà Đông, Hà Nội",
    "image": "an-garden.webp",
    "imageLabel": "Ảnh kiến trúc · Hiroyuki Oki / Lê House",
    "photoSource": "https://le-house.vn/projects/19-ans-garden",
    "gallery": [
      {
        "image": "an-garden-interior.webp",
        "caption": "Không gian thông tầng · ảnh công trình 2017, Hiroyuki Oki / Lê House"
      }
    ],
    "kicker": "VĂN QUÁN · KÍNH & ÁNH SÁNG",
    "desc": "Một góc bên cửa kính, nhiều cây và khoảng trần cao để mở đầu buổi hẹn.",
    "meta": "Ưu tiên không gian · Văn Quán, xa AEON hơn",
    "price": "Khoảng 30–80k/đồ uống theo danh mục Tôi Đi Cafe; chưa phải menu giá hiện hành. Chưa xác nhận oat milk.",
    "vibe": "Khung thép đen, cửa kính lớn, cây treo và các tầng mở nối với nhau. Mình chọn nơi này vì không gian hiện đại, thoáng và có chiều sâu. Ảnh từ hồ sơ công trình 2017 của Lê House; nội thất hiện tại có thể thay đổi.",
    "note": "Xin bàn hai người gần cửa kính, hỏi độ đông và menu trước khi đi. Quán ở Văn Quán, cần đi xe sang AEON; khung hẹn chừa 45 phút sau café cho di chuyển và chuẩn bị. Nếu muốn matcha đắng, không thêm đường, oat milk, cần hỏi khả năng pha đúng yêu cầu.",
    "source": "https://toidicafe.vn/place/an-garden-cafe",
    "menu": "https://www.facebook.com/angardencafe/",
    "review": "Có khu cho trẻ nhỏ theo Tôi Đi Cafe, nên chưa thể hứa yên tĩnh vào chiều thứ Bảy. Chưa xác minh điểm Google Maps trực tiếp. Đây là lựa chọn vì kiến trúc, không phải khẳng định quán đang hot trend."
  },
  {
    "id": "meicha",
    "name": "Meicha",
    "subtitle": "Một tiệm matcha nhỏ xinh",
    "location": "7 LK6A, Mộ Lao, Hà Đông, Hà Nội",
    "image": "meicha.webp",
    "imageLabel": "Ảnh không gian · Tôi Đi Đâu",
    "photoSource": "https://toididau.net/place/meicha-matcha-ha-dong/30871",
    "gallery": [
      {
        "image": "meicha-front.webp",
        "caption": "Mặt tiền tiệm · ảnh trên Tôi Đi Đâu"
      }
    ],
    "kicker": "MỘ LAO · TIỆM MATCHA NHỎ",
    "desc": "Tông kem và xanh, bàn nhỏ cho hai người, một chiếc bảng nhắn gửi dễ thương.",
    "meta": "Ưu tiên matcha · Mộ Lao, xa AEON hơn",
    "price": "Khách kể lại mức 30–45k và 60–70k tùy dòng matcha; cần hỏi menu hiện tại và oat milk.",
    "vibe": "Ảnh có quầy nhỏ, ghế xanh và bảng giấy nhắn. Review nhắc chỗ ngồi ngoài và view hồ; ảnh chưa kiểm chứng được view.",
    "note": "Chưa xác nhận matcha đắng, không thêm đường, oat milk. Xin bàn thoáng và xem tuyến Mộ Lao → AEON trước khi chốt.",
    "source": "https://toididau.net/place/meicha-matcha-ha-dong/30871",
    "menu": "https://www.instagram.com/heymeicha/",
    "phone": "0783891997",
    "review": "Review tổng hợp khen đồ uống và tư vấn; mẫu nhỏ, chưa xác minh Google Maps trực tiếp."
  }
];
export const restaurants = [
  {id:'hang-cuon',type:'viet',name:'Hàng Cuốn',subtitle:'Cuốn Việt, ăn cùng nhau',location:'Tầng 1 · T153-2 · AEON Hà Đông',image:'hang-cuon.webp',imageLabel:'Ảnh không gian · Restaurant Guru',photoSource:'https://restaurantguru.com/Hang-Cuon-AEON-Mall-Ha-Dong-Vietnam',kicker:'MÓN VIỆT · GỌI MÓN',desc:'Cuốn, rau xanh và vài món để hai đứa cùng chia sẻ.',meta:'Menu tham khảo 2024: cuốn 159–169k / phần',price:'Menu AEON đăng tháng 6/2024 có cuốn heo 169k, nem nướng / nem lụi / bò lá lốt 159k; chưa gồm VAT. Đây là giá cũ, cần hỏi menu hiện tại.',vibe:'Ảnh cho thấy gỗ ấm, đèn mây và mặt bằng mở trong trung tâm thương mại. Hợp một bữa gọi món; chưa xác nhận độ yên tĩnh vào tối thứ Bảy.',note:'Hỏi rõ tôm/cua trong nhân, nước chấm và dụng cụ dùng chung. Một số cuốn và bánh xèo có tôm; không chọn combo mặc định.',source:aeon('hang-cuon'),menu:'https://aeonmall-hadong.com.vn/food/hang-cuon/',review:'Restaurant Guru từng tổng hợp Google 4,1/5 (292 lượt). Đây là dữ liệu bên thứ ba trong lần nghiên cứu 14/10, chưa kiểm tra trực tiếp trên Google Maps; không coi là điểm hiện tại.'},
  {id:'bo-to',type:'viet',name:'Bò Tơ Quán Mộc',subtitle:'Đổi vị với món bò',location:'Tầng 2 · T273 · AEON Hà Đông',image:'bo-to.webp',contain:true,imageLabel:'Logo thương hiệu · AEON',photoSource:aeon('bo-to-quan-moc'),kicker:'MÓN VIỆT · GỌI MÓN',desc:'Thêm một lựa chọn món Việt nếu cậu thích ăn bò.',meta:'Menu riêng của chi nhánh · cần hỏi giá',price:'AEON cho biết chi nhánh có menu riêng. Chưa xác minh được bảng giá hiện hành; không lấy giá hoặc ưu đãi ngày thường của quán ngoài mall.',vibe:'AEON mô tả cơ sở này có thiết kế mới so với các chi nhánh phố xưa. Ảnh hiện có là logo, chưa có ảnh nội thất đúng cơ sở đủ chắc để nhận xét chi tiết.',note:'Quán cũng phục vụ hải sản. Cần nhờ bếp kiểm tra gia vị, sốt và dụng cụ dùng chung cho yêu cầu tránh tôm/cua.',source:aeon('bo-to-quan-moc'),phone:'1900636882',review:'Chưa xác minh trực tiếp điểm Google Maps hoặc review gần đây của đúng cơ sở.'},
  {id:'ippudo',type:'nhat',name:'IPPUDO',subtitle:'Một tô ramen ấm',location:'Tầng 1 · T155 · AEON Hà Đông',image:'ippudo.webp',imageLabel:'Ảnh món ăn · AEON',photoSource:aeon('ippudo'),kicker:'MÓN NHẬT · RAMEN',desc:'Ramen, gyoza và một bữa tối gọn gàng trước hoặc sau phim.',meta:'Gọi món · cần hỏi menu và giá hiện tại',price:'Đã xác nhận cơ sở trong danh mục AEON. Chưa có bảng giá hiện hành đúng chi nhánh; không dùng giá từ cơ sở khác.',vibe:'Theo AEON, quán phục vụ ramen phong cách Hakata cùng gyoza và cơm. Ảnh trên thiệp là ảnh món ăn quảng bá, không phải ảnh chỗ ngồi.',note:'Hỏi thành phần nước dùng, topping, sốt và dụng cụ dùng chung. Ramen thịt heo không tự động đồng nghĩa với không có tôm/cua.',source:aeon('ippudo'),review:'Chưa có điểm Google Maps và review không gian được kiểm chứng trực tiếp.'},
  {id:'isushi',type:'nhat',name:'iSushi',subtitle:'Sushi & món Nhật',location:'Tầng 2 · T251 · AEON Hà Đông',image:'isushi.webp',imageLabel:'Ảnh món ăn · AEON',photoSource:aeon('isushi'),kicker:'MÓN NHẬT · BUFFET',desc:'Nếu cậu muốn dành nhiều thời gian hơn cho một bữa sushi.',meta:'Buffet · ngân sách cao hơn · dành 90 phút',price:'Chưa xác nhận giá buffet thứ Bảy hiện tại. Đây là phương án tốn ngân sách hơn một bữa gọi món; cần hỏi quán trước khi chốt.',vibe:'AEON liệt kê buffet sushi, sashimi và món nóng. Ảnh dùng là banner món ăn. Danh mục hiện ghi tầng 2 T251; một số nguồn cũ còn ghi tầng 1.',note:'Cá từng ăn được không có nghĩa tất cả sushi đều phù hợp. Hỏi nhân cuộn, trứng/topping, sốt và dao/thớt dùng chung với tôm/cua.',source:aeon('isushi'),phone:'02473007689',review:'Không dùng điểm hoặc giá ở trang chi nhánh cũ để khẳng định chất lượng và giá hiện tại.'}
];
export const films = [
 {id:'poppy',name:'Ngọn Đồi Hoa Hồng Anh',kicker:'NHẸ NHÀNG · HOẠT HÌNH',image:'film-poppy.webp',imageLabel:'Hình phim · MoMo Cinema',desc:'Một câu chuyện tuổi trẻ và những rung động bên thành phố biển.',meta:'91 phút · dự kiến chiếu từ 16.10',source:'https://www.momo.vn/cinema/ngon-doi-hoa-hong-anh-25142',vibe:'Hoạt hình Ghibli, nhịp kể nhẹ, có yếu tố gia đình và tình cảm. Hợp nếu cậu thích một bộ phim giàu cảm xúc để cùng nói chuyện sau đó.',note:'Thông tin phim có ngày 16/10/2026; chưa xác nhận suất ngày 17/10 tại CGV AEON Hà Đông. Chỉ chốt vé sau khi có lịch thật.',price:'Chưa chốt giá vé, định dạng và suất chiếu.',photoSource:'https://www.momo.vn/cinema/ngon-doi-hoa-hong-anh-25142',location:'Dự kiến CGV · AEON Hà Đông'},
 {id:'shaun',name:'Shaun the Sheep: “Quái Lạ” Ghé Nhà',kicker:'VUI VẺ · HOẠT HÌNH',image:'film-shaun.webp',imageLabel:'Hình phim · MoMo Cinema',desc:'Một chút tinh nghịch, một cuộc phiêu lưu với chú cừu Shaun.',meta:'Khoảng 1,5 giờ · dự kiến chiếu từ 16.10',source:'https://www.galaxycine.vn/dat-ve/shaun-the-sheep-the-beast-of-mossy-bottom/',vibe:'Hoạt hình hài phiêu lưu với không khí Halloween. Lựa chọn vui vẻ nếu cậu thích những tình huống ngộ nghĩnh hơn là một câu chuyện tình cảm.',note:'Galaxy công bố khởi chiếu dự kiến 16/10/2026. Các nguồn ghi thời lượng khác nhau; chưa xác nhận suất CGV AEON Hà Đông ngày 17/10.',price:'Chưa chốt giá vé, định dạng và suất chiếu.',photoSource:'https://www.momo.vn/cinema/shaun-the-sheep-quai-la-ghe-nha-25151',location:'Dự kiến CGV · AEON Hà Đông'}
];
export const backups = [
 {name:'Tokyo Tan Tan Ramen',place:'Tầng 3 · T334 · foodcourt, không gian chung',source:aeon('tokyo-tan-tan-ramen')},
 {name:'Marukame Udon',place:'Tầng 1 · T150–151 · udon tự phục vụ',source:aeon('marukame-udon')},
 {name:'CoCo Ichibanya',place:'Tầng 1 · T149 · cơm cà ri Nhật',source:aeon('coco-ichibanya')},
 {name:'Phương Nam',place:'Tầng 1 · T167 · món Việt miền Nam',source:aeon('nha-hang-phuong-nam')},
 {name:'Nét Huế',place:'Tầng 1 · T146 · cần hỏi kỹ tôm và gia vị',source:aeon('net-hue')},
 {name:'Vua Chả Cá',place:'Tầng 2 · T262–263 · hỏi nước chấm thay thế mắm tôm',source:aeon('vua-cha-ca')},
 {name:'Let’s Sushi',place:'53 khu A TT Quân đội, Nguyễn Văn Lộc · Mộ Lao, xa AEON hơn',source:'https://letsushi.vn/'},
 {name:'Bánh Tráng Phú Cường',place:'Hồ Gươm Plaza, 102 Trần Phú · Mộ Lao, xa AEON hơn',source:'https://banhtrangphucuong.vn/'}
];
export const mapLink = query => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
