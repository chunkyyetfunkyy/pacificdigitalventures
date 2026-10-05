// Viewport screenshots of each section at phone and desktop sizes, for visual review.
const path = require('path'); const http = require('http'); const fs = require('fs');
const { chromium } = (function () { for (const c of ['playwright', '/opt/node22/lib/node_modules/playwright', '/opt/node-tools/node_modules/playwright']) { try { return require(c); } catch (e) {} } throw new Error('playwright not found: run `npm i -D playwright` in tools/'); })();
const DIR = path.resolve(__dirname, '..', process.argv[2] || 'dist'); const OUT = path.resolve(__dirname, 'out', 'sections'); fs.mkdirSync(OUT, { recursive: true });
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
const srv = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(DIR, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); }).listen(8790);
(async () => {
  const b = await chromium.launch();
  for (const [name, vp, scale] of [['m', { width: 375, height: 812 }, 2], ['d', { width: 1440, height: 900 }, 1]]) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: scale, isMobile: name === 'm' });
    const p = await ctx.newPage(); await p.goto('http://127.0.0.1:8790/', { waitUntil: 'networkidle' }); await p.waitForTimeout(2200);
    await p.screenshot({ path: path.join(OUT, `${name}-00-top.png`) });
    const ids = ['about', 'menu', 'soju', 'rooms', 'scene', 'find'];
    for (let i = 0; i < ids.length; i++) {
      await p.evaluate(id => document.getElementById(id).scrollIntoView({ block: 'start' }), ids[i]); await p.waitForTimeout(1400);
      await p.screenshot({ path: path.join(OUT, `${name}-${String(i + 1).padStart(2, '0')}-${ids[i]}.png`) });
      if (name === 'm') { await p.evaluate(() => window.scrollBy(0, 700)); await p.waitForTimeout(900); await p.screenshot({ path: path.join(OUT, `${name}-${String(i + 1).padStart(2, '0')}-${ids[i]}-b.png`) }); }
    }
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(900);
    await p.screenshot({ path: path.join(OUT, `${name}-99-foot.png`) });
    await ctx.close();
  }
  await b.close(); srv.close();
})();
