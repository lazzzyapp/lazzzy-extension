FROM node:12

WORKDIR /temp

COPY . .

RUN yarn

RUN TARGET_BROWSER=Firefox PUBLISH_TO_STORE=false yarn ts-node script/release.ts
