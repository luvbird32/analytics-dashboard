
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { CandlestickData } from '@/types/dashboard';

interface CandlestickChartProps {
  data: CandlestickData[];
}

/**
 * Candlestick chart for financial data
 */
export const CandlestickChart = ({ data }: CandlestickChartProps) => {
  const chartConfig = {
    close: {
      label: "Close Price",
      color: "hsl(var(--primary))"
    },
    volume: {
      label: "Volume",
      color: "hsl(var(--secondary))"
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Price Movement</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="price" orientation="left" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="volume" orientation="right" tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                yAxisId="volume" 
                dataKey="volume" 
                fill="var(--color-volume)" 
                opacity={0.3} 
              />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="close"
                stroke="var(--color-close)"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
