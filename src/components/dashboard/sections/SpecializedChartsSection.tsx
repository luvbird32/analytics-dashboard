
import { TrendingUp } from 'lucide-react';
import { TreemapChart } from '../charts/TreemapChart';
import { ScatterChart } from '../charts/ScatterChart';
import { FunnelChart } from '../charts/FunnelChart';
import { GaugeChart } from '../charts/GaugeChart';
import { DonutChart } from '../charts/DonutChart';
import { BarChart } from '../charts/BarChart';
import {
  TreemapData,
  ScatterData,
  FunnelData,
  GaugeData,
  DonutData,
  BarData
} from '@/types/dashboard';

interface SpecializedChartsSectionProps {
  treemapData: TreemapData[];
  scatterData: ScatterData[];
  funnelData: FunnelData[];
  gaugeData: GaugeData[];
  donutData: DonutData[];
  barData: BarData[];
}

/**
 * Specialized visualizations section
 */
export const SpecializedChartsSection = ({
  treemapData,
  scatterData,
  funnelData,
  gaugeData,
  donutData,
  barData
}: SpecializedChartsSectionProps) => {
  return (
    <div className="space-y-8 lg:space-y-10">
      <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
        <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6" />
        Specialized Visualizations
      </h2>
      
      {/* First Row - 3 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="w-full">
          <TreemapChart data={treemapData} />
        </div>
        <div className="w-full">
          <ScatterChart data={scatterData} />
        </div>
        <div className="w-full">
          <FunnelChart data={funnelData} />
        </div>
      </div>
      
      {/* Second Row - 3 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="w-full">
          <GaugeChart data={gaugeData} />
        </div>
        <div className="w-full">
          <DonutChart data={donutData} />
        </div>
        <div className="w-full">
          <BarChart data={barData} />
        </div>
      </div>
    </div>
  );
};
