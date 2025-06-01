
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { HashtagData } from '@/types/dashboard';

interface HashtagChartProps {
  data: HashtagData[];
}

/**
 * Trending hashtags chart with sentiment indicators
 */
export const HashtagChart = ({ data }: HashtagChartProps) => {
  const chartConfig = {
    mentions: {
      label: "Mentions",
      color: "hsl(var(--primary))"
    }
  };

  const getBarColor = (sentiment: number) => {
    if (sentiment > 0.2) return "#22c55e";
    if (sentiment < -0.2) return "#ef4444";
    return "#6b7280";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-500" />;
      default: return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Trending Hashtags</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="horizontal">
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis 
                dataKey="tag" 
                type="category" 
                tick={{ fontSize: 10 }} 
                width={80}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name, props) => [
                  value,
                  'Mentions',
                  getTrendIcon(props.payload.trend)
                ]}
              />
              <Bar dataKey="mentions" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.sentiment)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
