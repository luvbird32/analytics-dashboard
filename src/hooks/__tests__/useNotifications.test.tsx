
import { renderHook, act } from '@testing-library/react';
import { useNotifications } from '../useNotifications';

describe('useNotifications', () => {
  it('initializes with empty notifications', () => {
    const { result } = renderHook(() => useNotifications());
    
    expect(result.current.notifications).toEqual([]);
  });

  it('adds notification correctly', () => {
    const { result } = renderHook(() => useNotifications());
    
    const testNotification = {
      id: 'test-1',
      type: 'success' as const,
      title: 'Test',
      message: 'Test message',
      timestamp: new Date(),
      isRead: false
    };

    act(() => {
      result.current.addNotification(testNotification);
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0]).toEqual(testNotification);
  });

  it('clears all notifications', () => {
    const { result } = renderHook(() => useNotifications());
    
    const testNotification = {
      id: 'test-1',
      type: 'success' as const,
      title: 'Test',
      message: 'Test message',
      timestamp: new Date(),
      isRead: false
    };

    act(() => {
      result.current.addNotification(testNotification);
    });

    expect(result.current.notifications).toHaveLength(1);

    act(() => {
      result.current.clearNotifications();
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it('marks notification as read', () => {
    const { result } = renderHook(() => useNotifications());
    
    const testNotification = {
      id: 'test-1',
      type: 'success' as const,
      title: 'Test',
      message: 'Test message',
      timestamp: new Date(),
      isRead: false
    };

    act(() => {
      result.current.addNotification(testNotification);
    });

    act(() => {
      result.current.markNotificationAsRead('test-1');
    });

    expect(result.current.notifications[0].isRead).toBe(true);
  });
});
