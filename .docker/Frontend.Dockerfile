#docker build -f .docker/Frontend.Dockerfile -t frontend .

FROM node:alpine AS builder

WORKDIR /app

COPY frontend .

ARG FIREBASE_KEY

ENV FIREBASE_KEY $FIREBASE_KEY

RUN npm install && \
    npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/frontend/* /usr/share/nginx/html/
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
