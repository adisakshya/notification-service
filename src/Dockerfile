# Dockerfile

FROM node:12-alpine3.10
# Version
ENV NOTIFICATION_SERVICE_VERSION 1.0.0
# Work directory
WORKDIR /usr/src/app
COPY . .
# Start service
ENV PORT 80
EXPOSE 80
CMD [ "yarn", "start:prod" ]
