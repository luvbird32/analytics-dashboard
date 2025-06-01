
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { DonutData } from '@/types/dashboard';

interface DonutChartProps {
  data: DonutData[];
}

/**
 * Donut chart for category distribution with center hole
 */
export const DonutChart = ({ data }: DonutChartProps) => {
  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--primary))"
    }
  };

  return (
    <Card className="animate-fade-in h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base lg:text-lg">Category Distribution</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6 h-full">
        <ChartContainer config={chartConfig} className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend 
                wrapperStyle={{ fontSize: '14px' }}
                iconSize={12}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
