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

- [Vue 3](https://vuejs.org/): Framework progresivo para la construcción de interfaces de usuario.
- [Vite](https://vitejs.dev/): Herramienta de desarrollo y empaquetado rápido.
- [pnpm](https://pnpm.io/): Gestor de paquetes eficiente y rápido.
- [Docker](https://www.docker.com/): Contenedores para despliegue y desarrollo consistentes.
- [GitHub Actions](https://github.com/features/actions): Automatización de flujos de trabajo de CI/CD.
- HTML5, CSS3 y JavaScript.

---

## 🚀 Instrucciones para Ejecutar la Aplicación Localmente

1. **Clonar el repositorio:**
```bash
git clone https://github.com/Nach0t/Dead-Rising.git
cd Dead-Rising/frontend
```

2. **Instalar pnpm (si no lo tienes):**
```bash
npm install -g pnpm
```

3. **Instalar dependencias:**
```bash
pnpm install
```

4. **Ejecutar el servidor de desarrollo:**
```bash
pnpm dev
```

5. **Abrir el navegador en:**
```bash
http://localhost:5173
```

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
