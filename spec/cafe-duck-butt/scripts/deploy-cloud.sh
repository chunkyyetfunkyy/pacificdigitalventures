#!/usr/bin/env bash
# Deploy from a Claude cloud session (no Mac CLI login). Needs:
#   - NETLIFY_AUTH_TOKEN in the environment (a Netlify personal access token with deploy rights)
#   - api.netlify.com and *.netlify.app allowed by the environment's network policy
# Uses netlify-cli from npm and then reuses scripts/deploy.sh.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
[[ -n "${NETLIFY_AUTH_TOKEN:-}" ]] || { echo "NETLIFY_AUTH_TOKEN is not set in this environment."; exit 1; }
CLI_DIR="$ROOT/tools/netlify-cli"
if [[ ! -x "$CLI_DIR/node_modules/.bin/netlify" ]]; then
  mkdir -p "$CLI_DIR" && (cd "$CLI_DIR" && npm init -y >/dev/null && npm i --silent netlify-cli)
fi
NETLIFY_CLI="$CLI_DIR/node_modules/.bin/netlify" "$ROOT/scripts/deploy.sh" "$@"
