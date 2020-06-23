# Builds a docker image used for building test project
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ENV LANG=en_US.UTF-8

WORKDIR /app

# Include universe repositories for EOLed versions
RUN apt-get update \
    && apt-get install --assume-yes  \
        software-properties-common \
    && add-apt-repository universe

RUN apt-get update \
    && apt-get install --assume-yes  \
        bash \
        cmake \
        curl \
        diffutils \
        golang-go \
        git \
        gnupg \
        groff \
        g++ \
        jq \
        libc-dev \
        libxml2-dev \
        libxslt-dev \
        make \
        maven \
        mono-devel \
        openjdk-11-jdk \
        openssl \
        perl \
        protobuf-compiler \
        python2 \
        pipenv \
        rsync \
        ruby \
        ruby-dev \
        ruby-json \
        rubygems \
        sed \
        tree \
        unzip \
        upx \
        wget \
        xmlstarlet

# Create a cibot user. Some tools (npm publish) don't work properly
# when run as root
ENV USER=cibot
ENV UID=1000
ENV GID=2000

RUN addgroup --gid "$GID" "$USER" \
    && adduser \
        --disabled-password \
        --gecos "" \
        --ingroup "$USER" \
        --uid "$UID" \
        --shell /bin/bash \
        "$USER"

USER cibot

# As a user install node and npm via node version-manager
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" \
    && nvm install 12.16.2 \
    && nvm install-latest-npm

# Install all dependencies
RUN npm install

# Run linting
RUN npm run lint

# Run unit tests
RUN npm test


CMD ["/bin/bash"]
