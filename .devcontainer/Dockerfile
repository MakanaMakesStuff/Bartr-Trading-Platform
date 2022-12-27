ARG VARIANT="focal"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

RUN export DEBIAN_FRONTEND=noninteractive
RUN curl -sL https://deb.nodesource.com/setup_14.x -o ~/nodesource_setup.sh && bash ~/nodesource_setup.sh
RUN apt-get install -y nodejs
RUN npm install --global yarn

