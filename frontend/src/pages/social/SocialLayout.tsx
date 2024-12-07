import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const SocialLayout: React.FC = () => {
  return (
    <div>
      <nav className="p-2 bg-gray-100 flex space-x-4">
        <NavLink to="contact" className="flex-1 text-center text-blue-500">
          Contact
        </NavLink>
        <NavLink to="circle" className="flex-1 text-center text-blue-500">
          Circle
        </NavLink>
      </nav>
      <div className="box-border p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default SocialLayout;
