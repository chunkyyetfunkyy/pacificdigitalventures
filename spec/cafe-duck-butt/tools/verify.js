#!/usr/bin/env node
/*
 * Verification harness. Serves a directory and proves, with measurements:
 *   - zero console errors, zero failed requests / 404s
 *   - every <img> renders (naturalWidth > 0) and every CSS background image loads
 *   - no horizontal overflow at 375px and at 1440px
 *   - reduced-motion and JS-disabled both yield a complete, readable document
 *     (every expected string from tools/expected.json is present and visible)
 *   - page weight by type, largest assets
 *   - scroll frame timing at 375px (indicative: headless chromium, no GPU)
 *   - axe-core accessibility scan (serious/critical) incl. color contrast
 *
 *   node tools/verify.js [dir=dist] [--out tools/out] [--port 8765]
 * Writes tools/out/verify-report.json and screenshots. Exit 1 on any hard failure.
 */
const path = require('path');
const fs = require('fs');
const http = require('http');
const { chromium } = (function () { for (const c of ['playwright', '/opt/node22/lib/node_modules/playwright', '/opt/node-tools/node_modules/playwright']) { try { return require(c); } catch (e) {} } throw new Error('playwright not found: run `npm i -D playwright` in tools/'); })();

const args = process.argv.slice(2);
const dirArg = args.find(a => !a.startsWith('--')) || 'dist';
const ROOT = path.resolve(__dirname, '..');
const DIR = path.resolve(ROOT, dirArg);
const OUT = path.resolve(ROOT, (args.includes('--out') ? args[args.indexOf('--out') + 1] : 'tools/out'));
const PORT = Number(args.includes('--port') ? args[args.indexOf('--port') + 1] : 8765);
fs.mkdirSync(OUT, { recursive: true });

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.txt': 'text/plain', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };

function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p.endsWith('/')) p += 'index.html';
      const file = path.join(DIR, p);
      if (!file.startsWith(DIR) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end('not found'); }
      const ext = path.extname(file).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    });
    srv.listen(PORT, '127.0.0.1', () => resolve(srv));
  });
}

const expectedPath = path.join(ROOT, 'tools', 'expected.json');
const expected = fs.existsSync(expectedPath) ? JSON.parse(fs.readFileSync(expectedPath, 'utf8')) : { strings: [] };
const norm = s => s.replace(/\s+/g, ' ').replace(/[’ʻ‘]/g, "'").trim().toLowerCase();

const report = { dir: DIR, checks: [], hardFailures: 0 };
function check(name, ok, detail) { report.checks.push({ name, ok: !!ok, detail }); if (!ok) report.hardFailures++; console.log((ok ? 'PASS' : 'FAIL') + '  ' + name + (detail ? '  — ' + (typeof detail === 'string' ? detail : JSON.stringify(detail)).slice(0, 400) : '')); }

