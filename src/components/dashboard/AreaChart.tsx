
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { AreaData } from '@/types/dashboard';

interface AreaChartProps {
  data: AreaData[];
}

/**
 * Stacked area chart for device usage analytics
 */
export const AreaChart = ({ data }: AreaChartProps) => {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--primary))"
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--secondary))"
    },
    tablet: {
      label: "Tablet",
      color: "#FFBB28"
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Device Usage Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart data={data}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="desktop"
                stackId="1"
                stroke="var(--color-desktop)"
                fill="var(--color-desktop)"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="mobile"
                stackId="1"
                stroke="var(--color-mobile)"
                fill="var(--color-mobile)"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="tablet"
                stackId="1"
                stroke="var(--color-tablet)"
                fill="var(--color-tablet)"
                fillOpacity={0.8}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
