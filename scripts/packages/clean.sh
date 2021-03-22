#!/usr/bin/env bash
echo
echo "┏━━━ 🧹 CLEAN: $(echo "${PWD##*/}") ━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo

rimraf lib
rimraf es
rimraf dist
rimraf declarations
rimraf node_modules
rimraf lib *.tsbuildinfo
rimraf temp
rimraf coverage

rimraf *.log
