FROM node:16

# Specify Working directory inside container
WORKDIR /albarry/src/app

# Copy package-logk.json & package.json from host inside container working directory
COPY package*.json ./

# Install deps inside container 
RUN npm install

# Bundle App Sources
COPY . .

RUN npm run build

EXPOSE 3000