#!/usr/bin/env bash
echo "┏━━━ 🏗️  POSTINSTALL: workspaces ━━━━━━━"
is-ci || husky install
is-ci || yarn lerna bootstrap
is-ci || yarn build
is-ci || yarn sort