FROM node:15.11.0-alpine as base

FROM base as web
WORKDIR /app/web
CMD yarn && yarn start


FROM base as server
WORKDIR /app/server
CMD yarn && yarn start
