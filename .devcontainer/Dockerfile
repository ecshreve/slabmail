ARG VARIANT=22-bookworm
FROM mcr.microsoft.com/devcontainers/javascript-node:1-${VARIANT}

# Install tslint, typescript. eslint is installed by javascript image
ARG NODE_MODULES="tslint-to-eslint-config typescript"
RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
    && npm cache clean --force > /dev/null 2>&1
    

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && apt-get install -y \
    curl \
    git \
    sudo \
    vim \
    && rm -rf /var/lib/apt/lists/*