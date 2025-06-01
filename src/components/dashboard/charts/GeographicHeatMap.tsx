
import React from 'react';
import { EChartsWrapper } from './EChartsWrapper';

interface GeographicData {
  name: string;
  value: number;
  coordinates: [number, number];
}

interface GeographicHeatMapProps {
  data: GeographicData[];
}

/**
 * Geographic heat map using ECharts with zoom and pan capabilities
 */
export const GeographicHeatMap = ({ data }: GeographicHeatMapProps) => {
  const option = {
    title: {
      text: 'Global User Distribution',
      left: 'center',
      textStyle: { fontSize: 16 }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `${params.name}: ${params.value[2]} users`;
      }
    },
    geo: {
      map: 'world',
      roam: true, // Enable zoom and pan
      zoom: 1.2,
      center: [0, 20],
      itemStyle: {
        areaColor: '#f3f4f6',
        borderColor: '#d1d5db'
      },
      emphasis: {
        itemStyle: {
          areaColor: '#e5e7eb'
        }
      }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: data.map(item => ({
          name: item.name,
          value: [...item.coordinates, item.value]
        })),
        symbolSize: (val: number[]) => Math.max(val[2] / 100, 8),
        itemStyle: {
          color: '#3b82f6',
          shadowBlur: 10,
          shadowColor: 'rgba(59, 130, 246, 0.5)'
        },
        emphasis: {
          itemStyle: {
            color: '#1d4ed8'
          }
        }
      }
    ]
  };

  return (
    <EChartsWrapper 
      option={option} 
      title="Geographic Distribution" 
      height={500}
    />
  );
};
