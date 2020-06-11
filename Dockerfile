FROM node:12.16.1-alpine

RUN mkdir -p /evonix-app/admin

WORKDIR /evonix-app/admin

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["serve", "-s", "build"]
