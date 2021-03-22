#!/usr/bin/env bash
echo 
echo "┏━━━ 🎯 TEST: $(echo "${PWD##*/}") ━━━━━━━━━━━━━━━━━━━"
echo
yarn jest --coverage

