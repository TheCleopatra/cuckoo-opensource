import React, { useEffect, useState } from 'react';
import { JsonRpcProvider, formatEther } from 'ethers'; // 直接导入 formatEther
// import { storage } from '../../../utils/storage'; // 确保引入storage工具

const Balance: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [balanceChange] = useState<number>(0);

  // 模拟获取账户余额
  useEffect(() => {
    const fetchBalance = async () => {
      const walletAddress = '0x2E7E94BE872319A0D991F704E1F4fad385F5855d'; //storage.getWalletAddress(); // 获取钱包地址
      if (walletAddress) {
        try {
          // 连接到以太坊节点（使用 Infura 或 Alchemy 的提供的 URL）
          const provider = new JsonRpcProvider('https://mainnet.infura.io/v3/56f9badb397d4885b1797aed1a3cea32'); // 替换为你的 Infura 项目 ID

          // 获取余额
          const balance = await provider.getBalance(walletAddress);
          const balanceInEth = formatEther(balance); // 直接使用 formatEther 转换为以太币

          setTotalBalance(parseFloat(balanceInEth)); // 更新余额
        } catch (error) {
          console.error('获取余额失败:', error);
        }
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-start items-center gap-2">
        <h2>Total</h2>
        <div className={`text-sm p-2 rounded-md ${balanceChange >= 0 ? 'text-#22c55e' : 'text-#ef4444'}`}>
          {balanceChange >= 0 ? '+' : ''}
          {balanceChange}%
        </div>
      </div>
      <div className="mb-4 text-4xl font-bold">
        <span className="currency">$</span>
        <span className="amount">{totalBalance.toFixed(6)}</span>
      </div>
    </div>
  );
};

export default Balance;
