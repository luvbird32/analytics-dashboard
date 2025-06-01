
# ⌨️ Keyboard Navigation

Complete keyboard accessibility implementation guide.

## Global Keyboard Handler

```typescript
class KeyboardNavigationService {
  private focusableElements: HTMLElement[] = [];

  constructor() {
    this.setupGlobalHandlers();
    this.createSkipLinks();
  }

  private setupGlobalHandlers(): void {
    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
    document.addEventListener('keydown', this.trackKeyboardUsage.bind(this));
  }

  private handleGlobalKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab':
        this.handleTabNavigation(event);
        break;
      case 'Escape':
        this.handleEscapeKey(event);
        break;
      case 'Enter':
      case ' ':
        this.handleActivation(event);
        break;
    }
  }

  private handleTabNavigation(event: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements();
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    
    if (event.shiftKey) {
      // Shift+Tab (previous)
      if (currentIndex <= 0) {
        focusableElements[focusableElements.length - 1]?.focus();
        event.preventDefault();
      }
    } else {
      // Tab (next)
      if (currentIndex >= focusableElements.length - 1) {
        focusableElements[0]?.focus();
        event.preventDefault();
      }
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const selector = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]:not([aria-disabled="true"])'
    ].join(', ');

    return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  }

  private trackKeyboardUsage(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  }
}
```

## Focus Management Hook

```typescript
import { useRef, useEffect } from 'react';

export const useFocusManagement = (isVisible: boolean) => {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      // Store current focus
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus first element in container
      const firstFocusable = containerRef.current?.querySelector(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (firstFocusable) {
        firstFocusable.focus();
      }
    } else {
      // Restore previous focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isVisible]);

  return containerRef;
};
```

## Roving Tabindex Pattern

```typescript
export const useRovingTabindex = (items: HTMLElement[], orientation: 'horizontal' | 'vertical' = 'horizontal') => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    items.forEach((item, index) => {
      item.tabIndex = index === currentIndex ? 0 : -1;
    });
  }, [items, currentIndex]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    let newIndex = currentIndex;

    if (orientation === 'horizontal') {
      if (key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % items.length;
        event.preventDefault();
      } else if (key === 'ArrowLeft') {
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        event.preventDefault();
      }
    } else {
      if (key === 'ArrowDown') {
        newIndex = (currentIndex + 1) % items.length;
        event.preventDefault();
      } else if (key === 'ArrowUp') {
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        event.preventDefault();
      }
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      items[newIndex]?.focus();
    }
  };

  return { currentIndex, handleKeyDown };
};
```

## Keyboard Shortcuts

```typescript
interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(s => 
        s.key.toLowerCase() === event.key.toLowerCase() &&
        !!s.ctrl === event.ctrlKey &&
        !!s.alt === event.altKey &&
        !!s.shift === event.shiftKey
      );

      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

// Usage
const shortcuts = [
  {
    key: 's',
    ctrl: true,
    action: () => saveData(),
    description: 'Save data'
  },
  {
    key: '/',
    action: () => focusSearch(),
    description: 'Focus search'
  }
];

useKeyboardShortcuts(shortcuts);
```

## Testing Keyboard Navigation

```typescript
import { render, screen, fireEvent } from '@testing-library/react';

test('supports tab navigation', () => {
  render(<NavigableComponent />);
  
  const buttons = screen.getAllByRole('button');
  
  // Tab through buttons
  buttons[0].focus();
  fireEvent.keyDown(document.activeElement!, { key: 'Tab' });
  
  expect(buttons[1]).toHaveFocus();
});

test('handles escape key', () => {
  const onClose = jest.fn();
  render(<Modal isOpen onClose={onClose} />);
  
  fireEvent.keyDown(document, { key: 'Escape' });
  
  expect(onClose).toHaveBeenCalled();
});
```