async function pageProbe(browser, name, ctxOpts, opts = {}) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const consoleErrors = [], failed = [], responses = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
  page.on('requestfailed', r => failed.push(r.url() + ' ' + (r.failure() && r.failure().errorText)));
  page.on('response', async r => {
    const url = r.url(); if (!url.startsWith('http://127.0.0.1')) return;
    let size = 0; try { size = (await r.body()).length; } catch (e) {}
    responses.push({ url: url.replace(`http://127.0.0.1:${PORT}`, ''), status: r.status(), type: r.request().resourceType(), size });
  });
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(opts.settle || 1500);
  // scroll through to trigger lazy work, then back to top
  if (ctxOpts.javaScriptEnabled !== false) {
    await page.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(800);
  }
  await page.waitForLoadState('networkidle');
  const metrics = await page.evaluate(([expectedStrings, vpWidth]) => {
    const de = document.documentElement;
    const imgs = Array.from(document.images).map(i => ({ src: i.currentSrc || i.src, ok: i.complete && i.naturalWidth > 0, alt: i.alt }));
    // text visibility: every expected string must exist in innerText of a visible element
    const bodyText = document.body.innerText;
    const n = s => s.replace(/\s+/g, ' ').replace(/[’ʻ‘]/g, "'").trim().toLowerCase();
    const missing = expectedStrings.filter(s => !n(bodyText).includes(n(s)));
    // elements with text but effectively invisible (opacity ~0 or offscreen transform)
    const hidden = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node; const seen = new Set();
    while ((node = walker.nextNode())) {
      if (!node.nodeValue.trim()) continue;
      const el = node.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
      if (/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|TITLE)$/.test(el.tagName)) continue;
      let e = el, op = 1, vis = true, gone = false;
      while (e && e !== document.body) { const cs = getComputedStyle(e); op *= parseFloat(cs.opacity); if (cs.visibility === 'hidden') vis = false; if (cs.display === 'none') gone = true; if (/inset\(\s*0(px)?\s+0(px)?\s+100%/.test(cs.clipPath || '')) vis = false; e = e.parentElement; }
      if (gone) continue; // display:none is a deliberate omission (responsive duplicates, owner-gated extras), not hidden-but-present text
      if (op < 0.2 || !vis) hidden.push(el.tagName + '.' + el.className + ': ' + node.nodeValue.trim().slice(0, 40));
    }
    return { scrollWidth: de.scrollWidth, innerWidth: vpWidth, scrollHeight: de.scrollHeight, imgs, missing, hidden: hidden.slice(0, 20), hiddenCount: hidden.length, title: document.title };
  }, [expected.strings || [], ctxOpts.viewport.width]);
  await page.screenshot({ path: path.join(OUT, `shot-${name}.png`), fullPage: true });
  await ctx.close();
  return { consoleErrors, failed, responses, metrics };
}

