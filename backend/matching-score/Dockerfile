# Builds a docker image used for building sample app
FROM node:latest

# Create a folder for the sample app
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Copy all files and folders to the filesystem of the container
COPY . /usr/src/app/

# Install all dependencies
RUN npm install

# List all files and directories
RUN ls -lah

# Expose port - the container will listen on the specified network ports at runtime
EXPOSE 3000

# Run linting
RUN npm run lint

# Run unit tests
CMD ["/bin/bash", "npm", "test"]
