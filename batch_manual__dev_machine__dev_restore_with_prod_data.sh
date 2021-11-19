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
echo "-nc or --no_clean: does not clean tmp folder in bo folder"
echo " "
echo " ---------- NEW INSTALLATIONS ---------->>>>>>"
echo "- check the mongo root versions (new versions == new folders especially on Windows)"
echo "- db frozen-dev must be created first and users must exist (see usefull.txt)"
echo " "
echo " "
folder_root=
folder_root_pc=c:/workspace/frozen-bo/
folder_root_mac=~/workspace/frozen-bo/
mongo_root=
mongo_root_pc=C:/PROGRA~1/MongoDB/Server/4.2/bin/
mongo_root_mac=
echo "!!!!!!!!!!!!!!!!!!!!!!!!! CAUTION END !!!!!!!!!!!!!!!!!!!!!!!!!"
echo " "
echo " "
echo " "
#


usage()
{
    echo " "
    echo "usage: batch_manual__dev_machine__dev_restore_with_prod_data [[--pc ] | [--mac]] | [[-r folder ] [-d folder]] | [-h] | [-nc]"
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
        -nc | --no_clean )      echo "Detected --no_clean option"
                                no_clean="true"
                                ;;
        -h | --help | /? )      usage
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done


if [ -z "$folder_root" ]
then
    echo "!!!!! No folder root specified !!!!!"
    echo "Please either use --mac or --pc, or specify a specific folder with --root"
    echo " "
    usage
    exit 1
else
    echo "--> Frozen-bo root folder: $folder_root"
fi

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
echo "             https://frozengem.com/frozenbackup/db.tar.gz"
echo "             https://frozengem.com/frozenbackup/files.tar.gz"
echo " "
echo " "
cd $folder_root
rm -fr tmp
mkdir tmp
curl -L -k https://frozengem.com/frozenbackup/db.tar.gz -o tmp/db.tar.gz
curl -L -k https://frozengem.com/frozenbackup/files.tar.gz -o tmp/files.tar.gz
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
#
echo "    cmds:"
echo "        cd $folder_root/tmp"
echo "        mkdir dump_db"
echo "        tar xvf db.tar.gz -C dump_db"
#
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
#
cd dump_db
latest_folder_name=`ls -dftr1 * | tail -1`
#
echo "    cmds:"
echo "        cd dump_db"
echo "        cd $latest_folder_name"
echo "        mv frozen frozen-dev"
#
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
mongorestore=mongorestore
#
echo "    cmds:"
echo "        cd $folder_root/tmp/dump_db"
echo "        $mongo_root$mongorestore $latest_folder_name"
#
cd $folder_root/tmp/dump_db
# old: $mongo_root$mongorestore -u 'frozen' -p 'gem' --authenticationDatabase "frozen" $latest_folder_name
$mongo_root$mongorestore $latest_folder_name
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
if [ -z "$no_clean" ]
then
    rm -fr tmp
else
    echo "!!!!! No cleaning asked !!!!!"
fi

#
#
read -n 1 -p "Press a key to exit."