import React from 'react';

const Forest: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h4>Forest Exploration Map</h4>
      {/* 这里可以添加游戏地图的内容 */}
      {/* <img src="https://s1.imagehub.cc/images/2024/12/04/1409eb3905cf5973385c0edfca4ca68e.th.jpeg" alt="Forest" className="w-72 h-72" /> */}
      <div className="w-72 h-auto rounded-lg">
        <video className="w-full h-full"  src="/forest.mp4" autoPlay loop muted />
      </div>
    </div>
  );
};

export default Forest;
