# Anju Board

## The world
Friday, 9:40 PM, inside a gray, nearly windowless one-story box on a Kaka'ako back street (facts 162, 170). Outside is "as sketchy as ever"; inside is lit (165). The light is tungsten and TV glow: eight large screens running K-pop videos over white booths (162, 171). On the table is the whole brief: a half watermelon with the insides carved out, soju and ice floating in the juice (181); a sweating 40-oz Hite "pitcher" with chilled mugs (190, 214); foil-lined baskets of gochujang and garlic-soy wings and kimchee fries (135, 133); a laminated menu tacky from somebody's strawberry soju (153). Two ordering cultures share one table: locals get fried chicken and tacos, Korean regulars get spicy squid and rabbokki (139). The 2010 Star-Advertiser called it "a strange bird" with "an electric color scheme" (114); a guide called it "a slice of Korea in Honolulu" with a "ridiculous name" (143). This direction treats the website like the thing you actually look at here: the menu board.

## Palette
| Token | Hex | Role |
|---|---|---|
| Ink | `#121008` | Page ground; warm tungsten-black |
| Laminate | `#F2E9D8` | Light plate (the menu sheet); light text on Ink |
| Chilled | `#FAF8F2` | Body text on Ink; the mug |
| Tungsten | `#FFB454` | Labels, prices, rules; bulb light |
| Glass | `#9BE0AC` | Bottle highlight; small labels on Ink |
| Bottle | `#2F7D4F` | Soju-bottle green plate; decorative only |
| Rind | `#0E3B24` | Deep green plate that carries light copy |
| Melon | `#FF5A6E` | Watermelon flesh; headlines and fills |
| Gochujang | `#C8201E` | Sauce red; stamps, rules; decorative only |

Text/background pairs (computed):

| Use | Text | Background | Ratio |
|---|---|---|---|
| Body, dark sections | Chilled | Ink | 17.9:1 |
| Body, menu sheet | Ink | Laminate | 15.8:1 |
| Body, rooms panel | Laminate | Rind | 10.4:1 |
| Labels, prices | Tungsten | Ink | 10.8:1 |
| Hangul tags | Glass | Ink | 12.4:1 |
| Labels on sheet | Rind | Laminate | 10.4:1 |
| Headlines 24px+ | Melon | Ink | 6.3:1 |
| Headlines on sheet | Gochujang | Laminate | 4.7:1 (large only) |
| Headlines on Rind | Tungsten | Rind | 7.1:1 |

Decorative-only plates: Bottle (3.8:1 against Ink, never carries text); Gochujang as a fill (stamps and 36px+ words only); Melon as a fill (only the one 36px word inside the watermelon). Body copy sits only on Ink, Laminate or Rind.

## Typography
- **Display:** Archivo Black, `ofl/archivoblack`, 400. The poster voice.
- **Text:** Archivo, `ofl/archivo`, variable at 400/500/700.
- **Hangul display:** Black Han Sans, `ofl/blackhansans`, 400. Its squared, heavy Hangul sits level with Archivo Black at equal cap height.
- **Numbers:** Space Mono, `ofl/spacemono`, 400/700. Tabular figures for prices, hours and the 3-hour room blocks.

375px scale (clamped up on desktop):
- Hero wordmark: Archivo Black 72px/0.9, −0.03em, uppercase; Hangul line beneath, Black Han Sans 40px.
- H2: Archivo Black 36px/1.0, −0.02em, uppercase.
- H3 (item names): Archivo 700, 20px/1.15, sentence case.
- Body: Archivo 400, 17px/1.5, max 34em.
- Label: Archivo 500, 12px, +0.12em, uppercase; prices Space Mono 14px.

Case rules: display is uppercase; anything a person reads to decide is sentence case. Italics for quotes only.

Hangul, sparingly and honestly: 안주 (anju) heads the menu board because the bar's food is described as anju (143); 오리궁뎅이 sits under the wordmark because the name is literally "oh ri goong deng ee" (147, 149); 노래방 tags the rooms. Each word gets its romanization and a one-line gloss, so the local who ordered tacos reads the same page as the regular who ordered rabbokki (139). The owners are Korean (147); this is their vocabulary.

