import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import Lottie from 'lottie-react';
import idleAnimation from '~/assets/Idle.json';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate('/welcome-back');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-[320px] min-h-[600px] px-2 bg-gradient-to-b from-[#f06daf] to-[#2da1ff] text-white">
      <Lottie animationData={idleAnimation} className="h-48 mb-6" />
      <h1 className="text-4xl font-bold mb-2">Cuckoo Wallet</h1>
      <h2 className="mb-12">Easy, Secure and So Cuddly</h2>
      <button
        onClick={handleButtonClick}
        className="bg-white text-lg text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
      >
        Cuckoo, Let's go
      </button>
      <p className="mt-4">You're the 19700 cuckoo owner</p>
    </div>
  );
};

export default Landing;
