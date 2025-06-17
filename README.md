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

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/Nach0t" target="_blank">
          <img src="https://github.com/Nach0t.png" width="100" style="border-radius:50%" alt="Nach0t"/><br />
          <sub><b>Ignacio Rehbein</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/fernando200317" target="_blank">
          <img src="https://github.com/fernando200317.png" width="100" style="border-radius:50%" alt="fernando200317"/><br />
          <sub><b>Fernando Rivera</b></sub>
        </a>
      </td>
    </tr>
  </table>
</div>
