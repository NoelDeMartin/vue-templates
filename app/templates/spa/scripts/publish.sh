#!/usr/bin/env sh

REPO_URL=`git remote get-url origin`

# abort on errors
set -e

# build
npm run prod
rm dist -rf && mkdir dist
cp index.html dist
cp build dist -r
cd dist

# create repository
git init
git add -A
git commit -m "Publish website"

# push updates
git push $REPO_URL master:gh-pages --force

cd -
