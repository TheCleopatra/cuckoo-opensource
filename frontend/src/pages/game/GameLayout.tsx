import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const GameLayout: React.FC = () => {
  return (
    <div>
      <nav className="p-2 bg-gray-100 flex space-x-4">
        <NavLink to="bird" className="flex-1 text-center text-blue-500">
          Bird
        </NavLink>
        <NavLink to="forest" className="flex-1 text-center text-blue-500">
          Forest
        </NavLink>
      </nav>
      <div className="box-border px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default GameLayout;
