# Site copy inventory — every line traced to FACTS.md

Rule: nothing on the page that is not on this list. Gated items are marked `GATE:<flag>`; the HTML
default is the gated state. Fact ids refer to `research/FACTS.md`.

## Header / nav
- Wordmark: "Café Duck Butt" (F001). Nav: Menu · Soju · Rooms · Find us.
- Phone as text in header on desktop: "(808) 593-1880" (F056). `GATE:phoneVerified` → tel: link.

## Hero
- Eyebrow: "Kaka'ako · Honolulu · since 2010" (F055, F005 — "since 2010", never "founded").
- Headline: "Korean tapas, flavored soju, private karaoke rooms." (F114 Korean small plates; F121–F122 soju; F140 rooms)
- Sub: "Open 5 PM – 2 AM. Happy hour 5–8." (F069–F074 window VERIFIED; F087 happy hour window VERIFIED)
  - Days strip: "7 nights" `GATE:hoursDaysConfirmed` → default renders "5 PM – 2 AM" + chip "nights: confirm at the bar" (F155-C1).
- Secondary line: "오리궁둥이 · oh ri goong deng ee — it's a cute word for a behind." (F023; Hangul is the dictionary word for the name's meaning, not a sign the bar has — F268)
- CTAs: "See the menu", "Book a room" (→ rooms section; the phone number as text, F162).

## What this is (strap / intro)
- "A small, windowless Korean bar on the back streets of Kaka'ako, a block off Ward." (F063, F053, F279)
- "K-pop videos on the screens, white booths up front, private singing rooms in the back." (F172 VERIFIED K-pop; F276 white booths SINGLE — use "booths"; F142 rooms in back)
- "Same owners since 2010 — brothers-in-law Jin Hong and Henry Yoon." (F005, F013) — ok to name owners? They are public figures in press; keep to first names + surnames as in press. Flag in owner questions (Q21) — ship ON.
- Press pull: "a strange bird" — Honolulu Star-Advertiser, 2010 (F029). "A night out in Kaka'ako isn't complete unless you finish at … Café Duck Butt" — HAWAI'I Magazine (F034).
- Award: "Hale 'Aina Awards 2018 · Bronze, Best Bar Food (Honolulu Magazine)" (F119, single but it is the awarding body's own page). `GATE:awardConfirmed` default ON? → Decision: ship ON with chip-free rendering; listed in owner checklist.

## Menu board (names only; prices `GATE:pricesConfirmed`, default em-dash + chip "prices at the bar")
Signature / "Known for":
- Famous Duck Butt Chicken — house fried chicken, twice-fried, served with daikon (F094, F289)
- Chicken Wings — Spicy Gochujang · Garlic Soy · Regular (F095, F096)
- Kimchee Fries — loaded crispy fries, spicy fermented kimchee (F097, F287)
- Kimchee Pancake — thin and crisp, Korean chili ponzu (F098, F290)
- Spicy Gizzards (F103)
- Bacon Kimchee Fried Rice — kimchee butter, crispy egg, scallion, seaweed (F101, F291)
More from the kitchen:
- Seafood Pancake (F099) · Green Onion Pancake / pajeon (F100) · Mochiko Chicken (F104)
- Spicy Mochi (dukbokki) — rice cakes and fish cake in sweet-spicy sauce (F105)
- Fried Mandoo (F107) · Fresh Poke (F108) · Shrimp Tempura · Sweet Potato Tempura · Fried Calamari (F109)
- Korean Tacos — pork belly, kalbi or chicken (F102; current availability OWNER → `GATE:tacosOnMenu` default ON? Decision: ship ON under "ask if they're running tonight"? No — keep it simple: list it; owner Q12 covers it.)
- Spelling: "kimchee" (Yelp popular-dish spelling, F112; C19).
- Footer of the board: "Portions are big. Lots of it is vegetarian-friendly — ask." (F117 "enormous portions"; F185 vegetarian options VERIFIED) — keep "big portions"; skip vegetarian claim per C13? F185 is VERIFIED across two listings; fine to say "vegetarian options" without naming the fried rice.

## Soju & drinks
- Lead: "The watermelon soju comes in half a watermelon." (F121 VERIFIED)
- "Soju by the pitcher, in flavors like yogurt, strawberry, lilikoi, taro, Melona, li hing, Skittles." (F122–F129; pitchers F131) — flavors are reviewer/listing-named; present as "flavors have included" to be safe? They are sourced as served; use "Flavors rotate — regulars talk about…" hmm. Use: "Flavors that regulars swear by: …" (reviewer-sourced, honest). Count never stated (C12).
- "Hite, ice-cold, in very large bottles." (F135)
- "Full bar." (F137)
- "Happy hour 5–8 PM." (F087) `GATE:happyHourDaily` for "every night" word; prices gated.
- Quote: "If the name makes you smile, so will the soju!" — TripAdvisor review title, 2014 (F196 USABLE)
- Quote: "tastes just like watermelon juice .. until it hits you" — TripAdvisor (F204 USABLE)
- Quote: "I now dream of Watermelon soju." — Yelp reviewer (F210 USABLE)

## Rooms & booking
- Headline: "Private karaoke rooms in the back." (F140, F142)
- Body: "Rooms run until close. Song books go deep in English, Japanese and Korean. There's a couch, a machine, and a phone on the wall to call for another round." (F145 SINGLE; F147 SINGLE → "English, Japanese and Korean songs"; F143 SINGLE couch/machine/phone — attribute softly: "a couch, the machine, and a phone to call the bar")
- "Open-floor seating by the bar if you'd rather watch." (F144)
- "Book ahead Friday and Saturday — regulars and every guide say so." (F160 VERIFIED advice)
- Terms table (all gated → em-dash + chip "ask at the bar / call"): per song `GATE:songPrice`; minimum `GATE:roomMinimum` (default: row hidden? No: show "Minimum: —"); time blocks `GATE:roomBlocks`; room count `GATE:roomCount` (never a number); capacity `GATE:roomCapacity`.
- CTA: "To book: call (808) 593-1880 or ask at the bar." (F056 text; F162 phone appears to be the only path — say "call or ask at the bar"). `GATE:phoneVerified` → tel:.
- Good for: "birthdays, bachelorettes, after-work, the spontaneous Tuesday" (F164–F165 → "birthdays, bachelorette parties, after-work groups")
- Quote: "K-Pop, Karaoke and Korean Food....What Could Go Wrong??" — TripAdvisor review title (F200 USABLE)

## The scene / quotes
- "Awesomeness, silliness, just plain fun." — TripAdvisor, 2016 (F197)
- "The anju. The drinks. The fun vibe. The ridiculous name. It's a slice of Korea in Honolulu, and well worth a visit." — TripAdvisor, 2016 (F198)
- "Great Food & Happy Hour, Locals Spot !" — TripAdvisor (F201)
- "It is family owned and the food is very well prepared and the portions are enormous." — TripAdvisor (F207)
- "Reminds me of LA… but without the pretentiousness… legit, all the food is delicious" — Yelp (F209)
- Korean tacos: "out of this world" — TripAdvisor (F208)
- Counts: "616 reviews · 1,145 photos on Yelp (Sept 2026)" (F188); "4.5 / 5 on TripAdvisor" (F189 — 10 reviews; show "4.5 on TripAdvisor" with "(10 reviews)" small). Yelp star 3.7 NOT shown (Q17). Facebook likes not shown (stale). No Google number (F194). No rank (C7).
- Time arc line: "Happy hour fills up. Later, especially weekends, it's full — rooms and tables." (F087, F170, F229)

## Find us
- Address: "901 Kawaiaha'o St, Honolulu, HI 96814" (F052; okina spelling per brief; Q15)
- "Off Ward Avenue, near the Blaisdell." (F053 VERIFIED; F054 SINGLE → keep "near the Blaisdell"? It's Giftly single. Use "a block off Ward Avenue" only; drop Blaisdell → safer.)
- Map link: plain maps query (F057): https://maps.apple.com/?q=901+Kawaiahao+St+Honolulu+HI+96814 and Google: https://www.google.com/maps/search/?api=1&query=901+Kawaiahao+St+Honolulu+HI+96814
- Hours: "5 PM – 2 AM" big; days gated (C1). "Happy hour 5–8 PM."
- Phone: text (F056) `GATE:phoneVerified`.
- Parking: "Street parking nearby." + chip "ask about validation & valet" (F062 recommendation) `GATE:parkingConfirmed` → "Validated parking and valet available" (F058 — only after owner).
- Smoking: not shown (F178 single) — owner Q10.
- Take-out: "Take-out available." (F182 VERIFIED) — ok.
- Exterior hint for finding it: "Gray, one-story, no windows — look for the duck on the sign." (F270 SINGLE "comic duck on the sign", F271 VERIFIED windowless). Use: "It's a plain gray building with no windows. Look for the duck." (`GATE:signConfirmed`? F270 is single & undated; the duck-on-sign could be gone. Gate with chip? Decision: ship "It's the plain gray building with no windows." (VERIFIED) and keep "look for the duck" behind `GATE:duckSignConfirmed` default OFF.)

## Footer
- "Café Duck Butt · 901 Kawaiaha'o St, Honolulu, HI 96814 · (808) 593-1880"
- Facebook link: `GATE:facebookConfirmed` default OFF (C17: two URLs) → text "Find us on Facebook" without link until confirmed? Rule: don't link without owner OK (F065). Default: no link.
- "Site concept by Kevin Osborne" (brief rule 11) — discreet. Optional "(630) 641-9140"? Brief gives his number for the offer, not for the site. Keep credit text only.
- No email address anywhere (F066).

## Never
- DB Grill, DOH, cafeduckbutt.com, Weebly, prices, room counts, $150, $1/$2, Instagram handle, Google rating, "Top 10", pool tables (F171 unverified), "eight screens", celebrities, Ala Moana.
