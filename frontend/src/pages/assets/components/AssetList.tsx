import React, { useEffect, useState } from 'react';
import POL from '../../../assets/Polygon.svg';
import BTC from '../../../assets/BTC.svg';
import ETH from '../../../assets/ETH.svg';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  iconUrl: string;
}

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: 替换为实际的API调用
    const mockAssets: Asset[] = [
      {
        id: '1',
        name: 'Bitcoin',
        symbol: 'BTC',
        amount: 0.5,
        value: 20000,
        iconUrl: BTC,
      },
      {
        id: '2',
        name: 'Ethereum',
        symbol: 'ETH',
        amount: 5.0,
        value: 10000,
        iconUrl: ETH,
      },
      {
        id: '3',
        name: 'Polygon',
        symbol: 'POL',
        amount: 5.0,
        value: 10000,
        iconUrl: POL,
      },
    ];

    setAssets(mockAssets);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="asset-list">
      <h3 className="asset-list-title">Tokens</h3>
      <div className="flex flex-col gap-2">
        {assets.map(asset => (
          <div key={asset.id} className="flex items-center p-4 border-b border-gray-100 shadow-sm hover:shadow hover:bg-gray-200">
            <div className="mr-2">
              <img src={asset.iconUrl} alt={asset.symbol} />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold">{asset.name}</div>
              <div className="text-xs text-gray-500">{asset.symbol}</div>
            </div>
            <div className="text-right">
              <div className="text-base font-semibold">
                {asset.amount} {asset.symbol}
              </div>
              <div className="text-sm text-gray-500">${asset.value.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetList;
