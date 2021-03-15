  
#!/usr/bin/env bash
echo
echo "┏━━━ 🧹 CLEAN: workspaces ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo
yarn lerna run clean --concurrency 2

rimraf *.log
rimraf temp
rimraf docs
