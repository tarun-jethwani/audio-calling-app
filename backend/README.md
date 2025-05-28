# Audio Calling App Backend

This document provides an overview of the backend for the Audio Calling App, including setup instructions, usage, and API endpoints.

## Table of Contents

1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
5. [Docker](#docker)
6. [Contributing](#contributing)

## Overview

The backend of the Audio Calling App is built using Python and Flask. It provides the necessary functionalities to handle audio calls, including starting calls, managing call states, and processing audio streams.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd audio-calling-app/backend
   ```

2. **Create a virtual environment (optional but recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the required dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**

   ```bash
   python src/app.py
   ```

## Usage

Once the backend is running, you can interact with the API endpoints to manage audio calls. The backend will handle requests from the frontend application.

## API Endpoints

- **POST /start-call**: Initiates a new audio call.
- **POST /end-call**: Ends the current audio call.
- **GET /call-status**: Retrieves the current status of the call.

## Docker

To run the backend in a Docker container, follow these steps:

1. **Build the Docker image:**

   ```bash
   docker build -t audio-calling-backend .
   ```

2. **Run the Docker container:**

   ```bash
   docker run -p 5000:5000 audio-calling-backend
   ```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.