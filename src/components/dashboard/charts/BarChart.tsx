
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
      <CardHeader className="pb-2">
        <CardTitle className="text-sm sm:text-base">Performance vs Target</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 10 }} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="target"
                fill="var(--color-target)"
                radius={[2, 2, 0, 0]}
                opacity={0.6}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
