
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { EngagementData } from '@/types/dashboard';

interface EngagementChartProps {
  data: EngagementData[];
}

/**
 * Social media engagement metrics chart
 */
export const EngagementChart = ({ data }: EngagementChartProps) => {
  const chartConfig = {
    likes: {
      label: "Likes",
      color: "#3b82f6"
    },
    shares: {
      label: "Shares",
      color: "#10b981"
    },
    comments: {
      label: "Comments",
      color: "#f59e0b"
    },
    engagement_rate: {
      label: "Engagement Rate",
      color: "#ef4444"
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Platform Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <XAxis dataKey="platform" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar yAxisId="left" dataKey="likes" fill="var(--color-likes)" />
              <Bar yAxisId="left" dataKey="shares" fill="var(--color-shares)" />
              <Bar yAxisId="left" dataKey="comments" fill="var(--color-comments)" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="engagement_rate"
                stroke="var(--color-engagement_rate)"
                strokeWidth={3}
                dot={{ fill: "var(--color-engagement_rate)", r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
