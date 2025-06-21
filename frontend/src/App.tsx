import { useEffect, useRef, useState } from 'react'

type CallStatus = 'idle' | 'calling' | 'ringing' | 'in_call' | 'in_chat'

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
      const { action, from, message: content } = data

      if (action === "incoming_call") {
        setStatus("ringing")
        logMessage(`📞 Incoming call from ${from}`)
      } else if (action === "call_accepted") {
        setStatus("in_call")
        logMessage(`✅ Call accepted by ${from}`)
      } else if (action === "call_ended") {
        setStatus("idle")
        logMessage(`❌ Call ended by ${from}`)
      } else if (action === "chat_message") {
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

  const requestMicAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      logMessage("🎤 Microphone access granted")
    } catch (err) {
      logMessage("🚫 Microphone access denied")
    }
  }

  const callUser = async () => {
    await requestMicAccess()
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
      <h2>Chat + Audio App</h2>
      <p><strong>You are:</strong> {userId}</p>
      <p><strong>Talking to:</strong> {targetId}</p>
      <p><strong>Status:</strong> {status}</p>

      {/* Call Controls */}
      {status === 'idle' && <button onClick={callUser}>📞 Call {targetId}</button>}
      {status === 'ringing' && <button onClick={acceptCall}>✅ Accept Call</button>}
      {(status === 'in_call' || status === 'calling') &&
        <button onClick={endCall}>❌ {status === 'in_call' ? 'End Call' : 'Cancel Call'}</button>}

      {/* Chat Input */}
      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ width: '70%', marginRight: '1rem' }}
        />
        <button onClick={sendMessage} disabled={!message.trim()}>Send</button>
      </div>

      {/* Logs */}
      <hr />
      <h4>Logs:</h4>
      <ul>
        {log.map((msg, idx) => <li key={idx}>{msg}</li>)}
      </ul>
    </div>
  )
}

export default App
