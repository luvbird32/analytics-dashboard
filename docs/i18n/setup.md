# 🔧 i18n Setup & Configuration

Setup and configuration guide for internationalization.

## Service Configuration

```typescript
// src/services/i18n/i18nService.ts
interface LocaleConfig {
  locale: string;
  name: string;
  nativeName: string;
  rtl: boolean;
  dateFormat: string;
  numberFormat: Intl.NumberFormatOptions;
  currencyFormat: Intl.NumberFormatOptions;
}

class InternationalizationService {
  private currentLocale: string = 'en';
  private fallbackLocale: string = 'en';
  private translations: TranslationResources = {};

  private readonly supportedLocales: LocaleConfig[] = [
    {
      locale: 'en',
      name: 'English',
      nativeName: 'English',
      rtl: false,
      dateFormat: 'MM/dd/yyyy',
      numberFormat: { notation: 'standard' },
      currencyFormat: { style: 'currency', currency: 'USD' }
    },
    {
      locale: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      rtl: false,
      dateFormat: 'dd/MM/yyyy',
      numberFormat: { notation: 'standard' },
      currencyFormat: { style: 'currency', currency: 'EUR' }
    },
    // ... other locales
  ];

  async changeLocale(locale: string): Promise<void> {
    if (!this.supportedLocales.some(config => config.locale === locale)) {
      throw new Error(`Unsupported locale: ${locale}`);
    }

    this.currentLocale = locale;
    localStorage.setItem('dashboard-locale', locale);
    
    await this.loadTranslations(locale);
    this.applyLocaleSettings();
    
    // Trigger re-render
    window.dispatchEvent(new CustomEvent('localeChanged', { detail: { locale } }));
  }

  translate(
    namespace: keyof TranslationNamespace,
    key: string,
    params?: Record<string, string | number>
  ): string {
    const translations = this.translations[this.currentLocale] || 
                        this.translations[this.fallbackLocale];
    
    let translation = translations?.[namespace]?.[key];
    
    if (!translation) {
      console.warn(`Translation missing: ${namespace}.${key}`);
      return key;
    }

    // Replace parameters
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(
          new RegExp(`{{${param}}}`, 'g'), 
          String(value)
        );
      });
    }

    return translation;
  }

  formatNumber(value: number, type: 'number' | 'currency' | 'percentage' = 'number'): string {
    const config = this.getLocaleConfig();
    const options = type === 'currency' ? config.currencyFormat : 
                   type === 'percentage' ? { style: 'percent' } : 
                   config.numberFormat;

    return new Intl.NumberFormat(this.currentLocale, options).format(value);
  }

  formatDate(date: Date, format: 'short' | 'long' | 'time' = 'short'): string {
    const options = {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
      time: { hour: '2-digit', minute: '2-digit', second: '2-digit' }
    }[format];

    return new Intl.DateTimeFormat(this.currentLocale, options).format(date);
  }
}

export const i18nService = new InternationalizationService();
```

## Environment Setup

```bash
# Environment variables for i18n
VITE_DEFAULT_LOCALE=en
VITE_FALLBACK_LOCALE=en
VITE_SUPPORTED_LOCALES=en,es,fr,de,ja,ar,zh
VITE_ENABLE_RTL=true
```

## File Structure

```
src/
├── services/
│   └── i18n/
│       ├── i18nService.ts
│       └── translations/
│           ├── en.json
│           ├── es.json
│           ├── fr.json
│           └── ...
├── hooks/
│   └── useTranslation.ts
└── components/
    └── i18n/
        └── LanguageSelector.tsx
```

## Browser Language Detection

```typescript
private detectBrowserLanguage(): string {
  const languages = navigator.languages || [navigator.language];
  
  for (const lang of languages) {
    const locale = lang.split('-')[0]; // Get base language
    if (this.supportedLocales.some(config => config.locale === locale)) {
      return locale;
    }
  }
  
  return this.fallbackLocale;
}
```

## Locale Persistence

```typescript
// Save user preference
localStorage.setItem('dashboard-locale', locale);

// Load on startup
const savedLanguage = localStorage.getItem('dashboard-locale');
const browserLanguage = this.detectBrowserLanguage();

this.currentLocale = savedLanguage || browserLanguage || this.fallbackLocale;
```
