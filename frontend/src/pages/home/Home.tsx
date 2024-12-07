import React, { Fragment, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChatBubbleLeftIcon, PuzzlePieceIcon, UserGroupIcon, EllipsisVerticalIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import TransactionPanel from '../../components/transaction/TransactionPanel';
import ethIcon from '~/assets/ETH.svg';
import polygonIcon from '~/assets/Polygon.svg';
import btcIcon from '~/assets/BTC.svg';
import Lottie from 'lottie-react';
import avatarAnimation from '~/assets/Avatar.json';

const NavLink = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100 ${
      isActive ? 'text-white' : 'text-white'
    } hover:text-blue-500`}
  >
    <Icon className="w-6 h-6" />
    <span className="text-xs mt-1">{label}</span>
  </div>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const currentPath = location.pathname.split('/')[2] || 'chat';

  const blockchains = ['Ethereum', 'Polygon', 'BTC'];
  const moreOptions = ['Logout'];

  const [selectedBlockchain, setSelectedBlockchain] = useState('Polygon');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="w-[357px] h-[600px] flex flex-col transition-all duration-300">
      <header className="h-20 bg-[#2da1ff] px-4">
        <div className="h-full flex items-center justify-between">
          <Menu as="div" className="relative">
            <MenuButton className="w-8 h-8 hover:bg-blue-300 rounded-full frc-center transition duration-300">
              <img
                src={selectedBlockchain === 'Polygon' ? polygonIcon : selectedBlockchain === 'Ethereum' ? ethIcon : btcIcon}
                alt={`${selectedBlockchain} Icon`}
                className="w-8 h-8 text-gray-600"
              />
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute z-10 left-0 mt-2 w-48 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {blockchains.map(chain => (
                  <MenuItem key={chain}>
                    {({ focus }) => (
                      <button
                        onClick={() => setSelectedBlockchain(chain)}
                        className={`${focus ? 'bg-gray-100' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-900`}
                      >
                        {chain}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </Menu>

          <div className="flex items-center justify-center flex-1 mx-4">
            <Lottie animationData={avatarAnimation} className="w-10 h-10 " />
            <div className="flex flex-col">
              <span className="ml-2 text-white">{user?.username}</span>
              <span className="ml-2 text-white">0x......d35w</span>
            </div>
          </div>

          <Menu as="div" className="relative">
            <MenuButton className="p-2 hover:bg-gray-100 rounded-full frc-center transition duration-300">
              <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute z-10 right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {moreOptions.map(option => (
                  <MenuItem key={option}>
                    {({ focus }) => (
                      <button
                        onClick={option === 'Logout' ? handleLogout : undefined}
                        className={`${focus ? 'bg-gray-100' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-900`}
                      >
                        {option}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </header>
      {/* 分割线 */}
      <div className="bg-[#2da1ff]">
        <div className="h-0.4 bg-blue-300 w-4/5 m-auto" />
      </div>
      {/* 下面的 */}
      <nav className="h-15 bg-[#2da1ff] shadow-md">
        <div className="h-full flex items-center justify-around">
          <NavLink icon={ChatBubbleLeftIcon} label="Chat" isActive={currentPath === 'chat'} onClick={() => navigate('/home/chat')} />
          <NavLink icon={BuildingLibraryIcon} label="Assets" isActive={currentPath === 'assets'} onClick={() => navigate('/home/assets')} />
          <NavLink icon={PuzzlePieceIcon} label="Game" isActive={currentPath === 'game'} onClick={() => navigate('/home/game')} />
          <NavLink icon={UserGroupIcon} label="Social" isActive={currentPath === 'social'} onClick={() => navigate('/home/social')} />
        </div>
      </nav>
      <main className="flex-1 relative overflow-auto transition-all duration-300 bg-gray-100">
        <Outlet />
        <TransactionPanel />
      </main>
    </div>
  );
};

export default Home;
