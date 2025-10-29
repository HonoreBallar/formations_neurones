FROM node:20-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

# Création des dossiers utiles
RUN mkdir -p uploads data

# Installation de nodemon en global pour le dev
RUN npm install -g nodemon

# Exposition du port
EXPOSE 3000

# Commande de démarrage en mode dev
CMD ["nodemon", "src/app.js"]
