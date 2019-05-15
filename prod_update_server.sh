pm2 stop boFrozen
pm2 delete boFrozen
git fetch -a
git stash
git pull
rm -fr node_modules
rm package-lock.json
npm install
NODE_ENV=production pm2 start npm -- run prod --name boFrozen  --env production
