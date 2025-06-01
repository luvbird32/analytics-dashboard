
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ComposedChart, Area, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { CryptoData } from '@/types/dashboard';

interface CryptoChartProps {
  data: CryptoData[];
  symbol?: string;
}

/**
 * Cryptocurrency price and volume chart
 */
export const CryptoChart = ({ data, symbol = "BTC" }: CryptoChartProps) => {
  const chartConfig = {
    price: {
      label: "Price",
      color: "#f59e0b"
    },
    volume: {
      label: "Volume",
      color: "#6b7280"
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>{symbol} Price & Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="price" orientation="left" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="volume" orientation="right" tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                yAxisId="volume" 
                dataKey="volume" 
                fill="var(--color-volume)" 
                opacity={0.3} 
              />
              <Area
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                fill="var(--color-price)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
