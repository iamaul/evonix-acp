FROM node:12.16.1-alpine AS build

RUN mkdir -p /evonix-app/admin

WORKDIR /evonix-app/admin

COPY . .

RUN npm install && npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]