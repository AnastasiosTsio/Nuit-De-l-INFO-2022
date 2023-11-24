#!/bin/bash

git pull
npm i
npm run build
docker build . -t reblochons/front
docker rm -f front
docker run -d --name "front" -p 80:80 reblochons/front
