  
#!/usr/bin/env bash
echo "┏━━━ 🧹 CLEAN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
yarn lerna run clean --concurrency 2

rm *.log
rimraf temp
rimraf docs