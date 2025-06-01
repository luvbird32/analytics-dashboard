
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
 * Dashboard header optimized for desktop experience
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
    <div className="space-y-4 lg:space-y-6">
      <div className="space-y-3 lg:space-y-4">
        <div className="flex items-center gap-3 lg:gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Enterprise Analytics Hub
          </h1>
          <Badge variant="outline" className="px-2 py-1 text-xs lg:px-3 lg:text-sm">
            <Activity className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
            Advanced
          </Badge>
        </div>
        
        <p className="text-sm lg:text-lg xl:text-xl text-muted-foreground max-w-4xl">
          Real-time data visualization platform demonstrating enterprise-grade capabilities
        </p>
        
        {/* Desktop Feature List */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base text-muted-foreground">
          <span className="flex items-center gap-2">
            <IconBarChart className="h-4 w-4 xl:h-5 xl:w-5" />
            12+ Advanced Charts
          </span>
          <span className="flex items-center gap-2">
            <LineChart className="h-4 w-4 xl:h-5 xl:w-5" />
            Real-time Updates
          </span>
          <span className="flex items-center gap-2">
            <PieChart className="h-4 w-4 xl:h-5 xl:w-5" />
            Interactive Analytics
          </span>
          <span className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 xl:h-5 xl:w-5" />
            Performance Monitoring
          </span>
        </div>

        {/* Mobile Feature List */}
        <div className="grid grid-cols-2 gap-2 lg:hidden text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <IconBarChart className="h-3 w-3" />
            12+ Charts
          </span>
          <span className="flex items-center gap-1">
            <LineChart className="h-3 w-3" />
            Real-time
          </span>
          <span className="flex items-center gap-1">
            <PieChart className="h-3 w-3" />
            Analytics
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Performance
          </span>
        </div>
      </div>
      
      {/* Controls Section */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
        <div className="flex-1">
          <DashboardControls
            isLive={isLive}
            onToggleLive={onToggleLive}
            onRefresh={onRefresh}
          />
        </div>
        
        {/* Mobile Filters Drawer */}
        <div className="lg:hidden">
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
