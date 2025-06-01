
import React from 'react';
import { AnimatedBackground } from './AnimatedBackground';

interface LandingLayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout wrapper for the landing page with animated background
 */
export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
