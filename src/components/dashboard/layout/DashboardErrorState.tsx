
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardErrorStateProps {
  error: string;
  onRetry: () => void;
}

/**
 * Error state component for dashboard
 */
export const DashboardErrorState = ({ error, onRetry }: DashboardErrorStateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-xl lg:text-2xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-6 text-sm lg:text-base">{error}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onRetry} size="sm" className="w-full sm:w-auto">
            Retry
          </Button>
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
