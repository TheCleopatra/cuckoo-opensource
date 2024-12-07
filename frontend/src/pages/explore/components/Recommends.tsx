import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Recommend = {
  title: string;
  description: string;
  costTime: string;
  image: string;
  action: string;
};

/* explore-Recommends*/
const Recommends: React.FC = () => {
  const [recommends, setRecommends] = useState<Recommend[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRecommends([
      {
        title: 'Onboarding Cutorial',
        description: 'Complete the task to get 1 $USDC for free',
        costTime: 'Estimated time: 1-2 minutes',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
        action: 'go!',
      },
    ]);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-2xl font-bold mt-0 mb-3 bg-gradient-to-r from-[#f06daf] to-[#f6a6c1] bg-clip-text text-transparent">
        Quest for you!
      </h3>
      <ul className="space-y-3">
        {recommends.map((recommend, index) => (
          <li
            key={index}
            className="bg-white rounded-lg p-3 transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-[#f06daf]"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-0">{recommend.title}</h4>
                <p className="text-gray-600 text-sm mb-1">{recommend.description}</p>
                <p className="text-gray-500 text-xs">{recommend.costTime}</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={recommend.image} alt={recommend.title} className="w-12 h-12 rounded-lg shadow-sm object-cover" />
                <button
                  onClick={() => navigate(`/home/chat?from=lecture`)}
                  className="mt-2 px-4 py-1 bg-[#f06daf] text-white rounded-full text-sm
                           hover:bg-[#d55b94] transition-colors duration-300"
                >
                  {recommend.action}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommends;
