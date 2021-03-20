import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

let socket: any;

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const ENDPOINT = 'http://localhost:5000';

  // connecting the user
  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    return () => {
      socket.off();
    };
  }, []);

  // getting sent messages
  useEffect(() => {
    socket.on('chatMessage', (msg: any) => {
      setMessages((msgs) => [...msgs, msg]);
    });
  }, []);

  // sending new messages
  const sendMessage = () => {
    if (message !== '') {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {messages.map((msg) => (
          <p>{msg}</p>
        ))}
        <input
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Message..."
        />
        <button onClick={sendMessage}>Send message</button>
      </header>
    </div>
  );
}

export default App;
