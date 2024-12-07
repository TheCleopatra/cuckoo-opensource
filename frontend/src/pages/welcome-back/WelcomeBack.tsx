import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import axios, { AxiosError } from 'axios';
import { ApiError } from '~/types/error';

const WelcomeBack: React.FC = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = async () => {
    try {
      const response = await login({ username: user?.username || '', password });

      if (response && response.success) {
        if (typeof chrome !== 'undefined' && chrome.storage) {
          await chrome.storage.local.set({
            isAuthenticated: true,
            lastActiveTime: Date.now(),
          });
        }
        navigate('/home');
        setError('');
      } else {
        setError('password is incorrect');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ApiError>;
        const errorMessage = axiosError.response?.data?.error || axiosError.response?.data?.message || 'login failed, please try again';
        setError(errorMessage);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('an error occurred during the unlock process, please try again later');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-[320px] min-h-[600px] px-2 bg-gradient-to-r from-[#f06daf] to-[#2da1ff] text-white">
      <h1 className="text-4xl font-bold mb-16">welcome back!</h1>
      <input
        type="password"
        placeholder="enter password to unlock"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mb-6 p-2 rounded-lg"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleUnlock}
        className="bg-white text-[#2da1ff] font-semibold w-2/3 py-2 px-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
      >
        Unlock
      </button>
    </div>
  );
};

export default WelcomeBack;
