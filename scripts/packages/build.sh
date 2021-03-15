#!/usr/bin/env bash
echo
echo "┏━━━ 📦 BUILD: $(echo "${PWD##*/}") ━━━━━━━━━━━━━━━━━━━"
echo
yarn rollup -c ./rollup.config.ts
