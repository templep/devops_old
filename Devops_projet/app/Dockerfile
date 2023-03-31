# Pre-defined image for node backend apps
FROM node:10

# Create app directory
WORKDIR /app

# download app dependencies
COPY package*.json ./
RUN npm install && npm cache clean --force

#Copy scripts
COPY . .

# Expose the port
EXPOSE 8080

# Start the app
CMD ["npm","start"]
