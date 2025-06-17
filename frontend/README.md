# Dead Rising - Proyecto General

Este repositorio contiene todo el proyecto del juego Dead Rising.

---

## 🧩 Estructura del Repositorio

| Carpeta     | Descripción                                                       |
|-------------|-------------------------------------------------------------------|
| frontend/   | Juego completo en Vue + Vite + Three.js (terminado y funcional)  |
| backend/    | En desarrollo: API para autenticación, ranking y lógica de datos |

---

## 🚀 CI/CD con GitHub Actions

- CI.yml: build + test + Docker + push
- Lint.yml: ESLint, Stylelint, Prettier
- Docker.yml: build Docker + push
- Lighthouse.yml: análisis de calidad y rendimiento

---

## 🐳 Docker Hub

Imagen: [nach0t/dead-rising](https://hub.docker.com/r/nach0t/dead-rising)

```bash
docker pull nach0t/dead-rising:latest
docker run -p 5173:5173 nach0t/dead-rising:latest
```

---

## ✍️ Autores

[![Ignacio Rehbein](https://img.shields.io/badge/GitHub-Nach0t-181717?style=for-the-badge&logo=github)](https://github.com/Nach0t)  
[![Fernando Rivera](https://img.shields.io/badge/GitHub-fernando200317-181717?style=for-the-badge&logo=github)](https://github.com/fernando200317)
