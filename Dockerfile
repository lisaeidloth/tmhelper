FROM node:18-alpine AS builder
WORKDIR /builder
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate

FROM nginx:latest
COPY --from=builder /builder/.output/public /usr/share/nginx/html

