# Korean + Thai: research notes (checked 15/10/2026)

Anchor: AEON Mall Hà Đông (20.9896, 105.7513). Distances are estimates: straight-line distance from Google Maps coordinates, converted to road distance and motorbike time.

## Method
- I read ratings, review counts, hours, price bands, review ages and photos from Google Maps search data (tbm=map JSON, fetched with curl on 15/10/2026). "Open evidence" means Google shows normal hours, no closed flag, and has reviews from the last 1–6 months.
- Listicles cross-checked: dearhanoi.com (Korean Hà Đông 8/2025; Thai Hà Đông 3/2025), emdoi.vn (4/2025), Lemon8/Threads/FB pages via web search.
- Photos are customer photos from Google Maps (lh3.googleusercontent.com, requested at `=w1600`). All are ≥1020 px on the short side or 1600 px wide. I skipped photos showing customers' faces, receipts, and photos with third-party watermarks (for example "JN Foodie" on Pogeun).

## Ranking (best first)
Korean: Galbi Roman → Pogeun → Nollowa → Don Chicken (The Linc) → Kim Mari → Meat Plus (AEON) → Dookki (AEON)
Thai: Khrua Baan Thai NVL → Khrua Baan Thai AEON → Thái La Thái La → OMG Thai → Koh Yam NVL → ThaiExpress (AEON)

Inside AEON: Meat Plus, Dookki, Khrua Baan Thai AEON, ThaiExpress.

## Excluded / not used
| Venue | Reason |
|---|---|
| Yum In Thai (48 Nguyễn Văn Lộc) | Google shows "Mở cửa lại địa điểm này", so it is probably closed. Rating 2.6/63. The address is now Kim Mari Chicken. |
| K-Pub AEON Hà Đông (Lô T153) | Google shows "Mở cửa lại địa điểm này", so it is probably closed. |
| Thai Pattaya AEON | Did not come up on Google Maps in 2026 searches, and the only sources are old listicles. Unverified, dropped. |
| Mr. Dakgalbi AEON | 3.8/243, weak. |
| GoGi House AEON (4.1/236) / Trần Phú (4.2/1036) | Chain, lower ratings than independents. A fallback only. Foody shows no activity on the AEON page. |
| King BBQ AEON | 4.3/549, open (10–22h). Fine as a buffet fallback; Meat Plus suits a date better. |
| ChiO Pocha (114 NVL, formerly ChiO Chicken Văn Quán) | 4.8/1357, but recent reviews call it mediocre or too sweet, and it closes 14:00–17:00. |
| Hugo BBQ Thanh Bình | Most reviews are about 2 years old, with recent negatives. |
| Gubdang BBQ (Geleximco, Lê Trọng Tấn) | 4.8/172, open, ~3 km. Reasonable alternate, but some reviews say the buffet meat tastes frozen. |
| Kangnam Hwekwan (Usilk City, Tố Hữu) | 4.8 but only 63 reviews, no hours listed. Closest Korean option (~2 km). Alternate. |
| Dong Gogi (The Linc) | 4.6/150, buffet 329k. Alternate next to Don Chicken. |
| SonMih BBQ (172 NVL) | 4.2/94, low. |
| Julee House (Cầu Am) | 4.0/143, casual lunch spot. |
| MARU Korean Food (138 NVL) | 3.7/648. |
| Nhà hàng Bụi Thái (Hà Cầu) | 3.7/10, small budget place. |
| KOPKHUN Thaifood (220 NVL) | 3.4/8. |
| Nymo Lẩu Thái Ếch | 4.9/967, but it is a Vietnamese-style frog hotpot canteen, not a Thai restaurant. |
| Chinese venues (Haochi Dimsum, Gongfu Chicken, etc.) | Excluded by brief. |

## Caveats
- Hours come from Google, and the parser only reads the first time range of each day. Pogeun and ChiO close between lunch and dinner. Pogeun's evening slot is about 17:00–21:30/22:00 and lunch ends 14:15/15:00, so check the schedule against the movie time.
- Khrua Baan Thai AEON has a very high 4.9 from a cluster of recent reviews, possibly helped by in-store review prompts. Google lists no hours, so assume mall hours.
- Galbi Roman's buffet prices (299k/499k) come from a 2025 Lemon8 post. Call to confirm: +84 38 598 6292 (from search results).
- Thái La Thái La is newer and has fewer reviews (304). Book ahead (0918 212 061 per fanpage); one review describes a 30-min wait on a rainy evening.
- No Instagram/TikTok handles were confirmed for these venues, so those fields are null.
