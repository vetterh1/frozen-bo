pm2 stop boFrozen
pm2 delete boFrozen
git fetch -a
git stash
git pull
rm -fr node_modules
rm package-lock.json
pm2 start src/index.js --name boFrozen --env production
