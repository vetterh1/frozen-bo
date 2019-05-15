pm2 stop boFrozen
pm2 delete boFrozen
git fetch -a
git stash
git pull
rm -fr node_modules
rm package-lock.json
NODE_ENV=production pm2 start pm2config.json --env production

