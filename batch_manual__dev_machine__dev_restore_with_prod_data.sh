#!/bin/bash
# File name: batch_manual__dev_machine__dev_restore_with_prod_data.sh

echo 
echo 
echo 
echo -----------------------   Frozen Gem Files Restore PROD data in DEV machine   -----------------------
echo 
echo       To be run on DEV machine 
echo 
echo       Actions:
echo       - Backup old dev db
echo       - Replace it with PROD db
echo       - Replace content files with PROD ones
echo



# 1 - save DEV db
mongodump --uri "mongodb://localhost:27017/frozen-dev"  --out ~/dev_backup

# 2 - delete DEV db  
mongo < mongo_drop_dev.js

# 3 -  download the archive by browsing this url & use 7zip...
mkdir tmp
curl -L -k https://frozengem.com/public-backup/db.tar.gz -o tmp/db.tar.gz
curl -L -k https://frozengem.com/public-backup/files.tar.gz -o tmp/files.tar.gz

# 4 - unzip the files
mkdir tmp/dump_db
mkdir tmp/dump_files
cd tmp
tar xvf db.tar.gz -C dump_db
tar xvf files.tar.gz -C dump_files

# 5 - rename the db folder in the unzipped tree 
#     to restore a prod db (frozen) in a dev db (frozen-dev): rename frozen folder in frozen-dev
cd `ls -dftr1 * | tail -1`
mv ./frozen ./frozen-dev
cd ..

# 6 - restore db:
mongorestore -u 'frozen' -p 'gem' --authenticationDatabase "frozen" `ls -dftr1 * | tail -1`
cd ..

# 7 - Restore the files (images) 