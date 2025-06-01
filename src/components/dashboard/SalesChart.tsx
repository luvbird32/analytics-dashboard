
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { SalesData } from '@/types/dashboard';

interface SalesChartProps {
  data: SalesData[];
}

/**
 * Bar chart component for sales data visualization
 */
export const SalesChart = ({ data }: SalesChartProps) => {
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))"
    },
    orders: {
      label: "Orders",
      color: "hsl(var(--secondary))"
    }
  };

  return (
    <Card className="animate-fade-in h-full">
      <CardHeader>
        <CardTitle className="text-base lg:text-lg">Sales Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6 h-full">
        <ChartContainer config={chartConfig} className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="orders"
                fill="var(--color-orders)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
