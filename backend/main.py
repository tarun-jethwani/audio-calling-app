from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend on localhost to connect (relaxed for dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Don't use '*' in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store connected users and their call status
connected_users: dict[str, WebSocket] = {}
user_status: dict[str, str] = {}  # e.g., "idle", "calling", "ringing", "in_call"

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    connected_users[user_id] = websocket
    user_status[user_id] = "idle"
    print(f"{user_id} connected")

    try:
        while True:
            data = await websocket.receive_json()
            action = data.get("action")
            target = data.get("target")
            message = data.get("message")

            # Handle text chat
            if action == "chat_message" and target and message:
                if target in connected_users:
                    await connected_users[target].send_json({
                        "action": "chat_message",
                        "from": user_id,
                        "message": message
                    })

            # Handle call request
            elif action == "call_user" and target:
                user_status[user_id] = "calling"
                user_status[target] = "ringing"
                if target in connected_users:
                    await connected_users[target].send_json({
                        "action": "incoming_call",
                        "from": user_id
                    })

            # Handle call acceptance
            elif action == "accept_call" and target:
                user_status[user_id] = "in_call"
                user_status[target] = "in_call"
                if target in connected_users:
                    await connected_users[target].send_json({
                        "action": "call_accepted",
                        "from": user_id
                    })

            # Handle end/cancel call
            elif action == "end_call" and target:
                user_status[user_id] = "idle"
                user_status[target] = "idle"
                if target in connected_users:
                    await connected_users[target].send_json({
                        "action": "call_ended",
                        "from": user_id
                    })

    except WebSocketDisconnect:
        print(f"{user_id} disconnected")
        connected_users.pop(user_id, None)
        user_status[user_id] = "idle"
