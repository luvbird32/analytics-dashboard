
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EChartsOption, EChartsEvent } from '@/types/echarts';

interface EChartsWrapperProps {
  option: EChartsOption;
  title: string;
  height?: number;
  onEvents?: Record<string, (params: EChartsEvent) => void>;
}

/**
 * Reusable ECharts wrapper component with consistent styling
 */
export const EChartsWrapper: React.FC<EChartsWrapperProps> = ({ 
  option, 
  title, 
  height = 400,
  onEvents 
}) => {
  return (
    <Card className="animate-fade-in h-full">
      <CardHeader>
        <CardTitle className="text-base lg:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <ReactECharts
          option={option}
          style={{ height: `${height}px` }}
          onEvents={onEvents}
          opts={{ renderer: 'canvas' }}
        />
      </CardContent>
    </Card>
  );
};
