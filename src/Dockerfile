# Dockerfile

FROM node:12-alpine3.10
# Version
ENV NOTIFICATION_SERVICE_VERSION 1.0.0
# Work directory
WORKDIR /usr/src/app
COPY . .
# Install dependencies
RUN yarn install
# Build source-code
RUN yarn build
# Start service
EXPOSE 3000
CMD [ "yarn", "start:prod" ]
