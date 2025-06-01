
import { Activity } from 'lucide-react';
import { AreaChart } from '../AreaChart';
import { RadarChart } from '../RadarChart';
import { SankeyChart } from '../charts/SankeyChart';
import { AreaData, RadarData, SankeyData } from '@/types/dashboard';

interface AdvancedAnalyticsSectionProps {
  areaData: AreaData[];
  radarData: RadarData[];
  sankeyData: SankeyData;
}

/**
 * Advanced analytics section with separate rows for better visual experience
 */
export const AdvancedAnalyticsSection = ({
  areaData,
  radarData,
  sankeyData
}: AdvancedAnalyticsSectionProps) => {
  return (
    <div className="space-y-8 lg:space-y-10">
      <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
        <Activity className="h-5 w-5 lg:h-6 lg:w-6" />
        Advanced Analytics
      </h2>
      
      {/* Area Chart - Full Width Row */}
      <div className="w-full">
        <AreaChart data={areaData} />
      </div>
      
      {/* Radar Chart - Full Width Row */}
      <div className="w-full">
        <RadarChart data={radarData} />
      </div>
      
      {/* Sankey Chart - Full Width Row */}
      <div className="w-full">
        <SankeyChart data={sankeyData} />
      </div>
    </div>
  );
};
