#!/usr/bin/env bash
echo
echo "┏━━━ 🕵️‍♀️ LINT: $(echo "${PWD##*/}") ━━━━━━━"
echo
yarn eslint src --ext ts,js
