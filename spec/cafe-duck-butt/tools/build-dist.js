#!/usr/bin/env node
/*
 * Assemble dist/ with ONLY the files the page references.
 *   node tools/build-dist.js            -> builds ../dist from ../src
 *
 * - Walks index.html for src/href/srcset/poster, and every CSS file for url(),
 *   recursively, so unreferenced images, raw sources and research never ship.
 * - Fingerprints css/js references with a short content hash (?v=abcdef12) so
 *   long cache lifetimes are safe.
 * - Writes dist/_headers (Netlify) with noindex + cache rules.
 * - Prints a manifest with sizes and refuses to build if a referenced file is missing.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC = path.resolve(__dirname, '..', 'src');
const DIST = path.resolve(__dirname, '..', 'dist');

const seen = new Map(); // rel path -> true
const missing = [];

function addRef(ref, fromDir) {
  if (!ref) return;
  ref = ref.trim().replace(/^['"]|['"]$/g, '');
  if (/^(https?:|data:|mailto:|tel:|sms:|#|\/\/)/i.test(ref)) return;
  ref = ref.split('#')[0].split('?')[0];
  if (!ref) return;
  const abs = ref.startsWith('/') ? path.join(SRC, ref) : path.resolve(fromDir, ref);
  const rel = path.relative(SRC, abs);
  if (rel.startsWith('..')) return;
  if (seen.has(rel)) return;
  if (!fs.existsSync(abs)) { missing.push(rel); return; }
  seen.set(rel, true);
  if (/\.css$/i.test(rel)) scanCss(abs);
  if (/\.html?$/i.test(rel)) scanHtml(abs);
  if (/\.js$/i.test(rel)) scanJs(abs);
}

function scanHtml(file) {
  const dir = path.dirname(file);
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/\b(?:src|href|poster|data-src)\s*=\s*("[^"]*"|'[^']*')/gi)) addRef(m[1], dir);
  for (const m of html.matchAll(/\bsrcset\s*=\s*("[^"]*"|'[^']*')/gi)) {
    m[1].slice(1, -1).split(',').forEach(part => addRef(part.trim().split(/\s+/)[0], dir));
  }
  for (const m of html.matchAll(/url\(([^)]+)\)/gi)) addRef(m[1], dir);
}
function scanCss(file) {
  const dir = path.dirname(file);
  const css = fs.readFileSync(file, 'utf8');
  for (const m of css.matchAll(/url\(([^)]+)\)/gi)) addRef(m[1], dir);
  for (const m of css.matchAll(/@import\s+(?:url\()?("[^"]+"|'[^']+')/gi)) addRef(m[1], dir);
}
function scanJs(file) {
  const dir = path.dirname(file);
  const js = fs.readFileSync(file, 'utf8');
  // only explicit asset strings like 'img/foo.avif' or "/img/foo.webp"
  for (const m of js.matchAll(/["'`]((?:\.?\/)?(?:img|fonts|css|js)\/[^"'`\s]+)["'`]/g)) addRef(m[1], dir);
}

function hash(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 8);
}

// ---- build ----
if (!fs.existsSync(path.join(SRC, 'index.html'))) throw new Error('src/index.html not found');
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
addRef('index.html', SRC);
if (fs.existsSync(path.join(SRC, '404.html'))) addRef('404.html', SRC);
if (missing.length) {
  console.error('Referenced files are missing:\n  ' + missing.join('\n  '));
  process.exit(1);
}

let total = 0;
const manifest = [];
for (const rel of seen.keys()) {
  const from = path.join(SRC, rel), to = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  const size = fs.statSync(to).size;
  total += size;
  manifest.push({ rel, size });
}

// fingerprint css/js references inside dist html files so immutable caching is safe
for (const rel of seen.keys()) {
  if (!/\.html?$/i.test(rel)) continue;
  const file = path.join(DIST, rel);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/((?:src|href)\s*=\s*")([^"?#]+\.(?:css|js))(")/gi, (m, pre, ref, post) => {
    const abs = ref.startsWith('/') ? path.join(DIST, ref) : path.resolve(path.dirname(file), ref);
    if (!fs.existsSync(abs)) return m;
    return pre + ref + '?v=' + hash(abs) + post;
  });
  fs.writeFileSync(file, html);
}

// Netlify headers: this is a spec demo, keep it out of search engines; long cache on fingerprinted assets.
const headers = `/*
  X-Robots-Tag: noindex, nofollow
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/index.html
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate

/img/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable
`;
fs.writeFileSync(path.join(DIST, '_headers'), headers);

manifest.sort((a, b) => b.size - a.size);
console.log('dist/ assembled: ' + manifest.length + ' files, ' + (total / 1024).toFixed(1) + ' KB total');
for (const m of manifest) console.log('  ' + String(m.size).padStart(9) + '  ' + m.rel);
fs.writeFileSync(path.join(DIST, '..', 'tools', 'out', 'dist-manifest.json'), JSON.stringify({ total, files: manifest }, null, 2));
