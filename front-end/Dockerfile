# Utilisez l'image officielle de Node.js avec la version Alpine
FROM node:alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package*.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste du code de l'application dans le répertoire de travail
COPY . .

# Exposer le port que votre application utilise
EXPOSE 3001

# Définir la commande pour exécuter votre application
CMD [ "npm", "run", "dev" ]
