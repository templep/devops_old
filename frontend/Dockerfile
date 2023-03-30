FROM node:16 as build

WORKDIR /albarry/frontend/src/app

COPY package*.json ./


RUN npm ci --engine-strict=false --force
RUN npm install -g @angular/cli

COPY . .

RUN npm run build

EXPOSE 4200
