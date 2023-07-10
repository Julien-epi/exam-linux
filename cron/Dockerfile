FROM alpine:latest

# Installation de cron, mongodb-tools, bash et docker-cli
RUN apk update && apk add dcron mongodb-tools bash docker-cli

# Copie de votre script de sauvegarde dans le conteneur
COPY backup_script.sh /backup_script.sh
RUN chmod +x /backup_script.sh

# Ajout de la tâche cron
# Décalage horaire de 2 heures (UTC+2)
RUN echo "00 01 * * * /backup_script.sh '/var/backups'" | crontab -

# Exécution de cron en arrière-plan lors du démarrage du conteneur
CMD crond && tail -f /dev/null