
# 🌐 Internationalization (i18n) Guide

Comprehensive internationalization implementation for the Analytics Dashboard.

## 📚 i18n Documentation

### Core i18n
- [🔧 Setup & Configuration](./setup.md)
- [📝 Translation Management](./translations.md)
- [⚛️ React Integration](./react-integration.md)
- [🎨 RTL Support](./rtl-support.md)

### Advanced Features
- [📊 Localized Charts](./charts.md)
- [📅 Date & Number Formatting](./formatting.md)
- [🧪 Testing i18n](./testing.md)

## 🌍 Supported Languages

| Language | Code | Status | RTL |
|----------|------|--------|-----|
| English | `en` | ✅ Complete | No |
| Spanish | `es` | ✅ Complete | No |
| French | `fr` | ✅ Complete | No |
| German | `de` | ✅ Complete | No |
| Japanese | `ja` | ✅ Complete | No |
| Arabic | `ar` | ✅ Complete | Yes |
| Chinese | `zh` | ✅ Complete | No |

## 🚀 Quick Start

### 1. Basic Usage

```typescript
import { useTranslation } from '@/hooks/useTranslation';

const MyComponent = () => {
  const { t, formatNumber, formatDate } = useTranslation('dashboard');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <span>{formatNumber(12345.67, 'currency')}</span>
      <span>{formatDate(new Date(), 'short')}</span>
    </div>
  );
};
```

### 2. Add Language Selector

```typescript
import LanguageSelector from '@/components/i18n/LanguageSelector';

<LanguageSelector variant="dropdown" showFlag={true} />
```

### 3. RTL Support

The system automatically detects RTL languages and applies appropriate styles:

```css
.rtl {
  direction: rtl;
}

.rtl .ml-4 {
  margin-left: 0;
  margin-right: 1rem;
}
```

## 🔧 Translation Keys Structure

```typescript
// Translation namespace structure
interface TranslationNamespace {
  common: Record<string, string>;      // Buttons, labels, etc.
  dashboard: Record<string, string>;   // Dashboard-specific text
  charts: Record<string, string>;      // Chart-related text
  forms: Record<string, string>;       // Form labels and validation
  errors: Record<string, string>;      // Error messages
  accessibility: Record<string, string>; // A11y announcements
}
```

## 📋 Translation Example

```json
{
  "dashboard": {
    "title": "Analytics Dashboard",
    "totalRevenue": "Total Revenue",
    "lastUpdated": "Last updated: {{time}}"
  }
}
```

Usage with parameters:
```typescript
const { t } = useTranslation('dashboard');
const message = t('lastUpdated', { time: '2:30 PM' });
```

## 🎯 Best Practices

1. **Namespace Organization**: Group related translations
2. **Parameter Usage**: Use `{{param}}` for dynamic content
3. **Fallback Strategy**: Always provide English fallback
4. **RTL Testing**: Test with Arabic to ensure RTL works
5. **Number Formatting**: Use locale-aware formatters

For detailed implementation, see the specific documentation files linked above.
