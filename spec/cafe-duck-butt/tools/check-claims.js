#!/usr/bin/env node
/*
 * Re-checks the two outside claims the pitch relies on:
 *   1. cafeduckbutt.com: where does it redirect? (reads the Location header only; never loads the target)
 *   2. Every review quote on the page: does it still appear on its source page?
 *   node tools/check-claims.js
 * Pages that block automated readers are reported as UNREACHABLE, not as missing.
 */
const QUOTES = [
  // [fact id, quote text exactly as on the site, source page]
  ['F197', 'Awesomeness, silliness, just plain fun', 'https://www.tripadvisor.com/ShowUserReviews-g60982-d5835416-r419919617-Cafe_Duck_Butt-Honolulu_Oahu_Hawaii.html'],
  ['F198', 'slice of Korea in Honolulu', 'https://www.tripadvisor.com/ShowUserReviews-g60982-d5835416-r419919617-Cafe_Duck_Butt-Honolulu_Oahu_Hawaii.html'],
  ['F200', 'K-Pop, Karaoke and Korean Food', 'https://www.tripadvisor.com/ShowUserReviews-g60982-d5835416-r723875643-Cafe_Duck_Butt-Honolulu_Oahu_Hawaii.html'],
  ['F207', 'the portions are enormous', 'https://www.tripadvisor.com/ShowUserReviews-g60982-d5835416-r221873180-Cafe_Duck_Butt-Honolulu_Oahu_Hawaii.html'],
  ['F209', 'Reminds me of LA', 'https://www.yelp.com/biz/caf%C3%A9-duck-butt-honolulu-2?q=Reminds+me+of+LA'],
  ['F210', 'I now dream of Watermelon soju', 'https://www.yelp.com/biz/caf%C3%A9-duck-butt-honolulu-2?q=dream+of+Watermelon+soju'],
  ['F034', 'complete unless you finish at popular local hangout', 'https://www.hawaiimagazine.com/an-insiders-guide-to-16-of-honolulus-bars-clubs-and-brewpubs/'],
  ['F029', 'a strange bird', 'https://www.staradvertiser.com/2010/09/17/play/pau-hana-patrol/do-the-duck/'],
];
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const norm = s => s.replace(/&amp;/g, '&').replace(/&#39;|&rsquo;|’/g, "'").replace(/&quot;|“|”/g, '"').replace(/\s+/g, ' ').toLowerCase();

(async () => {
  console.log('== cafeduckbutt.com (headers only)');
  for (const u of ['http://cafeduckbutt.com/', 'https://cafeduckbutt.com/', 'https://www.cafeduckbutt.com/']) {
    try {
      const r = await fetch(u, { redirect: 'manual', headers: { 'User-Agent': UA } });
      console.log(`  ${u} -> ${r.status} ${r.headers.get('location') || '(no Location header)'}`);
    } catch (e) { console.log(`  ${u} -> UNREACHABLE (${e.cause ? e.cause.code || e.cause.message : e.message})`); }
  }
  console.log('\n== review and press quotes');
  const cache = {};
  let found = 0, missing = 0, blocked = 0;
  for (const [id, q, url] of QUOTES) {
    if (!(url in cache)) {
      try {
        const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US' } });
        cache[url] = r.ok ? norm(await r.text()) : `HTTP ${r.status}`;
      } catch (e) { cache[url] = 'UNREACHABLE'; }
    }
    const page = cache[url];
    if (page.startsWith('HTTP ') || page === 'UNREACHABLE') { blocked++; console.log(`  ${id}  UNREACHABLE (${page})  "${q}"`); continue; }
    if (page.includes(norm(q))) { found++; console.log(`  ${id}  FOUND    "${q}"`); }
    else { missing++; console.log(`  ${id}  MISSING  "${q}"  ${url}`); }
  }
  console.log(`\n${found} found, ${missing} missing, ${blocked} unreachable`);
})();
