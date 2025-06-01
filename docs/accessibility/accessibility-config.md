
# 🔧 Accessibility Configuration

Core accessibility service configuration and setup.

## Setup

### Service Installation

```typescript
// src/services/accessibility/a11yService.ts
import { AccessibilityService } from './AccessibilityService';

export const a11yService = new AccessibilityService({
  level: 'AA', // WCAG 2.1 AA compliance
  features: {
    keyboardNavigation: true,
    screenReaderSupport: true,
    highContrast: true,
    reducedMotion: true,
    focusManagement: true
  }
});
```

### Environment Variables

```env
# Accessibility features
VITE_ENABLE_A11Y=true
VITE_A11Y_TESTING=true
VITE_A11Y_ANNOUNCEMENTS=true
VITE_A11Y_SKIP_LINKS=true
```

## Core Service

```typescript
interface AccessibilityConfig {
  level: 'A' | 'AA' | 'AAA';
  features: AccessibilityFeatures;
  testing: A11yTestingConfig;
}

interface AccessibilityFeatures {
  keyboardNavigation: boolean;
  screenReaderSupport: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  focusManagement: boolean;
  skipLinks: boolean;
  liveRegions: boolean;
  colorIndependence: boolean;
}

class AccessibilityService {
  private config: AccessibilityConfig;
  private violations: A11yViolation[] = [];

  constructor(config: Partial<AccessibilityConfig> = {}) {
    this.config = this.mergeConfig(config);
    this.initialize();
  }

  private initialize(): void {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.setupReducedMotion();
    this.setupHighContrast();
  }

  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = this.getAnnouncer();
    announcer.setAttribute('aria-live', priority);
    announcer.textContent = message;
    
    setTimeout(() => announcer.textContent = '', 1000);
  }

  private getAnnouncer(): HTMLElement {
    let announcer = document.getElementById('a11y-announcer');
    
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'a11y-announcer';
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }
    
    return announcer;
  }
}
```

## CSS Setup

```css
/* Screen reader only styles */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:focus,
.sr-only-focusable:active {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: inherit;
}

/* High contrast support */
@media (prefers-contrast: high) {
  .high-contrast {
    filter: contrast(150%);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .reduce-motion *,
  .reduce-motion *::before,
  .reduce-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus indicators */
.keyboard-navigation *:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

## Skip Links

```typescript
const createSkipLinks = () => {
  const skipContainer = document.createElement('div');
  skipContainer.className = 'skip-links';
  
  const links = [
    { href: '#main-content', text: 'Skip to main content' },
    { href: '#navigation', text: 'Skip to navigation' },
    { href: '#search', text: 'Skip to search' }
  ];

  links.forEach(({ href, text }) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    link.className = 'skip-link sr-only-focusable';
    skipContainer.appendChild(link);
  });

  document.body.insertBefore(skipContainer, document.body.firstChild);
};
```
