# Cafe research v3 (15/10/2026)

Ranking: spacious, airy, trees or garden, lake view, looks good on a first date. The list in `venues.json` is ordered best-first: 9 venues outside AEON, then Starbucks and Highlands inside AEON as backups.

## Method and sources
- **Google Maps** (public place-preview endpoint, fetched 15/10/2026) gave rating, count, Saturday 17/10/2026 hours, "Đang mở cửa" status, dated reviews and photos. Scripts are in `scratchpad/v3-cafe/` (`pinfo.py`, `gph.py`, `revs.py`, `build.py`); the earlier scripts were reused read-only. Review dates come from review timestamps, not "x tháng trước".
- **TikTok**: the `/discover/...` pages return only the app shell, with no video data when fetched without a browser. oEmbed returned **429/503 or timed out** (rate-limited). TikTok evidence was gathered through web search restricted to tiktok.com, and video dates were decoded from the video ID. No TikTok thumbnails were used.
- **Claude-in-Chrome**: the extension was not connected, so no browser was used.
- **Facebook / Instagram / Lemon8**: not fetched directly (login walls). Facebook page URLs were found through web search: Đá Ong, TORII, Ucity.
- **Press**: AN'Garden press photos come from thespaces.com (Le House design article, 22/03/2018). They are labelled as 2018 photos in the captions.
- **Photos**: all 1000px wide or more, mostly Google Maps uploads at `=w1600`. Each was checked on contact sheets. Spaces and views come first, then one drink. No menus, receipts or face-dominant shots.
- **Distance**: straight line × 1.35 at about 22 km/h to CGV AEON Hà Đông (20.98842, 105.75063). These are estimates, not routed.

## User-suggested venues
- **Đá Ong Coffee & Tea** (A20-BT6, Văn Quán): **verified and ranked #1.** It is open, renovated and reopened around 4–5/2026, and has a big wooden deck under trees right on the lake plus 2 indoor floors. Rated 4.1 (302). Drink reviews are mixed (one 1★ in 6/2026 about drinks and cleaning smell). One review says it can be busy with kids on weekends, and you collect your own order when the buzzer rings.
- **Kontact Coffee** (M09 Lô 25 Dương Nội): **verified and open** (4.5, 271, reviews through 8/2026). It is a white villa with a small front yard. It has no lake view, few trees and a workspace feel. Kept at the bottom of the list because the user asked for it, but it fits the spacious / garden / view brief less well.

## AN Bistro naming history
- 2018: **AN'Garden Café**, 56 BT8 Hồ Văn Quán, designed by Le House (press coverage).
- About 2022: TikTok still calls it "An Garden Cafe – 56 BT8".
- About 11/2024: TikTok @oniiiiiic_ introduces "Eden Garden Cafe & Bistro" as a very spacious café on Hồ Văn Quán. Recent Maps photos show "EDEN GARDEN" placemats and Wi-Fi name, and the drink "Eden passionate".
- Now: the main Google listing (1,461 reviews) is named **"AN BISTRO & CAFE"**. A separate owner-claimed listing **"Eden garden cafe & bistro"** sits at Lô 58BT8 (4.1, 109; hours 09:00–22:00; 5★ reviews 6–7/2026).
- So all three names are the same building, which may have a new operator. A 7/2026 review says the place has "xuống cấp rất trầm trọng… có thể là sang nhượng". Treat it as accepted but medium confidence.

## Excluded and why
- Already rejected by the user: Cheka, Kaki, Xanh Cafe, Amóre, Cúc Cu Quán, Mộc Lab, The Cozy Village, Laika.
- **ATC Coffee Music** (TikTok "quán ngập tràn hoa gần AEON", 1/2026): Google Maps now shows it as **temporarily closed**. It has no hours and offers "Mở cửa lại địa điểm này". It moved from Mộ Lao to An Vượng.
- **Hanashi Coffee Dương Nội**: a pretty villa facing Công viên Thiên Văn Học (4.0, 140), but it has a ball pit for kids on floor 2. Excluded because the user ruled out kid venues.
- **Sooléa** (Phan Hiền, Dương Nội; 4.2, 129): a big new multi-floor villa about 1.6 km from CGV with a trendy interior. No garden or view, and a review complains about drinks and paid seeding. **Alternative if a big modern place near AEON is wanted.**
- **Sala Coffee Chân Y Văn Quán** (4.5, 79): lakeside porch and a lit-up tree, described as spacious with a lake view. Photos are weak (mostly plastic-cup drinks), and drink reviews include one rating of "1/10". **Possible add-on if more lake options are needed.**
- **Kaana Coffee** (4.4, 392): on the corner by the lake, 2 floors. Photos show a street-facing glass box with partial lake view, and there is a complaint about strong cleaning-chemical smell.
- **An Hội An Cà Phê Văn Quán** (4.3, 120): big, bright, 2 floors with a terrace, and busy with recent reviews. Its yellow Hội An lantern theme risks reading as "phèn", and it is a chain.
- **Spero** (small, "không gian hơi bé"), **NHIỆT** (small, mixed reviews), **MONOCLE**, **Paradise** (3.0★), **1990 Coffee** (3.6★), **Đảo Matcha** (a reviewer says "không quá rộng"), **The Peak Club** (narrow townhouse), **I'M HANOI** (kitschy decor), **Mọt Coffee** (book café, no garden), **Keiko**, **E'mu**, **Lado** (kids' play area), **Chang Cafe** (most reviews 1–2 years old, limited hours), **Hạ Phố** (most reviews 5 years old).
- **Tropical Forest Coffee Văn Quán**: it appears on TikTok, but no Google Maps listing was found by name, so its status couldn't be verified.

## Caveats
- **Torii Rooftop** has only 41 reviews. Most are from 2025; the latest (9/2026) is 3★ and complains about staff. The lake view is the best of all the venues, but it is a rooftop, not a huge venue.
- **October Coffee**'s Maps hours say "Mở cửa cả ngày" for Saturday. The sign and TikTok say 07:30–23:00, so confirm before going.
- **Mori** has a kids' play corner. Recent reviews are sparse (latest 6/2026).
- Lake venues are about 17–19 minutes from CGV by motorbike. Saturday-evening traffic on Tố Hữu could push that past 20 minutes. The closest strong options are Kén (about 4 minutes) and Ucity (about 5 minutes).
- Starbucks and Highlands data and photos are carried over from v2 (14/10/2026).
