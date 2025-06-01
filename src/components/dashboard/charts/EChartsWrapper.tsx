
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EChartsWrapperProps {
  option: any;
  title: string;
  height?: number;
  onEvents?: Record<string, (params: any) => void>;
}

/**
 * Reusable ECharts wrapper component with consistent styling
 */
export const EChartsWrapper = ({ 
  option, 
  title, 
  height = 400,
  onEvents 
}: EChartsWrapperProps) => {
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
