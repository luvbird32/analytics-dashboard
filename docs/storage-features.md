
# 💾 Storage Features

Learn about the comprehensive storage capabilities of the Analytics Dashboard.

## 🏗️ Three-Tier Storage Architecture

### Tier 1: localStorage (Simple Preferences)
- **Library**: `use-local-storage-state`
- **Use Cases**: UI preferences, filter settings, theme selection
- **Capacity**: ~5-10MB per origin
- **Persistence**: Until manually cleared

```typescript
// Example: Theme preference
const [theme, setTheme] = useLocalStorageState('dashboard-theme', {
  defaultValue: 'light'
});
```

### Tier 2: IndexedDB (Structured Data)
- **Library**: `idb` (Promise-based wrapper)
- **Use Cases**: Chart data caching, large datasets, complex queries
- **Capacity**: ~250MB+ (browser dependent)
- **Persistence**: Persistent until quota exceeded

```typescript
// Example: Chart data caching
const saveChartData = async (chartId: string, data: ChartData) => {
  const db = await openDB('charts', 1);
  await db.put('chartData', { 
    id: chartId, 
    data, 
    timestamp: Date.now() 
  });
};
```

### Tier 3: Unified Storage (Cross-Browser)
- **Library**: `localforage`
- **Use Cases**: Automatic driver selection, progressive enhancement
- **Features**: Falls back gracefully across storage types
- **Compatibility**: IndexedDB → localStorage → WebSQL

```typescript
// Example: Unified storage with automatic fallback
import localforage from 'localforage';

// Automatically uses best available storage
await localforage.setItem('user-data', complexObject);
const data = await localforage.getItem('user-data');
```

## 🎯 Storage Use Cases

### User Preferences
- **Theme Selection**: Dark/light mode preference
- **Language Settings**: Internationalization preferences
- **Dashboard Layout**: Panel positions, collapsed states
- **Notification Settings**: Alert preferences, sound settings

### Filter Persistence
- **Date Ranges**: Remember selected time periods
- **Category Filters**: Persist selected categories
- **Region Filters**: Geographic filter settings
- **User Type Filters**: Segment filter preferences

### Chart Data Caching
- **Historical Data**: Cache time series for offline viewing
- **Generated Reports**: Store computed analytics
- **Export Settings**: Remember export format preferences
- **View Configurations**: Chart zoom levels, selected series

### Offline Functionality
- **Data Availability**: Access cached data without internet
- **Progressive Sync**: Update cached data when online
- **Conflict Resolution**: Handle data conflicts intelligently
- **Storage Optimization**: Manage storage quota efficiently

## 🔧 Implementation Patterns

### Intelligent Caching Strategy
```typescript
const useChartCache = () => {
  const saveWithExpiry = async (key: string, data: any, ttl: number) => {
    const item = {
      data,
      timestamp: Date.now(),
      ttl,
      version: '1.0'
    };
    await localforage.setItem(key, item);
  };

  const getWithExpiry = async (key: string) => {
    const item = await localforage.getItem(key);
    
    if (!item || Date.now() - item.timestamp > item.ttl) {
      await localforage.removeItem(key);
      return null;
    }
    
    return item.data;
  };

  return { saveWithExpiry, getWithExpiry };
};
```

### Storage Quota Management
```typescript
const useStorageQuota = () => {
  const checkQuota = async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        used: estimate.usage || 0,
        available: estimate.quota || 0,
        percentage: ((estimate.usage || 0) / (estimate.quota || 1)) * 100
      };
    }
    return { used: 0, available: 0, percentage: 0 };
  };

  const clearExpiredData = async () => {
    const keys = await localforage.keys();
    const now = Date.now();
    
    for (const key of keys) {
      const item = await localforage.getItem(key);
      if (item?.timestamp && now - item.timestamp > item.ttl) {
        await localforage.removeItem(key);
      }
    }
  };

  return { checkQuota, clearExpiredData };
};
```

## 📊 Storage Monitoring

### Usage Analytics
- Track storage usage patterns
- Monitor cache hit/miss ratios
- Analyze storage performance impact
- Identify optimization opportunities

### Quota Warnings
- Alert users when approaching storage limits
- Suggest cleanup actions
- Provide storage usage breakdown
- Offer data export before cleanup

### Performance Metrics
- Measure read/write operation times
- Track storage operation success rates
- Monitor storage-related errors
- Analyze impact on app performance

## 🔒 Security & Privacy

### Data Sanitization
```typescript
const sanitizeStorageData = (data: any): any => {
  // Remove sensitive information
  const { 
    password, 
    apiKey, 
    personalInfo, 
    ...safeData 
  } = data;
  
  return safeData;
};
```

### Privacy Compliance
- No personal data stored without consent
- Clear data retention policies
- User-controlled data deletion
- Transparent data usage disclosure

### Security Measures
- Client-side encryption for sensitive data
- Regular cache cleanup routines
- Secure data validation before storage
- Protection against storage injection attacks

## 🛠️ Debugging Storage Issues

### Debug Tools
```typescript
const debugStorage = async () => {
  console.log('localStorage available:', typeof Storage !== 'undefined');
  console.log('IndexedDB available:', 'indexedDB' in window);
  console.log('Current localforage driver:', localforage.driver());
  
  // Test storage operations
  try {
    await localforage.setItem('test', 'value');
    const result = await localforage.getItem('test');
    console.log('Storage test:', result === 'value' ? 'PASS' : 'FAIL');
    await localforage.removeItem('test');
  } catch (error) {
    console.error('Storage test failed:', error);
  }
};
```

### Common Issues & Solutions

**Storage Not Working**
1. Check browser compatibility
2. Verify available storage quota
3. Clear corrupted data
4. Fallback to alternative storage

**Performance Issues**
1. Implement batch operations
2. Use appropriate storage tier
3. Cache frequently accessed data
4. Optimize data serialization

**Data Loss**
1. Implement data versioning
2. Use redundant storage strategies
3. Regular backup mechanisms
4. User data export functionality

The storage system provides robust, scalable data persistence that enhances user experience while maintaining performance and security standards.
