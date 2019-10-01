# Specify a base image
FROM node:alpine

WORKDIR /usr/app
# Install some dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

EXPOSE 3000
# Default command
CMD ["npm", "run", "start"]