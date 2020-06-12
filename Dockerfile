FROM node:12.16.1-alpine AS build

RUN mkdir -p /evonix-app/admin

WORKDIR /evonix-app/admin

COPY . .

RUN npm install
RUN npm run build
RUN npm install -g serve

CMD serve -s build

EXPOSE 3001