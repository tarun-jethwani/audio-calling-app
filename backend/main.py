from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend on localhost to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store connected users
connected_users: dict[str, WebSocket] = {}

# Track call status per user
user_status: dict[str, str] = {}  # idle, calling, ringing, in_call

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
            message = data.get("message", "")

            if action == "chat_message":
                if target in connected_users:
                    await connected_users[target].send_json({
                        "action": "chat_message",
                        "from": user_id,
                        "message": message
                    })

            elif action == "call_user":
                user_status[user_id] = "calling"
                user_status[target] = "ringing"
                if target in connected_users:
                    await connected_users[target].send_json({
                        "action": "incoming_call",
                        "from": user_id
                    })

            elif action == "accept_call":
                user_status[user_id] = "in_call"
                user_status[target] = "in_call"
                if target in connected_users:
                    await connected_users[target].send_json({
                        "action": "call_accepted",
                        "from": user_id
                    })

            elif action == "end_call":
                user_status[user_id] = "idle"
                user_status[target] = "idle"
                if target in connected_users:
                    await connected_users[target].send_json({
                        "action": "call_ended",
                        "from": user_id
                    })

            elif action == "cancel_call":
                user_status[user_id] = "idle"
                user_status[target] = "idle"
                if target in connected_users:
                    await connected_users[target].send_json({
                        "action": "call_cancelled",
                        "from": user_id
                    })

    except WebSocketDisconnect:
        print(f"{user_id} disconnected")
        connected_users.pop(user_id, None)
        user_status[user_id] = "idle"
