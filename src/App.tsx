import { useState } from 'react';
import logo from './assets/images/logo.svg';

const App = () => {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');
  const [hello, setHello] = useState('Unauthenticated');

  const handleRegister = async () => {
    const data = {
      username: user,
      password: pw,
      email: email,
    };
    try {
      const response = await fetch('http://localhost:8888/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json(); // Parse the response body as JSON
        setHello(responseData.username);
        console.log('sucessfully signed up with name ', data.username);
        console.log(responseData);
      } else {
        console.log('Failed to register');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    const data = {
      username: user,
      password: pw,
    };
    try {
      const response = await fetch('http://localhost:8888/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json(); // Parse the response body as JSON
        setHello(responseData.username);
        console.log('sucessfully login');
        console.log(responseData);
      } else {
        console.log('unauthorized');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center selection:bg-green-900">
      <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
        <img src={logo} className="h-60" alt="logo" />
        <style>
          {
            '\
            .animate-speed{\
              animation-duration:20s;\
            }\
          '
          }
        </style>
        <p>Hi {hello}</p>
        <p className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent">
          Vite + React + Typescript + Tailwindcs
        </p>
        <div className="mt-3 flex flex-col gap-2">
          <input
            type="text"
            onChange={(e) => setUser(e.target.value)}
            className="text-black"
            placeholder="username"
          />
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="text-black"
            placeholder="email"
          />
          <input
            type="text"
            onChange={(e) => setPw(e.target.value)}
            className="text-black"
            placeholder="password"
          ></input>
        </div>
        <p className="mt-3 flex flex-row gap-2">
          <button
            type="button"
            className="my-6 rounded bg-gray-300 px-2 py-2 text-[#282C34] transition-all hover:bg-gray-200 "
            onClick={() => handleLogin()}
          >
            Login
          </button>
          <button
            type="button"
            className="my-6 rounded bg-gray-300 px-2 py-2 text-[#282C34] transition-all hover:bg-gray-200 "
            onClick={() => handleRegister()}
          >
            Register
          </button>
        </p>
        <p>
          Edit <code className="text-[#8d96a7]">App.tsx</code> and save to test
          HMR updates.
        </p>
        <p className="mt-3 flex gap-3 text-center text-[#8d96a7]">
          <a
            className="text-[#61dafb] transition-all hover:text-blue-400"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="text-[#61dafb] transition-all hover:text-blue-400"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};

export default App;
