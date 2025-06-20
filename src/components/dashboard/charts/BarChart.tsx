
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { BarData } from '@/types/dashboard';

interface CustomBarChartProps {
  data: BarData[];
}

/**
 * Custom bar chart for performance metrics with targets
 */
export const CustomBarChart = ({ data }: CustomBarChartProps) => {
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
    <Card className="animate-fade-in h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base lg:text-lg">Performance vs Target</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6 h-full">
        <ChartContainer config={chartConfig} className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 60 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} width={50} />
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
