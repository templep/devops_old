# start from base
FROM node:18

# Define working directory
WORKDIR /usr/src/app

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy web project in working directory
COPY . .

# expose port
EXPOSE 4200

# start app
CMD [ "ng", "serve", "--disable-host-check", "--host", "0.0.0.0", "--open" ]
