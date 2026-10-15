# Vietnamese food: research notes (Hà Đông, around AEON Mall Hà Đông)

Retrieved 15/10/2026. Anchor point: AEON Mall Hà Đông (~20.9898, 105.7515).

## Method
- Ratings, review counts, hours, coordinates, owner descriptions, review snippets and photos come from live Google Maps place data, fetched through public Maps search and place pages. Each venue's `rating.url` is its Google reviews link.
- Distances are straight-line from AEON. Road distance is roughly 1.3–1.4 times longer. Travel times are estimates for a motorbike outside rush hour.
- Prices are mostly the "mỗi người hết bao nhiêu" (price per person) answers that reviewers give on Google. These are a few people's answers, not official prices, and are marked as such.
- To count as open, a venue needed a normal operating status on Google with hours shown for the week of 15–21/10/2026, plus customer photos or reviews from 2026. All 14 venues pass.
- Photos are customer or owner uploads on Google Maps, downloaded at 1600px wide. The PNGs were converted to JPG. Each venue has 3–4 photos, 51 in total.
- The AEON tenant list comes from the aeonmall-hadong.com.vn WP API (`/api-app/wp/v2/food`).

## Ranking logic
Ranking weighs how suitable a place is for a first date (space, cleanliness, comfort for two) together with rating and review volume. Popular but casual places are ranked lower. The top places for a date are Trường Hoàng, Phú Cường, Vua Chả Cá (AEON), Bò Tơ Quán Mộc, Nét Cuốn and Bếp Tự Tâm.

## Excluded / considered
| Venue | Reason |
|---|---|
| Nét Huế (AEON Hà Đông, T146 food court) | Google 2.7★ (284 reviews), and it sits in the food court |
| Lẩu Ba Lý (AEON) | 3.8★, and Google classifies it as Chinese |
| Meiwei, Yang Hao, Yutang, Tian Long, Dao Niu Guo, Di Fang, Haochi Dimsum | Chinese or Taiwanese cuisine (excluded by brief) |
| Sườn Mười (AEON, 4.8★/1143) | Western-style BBQ ribs, not clearly Vietnamese. Could be a backup |
| Bò Tơ Quán Mộc AEON (4.8★/675) | Not a separate entry. Listed as the in-mall alternative inside the Tố Hữu entry |
| Khói Restaurant (4.7★/231) | Pan-Asian, not specifically Vietnamese |
| Kim Kê Quán (4.9★/1127, 196 Nguyễn Văn Lộc) | Vietnamese gà nướng lu and lẩu, but aimed at parties and groups. A 2026 review describes a bad experience with a group booking. Good backup |
| Lẩu Nấm Gia Khánh (An Khang 4.6★/857; Mỗ Lao 4.8★/1311) | Pot sizes suit groups ("vừa mâm 5-6 người", enough for 5–6 people). One review says it is pricey for the quality |
| Bún Riêu Mai Cua Dương Nội (4.6★/152) | Good and close (1.7 km), but a breakfast and lunch bún shop. Backup |
| Nhà Hàng Trâu Xanh, An Đông, Hương My Trần, Quán Cá Việt Trì (An Hưng) | Group-oriented drinking-food or seafood restaurants, not much of a date vibe |
| Cuốn Sen CS2 (4.3★) | Lower rating, and a 2026 negative review |
| Bún Chả Khánh Vân (3.3★), Sinh Từ (3.5★), Cầu Đen (4.1★), Kinh Kỳ (3.9★) | Lower ratings than Bún Chả 27 |
| Phở cuốn Hương Mai (3.4–3.9★), Phở Cuốn Ngũ Xã (3.4★) | Low ratings |
| Quán Nhỏ (35B Lê Văn Thiêm, 4.8★/3195) | ~5.6 km, in Thanh Xuân, outside the target radius |
| Giang Mỹ CS1 (Hoàng Đạo Thúy) | ~5.6 km, outside the radius |
| Chả Cá Ngon Hà Nội (1 Nguyễn Văn Lộc) | Only 4.0★/109 on Google, and Vua Chả Cá is the stronger chả cá option |

## Caveats
- High-volume 4.8–4.9★ chains (Vua Chả Cá, Ngự Uyển, Bò An Khang) probably run review-incentive campaigns. The scores are real Google figures but may run optimistic.
- Phương Nam (AEON): the newest customer photo seen is from 01/2026, and fewer recent signals were found than for the others. Call ahead.
- Sành Lẩu: no public price list found, so `price_range` is null.
- boankhang.vn, the website Google lists, calls itself an unofficial demo, so it is not linked.
- Foody.vn data for Hà Đông is stale (mostly 2019–2021) and was not used for ratings.
- Hours are as shown on Google for the week of 15–21/10/2026. Saturday 17/10 matches the daily hours.
