
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import { BarData } from '@/types/dashboard';

interface BarChartProps {
  data: BarData[];
}

/**
 * Bar chart for performance metrics with targets
 */
export const BarChart = ({ data }: BarChartProps) => {
  const chartConfig = {
    value: {
      label: "Actual",
      color: "hsl(var(--primary))"
    },
    target: {
      label: "Target",
      color: "hsl(var(--secondary))"
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Performance vs Target</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="target"
                fill="var(--color-target)"
                radius={[4, 4, 0, 0]}
                opacity={0.6}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
