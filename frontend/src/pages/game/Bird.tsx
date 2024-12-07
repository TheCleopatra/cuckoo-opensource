import React, { useState } from 'react';
import idleAnimation from '~/assets/Idle.json';
import foodAnimation from '~/assets/Food.json'; // Assuming Food animation is stored in this path
import Lottie from 'lottie-react';
import RadarChart from '../../components/common/RadarChart';
import { useNavigate } from 'react-router-dom';

const Bird: React.FC = () => {
  const [isFeeding, setIsFeeding] = useState(false); // State to toggle between idle and food animations
  const attributes = ['Emotion', 'Vision', 'Agility', 'Intelligence', 'Energy'];
  const attributeValues = [20, 30, 40, 50, 60]; // Example values
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col">
        <section>
          <h2 className="text-lg">Attributes</h2>
          <div>
            <RadarChart labels={attributes} data={attributeValues} />
          </div>
        </section>

        <section>
          <h2 className="text-lg">Actions</h2>
          <div className="flex-1 flex items-center">
            <div className="flex-1 overflow-auto">
              <Lottie animationData={isFeeding ? foodAnimation : idleAnimation} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <button className="bg-blue-500 text-white p-2" onClick={() => navigate('/home/chat')}>
                Talk
              </button>
              {/* 点击以后切换feed的动画 */}
              <button className="bg-green-500 text-white p-2" onClick={() => setIsFeeding(true)}>
                Feed
              </button>
              <button className="bg-yellow-500 text-white p-2">Visit</button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg">Custom</h2>
          {[1, 2, 3].map(num => (
            <button className="w-full box-border px-4 hover:bg-gray-100 text-gray-600 p-2 flex items-center justify-between" key={num}>
              <Lottie animationData={idleAnimation} className="w-12 h-12" />
              <span className="text-sm text-gray-500 ml-2">Custom {num}</span>
            </button>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Bird;
