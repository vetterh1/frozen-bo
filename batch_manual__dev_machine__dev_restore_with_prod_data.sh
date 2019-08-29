#!/bin/bash
# File name: batch_manual__dev_machine__dev_restore_with_prod_data.sh
#
echo "-----------------------   Frozen Gem Files Restore PROD data in DEV machine   -----------------------"
echo " "
echo       To be run on DEV machine 
echo " "
echo       Actions:
echo       - Backup old dev db
echo       - Replace it with PROD db
echo       - Replace content files with PROD ones
echo " "
echo " "
echo " "
echo "!!!!!!!!!!!!!!!!!!!!!!!!! CAUTION START !!!!!!!!!!!!!!!!!!!!!!!!!"
echo " "
echo " "
echo "      folder_root & mongo path are MACHINE & USER dependant"
echo " "
echo " "
echo "Use the options:"
echo "-p or --pc: standard presets for PC. These presets can be modified in the script"
echo "-m or --mac: standard presets for MAC. These presets can be modified in the script"
echo "-r or --root: (exclusive with --pc & --mac) specify the frozen-bo folder. MUST END WITH /"
echo "-d or --mongodb: (exclusive with --pc & --mac) specify the mongodb folder. MUST END WITH /"
echo " "
echo " "
folder_root=
folder_root_pc=c:/workspace/frozen-bo/
folder_root_mac=~/workspace/frozen-bo/
mongo_root=
mongo_root_pc=C:/PROGRA~1/MongoDB/Server/4.0/bin/
mongo_root_mac=
echo "!!!!!!!!!!!!!!!!!!!!!!!!! CAUTION END !!!!!!!!!!!!!!!!!!!!!!!!!"
echo " "
echo " "
echo " "
#


usage()
{
    echo " "
    echo "usage: batch_manual__dev_machine__dev_restore_with_prod_data [[--pc ] | [--mac]] | [[-r folder ] [-d folder]] | [-h]]"
    echo " "
    read -n 1 -p "Press a key to exit."
}



while [ "$1" != "" ]; do
    case $1 in
        -r | --root )           shift
                                echo "Detected --root option"
                                folder_root=$1
                                ;;
        -d | --mongodb )        shift
                                echo "Detected --mongodb option"
                                mongo_root=$1
                                ;;
        -p | --pc )             echo "Detected --pc option"
                                folder_root=$folder_root_pc
                                mongo_root=$mongo_root_pc
                                ;;
        -m | --mac )            echo "Detected --mac option"
                                folder_root=$folder_root_mac
                                mongo_root=$mongo_root_mac
                                ;;
        -h | --help | /? )      usage
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done

echo "--> Frozen-bo root folder: $folder_root"
echo "--> Mongo folder: $mongo_root"



echo " "
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo  "1 - save DEV db"
echo " "
echo " "
echo " "
mongodump=mongodump
dev_backup=dev_backup
$mongo_root$mongodump --uri "mongodb://localhost:27017/frozen-dev"  --out $folder_root$dev_backup
#
echo " "
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo " 2 - delete DEV db  "
echo " "
echo " "
mongo=mongo
$mongo_root$mongo < "./batch_auto__dev_machine__mongo_drop_dev.js"
#
echo " "
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo " 3 -  download the archive by browsing this url & use 7zip..."
echo " "
echo " "
cd $folder_root
rm -fr tmp
mkdir tmp
curl -L -k https://frozengem.com/public-backup/db.tar.gz -o tmp/db.tar.gz
curl -L -k https://frozengem.com/public-backup/files.tar.gz -o tmp/files.tar.gz
#
echo " "
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo " 4 - unzip the db"
echo " "
echo " "
cd $folder_root/tmp
mkdir dump_db
tar xvf db.tar.gz -C dump_db
#
echo " "
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo " 5 - rename the db folder in the unzipped tree "
echo "    to restore a prod db (frozen) in a dev db (frozen-dev): rename frozen folder in frozen-dev"
echo " "
echo " "
cd dump_db
latest_folder_name=`ls -dftr1 * | tail -1`
echo "        cd here: $latest_folder_name"
cd $latest_folder_name
mv frozen frozen-dev
#
echo " "
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo " 6 - restore db:"
echo " "
echo " "
cd $folder_root/tmp/dump_db
mongorestore=mongorestore
$mongo_root$mongorestore -u 'frozen' -p 'gem' --authenticationDatabase "frozen" $latest_folder_name
#
echo " "
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo " 7 - Restore / unzip the files at the right spot"
echo " "
echo " "
cd $folder_root
rm -fr static.sav
mv static static.sav
tar xvf tmp/files.tar.gz 
#
echo " "
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo " 8 - Cleaning "
echo " "
echo " "
cd $folder_root
rm -fr tmp
#
#
read -n 1 -p "Press a key to exit."