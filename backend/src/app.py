from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

@app.route('/start_call', methods=['POST'])
def start_call():
    data = request.json
    # Logic to start the call
    emit('call_started', {'message': 'Call started'}, broadcast=True)
    return jsonify({'status': 'Call started'}), 200

@app.route('/end_call', methods=['POST'])
def end_call():
    data = request.json
    # Logic to end the call
    emit('call_ended', {'message': 'Call ended'}, broadcast=True)
    return jsonify({'status': 'Call ended'}), 200

@socketio.on('connect')
def handle_connect():
    emit('status', {'message': 'Connected to the audio calling service'})

@socketio.on('disconnect')
def handle_disconnect():
    emit('status', {'message': 'Disconnected from the audio calling service'})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)