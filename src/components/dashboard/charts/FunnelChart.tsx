
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { FunnelChart as RechartsFunnelChart, Funnel, LabelList, ResponsiveContainer } from 'recharts';
import { FunnelData } from '@/types/dashboard';

interface FunnelChartProps {
  data: FunnelData[];
}

/**
 * Funnel chart for conversion tracking
 */
export const FunnelChart = ({ data }: FunnelChartProps) => {
  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--primary))"
    }
  };

  return (
    <Card className="animate-fade-in h-full">
      <CardHeader>
        <CardTitle className="text-base lg:text-lg">Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6 h-full">
        <ChartContainer config={chartConfig} className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsFunnelChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Funnel
                dataKey="value"
                data={data}
                isAnimationActive
                fill="var(--color-value)"
              >
                <LabelList position="center" fill="#fff" stroke="none" />
              </Funnel>
            </RechartsFunnelChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
