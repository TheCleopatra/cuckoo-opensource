import React from 'react';
import ChartComponent from '../../../components/ChartComponent';
import ClickableText from '~/components/ClickableText';

const generateRandomData = (length: number) => {
  return Array.from({ length }, () => [
    Math.random() * 1000000,
    Math.random() * 1000000,
    Math.random() * 1000000,
    Math.random() * 1000000,
    Math.random() * 1000000,
  ]);
};

const CoinCharts: React.FC = () => {
  const xAxisData = ['2023-01-01', '2023-03-02', '2023-05-03', '2023-07-04', '2023-09-05'];

  // 生成随机数据
  const coins = ['BTC', 'ETH', 'ELIZA', 'SOL'];
  const coinData = coins.map(coin => {
    return [
      {
        name: coin,
        type: 'line',
        data: generateRandomData(1)[0],
        itemStyle: {
          color: '#00da3c',
        },
      },
      {
        name: coin,
        type: 'candlestick',
        data: generateRandomData(5),
        itemStyle: {
          color: '#00da3c',
        },
      },
    ];
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-2xl font-bold mb-6 mt-0 bg-gradient-to-r from-[#f06daf] to-[#f6a6c1] bg-clip-text text-transparent">Coin Trends</h3>
      <div className="space-y-4">
        {coins.map((coin, index) => (
          <div key={index} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ClickableText text={coin} className="text-xl font-bold text-gray-800 hover:text-[#f06daf]" />
                <span
                  className={`
                  ${Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'}
                  font-semibold px-2 py-1 rounded-lg text-sm
                  ${Math.random() > 0.5 ? 'bg-green-50' : 'bg-red-50'}
                `}
                >
                  {Math.random() > 0.5 ? '+' : '-'}
                  {(Math.random() * 10).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <ChartComponent seriesData={coinData[index]} xAxisData={xAxisData} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinCharts;
