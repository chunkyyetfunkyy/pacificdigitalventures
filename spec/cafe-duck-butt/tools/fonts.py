#!/usr/bin/env python3
"""Vendor Google Fonts (OFL) locally.

  fonts.py download <family-dir> [<family-dir> ...]
      Fetches every TTF listed in the family's METADATA.pb from the google/fonts
      GitHub repo (ofl/ tree) plus its OFL.txt, into src/fonts/_raw/<family-dir>/.
      Refuses families whose METADATA.pb is not OFL-licensed.

  fonts.py subset <in.ttf> <out.woff2> [--text FILE] [--unicodes RANGES] [--instance wght=700]
      Subsets to the given text file's characters (plus basic Latin, punctuation,
      and the characters in --unicodes) and writes WOFF2. For variable fonts,
      --instance pins an axis so the output is a static font.

Only OFL / free-commercial fonts should pass through here; the license file is
copied next to the output so it ships with the site.
"""
import os, re, sys, shutil, subprocess, urllib.request, urllib.parse

RAW = "https://raw.githubusercontent.com/google/fonts/main/ofl/"
HERE = os.path.dirname(os.path.abspath(__file__))
RAWDIR = os.path.join(HERE, "..", "src", "fonts", "_raw")


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "fonts.py"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def download(family):
    meta = fetch(RAW + family + "/METADATA.pb").decode("utf-8", "replace")
    lic = re.search(r'license:\s*"([^"]+)"', meta)
    if not lic or lic.group(1) != "OFL":
        sys.exit(f"{family}: license is {lic.group(1) if lic else 'unknown'}, not OFL - refusing")
    files = re.findall(r'filename:\s*"([^"]+)"', meta)
    out = os.path.join(RAWDIR, family)
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, "METADATA.pb"), "w") as f:
        f.write(meta)
    for name in ["OFL.txt"] + files:
        data = fetch(RAW + family + "/" + urllib.parse.quote(name))
        with open(os.path.join(out, name), "wb") as f:
            f.write(data)
        print(f"  {family}/{name}  {len(data):,} bytes")
    print(f"{family}: {len(files)} file(s) + OFL.txt")


def subset(src, dst, text_file=None, unicodes=None, instance=None):
    work = src
    if instance:
        # pin variable axes -> static instance
        from fontTools.ttLib import TTFont
        from fontTools.varLib import instancer
        axes = {}
        for pair in instance.split(","):
            k, v = pair.split("=")
            axes[k] = float(v)
        font = TTFont(src)
        if "fvar" in font:
            font = instancer.instantiateVariableFont(font, axes)
            work = dst + ".static.ttf"
            font.save(work)
    base = "U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-205E,U+20AC,U+2122,U+2190-2199,U+2600-26FF,U+FEFF"
    if unicodes:
        base += "," + unicodes
    cmd = ["pyftsubset", work, "--output-file=" + dst, "--flavor=woff2",
           "--layout-features=*", "--unicodes=" + base, "--no-hinting", "--desubroutinize"]
    if text_file:
        cmd.append("--text-file=" + text_file)
    subprocess.check_call(cmd)
    # The ʻokina (U+02BB) is drawn like a left single quote; fonts that lack it get the ‘ glyph mapped to it,
    # so Hawaiian words set in the body fonts instead of a system fallback.
    from fontTools.ttLib import TTFont
    f = TTFont(dst)
    changed = False
    for t in f["cmap"].tables:
        if 0x2018 in t.cmap and 0x02BB not in t.cmap:
            t.cmap[0x02BB] = t.cmap[0x2018]; changed = True
    if changed:
        f.flavor = "woff2"; f.save(dst)
    if work != src and os.path.exists(work):
        os.remove(work)
    # carry the license next to the output
    lic = os.path.join(os.path.dirname(src), "OFL.txt")
    if os.path.exists(lic):
        shutil.copy(lic, os.path.join(os.path.dirname(dst), "OFL-" + os.path.basename(os.path.dirname(src)) + ".txt"))
    print(f"{os.path.basename(dst)}  {os.path.getsize(dst):,} bytes")


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    if a[0] == "download":
        for fam in a[1:]:
            download(fam)
    elif a[0] == "subset":
        src, dst = a[1], a[2]
        opts = dict(zip(a[3::2], a[4::2]))
        subset(src, dst, opts.get("--text"), opts.get("--unicodes"), opts.get("--instance"))
    else:
        sys.exit(__doc__)
