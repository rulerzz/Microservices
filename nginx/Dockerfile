FROM nginx:1.19.4-alpine 
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /var/www/index.html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
