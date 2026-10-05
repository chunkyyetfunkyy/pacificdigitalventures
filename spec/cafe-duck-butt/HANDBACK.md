# Hand-back — Café Duck Butt spec site

## 1. Live URL

Not deployed from the build environment: Netlify's API is blocked there and the CLI session lives on your Mac.
One command deploys it (15 credits, once):

```sh
git fetch origin claude/loving-feynman-vs2w6p && git checkout claude/loving-feynman-vs2w6p
cd spec/cafe-duck-butt && scripts/deploy.sh
```

Do not merge this branch into `main`: `main` is the live pacificdigitalventures.org Pages site. (`_config.yml`
excludes `spec/` from Pages as a safety net, but the folder is still readable on GitHub while this repo is public.)

`scripts/deploy.sh` builds `dist/`, creates the Netlify site `cafe-duck-butt-spec`, deploys with `_headers`
(noindex + cache rules), and writes the site id and URLs to `scripts/deploy-state.json`. The local proof run
(`node tools/verify.js dist`) passes 21/21: zero console errors, zero 404s, every image renders, no horizontal
scroll at 375 or 1440, reduced-motion and JS-disabled both show every fact, 147 KB total, 60 fps while
scrolling in headless Chromium, axe serious/critical = 0. Run it again against the live URL by pointing a
browser at it; the harness proves the same `dist/` you deploy.

## 2. The design idea, out loud

1. "It's your building at one in the morning. The block is dark; the only thing lit is your sign."
2. "The sign is a Korean hof sign box — red, green, white vinyl — and it says 오리궁뎅이 first, then DUCK BUTT fills in red like a sung lyric."
3. "Everything else is stuck to the door: the board, the soju list, the room ticket with your phone number on the handset."
4. "Nothing I couldn't verify is on it. Every 'Ask at the bar' stamp is a spot where you tell me the real answer and it goes live."
5. "It works on a phone with the wifi off, the fonts live on the site, and no part of it is a template."

## 3. The door-opener

Their first write-up: the Honolulu Star-Advertiser's Pau Hana Patrol column "Do the duck," 17 September 2010,
the month they took over. It called the bar "a strange bird" and "a jolt to the senses," and the photo caption
reads "Co-owner Jin Hong watching bartender Jamie Choe pour popular strawberry soju." Say "strange bird" and
watch which brother-in-law laughs. Backup: Honolulu Magazine's 2018 Hale ʻAina Awards gave them Bronze for Best
Bar Food, behind Side Street Inn and Monkeypod Kitchen.

Two things to know before you walk in: (a) an old free Weebly page exists at cafeduckbutt.weebly.com
("Home of the Duck Butt," says founded 2010, 5pm–2am daily, happy hour 5–8) — an owner may call that "our
website"; (b) the .com itself could not be fetched from the build environment, so your redirect observation of
4 October is the only verification of that claim. Neither appears anywhere on the site.

## 4. Still gated, and what to ask

Everything below renders as an em-dash plus an "Ask at the bar" stamp (or stays hidden) until you flip its
flag at the top of `src/js/site.js`. The full counter checklist is `research/FACTS.md` §15.

