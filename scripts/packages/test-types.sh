#!/usr/bin/env bash
echo 
echo "┏━━━ 🎯 TEST-TYPES: $(echo "${PWD##*/}") ━━━━━━━━━━━━━━━━━━━"
echo

yarn dtslint src/ts/tests/types-dtslint/
# yarn tsd src/ts/tests/types-tsd/declarations/