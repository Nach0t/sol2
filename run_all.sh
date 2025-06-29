#!/bin/bash

# Ruta al directorio raíz del proyecto (ajústalo según sea necesario)
PROJECT_DIR="$HOME/Documentos/GitHub/Dead-Rising"

# Iniciar Docker (MongoDB u otros contenedores)
echo "🔄 Iniciando contenedores Docker..."
cd "$PROJECT_DIR/backend/docker"
docker-compose up -d

# Lanzar el backend (asegúrate que usa `npm start`)
echo "🚀 Iniciando backend..."
cd "$PROJECT_DIR/backend"
npm install
npm start &

# Lanzar el frontend (usando Vite o similar)
echo "🎮 Iniciando frontend..."
cd "$PROJECT_DIR/frontend"
pnpm install
pnpm run dev &

# Espera a que terminen los procesos lanzados
wait
