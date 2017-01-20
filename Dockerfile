FROM node:boron
LABEL maintainer "me@lukesheard.com"

# Make WORKDIR
RUN mkdir -p /www/app
WORKDIR /www/app

# Add Project
ADD . /www/app
RUN ls

# Build App
RUN npm install --loglevel=warn > /var/log/npm.log 2>&1 || cat /var/log/npm.log && false
RUN npm run build

# Remove Source
RUN rm -rf config/test node_modules src test
RUN ls

# Install Production Deps
RUN npm install --production --loglevel=warn > /var/log/npm:prod.log 2>&1 || cat /var/log/npm:prod.log && false

EXPOSE 8000
CMD [ "npm", "start" ]
