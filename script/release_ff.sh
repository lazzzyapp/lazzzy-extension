#!/bin/bash

docker build -t lazzzyapp/lazzzy-extension:release .

docker run -v $PWD:/opt/mount --rm --entrypoint cp lazzzyapp/lazzzy-extension:release /temp/release/lazzzy_extension_firefox.zip /opt/mount/dist/lazzzy_extension_firefox_docker.zip
