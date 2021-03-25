import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    if (username !== '') {
      window.localStorage.setItem('one_big_chat:username', username);
      history.push('/chat');
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="bg-gray-800 p-40 rounded shadow-lg flex flex-col">
        <h1 className="text-white font-medium text-3xl text-center">
          One Big Chat
        </h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          placeholder="Username"
          className="p-2 rounded mt-4 font-regular outline-none text-gray-500"
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Password"
          className="p-2 rounded mt-4 font-regular outline-none text-gray-500"
          type="password"
        />
        <button
          className="text-white p-2 rounded mt-4 bg-indigo-500 hover:bg-indigo-400 outline-none font-medium"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
