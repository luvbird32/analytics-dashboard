
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FilterUtils } from '@/utils/filterUtils';

interface RegionFilterProps {
  selectedRegions: string[];
  onRegionChange: (regions: string[]) => void;
}

/**
 * Region filter component for dashboard filtering
 */
export const RegionFilter = ({ selectedRegions, onRegionChange }: RegionFilterProps) => {
  const regions = ['north-america', 'europe', 'asia-pacific', 'latin-america', 'africa'];

  const handleRegionToggle = (region: string) => {
    const updatedRegions = FilterUtils.toggleFilterValue(selectedRegions, region);
    onRegionChange(updatedRegions);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Regions</Label>
      <div className="space-y-2">
        {regions.map((region) => (
          <div key={region} className="flex items-center space-x-2">
            <Checkbox
              id={region}
              checked={selectedRegions.includes(region)}
              onCheckedChange={() => handleRegionToggle(region)}
            />
            <Label htmlFor={region} className="text-sm capitalize">
              {region.replace('-', ' ')}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
