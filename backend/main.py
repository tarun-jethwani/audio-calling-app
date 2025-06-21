from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend on localhost to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store connected users
connected_users: dict[str, WebSocket] = {}

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    connected_users[user_id] = websocket
    print(f"{user_id} connected")

    try:
        while True:
            data = await websocket.receive_json()
            action = data.get("action")
            target = data.get("target")

            if action == "chat_message":
                content = data.get("message", "")
                if target in connected_users:
                    await connected_users[target].send_json({
                        "action": "chat_message",
                        "from": user_id,
                        "message": content
                    })

    except WebSocketDisconnect:
        print(f"{user_id} disconnected")
        connected_users.pop(user_id, None)
