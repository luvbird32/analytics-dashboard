
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Treemap, ResponsiveContainer } from 'recharts';
import { TreemapData } from '@/types/dashboard';

interface TreemapChartProps {
  data: TreemapData[];
}

/**
 * Treemap chart for hierarchical data visualization
 */
export const TreemapChart = ({ data }: TreemapChartProps) => {
  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--primary))"
    }
  };

  return (
    <Card className="animate-fade-in h-full">
      <CardHeader>
        <CardTitle className="text-base lg:text-lg">Category Distribution</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6 h-full">
        <ChartContainer config={chartConfig} className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={data}
              dataKey="value"
              stroke="#fff"
              fill="var(--color-value)"
            />
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
