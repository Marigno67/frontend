# ---- Étape 1: Build ----
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Étape 2: Serve ----
FROM nginx:stable-alpine
# Copier les fichiers statiques depuis l'étape de build
COPY --from=build /app/build /usr/share/nginx/html
# Copier une configuration Nginx si nécessaire (pour gérer le routing React)
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]