import React, { useEffect, useState } from 'react';
import HappyAnimation from './HappyAnimation';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface HappyAnimationPanelProps {
  lectureTxHash: string;
  onClose: () => void;
}

const HappyAnimationPanel: React.FC<HappyAnimationPanelProps> = ({ lectureTxHash, onClose }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCloseButton(true);
    }, 1000); // 1秒后显示删除按钮

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex fixed items-center bottom-0 inset-0 bg-black bg-opacity-50 z-40 transition-opacity">
      <div className="relative w-[357px] box-border flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
        <HappyAnimation lectureTxHash={lectureTxHash} />
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-0 right-4 mt-4 bg-red-500 text-white w-8 h-8 box-border p-0 frc-center rounded-full"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HappyAnimationPanel;
