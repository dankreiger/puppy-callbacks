#!/usr/bin/env bash
echo
echo "โโโโ ๐งน CLEAN: $(echo "${PWD##*/}") โโโโโโโโโโโโโโโโโโโโโโโโโโโโ"
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
