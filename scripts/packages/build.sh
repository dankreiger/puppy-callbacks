#!/usr/bin/env bash
echo "┏━━━ 📦 Building $(pwd) ━━━━━━━━━━━━━━━━━━━"

yarn clean
yarn rollup -c ./rollup.config.ts
rm -rf lib/__tests__ 