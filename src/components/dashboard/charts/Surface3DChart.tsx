
import React from 'react';
import { EChartsWrapper } from './EChartsWrapper';

interface Surface3DData {
  x: number;
  y: number;
  z: number;
}

interface Surface3DChartProps {
  data: Surface3DData[];
}

/**
 * 3D surface chart for advanced data visualization
 */
export const Surface3DChart = ({ data }: Surface3DChartProps) => {
  // Convert data to ECharts 3D format
  const surfaceData = data.map(item => [item.x, item.y, item.z]);

  const option = {
    title: {
      text: '3D Performance Surface',
      left: 'center'
    },
    tooltip: {},
    visualMap: {
      show: false,
      dimension: 2,
      min: Math.min(...data.map(d => d.z)),
      max: Math.max(...data.map(d => d.z)),
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', 
                '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
    },
    xAxis3D: {
      type: 'value',
      name: 'Time'
    },
    yAxis3D: {
      type: 'value',
      name: 'Metric'
    },
    zAxis3D: {
      type: 'value',
      name: 'Value'
    },
    grid3D: {
      boxWidth: 100,
      boxDepth: 80,
      boxHeight: 60,
      viewControl: {
        projection: 'perspective',
        autoRotate: true,
        autoRotateDirection: 'cw',
        autoRotateSpeed: 2
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true
        },
        ambient: {
          intensity: 0.3
        }
      }
    },
    series: [
      {
        type: 'surface',
        data: surfaceData,
        shading: 'color',
        itemStyle: {
          opacity: 0.8
        }
      }
    ]
  };

  return (
    <EChartsWrapper 
      option={option} 
      title="3D Performance Visualization" 
      height={500}
    />
  );
};
