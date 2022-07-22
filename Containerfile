FROM docker.io/node:latest AS build
WORKDIR /usr/src/myapp
COPY . .
RUN npm install && npm run build

FROM docker.io/nginx:latest AS deploy
COPY --from=build /usr/src/myapp/build /usr/share/nginx/html
EXPOSE 80

