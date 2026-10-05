# Backlit: the lit box on Kawaiahaʻo

Fact ids below are `F#n`, the zero-based index into `research/all-facts.json`.

## The world

It is 1 a.m. on a back street of Kakaʻako. The building is gray, one story, nearly windowless, with a comic duck on the sign (F#162); the outside is "as sketchy as ever, Kakaʻako gentrification be damned" (F#165), "a block off Ward Avenue" (F#163). The only light on the block is the sign box: backlit vinyl in flat red, green and white, the kind every Korean hof hangs over a roll-up door. Through the door, the "electric color scheme" the Star-Advertiser saw in 2010 (F#114), eight TVs playing K-pop (F#162, F#171), a bartender pouring strawberry soju (F#115). Sound is the thump from the rooms in back, a 40-oz Hite hitting a chilled mug (F#190), a car idling for the valet (F#17, gated). The page is that building seen from the street: asphalt, one lit box, printed matter on the door, and the name in the language the owners say it in, "oh ri goong deng ee" (F#147).

## Palette

| Hex | Name | Role |
|---|---|---|
| `#121014` | Asphalt | Page ground, warm near-black |
| `#1C1A20` | Wet Tar | Raised panels |
| `#F4F1E8` | Backlit Vinyl | The lit sign face; text on dark |
| `#C8C2B4` | Vinyl Dim | Secondary text on dark |
| `#15121A` | Ink | Text on vinyl |
| `#E0202A` | Sign Red | Hof-sign red: headlines, rails, frames |
| `#1F9D63` | Bottle Green | Soju-bottle green: rails, rind |
| `#F2A51A` | Sodium | Streetlight amber: spill, small labels |
| `#FF4F6E` | Watermelon | Flesh of the half watermelon (F#181) |

| Use | Text / background | Ratio |
|---|---|---|
| Body, dark | Backlit Vinyl / Asphalt or Wet Tar | 16.8:1 / 15.3:1 |
| Body, lit | Ink / Backlit Vinyl | 16.4:1 |
| Captions | Vinyl Dim / Asphalt | 10.7:1 |
| Small labels | Sodium / Asphalt | 9.2:1 |
| One-line label on amber tag | Ink / Sodium | 9.0:1 |
| Headlines, Anton ≥ 40px only | Sign Red / Backlit Vinyl, either way | 4.2:1 (large AA) |
| Display numerals | Watermelon / Asphalt | 5.9:1 |

Decorative only, never under body copy: Sign Red, Bottle Green, Sodium, Watermelon. Red never sets below 40px. Green never carries text (vinyl-on-green is 3.1:1).

## Typography

- **Display, Latin:** Anton, `ofl/anton`, 400. The condensed vinyl-cut sign letter. Always uppercase, line-height 0.9, tracking −0.01em at hero size, 0 at h2.
- **Display, Hangul:** Black Han Sans, `ofl/blackhansans`, 400. The heavy Korean sign face. Set solid; Hangul is never letterspaced.
- **Text:** Archivo variable with width axis, `ofl/archivo`, 400/600/700; width 100 for body, 75 for labels. Printed-matter grotesque, sentence case.
- **Receipt:** Space Mono, `ofl/spacemono`, 400/700. Tickets, hours, prices, counts; tabular numerals.

375px scale: hero `clamp(72px, 24vw, 160px)` Anton · h2 40px Anton · h3 20px Archivo 700 width 75, uppercase, 0.04em · body 17px/1.5 Archivo 400 · label 12px/1.2 Archivo 600 width 75, uppercase, 0.12em · ticket 14px Space Mono. Desktop: hero ≤ 200px, h2 64px, body 18px, measure 60–68ch.

Hangul is signage only, always with Latin beside it: 오리궁둥이 over DUCK BUTT, 안주 over the menu, 소주 over drinks, 노래방 over the rooms, 영업중 on the OPEN chip. It is honest because the owners, past and present, are Korean and hear the name in Korean (F#147), Korean customers order rabbokki here (F#139), the rooms carry Korean song lists and idol sing-alongs (F#3, F#161), and a guide calls it "a slice of Korea in Honolulu" (F#143). Hangul never carries body copy; the site reads in English. Fallback: Apple SD Gothic Neo, Malgun Gothic.

## Motion language

1. **Ballast warm-up.** First paint. The sign face ramps `opacity .2 → 1`, 900ms, `cubic-bezier(.4,0,.2,1)`, once; then the small 오리궁둥이 strip dips once (1 → .4 → 1, 240ms). Reduced motion: lit from the start.
2. **Roll-up door.** Section header enters viewport (IntersectionObserver, 30%, once): the vinyl plate reveals, `clip-path: inset(0 0 100% 0) → inset(0)`, 480ms, `cubic-bezier(.2,.8,.2,1)`. Hidden state exists only under `html.js`. Reduced motion: static.
3. **Street strip.** Address/hours ticker under the hero, `translateX(0 → −50%)`, 40s linear infinite, duplicate `aria-hidden`, pauses on hover/focus. Reduced motion and no-JS: a wrapped line.
4. **Queue step.** The song-queue ticket advances one row every 4s, `translateY(−1 row)` 400ms ease-out, then DOM rotate. Reduced motion: static list.
5. **The pour.** Watermelon enters viewport: a clip rect rises 0 → 100% of the flesh, 1.2s ease-in-out; straws fade in last. Reduced motion: full.
6. **Sticker press.** Buttons on hover/active: `translate(−2px,−2px)`, hard Ink shadow grows 2px, 120ms. Reduced motion: color swap.

No pinning, no scroll-linked transforms, no smooth-scroll hijack; every state is a finished document without JS.

## Section by section

**Hero.** 375: Asphalt ground, Sodium pool low in the frame. Sign box hung left: red rail with 오리궁둥이 in Black Han Sans; vinyl face with DUCK BUTT in Anton Sign Red, two lines at 24vw; green rail reading CAFÉ · KOREAN TAPAS · SOJU · KARAOKE ROOMS. Beneath: Anton 40px "5 PM – 2 AM" (F#12), "901 Kawaiahaʻo St, off Ward" (F#224, F#26), sticker buttons BOOK A ROOM and MENU. Desktop: box left 55%, hours/address/buttons right, street strip below. Photo slot HERO-01 (4:5 mobile, 16:9 desktop): the real sign at night replaces the SVG box.

**What this is.** Header A STRANGE BIRD (F#114) on a roll-up plate. Ink on vinyl: Korean-inspired tapas and soju since 2010 (F#155); brothers-in-law Jin Hong and Henry Yoon took over in 2010, changed the décor, kept the name (F#144); "oh ri goong deng ee," a cute word for the shape of a behind (F#147), kept because it was "catchy and easy to remember" (F#149); suppliers giggled (F#150). Desktop: two columns, duck mark right. Photo slot ABOUT-01 (1:1): the owners at the bar (F#115).

**The menu board.** Header 안주 / THE BOARD. A hof wall menu: Wet Tar rows, dotted leaders, names in Archivo 600, prices in Space Mono as "—" with an "ask at the bar" chip until confirmed. Items: Famous Duck Butt Chicken with daikon (F#196), twice-fried, parchment-thin skin (F#205, F#203); Kimchee Fries (F#134); Gochujang and Garlic Soy Wings (F#135); Kimchi Pancake, Bacon Kimchi Fried Rice (F#137); Korean Tacos (F#138); Spicy Gizzards (F#217); spicy squid and rabbokki (F#139). Sodium tag HAPPY HOUR 5–8 (F#11), prices gated (F#126). Desktop: board spans 8/12. Photo slots MENU-01/02 (1:1), inset as lit panels.

**Soju & drinks.** Header 소주 / SOJU. Half watermelon pouring, top on 375, left on desktop. Flavors as sign-box panels with alternating red/green/vinyl frames: watermelon in a half watermelon (F#181), strawberry (F#132), yogurt (F#186), Skittles (F#129), lilikoi, taro (F#130), Melona, li hing, cereal milk (F#184). By the pitcher or carafe (F#131, F#182); 40-oz Hite, chilled mugs (F#190). Ticket pull quote: "tastes just like watermelon juice .. until it hits you" (F#98). Prices gated. Photo slot DRINKS-01 (4:5): the watermelon on the bar.

**The rooms & booking.** Header 노래방 / THE ROOMS. A vinyl panel in the dark, a lit box within the box: private rooms with a couch and a phone to call staff (F#119); songs in English, Japanese and Korean (F#3); birthdays and bachelorettes (F#123). Booking ticket: "Call (808) 593-1880" as text (F#21; `tel:` behind the verified flag); "Fridays and Saturdays, reserve" (F#8); 3-hour blocks (F#120) and per-song price (F#172, conflicting) behind "ask us" chips; no room count (F#6 vs F#213). Song-queue ticket right on desktop, below on 375. Photo slot ROOM-01 (16:9).

**The scene.** Header IN-THE-KNOW LOCALS (F#152). Quotes as printed labels stuck to the door, rotated ≤ 2°, vinyl on Asphalt with hard Ink shadows: "If the name makes you smile, so will the soju!" (F#92); "K-Pop, Karaoke and Korean Food… What Could Go Wrong??" (F#91); "a slice of Korea in Honolulu" (F#143); "a night out in Kakaʻako isn't complete unless you finish at" (F#167). Count tickets: 3.7 stars, 616 reviews (F#45); 3,213 likes, 26,897 check-ins (F#81); Hale ʻAina Bronze, Best Bar Food 2018 (F#166). 375 single column; desktop two offset columns, never an equal-card grid.

**Find us.** Header 영업중 / FIND US. Vinyl ticket: 5 PM – 2 AM, days behind a "confirm Sunday" chip (F#13, F#14); 901 Kawaiahaʻo St with map link; phone as text; parking: street, validation (F#16), valet gated (F#17). Device: a schematic strip, not to scale: Ward Ave crossing Kawaiahaʻo, a lit dot at 901, an arrow to Blaisdell (F#25, F#163). Desktop: ticket left, strip right.

**Footer.** Duck mark, "오리궁둥이 · Since 2010" (F#38), hours again, "Site concept by Kevin Osborne" in Vinyl Dim. No social links until verified (F#43).

## Graphic devices

1. **The sign box.** Backlit Vinyl rectangle, `background: linear-gradient(135deg,#fff 0%,#F4F1E8 55%,#E6E2D6 100%)` for uneven backlighting, 6px Sign Red frame, 28px rails top (red) and bottom (green), `box-shadow: 0 0 80px rgba(244,241,232,.18)` for spill, a Sodium pool below via `radial-gradient(60% 40% at 50% 100%, rgba(242,165,26,.28), transparent)`. Hero, headers, flavor panels, OPEN chip.
2. **The ticket.** Vinyl panel in Space Mono, perforated top edge via `mask: radial-gradient(circle at 8px, transparent 5px, #000 6px) 0 0/16px 100%`, dashed Ink rules, dotted leaders; gated values print "—" plus a chip. Hours, booking, counts, song queue.
3. **The half watermelon.** SVG 320×200: rind semicircle `#15603C`, 8px vinyl pith arc, Watermelon flesh, 14 Ink seed ellipses along the arc, four ice cubes (vinyl rounded squares, 2px Ink stroke, 60% opacity), two striped straws at 12°. Flesh in a `<clipPath>` for the pour.
4. **The duck mark.** A duck from behind: body circle r=40, tail a 30° wedge up-right from two o'clock, head circle r=16 peeking left, two foot stubs. Three fills, red, green, Sodium, offset 3px like misregistered vinyl. Favicon, section ticks, footer.
5. **The street.** One Sodium pool per section at alternating corners, 10–18% opacity, a 1px Vinyl Dim curb rule at 8% between sections. All gradients, no textures.

## Why this is not the default

Not near-black plus one acid green: warm asphalt with four flat sign colors from hof signage and the bottle, and a light surface that is vinyl, not white. Not a purple-blue gradient hero: a typographic sign box on a black street. Not cream, terracotta, serif: no serif anywhere; Anton and Black Han Sans are sign type. Not Inter: Archivo and Space Mono. Not centered: everything hangs left off the sign-box edge. Not rounded cards with accent bars: square panels framed like sign boxes or perforated like tickets, hard offset shadows, no radius. Not glassmorphism: nothing is translucent except light spill. Not emoji markers: the duck mark and Hangul rails tick the sections. Not the neon-tube cliché: type never glows, the box glows; "neon-lit" (F#209) becomes backlit vinyl, which is what a Korean hof sign actually is.

## The counter moment

First three seconds on a phone: black, then the sign warms up and 오리궁둥이 flickers once above DUCK BUTT in sign red at 24vw. Mr. Hong reads his bar's name in Korean before he reads it in English. That is the "whoa." Then the green rail and 5 PM – 2 AM in the same letters as the sign. "That's us" arrives on the first thumb-scroll: A STRANGE BIRD, the suppliers giggling at the name (F#150), the watermelon pouring, a room with a couch and a phone (F#119), and a quote he has heard across his own bar: "If the name makes you smile, so will the soju!"

## Risks

- **Hangul font weight.** Subset Black Han Sans to the syllables used (오리궁둥이안주소노래방영업중), under 6 KB; the system stack covers a failed load.
- **Red on vinyl is large-text only (4.2:1).** Enforce a 40px floor through a custom property; any small red uses `#B5121B` (6.1:1).
- **Warm-up reads as a broken page** on slow cell service. The sign is lit in static HTML; JS adds the pre-state only after it loads.
- **Marquee overflow and flashing.** The strip sits in `overflow:hidden; max-width:100%`, checked by verify.js; the one dip is on a small strip, nothing over 25% of the viewport flashes.
- **Valet, days open, prices, slot lengths** are gated behind flags in `site.js`; default HTML never shows a guess.
- **The sign is ours, not theirs.** The real sign has a comic duck we have not seen (F#162). The SVG box is a stand-in until HERO-01 gets the owner's photo.

---
Palette: [{"hex": "#121014", "role": "Asphalt: page ground, warm near-black (body copy in Backlit Vinyl sits on it)"}, {"hex": "#1C1A20", "role": "Wet Tar: raised panels on the ground (menu rows, ticket backs)"}, {"hex": "#F4F1E8", "role": "Backlit Vinyl: the lit sign face, the only light surface; also body text on dark"}, {"hex": "#C8C2B4", "role": "Vinyl Dim: secondary text and captions on dark"}, {"hex": "#15121A", "role": "Ink: body text on vinyl"}, {"hex": "#E0202A", "role": "Sign Red: hof-sign red for Anton headlines at 40px and up, rails and frames; decorative plate, never under body copy"}, {"hex": "#1F9D63", "role": "Bottle Green: soju-bottle green for rails, the watermelon rind and the OPEN chip rim; decorative only, never carries text"}, {"hex": "#F2A51A", "role": "Sodium: streetlight amber for light spill and small labels on Asphalt; decorative plate"}, {"hex": "#FF4F6E", "role": "Watermelon: flesh of the half-watermelon device; decorative only"}]
Fonts: [{"ofl_dir": "anton", "role": "Display, Latin: the condensed vinyl-cut sign letter for the hero, h2 and sign-box faces; always uppercase", "weights": "400"}, {"ofl_dir": "blackhansans", "role": "Display, Hangul: the heavy Korean sign face for \uc624\ub9ac\uad81\ub465\uc774 and the section rails (\uc548\uc8fc, \uc18c\uc8fc, \ub178\ub798\ubc29, \uc601\uc5c5\uc911); subset to the syllables used", "weights": "400"}, {"ofl_dir": "archivo", "role": "Text: body copy at width 100, labels and h3 at width 75 (variable font with width axis)", "weights": "400, 600, 700 (variable, wdth 75-100)"}, {"ofl_dir": "spacemono", "role": "Receipt: tickets, hours, prices, counts and the song queue; tabular numerals", "weights": "400, 700"}]
