
# ⚡ Component Optimization

React component optimization strategies for better performance.

## Memoization

### React.memo

```typescript
import { memo, useMemo, useCallback } from 'react';

// ✅ Good: Memoized component with proper comparison
const OptimizedMetricCard = memo<MetricCardProps>(({
  title,
  value,
  change,
  trend,
  isLoading,
  formatValue
}) => {
  // Memoize expensive calculations
  const formattedValue = useMemo(() => {
    if (formatValue) {
      return formatValue(value);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }, [value, formatValue]);

  // Memoize trend calculation
  const trendInfo = useMemo(() => {
    if (!change) return null;
    
    return {
      color: change > 0 ? 'text-green-600' : 'text-red-600',
      icon: change > 0 ? '↗' : '↘',
      percentage: Math.abs(change).toFixed(1)
    };
  }, [change]);

  return (
    <Card className="p-6">
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        {trendInfo && (
          <div className={`text-sm ${trendInfo.color}`}>
            {trendInfo.icon} {trendInfo.percentage}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for better memoization
  return (
    prevProps.title === nextProps.title &&
    prevProps.value === nextProps.value &&
    prevProps.change === nextProps.change
  );
});
```

### useMemo and useCallback

```typescript
const ExpensiveComponent = ({ data, filters }) => {
  // Expensive calculation
  const processedData = useMemo(() => {
    return data
      .filter(item => applyFilters(item, filters))
      .map(item => transformDataPoint(item))
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [data, filters]);

  // Stable callback
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onClick={handleClick} />
      ))}
    </div>
  );
};
```

## Virtual Scrolling

```typescript
import { FixedSizeGrid as Grid } from 'react-window';

const VirtualizedDataGrid: React.FC<VirtualizedDataGridProps> = ({
  data,
  columns,
  height,
  width,
  rowHeight = 50,
  columnWidth = 150
}) => {
  const gridData = useMemo(() => {
    return [columns, ...data];
  }, [columns, data]);

  return (
    <Grid
      columnCount={columns.length}
      columnWidth={columnWidth}
      height={height}
      rowCount={gridData.length}
      rowHeight={rowHeight}
      width={width}
      itemData={gridData}
    >
      {Cell}
    </Grid>
  );
};
```

## Render Optimization

```typescript
const useRenderOptimization = (componentName: string) => {
  const renderStartRef = useRef<number>();

  const trackRenderStart = useCallback(() => {
    renderStartRef.current = performance.now();
  }, []);

  const trackRenderEnd = useCallback(() => {
    if (renderStartRef.current) {
      const renderTime = performance.now() - renderStartRef.current;
      
      if (renderTime > 16) { // 60fps threshold
        console.warn(`${componentName} render: ${renderTime.toFixed(2)}ms`);
      }
    }
  }, [componentName]);

  return { trackRenderStart, trackRenderEnd };
};
```

## Lazy Loading Components

```typescript
import { Suspense } from 'react';

const LazyChart = lazy(() => import('./ComplexChart'));

const ChartContainer = ({ data }) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyChart data={data} />
  </Suspense>
);
```

## Debounced Input

```typescript
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const SearchFilter = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
};
```
