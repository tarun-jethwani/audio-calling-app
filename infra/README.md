# Audio Calling App (Text & Audio Communication)

This project provides a real-time **text and audio communication** platform between two users. It started as an audio calling system and evolved from foundational WebSocket-based chat to a complete working prototype using FastAPI, React, and AWS infrastructure.

---

## 🗂 Project Structure

```
audio-calling-app
├── backend
│   ├── main.py                 # FastAPI WebSocket backend
│   ├── requirements.txt        # Python backend dependencies
│   ├── Dockerfile              # Backend Docker image
│   └── README.md
├── frontend
│   ├── src/
│   │   ├── App.tsx             # React-based chat + audio UI
│   │   └── index.tsx
│   ├── public/
│   │   └── index.html
│   ├── dist/                   # Build output (ignored in Git)
│   ├── package.json
│   └── README.md
├── infra
│   ├── aws-cdk/
│   │   ├── app.py
│   │   └── app_infra_stack.py
│   ├── cdk.json
│   ├── docker-compose.yml
│   └── README.md
└── README.md (this file)
```

---

## ✨ Features

* ✅ **Text messaging** via WebSocket with dynamic chat logs
* ✅ **Audio calling** using WebRTC and Janus Gateway
* ✅ **Server-side signaling** and call status handling
* ✅ **AWS-hosted infrastructure** via CDK (frontend + backend)

---

## 🚀 Local Development

### 📦 Prerequisites

* Node.js + npm
* Python 3.10+
* Docker + Docker Compose

### 🔧 Steps

1. Clone the project and switch to the feature branch:

   ```bash
   git clone https://github.com/tarun-jethwani/audio-calling-app.git
   cd audio-calling-app
   git checkout feature/using-text-messages-as-communication
   ```

2. Install frontend deps and build:

   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. Run the app using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. Open two tabs:

   * [http://localhost:3000/?user=user1](http://localhost:3000/?user=user1)
   * [http://localhost:3000/?user=user2](http://localhost:3000/?user=user2)

5. Start text or audio communication!

---

## ☁️ Deploying to AWS

### 🧰 Prerequisites

* Python 3.10+ & `virtualenv`
* AWS CDK: `npm install -g aws-cdk`
* AWS CLI: `aws configure`
* IAM user with ECR/App Runner/S3/CDK access

### ✅ One-Time Setup

1. In project root:

   ```bash
   python -m venv .venv
   .venv\Scripts\Activate.ps1   # PowerShell (or source .venv/bin/activate on Unix)
   pip install -r infra/requirements.txt
   ```

2. Create or fix `cdk.json`:

   ```json
   {
     "app": "python aws-cdk/app.py",
     "context": {
       "@aws-cdk/aws-apprunner-alpha:useServiceConnect": true
     }
   }
   ```

3. Bootstrap AWS CDK:

   ```bash
   cd infra
   cdk bootstrap
   ```

4. Ensure frontend is built:

   ```bash
   cd ../frontend
   npm run build
   ```

5. Deploy infrastructure:

   ```bash
   cd ../infra
   cdk deploy
   ```

6. Outputs will show `FrontendURL` and `BackendURL`.

---

## 🧱 Architecture (AWS)

```
[User1]     [User2]
   |           |
   |  WebSocket + WebRTC
   |           |
   v           v
[CloudFront CDN (React UI)]
         |
         v
[S3 Bucket: frontend build]
         |
         v
[App Runner: FastAPI backend (Docker image)]
         |
         v
[ECR Repo (built by CDK)]
```

---

## 📄 .gitignore Recommendations

```
# Node dependencies
frontend/node_modules/
frontend/.turbo/

# Frontend build output
frontend/dist/
frontend/.next/
frontend/build/

# Python venv and cache
.venv/
__pycache__/
*.pyc
*.pyo
*.log

# Environment
.env
.env.*

# CDK output
infra/cdk.out/

# IDEs
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Include requirements explicitly
!requirements.txt
!*/requirements.txt
```

---

## 📜 License

MIT License
