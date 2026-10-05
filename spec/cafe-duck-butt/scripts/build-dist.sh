#!/usr/bin/env bash
# Assemble dist/ with only the files index.html references, plus Netlify _headers.
# Usage: scripts/build-dist.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/tools/out"
node "$ROOT/tools/build-dist.js"
echo
echo "dist/_headers:"
sed 's/^/  /' "$ROOT/dist/_headers"
