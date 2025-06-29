@echo off
echo 🔄 Iniciando contenedores Docker...
cd backend\docker
docker-compose up -d

echo 🚀 Iniciando backend...
cd ..\
call npm install
start cmd /k "npm start"

echo 🎮 Iniciando frontend...
cd ..\frontend
call pnpm install
start cmd /k "pnpm run dev"

echo ✅ Todo iniciado
pause
