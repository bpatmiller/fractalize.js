#!/bin/bash

directory=build
branch=gh-pages

rm -rf $directory
git worktree add $directory $branch
rm -rf ../build
cp -r build/ ../build/
npm run build
cp ../build/.git build/
cd $directory && git add --all && git commit -m "deploy" && git push origin $branch
git worktree remove $directory