
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
 * Dashboard header with consistent spacing and typography
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
    <div className="space-y-6">
      {/* Main Title Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Enterprise Analytics Hub
          </h1>
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            <Activity className="h-4 w-4 mr-2" />
            Advanced
          </Badge>
        </div>
        
        <p className="text-base lg:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Real-time data visualization platform demonstrating enterprise-grade capabilities
        </p>
        
        {/* Feature Highlights */}
        <div className="hidden lg:flex items-center gap-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <IconBarChart className="h-4 w-4" />
            12+ Advanced Charts
          </span>
          <span className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Real-time Updates
          </span>
          <span className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Interactive Analytics
          </span>
          <span className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance Monitoring
          </span>
        </div>

        {/* Mobile Feature Grid */}
        <div className="grid grid-cols-2 gap-3 lg:hidden text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <IconBarChart className="h-4 w-4" />
            12+ Charts
          </span>
          <span className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Real-time
          </span>
          <span className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Analytics
          </span>
          <span className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance
          </span>
        </div>
      </div>
      
      {/* Controls Section */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
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
              <Button variant="outline" className="w-full h-10">
                <Filter className="h-4 w-4 mr-2" />
                Filters & Export
                {(filters.category.length + filters.region.length + filters.userType.length) > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filters.category.length + filters.region.length + filters.userType.length}
                  </Badge>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle className="text-lg font-semibold">Dashboard Filters</DrawerTitle>
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
