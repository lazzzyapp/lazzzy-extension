#!/bin/bash

docker build -t lazzzy:release .

docker run -v $PWD:/opt/mount --rm --entrypoint cp lazzzy:release /temp/release/lazzzy_firefox.zip /opt/mount/dist/lazzzy_firefox_docker.zip

