#!/usr/bin/env python3
"""Merge every raw research output into research/all-facts.json.

Sources:
  research/raw/*.json                      (Agent-tool researchers)
  <workflow journal>.jsonl 'completed' rows (Workflow researchers; pass path as argv[1])
Dedupes exact-duplicate (claim, source_url) pairs and prints a per-category count.
"""
import glob, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
RES = os.path.join(HERE, '..', 'research')
out, seen = [], set()
dead = []

def add(facts, origin):
    for f in facts or []:
        if not isinstance(f, dict) or 'claim' not in f:
            continue
        key = (f.get('claim', '').strip().lower(), f.get('source_url', '').strip())
        if key in seen:
            continue
        seen.add(key)
        f = dict(f)
        f['origin'] = origin
        out.append(f)

for path in sorted(glob.glob(os.path.join(RES, 'raw', '*.json'))):
    try:
        d = json.load(open(path))
    except Exception as e:
        print('skip', path, e); continue
    add(d.get('facts'), os.path.basename(path))
    dead += [os.path.basename(path) + ': ' + x for x in d.get('dead_ends', [])]

if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
    for line in open(sys.argv[1]):
        try:
            row = json.loads(line)
        except Exception:
            continue
        if row.get('type') not in ('completed', 'result'):
            continue
        res = row.get('result') or row.get('value') or row.get('output')
        if isinstance(res, str):
            try: res = json.loads(res)
            except Exception: res = None
        if isinstance(res, dict):
            add(res.get('facts'), 'workflow:' + str(row.get('label', '?')))
            dead += ['workflow:' + str(row.get('label', '?')) + ': ' + x for x in res.get('dead_ends', [])]

json.dump({'facts': out, 'dead_ends': dead}, open(os.path.join(RES, 'all-facts.json'), 'w'), indent=1, ensure_ascii=False)
cats = {}
for f in out:
    cats[f.get('category', '?')] = cats.get(f.get('category', '?'), 0) + 1
print(len(out), 'facts,', len(dead), 'dead ends ->', os.path.join(RES, 'all-facts.json'))
for k, v in sorted(cats.items(), key=lambda x: -x[1]):
    print(f'  {v:3d}  {k}')
