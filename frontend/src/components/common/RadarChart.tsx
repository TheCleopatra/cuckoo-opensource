import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface RadarChartProps {
  labels: string[];
  data: number[];
}

const RadarChart: React.FC<RadarChartProps> = ({ labels, data }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const option = {
        tooltip: {},
        radar: {
          center: ['50%', '50%'],
          radius: '60%',
          indicator: labels.map(label => ({ name: label, max: 100 })),
          splitArea: {
            areaStyle: {
              color: ['rgba(200, 200, 200, 0.2)', 'rgba(200, 200, 200, 0.2)'],
            },
          },
          splitLine: {
            lineStyle: {
              color: '#d1d5db', // 修改网格线颜色为比背景色稍微深一点点的灰色
            },
          },
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: data,
                name: 'Attributes',
              },
            ],
          },
        ],
      };

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [labels, data]);

  return (
    <div className="bg-[#f3f4f6] py-4 rounded-lg">
      {' '}
      {/* 修改背景颜色为 #f3f4f6 */}
      <div ref={chartRef} style={{ width: '280px', height: '280px' }} />
    </div>
  );
};

export default RadarChart;
