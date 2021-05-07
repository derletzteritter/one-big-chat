import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();
  const { user, setUser } = useAuth();

  const handleRegister = async () => {
    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('USER: ', data.user);

    if (data.error) {
      console.log(data.error);
      setMessage(data.error);
    }

    if (data.user) {
      setUser(data.user);
      history.push('/chat');
      console.log(user);
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
        <div className="pt-3">
          <p className="text-red-500">{message}</p>
        </div>
        <button
          className="text-white p-2 rounded mt-4 bg-indigo-600 hover:bg-indigo-500 outline-none font-medium"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="text-white mt-3">
          Already have an account?
          <span
            className="text-indigo-500 font-medium cursor-pointer select-none"
            onClick={() => history.push('/')}
          >
            {' '}
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
