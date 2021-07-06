#!/bin/bash

directory=build
branch=gh-pages

rm -rf $directory
git worktree add $directory $branch
npm run build
cd $directory && git add -all && git commit -m "deploy" && git push origin $branch
git worktree remove $directory