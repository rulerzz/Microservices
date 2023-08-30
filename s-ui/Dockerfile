FROM node:18

WORKDIR /usr/src/app

RUN apt update
RUN apt -y install nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY package*.json ./
COPY . .

RUN npm i
RUN npm run build && cp -r ./dist/out/* /var/www/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
