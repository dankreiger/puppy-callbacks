#!/usr/bin/env bash
echo "┏━━━ 📶 SORT: workspaces ━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
yarn sort-package-json
yarn lerna run sort --concurrency 2
