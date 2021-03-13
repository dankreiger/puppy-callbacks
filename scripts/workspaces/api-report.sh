  
#!/usr/bin/env bash
echo "┏━━━ 🧩 API REPORT: $(pwd) ━━━━━━━━━━━━━━━━━━━━━"
yarn build && yarn lerna run api-report