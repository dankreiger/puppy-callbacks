#!/usr/bin/env bash
echo
echo "┏━━━ 🧩 API REPORT: workspaces ━━━━━━━━━━━━━━━━━━━━━"
echo
yarn clean
yarn build

yarn lerna run api-report