#!/usr/bin/env bash
echo "┏━━━ 💣 BOOM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
lerna run --scope @dankreiger/* --parallel boom
rm -rf node_modules