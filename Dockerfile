FROM node:12.16.1-alpine

RUN mkdir -p /evonix-app/admin

WORKDIR /evonix-app/admin

COPY . .

RUN npm install && npm run build

CMD ["npm", "start"]