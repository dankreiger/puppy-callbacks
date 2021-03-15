#!/usr/bin/env bash
echo
echo "┏━━━ 🧩 API REPORT: $(echo "${PWD##*/}") ━━━━━━━━━━━━━━━━━━━━━"
echo
yarn api-extractor run --local