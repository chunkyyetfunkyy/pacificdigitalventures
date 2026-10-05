#!/usr/bin/env node
/*
 * WCAG contrast checker for the palette.
 *   node tools/contrast.js "#f5efe6/#120a0a" "#0d1a12/#9be36e:large" ...
 *   node tools/contrast.js --css src/css/site.css   (checks every `--pair-*` custom property of the form "fg on bg")
 * Prints ratio and AA / AAA verdicts. Exit 1 if any pair fails AA (4.5:1, or 3:1 when tagged :large).
 */
const fs = require('fs');
function hex(c) { c = c.replace('#', ''); if (c.length === 3) c = c.split('').map(x => x + x).join(''); return [0, 2, 4].map(i => parseInt(c.slice(i, i + 2), 16)); }
function lum([r, g, b]) { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }
function ratio(a, b) { const l1 = lum(hex(a)), l2 = lum(hex(b)); const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]; return (hi + 0.05) / (lo + 0.05); }
let pairs = process.argv.slice(2);
if (pairs[0] === '--css') {
  const css = fs.readFileSync(pairs[1], 'utf8');
  pairs = [...css.matchAll(/--pair-[\w-]+:\s*([^;]+);/g)].map(m => m[1].trim().replace(/\s+on\s+/, '/'));
}
let fail = 0;
for (const p of pairs) {
  const large = p.endsWith(':large');
  const [fg, bg] = p.replace(':large', '').split('/');
  const r = ratio(fg, bg);
  const aa = r >= (large ? 3 : 4.5), aaa = r >= (large ? 4.5 : 7);
  if (!aa) fail++;
  console.log(`${fg} on ${bg}${large ? ' (large)' : ''}: ${r.toFixed(2)}:1  ${aa ? 'AA ok' : 'AA FAIL'}${aaa ? ', AAA' : ''}`);
}
process.exit(fail ? 1 : 0);
