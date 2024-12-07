import React from 'react';
import idleAnimation from '~/assets/Idle.json';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

const CuckooGreeting: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-start space-x-2">
      <Lottie animationData={idleAnimation} className="w-[80px] h-[80px]" />
      <div className="flex-1 bg-white p-2 rounded-lg shadow-md text-black text-xs">
        <div className="flex-1 break-all">{children}</div>
        <div className="p-1">
          <a
            type="button"
            onClick={() => navigate('/home/explore')}
            className="text-blue-500 text-xs cursor-pointer w-full m-auto rounded hover:text-blue-500 border-0 transition"
          >
            {'👋 Wave to Explore Page'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CuckooGreeting;
