
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
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <LandingNavbar />
      <div className="relative z-10 pt-16">
        {children}
      </div>
    </div>
  );
};
