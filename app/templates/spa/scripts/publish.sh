#!/bin/sh

ROOT=$(cd $(dirname "$0") && cd .. && pwd)
NAME=`basename $ROOT`
TMP_DIR="/tmp/$NAME"

cd $ROOT
REPO_URL=`git remote get-url origin`
npm run prod
rm -rf $TMP_DIR
mkdir $TMP_DIR
cp index.html $TMP_DIR
cp build $TMP_DIR -r

cd $TMP_DIR
git init
git add .
git commit -m "Publish website"
git push $REPO_URL master:gh-pages --force
