#!/bin/bash

# Récupérer le répertoire de la ligne de commande
BACKUP_DIR=$1

# Utiliser la date actuelle pour le nom de fichier de sauvegarde
BACKUP_DATE=$(date +%Y-%m-%d)

# Demander le répertoire de sauvegarde s'il n'a pas été fourni
if [[ -z $BACKUP_DIR ]]
then
  read -p "Veuillez fournir le répertoire de sauvegarde dans le container: " BACKUP_DIR
fi

# Créer le nom de fichier de sauvegarde
BACKUP_FILE="$BACKUP_DIR/mongodb_backup_$BACKUP_DATE"

# Effectuer la sauvegarde dans le container Docker
docker exec exam-linux-db-1 mongodump --out $BACKUP_FILE
