#!/bin/sh -xe
if [ -d /root/config/ ]; then
   cat /root/config/env >> /usr/src/app/packages/front_bo/.env
fi

/bin/bash -c "yarn start"