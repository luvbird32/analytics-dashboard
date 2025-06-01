
import { render, screen } from '@/test/utils/testUtils';
import { DashboardFooter } from '../DashboardFooter';
import { mockMetrics, mockPerformanceMetrics, mockNotifications } from '@/test/mocks/mockData';

const mockFilters = {
  dateRange: '30d' as const,
  category: ['revenue'],
  region: ['us'],
  userType: ['premium']
};

describe('DashboardFooter', () => {
  it('displays metrics count correctly', () => {
    render(
      <DashboardFooter
        metrics={mockMetrics}
        performanceMetrics={mockPerformanceMetrics}
        notifications={mockNotifications}
        filters={mockFilters}
        isLive={false}
      />
    );
    
    expect(screen.getByText('2')).toBeInTheDocument(); // metrics length
    expect(screen.getByText('Data Points')).toBeInTheDocument();
  });

  it('displays active filters count', () => {
    render(
      <DashboardFooter
        metrics={mockMetrics}
        performanceMetrics={mockPerformanceMetrics}
        notifications={mockNotifications}
        filters={mockFilters}
        isLive={false}
      />
    );
    
    expect(screen.getByText('3')).toBeInTheDocument(); // active filters count
    expect(screen.getByText('Active Filters')).toBeInTheDocument();
  });

  it('shows live update interval when live', () => {
    render(
      <DashboardFooter
        metrics={mockMetrics}
        performanceMetrics={mockPerformanceMetrics}
        notifications={mockNotifications}
        filters={mockFilters}
        isLive={true}
      />
    );
    
    expect(screen.getByText('1.5s')).toBeInTheDocument();
  });

  it('shows paused when not live', () => {
    render(
      <DashboardFooter
        metrics={mockMetrics}
        performanceMetrics={mockPerformanceMetrics}
        notifications={mockNotifications}
        filters={mockFilters}
        isLive={false}
      />
    );
    
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });
});
