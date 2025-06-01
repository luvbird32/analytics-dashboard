
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface DashboardControlsProps {
  isLive: boolean;
  onToggleLive: () => void;
  onRefresh: () => void;
}

/**
 * Control panel for dashboard real-time features
 */
export const DashboardControls = ({ isLive, onToggleLive, onRefresh }: DashboardControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={onToggleLive}
        variant={isLive ? "destructive" : "default"}
        size="sm"
        className="flex items-center gap-2"
      >
        {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {isLive ? 'Stop Live' : 'Start Live'}
      </Button>
      <Button
        onClick={onRefresh}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Refresh
      </Button>
    </div>
  );
};
