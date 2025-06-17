FROM node:20-alpine AS build-stage
WORKDIR /app/frontend
COPY frontend/pnpm-lock.yaml frontend/package.json ./
RUN npm install -g pnpm@8 && pnpm install
COPY frontend/ .
RUN pnpm run build

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/frontend/dist /usr/share/nginx/html
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
