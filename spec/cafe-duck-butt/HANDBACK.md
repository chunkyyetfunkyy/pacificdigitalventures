# Hand-back — Café Duck Butt spec site

## 1. Live URL

Not deployed from the build environment: Netlify's API is blocked there and the CLI session lives on your Mac.
One command deploys it (15 credits, once):

```sh
git pull   # branch claude/loving-feynman-vs2w6p
cd spec/cafe-duck-butt && scripts/deploy.sh
```

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
| Parking: validation / valet "—" | `parking.validation`, `parking.valet` | "Do you validate? Still valet, still free?" |
| Pool table (hidden) | `amenities.pool` | "Pool table?" (never stated by a source) |
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
