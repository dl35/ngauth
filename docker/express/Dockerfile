FROM node:13-alpine as node

RUN npm config set unsafe-perm true
RUN set -xe;\
    npm install nodemon -g;
    

WORKDIR /app


EXPOSE 3000

CMD ["/bin/sh", "-l"]