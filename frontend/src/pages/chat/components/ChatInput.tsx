import React, { useState, useRef } from 'react';
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false, placeholder = 'Cuckoo, I want to...' }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading || disabled) return;

    setIsLoading(true);
    try {
      await onSend(message.trim());
      setMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <input
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className="box-border w-full resize-none rounded-lg border border-gray-300 bg-gray-100 text-black px-3 py-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-200"
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || isLoading || disabled}
          className={`rounded-full p-2 h-10 w-10 frc-center font-medium text-white ${
            !message.trim() || isLoading || disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? <ArrowPathIcon className="animate-spin h-5 w-5" /> : <PaperAirplaneIcon className="h-5 w-5" />}
        </button>
      </div>
    </form>
  );
};
