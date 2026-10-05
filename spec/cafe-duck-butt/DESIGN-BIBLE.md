# Design bible — Backlit: the lit box on Kawaiahaʻo

Fact ids are `F#n`, the zero-based index into `research/all-facts.json`. Ideas grafted from the other directions are marked **[graft]**; judge risks are resolved inline as **[risk → resolved]**. Every claim on the page carries a fact id in an HTML comment.

## The world

"It's 1 a.m. on Kawaiahaʻo, a block off Ward. The building is gray, one story, nearly windowless, as sketchy as ever, and the only light on the block is your sign box: flat red, green and white backlit vinyl, the kind every Korean hof hangs over a roll-up door. The site is that building seen from the street. The sign warms up, DUCK BUTT fills in like a sung lyric, and above it, before it, is 오리궁뎅이, the name the way you say it. Everything else is printed matter stuck to the door: the board, the soju list, the room ticket with your phone number on the handset." (F#162, F#163, F#165, F#147, F#119.)

## Color tokens

| Token | Hex | Role | Allowed uses |
|---|---|---|---|
| `--c-asphalt` | `#121014` | Page ground | Body background |
| `--c-tar` | `#1C1A20` | Raised panels | Menu rows, footer, desktop rail |
| `--c-vinyl` | `#F4F1E8` | Backlit sign face | Light plates; primary text on dark |
| `--c-vinyl-edge` | `#E6E2D6` | Dark end of the face gradient | Gradient stop only |
| `--c-vinyl-dim` | `#C8C2B4` | Secondary text on dark | Captions, sources, credit, curb rules |
| `--c-ink` | `#15121A` | Text on light | All text on vinyl, Sodium and green; hard shadows |
| `--c-sign-red` | `#E0202A` | Hof-sign red | Type ≥ 40px, frames, rails, stamp outlines. **Decorative plate** |
| `--c-red-print` | `#B5121B` | Small red | Text < 40px on `--c-vinyl` only; never on dark |
| `--c-green` | `#1F9D63` | Soju-bottle green | Rails, ticks; Ink text only. **Decorative plate** |
| `--c-rind` | `#15603C` | Watermelon rind | SVG fill only. **Decorative** |
| `--c-sodium` | `#F2A51A` | Streetlight amber | Light pools, chips, small labels on dark, focus ring on dark. **Decorative plate**, Ink text allowed |
| `--c-watermelon` | `#FF4F6E` | Flesh, display numerals | SVG fill; numerals ≥ 20px on Asphalt. **Decorative plate**, no text on it |

Export every reading pair as `--pair-*: fg on bg` so `tools/contrast.js --css` checks them.

## Contrast table

Recomputed with the WCAG 2.x formula. AA: ≥ 4.50 body, ≥ 3.00 large (≥ 24px, or ≥ 18.66px bold).

| Text | Background | Ratio | Size | Verdict |
|---|---|---|---|---|
| Vinyl | Asphalt | 16.75 | body | pass |
| Vinyl | Wet Tar | 15.27 | body | pass |
| Ink | Vinyl | 16.41 | body | pass |
| Ink | Vinyl Edge | 14.31 | body | pass (worst gradient stop) |
| Vinyl Dim | Asphalt | 10.66 | captions | pass |
| Sodium | Asphalt | 9.16 | label 12px | pass |
| Sodium | Wet Tar | 8.35 | label | pass |
| Ink | Sodium | 8.98 | chip 12px | pass |
| Ink | Bottle Green | 5.35 | rail 14px | pass **[risk → resolved: green rail text is Ink]** |
| Vinyl | Bottle Green | 3.07 | — | **fail, banned** |
| Sign Red | Vinyl | 4.22 | ≥ 40px | pass large |
| Sign Red | Vinyl Edge | 3.68 | ≥ 40px | pass large |
| Sign Red | Asphalt | 3.97 | ≥ 40px | pass large **[risk → resolved: floor applies on dark too]** |
| Vinyl | Sign Red (Hangul on rail) | 4.22 | ≥ 24px | pass large |
| Red Print | Vinyl | 6.06 | body | pass |
| Red Print | Asphalt | 2.76 | — | **fail, banned [risk → resolved: small red on dark becomes Sodium]** |
| Watermelon | Asphalt | 5.94 | numerals ≥ 20px | pass |
| Sodium | Vinyl | 1.83 | — | **fail, banned**; focus ring on light panels is Ink |

CSS rule: `--display-floor: 40px`; any class that sets `color: var(--c-sign-red)` on type also sets `font-size: max(var(--display-floor), …)`. Red type never sits on Wet Tar.

## Typography

- **Display, Latin: Anton**, `ofl/anton`, 400. Subset Latin, punctuation, `ʻ`. Uppercase; line-height 0.9; tracking −0.01em at hero, 0 at h2.
- **Display, Hangul: Black Han Sans**, `ofl/blackhansans`, 400. Subset to exactly 오리궁뎅둥이안주소노래방영업중 (14 glyphs, under 6 KB) **[risk → resolved]**. Solid, never letterspaced, never transformed. Fallback `"Apple SD Gothic Neo", "Malgun Gothic", sans-serif`.
- **Text: Archivo**, `ofl/archivo`, pinned with `fonts.py --instance` to three static Latin files: `wdth=100,wght=400` body, `wdth=100,wght=700` h3, `wdth=75,wght=600` labels **[risk → resolved: no variable font shipped]**.
- **Receipt: Space Mono**, `ofl/spacemono`, 400/700, Latin, `tabular-nums`. Hours, prices, counts, phone.

Six woff2 files ≤ 120 KB; an `OFL.txt` per family in `src/fonts/`.

| Role | 375px | ≥ 1024px | Family | Leading | Tracking | Case |
|---|---|---|---|---|---|---|
| Hero | `clamp(72px, 24vw, 160px)` | `clamp(120px, 12vw, 200px)` | Anton | 0.9 | −0.01em | UPPER |
| Hero Hangul | 40px | 64px | Black Han Sans | 1.0 | 0 | — |
| H2 | 40px | 64px | Anton | 0.95 | 0 | UPPER |
| H2 Hangul rail | 24px | 32px | Black Han Sans | 1.0 | 0 | — |
| H3 | 20px | 24px | Archivo 700 | 1.15 | 0 | Sentence |
| Body | 17px | 18px | Archivo 400 | 1.5 | 0 | Sentence, 60–68ch |
| Label | 12px | 13px | Archivo 600 w75 | 1.2 | 0.12em | UPPER |
| Ticket | 14px | 15px | Space Mono | 1.45 | 0 | As printed |
| Tiny | 11px | 12px | Space Mono | 1.4 | 0 | Sentence |

**Hangul that appears, and nowhere else.** Each word is signage, paired on its panel with romanization and a one-line gloss in Label style **[graft, Anju Board]**:

| Hangul | Where | Romanization and gloss |
|---|---|---|
| 오리궁뎅이 | Hero red rail; footer | *ori gungdengi* · "duck butt," a colloquial word for the shape of a behind (F#147) |
| 안주 | Menu rail | *anju* · food that goes with drinks (F#143) |
| 소주 | Drinks rail | *soju* · Korean spirit, here by the pitcher (F#131) |
| 노래방 | Rooms rail | *noraebang* · a private singing room (F#119) |
| 영업중 | OPEN chip | *yeongeop-jung* · open for business (F#12) |

**Spelling [risk → resolved].** The dictionary form is 오리궁둥이; the owners told the press "oh ri goong deng ee" (F#147), the colloquial 궁뎅이. HTML default is 오리궁뎅이. Flag `name.hangulStandard` swaps to 오리궁둥이; both syllable sets are subset. Owner question #1. Hangul never carries body copy; no invented Korean business name anywhere.

## Layout & spacing

- **375:** one column, 16px gutters, 343px content, `overflow-x: clip` on `body` and on every section holding a device. Rhythm: 64px between sections, 24px between blocks, 12px label-to-content. Base unit 4px.
- **≥ 1024:** 12 columns, 24px gutters, 48px outer margin, `max-width: 1200px`, hung left (the content block is not centered). Rhythm 120 / 40 / 16px.
- **The sign edge.** One vertical line, `--x-sign`: 16px at 375, column 1 on desktop. Every header, panel, button and ticket starts on it. Only text inside a chip is centered.
- **Panels:** `border-radius: 0`, 6px Sign Red or Bottle Green frames, hard offset shadows (`4px 4px 0 var(--c-ink)` on light, `4px 4px 0 #000` on dark). No blur except light spill.
- **Sticky:** desktop only, a 56px Wet Tar top rail with the duck mark, "5 PM – 2 AM", the phone as text and BOOK A ROOM / MENU anchors. Nothing fixed or sticky at 375 **[risk → resolved: Anju Board's fixed 48px bar breaks brief constraint 6 and iOS safe areas; the Call / Book pair instead repeats in flow in the hero, after Rooms and in Find Us]**.
- Skip link; `scroll-margin-top: 72px` on desktop; no `scroll-behavior: smooth`.

## Motion language

Rules: no pinning, no scroll-linked transforms, no smooth-scroll hijack, nothing auto-plays except the two one-shot hero motions, nothing animates while it holds text the reader needs, and every pre-state exists only under `html.js`, so the no-JS and reduced-motion documents are complete and lit. Nothing over 25% of the viewport changes luminance more than once.

1. **Ballast warm-up.** First paint, once. `.sign__face` ramps `opacity .2 → 1`, 900ms, `cubic-bezier(.4,0,.2,1)`; the Sodium pool fades in at 600ms. Same on mobile and desktop. Reduced motion: lit from the start **[risk → resolved: the lit state is static HTML; JS adds `.is-cold` only after it loads, so slow cell service shows a finished sign]**.
2. **Lyric sweep [graft, Room 2].** 400ms after first paint, once. DUCK BUTT is two stacked copies: base in Ink (an unlit cut letter), top in Sign Red inside an `overflow: hidden` wrapper. Wrapper animates `translateX(-100%) → 0` while its inner text animates `translateX(100%) → 0`, so the red fills left to right as if sung; 1400ms linear, 200ms ease-out tail. Transforms only, no `background-clip` repaint **[risk → resolved]**. Reduced motion: fully red, static.
3. **Roll-up door.** Section header 30% in view, IntersectionObserver, once. Plate reveals `clip-path: inset(0 0 100% 0) → inset(0)`, 480ms, `cubic-bezier(.2,.8,.2,1)`. Reduced motion: static.
4. **Cord draw [graft, Room 2].** Rooms ticket enters view, once. The cord path (`pathLength="1"`) draws `stroke-dashoffset 1 → 0`, 900ms, same curve; handset tilts 4° once, 300ms. Reduced motion: drawn, level.
5. **The pour.** Watermelon enters view, once. A `<clipPath>` rect over the flesh rises 0 → 100%, 1.2s ease-in-out; straws fade in over the last 300ms. Reduced motion: full.
6. **Queue step.** User taps NEXT on the song-queue ticket. One row advances `translateY(-1 row)`, 400ms ease-out, then DOM rotate. Never auto-advances **[risk → resolved]**. Reduced motion: instant swap.
7. **Sticker press.** Hover/active on buttons and chips: `translate(-2px,-2px)`, shadow 4 → 6px, 120ms. Reduced motion: background swap.

Cut: the 40s address marquee (template smell, no pause affordance on touch; the street strip is a static wrapped line) **[risk → resolved]**, the auto-advancing nav, flip digits, scanlines, screen glow, the back-eased stamp.

## Graphic devices

1. **The sign box.** `background: linear-gradient(135deg, #fff 0%, var(--c-vinyl) 55%, var(--c-vinyl-edge) 100%)`; 6px Sign Red frame; 28px rails, top Sign Red (Vinyl or Hangul text ≥ 24px) and bottom Bottle Green (Ink Label 14px); `box-shadow: 0 0 80px rgba(244,241,232,.18)`; Sodium pool beneath, `radial-gradient(60% 40% at 50% 100%, rgba(242,165,26,.28), transparent)`. Hero, section headers, flavor panels, OPEN chip, every photo-slot frame.
2. **The ticket.** Vinyl panel, Space Mono, perforated top via `mask: radial-gradient(circle at 8px 0, transparent 5px, #000 6px) 0 0 / 16px 100%`; 1px dashed Ink rules; `2px dotted` leaders; gated values print "—" plus the ask stamp. Hours, booking, counts, song queue.
3. **The ask stamp [graft, Anju Board].** Inline chip rotated −4°, 2px outline, Label type, text ASK AT THE BAR: Sodium on dark rows, Red Print on vinyl. No animation. Every gated em-dash carries one, so dashes read as deliberate.
4. **The wall phone [graft, Room 2].** Inline SVG 160×220, `aria-hidden`: Wet Tar backplate 120×180 with 4px Vinyl stroke; a Vinyl handset (two 36×60 rounded rectangles joined by a 14px bar); a seven-loop cord `<path pathLength="1">`, 5px Bottle Green; a 6px Sodium LED. "(808) 593-1880" is HTML text, Space Mono 700, Ink on a Vinyl label positioned over the handset, never SVG `<text>`, so it survives `innerText` checks and copy-paste.
5. **The half watermelon.** SVG 320×200: `--c-rind` semicircle, 8px Vinyl pith arc, Watermelon flesh inside a `<clipPath>`, 14 Ink seed ellipses 6×10 along the arc, four 28px Vinyl ice cubes (2px Ink stroke, 60% opacity), two 8px striped straws at 12°.
6. **The duck mark.** `src/img/duck-mark.svg` as is: a line-art duck from behind, tail up, webbed feet in the air, water line and bubbles, 240×220 viewBox, 7px round strokes, `currentColor`. Favicon 32px Vinyl; section ticks 28px Sodium; desktop rail 32px; footer 96px as three copies, Sign Red at −3px, Bottle Green at +3px, Vinyl on top, like misregistered vinyl. Never filled, never given a face; the real sign's "comic duck" (F#162) is unseen and this mark does not claim to be it.
7. **The street.** One Sodium pool per section at alternating corners, 10–18% opacity; a 1px Vinyl Dim curb rule at 8% between sections. Gradients only, no textures.

## Section specs

At 375 the first viewport reads, in order: Korean name, DUCK BUTT, hours, address, BOOK A ROOM.

**Hero.** 375: Asphalt, Sodium pool low. Sign box on `--x-sign`, 343px: red rail 오리궁뎅이 in Vinyl 40px; face DUCK BUTT at 24vw, two lines, lyric-swept; green rail in Ink Label CAFÉ · KOREAN TAPAS · SOJU · KARAOKE ROOMS; romanization and gloss under the box. Then Anton 40px "5 PM – 2 AM" (F#12) with the 영업중 OPEN chip (Ink on Sodium, Sign Red frame); Space Mono "901 Kawaiahaʻo St, off Ward" (F#224, F#26) linking to a plain map query (F#57); sticker buttons BOOK A ROOM (anchor to Rooms) and MENU; the static street strip `901 Kawaiahaʻo St · 5 PM – 2 AM · (808) 593-1880`. Desktop: box in columns 1–7, hours, address and buttons in 8–12. Gated: days of the week, never shown here. Photo slot **HERO-01**, 4:5 at 375, 16:9 desktop, inside the sign frame: the owner's real sign replaces the SVG box the night he sends it **[risk → resolved: the box is a stand-in, not a claim about his sign]**.

**What this is.** Header plate A STRANGE BIRD (F#114). Ink on vinyl, three short paragraphs: Korean-inspired tapas and soju since 2010 (F#155; "since", never "founded"); brothers-in-law Jin Hong and Henry Yoon took over in 2010, changed the décor, kept the name (F#144); "oh ri goong deng ee," a cute word for the shape of a behind (F#147), kept because it was "catchy and easy to remember" (F#149); suppliers giggled (F#150). Label row SINCE 2010 · 안주 ANJU · 노래방 ROOMS. Desktop: copy 1–7, duck mark and **ABOUT-01** (1:1, the owners at the bar, F#115) in 9–12. Nothing gated.

**The menu board.** Header 안주 / THE BOARD. A hof wall board: Wet Tar rows, names Archivo 700 Vinyl, dotted leaders, prices "—" plus stamp (F#126 gate). Rows: Famous Duck Butt Chicken, side daikon, twice-fried, parchment-thin skin (F#196, F#205, F#203); Kimchee Fries (F#134); Spicy Gochujang Wings and Garlic Soy Wings (F#135); Kimchi Pancake and Bacon Kimchi Fried Rice (F#137); Korean Tacos, since 2011 (F#138); Spicy Gizzards (F#217). Sub-group WHAT THE REGULARS ORDER **[graft, Anju Board]**: "Locals: fried chicken and tacos. Korean regulars: spicy squid and rabbokki." (F#139). Sodium tag HAPPY HOUR 5–8 (F#11), prices gated. Desktop: board 1–8, **MENU-01** and **MENU-02** (1:1) stacked in 9–12 as lit frames. Gate: `prices.food`.

**Soju & drinks.** Header 소주 / SOJU. Watermelon device on top, pouring; flavor panels as sign boxes with alternating red, green and vinyl frames, one flavor each in Anton 40px: WATERMELON, served in the watermelon (F#181); STRAWBERRY (F#132); YOGURT (F#186); SKITTLES (F#129); LILIKOI and TARO (F#130); MELONA, LI HING, CEREAL MILK (F#184). Ticket: by the pitcher or carafe (F#131, F#182); 40-oz Hite, chilled mugs (F#190); pull quote "tastes just like watermelon juice .. until it hits you" (F#98). Desktop: watermelon 1–4, panels 5–12 two-up. Photo slot **DRINKS-01**, 4:5. Gate: `prices.drinks`.

**The rooms & booking.** Header 노래방 / THE ROOMS. Vinyl panel in the dark: private rooms with a couch and a phone on the wall to call staff (F#119); songs in English, Japanese and Korean (F#3); sing along with Girls' Generation, Super Junior, 2NE1 (F#161); birthdays and bachelorettes, reserve on weekends (F#123); K-pop videos on the TVs (F#171). H3 PICK UP THE PHONE, the wall phone with "(808) 593-1880" on the handset (F#21; `tel:` behind `phone.telVerified`), "Fridays and Saturdays, reserve" (F#8). Chips: "3-hour blocks — ASK AT THE BAR" (F#120 single-source; `rooms.blocksConfirmed` reveals "5–8 · 8–11"); "per song — ASK" (F#172 conflict); no room count anywhere (F#6 vs F#162, F#213) **[risk → resolved: no block-time leak]**. Song-queue ticket with NEXT: ENGLISH / JAPANESE / KOREAN / IDOL SING-ALONGS. Pool table omitted until `amenities.pool` (F#19 unverified). Desktop: copy 1–6, phone 7–9, queue 10–12. Photo slot **ROOM-01**, 16:9.

**The scene.** Header IN-THE-KNOW LOCALS (F#152). Quotes as labels stuck to the door, vinyl on Asphalt, hard Ink shadow, rotated −2°, +1.5°, −1°, +2°, source in Tiny: "If the name makes you smile, so will the soju!" (F#92); "K-Pop, Karaoke and Korean Food… What Could Go Wrong??" (F#91); "a slice of Korea in Honolulu" (F#143); "a night out in Kakaʻako isn't complete unless you finish at" (F#167). Count tickets, Watermelon numerals 40px: 3.7 stars · 616 reviews, Yelp (F#45); 3,213 likes · 26,897 check-ins, Facebook (F#81); Hale ʻAina Bronze, Best Bar Food 2018 (F#166). 375 one column; desktop two columns offset 48px, never an equal grid. No photo slot.

**Find us.** Header 영업중 / FIND US. Ticket: 5 PM – 2 AM; days "— ASK AT THE BAR" (F#13 vs F#14; `hours.daysConfirmed`); 901 Kawaiahaʻo St with map link; phone as text; "Street parking nearby — ask about validation" (F#16; valet behind `parking.valet`, F#17). Device: a 343×120 SVG strip, not to scale: Ward Ave as a 4px Vinyl Dim line crossing Kawaiahaʻo, a Sodium dot with a sign-box pin at 901, an arrow labelled BLAISDELL (F#25, F#163), NOT TO SCALE in Tiny. Desktop: ticket 1–6, strip 7–12. Photo slot **FRONT-01**, 3:2, the gray building from the street (F#162).

**Footer.** Wet Tar: misregistered duck mark, "오리궁뎅이 · Since 2010" (F#38, F#144), hours, phone as text, "Site concept by Kevin Osborne" in Vinyl Dim Tiny. No social links until `social.facebook` (F#43). `<meta name="robots" content="noindex">`.

Flags, one block atop `js/site.js`, all default `false`: `phone.telVerified`, `hours.daysConfirmed`, `prices.food`, `prices.drinks`, `rooms.blocksConfirmed`, `rooms.perSong`, `rooms.count`, `parking.validation`, `parking.valet`, `amenities.pool`, `social.facebook`, `name.hangulStandard`.

## Copy voice

A regular telling a friend where to go tonight. Short declaratives, present tense, sentence case, no exclamation marks outside quoted reviews. The facts carry the charm; the name is funny enough without jokes. Korean words are explained once, never performed. "Ask at the bar" is a line, not an apology.

1. "Korean tapas, soju and private karaoke rooms, a block off Ward."
2. "5 PM to 2 AM. Happy hour 5 to 8."
3. "The name is 오리궁뎅이, oh ri goong deng ee, a cute word for the shape of a behind. The owners kept it because it was catchy."
4. "Fried twice, uncoated, until the skin goes parchment-thin."
5. "Watermelon soju comes in the watermelon."
6. "Rooms have a couch and a phone on the wall. Pick it up for more soju or the check."
7. "Fridays and Saturdays, call ahead."
8. "Locals order the chicken and the tacos. Korean regulars order spicy squid and rabbokki."
9. "Prices change. Ask at the bar."

Never say: founded or opened in 2010; any price; "two rooms" or "several rooms"; "free valet"; "open daily"; "celebrities"; "neon"; "authentic"; "hidden gem"; "vibes"; DB Grill, any health-department history, the old site or the redirect; an email address; a social handle; anything a Korean reader would take as a business name in Hangul.

## Do / Don't

1. Do hang everything off `--x-sign`; don't center.
2. Do set Sign Red type at 40px or larger; don't set red body copy on dark.
3. Do put Ink on green rails; don't put Vinyl on green.
4. Do use Sodium for small accents on dark; don't use Red Print anywhere but vinyl.
5. Do keep Hangul solid, paired with romanization and gloss; don't track, uppercase or invent Hangul.
6. Do ship the lit sign in static HTML; don't add a pre-state outside `html.js`.
7. Do animate with transform, opacity and clip-path only; don't animate `background-clip`, filters or layout.
8. Do render gated values as "—" plus the ask stamp; don't print a number you cannot cite.
9. Do frame photo slots as sign boxes; don't ship placeholder or stock photography.
10. Do keep every section a finished document without JS; don't hide content behind interaction.
11. Do use square panels and hard offset shadows; don't use radius, blur cards or glass.
12. Do cite a fact id beside every claim; don't paraphrase a quote.

## Acceptance checklist

- `node tools/contrast.js --css src/css/site.css` exits 0 with every pair above present; no Vinyl-on-green, Sodium-on-vinyl or Red-Print-on-dark pair exists in the CSS.
- At 375 the first viewport shows, in order: 오리궁뎅이, DUCK BUTT, 5 PM – 2 AM, the address, BOOK A ROOM.
- `tools/verify.js`: zero console errors and 404s; no horizontal overflow at 375 and 1440; every `expected.json` string visible with JS off and with reduced motion; axe serious/critical zero.
- JS disabled and reduced motion both show the sign lit, DUCK BUTT fully red, watermelon full, cord drawn, queue static.
- Nothing sticky or fixed at 375; the desktop rail is the only sticky element.
- Every em-dash has an ask stamp; each flag reveals only its own value; default HTML never prints a price, day list, room count, valet claim, pool table or `tel:` link.
- Hangul on the page is exactly the five words in the Typography table (오리궁둥이 only under `name.hangulStandard`), each with romanization and gloss; Black Han Sans ≤ 6 KB; six font files ≤ 120 KB with `OFL.txt` each; no external requests.
- Every quote and count is eyeballed on its live source from a phone before launch (FACTS.md caveat); a source line sits under each quote.
- No red type below 40px on any background.
- Photo slots HERO-01, ABOUT-01, MENU-01, MENU-02, DRINKS-01, ROOM-01, FRONT-01 exist as framed, labelled, aspect-locked containers that render cleanly empty.
- Footer credit present; `noindex` meta and `X-Robots-Tag` in `dist/_headers`; no DB Grill, health history, Weebly or redirect anywhere in DOM or comments.