## Motion language
1. **Sweat.** Load, hero only. Six 2–3px Laminate dots on the Pitcher slide 20px down and fade, 1800ms, `cubic-bezier(.4,0,.2,1)`, staggered 220ms, two loops then stop. Reduced motion: dots drawn at rest.
2. **Pour.** Menu sheet enters viewport (IntersectionObserver, once). Sheet revealed top-to-bottom with `clip-path: inset()`, 520ms, `cubic-bezier(.2,.8,.2,1)`. Reduced motion: sheet is fully visible by CSS default; JS adds the hidden state only when motion is allowed.
3. **Stamp.** H2 enters viewport. The Gochujang stamp scales 1.15→1 with 2° rotation, 260ms, `cubic-bezier(.34,1.56,.64,1)`. Reduced motion: at rest.
4. **Queue tick.** Rooms section on screen. The Song Queue advances one row every 2400ms (`translateY`, 300ms ease-out). Reduced motion: static five-row list.
5. **Bulb warm.** Desktop hover/focus on a menu row: background Ink→`#1C1708`, 150ms linear; price goes 700 weight. Reduced motion: color change, no transition.
6. **Chip flip.** Tap a gated-price chip: "— ask" expands inline to "Price not confirmed; ask at the bar," 200ms ease-out. Reduced motion: instant.

No parallax, no scroll-linked transforms, no sticky sections on mobile; the only fixed element is a 48px bottom bar with Call and Book.

## Section by section
**Hero.** 375: Ink. Top-left label "Kaka'ako · 5 PM–2 AM" in Tungsten (12). "CAFÉ DUCK BUTT" stacked on three lines, Archivo Black 72px, Laminate, flush left; 오리궁뎅이 in Glass beneath; then 17px Chilled: "Korean tapas, flavored soju, private karaoke rooms. Off Ward, near the Blaisdell." (26, 25, 155). The Pitcher device bleeds off the right edge, sweating. Desktop: wordmark across 7 columns, Pitcher full-height in 5, first menu rows peeking at the fold. Photo slot: a 16:9 "the bar at 9 PM" just below the fold.

**What this is.** 375: Rind plate, Laminate text. H2 "A strange bird" (114). Three short paragraphs: the name and its meaning (147, 149, 99); brothers-in-law Jin Hong and Henry Yoon since 2010 (144, 207); what they changed: a dozen-plus soju cocktails and Korean tacos (207, 138). Desktop: copy left, Stamp panel right. Photo slot: 4:5 "the owners at the bar" (153 describes that exact 2010 picture).

