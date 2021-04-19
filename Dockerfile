FROM node:15.11.0-alpine as base

FROM base as web
WORKDIR /app/web
RUN yarn
CMD yarn start


FROM base as server
WORKDIR /app/server
RUN yarn
CMD yarn start
