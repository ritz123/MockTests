#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required to start the server." >&2
  exit 1
fi

if [[ ! -d node_modules ]]; then
  npm install
fi

exec npm run dev
