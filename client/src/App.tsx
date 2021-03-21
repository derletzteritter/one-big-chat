import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BiSend, BiLogOut } from 'react-icons/bi';
import userEvent from '@testing-library/user-event';

let socket: any;

function App() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const myUsername = 'Chip';
  const ENDPOINT = 'http://localhost:5000';

  // connecting the user
  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    socket.emit('join', myUsername);

    return () => {
      socket.disconnect(myUsername);
      socket.off();
    };
  }, []);

  // getting sent messages
  useEffect(() => {
    socket.on('chatMessage', (msg: any) => {
      console.log('messages');
      setMessages((msgs) => [...msgs, msg]);
    });
  }, []);

  useEffect(() => {
    socket.on('users', (u: any) => {
      setUsers(u);
      console.log('users');
    });
  }, []);

  // sending new messages
  const sendMessage = () => {
    if (message !== '') {
      socket.emit('message', { message, username: myUsername });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <div className="bg-red-500 flex">
        <div className="bg-red-300 w-56 flex-none">One Big Chat</div>
        <div>Here you can chat all day</div>
      </div>
      <div className="flex-1 bg-blue-500 flex overflow-y-hidden">
        <div className="bg-green-300 w-56 flex-none flex flex-col justify-between">
          <div className="overflow-y-auto">Hashtag sidebar</div>
          <div className="bg-gray-500 p-3 border-r border-gray-400 flex justify-between">
            <button>{<BiLogOut size={24} color="white" />}</button>
            <h2 className="text-white font-medium">{myUsername}</h2>
          </div>
        </div>
        <div className="bg-gray-500 flex-1 flex justify-between">
          <div className="bg-gray-600 flex-1 flex flex-col justify-between">
            <div className="overflow-y-auto">
              {messages.map((msg) => (
                <div className="pl-4 pt-3">
                  <h2 className="text-white font-medium">{msg.username}</h2>
                  <p className="text-gray-300">{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-500 flex flex-row">
              <input
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                placeholder="Message"
                className="w-full p-3 bg-gray-500 outline-none text-white"
              />
              <button onClick={sendMessage} className="pr-4 pl-4">
                {<BiSend size={24} color="white" />}
              </button>
            </div>
          </div>
          <div className="bg-indigo-600 w-56 flex-none overflow-y-auto">
            {users.map((user) => (
              <div>
                <h4>{user}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
