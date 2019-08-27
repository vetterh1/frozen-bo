#!/bin/bash
# File name: batch_manual__app_server__prod_update_server.sh

filesBackupFolder=~/frozengem_files_backup
dbBackupFolder=~/frozengem_db_backup

pm2 stop boFrozen
pm2 delete boFrozen
git fetch -a
git stash
git pull
chmod 755 ./batch_manual__app_server__prod_update_server.sh
chmod 755 ./batch_manual__dev_machine__dev_restore_with_prod_data.sh
if [[ $1 == "full" ]]; then
    echo "Full update including'npm install'. To do a simple install, please remove the parameter 'full'"
    rm -fr node_modules
    rm package-lock.json
    npm install
else
  echo "Simple update, no 'npm install' was done. To do a full install, please add the parameter 'full'"
fi
NODE_ENV=production pm2 start npm  --name boFrozen  --env production -- run prod

# Info on backups:
echo " "
echo " "
echo "*******************************************************************"
echo "Backup disk usage:"
du -sh $filesBackupFolder
du -sh $dbBackupFolder
echo "*******************************************************************"
echo " "
echo " "