**The menu board (the page's hero).** 375: a Laminate sheet in a 4px Bottle frame with 1px Gochujang rules, so it reads as the laminated card. Header 안주 ANJU in Gochujang. Full-width rows: name (700), one-line description, Space Mono price on a dotted leader. Items: Famous Duck Butt Chicken (196; "parchment-thin and crackly," 203), Kimchee Fries (134), Spicy Gochujang and Garlic Soy Wings (135), Kim Chee Pancake (203), Bacon Kimchi Fried Rice (137), Korean Tacos (191, 211), Spicy Gizzards (217), Mandoo (197). Sub-head "What the regulars order": spicy squid, rabbokki (139). Every price is an em-dash with a Tungsten "ask" chip until confirmed (delivery prices 194–199 conflict). Desktop: 60/40 split, Watermelon device in the right column. Photo slot: 1:1 "basket" inside the sheet.

**Soju & drinks.** 375: Ink. H2 "Soju out of a watermelon" (112). Watermelon device full width. Flavor list as wrapping Glass labels: watermelon, strawberry, yogurt, Skittles, lilikoi, taro, Melona, li hing, cereal milk, mango (129, 130, 132, 184, 185). Quote in Chilled 20px: "tastes just like watermelon juice .. until it hits you" (98). Rows for big-bottle Hite and soju pitchers (214, 131). Happy hour 5–8 as a stamp (11, 192); the dollar ranges are gated. Desktop: Watermelon left, list right. Photo slot: 4:3 "the half watermelon."

**The rooms & booking.** 375: Rind plate. H2 "노래방 · Private rooms." Copy: machine, couch, and a phone to call for the check (119); 3-hour blocks, 5–8 or 8–11 (120); reserve Friday and Saturday (8); birthdays and bachelorette groups (123, 31). Song Queue device beneath. One CTA: "Call to book a room," number as text, (808) 593-1880 (21), `tel:` only when flagged. Per-song price conflicts (172), so: "per-song pricing: ask." Desktop: queue left, copy right. Photo slot: 3:2 "inside a room."

**The scene.** 375: Ink. Verbatim lines set as menu rows with a Space Mono source tag: "Awesomeness, silliness, just plain fun." (88); "If the name makes you smile, so will the soju!" (92); "K-Pop, Karaoke and Korean Food....What Could Go Wrong??" (91); "a slice of Korea in Honolulu" (89). Counts row in Tungsten: 616 Yelp reviews, 1,145 photos (44); Hale 'Aina Bronze, Best Bar Food, 2018 (166).

**Find us.** 375: Laminate sheet (the menu's back page). 901 Kawaiaha'o St, Honolulu 96814 (58) with map link; 5 PM–2 AM nightly (12, 46), with a note that Sunday differs on some listings (13, 14) until confirmed; phone as text; parking: street, validated, valet listed (16), "free valet" gated (17). Desktop: three columns.

**Footer.** Ink, 12px Tungsten: 오리궁뎅이 · since 2010 · "Site concept by Kevin Osborne."

## Graphic devices
1. **The Pitcher.** SVG outline (2px Laminate stroke) of a tall 40-oz bottle, Bottle fill to 70%, one Glass highlight stripe, a Rind label rectangle reading "HITE" in Archivo Black (214, 190). Sweat dots are `<circle>`s animated in CSS.
2. **The Watermelon.** Half-circle in Melon, flat side down, with a 10px Laminate inner rind and a 14px Bottle outer rind; six Ink seed ellipses; two 3px Tungsten straws crossing out the top; "SOJU" in Ink Archivo Black 36px set into the flesh (181).
3. **The Laminated Sheet.** Laminate panel, `border: 4px solid` Bottle, 1px Gochujang inner rule, dotted leaders via repeating `radial-gradient`, one corner "peeled" with a Gochujang `clip-path` triangle.
4. **The Song Queue.** 40px rows alternating Ink and `#1C1708`, Space Mono index, title, Glass "NOW" tag on row one. Rows read "Room 1 · 8–11 PM" and so on (120).
5. **The Stamp.** Gochujang rounded `<rect>` rotated −3°, Laminate inset stroke, Archivo Black uppercase (HAPPY HOUR 5–8, BRONZE 2018, ASK).

## Why this is not the default
Not near-black plus one acid green: the ground is tungsten-black and the accents are four objects on the table (bottle green, melon pink, gochujang red, bulb amber). Not cream-terracotta-serif: the light plate is a laminated card framed in bottle green, set in a grotesk with mono prices. No gradient hero; the hero is typesetting and a bottle. No emoji markers; the stamp carries section signals. Nothing centered except the word inside the watermelon. No rounded cards with accent bars; containers are sheets with rules and leaders. No neon tube: the press says "neon-lit" (163), but the reader feels it through Melon-on-Ink headline contrast, not a glowing sign.

## The counter moment
First three seconds on a phone: a wall of Laminate type, CAFÉ DUCK BUTT, with 오리궁뎅이 in green beneath it and a pitcher sweating down the right edge. The "that's us" beat is the menu board: the owner sees his own items set like a real menu with dotted leaders, Famous Duck Butt Chicken at the top, a watermelon with two straws beside it, and then "What the regulars order: spicy squid, rabbokki."

## Risks
- **Hangul reads as pastiche.** Three words only, each translated and sourced; Black Han Sans is a Korean-designed face, not a "chop suey" display font.
- **Laminate sheet drifts toward the cream default.** Grotesk only, bottle-green frame, red rules; fall back to a cooler `#EFEAE0` if it still feels soft.
- **Gated prices look unfinished.** The "ask" chip is designed as a stamp so dashes read as deliberate; flags flip in `js/site.js` the night the owner confirms.
- **Melon at 6.3:1 tempts someone to use it for body.** `tools/contrast.js` fails any body element over Melon, Bottle or Gochujang.
- **Font weight.** Four families subset to Latin plus the 11 Hangul glyphs on the page; target under 120 KB woff2.
- **Animations on a hot phone at the bar.** Transform and opacity only, paused off-screen, removed under reduced motion.

---
Palette: [{"hex": "#121008", "role": "Ink \u2014 page ground, warm tungsten-black"}, {"hex": "#F2E9D8", "role": "Laminate \u2014 light plate (menu sheet) and light text on Ink"}, {"hex": "#FAF8F2", "role": "Chilled \u2014 body text on Ink"}, {"hex": "#FFB454", "role": "Tungsten \u2014 labels, prices, rules"}, {"hex": "#9BE0AC", "role": "Glass \u2014 soju-bottle highlight, small labels on Ink"}, {"hex": "#2F7D4F", "role": "Bottle \u2014 soju-bottle green plate, decorative only"}, {"hex": "#0E3B24", "role": "Rind \u2014 deep green plate that carries light copy"}, {"hex": "#FF5A6E", "role": "Melon \u2014 watermelon flesh, headlines and fills"}, {"hex": "#C8201E", "role": "Gochujang \u2014 sauce red, stamps and rules, decorative only"}]
Fonts: [{"ofl_dir": "archivoblack", "role": "display", "weights": "400"}, {"ofl_dir": "archivo", "role": "text", "weights": "400, 500, 700 (variable)"}, {"ofl_dir": "blackhansans", "role": "Hangul display", "weights": "400"}, {"ofl_dir": "spacemono", "role": "numbers and prices", "weights": "400, 700"}]
