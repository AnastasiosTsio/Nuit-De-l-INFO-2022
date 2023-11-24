FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY index.html /home/
COPY js /home/js/
COPY css /home/css/
COPY img /home/img/
COPY data /home/data/
COPY favicon.ico /home/
