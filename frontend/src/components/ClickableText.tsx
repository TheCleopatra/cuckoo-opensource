import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ClickableTextProps {
  text: string;
  className?: string;
}

const ClickableText: React.FC<ClickableTextProps> = ({ text, className }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate(`/home/chat?text=${text}`);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPopupPosition({ top: e.clientY, left: e.clientX });
    setShowPopup(true);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(action);
    setShowPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const popup = document.querySelector('.absolute.z-99');
      if (popup && !popup.contains(e.target as Node)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div className={className}>
      <span onClick={handleLeftClick} onContextMenu={handleRightClick} className="cursor-pointer text-gray-500 hover:text-blue-500">
        {text}
      </span>

      {showPopup && popupPosition && (
        <div className="absolute z-99 bg-white border rounded shadow-lg p-2" style={{ top: popupPosition.top, left: popupPosition.left }}>
          <ul className="list-none space-y-2">
            <li onClick={() => handleMenuItemClick('Go to trade')} className="cursor-pointer hover:bg-gray-100 p-2">
              Go to trade
            </li>
            <li onClick={() => handleMenuItemClick('Search for latest')} className="cursor-pointer hover:bg-gray-100 p-2">
              Search for latest
            </li>
            <li onClick={() => handleMenuItemClick("What's this?")} className="cursor-pointer hover:bg-gray-100 p-2">
              What's this?
            </li>
            <li onClick={() => handleMenuItemClick('Valuable to trade?')} className="cursor-pointer hover:bg-gray-100 p-2">
              Valuable to trade?
            </li>
            <li onClick={() => handleMenuItemClick('I want to ask/say ...')} className="cursor-pointer hover:bg-gray-100 p-2">
              I want to ask/say ...
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClickableText;
