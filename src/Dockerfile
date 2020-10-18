# Dockerfile

# First stage
FROM node:12-alpine3.10 as builder
# Development Environment
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
# Work directory
WORKDIR /usr/src/app
# Install dependencies
COPY package*.json ./
RUN yarn install --only=development
# Build source-code
COPY . .
RUN yarn build

# Second stage
FROM node:12-alpine3.10
# Version
ENV NOTIFICATION_SERVICE_VERSION 1.0.0
# Production Environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# Work directory
WORKDIR /usr/src/app
# Copy build code
COPY --from=builder /usr/src/app/dist ./dist
COPY . .
# Start service
EXPOSE 80
CMD [ "yarn", "start:prod" ]
