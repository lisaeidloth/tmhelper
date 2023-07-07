FROM node:18-alpine AS builder
WORKDIR /builder
COPY package*.json ./
RUN npm install
COPY . .
RUN ls -hal
RUN ls -hal ./public
RUN npm run generate
RUN ls -hal
RUN ls -hal ./public

