echo " "
echo " "
echo " --------------- Use on DEV machine to get PROD data --------------- "
echo " "
echo " "

# 1 - save DEV db
mongodump --uri "mongodb://localhost:27017/frozen-dev"  --out ~/dev_backup

# 2 - delete DEV db  
mongo < mongo_drop_dev.js

# 3 -  download the archive by browsing this url & use 7zip...
curl -L -k https://frozengem.com/public-backup/db.tar.gz -o db.tar.gz
curl -L -k https://frozengem.com/public-backup/files.tar.gz -o files.tar.gz

# 4 - unzip the files
tar xvf db.tar.gz
tar xvf files.tar.gz