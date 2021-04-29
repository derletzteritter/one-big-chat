import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async () => {
    console.log(username, password);

    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
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
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="text-white mt-3">
          Already have an account?
          <span
            className="text-indigo-500 font-medium cursor-pointer"
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
