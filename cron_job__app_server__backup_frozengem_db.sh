#!/bin/bash
# File name: cron_job__app_server__backup_frozengem_db.sh

echo 
echo 
echo 
echo -----------------------   Frozen Gem DB Backup  -----------------------
echo 
echo       To be run from App server (or on Mac)
echo 
echo       Actions:
echo       - Creates a dump folder
echo       - Compresses this dump and timestamp it
echo       - Moves it to a local backup folder
echo       - Cleans the backup folder from old files older than 15 days
echo
echo       Then put this script in APP server crontab for automatic running:
echo "         # Create backup for DB content on the APP server "
echo "         # (files backup is done through an equivalent command on the same APP server) "
echo "         0 6,18 * * * /home/lve/cron_job__app_server__backup_frozengem_db.sh &>> /home/lve/cron_job__app_server__backup_frozengem_db.log "
echo "         @reboot sleep 60 && /home/lve/cron_job__app_server__backup_frozengem_db.sh &>> /home/lve/cron_job__app_server__backup_frozengem_db.log "
echo 
echo ---------------------------- Prepares Backup ----------------------------
echo 
echo 

current_time=$(date "+%Y.%m.%d-%H.%M.%S")
echo "Start DB Backup at $current_time"

# Folder Location
folder_root=~

# Backup & sFTP variables
# (!) Delete backups older than 50 days (!)
delete_backups_older_than_this=50
backup_folder=frozengem_db_backup
backup_folder_complete_path=$folder_root/$backup_folder
remote_backup_folder=frozengem_db_backup
sftp_host=51.255.46.214
sftp_user=lve

# Dump & gz variables
dump_folder_base_name=frozen_gem_dump_
dump_folder_complete_path=$dump_folder_base_name$current_time
archive_base_name=frozen_gem_db_backup_
archive_complete_path=$backup_folder_complete_path/$archive_base_name$current_time.tar.gz

echo "Dump path : $dump_folder_complete_path"
echo "Archive name : $archive_complete_path"


echo 
echo ---------------------------- Runs Backup ----------------------------
echo 
echo 

mongodump --uri mongodb+srv://adminFrozen:frozenPwd@frozengemcluster.1uuuf.mongodb.net/frozen --forceTableScan --out $dump_folder_complete_path


echo 
echo 
echo ---------------------------- Compresses Backup ----------------------------
echo 
echo 

tar cvzf $archive_complete_path $dump_folder_complete_path


echo 
echo 
echo ---------------------------- Cleans ----------------------------
echo 
echo 

rm -fr $dump_folder_complete_path

echo "Remove backups older than $delete_backups_older_than_this days"
echo "List of files removed:"
find $backup_folder_complete_path -type f -mtime +$delete_backups_older_than_this -name "$archive_base_name*.gz"
find $backup_folder_complete_path -type f -mtime +$delete_backups_older_than_this -name "$archive_base_name*.gz" -delete


current_end_time=$(date "+%Y.%m.%d-%H.%M.%S")
echo "End DB Backup at $current_end_time"
echo 
echo 
echo ---------------------------- Backup finished ----------------------------
echo 
echo 
