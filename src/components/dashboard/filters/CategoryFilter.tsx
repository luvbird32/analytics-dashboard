
import { Checkbox } from '@/components/ui/checkbox';
import { DashboardFilters } from '@/types/dashboard';
import { FilterUtils } from '@/utils/filterUtils';

interface CategoryFilterProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

/**
 * Category filter component for dashboard data
 */
export const CategoryFilter = ({ filters, onFiltersChange }: CategoryFilterProps) => {
  console.log('CategoryFilter - received filters:', filters);
  console.log('CategoryFilter - filters type:', typeof filters);
  console.log('CategoryFilter - filters keys:', filters ? Object.keys(filters) : 'filters is null/undefined');

  const categories = [
    { id: 'revenue', label: 'Revenue' },
    { id: 'users', label: 'Users' },
    { id: 'performance', label: 'Performance' },
    { id: 'conversion', label: 'Conversion' }
  ];

  // Ensure filters exists and has all required properties with proper defaults
  const safeFilters: DashboardFilters = {
    dateRange: filters?.dateRange || '30d',
    category: filters?.category || [],
    region: filters?.region || [],
    userType: filters?.userType || []
  };

  console.log('CategoryFilter - safeFilters:', safeFilters);

  const currentCategories = safeFilters.category;

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = FilterUtils.toggleFilterValue(currentCategories, categoryId);
    onFiltersChange({ ...safeFilters, category: newCategories });
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Categories</label>
      <div className="grid grid-cols-2 gap-2">
        {categories.map(category => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              checked={currentCategories.includes(category.id)}
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
