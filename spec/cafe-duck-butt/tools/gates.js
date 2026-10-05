#!/usr/bin/env node
// Owner-gate contract test against dist/: the default state leaks nothing unconfirmed,
// and each flag reveals only its own value.   node tools/gates.js
const path = require('path'), http = require('http'), fs = require('fs');
const { chromium } = (function () { for (const c of ['playwright', '/opt/node22/lib/node_modules/playwright', '/opt/node-tools/node_modules/playwright']) { try { return require(c); } catch (e) {} } throw new Error('playwright not found'); })();
const DIST = path.resolve(__dirname, '..', 'dist');
const M = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
let jsOverride = null, htmlOverride = null;
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  if (p === '/js/site.js' && jsOverride) { r.writeHead(200, { 'Content-Type': 'text/javascript' }); return r.end(jsOverride); }
  if (p === '/index.html' && htmlOverride) { r.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); return r.end(htmlOverride); }
  const f = path.join(DIST, p);
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'Content-Type': M[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
}).listen(8798);
const baseJs = fs.readFileSync(path.join(DIST, 'js/site.js'), 'utf8');
const baseHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
let fails = 0;
const ok = (n, c, d) => { console.log((c ? 'PASS  ' : 'FAIL  ') + n + (d !== undefined && !c ? '  — ' + d : '')); if (!c) fails++; };

async function load(b, flags, htmlEdit) {
  jsOverride = flags ? baseJs.replace(/var FLAGS = \{[\s\S]*?\};/, m => {
    let s = m;
    for (const f of flags) s = s.replace(new RegExp("('" + f.replace('.', '\\.') + "':\\s*)false"), '$1true');
    return s;
  }) : null;
  htmlOverride = htmlEdit ? htmlEdit(baseHtml) : null;
  const p = await b.newPage({ viewport: { width: 375, height: 812 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://127.0.0.1:8798/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(300);
  const r = await p.evaluate(() => ({
    text: document.body.innerText.toLowerCase(),
    tel: document.querySelectorAll('a[href^="tel:"]').length,
    visibleStamps: Array.from(document.querySelectorAll('.stamp')).filter(s => s.offsetParent).length,
  }));
  r.errs = errs; await p.close(); return r;
}

(async () => {
  const b = await chromium.launch();
  const d = await load(b, null);
  ok('default: no tel: links', d.tel === 0, d.tel);
  ok('default: no $ in visible text', !/\$/.test(d.text));
  for (const w of ['Valet', 'Pool table', 'Korean Tacos', 'Minimum', 'Seven nights', 'Look for the duck', 'Facebook', 'Photo slot', '오리궁둥이', 'Validated parking'])
    ok('default: hides "' + w + '"', !d.text.includes(w.toLowerCase()));
  ok('default: no JS errors', d.errs.length === 0, d.errs.join('; '));

  const all = ['phone.telVerified', 'hours.daysConfirmed', 'prices.food', 'prices.drinks', 'rooms.perSong', 'rooms.minimum', 'rooms.blocksConfirmed', 'parking.validation', 'parking.valet', 'amenities.pool', 'social.facebook', 'sign.duckConfirmed', 'name.hangulStandard', 'photos.showSlots', 'menu.tacosConfirmed'];
  const on = await load(b, all);
  ok('all flags on, no values typed: prices stay gated (no $)', !/\$/.test(on.text));
  ok('all flags on: tel: links appear', on.tel > 0, on.tel);
  for (const w of ['Valet available', 'Pool table', 'Korean Tacos', 'Seven nights a week', 'Look for the duck on the sign', 'Facebook', 'Photo slot', '오리궁둥이', 'ori gungdungi', 'Validated parking available', '5–8 · 8–11'])
    ok('all flags on: shows "' + w + '"', on.text.includes(w.toLowerCase()));
  ok('all flags on: no JS errors', on.errs.length === 0, on.errs.join('; '));

  const priced = await load(b, ['prices.food'], h => h.replace('data-gate="prices.food" data-value=""', 'data-gate="prices.food" data-value="$25"'));
  ok('prices.food + one typed value: that price shows', priced.text.includes('$25'));
  ok('prices.food + one typed value: the other rows stay gated', priced.visibleStamps > 10, priced.visibleStamps);

  const one = await load(b, ['amenities.pool']);
  ok('one flag on: only its own value appears', one.text.includes('pool table') && !one.text.includes('valet') && !one.text.includes('korean tacos'));

  await b.close(); srv.close();
  console.log(fails ? fails + ' FAILED' : 'all gate checks passed');
  process.exit(fails ? 1 : 0);
})();
