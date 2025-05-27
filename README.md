# Dead Rising

![CI/CD](https://github.com/Nach0t/Dead-Rising/actions/workflows/CI.yml/badge.svg)
![Lint](https://github.com/Nach0t/Dead-Rising/actions/workflows/Lint.yml/badge.svg)
![Lint](https://github.com/Nach0t/Dead-Rising/actions/workflows/docker.yml/badge.svg)


# Dead Rising - Juego Web

**Dead Rising** es un juego web interactivo desarrollado con tecnologías modernas como Vue.js, Vite y Docker. Este proyecto combina un desarrollo frontend con herramientas profesionales como integración continua (CI/CD), pruebas unitarias y análisis de código.

---

## 🎮 Requisitos del Sistema para Dead Rising

✅ **Requisitos Mínimos**
- Sistema Operativo: Windows 10 / macOS 10.15 / Linux (distribuciones modernas)
- Procesador: Intel Core i3 de 5ª generación o equivalente AMD
- Memoria RAM: 6 GB
- Tarjeta Gráfica: NVIDIA GT 1030 o superior (compatible con WebGL 2.0)
- Navegador: Última versión de Chrome, Firefox o Edge
- Resolución de Pantalla: 1280x720

---

## 🛠 Tecnologías Utilizadas

[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()

---

## 🚀 Instrucciones para Ejecutar la Aplicación Localmente

# Instalar npm (si no lo tienes instalado) - para Debian/Ubuntu
sudo apt update
sudo apt install npm

# Clonar el repositorio
git clone https://github.com/Nach0t/Dead-Rising.git
cd Dead-Rising/frontend

# Instalar dependencias
npm install

# Ejecutar el servidor de desarrollo
npm run dev

# Luego abre en tu navegador:
http://localhost:5173

---


## 🐳 Cómo Ejecutar con Docker

![Lint](https://github.com/Nach0t/Dead-Rising/actions/workflows/docker.yml/badge.svg)

1. Clona el repositorio (opcional si solo usas Docker Hub):

   ```bash
   git clone https://github.com/Nach0t/Dead-Rising.git
   cd Dead-Rising
   ```

2. Ejecuta el contenedor desde Docker Hub:

   ```bash
   docker pull nach0t/dead-rising:latest
   docker run -p 5173:5173 nach0t/dead-rising:latest
   ```

3. Abre el navegador en:

   ```bash
   http://localhost:5173
   ```

---

## 📦 Imagen en Docker Hub [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#)

[![Docker Hub](https://img.shields.io/badge/Docker--Hub-nach0t%2Fdead--rising-blue?style=for-the-badge&logo=docker)](https://hub.docker.com/r/nach0t/dead-rising)
[![Automated Build](https://img.shields.io/docker/automated/nach0t/dead-rising?style=for-the-badge)](https://hub.docker.com/r/nach0t/dead-rising)
![Image Size](https://img.shields.io/docker/image-size/nach0t/dead-rising/latest?style=for-the-badge)

Puedes usar la imagen directamente desde Docker Hub:

🔗 [https://hub.docker.com/r/nach0t/dead-rising](https://hub.docker.com/r/nach0t/dead-rising)

```bash
docker pull nach0t/dead-rising:latest
```

---


## 🔄 CI/CD con GitHub Actions


### CI.yml

![CI](https://github.com/Nach0t/Dead-Rising/actions/workflows/CI.yml/badge.svg)

- Instala Node.js y pnpm
- Instala dependencias
- Compila el frontend con Vite
- Construye imagen Docker
- Realiza login en Docker Hub
- Publica automáticamente como `nach0t/dead-rising:latest`

---

### Lint.yml

![Lint](https://github.com/Nach0t/Dead-Rising/actions/workflows/Lint.yml/badge.svg)

- Ejecuta verificación de estilo y formato con ESLint y Prettier
- Garantiza calidad y consistencia del código


### Docker.yml

![Docker Build](https://github.com/Nach0t/Dead-Rising/actions/workflows/docker.yml/badge.svg)

- Construye y etiqueta la imagen Docker para producción
- Realiza login automático en Docker Hub usando secretos
- Publica la imagen en Docker Hub bajo `nach0t/dead-rising:latest`
