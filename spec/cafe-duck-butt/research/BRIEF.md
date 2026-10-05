# Build brief — Café Duck Butt spec site

Kevin Osborne builds one-page sites on spec for Honolulu businesses that have none, then walks in and
shows the owner on his phone. This one is for Café Duck Butt: Korean tapas + soju + private karaoke
rooms, a Kaka'ako institution at 901 Kawaiaha'o St. It is a NIGHT business (5 PM – 2 AM).

## What the page must do (business function)
- Say what they sell: anju / Korean tapas, soju and drinks, private karaoke rooms, pool, TVs.
- Hours, address (with a map link), phone (shown as text; `tel:` only when verified).
- How to book a karaoke room or a party — the real reason a site exists for them.
- Social proof: real verbatim quotes and real counts, nothing invented.
- A little history (owners since 2010, the name) and the neighborhood.

## Non-negotiable constraints
1. Every word traces to `FACTS.md`. No invented testimonials, prices, email addresses, awards.
2. Owner gates: unconfirmed prices render as em-dashes with a chip; unverified phone is text only;
   shaky claims are left out. Flags live in one config block at the top of `js/site.js`; the HTML
   default state is the SAFE (gated) state so a JS failure never leaks a guess.
3. Static HTML holds all content. JS only enhances. JS off or broken = every word, hour, image and the
   phone number still visible. Animations are decoration.
4. Everything vendored locally: no CDNs, no Google Fonts links. Fonts are OFL from the google/fonts
   repo, subset to woff2, with OFL.txt shipped. (`tools/fonts.py`)
5. Contrast law: reading text is near-black on light or light on near-black. Mid-tone plates
   (orange / green / red / neon) never carry body copy directly — copy sits on a painted panel.
   Every text/background pair passes WCAG AA (`tools/contrast.js`).
6. Mobile discipline: zero horizontal overflow at 375px, no scroll-jacking, no pinned sections on
   mobile, `prefers-reduced-motion` yields a clean fully readable document.
7. Primary surface is a phone on cell service, standing at the counter at night. Desktop second.
8. No photography is available for this build (no image generator in this environment; stock and
   Yelp photos are not ours). The design must stand on typography, color, SVG and CSS. Reserve
   clearly specified photo slots that the owner's real photos drop into later.
9. Dark, after-dark world is correct here — but not the generic "near-black + one acid-green" look.
   Find a specific night world rooted in THIS place: Korean signage, karaoke-room light, soju green
   glass, the 2 AM crowd, Kaka'ako's warehouse streets.
10. Avoid AI-default looks: cream + terracotta + serif; purple-blue gradient hero; Inter everywhere;
    emoji section markers; everything centered; rounded cards with an accent bar; glassmorphism.
11. Never mention DB Grill (closed), any health-department history, or the cafeduckbutt.com redirect.
12. Discreet footer credit "Site concept by Kevin Osborne"; `<meta name="robots" content="noindex">`
    plus `X-Robots-Tag: noindex` via `dist/_headers`.

## Deliverables in this folder
- `research/FACTS.md` — sourced fact pack (single source of truth)
- `research/DIRECTIONS/*.md` — the three competing art directions and the judges' scores
- `DESIGN-BIBLE.md` — the one direction we build, fully specified
- `src/` — the site (index.html, css/, js/, fonts/, img/)
- `scripts/build-dist.sh` → `dist/` (+ `_headers`), `scripts/deploy.sh` → Netlify, once
- `tools/verify.js` — proof: console, 404s, images, overflow, reduced-motion, no-JS, weight, scroll, axe
