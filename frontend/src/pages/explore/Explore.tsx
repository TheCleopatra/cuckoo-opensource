import React from 'react';
import Recommends from './components/Recommends';
import CoinCharts from './components/CoinCharts';
import TwitterKOLs from './components/TwitterKOLs';

const Explore: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="space-y-6">
        <Recommends />
        <CoinCharts />
        <TwitterKOLs />
      </div>
    </div>
  );
};

export default Explore;
