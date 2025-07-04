# Utiliser une image Node officielle
FROM node:18

# Définir le dossier de travail
WORKDIR /app

# Copier uniquement les fichiers package.json et package-lock.json pour optimiser le cache Docker
COPY jadida/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY jadida/ .

# Exposer le port utilisé par Next.js en dev
EXPOSE 3000

# Lancer l'application en mode développement
CMD ["npm", "run", "dev"]