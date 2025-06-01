
import { Checkbox } from '@/components/ui/checkbox';
import { DashboardFilters } from '@/types/dashboard';
import { FilterUtils } from '@/utils/filterUtils';

interface RegionFilterProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

/**
 * Region filter component for dashboard data
 */
export const RegionFilter = ({ filters, onFiltersChange }: RegionFilterProps) => {
  const regions = [
    { id: 'north-america', label: 'North America' },
    { id: 'europe', label: 'Europe' },
    { id: 'asia-pacific', label: 'Asia Pacific' },
    { id: 'latin-america', label: 'Latin America' }
  ];

  // Ensure filters exists and has all required properties with proper defaults
  const safeFilters: DashboardFilters = {
    dateRange: filters?.dateRange || '30d',
    category: filters?.category || [],
    region: filters?.region || [],
    userType: filters?.userType || []
  };

  const currentRegions = safeFilters.region;

  const handleRegionToggle = (regionId: string) => {
    const newRegions = FilterUtils.toggleFilterValue(currentRegions, regionId);
    onFiltersChange({ ...safeFilters, region: newRegions });
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Regions</label>
      <div className="grid grid-cols-2 gap-2">
        {regions.map(region => (
          <div key={region.id} className="flex items-center space-x-2">
            <Checkbox
              id={region.id}
              checked={currentRegions.includes(region.id)}
              onCheckedChange={() => handleRegionToggle(region.id)}
            />
            <label
              htmlFor={region.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {region.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
