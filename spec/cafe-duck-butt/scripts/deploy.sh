#!/usr/bin/env bash
# One-shot production deploy to Netlify (costs ~15 credits on the free plan, so run ONCE).
#   scripts/deploy.sh            -> builds dist/ then deploys
#   scripts/deploy.sh --no-build -> deploys the existing dist/
#
# Uses the Netlify CLI on Kevin's Mac. Records site id + urls in scripts/deploy-state.json.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NETLIFY="${NETLIFY_CLI:-/Users/kevinosborne/kailua-golf-shop/node_modules/.bin/netlify}"
STATE="$ROOT/scripts/deploy-state.json"
SITE_NAME="${SITE_NAME:-cafe-duck-butt-spec}"

if [[ "${1:-}" != "--no-build" ]]; then
  "$ROOT/scripts/build-dist.sh"
fi

[[ -x "$NETLIFY" ]] || { echo "Netlify CLI not found at $NETLIFY (set NETLIFY_CLI=...)"; exit 1; }

SITE_ID="$(node -e 'try{const s=require(process.argv[1]);process.stdout.write(s.site_id||"")}catch(e){}' "$STATE")"

if [[ -z "$SITE_ID" ]]; then
  # Run sites:create in the open so any prompt (e.g. "which team?") is visible, and never link this repo to the site.
  LINKFLAG=()
  "$NETLIFY" sites:create --help 2>/dev/null | grep -q -- '--disable-linking' && LINKFLAG=(--disable-linking)
  NAME="$SITE_NAME"
  echo "No site id recorded; creating Netlify site '$NAME'..."
  if ! "$NETLIFY" sites:create --name "$NAME" "${LINKFLAG[@]}"; then
    NAME="$SITE_NAME-$(date +%s | tail -c 5)"
    echo "Name taken or create failed; trying '$NAME'..."
    "$NETLIFY" sites:create --name "$NAME" "${LINKFLAG[@]}"
  fi
  # Look the new site up by name instead of parsing CLI output, which changes between CLI versions.
  SITE_ID="$("$NETLIFY" api listSites --data '{"filter":"all","per_page":100}' | node -e '
    const sites=JSON.parse(require("fs").readFileSync(0,"utf8"));
    const s=sites.find(x=>x.name===process.argv[1]); process.stdout.write(s?s.id:"")' "$NAME")"
  [[ -n "$SITE_ID" ]] || { echo "Created '$NAME' but could not find its id via 'netlify api listSites'. Put the id in $STATE and re-run."; exit 1; }
  SITE_NAME="$NAME"
  node -e 'const fs=require("fs");let s={};try{s=JSON.parse(fs.readFileSync(process.argv[2],"utf8"))}catch(e){};s.site_id=process.argv[1];s.site_name=process.argv[3];fs.writeFileSync(process.argv[2],JSON.stringify(s,null,2)+"\n")' "$SITE_ID" "$STATE" "$SITE_NAME"
  echo "Recorded site id $SITE_ID ($SITE_NAME) in $STATE"
  # A brand-new site is not instantly visible to the config lookup `netlify deploy` runs first; deploying in the
  # same second fails with 'Project not found. Please rerun "netlify link"' (the CLI falls back to a by-name
  # lookup). Wait until the API returns the site's url before deploying.
  for _ in $(seq 1 15); do
    "$NETLIFY" api getSite --data "{\"site_id\":\"$SITE_ID\"}" 2>/dev/null | grep -q '"url"' && break
    sleep 2
  done
fi

NOBUILD=()
"$NETLIFY" deploy --help 2>/dev/null | grep -q -- '--no-build' && NOBUILD=(--no-build)   # dist/ is already built; never let Netlify build
echo "Deploying dist/ to site $SITE_ID (production)..."
OUT="$("$NETLIFY" deploy --prod "${NOBUILD[@]}" --dir="$ROOT/dist" --site "$SITE_ID" --json --message "cafe-duck-butt spec $(date -u +%Y-%m-%dT%H:%MZ)")"
echo "$OUT" | node -e '
const o=JSON.parse(require("fs").readFileSync(0,"utf8"));
const fs=require("fs");
const state={site_id:process.argv[1],site_name:o.site_name||process.argv[2],url:o.url||o.deploy_ssl_url||"",deploy_url:o.deploy_url||"",deploy_id:o.deploy_id||"",deployed_at:new Date().toISOString()};
fs.writeFileSync(process.argv[3],JSON.stringify(state,null,2)+"\n");
console.log("Live:",state.url);console.log("Deploy:",state.deploy_url);console.log("State written to",process.argv[3]);
' "$SITE_ID" "$SITE_NAME" "$STATE"
echo
echo "Next: prove the live site (console, 404s, images, overflow, no-JS, reduced motion, weight, scroll, axe, noindex headers):"
echo "  node \"$ROOT/tools/verify.js\" \"$(node -e 'process.stdout.write(require(process.argv[1]).url||"")' "$STATE")\""
