# Builds the static site, then serves it from nginx.
#
# The asset pipelines (images, logo, OG card) are NOT run here — they need the
# original photography in _scrape/, which is not in the repository. Their output
# lives in public/ and is committed, so the image build only compiles the app.
FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

# Dependencies first, so this layer is reused whenever only content changed.
# Optional dependencies must stay enabled: TypeScript resolves its compiler
# binary through one. Playwright's browser download is skipped instead, since
# the QA sweep runs outside the image.
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
COPY package.json pnpm-lock.yaml ./
# pnpm-workspace.yaml carries the build-script approvals, so it has to be
# present before the install runs.
#
# --ignore-scripts is safe here: the only postinstall in the tree belongs to
# @parcel/watcher, a file watcher pulled in transitively by sass-embedded and
# used exclusively in dev. sharp is not invoked during `pnpm build` either —
# the image only compiles the app, and the images it serves are committed.
COPY pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# nginx already runs a sensible default CMD; only the config differs.
EXPOSE 80
