import React from 'react';
import './Assets.css';
import Balance from './components/Balance.tsx';
import TransactionButtons from './components/TransactionButtons.tsx';
import AssetList from './components/AssetList.tsx';

// 资产管理页面结构从上往下：
// 1. 账户余额（总资产）
// 2. 交易（swap）、发送、接收三个操作按钮，点击以后从下方滑上来对应的面板，展示交易信息和确认按钮，交易完成面板下滑隐藏
// 3. 资产列表（币种图标、币种名称、数量、价值）
const Account: React.FC = () => {
  return (
    <div className="assets-container">
      <Balance />
      <TransactionButtons />
      <AssetList />
    </div>
  );
};

export default Account;
