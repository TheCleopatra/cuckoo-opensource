import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export interface SeriesData {
  name: string;
  type: string;
  data: number[][] | number[];
  itemStyle: {
    color: string;
  };
}

interface ChartComponentProps {
  seriesData: Array<SeriesData>; // 数据系列
  xAxisData: Array<string>; // X轴数据
}

const ChartComponent: React.FC<ChartComponentProps> = ({ seriesData, xAxisData }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          top: 20,
          bottom: 20,
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          scale: true,
        },
        series: seriesData.map((data, index) => ({
          ...data,
          itemStyle: {
            color: index % 2 === 0 ? '#f06daf' : '#2da1ff', // 使用新的配色方案
          },
        })),
        backgroundColor: '#f0f8ff', // 更改背景颜色
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose(); // 清理图表实例
      };
    }
  }, [seriesData, xAxisData]);

  return <div ref={chartRef} style={{ width: '100%', height: '150px' }} />;
};

export default ChartComponent;
