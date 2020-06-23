# Builds a docker image used for building sample app
FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

# Install all dependencies
RUN npm install

COPY . /usr/src/app

EXPOSE 3000

# Run linting
RUN npm run lint

# Run unit tests
RUN npm test


CMD ["/bin/bash"]
