# Etapa 1: build del frontend con Node
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copiar archivos de configuración
COPY frontend/pnpm-lock.yaml frontend/pnpm-workspace.yaml frontend/package.json ./

# Instalar pnpm y dependencias
RUN npm install -g pnpm && pnpm install

# Copiar todo el código fuente
COPY frontend/ .

# Compilar la app
RUN pnpm run build

# Etapa 2: servir el frontend con nginx
FROM nginx:stable-alpine AS production-stage

# Copiar build generado al servidor nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponer puerto requerido por la rúbrica
EXPOSE 8000

# Reemplazar configuración default de nginx si tienes un nginx.conf personalizado (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Comando para mantener nginx corriendo
CMD ["nginx", "-g", "daemon off;"]
