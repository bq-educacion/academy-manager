FROM denoland/deno:debian-1.24.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

COPY ./packages/api_bo/ .
COPY ./import_map.json ./packages/api_bo/

RUN deno cache --importmap=import_map.json src/deps.ts
RUN chmod a+x /usr/src/app/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
