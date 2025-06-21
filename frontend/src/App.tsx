import { useEffect, useRef, useState } from 'react'

type CallStatus = 'idle' | 'in_chat'

function App() {
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get("user") || "user1"
  const targetId = userId === "user1" ? "user2" : "user1"

  const [status, setStatus] = useState<CallStatus>('idle')
  const [log, setLog] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`)
    ws.current = socket

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const action = data.action
      const from = data.from
      const content = data.message

      if (action === "chat_message") {
        setStatus("in_chat")
        logMessage(`💬 ${from}: ${content}`)
      }
    }

    return () => socket.close()
  }, [userId])

  const logMessage = (msg: string) => {
    setLog(prev => [...prev, msg])
  }

  const sendMessage = () => {
    if (ws.current?.readyState === WebSocket.OPEN && message.trim()) {
      ws.current.send(JSON.stringify({
        action: "chat_message",
        target: targetId,
        message: message.trim()
      }))
      logMessage(`📤 You: ${message.trim()}`)
      setMessage('')
      setStatus("in_chat")
    }
  }

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>Text Chat App</h2>
      <p><strong>You are:</strong> {userId}</p>
      <p><strong>Talking to:</strong> {targetId}</p>
      <p><strong>Status:</strong> {status}</p>

      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={{ width: '80%', marginRight: '1rem' }}
      />
      <button onClick={sendMessage} disabled={!message.trim()}>Send</button>

      <hr />
      <h4>Logs:</h4>
      <ul>
        {log.map((msg, idx) => <li key={idx}>{msg}</li>)}
      </ul>
    </div>
  )
}

export default App
