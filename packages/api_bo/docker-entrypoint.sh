#!/bin/sh -xe
if [ -d /root/config/ ]; then
    cp /root/config/env /usr/src/app/.env
fi

deno run --importmap=import_map.json src/app.ts