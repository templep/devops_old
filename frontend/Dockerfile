FROM node:16 as build

WORKDIR /albarry/frontend/src/app

COPY package*.json ./

Run npm install -g npm@9.6.3
RUN npm ci --engine-strict=false
RUN npm install -g @angular/cli

COPY . .

RUN npm run build

EXPOSE 4200