(async () => {
  const srv = await serve();
  const browser = await chromium.launch({ args: ['--ignore-certificate-errors'] });
  try {
    // 1. mobile 375
    const m = await pageProbe(browser, 'mobile-375', { viewport: { width: 375, height: 812 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    check('mobile: zero console errors', m.consoleErrors.length === 0, m.consoleErrors);
    check('mobile: zero failed requests', m.failed.length === 0, m.failed);
    const bad = m.responses.filter(r => r.status >= 400);
    check('mobile: zero 4xx/5xx responses', bad.length === 0, bad);
    check('mobile: every <img> rendered', m.metrics.imgs.every(i => i.ok), m.metrics.imgs.filter(i => !i.ok));
    check('mobile: no horizontal overflow at 375px', m.metrics.scrollWidth <= m.metrics.innerWidth, { scrollWidth: m.metrics.scrollWidth, innerWidth: m.metrics.innerWidth });
    check('mobile: all expected strings present', m.metrics.missing.length === 0, m.metrics.missing);
    check('mobile: no text left invisible after load', m.metrics.hiddenCount === 0, m.metrics.hidden);
    // page weight
    const byType = {}; let total = 0;
    for (const r of m.responses) { byType[r.type] = (byType[r.type] || 0) + r.size; total += r.size; }
    const largest = [...m.responses].sort((a, b) => b.size - a.size).slice(0, 8).map(r => `${(r.size / 1024).toFixed(0)}KB ${r.url}`);
    report.weight = { totalKB: +(total / 1024).toFixed(1), byTypeKB: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, +(v / 1024).toFixed(1)])), largest };
    check('mobile: total page weight under 1.5 MB', total < 1.5 * 1024 * 1024, report.weight);

    // 2. desktop 1440
    const d = await pageProbe(browser, 'desktop-1440', { viewport: { width: 1440, height: 900 } });
    check('desktop: zero console errors', d.consoleErrors.length === 0, d.consoleErrors);
    check('desktop: no horizontal overflow at 1440px', d.metrics.scrollWidth <= d.metrics.innerWidth, { scrollWidth: d.metrics.scrollWidth, innerWidth: d.metrics.innerWidth });
    check('desktop: every <img> rendered', d.metrics.imgs.every(i => i.ok), d.metrics.imgs.filter(i => !i.ok));
    check('desktop: no text left invisible after load', d.metrics.hiddenCount === 0, d.metrics.hidden);

    // 3. reduced motion
    const rm = await pageProbe(browser, 'reduced-motion-375', { viewport: { width: 375, height: 812 }, reducedMotion: 'reduce', isMobile: true }, { settle: 600 });
    check('reduced-motion: all expected strings present', rm.metrics.missing.length === 0, rm.metrics.missing);
    check('reduced-motion: no text left invisible', rm.metrics.hiddenCount === 0, rm.metrics.hidden);
    check('reduced-motion: zero console errors', rm.consoleErrors.length === 0, rm.consoleErrors);

    // 4. JS disabled
    const nojs = await pageProbe(browser, 'nojs-375', { viewport: { width: 375, height: 812 }, javaScriptEnabled: false, isMobile: true }, { settle: 600 });
    check('no-JS: all expected strings present', nojs.metrics.missing.length === 0, nojs.metrics.missing);
    check('no-JS: no text left invisible', nojs.metrics.hiddenCount === 0, nojs.metrics.hidden);
    check('no-JS: every <img> rendered', nojs.metrics.imgs.every(i => i.ok), nojs.metrics.imgs.filter(i => !i.ok));
    check('no-JS: no horizontal overflow', nojs.metrics.scrollWidth <= nojs.metrics.innerWidth, { scrollWidth: nojs.metrics.scrollWidth });

    // 5. scroll frame timing (indicative)
    {
      const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
      const page = await ctx.newPage();
      await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);
      const fps = await page.evaluate(() => new Promise(resolve => {
        const deltas = []; let last = performance.now(); const start = last; const h = document.documentElement.scrollHeight - innerHeight;
        function frame(t) { deltas.push(t - last); last = t; const p = Math.min(1, (t - start) / 4000); window.scrollTo(0, h * p); if (p < 1) requestAnimationFrame(frame); else { const ds = deltas.slice(2); const avg = ds.reduce((a, b) => a + b, 0) / ds.length; const long = ds.filter(x => x > 20).length; resolve({ frames: ds.length, avgMs: +avg.toFixed(2), avgFps: +(1000 / avg).toFixed(1), framesOver20ms: long, worstMs: +Math.max(...ds).toFixed(1) }); } }
        requestAnimationFrame(frame);
      }));
      report.scroll = fps;
      check('scroll: average frame time under 18ms while scrolling 375px (headless, indicative)', fps.avgMs < 18, fps);
      await ctx.close();
    }

    // 6. axe-core
    {
      const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
      const page = await ctx.newPage();
      await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500); // let the one-shot hero warm-up finish so axe measures the settled colours
      await page.addScriptTag({ path: path.join(__dirname, 'node_modules', 'axe-core', 'axe.min.js') });
      const res = await page.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] } }); return r.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 6).map(n => ({ target: n.target.join(' '), summary: n.failureSummary && n.failureSummary.slice(0, 200) })) })); });
      report.axe = res;
      const serious = res.filter(v => v.impact === 'serious' || v.impact === 'critical');
      check('axe: zero serious/critical violations (incl. color contrast)', serious.length === 0, serious);
      const minor = res.filter(v => v.impact !== 'serious' && v.impact !== 'critical');
      if (minor.length) console.log('  axe minor/moderate: ' + minor.map(v => v.id).join(', '));
      await ctx.close();
    }
  } finally {
    await browser.close();
    srv.close();
  }
  fs.writeFileSync(path.join(OUT, 'verify-report.json'), JSON.stringify(report, null, 2));
  console.log(`\n${report.checks.length - report.hardFailures}/${report.checks.length} checks passed. Report: ${path.join(OUT, 'verify-report.json')}`);
  process.exit(report.hardFailures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
