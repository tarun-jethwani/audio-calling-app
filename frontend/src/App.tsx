import { useEffect, useRef, useState } from 'react'

type CallStatus = 'idle' | 'calling' | 'ringing' | 'in_call'

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
        logMessage(`💬 ${from}: ${content}`)
      } else if (action === "incoming_call") {
        setStatus("ringing")
        logMessage(`📞 Incoming call from ${from}`)
      } else if (action === "call_accepted") {
        setStatus("in_call")
        logMessage(`✅ Call accepted by ${from}`)
      } else if (action === "call_ended") {
        setStatus("idle")
        logMessage(`❌ Call ended by ${from}`)
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
    }
  }

  const callUser = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        action: "call_user",
        target: targetId
      }))
      setStatus("calling")
      logMessage(`📤 Calling ${targetId}...`)
    }
  }

  const acceptCall = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        action: "accept_call",
        target: targetId
      }))
      setStatus("in_call")
      logMessage(`📥 Accepted call from ${targetId}`)
    }
  }

  const endCall = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        action: "end_call",
        target: targetId
      }))
      setStatus("idle")
      logMessage(`🔚 Ended call with ${targetId}`)
    }
  }

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>Chat + Call App</h2>
      <p><strong>You are:</strong> {userId}</p>
      <p><strong>Talking to:</strong> {targetId}</p>
      <p><strong>Status:</strong> {status}</p>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ width: '70%', marginRight: '1rem' }}
        />
        <button onClick={sendMessage} disabled={!message.trim()}>Send</button>
      </div>

      {status === 'idle' && <button onClick={callUser}>📞 Call {targetId}</button>}
      {status === 'calling' && <button onClick={endCall}>❌ Cancel Call</button>}
      {status === 'ringing' && (
        <>
          <button onClick={acceptCall}>✅ Accept Call</button>
          <button onClick={endCall}>❌ Cancel Call</button>
        </>
      )}
      {status === 'in_call' && <button onClick={endCall}>❌ End Call</button>}

      <hr />
      <h4>Logs:</h4>
      <ul>
        {log.map((msg, idx) => <li key={idx}>{msg}</li>)}
      </ul>
    </div>
  )
}

export default App
