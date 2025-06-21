# Audio Calling App (Text Chat Foundation)

This project began as an audio calling application but currently features a working **text-based chat** system between two users. The goal is to evolve it into a multi-user audio calling platform, similar to WhatsApp. As a foundational step, text chat enables communication logging, status signaling, and easier debugging.

## Project Structure

```
audio-calling-app
├── backend
│   ├── src
│   │   ├── app.py                # Main WebSocket-based backend logic
│   ├── requirements.txt           # Python dependencies for the backend
│   ├── Dockerfile                 # Dockerfile for building the backend image
│   └── README.md                  # Documentation for the backend
├── frontend
│   ├── src
│   │   ├── App.tsx                # Main React UI for chat
│   │   └── index.tsx              # Entry point
│   ├── public
│   │   └── index.html             # HTML file for the frontend
│   ├── package.json               # npm configuration
│   ├── tsconfig.json              # TypeScript config
│   └── README.md                  # Frontend documentation
├── infra
│   ├── docker-compose.yml         # Docker orchestration for backend + frontend
│   └── README.md                  # Infra setup instructions
└── README.md                      # Root overview (this file)
```

## Setup Instructions (Feature: Text Messaging via WebSocket)

### Prerequisites
- Docker + Docker Compose
- Browser access (user1 and user2 can be opened in different tabs or browsers like Chrome and Edge)

### Step-by-Step Guide

1. Clone the repository and switch to the feature branch:
   ```sh
   git clone https://github.com/tarun-jethwani/audio-calling-app.git
   cd audio-calling-app
   git checkout feature/using-text-messages-as-communication
   ```

2. Build and start the full app using Docker Compose:
   ```sh
   docker-compose up --build
   ```

3. Open two browser windows:
   - Chrome: [http://localhost:3000/?user=user1](http://localhost:3000/?user=user1)
   - Edge: [http://localhost:3000/?user=user2](http://localhost:3000/?user=user2)

4. Start chatting! Messages are relayed via WebSocket through the FastAPI backend.

## Feature Summary

- Text messaging between two users using WebSockets.
- Chat logs are maintained locally in each session.
- Message logs can double as **status indicators and debugging trails** for future communication events (e.g., call initiated, rejected, etc.).

## Architecture Diagram

```
[user1] <--> |                 |
             |  FastAPI       |
[user2] <--> |  Backend (WS)  | <--> Docker Compose
             |                 |
                |       |
                v       v
          [Frontend]  [Backend]
```

## License

This project is licensed under the MIT License.