| On the page | Flag | Ask |
|---|---|---|
| Phone shown as text, not tap-to-call | `phone.telVerified` | "Is (808) 593-1880 the number?" (seven listings agree; nobody has dialed it) |
| "Nights: —" | `hours.daysConfirmed` | "5 to 2 every night? Fridays? Sundays?" (Yelp says nightly; NetWaiter shows Friday closed) |
| Every food price | `prices.food` (+ type values) | a current menu |
| Every drink / happy-hour price | `prices.drinks` (+ type values) | watermelon soju, pitcher, happy-hour prices |
| Per song "—" | `rooms.perSong` (+ value) | "$1 or $2 a song?" (sources split) |
| Minimum row hidden | `rooms.minimum` (+ value or "None") | "Any food-and-drink minimum or hourly room fee?" (no listing states one; one old review says $150) |
| Time blocks "—" | `rooms.blocksConfirmed` | "Booked in 5–8 / 8–11 blocks, or by the hour?" |
| Parking: validation "—"; valet hidden | `parking.validation`, `parking.valet` | "Do you validate? Still valet, still free?" |
| Pool table (hidden) | `amenities.pool` | "Pool table?" (never stated by a source) |
| Korean Tacos row (hidden) | `menu.tacosConfirmed` | "Still serving the Korean tacos?" (last current-menu evidence is old) |
| Facebook link (hidden) | `social.facebook` | which of the two Facebook URLs is theirs; Instagram? |
| "Look for the duck on the sign" (hidden) | `sign.duckConfirmed` | is the comic duck still on the sign |
| 오리궁뎅이 vs 오리궁둥이 | `name.hangulStandard` | which spelling they use (the page uses the one they say) |
| Photo slots (hidden) | `photos.showSlots` | 6–10 photos: the sign at night, the front, the chicken, kimchee fries, watermelon soju, a room with people, the owners at the bar |

Also confirm before launch, even though they ship ungated: room count stays unstated by design; the Hale ʻAina
Bronze (Honolulu Magazine's own page, one source); naming Jin Hong and Henry Yoon; the "616 reviews" Yelp
count and the 4.5 TripAdvisor score; the Korean tacos still being on the menu.

## 5. Imagery

No photography ships and none was generated: the build environment has no image generator, and nothing on
Yelp is ours. The page stands on SVG and CSS — the sign box, the half watermelon, the wall phone, the duck mark —
and seven labelled, aspect-locked photo slots wait for the owner's real photos. Tell the owner plainly: the
drawings are stand-ins; their photos replace them the night they send them.

## 6. Review record

Four review passes raised 177 findings. Only 26 were checked by an independent verifier agent: a dedupe bug
merged pass 1's 68 findings down to 3, pass 2's verification was cut short, and passes 3–4 verified only
blockers and majors by design. Afterwards every one of the 177 was triaged by hand against the final code:

| Outcome | Count | Notes |
|---|---|---|
| Fixed | ~150 | content accuracy, motion, layout, accessibility, build, deploy |
| Refuted on review | 4 | e.g. "Hangul shouldn't sit on the sign" (the design spec calls for it; the verifier refuted it twice) |
| Left as-is, low risk | 8 | Windows High Contrast mode styling; 200% zoom on a 375px phone; font-swap reflow on slow networks (no metric-matched fallbacks); Safari ≤15 nested scroll; queue-step 400ms hole; the Next button appearing after load; hero warm-up also dims the rails; plates narrower than the grid beside them |

New checks added after the passes, all green on the final build:

- `node tools/verify.js dist` — 21/21 (console, 404s, images, overflow 375/1440, no-JS, reduced motion, weight 147 KB, scroll timing, axe)
- `node tools/gates.js` — 30/30 owner-gate checks: flags off shows nothing unconfirmed; each flag reveals only its own value; prices stay hidden until a value is typed
- `node tools/verify.js https://<live-url>` — the same checks against the live deploy, plus the noindex header and meta

## 7. Not verified from here — do these yourself

| Check | Why it could not be done here | How |
|---|---|---|
| Live URL proof | Netlify is blocked from the build container | `scripts/deploy.sh` prints the exact `verify.js` command for the live URL; run it |
| Real iPhone | only headless Chromium was available; 60 fps is indicative | open the live URL on your phone, scroll the whole page, rotate once, try with Reduce Motion on |
| Phone number | nobody has dialed it; seven listings agree | call (808) 593-1880, then set `phone.telVerified` |
| cafeduckbutt.com redirect | the domain was unreachable from the container | your 4 Oct observation is the only evidence; re-check on your phone before you walk in |
| Review quotes | read from search snippets, not the live pages | open the TripAdvisor and Yelp pages on your phone and confirm each quote on the page still exists |
| Still website-less | only a 2013-era Weebly page and listings surfaced | a quick search the morning you go |
