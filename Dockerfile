# Etapa 1: Construcción
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY frontend/package*.json ./

RUN npm install

# Copiar todo el frontend
COPY frontend ./

RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:stable-alpine AS production-stage

# Copiar archivos generados en la etapa de build al servidor nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
