#!/bin/bash
# File name: cron_job__app_server__make_latest_backup_downloadable.sh

echo -----------------------   Make backup downloadable from browser  -----------------------
# 
#       To be run from Mongo APP server 51.255.46.214
# 
#       Actions: 
#       - Copy latest db and files from the backup folder to a folder publicly available through the FO server
# 
#       Results: they are available here:
#       - https://frozengem.com/public-backup/files.tar.gz
#       - https://frozengem.com/public-backup/db.tar.gz
#
#       Should put this script in crontab for automatic running
#       but the running time should be after the backup time: 8, 18
# "         0 7,19 * * * /home/lve/cron_job__app_server__make_latest_backup_downloadable.sh &>> /home/lve/cron_job__app_server__make_latest_backup_downloadable.log "
# "         @reboot sleep 160 && /home/lve/cron_job__app_server__make_latest_backup_downloadable.sh &>> /home/lve/cron_job__app_server__make_latest_backup_downloadable.log "
# 

current_time=$(date "+%Y.%m.%d-%H.%M.%S")
echo "Starts at $current_time"

publicBackupFolder=~/workspace/frozengem/build/frozenbackup
filesBackupFolder=~/frozengem_files_backup
dbBackupFolder=~/frozengem_db_backup

echo "Create folder if does not exist yet. Generates an OK error if it already exists."
mkdir $publicBackupFolder

echo "Copy latest db and files from the backup folder to a folder publicly available through the FO server"
cp -p "`ls -frt1 $filesBackupFolder/* | tail -n 1`" $publicBackupFolder/files.tar.gz
cp -p "`ls -frt1 $dbBackupFolder/* | tail -n 1`" $publicBackupFolder/db.tar.gz

echo "Content of the public folder:"
ls -flrth  $publicBackupFolder

current_time=$(date "+%Y.%m.%d-%H.%M.%S")
echo "Ends at $current_time"

# notes on ls options:
# -f: remove colore
# -rt: sort by reverse time --> newest last 
# -1: 1 result per line
# -h: (with -l): human readable --> kb, mb...

# notes on tail options:
# -n 1: displays only the last line

