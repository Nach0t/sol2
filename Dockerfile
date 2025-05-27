# Etapa 1: Build de la app con Node
FROM node:18-alpine as build-stage

WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

RUN npm install

# Copiamos el resto de los archivos
COPY . .

# Construimos la app para producción (esto genera la carpeta dist)
RUN npm run build

# Etapa 2: Servir la app con Nginx
FROM nginx:stable-alpine as production-stage

# Copiamos los archivos construidos desde la etapa anterior al folder que nginx sirve por defecto
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 para HTTP
EXPOSE 80

# Comando por defecto para correr nginx
CMD ["nginx", "-g", "daemon off;"]
