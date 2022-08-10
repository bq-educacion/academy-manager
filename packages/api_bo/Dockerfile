FROM denoland/deno:debian-1.24.1

RUN apt update && apt install curl unzip -y
RUN curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.2.1

ENV DENO_INSTALL="/root/.deno"
ENV PATH="${DENO_INSTALL}/bin:${PATH}"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

COPY ./packages/api_bo/ .

RUN chmod a+x /usr/src/app/docker-entrypoint.sh

EXPOSE 4000
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
