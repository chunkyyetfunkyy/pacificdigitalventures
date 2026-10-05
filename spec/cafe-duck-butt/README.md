# Café Duck Butt — spec site

One-page spec build for Café Duck Butt (901 Kawaiahaʻo St, Honolulu). Built on spec by Kevin Osborne to show
the owner on a phone at the counter. Not their official site yet: `noindex` meta + `X-Robots-Tag` header.

## Folder

| Path | What |
|---|---|
| `src/` | The site. `index.html` holds every word (static, complete without JS); `css/site.css`; `js/site.js` (owner gates + motion); `fonts/` (OFL, subset, with licenses); `img/` |
| `research/FACTS.md` | The fact pack. Every claim on the page cites an `F###` id from here in an HTML comment |
| `research/COPY.md` | Copy inventory, line by line, with fact ids and gate names |
| `research/BRIEF.md` | The hard rules this build follows |
| `research/DIRECTIONS/` | The three competing art directions and the judges' scores |
| `DESIGN-BIBLE.md` | The one direction we built: tokens, contrast table, type, motion, section specs |
| `scripts/build-dist.sh` | Assembles `dist/` with only referenced files, fingerprints css/js (`?v=hash`), writes `dist/_headers` |
| `scripts/deploy.sh` | One-shot Netlify production deploy from the Mac; records the site id in `scripts/deploy-state.json` |
| `tools/verify.js` | Proof harness: console errors, 404s, images, overflow at 375/1440, reduced-motion, no-JS, weight, scroll timing, axe |
| `tools/contrast.js` | WCAG check for every `--pair-*` reading pair in the CSS |
| `tools/fonts.py` | Download OFL fonts from the google/fonts repo and subset to woff2 |

## Deploy (on the Mac, once)

```sh
cd spec/cafe-duck-butt
scripts/deploy.sh            # builds dist/ then `netlify deploy --prod --dir=dist`
```

The script creates a Netlify site named `cafe-duck-butt-spec` on first run (override with `SITE_NAME=...`),
writes `scripts/deploy-state.json` with the site id and URLs, and uses the CLI at
`/Users/kevinosborne/kailua-golf-shop/node_modules/.bin/netlify` (override with `NETLIFY_CLI=...`).
Fonts, images, CSS and JS are fingerprinted with a content hash (`?v=…`) at build time, so replacing a file
keeps its name and phones still get the new version. Do not add `?v=` by hand.

## Owner gates

Every unconfirmed value ships as an em-dash plus an "Ask at the bar" stamp. Flags live in one block at the
top of `src/js/site.js`. Flip a flag to `true` after the owner answers; where a value is needed (prices,
per-song, minimum) also type it into the matching `data-value` attribute in `index.html`. A flag with an
empty `data-value` stays gated, so nothing unconfirmed can leak. The checklist of questions is
`research/FACTS.md` §15.

| Flag | Reveals |
|---|---|
| `phone.telVerified` | `tel:` links on every phone number |
| `hours.daysConfirmed` | "Seven nights a week" + the open-now chip |
| `prices.food` / `prices.drinks` | prices typed into `data-value` |
| `rooms.perSong` / `rooms.minimum` / `rooms.blocksConfirmed` | room terms |
| `parking.validation` / `parking.valet` | parking lines |
| `amenities.pool` | "Pool table" |
| `social.facebook` | Facebook link in the footer |
| `sign.duckConfirmed` | "Look for the duck on the sign." |
| `name.hangulStandard` | dictionary spelling 오리궁둥이 (romanized "ori gungdungi") instead of 오리궁뎅이 |
| `menu.tacosConfirmed` | the Korean Tacos row |
| `photos.showSlots` | the seven labelled photo slots, for the photo conversation |

## Verify locally

```sh
scripts/build-dist.sh
node tools/verify.js dist          # 21 checks; writes tools/out/verify-report.json + screenshots
node tools/verify.js https://<site>.netlify.app   # same checks against the live deploy, plus noindex headers
node tools/contrast.js --css src/css/site.css
node tools/shots.js dist           # per-section screenshots in tools/out/sections/
```

## Imagery

No photography ships. The design stands on the sign box, the watermelon, the wall phone and the duck mark
(all SVG/CSS). Seven aspect-locked photo slots exist (HERO-01, ABOUT-01, MENU-01, MENU-02, DRINKS-01,
ROOM-01, FRONT-01) and stay hidden until `photos.showSlots`; the owner's real photos drop in there.
