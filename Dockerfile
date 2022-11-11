FROM nginx:stable

EXPOSE 80

RUN mkdir /opt/app
WORKDIR /opt/app
COPY dist .

CMD ["nginx", "-c", "/etc/nginx/nginx.conf"]
