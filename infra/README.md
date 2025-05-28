# Infrastructure Setup for Audio Calling App

This README file provides instructions for setting up the infrastructure for the Audio Calling App using AWS services and Docker.

## Overview

The Audio Calling App consists of a backend service built with Python and Flask, and a frontend application developed using a modern TypeScript framework. The infrastructure is designed to be deployed on AWS, utilizing Docker for containerization.

## Prerequisites

- An AWS account
- AWS CLI installed and configured
- Docker installed
- AWS CDK installed

## Infrastructure Components

1. **Docker Compose**: Used to define and run multi-container Docker applications. The `docker-compose.yml` file orchestrates the backend service.
2. **AWS CDK**: The AWS Cloud Development Kit (CDK) is used to define cloud infrastructure using code. The `app.py` file in the `aws-cdk` directory contains the necessary configurations for deploying the application.

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd audio-calling-app/infra
```

### 2. Build and Run Docker Containers

Navigate to the backend directory and build the Docker image:

```bash
cd ../backend
docker build -t audio-calling-app .
```

Run the Docker container using Docker Compose:

```bash
docker-compose up
```

### 3. Deploy Infrastructure on AWS

Navigate to the AWS CDK directory and deploy the infrastructure:

```bash
cd ../infra/aws-cdk
cdk deploy
```

### 4. Access the Application

Once the deployment is complete, you will receive the endpoint URL for the backend service. Use this URL in your frontend application to connect to the backend.

## Additional Notes

- Ensure that your AWS IAM user has the necessary permissions to create the resources defined in the CDK app.
- You can customize the `docker-compose.yml` and `app.py` files to suit your specific requirements.

## Conclusion

This README provides a comprehensive guide to setting up the infrastructure for the Audio Calling App. Follow the instructions carefully to ensure a successful deployment on AWS.