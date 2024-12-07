import React, { useState } from 'react';
import SlidingPanel from '../common/SlidingPanel';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { useTransactionStore } from '../../stores/useTransactionStore';
import CuckooGreeting from '../common/CuckooGreeting';

const TransactionPanel: React.FC = () => {
  const { isOpen, type, tokens, fromToken, toToken, closePanel, setFromToken, setToToken, swapTokens } = useTransactionStore();

  const [amount, setAmount] = useState<string>('');
  const [estimatedAmount, setEstimatedAmount] = useState<string>('0');

  const Greetings = {
    swap: 'Double-check your swap rates for the best deal!',
    send: 'Make sure to enter the correct recipient address.',
    receive: 'Verify the transaction details before confirming.',
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    // TODO: Call API to get estimated amount
    setEstimatedAmount((Number(value) * 0.001).toString());
  };

  if (!fromToken || !toToken) return null;

  return (
    <SlidingPanel isOpen={isOpen} onClose={closePanel} title={type?.toUpperCase()}>
      {type && (
        <CuckooGreeting>
          <span>{Greetings[type]}</span>
        </CuckooGreeting>
      )}
      {type === 'swap' && (
        <div className="space-y-3">
          {/* From Token */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-xs text-gray-600 mb-1.5">From</label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 flex-1">
                <img src={fromToken.icon} alt={fromToken.symbol} className="w-5 h-5" />
                <select
                  value={fromToken.symbol}
                  onChange={e => {
                    const token = tokens.find(t => t.symbol === e.target.value);
                    if (token) setFromToken(token);
                  }}
                  className="bg-transparent outline-none border-none text-sm text-black"
                >
                  {tokens.map(token => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                value={amount}
                onChange={e => handleAmountChange(e.target.value)}
                placeholder="0.0"
                className="flex-1 text-right text-black bg-transparent outline-none text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">
              Balance: {fromToken.balance} {fromToken.symbol}
            </div>
          </div>

          {/* Swap Button */}
          <button onClick={swapTokens} className="mx-auto block p-1.5 w-8 h-8 hover:bg-gray-100 rounded-full text-black frc-center">
            <ArrowsUpDownIcon className="w-4 h-4" />
          </button>

          {/* To Token */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-xs text-gray-600 mb-1.5">To</label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 flex-1">
                <img src={toToken.icon} alt={toToken.symbol} className="w-5 h-5" />
                <select
                  value={toToken.symbol}
                  onChange={e => {
                    const token = tokens.find(t => t.symbol === e.target.value);
                    if (token) setToToken(token);
                  }}
                  className="bg-transparent outline-none border-none text-sm text-black"
                >
                  {tokens.map(token => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={estimatedAmount}
                readOnly
                className="flex-1 text-right text-black bg-transparent outline-none text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">
              Balance: {toToken.balance} {toToken.symbol}
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="text-xs text-gray-500 px-1">
            1 {fromToken.symbol} ≈ {(Number(estimatedAmount) / Number(amount || 1)).toFixed(6)} {toToken.symbol}
          </div>
        </div>
      )}
      {type === 'send' && (
        <div className="space-y-3">
          {/* Address Input */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-xs text-gray-600 mb-1.5">Send To</label>
            <input
              type="text"
              placeholder="Enter address"
              className="w-full text-right text-black bg-transparent outline-none text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          {/* Token Selector and Amount */}
          <div className="p-3 mb-4 bg-gray-50 rounded-lg">
            <label className="block text-xs text-gray-600 mb-1.5">Token</label>
            <div className="flex items-center space-x-2">
              <select
                value={fromToken.symbol}
                onChange={e => {
                  const token = tokens.find(t => t.symbol === e.target.value);
                  if (token) setFromToken(token);
                }}
                className="bg-transparent outline-none border-none text-sm text-black"
              >
                {tokens.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={e => handleAmountChange(e.target.value)}
                placeholder="0.0"
                className="flex-1 text-right text-black bg-transparent outline-none text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </div>
      )}
      {type === 'receive' && (
        <div className="space-y-3">
          <div className="p-3  mb-4 bg-gray-50 rounded-lg">
            <div className="flex justify-center">
              <div className="bg-gray-200 p-4 rounded">
                <span className="text-xs text-gray-500">
                  <img
                    className="w-[140px] h-[140px] aspect-[140/140]"
                    src="https://s1.imagehub.cc/images/2024/12/04/a38cb8760d2e02170195fb3b64de6d7b.th.jpeg"
                    alt="QR Code"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg gap-6">
        <select className="bg-transparent outline-none border-none text-sm text-black cursor-pointer">
          <option value="public">Public Tx</option>
          <option value="circle">Circle Tx</option>
          <option value="private">Private Tx</option>
        </select>
        <button
          onClick={() => {
            /* TODO: Implement swap logic */
            closePanel();
          }}
          className="w-full py-2.5 px-3 bg-[#2da1ff] text-white text-sm rounded-lg hover:bg-blue-700 transition-colors capitalize"
        >
          {type}
        </button>
      </div>
    </SlidingPanel>
  );
};

export default TransactionPanel;
