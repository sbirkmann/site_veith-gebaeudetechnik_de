# Build the static site, then serve it from nginx.
FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

# Install dependencies first so this layer is cached across content changes.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
