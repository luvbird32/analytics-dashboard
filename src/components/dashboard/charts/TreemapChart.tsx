
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
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Category Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
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
