import React from 'react';
import { ArrowDownIcon, ArrowPathIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useTransactionStore } from '../../../stores/useTransactionStore';

const TransactionButtons: React.FC = () => {
  const openPanel = useTransactionStore((state) => state.openPanel);

  const actions = [
    { type: 'swap' as const, label: 'Swap', Icon: ArrowPathIcon },
    { type: 'send' as const, label: 'Send', Icon: ArrowUpRightIcon },
    { type: 'receive' as const, label: 'Receive', Icon: ArrowDownIcon },
  ];

  return (
    <div className="flex justify-around">
      {actions.map(action => (
        <button 
          key={action.type} 
          className={`action-button ${action.type}`} 
          onClick={() => openPanel(action.type)}
        >
          <span className="icon text-2xl bg-#e6e6e6 text-#666 p-2 rounded-full frc-center w-10 h-10">
            <action.Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="mt-2 text-gray-500">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TransactionButtons;
