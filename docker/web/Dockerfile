FROM node:20-alpine AS build

WORKDIR /build

COPY ./web .

RUN npm install
RUN npm run build

FROM nginx AS final

COPY --from=build /build/dist /usr/share/nginx/html