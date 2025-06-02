
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FilterUtils } from '@/utils/filterUtils';

interface UserTypeFilterProps {
  selectedUserTypes: string[];
  onUserTypeChange: (userTypes: string[]) => void;
}

/**
 * User type filter component for dashboard filtering
 */
export const UserTypeFilter = ({ selectedUserTypes, onUserTypeChange }: UserTypeFilterProps) => {
  const userTypes = ['premium', 'standard', 'trial', 'enterprise'];

  const handleUserTypeToggle = (userType: string) => {
    const updatedUserTypes = FilterUtils.toggleFilterValue(selectedUserTypes, userType);
    onUserTypeChange(updatedUserTypes);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">User Types</Label>
      <div className="space-y-2">
        {userTypes.map((userType) => (
          <div key={userType} className="flex items-center space-x-2">
            <Checkbox
              id={userType}
              checked={selectedUserTypes.includes(userType)}
              onCheckedChange={() => handleUserTypeToggle(userType)}
            />
            <Label htmlFor={userType} className="text-sm capitalize">
              {userType}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
