#!/bin/bash

# Récupérer le répertoire et la date de la ligne de commande
BACKUP_DIR=$1
BACKUP_DATE=$2

# Utiliser la date actuelle pour le nom de fichier de sauvegarde si non fournie
if [[ -z $BACKUP_DATE ]]
then
  BACKUP_DATE=$(date +%Y-%m-%d)
fi


# # Vérifier que le répertoire de sauvegarde existe
if [[ ! -d $BACKUP_DIR ]]
then
  mkdir -p $BACKUP_DIR
fi

# Créer le nom de fichier de sauvegarde
BACKUP_FILE="$BACKUP_DIR/mongodb_backup_$BACKUP_DATE"

# Afficher un message de fin
echo "Fin du script de sauvegarde"

# Effectuer la sauvegarde dans le container Docker
docker exec exam-linux-db-1 mongodump --out $BACKUP_FILE

