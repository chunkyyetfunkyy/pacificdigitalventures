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
  echo "No site id recorded; creating Netlify site '$SITE_NAME'..."
  CREATE_JSON="$("$NETLIFY" sites:create --name "$SITE_NAME" --json 2>/dev/null || "$NETLIFY" sites:create --name "$SITE_NAME-$RANDOM" --json)"
  SITE_ID="$(node -e 'const s=JSON.parse(require("fs").readFileSync(0,"utf8"));process.stdout.write(s.id||s.site_id||"")' <<<"$CREATE_JSON")"
  [[ -n "$SITE_ID" ]] || { echo "Could not read site id from sites:create output:"; echo "$CREATE_JSON"; exit 1; }
  node -e 'const fs=require("fs");let s={};try{s=JSON.parse(fs.readFileSync(process.argv[2],"utf8"))}catch(e){};s.site_id=process.argv[1];s.site_name=s.site_name||process.argv[3];fs.writeFileSync(process.argv[2],JSON.stringify(s,null,2)+"\n")' "$SITE_ID" "$STATE" "$SITE_NAME"
  echo "Recorded site id $SITE_ID in $STATE"
fi

echo "Deploying dist/ to site $SITE_ID (production)..."
OUT="$("$NETLIFY" deploy --prod --dir="$ROOT/dist" --site "$SITE_ID" --json --message "cafe-duck-butt spec $(date -u +%Y-%m-%dT%H:%MZ)")"
echo "$OUT" | node -e '
const o=JSON.parse(require("fs").readFileSync(0,"utf8"));
const fs=require("fs");
const state={site_id:process.argv[1],site_name:o.site_name||process.argv[2],url:o.url||o.deploy_ssl_url||"",deploy_url:o.deploy_url||"",deploy_id:o.deploy_id||"",deployed_at:new Date().toISOString()};
fs.writeFileSync(process.argv[3],JSON.stringify(state,null,2)+"\n");
console.log("Live:",state.url);console.log("Deploy:",state.deploy_url);console.log("State written to",process.argv[3]);
' "$SITE_ID" "$SITE_NAME" "$STATE"
