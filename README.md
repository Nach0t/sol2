
#  Dead Rising - Juego Web

Dead Rising es un juego web desarrollado utilizando **Vue.js**, **HTML**, **CSS** y **JavaScript**. Este proyecto fue construido con el objetivo de combinar desarrollo frontend moderno con herramientas profesionales como Docker, CI/CD y pruebas unitarias.


---
## 🧩 Tecnologías utilizadas

- [Vue 3](https://vuejs.org/) como framework principal
- [Vite](https://vitejs.dev/) para empaquetado y desarrollo rápido
- [pnpm](https://pnpm.io/) como gestor de paquetes
- [Docker](https://www.docker.com/) para contenedores
- GitHub Actions para integración continua
- HTML5, CSS3 y JavaScript


---

##  Ejecución local

```bash
git clone https://github.com/tu-usuario/dead-rising.git
cd dead-rising/frontend
npm install -g pnpm
pnpm install
pnpm run dev

---
## Ejecución con Docker
FROM node:18-alpine

WORKDIR /app

COPY ./frontend .

RUN npm install -g pnpm && pnpm install
RUN pnpm run build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

