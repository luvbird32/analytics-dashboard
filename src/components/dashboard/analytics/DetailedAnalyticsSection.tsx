
import { BarChart3 } from 'lucide-react';
import { UserBehaviorAnalytics } from './UserBehaviorAnalytics';
import { RevenueAnalytics } from './RevenueAnalytics';
import { DetailedAnalyticsService } from '@/services/analytics/detailedAnalyticsService';

/**
 * Detailed analytics section with comprehensive metrics
 */
export const DetailedAnalyticsSection = () => {
  const analyticsData = DetailedAnalyticsService.generateComprehensiveAnalytics();

  return (
    <div className="space-y-8 lg:space-y-10">
      <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
        <BarChart3 className="h-5 w-5 lg:h-6 lg:w-6" />
        Detailed Analytics
      </h2>
      
      {/* User Behavior Analytics */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">User Behavior</h3>
        <UserBehaviorAnalytics data={analyticsData.userBehavior} />
      </div>
      
      {/* Revenue Analytics */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Revenue Analytics</h3>
        <RevenueAnalytics data={analyticsData.revenue} />
      </div>
    </div>
  );
};
