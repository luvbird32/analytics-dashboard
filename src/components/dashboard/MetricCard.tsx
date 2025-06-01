
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PerformanceMetric } from '@/types/dashboard';

interface MetricCardProps {
  metric: PerformanceMetric;
}

/**
 * Display card for performance metrics with trend indicators
 */
export const MetricCard = ({ metric }: MetricCardProps) => {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChangeColor = () => {
    if (metric.change > 0) return 'text-green-500';
    if (metric.change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </CardTitle>
        {getTrendIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {metric.unit === '$' && metric.unit}
          {metric.value.toLocaleString()}
          {metric.unit !== '$' && metric.unit}
        </div>
        <p className={`text-xs ${getChangeColor()}`}>
          {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}% from last month
        </p>
      </CardContent>
    </Card>
  );
};
