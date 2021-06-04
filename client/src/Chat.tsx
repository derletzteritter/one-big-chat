import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { BiSend, BiLogOut } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { useAuth } from './auth/hooks/useAuth';

let socket: any;

function Chat() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [username, setUsername] = useState('');
  const [typing, setTyping] = useState('');
  const { user } = useAuth();
  const history = useHistory();

  const messageEndRef = useRef(null);

  const ENDPOINT =
    'http://localhost:5000'; /* 'https://one-chat-big-backend.herokuapp.com'; */

  // connecting the user
  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    socket.emit('join', username);

    return () => {
      socket.disconnect(username);
      socket.off();
    };
  }, [username]);

  // If typing...
  const handleMesssageChange = (e: any) => {
    setMessage(e.currentTarget.value);

    // heh
    /*socket.emit('typing', username);
    if (e.currentTarget.value === '') {
      setTyping('');
    }*/
  };

  useEffect(() => {
    socket.on('isTyping', (message: any) => {
      setTyping(message.message);
    });
    setTyping('');
  }, []);

  // getting sent messages
  useEffect(() => {
    socket.on('chatMessage', (msg: any) => {
      setMessages((msgs) => [...msgs, msg]);
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    socket.on('users', (u: any) => {
      setUsers(u);
    });
  }, []);

  useEffect(() => {
    console.log(user);
    fetch('http://localhost:5000/username', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ uid: user }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setUsername(data.username));
  }, [user]);

  // sending new messages
  const sendMessage = () => {
    if (message !== '') {
      socket.emit('message', { message, username });
      setMessage('');
      setTyping('');
    }
  };

  const handleLogout = async () => {
    await fetch('http://localhost:5000/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <div className="bg-gray-900 flex pt-2 pb-2">
        <div className="text-white font-semibold text-2xl pl-3 w-56 flex-none">
          One Big Chat
        </div>
        <div className="text-white font-semibold text-1xl pt-1 w-56 flex-none">
          <button onClick={() => history.push('/video')}>Video</button>
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
            <button onClick={handleLogout}>
              {<BiLogOut size={24} color="white" />}
            </button>
            <h2 className="text-white font-medium">{username}</h2>
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
            <div className="flex flex-row pl-3 text-gray-400">
              <h2>{typing && `${typing}`}</h2>
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
                <h4 className="text-white">{username}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
