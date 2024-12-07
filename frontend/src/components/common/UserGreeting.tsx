import React from 'react';
import Lottie from 'lottie-react';
import avatarAnimation from '~/assets/Avatar.json';

const UserGreeting: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="bg-white p-2 rounded-lg shadow-md text-black text-xs">{children}</div>
      <Lottie animationData={avatarAnimation} className="w-20 h-20 " />
    </div>
  );
};

export default UserGreeting;
