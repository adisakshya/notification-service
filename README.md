[![Version](https://img.shields.io/docker/v/adisakshya/notification-service/latest?logo=docker&logoColor=white)](https://hub.docker.com/r/adisakshya/notification-service)
[![Travis Badge](https://img.shields.io/travis/com/adisakshya/notification-service/master?logo=travis)](https://travis-ci.com/github/adisakshya/notification-service)
[![MIT License](https://img.shields.io/github/license/adisakshya/notification-service)](https://github.com/adisakshya/notification-service/blob/master/LICENSE)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://github.com/adisakshya/notification-service/pulls)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat)](https://continuous-improvement.readthedocs.io/en/latest/md/community/code_of_conduct.html)  


## Overview

Before receiving reminder-notifications users device(s) must be registered with the service so that it can send the notification to the device(s). This microservice takes care of user-device registration. Clients can register the user device using an FCM token generated from the project's cloud-messaging system. If the FCM token is valid then the device is registered otherwise not.

Clients can also deregister the device using the provided device ID after successful registration, if the user wishes not to receive notifications on this device or on logout operation. These registration details are stored in PostgreSQL database. This service is also responsible for sending notifications to user devices in response to an event coming from the notification scheduler.

## Operating Instructions

### Fork

- Fork this repository
	- "Forking" adds a copy of [adisakshya/notification-service](https://github.com/adisakshya/notification-service/) repository to your GitHub account as `https://github.com/YourGitHubUserName/notification-service`
- Or you can download or clone this repository
	- You can clone the repository executing below command in a location of your choice in your system
	- ```$ git clone https://github.com/adisakshya/notification-service.git```
- Source code for the notification-service can be found at ```/src```
- All CI/CD resources are located in ```.travis``` directory
- ```requirements.txt``` contain the python packages required for the CI/CD process
- ```.env.example``` is a template env file

### Local Development

#### Prerequisites

- Make sure you have
    - Installed Docker (when running using docker)
    - Firebase Cloud Messaging (FCM) service-account json file
    - PostgreSQL ```device-database``` running and accessible using host-url, username and password
    - AWS SES template
    - AWS SQS ```notification-queue``` setup and is accessible using queue URL
    - AWS SNS ```event-topic``` setup and is accessible using ARN

#### Using Docker

- In source directory ```src/``` run the following command
	- ```$ yarn install``` - install required dependencies
	- ```$ yarn build``` - build source code
	- ```$ yarn test``` - run test (optional)
	- ```$ docker build -t notification-service .``` - build docker image
- With successful execution of above commands you will have a docker-image for the notification-service
- The docker-image can be run using the following command
    - ```docker run -p 3000:3000 --env-file ./.env notification-service```
- On successful start, the notification-service is ready to consume notification-messages from the notification-queue

#### Without Docker

- Replace the env-variables at ```/src/src/common/api-config.service.ts```
- Use the following commands to start the service
    - ```$ yarn install``` - install required dependencies
    - ```$ yarn test``` - run test (optional)
    - ```$ yarn start``` - start notification-service
- On successful start, the API documentaion (built using Swagger) for the service will be accssible on ```http://localhost:3000/docs```

## Architecture

![Notification Service Architecture](https://raw.githubusercontent.com/adisakshya/notification-service/master/assets/notification-service-architecture.png) Fig 1 - Notification Service Architecture

Clients can interact with the service using HTTP/HTTPs requests (interfaced by API Gateway) for device-registration while mechanism for sending notifications is internal. The notification-service has 2 modules namely:

- Device Module
    1. Device Controller - Handles incoming requests for device-registration and returns responses to the client
    2. Device Service - Defines the logic to serve incoming requests
- Notification Module - Polls the notification-queue and send available notifications to target clients

## CI/CD and Deployment Guide

A brief description of the deployment strategy is described in [documentation of continuous-improvement project](https://continuous-improvement.readthedocs.io).

## Contributing

There are multiple ways to contribute to this project, read about them [here](https://continuous-improvement.readthedocs.io/en/latest/md/community/contributing.html).

## License

All versions of the app are open-sourced, read more about this [LICENSE](https://github.com/adisakshya/notification-service/blob/master/LICENSE).
