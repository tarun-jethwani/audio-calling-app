import { useEffect, useRef, useState } from 'react'

type CallStatus = 'idle' | 'calling' | 'ringing' | 'in_call'

function App() {
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get("user") || "user1" // ?user=user1 or ?user=user2
  const targetId = userId === "user1" ? "user2" : "user1"

  const [status, setStatus] = useState<CallStatus>('idle')
  const [log, setLog] = useState<string[]>([])
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`)
    ws.current = socket

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const action = data.action
      const from = data.from

      if (action === "incoming_call") {
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
      <h2>Audio Call App</h2>
      <p><strong>You are:</strong> {userId}</p>
      <p><strong>Talking to:</strong> {targetId}</p>
      <p><strong>Status:</strong> {status}</p>

      {status === 'idle' && <button onClick={callUser}>📞 Call {targetId}</button>}
      {status === 'ringing' && <button onClick={acceptCall}>✅ Accept Call</button>}
      {status === 'in_call' && <button onClick={endCall}>❌ End Call</button>}
      {status === 'calling' && <button onClick={endCall}>❌ Cancel Call</button>}

      <hr />
      <h4>Logs:</h4>
      <ul>
        {log.map((msg, idx) => <li key={idx}>{msg}</li>)}
      </ul>
    </div>
  )
}

export default App
