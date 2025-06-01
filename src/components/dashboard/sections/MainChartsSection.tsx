
import { LiveChart } from '../LiveChart';
import { NotificationPanel } from '../NotificationPanel';
import { MetricData, NotificationData } from '@/types/dashboard';

interface MainChartsSectionProps {
  metrics: MetricData[];
  notifications: NotificationData[];
  isLive: boolean;
  onClearNotifications: () => void;
  onMarkNotificationAsRead: (id: string) => void;
}

/**
 * Main charts section with live metrics and notifications
 */
export const MainChartsSection = ({
  metrics,
  notifications,
  isLive,
  onClearNotifications,
  onMarkNotificationAsRead
}: MainChartsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="lg:col-span-2">
        <LiveChart data={metrics} isLive={isLive} />
      </div>
      <div className="lg:col-span-1">
        <NotificationPanel
          notifications={notifications}
          onClear={onClearNotifications}
          onMarkAsRead={onMarkNotificationAsRead}
        />
      </div>
    </div>
  );
};
