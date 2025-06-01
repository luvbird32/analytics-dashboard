
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, RefreshCw } from 'lucide-react';

interface RevenueAnalyticsProps {
  data: {
    totalRevenue: number;
    revenueGrowth: number;
    averageOrderValue: number;
    customerLifetimeValue: number;
    monthlyRecurringRevenue: number;
    churnRate: number;
    revenueBySource: Array<{ source: string; revenue: number; percentage: number }>;
  };
}

/**
 * Revenue analytics component
 */
export const RevenueAnalytics = ({ data }: RevenueAnalyticsProps) => {
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))"
    }
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff88'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Key Revenue Metrics */}
      <Card className="animate-fade-in lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Revenue Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <Badge variant="default" className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +{data.revenueGrowth}%
                </Badge>
              </div>
              <p className="text-2xl font-bold">${data.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Average Order Value</span>
              <p className="text-2xl font-bold">${data.averageOrderValue}</p>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Customer Lifetime Value</span>
              <p className="text-2xl font-bold">${data.customerLifetimeValue}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Monthly Recurring Revenue</span>
                <RefreshCw className="h-3 w-3 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">${data.monthlyRecurringRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Churn Rate</span>
              <Badge variant="destructive">{data.churnRate}%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Source */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-base">Revenue Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.revenueBySource}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="revenue"
                  label={({ percentage }) => `${percentage}%`}
                >
                  {data.revenueBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 space-y-2">
            {data.revenueBySource.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{source.source}</span>
                </div>
                <span className="font-medium">${source.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
