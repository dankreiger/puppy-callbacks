  
#!/usr/bin/env bash
echo
echo "โโโโ ๐งน CLEAN: workspaces โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ"
echo
yarn lerna run clean --concurrency 2

rimraf *.log
rimraf temp
rimraf docs
