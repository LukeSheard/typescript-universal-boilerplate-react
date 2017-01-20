FROM node:boron
LABEL maintainer "me@lukesheard.com"

# Environment
ENV NPM_CONFIG_LOGLEVEL warn

# Make WORKDIR
RUN mkdir -p /www/app
WORKDIR /www/app

# Add Project
ADD . /www/app
RUN ls

# Build App
RUN npm install
RUN npm run build

# Remove Source
RUN rm -rf config/test node_modules src test
RUN ls

# Install Production Deps
RUN npm install --production

EXPOSE 8000
CMD [ "npm", "start" ]
