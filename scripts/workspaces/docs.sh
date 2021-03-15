#!/usr/bin/env bash
echo 
echo "┏━━━ 📖 DOCS: workspaces ━━━━━━━━━━━━━━"
echo
echo "┏━━━ 📚 DOCS: Extracting API surface ━━━━━━━━━━━━━━"
echo
yarn api-report
echo
echo "┏━━━ 📝 DOCS: Generating Markdown Docs ━━━━━━━━━━━━"
echo
GH_PAGES_CFG_EXISTS=$(test -f docs/_config.yml)
if [ $GH_PAGES_CFG_EXISTS ]
then
  echo "GitHub pages config file DETECTED"
  cp docs/_config.yml .
fi

yarn api-documenter markdown -i temp -o docs

if [ $GH_PAGES_CFG_EXISTS ]
then
  cp _config.yml docs/_config.yml
fi