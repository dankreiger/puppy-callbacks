  
#!/usr/bin/env bash
echo "┏━━━ 🧹 CLEAN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
rimraf lib
rimraf es
rimraf dist
rimraf types
rimraf lib *.tsbuildinfo
rimraf coverage
rimraf temp
rimraf *.loh
rimraf node_modules