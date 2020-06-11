FROM node:12.16.1-alpine

RUN mkdir -p /evonix-app/admin

WORKDIR /evonix-app/admin

COPY package*.json ./evonix-app/admin

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]
