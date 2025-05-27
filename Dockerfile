# Etapa 1: Build con Node
FROM node:18-alpine as build-stage

WORKDIR /app

# Copiar package.json y package-lock.json de frontend
COPY frontend/package*.json ./

RUN npm install

# Copiar el código frontend completo
COPY frontend .

# Construir la app
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
