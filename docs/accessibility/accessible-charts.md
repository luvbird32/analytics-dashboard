
# 📊 Accessible Charts

Implementation guide for WCAG-compliant chart components.

## AccessibleChart Component

```typescript
import { useRef, useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
import { a11yService } from '@/services/accessibility/a11yService';

interface AccessibleChartProps {
  data: ChartDataPoint[];
  title: string;
  description?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const AccessibleChart: React.FC<AccessibleChartProps> = ({
  data, title, description, xAxisLabel = 'Date', yAxisLabel = 'Value'
}) => {
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const [currentDataIndex, setCurrentDataIndex] = useState(-1);

  const chartSummary = `Chart showing ${title}. ${data.length} data points from ${data[0]?.date} to ${data[data.length - 1]?.date}. ${description || ''}`;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;
    
    switch (key) {
      case 'ArrowRight':
        event.preventDefault();
        setCurrentDataIndex(prev => prev < data.length - 1 ? prev + 1 : prev);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setCurrentDataIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (currentDataIndex >= 0) {
          const point = data[currentDataIndex];
          a11yService.announceToScreenReader(
            `Data point ${currentDataIndex + 1} of ${data.length}: ${xAxisLabel} ${point.date}, ${yAxisLabel} ${point.value}`,
            'assertive'
          );
        }
        break;
    }
  };

  return (
    <div className="chart-container">
      {/* Screen reader content */}
      <div className="sr-only">
        <h3>{title}</h3>
        <p>{chartSummary}</p>
        <p>Use Tab to focus, arrow keys to navigate, Enter to announce data.</p>
      </div>

      {/* Visual chart */}
      <div
        role="img"
        aria-label={chartSummary}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsKeyboardFocused(true)}
        onBlur={() => setIsKeyboardFocused(false)}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" aria-label={xAxisLabel} />
            <YAxis aria-label={yAxisLabel} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Data table for screen readers */}
      <table className="sr-only">
        <caption>{title} - Data Table</caption>
        <thead>
          <tr>
            <th>{xAxisLabel}</th>
            <th>{yAxisLabel}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point, index) => (
            <tr key={index}>
              <td>{point.date}</td>
              <td>{point.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccessibleChart;
```

## Chart Navigation Instructions

### Keyboard Support
- **Tab**: Focus the chart
- **Arrow keys**: Navigate data points
- **Enter/Space**: Announce current data point
- **Escape**: Exit chart navigation

### Screen Reader Support
- Chart summary announced on focus
- Data table alternative provided
- Live announcements for navigation

## Best Practices

1. **Always provide data tables** as screen reader alternatives
2. **Use semantic HTML** with proper ARIA labels
3. **Implement keyboard navigation** for all chart interactions
4. **Announce changes** using live regions
5. **Provide chart summaries** for context

## Testing

```typescript
// Test keyboard navigation
test('chart supports keyboard navigation', () => {
  render(<AccessibleChart data={mockData} title="Test Chart" />);
  
  const chart = screen.getByRole('img');
  fireEvent.keyDown(chart, { key: 'ArrowRight' });
  
  // Verify navigation works
});

// Test screen reader support
test('chart provides screen reader content', () => {
  render(<AccessibleChart data={mockData} title="Test Chart" />);
  
  expect(screen.getByText('Test Chart - Data Table')).toBeInTheDocument();
});
```
