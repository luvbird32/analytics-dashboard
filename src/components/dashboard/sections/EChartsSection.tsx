
import React from 'react';
import { Globe } from 'lucide-react';
import { GeographicHeatMap } from '../charts/GeographicHeatMap';
import { BrushChart } from '../charts/BrushChart';
import { Surface3DChart } from '../charts/Surface3DChart';
import { EChartsDataService } from '@/services/charts/echartsDataService';

/**
 * ECharts advanced visualization section
 */
export const EChartsSection = () => {
  const geographicData = EChartsDataService.generateGeographicData();
  const brushData = EChartsDataService.generateBrushData();
  const surface3DData = EChartsDataService.generateSurface3DData();

  return (
    <div className="space-y-8 lg:space-y-10">
      <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
        <Globe className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
        Advanced Analytics (ECharts)
      </h2>
      
      {/* Geographic Heat Map - Full Width Row */}
      <div className="w-full">
        <GeographicHeatMap data={geographicData} />
      </div>
      
      {/* Interactive Brush Chart - Full Width Row */}
      <div className="w-full">
        <BrushChart data={brushData} />
      </div>
      
      {/* 3D Surface Chart - Full Width Row */}
      <div className="w-full">
        <Surface3DChart data={surface3DData} />
      </div>
    </div>
  );
};
