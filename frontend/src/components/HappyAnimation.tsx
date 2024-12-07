import React from 'react';
import Lottie from 'lottie-react';
import happyAnimation from '~/assets/Happy.json';

interface HappyAnimationProps {
  lectureTxHash: string;
}

const HappyAnimation: React.FC<HappyAnimationProps> = ({ lectureTxHash }) => {
  const handleButtonClick = () => {
    window.open(`https://polygonscan.com/tx/${lectureTxHash}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="absolute top-0 left-4 text-center text-green-500">Congratulations! </h3>
      <Lottie animationData={happyAnimation} className="mt-10 w-48 h-48" />
      <p className="mb-0 mx-0 text-center text-sm text-gray-500">Cutorial Completed</p>
      <button onClick={handleButtonClick} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Go to Polygonscan!
      </button>
    </div>
  );
};

export default HappyAnimation;
