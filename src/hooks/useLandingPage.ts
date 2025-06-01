
import { useEffect } from 'react';

/**
 * Custom hook for landing page functionality
 * Handles analytics tracking, scroll behavior, and other page-specific logic
 */
export const useLandingPage = () => {
  useEffect(() => {
    // Track page view for analytics
    console.log('Landing page viewed');
    
    // Set page title
    document.title = 'Enterprise Analytics Dashboard';
    
    // Cleanup function
    return () => {
      console.log('Landing page cleanup');
    };
  }, []);

  return {
    // Add any state or functions that need to be shared across landing components
  };
};
