
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import { PerformanceMetric } from '@/types/dashboard';

interface EnhancedMetricCardProps {
  metric: PerformanceMetric;
}

/**
 * Enhanced metric card with progress indicators and targets
 */
export const EnhancedMetricCard = ({ metric }: EnhancedMetricCardProps) => {
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

  const getPriorityColor = () => {
    switch (metric.priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      default:
        return 'border-l-green-500';
    }
  };

  const getProgressValue = () => {
    if (!metric.target) return 0;
    return Math.min(100, (metric.value / metric.target) * 100);
  };

  const formatValue = (value: number) => {
    if (metric.unit === '$') {
      return `$${value.toLocaleString()}`;
    }
    return `${value.toLocaleString()}${metric.unit}`;
  };

  return (
    <Card className={`animate-fade-in border-l-4 ${getPriorityColor()} hover-scale`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </CardTitle>
        <div className="flex items-center gap-1">
          {getTrendIcon()}
          {metric.target && (
            <Target className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-2xl font-bold">
          {formatValue(metric.value)}
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className={getChangeColor()}>
            {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}% from last month
          </span>
          <span className="text-muted-foreground uppercase font-medium">
            {metric.priority}
          </span>
        </div>

        {metric.target && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Target Progress</span>
              <span className="font-medium">
                {formatValue(metric.target)}
              </span>
            </div>
            <Progress 
              value={getProgressValue()} 
              className="h-2"
            />
            <p className="text-xs text-muted-foreground">
              {getProgressValue().toFixed(1)}% of target achieved
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
