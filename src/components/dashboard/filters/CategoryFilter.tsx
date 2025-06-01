
import { Checkbox } from '@/components/ui/checkbox';
import { DashboardFilters } from '@/types/dashboard';
import { FilterUtils } from '@/utils/filterUtils';

interface CategoryFilterProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

/**
 * Category filter component for dashboard metrics
 */
export const CategoryFilter = ({ filters, onFiltersChange }: CategoryFilterProps) => {
  const categories = [
    { id: 'revenue', label: 'Revenue' },
    { id: 'users', label: 'Users' },
    { id: 'performance', label: 'Performance' },
    { id: 'conversion', label: 'Conversion' }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = FilterUtils.toggleFilterValue(filters.category, categoryId);
    onFiltersChange({ ...filters, category: newCategories });
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Categories</label>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              checked={filters.category.includes(category.id)}
              onCheckedChange={() => handleCategoryToggle(category.id)}
            />
            <label
              htmlFor={category.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
