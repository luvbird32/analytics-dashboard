
import { SalesChart } from '../SalesChart';
import { TrafficChart } from '../TrafficChart';
import { SalesData, TrafficData } from '@/types/dashboard';

interface SalesTrafficSectionProps {
  salesData: SalesData[];
  trafficData: TrafficData[];
}

/**
 * Sales and traffic charts section
 */
export const SalesTrafficSection = ({
  salesData,
  trafficData
}: SalesTrafficSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div className="w-full">
        <SalesChart data={salesData} />
      </div>
      <div className="w-full">
        <TrafficChart data={trafficData} />
      </div>
    </div>
  );
};
