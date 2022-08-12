FROM node:16 as node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN yarn install
ENV NODE_ENV=production

WORKDIR /usr/src/app/packages/front_bo
RUN yarn run build

EXPOSE 3000

RUN chmod +x /usr/src/app/packages/front_bo/docker-entrypoint.sh


ENTRYPOINT ["/usr/src/app/packages/front_bo/docker-entrypoint.sh"]
