# Utiliser l'image officielle de Node.js avec la version Alpine
FROM node:alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package*.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN rm -rf node_modules && npm install
RUN apt-get update && apt-get install -y openssh-server

# Copier le reste du code de l'application dans le répertoire de travail
COPY . .

# Exposer le port que votre application utilise
EXPOSE 3000

# Définir la commande pour exécuter votre application
CMD [ "node", "server.js" ]
