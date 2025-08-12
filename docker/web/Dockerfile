FROM node:22-alpine AS build

WORKDIR /build

COPY ./web/package*.json ./
RUN npm ci

COPY ./web .

RUN mv ./vite.config.ts.container ./vite.config.ts

RUN npm run build
RUN npm prune --production

FROM node:22-alpine AS final

WORKDIR /app

COPY --from=build /build/build build/
COPY --from=build /build/node_modules node_modules/
COPY ./web/package.json .

ENV NODE_ENV=production
CMD ["node", "build"]