import React, { useEffect, useState } from 'react';
import CuckooGreeting from '~/components/common/CuckooGreeting';

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showChat?: boolean;
  chatContent?: React.ReactNode;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ isOpen, onClose, children, title, showChat, chatContent }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  return (
    <div
      className={`${
        !isOpen && !isAnimating ? 'hidden' : 'flex'
      } fixed items-end bottom-0 inset-0 bg-black bg-opacity-50 z-40 transition-opacity`}
    >
      <div
        className={`w-[357px] bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-out z-50 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: 'calc(560px)' }}
        onTransitionEnd={handleAnimationEnd}
      >
        {showChat && (
          <div className="p-3 border-b">
            <h2 className="text-base font-semibold">Cuckoo</h2>
            <CuckooGreeting>{chatContent}</CuckooGreeting>
          </div>
        )}
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-base font-semibold">{title}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full text-black frc-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-3 overflow-y-auto" style={{ maxHeight: 'calc(500px - 48px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SlidingPanel;
