#!/bin/bash
# File name: batch_manual__dev_machine__dev_restore_with_prod_data.sh

echo 
echo 
echo 
echo "-----------------------   Frozen Gem Files Restore PROD data in DEV machine   -----------------------"
echo 
echo       To be run on DEV machine 
echo 
echo       Actions:
echo       - Backup old dev db
echo       - Replace it with PROD db
echo       - Replace content files with PROD ones
echo
echo "!!!!!!!!!!!!!!!!!!!!!!!!! CAUTION START !!!!!!!!!!!!!!!!!!!!!!!!!"
echo "folder_root path is MACHINE & USER dependant"
echo "****************** vvvvvv EDIT HERE vvvvvv ******************"
folder_root=/Users/lav/workspace/frozen-bo
echo "Current folder_root: $folder_root"
echo "!!!!!!!!!!!!!!!!!!!!!!!!! CAUTION END !!!!!!!!!!!!!!!!!!!!!!!!!"

echo  "1 - save DEV db"
mongodump --uri "mongodb://localhost:27017/frozen-dev"  --out ~/dev_backup

echo  "2 - delete DEV db  "
mongo < batch_auto__dev_machine__mongo_drop_dev.js

echo  "3 -  download the archive by browsing this url & use 7zip..."
cd $folder_root
rm -fr tmp
mkdir tmp
curl -L -k https://frozengem.com/public-backup/db.tar.gz -o tmp/db.tar.gz
curl -L -k https://frozengem.com/public-backup/files.tar.gz -o tmp/files.tar.gz

echo  "4 - unzip the db"
cd $folder_root/tmp
mkdir dump_db
tar xvf db.tar.gz -C dump_db

echo  "5 - rename the db folder in the unzipped tree "
echo  "    to restore a prod db (frozen) in a dev db (frozen-dev): rename frozen folder in frozen-dev"
cd dump_db
latest_folder_name=`ls -dftr1 * | tail -1`
echo "        cd here: $latest_folder_name"
cd $latest_folder_name
mv frozen frozen-dev

echo  "6 - restore db:"
cd $folder_root/tmp/dump_db
mongorestore -u 'frozen' -p 'gem' --authenticationDatabase "frozen" $latest_folder_name


echo  "7 - Restore / unzip the files at the right spot"
cd $folder_root
rm -fr static.sav
mv static static.sav
tar xvf tmp/files.tar.gz 

echo " 8 - Cleaning "
cd $folder_root
rm -fr tmp
