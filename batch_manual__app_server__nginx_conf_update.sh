#!/bin/bash
# File name: batch_manual__app_server__nginx_conf_update.sh
#

restart_nginx=
restart_nginx_pc=
restart_nginx_mac="brew services restart nginx"
restart_nginx_ubuntu="systemctl restart nginx"
folder_root=
folder_root_pc=c:/workspace/frozen-bo
folder_root_mac=~/workspace/frozen-bo
folder_root_ubuntu=~/workspace/frozen-bo
project_server_conf_files_folder=server/nginx
nginx_specific_conf_folder=servers
folder_nginx_conf_files=
folder_nginx_conf_files_pc=
folder_nginx_conf_files_mac=/usr/local/etc/nginx/$nginx_specific_conf_folder
folder_nginx_conf_files_ubuntu=/usr/local/etc/nginx/$nginx_specific_conf_folder

echo " "
echo " "
echo " "
echo "-----------------------   Frozen Gem update NGINX conf files with files in project   -----------------------"
echo " "
echo "      To be run on APP machine "
echo " "
echo "      Actions:"
echo "      - Backup old conf files "
echo "      - Replace them with ones in project"
echo "      - Restart nginx "
echo " "
echo " "
echo " "
echo "!!!!!!!!!!!!!!!!!!!!!!!!! CAUTION START !!!!!!!!!!!!!!!!!!!!!!!!!"
echo " "
echo " "
echo "      folder_root && folder_nginx_conf_files are MACHINE & USER dependant"
echo " "
echo " "
echo "Use the options:"
echo "-p or --pc: standard presets for PC. These presets can be modified in the script"
echo "-m or --mac: standard presets for MAC. These presets can be modified in the script"
echo "-u or --ubuntu: standard presets for Ubuntu. These presets can be modified in the script"
echo " "
echo " "
echo "(!) nginx main config file should import configurations from a '$nginx_specific_conf_folder' subfolder (!)"
echo "(!) need sudo on Ubuntu for restarting nginx (!)"
echo " "

echo "!!!!!!!!!!!!!!!!!!!!!!!!! CAUTION END !!!!!!!!!!!!!!!!!!!!!!!!!"
echo " "
echo " "
echo " "
#


usage()
{
    echo " "
    echo "usage: batch_manual__app_server__nginx_conf_update [[--ubuntu ] | [--pc ] | [--mac]]"
    echo " "
    read -n 1 -p "Press a key to exit."
}



while [ "$1" != "" ]; do
    case $1 in
        -p | --pc )             echo "Detected --pc option"
                                folder_root=$folder_root_pc
                                folder_nginx_conf_files=$folder_nginx_conf_files_pc
                                restart_nginx=$restart_nginx_pc
                                ;;
        -m | --mac )            echo "Detected --mac option"
                                folder_root=$folder_root_mac
                                folder_nginx_conf_files=$folder_nginx_conf_files_mac
                                restart_nginx=$restart_nginx_mac
                                ;;
        -u | --ubuntu )         echo "Detected --ubuntu option"
                                folder_root=$folder_root_ubuntu
                                folder_nginx_conf_files=$folder_nginx_conf_files_ubuntu
                                restart_nginx=$restart_nginx_ubuntu
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done


if [ -z "$folder_root" ]
then
    echo "!!!!! No folder root specified !!!!!"
    echo "Please either use --ubuntu, --mac or --pc"
    echo " "
    usage
    exit 1
else
    echo "--> Frozen-bo root folder: $folder_root"
fi

echo "--> NGINX specific conf folder: $folder_nginx_conf_files"



echo " "
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo  "1 - save current config files"
echo " "
echo " "
echo " "
separator=___
current_time=$separator$(date "+%Y.%m.%d-%H.%M.%S")
echo "List of files to be backed up in $folder_nginx_conf_files$current_time:"
echo " "
ls -al $folder_nginx_conf_files
mv $folder_nginx_conf_files $folder_nginx_conf_files$current_time
mkdir $folder_nginx_conf_files
echo " "
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo " 2 - Replace them with ones in project "
echo " "
echo " "
echo "List of files in $folder_root/$project_server_conf_files_folder to be copied in $folder_nginx_conf_files:"
echo " "
ls -al $folder_root/$project_server_conf_files_folder
cp $folder_root/$project_server_conf_files_folder/* $folder_nginx_conf_files
echo " "
echo " "
echo "----------------------------------------------"
echo " "
echo " "
echo " 3 - Restart nginx "
echo " "
echo " "
$restart_nginx
echo " "
echo " "

#
#
read -n 1 -p "Press a key to exit."