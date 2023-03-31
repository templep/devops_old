# start from base
FROM node:18

# Define working directory
WORKDIR /usr/src/app

# Copy web project in working directory
COPY fr-administration .

# Install dependencies
RUN npm install --loglevel verbose

# expose port
EXPOSE 3000

# start app
CMD [ "npm", "run", "start" ]