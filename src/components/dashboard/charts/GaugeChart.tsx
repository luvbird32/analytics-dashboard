
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GaugeData } from '@/types/dashboard';

interface GaugeChartProps {
  data: GaugeData[];
}

/**
 * Gauge chart for KPI visualization
 */
export const GaugeChart = ({ data }: GaugeChartProps) => {
  return (
    <Card className="animate-fade-in h-full">
      <CardHeader>
        <CardTitle className="text-base lg:text-lg">Performance Gauges</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4 lg:p-6 h-full">
        {data.map((gauge, index) => {
          const currentSegment = gauge.segments.find(
            segment => gauge.value >= segment.min && gauge.value <= segment.max
          );
          
          return (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm lg:text-base">{gauge.name}</span>
                <span className="text-sm text-muted-foreground">
                  {gauge.value}/{gauge.max}
                </span>
              </div>
              <Progress 
                value={(gauge.value / gauge.max) * 100} 
                className="h-4"
                style={{ 
                  '--progress-background': currentSegment?.color || 'hsl(var(--primary))'
                } as React.CSSProperties}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                {gauge.segments.map((segment, i) => (
                  <span key={i} style={{ color: segment.color }}>
                    {segment.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
