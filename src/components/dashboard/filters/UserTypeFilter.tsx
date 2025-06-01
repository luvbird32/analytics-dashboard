
import { Checkbox } from '@/components/ui/checkbox';
import { DashboardFilters } from '@/types/dashboard';
import { FilterUtils } from '@/utils/filterUtils';

interface UserTypeFilterProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

/**
 * User type filter component for dashboard analytics
 */
export const UserTypeFilter = ({ filters, onFiltersChange }: UserTypeFilterProps) => {
  const userTypes = [
    { id: 'premium', label: 'Premium' },
    { id: 'standard', label: 'Standard' },
    { id: 'trial', label: 'Trial' }
  ];

  const handleUserTypeToggle = (userTypeId: string) => {
    const newUserTypes = FilterUtils.toggleFilterValue(filters.userType, userTypeId);
    onFiltersChange({ ...filters, userType: newUserTypes });
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">User Types</label>
      <div className="flex flex-wrap gap-2">
        {userTypes.map(userType => (
          <div key={userType.id} className="flex items-center space-x-2">
            <Checkbox
              id={userType.id}
              checked={filters.userType.includes(userType.id)}
              onCheckedChange={() => handleUserTypeToggle(userType.id)}
            />
            <label
              htmlFor={userType.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {userType.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
