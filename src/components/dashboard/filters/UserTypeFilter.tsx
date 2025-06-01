
import { Checkbox } from '@/components/ui/checkbox';
import { DashboardFilters } from '@/types/dashboard';
import { FilterUtils } from '@/utils/filterUtils';

interface UserTypeFilterProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

/**
 * User type filter component for dashboard data
 */
export const UserTypeFilter = ({ filters, onFiltersChange }: UserTypeFilterProps) => {
  const userTypes = [
    { id: 'new', label: 'New Users' },
    { id: 'returning', label: 'Returning Users' },
    { id: 'premium', label: 'Premium Users' },
    { id: 'enterprise', label: 'Enterprise Users' }
  ];

  // Ensure filters exists and has all required properties with proper defaults
  const safeFilters: DashboardFilters = {
    dateRange: filters?.dateRange || '30d',
    category: filters?.category || [],
    region: filters?.region || [],
    userType: filters?.userType || []
  };

  const currentUserTypes = safeFilters.userType;

  const handleUserTypeToggle = (userTypeId: string) => {
    const newUserTypes = FilterUtils.toggleFilterValue(currentUserTypes, userTypeId);
    onFiltersChange({ ...safeFilters, userType: newUserTypes });
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">User Types</label>
      <div className="grid grid-cols-2 gap-2">
        {userTypes.map(userType => (
          <div key={userType.id} className="flex items-center space-x-2">
            <Checkbox
              id={userType.id}
              checked={currentUserTypes.includes(userType.id)}
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
