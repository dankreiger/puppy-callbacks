#!/usr/bin/env bash
echo "┏━━━ 💣 BOOM: workspaces ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
yarn lerna run --concurrency 2 boom
rm -rf node_modules