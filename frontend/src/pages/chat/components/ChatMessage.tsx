import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import cuckoo_avatar from '~/assets/cuckoo_avatar.png';
import { Message } from '~/types/chat';

export const ChatMessage: React.FC<Message> = ({ text, user }) => {
  const isUser = user === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div className={`flex max-w-[80%] items-center ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex items-center">
          {isUser ? (
            <UserCircleIcon className="h-8 w-8 text-gray-500" />
          ) : (
            <img src={cuckoo_avatar} alt="cuckoo" className="h-8 w-8 rounded-full" />
          )}
        </div>
        <div className="ml-4 px-2 py-1 text-black bg-white rounded shadow">
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
};
