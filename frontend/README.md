# Dead Rising - Frontend

Este documento describe cómo ejecutar y desarrollar el **frontend** del juego.

---

## 📂 Estructura

El frontend está contenido dentro de la carpeta `frontend/` y fue desarrollado con:

- Vue 3
- Vite
- Three.js
- pnpm (también compatible con npm)
- ESLint, Prettier, Stylelint
- Vitest para pruebas unitarias

---

## ▶️ Ejecutar el juego localmente

```bash
git clone https://github.com/Nach0t/Dead-Rising.git
cd Dead-Rising/frontend
pnpm install        # o npm install
pnpm run dev        # o npm run dev
```

Abre en tu navegador:
```
http://localhost:5173
```

---

## 🧪 Pruebas Unitarias

```bash
pnpm run test
```

---

## 🎨 Linter y Formato

```bash
pnpm run lint         # Código JS/Vue
pnpm run lint:fix     # Arreglar errores de estilo
pnpm run stylelint    # CSS/SCSS/Vue estilos
pnpm run stylelint:fix
pnpm run format       # Prettier
```

---

## 🐳 Docker

```bash
docker pull nach0t/dead-rising:latest
docker run -p 5173:5173 nach0t/dead-rising:latest
```

Abre [http://localhost:5173](http://localhost:5173)