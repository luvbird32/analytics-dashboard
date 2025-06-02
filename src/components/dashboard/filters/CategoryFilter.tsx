
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FilterUtils } from '@/utils/filterUtils';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

/**
 * Category filter component for dashboard filtering
 */
export const CategoryFilter = ({ selectedCategories, onCategoryChange }: CategoryFilterProps) => {
  const categories = ['revenue', 'growth', 'marketing', 'sales', 'analytics'];

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = FilterUtils.toggleFilterValue(selectedCategories, category);
    onCategoryChange(updatedCategories);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Categories</Label>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryToggle(category)}
            />
            <Label htmlFor={category} className="text-sm capitalize">
              {category}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
