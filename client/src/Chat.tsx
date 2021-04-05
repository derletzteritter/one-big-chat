import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { BiSend, BiLogOut } from 'react-icons/bi';
import userEvent from '@testing-library/user-event';
import { useHistory } from 'react-router-dom';

let socket: any;

function Chat() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const messageEndRef = useRef(null);

  const history = useHistory();

  const myUsername = window.localStorage.getItem('one_big_chat:username');
  const ENDPOINT = 'https://one-chat-big-backend.herokuapp.com';

  useEffect(() => {
    if (!window.localStorage.getItem('one_big_chat:username')) {
      history.push('/');
    }
  }, []);

  // If typing...
  const handleMesssageChange = (e: any) => {
    setMessage(e.currentTarget.value);

    socket.emit('typing', myUsername);
  };

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
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    socket.on('users.ts', (u: any) => {
      setUsers(u);
      console.log('users.ts');
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
      <div className="bg-gray-900 flex pt-2 pb-2">
        <div className="text-white font-semibold text-2xl pl-3 w-56 flex-none">
          One Big Chat
        </div>
      </div>
      <div className="flex-1 bg-blue-500 flex overflow-y-hidden">
        <div className="bg-gray-800 w-56 flex-none flex flex-col justify-between">
          <div className="overflow-y-auto">
            <div className="bg-gray-400 p-2 rounded-md flex items center mt-3">
              <h1 className="text-gray-600 ">#main</h1>
            </div>
          </div>
          <div className="bg-gray-500 p-3 border-r border-gray-400 flex justify-between">
            <button>{<BiLogOut size={24} color="white" />}</button>
            <h2 className="text-white font-medium">{myUsername}</h2>
          </div>
        </div>
        <div className="bg-gray-500 flex-1 flex justify-between">
          <div className="bg-gray-600 flex-1 flex flex-col justify-between">
            <div className="overflow-y-auto">
              {messages.map((msg) => (
                <div className="pl-4 pt-3 pb-3" ref={messageEndRef}>
                  <h2 className="text-white font-medium">{msg.username}</h2>
                  <p className="text-gray-300">{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-500 flex flex-row">
              <input
                value={message}
                onChange={(e) => handleMesssageChange(e)}
                placeholder="Message"
                className="w-full p-3 bg-gray-500 outline-none text-white"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage} className="pr-4 pl-4 bg-indigo-500">
                {<BiSend size={24} color="white" />}
              </button>
            </div>
          </div>
          <div className="bg-gray-800 w-56 flex-none overflow-y-auto">
            <h1 className="text-white font-medium text-2xl pl-2 pt-2">Users</h1>
            {users.map((user) => (
              <div className="p-2">
                <h4 className="text-white">{user}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
