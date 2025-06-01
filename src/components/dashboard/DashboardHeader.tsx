
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Activity, TrendingUp, Filter, BarChart as IconBarChart, LineChart, PieChart } from 'lucide-react';
import { DashboardControls } from './DashboardControls';
import { DashboardFilters } from './DashboardFilters';
import { DashboardFilters as FilterType } from '@/types/dashboard';

interface DashboardHeaderProps {
  isLive: boolean;
  filters: FilterType;
  onToggleLive: () => void;
  onRefresh: () => void;
  onFiltersChange: (filters: FilterType) => void;
  onExport: (format: 'pdf' | 'excel' | 'csv' | 'png') => void;
}

/**
 * Dashboard header with title, controls, and mobile-friendly filters
 */
export const DashboardHeader = ({
  isLive,
  filters,
  onToggleLive,
  onRefresh,
  onFiltersChange,
  onExport
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Enterprise Analytics Hub
          </h1>
          <Badge variant="outline" className="px-2 py-1 text-xs sm:px-3">
            <Activity className="h-3 w-3 mr-1" />
            Advanced
          </Badge>
        </div>
        <p className="text-sm sm:text-lg text-muted-foreground">
          Real-time data visualization platform demonstrating enterprise-grade capabilities
        </p>
        
        {/* Mobile-friendly Feature List */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <IconBarChart className="h-3 w-3 sm:h-4 sm:w-4" />
            12+ Charts
          </span>
          <span className="flex items-center gap-1">
            <LineChart className="h-3 w-3 sm:h-4 sm:w-4" />
            Real-time
          </span>
          <span className="flex items-center gap-1">
            <PieChart className="h-3 w-3 sm:h-4 sm:w-4" />
            Analytics
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
            Performance
          </span>
        </div>
      </div>
      
      {/* Mobile Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1">
          <DashboardControls
            isLive={isLive}
            onToggleLive={onToggleLive}
            onRefresh={onRefresh}
          />
        </div>
        
        {/* Mobile Filters Drawer */}
        <div className="sm:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Filters & Export
                {(filters.category.length + filters.region.length + filters.userType.length) > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.category.length + filters.region.length + filters.userType.length}
                  </Badge>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Dashboard Filters</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-4 overflow-y-auto">
                <DashboardFilters
                  filters={filters}
                  onFiltersChange={onFiltersChange}
                  onExport={onExport}
                />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
