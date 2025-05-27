# Etapa 1: build de frontend con Node
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY frontend/package*.json ./

RUN npm install

# Copiar todo el código del frontend
COPY frontend/ .

RUN npm run build

# Etapa 2: servir el build con nginx
FROM nginx:stable-alpine AS production-stage

# Copiar build generado a carpeta pública de nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
