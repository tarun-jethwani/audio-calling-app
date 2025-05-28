# Audio Calling App

This project is an audio calling application built using Python for the backend and a modern TypeScript framework for the frontend. The application allows users to initiate and manage audio calls with a simple interface.

## Project Structure

```
audio-calling-app
├── backend
│   ├── src
│   │   ├── app.py                # Main entry point for the backend application
│   │   ├── audio
│   │   │   └── __init__.py       # Logic for handling audio calls
│   │   └── utils
│   │       └── __init__.py       # Utility functions for the backend
│   ├── requirements.txt           # Python dependencies for the backend
│   ├── Dockerfile                  # Dockerfile for building the backend image
│   └── README.md                  # Documentation for the backend
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── CallButton.tsx     # Component for initiating a call
│   │   │   ├── Status.tsx         # Component for displaying call status
│   │   │   └── EndCallButton.tsx  # Component for ending a call
│   │   ├── App.tsx                # Main component of the frontend application
│   │   └── index.tsx              # Entry point for the React application
│   ├── public
│   │   └── index.html             # Main HTML file for the frontend
│   ├── package.json               # Configuration file for npm
│   ├── tsconfig.json              # TypeScript configuration file
│   └── README.md                  # Documentation for the frontend
├── infra
│   ├── docker-compose.yml          # Docker orchestration file
│   ├── aws-cdk
│   │   └── app.py                 # AWS CDK application code for deployment
│   └── README.md                  # Documentation for infrastructure setup
└── README.md                      # Overview of the entire project
```

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```
3. Build the Docker image:
   ```
   docker build -t audio-calling-backend .
   ```
4. Run the Docker container:
   ```
   docker run -p 5000:5000 audio-calling-backend
   ```

### Frontend

1. Navigate to the `frontend` directory.
2. Install the required npm packages:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### Infrastructure

1. Navigate to the `infra` directory.
2. Deploy the infrastructure using AWS CDK:
   ```
   cdk deploy
   ```

## Usage

- Use the frontend interface to initiate and manage audio calls.
- The backend handles the audio call logic and state management.

## Architecture

The application is designed with a microservices architecture, utilizing Docker for containerization and AWS for deployment. The frontend communicates with the backend via RESTful APIs, ensuring a seamless user experience.

## License

This project is licensed under the MIT License.