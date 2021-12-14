#!/bin/bash
# File name: cron_job__app_server__backup_frozengem_files.sh

echo 
echo 
echo 
echo -----------------------   Frozen Gem Files Backup  -----------------------
echo 
echo       To be run from Application App server
echo 
echo       Actions:
echo       - Compresses the static folder with the images
echo       - Moves it to a local backup folder
echo       - Cleans the backup folder from old files older than 10 days
echo       - Cleans the db backup folder from old files older than 10 days
echo       - Cleans the foodmaniac folder from old files older than 10 days
echo
echo       Use keychain to get a password-less sFTP access with NO passphrase
echo       Then put this script in APP server crontab for automatic running:
echo "         # Create backup for content files on the APP server "
echo "         @reboot sleep 60 && /home/lve/cron_job__app_server__backup_frozengem_files.sh &>> /home/lve/cron_job__app_server__backup_frozengem_files.log "
echo "         0 6,18 * * * /home/lve/cron_job__app_server__backup_frozengem_files.sh &>> /home/lve/cron_job__app_server__backup_frozengem_files.log "
echo 
echo ---------------------------- Prepares Backup ----------------------------
echo 
echo 

current_time=$(date "+%Y.%m.%d-%H.%M.%S")
echo "Start File Backup at $current_time"


# Folder Location
folder_root=/home/lve/workspace/frozen-bo
folder_root_source=./static
folder_root_destination=/home/lve/frozengem_files_backup
db_folder_root_destination=/home/lve/frozengem_db_backup
foodmaniac_folder_root_destination=/home/lve/db_backup


# Backup variables
# (!) Delete backups older than 10 days (!)
delete_backups_older_than_this=10


# Dump & gz variables
archive_base_name=frozen_gem_files_backup_
archive_complete_path=$folder_root_destination/$archive_base_name$current_time.tar.gz

# Clean variables
db_archive_base_name=frozen_gem_db_backup_
foodmaniac_archive_base_name=food_maniac_db_backup_

echo "Folder to archive : $folder_root/$folder_root_source"
echo "Archive name : $archive_complete_path"


echo 
echo 
echo ---------------------------- Compresses source folder ----------------------------
echo 
echo 

cd $folder_root
tar cvzf $archive_complete_path $folder_root_source


echo 
echo 
echo ---------------------------- Cleans ----------------------------
echo 
echo 


echo "Remove backups older than $delete_backups_older_than_this days"
echo "List of files removed:"
find $folder_root_destination -type f -mtime +$delete_backups_older_than_this -name "$archive_base_name*.gz"
find $folder_root_destination -type f -mtime +$delete_backups_older_than_this -name "$archive_base_name*.gz" -delete

find $db_folder_root_destination -type f -mtime +$delete_backups_older_than_this -name "$db_archive_base_name*.gz"
find $db_folder_root_destination -type f -mtime +$delete_backups_older_than_this -name "$db_archive_base_name*.gz" -delete

find $foodmaniac_folder_root_destination -type f -mtime +$delete_backups_older_than_this -name "$foodmaniac_archive_base_name*.gz"
find $foodmaniac_folder_root_destination -type f -mtime +$delete_backups_older_than_this -name "$foodmaniac_archive_base_name*.gz" -delete


current_end_time=$(date "+%Y.%m.%d-%H.%M.%S")
echo "End File Backup at $current_end_time"
echo 
echo 
echo ---------------------------- Backup finished ----------------------------
echo 
echo 
