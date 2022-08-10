#!/bin/sh -xe
if [ -d /root/config/ ]; then
   cat /root/config/env >> /usr/src/app/packages/front_bo/.env
fi

/bin/bash -c "pm2 start yarn --interpreter bash --name front-web --no-daemon -- start --wait-ready -p 3000"