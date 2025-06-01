
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
    brush: {
      toolbox: ['rect', 'polygon', 'clear'],
      xAxisIndex: 0
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.date),
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      name: 'Value'
    },
    dataZoom: [
      {
        type: 'slider',
        start: 0,
        end: 100,
        xAxisIndex: 0
      },
      {
        type: 'inside',
        start: 0,
        end: 100,
        xAxisIndex: 0
      }
    ],
    series: [
      {
        type: 'line',
        name: 'Time Series Data',
        data: data.map(item => item.value),
        smooth: true,
        itemStyle: {
          color: '#3b82f6'
        },
        lineStyle: {
          color: '#3b82f6',
          width: 2
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
