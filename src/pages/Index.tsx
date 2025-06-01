
import React from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { LoadingProvider } from '@/components/LoadingProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

/**
 * Enterprise-Grade Real-time Analytics Dashboard
 * Clean architecture with proper provider hierarchy
 */
const Index = () => {
  return (
    <ErrorBoundary>
      <DashboardProvider>
        <LoadingProvider>
          <DashboardContent />
        </LoadingProvider>
      </DashboardProvider>
    </ErrorBoundary>
  );
};

export default Index;
