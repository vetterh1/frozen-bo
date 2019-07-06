pm2 stop boFrozen
pm2 delete boFrozen
git fetch -a
git stash
git pull
chmod 755 ./prod_update_server.sh
rm -fr node_modules
rm package-lock.json
npm install
NODE_ENV=production pm2 start npm  --name boFrozen  --env production -- run prod
