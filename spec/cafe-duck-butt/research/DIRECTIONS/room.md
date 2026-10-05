# NOW PLAYING: ROOM 2

## The world
It is 8:20 PM on a Saturday, the second block of the night (rooms go in 3-hour blocks, 5–8 or 8–11, F#120). You are in one of the two rooms in the back (F#162, F#213): a comfy couch, a karaoke machine, and a phone on the wall you pick up to call for more soju or the check (F#119). The only light is the K-pop video on the screen (F#112, F#171), cool on faces, plus the warm spill from the oxblood couch and the hallway. The song book is a laminated binder with English, Japanese and Korean pages (F#3). On the table is a half watermelon full of soju and ice (F#127, F#181) and a basket of gochujang wings (F#135). Out front, eight TVs play over white booths (F#162); in 2010 the Star-Advertiser called the color scheme "electric" and the place "a strange bird" (F#114). The sound: a bachelorette group two rooms over (F#123), a tambourine, a 40-oz Hite hitting a table (F#190). Materials: vinyl, laminate, glass, screen glow. The site is that room, overheads off, screen on.

## Palette
| Hex | Role |
|---|---|
| `#120C0E` Room Black | base; warm near-black |
| `#3B1C23` Vinyl | the couch; near-black copy panel (L ≈ 0.019) |
| `#F3EEE6` Lyric White | body on dark; song-book paper |
| `#15100F` Ink | body on paper |
| `#FFD83D` Cue Yellow | the sung-lyric highlight; chips, hero sweep |
| `#FF4F5E` Watermelon | the fruit's flesh; large display only |
| `#1F7A4D` Rind | rind, soju-bottle glass; decorative |
| `#7FB7FF` Screen Blue | TV glow; rules, small labels, focus rings |
| `#8E8389` Smoke | muted meta text |

| Use | Pair | Est. ratio |
|---|---|---|
| Body (dark) | Lyric White / Room Black | 16.5:1 |
| Body (panel) | Lyric White / Vinyl | 13:1 |
| Body (paper) | Ink / Lyric White | 17:1 |
| Small label | Smoke / Room Black | 5.3:1 |
| Small label | Screen Blue / Room Black | 9.3:1 |
| Chip, ≤3 words | Ink / Cue Yellow | 13.7:1 |
| Headline ≥32px | Cue Yellow / Room Black | 14:1 |
| Headline ≥32px | Watermelon / Room Black | 6:1 |

Decorative only: Rind (3.7:1), Watermelon under 32px, Screen Blue as glow. Body copy sits only on Room Black, Vinyl or paper.

## Typography
- **Display + Hangul: Black Han Sans** (`ofl/blackhansans`, 400). One chunky gothic sets DUCK BUTT and 오리궁뎅이 in the same voice, the OFL cousin of noraebang caption lettering, so the Hangul is not a costume. Subset to the glyphs used.
- **Text: Schibsted Grotesk** (`ofl/schibstedgrotesk`, 400, 400i, 700). Warm, tall x-height, reads at 17px at night.
- **Machine numerals: Space Mono** (`ofl/spacemono`, 400, 700). Song codes, block times, the phone number.

375px scale: hero 84px/0.92 (DUCK / BUTT stacked); h2 40px/1.0 Black Han Sans; h3 22px/1.2 Schibsted 700; body 17px/1.55 Schibsted 400; label 12px Space Mono 700, uppercase, +0.12em; machine numerals 28–56px Space Mono 700, tabular. Desktop: hero 160px, h2 56px, body 18px, 60–68ch.

Case rules: Black Han Sans always uppercase, never letterspaced (tracking a black gothic is the template tell); Space Mono labels uppercase and tracked; body sentence case; Hangul never tracked.

Hangul appears only where the facts put it in the room: 오리궁뎅이 under the hero with "oh ri goong deng ee" (F#147); 노래방 on the rooms label; 안주 beside "Korean tapas" (F#143); 소주 on the drinks board. Every Hangul word is paired with English on the same line, because Korean and local customers share these tables and order differently (F#139) and the song book is trilingual (F#3). The colloquial 궁뎅이 spelling follows the quoted pronunciation; the owner confirms it.

## Motion language
All motions are time-based or viewport-entry; nothing binds to scroll position or is sticky on mobile.
1. **Lyric sweep** (hero, on load, once): DUCK BUTT fills Lyric White → Cue Yellow left to right as if sung, 1800ms linear with a 200ms ease-out tail. Reduced: DUCK yellow, BUTT white, static.
2. **Screen on** (Screen panel enters viewport): opacity 0→1, `brightness(.6→1)`, blue halo grows, 420ms `cubic-bezier(.2,.7,.2,1)`. Reduced: lit.
3. **Queue advance** (nav queue, in view, paused on touch): every 4s the NOW PLAYING chip steps to the next section, rows shift up one line, 320ms ease-out. Reduced: static list, chip marks the current section.
4. **Cord draw** (booking enters): coiled phone cord draws via `stroke-dashoffset`, 900ms same curve; handset tilts 4° once. Reduced: drawn.
5. **Pour** (drinks enters): watermelon soju level rises 0→72%, 600ms ease-out; ice settles 140ms later. Reduced: full.
6. **Flip to 2 AM** (find-us enters): Space Mono digits roll 5:00 PM → 2:00 AM in six 180ms steps. Reduced: "5 PM – 2 AM" static.

## Section by section
**Hero.** 375: Room Black; top-left Yellow chip `NOW PLAYING`; DUCK / BUTT at 84px; 오리궁뎅이 · oh ri goong deng ee (F#147) in Smoke; one Lyric White line: "Korean tapas, soju, private karaoke rooms. Kaka'ako, 5 PM–2 AM." (F#12, F#125). Vinyl button "Book a room"; "Call (808) 593-1880" as text, `tel:` behind the flag (F#21). Desktop: type spans 8 of 12 columns, a Screen panel right shows the sweep. Device: Screen; that 16:9 panel is the room-photo slot.

**What this is.** 375: Vinyl panel; h2 "A SLICE OF KOREA IN HONOLULU" (F#89, F#143); body: taken over in 2010 by brothers-in-law Jin Hong and Henry Yoon, décor changed, name kept because it was catchy (F#144, F#149); the name is a cute colloquial word for a behind (F#147); "a strange bird" (F#114). Label row: `EST 2010` · `ANJU 안주` · `노래방 ROOMS`. Desktop: h2 left, copy right at 64ch. Device: a three-stroke duck mark in Screen Blue after the "comic duck on the sign" (F#162). Photo slot: 4:5 of the sign.

**The menu board (the song book).** 375: Lyric White paper panel, Ink, rows numbered like song codes: `0101 Famous Duck Butt Chicken, side daikon` (F#196), `0102 Kimchee Fries` (F#133, F#134), `0103 Spicy Gochujang Wings`, `0104 Garlic Soy Wings` (F#135), `0105 Bacon Kimchi Fried Rice`, `0106 Kimchi Pancake` (F#137), `0107 Korean Tacos, since 2011` (F#138), `0108 Spicy Gizzards` (F#217). Prices render as em-dash with an `ASK AT THE BAR` chip until confirmed (F#194–199 conflict). Margin note from F#139: locals order chicken and tacos, Koreans spicy squid and rabbokki. Desktop: two paper columns with a spine gutter, an open binder. Photo slots: 1:1 tiles after 0104, wings and fries.

**Soju & drinks.** 375: Room Black, the Half Watermelon SVG bleeding off the right edge; h2 "SOJU 소주"; rows: watermelon, served in a half watermelon (F#127, F#181); strawberry, the 2010 pour (F#132); yogurt (F#186); lilikoi, taro (F#130); Skittles (F#129); by the pitcher (F#131); Hite in the big bottle (F#214); happy hour 5–8 (F#11). Quote chip: "tastes just like watermelon juice .. until it hits you" (F#98). Desktop: watermelon left at 420px, list right. Photo slot: the SVG swaps for a cut-out of the real one.

**The rooms & booking.** 375: Vinyl panel; h2 "PICK UP THE PHONE"; Wall Phone SVG with the number on the handset as text (F#21); body: several private rooms with couch, machine, wall phone (F#118, F#119); 3-hour blocks 5–8 and 8–11, single source, worded "ask about blocks" (F#120); reserve for Friday and Saturday (F#8); birthdays, bachelorettes, after-work (F#31, F#123). Queue chips `17:00–20:00` `20:00–23:00`. Minimums and per-song prices gated (F#172, F#220). Desktop: phone left, copy right. Photo slot: 16:9 Screen of a room below.

**The scene / quotes.** 375: three Screen panels stacked, each quote set as a lyric with the yellow highlight on its first clause: "If the name makes you smile, so will the soju!" (F#92), "K-Pop, Karaoke and Korean Food....What Could Go Wrong??" (F#91), "Awesomeness, silliness, just plain fun." (F#88); source in Smoke. Counts strip: 616 reviews, 1,145 photos (F#22), #30 of 96 nightlife (F#76). Desktop: 3-up, the TV wall (F#162). Photo slot: crowd grid beneath.

**Find us.** 375: paper panel; 901 Kawaiaha'o St, Honolulu 96814, map link (F#58); "off Ward" (F#26), near Blaisdell (F#25); 5 PM–2 AM with flip digits, days as "nightly" behind a flag because sources conflict (F#13, F#14, F#54); phone as text (F#21); parking: street, validation, valet (F#16), "free valet" gated (F#17). Desktop: three columns. No photo.

**Footer.** Room Black; duck mark; "Café Duck Butt · Kaka'ako · since 2010"; "Site concept by Kevin Osborne" in Smoke 12px, left-aligned.

## Graphic devices
1. **The Screen.** 16:9 rounded rect (r 6px) in `#0B0809`, a repeating-linear-gradient scanline at 2px/6% opacity, a Screen Blue outer glow (`box-shadow: 0 0 48px -8px`), and a lyric line in Black Han Sans with a `background-clip: text` two-tone fill, Yellow over White, split point animated. Empty state shows the lyric; image state shows an `<img>` and keeps the glow.
2. **The Song Book.** Lyric White panel, 1px Ink hairline per row, 4-digit Space Mono code column, title in Schibsted 700, note in 400 italic, price right in tabular figures, a 12px spine shadow on desktop. Gated prices show `—` plus a Yellow chip.
3. **The Wall Phone.** SVG 160×220: rounded Vinyl body, Lyric White handset, a coiled cord as a 1.5px polyline of 14 loops in Screen Blue (`pathLength=1` for the draw), the number set on the body in Space Mono. It is the booking CTA.
4. **The Queue.** A strip of chips: current item Ink-on-Yellow `NOW PLAYING`, others Lyric White on Vinyl with a Space Mono index (`02 MENU`, `03 SOJU`). In-page nav and block timeline; wraps at 375, never scrolls sideways.
5. **The Half Watermelon.** SVG: Rind semicircle rim, Watermelon flesh, nine Ink seeds, a Lyric White liquid `<rect>` whose height animates, three ice cubes, two Smoke straws.

## Why this is not the default
Not near-black plus acid green: the base is a warm oxblood black and the accents, lyric yellow, watermelon pink and TV blue, are objects from the fact pack. No gradient hero, no centered stack; everything is left-aligned like a binder page. No Inter; the display face is Korean-native. No rounded cards with an accent bar; the three containers are a screen, a paper page and a couch panel, each a different material. No glassmorphism. No generic neon sign: the only glow is the sung-lyric highlight, which belongs to this room. Song codes replace emoji markers.

## The counter moment
On the phone, first three seconds: a black screen, a yellow `NOW PLAYING` chip, then DUCK BUTT fills yellow left to right the way the lyric does on his own machines. He has watched that sweep every night since 2010. "That's us" comes from details no stranger has: 오리궁뎅이 under the name, the wall phone with his number on it, the 8–11 block, Famous Duck Butt Chicken with side daikon as song 0101, a half watermelon with seeds and straws. It is his back room.

## Risks
- **Hangul font weight.** Black Han Sans is heavy unsubset; subset to the ~20 glyphs used, with a system Gothic fallback.
- **Spelling and tone of 오리궁뎅이.** Colloquial; owner confirms or it drops to romanization.
- **Pastiche.** Scores and applause would make it parody. Rule: machine elements appear only where they carry real content.
- **Yellow fatigue.** One chip per section plus the hero sweep; more reads as warning.
- **Conflicting facts.** Room count, days open, per-song price, free valet: gated in `js/site.js`, safe state in HTML.
- **Dark page under bar light.** The two paper panels give the phone bright zones; test at 50% brightness.
- **Photo drop-in.** Slots keep aspect and glow so dim photos do not go muddy; ask for 1600px, 16:9 or 4:5.

---
Palette: [{"hex": "#120C0E", "role": "Room Black \u2014 base, warm near-black"}, {"hex": "#3B1C23", "role": "Vinyl \u2014 the couch; near-black copy panel"}, {"hex": "#F3EEE6", "role": "Lyric White \u2014 body on dark; song-book paper"}, {"hex": "#15100F", "role": "Ink \u2014 body on paper"}, {"hex": "#FFD83D", "role": "Cue Yellow \u2014 sung-lyric highlight; chips, hero sweep"}, {"hex": "#FF4F5E", "role": "Watermelon \u2014 flesh of the half watermelon; large display only"}, {"hex": "#1F7A4D", "role": "Rind \u2014 rind / soju-bottle glass; decorative only"}, {"hex": "#7FB7FF", "role": "Screen Blue \u2014 TV glow; rules, small labels, focus rings"}, {"hex": "#8E8389", "role": "Smoke \u2014 muted meta text"}]
Fonts: [{"ofl_dir": "blackhansans", "role": "display + Hangul (DUCK BUTT, \uc624\ub9ac\uad81\ub385\uc774, h2)", "weights": "400"}, {"ofl_dir": "schibstedgrotesk", "role": "text / body / h3", "weights": "400, 400i, 700"}, {"ofl_dir": "spacemono", "role": "machine numerals: song codes, block times, phone number, labels", "weights": "400, 700"}]
