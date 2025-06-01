
import React, { useState } from 'react';
import { EChartsWrapper } from './EChartsWrapper';

interface BrushData {
  date: string;
  value: number;
  category: string;
}

interface BrushChartProps {
  data: BrushData[];
}

/**
 * Interactive brush chart for data exploration with zoom and selection
 */
export const BrushChart = ({ data }: BrushChartProps) => {
  const [selectedRange, setSelectedRange] = useState<string>('');

  const option = {
    title: {
      text: 'Interactive Data Explorer',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    brush: {
      toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
      xAxisIndex: 0
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.date),
      boundaryGap: false
    },
    yAxis: {
      type: 'value'
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: 'Data Series',
        type: 'line',
        data: data.map(item => item.value),
        smooth: true,
        lineStyle: {
          color: '#3b82f6',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
            ]
          }
        }
      }
    ]
  };

  const handleBrushSelected = (params: any) => {
    if (params.batch && params.batch[0].selected.length > 0) {
      const selected = params.batch[0].selected[0];
      setSelectedRange(`Selected: ${selected.dataIndex.length} points`);
    }
  };

  return (
    <div className="space-y-4">
      {selectedRange && (
        <div className="text-sm text-muted-foreground">
          {selectedRange}
        </div>
      )}
      <EChartsWrapper 
        option={option} 
        title="Data Explorer with Brush Selection" 
        height={450}
        onEvents={{ brushSelected: handleBrushSelected }}
      />
    </div>
  );
};
