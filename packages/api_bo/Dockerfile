FROM denoland/deno:debian-1.24.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

COPY . .
WORKDIR /usr/src/app/packages/api_bo

RUN chmod a+x /usr/src/app/packages/api_bo/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/usr/src/app/packages/api_bo/docker-entrypoint.sh"]
