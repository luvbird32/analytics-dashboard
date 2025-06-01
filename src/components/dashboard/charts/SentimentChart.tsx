
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import { SentimentData } from '@/types/dashboard';

interface SentimentChartProps {
  data: SentimentData[];
}

/**
 * Sentiment analysis chart for social media monitoring
 */
export const SentimentChart = ({ data }: SentimentChartProps) => {
  const chartConfig = {
    positive: {
      label: "Positive",
      color: "#22c55e"
    },
    negative: {
      label: "Negative", 
      color: "#ef4444"
    },
    neutral: {
      label: "Neutral",
      color: "#6b7280"
    },
    overall: {
      label: "Overall Score",
      color: "hsl(var(--primary))"
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[-100, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ReferenceLine y={0} stroke="#888" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="overall"
                stroke="var(--color-overall)"
                strokeWidth={3}
                dot={{ fill: "var(--color-overall)", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="positive"
                stroke="var(--color-positive)"
                strokeWidth={2}
                dot={{ fill: "var(--color-positive)", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="negative"
                stroke="var(--color-negative)"
                strokeWidth={2}
                dot={{ fill: "var(--color-negative)", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
