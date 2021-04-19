FROM node:15.11.0-alpine as base
RUN ["yarn"]
CMD ["yarn", "start"]

FROM base as web
WORKDIR /app/web

FROM base as server
WORKDIR /app/server
