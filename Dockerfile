FROM node:12.16.1-alpine AS build

RUN mkdir -p /evonix-app/admin

WORKDIR /evonix-app/admin

COPY . .

RUN npm install && npm run build

# PRODUCTION ENV
FROM nginx:stable-alpine
COPY --from=build /evonix-app/admin/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]