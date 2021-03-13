#!/usr/bin/env bash
echo "┏━━━ 📦 Building $(pwd) ━━━━━━━━━━━━━━━━━━━"
yarn clean && yarn tsc -p tsconfig.prod.json