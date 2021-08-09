#docker build -f .docker/Frontend.Dev.Dockerfile -t frontend .

FROM node:alpine AS builder

WORKDIR /app

COPY frontend .

ENV FIREBASE_KEY $FIREBASE_KEY

RUN npm install && \
    npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/frontend/* /usr/share/nginx/html/
COPY --from=builder /app/nginx.dev.conf /etc/nginx/conf.d/default.conf
