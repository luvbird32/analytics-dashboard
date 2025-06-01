
import React from 'react';
import { EChartsWrapper } from './EChartsWrapper';
import { BrushData, EChartsOption } from '@/types/echarts';

interface BrushChartProps {
  data: BrushData[];
}

/**
 * Interactive brush chart for time series data selection
 */
export const BrushChart: React.FC<BrushChartProps> = ({ data }) => {
  const option: EChartsOption = {
    title: {
      text: 'Interactive Time Series with Brush Selection',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        type: 'line',
        data: data.map(item => [item.date, item.value]),
        itemStyle: {
          color: '#3b82f6'
        }
      }
    ]
  };

  return (
    <EChartsWrapper 
      option={option} 
      title="Brush Selection Chart" 
      height={400}
    />
  );
};
