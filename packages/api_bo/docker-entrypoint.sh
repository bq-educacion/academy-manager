#!/bin/sh -xe
if [ -d /root/config/ ]; then
    cp /root/config/env /usr/src/app/packages/api_bo/.env
fi

deno run -A src/app.ts