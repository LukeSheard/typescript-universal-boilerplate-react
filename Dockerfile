FROM node:boron
LABEL maintainer "me@lukesheard.com"

# Make WORKDIR
RUN mkdir -p /www/app
WORKDIR /www/app

# Add Project
ADD package.json /www/app
RUN npm install

# Copy Files 
ADD . /www/app

# Build App
RUN npm run build

# Remove Source
RUN rm -rf config/test src test
RUN npm prune --production

# Expose Port 
EXPOSE 8080
CMD [ "npm", "start" ]
