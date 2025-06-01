
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { RadarData } from '@/types/dashboard';

interface RadarChartProps {
  data: RadarData[];
}

/**
 * Radar chart for multi-dimensional performance metrics
 */
export const RadarChart = ({ data }: RadarChartProps) => {
  const chartConfig = {
    current: {
      label: "Current Period",
      color: "hsl(var(--primary))"
    },
    previous: {
      label: "Previous Period",
      color: "#82ca9d"
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Performance Radar</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Current"
                dataKey="current"
                stroke="var(--color-current)"
                fill="var(--color-current)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Previous"
                dataKey="previous"
                stroke="var(--color-previous)"
                fill="var(--color-previous)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RechartsRadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
