
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, Eye, MousePointer } from 'lucide-react';

interface UserBehaviorAnalyticsProps {
  data: {
    sessionDuration: { average: number; median: number; trend: 'up' | 'down'; change: number };
    pageViews: { total: number; unique: number; trend: 'up' | 'down'; change: number };
    bounceRate: { rate: number; trend: 'up' | 'down'; change: number };
    conversionFunnel: Array<{ stage: string; users: number; conversion: number }>;
  };
}

/**
 * User behavior analytics component
 */
export const UserBehaviorAnalytics = ({ data }: UserBehaviorAnalyticsProps) => {
  const getTrendIcon = (trend: 'up' | 'down') => 
    trend === 'up' ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Session Metrics */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Session Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Avg Session Duration</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{data.sessionDuration.average} min</span>
              {getTrendIcon(data.sessionDuration.trend)}
              <Badge variant={data.sessionDuration.trend === 'up' ? 'default' : 'destructive'}>
                {data.sessionDuration.change > 0 ? '+' : ''}{data.sessionDuration.change}%
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Bounce Rate</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{data.bounceRate.rate}%</span>
              {getTrendIcon(data.bounceRate.trend)}
              <Badge variant={data.bounceRate.trend === 'down' ? 'default' : 'destructive'}>
                {data.bounceRate.change > 0 ? '+' : ''}{data.bounceRate.change}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Views */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Page Views
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Views</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{data.pageViews.total.toLocaleString()}</span>
              {getTrendIcon(data.pageViews.trend)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Unique Views</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{data.pageViews.unique.toLocaleString()}</span>
              <Badge variant="default">
                {data.pageViews.change > 0 ? '+' : ''}{data.pageViews.change}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card className="animate-fade-in lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="h-5 w-5" />
            Conversion Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{stage.stage}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{stage.users.toLocaleString()} users</span>
                  <Badge variant="outline">{stage.conversion}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
