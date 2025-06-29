# Etapa de build
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install && pnpm build

# Etapa final con nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
