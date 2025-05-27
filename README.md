
![CI/CD](https://github.com/Nach0t/Dead-Rising/actions/workflows/CI.yml/badge.svg)
![Lint](https://github.com/Nach0t/Dead-Rising/actions/workflows/Lint.yml/badge.svg)

# Dead Rising - Juego Web

**Dead Rising** es un juego web interactivo desarrollado con tecnologías modernas como Vue.js, Vite y Docker. Este proyecto combina un desarrollo frontend ágil con herramientas profesionales como integración continua (CI/CD), pruebas unitarias y análisis de código.

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

1. **Clonar el repositorio:**
```bash
git clone https://github.com/Nach0t/Dead-Rising.git
cd Dead-Rising/frontend
```

2. **Construir la imagen:**
```bash
docker build -t dead-rising .
```

3. **Ejecutar el contenedor:**
```bash
docker run -p 5173:5173 dead-rising
```

4. **Abrir el navegador en:**
```bash
http://localhost:5173
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

