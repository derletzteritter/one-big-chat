import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');

  return (
    <div className="flex items-center justify-center h-screen bg-pink-500">
      <Head>
        <title>One Big Chat - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="shadow-md rounded-md p-40 bg-pink-400">
        <h1 className="text-white text-center font-bold text-3xl mb-5">
          One Big Chat
        </h1>
        <div>
          <input
            placeholder="nickname"
            className="rounded bg-gray-100 p-2 px-1 outline-none text-gray-400"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="text-center">
          <button className="text-white font-medium bg-pink-300 mt-2 p-2 rounded w-52 shadow">
            Chat
          </button>
        </div>
      </main>
    </div>
  );
}
