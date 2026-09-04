#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required to start the server." >&2
  exit 1
fi

echo "Resolving npm dependencies..."
npm install

exec npm run dev
