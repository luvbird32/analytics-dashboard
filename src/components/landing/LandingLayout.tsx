
import React from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { LandingNavbar } from './LandingNavbar';

interface LandingLayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout wrapper for the landing page with animated background and navigation
 */
export const LandingLayout = ({ children }: LandingLayoutProps) => {
  React.useEffect(() => {
    // Ensure smooth scrolling is enabled on mount
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="min-h-screen relative scroll-smooth">
      <AnimatedBackground />
      <LandingNavbar />
      <div className="relative z-10 pt-16 scroll-smooth">
        {children}
      </div>
    </div>
  );
};
