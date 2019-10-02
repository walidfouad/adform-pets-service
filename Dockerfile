# Specify a base image
FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

EXPOSE 3000

# Container Default command
CMD ["npm", "run", "start"]