
import React from 'react';

/**
 * Animated background component with floating geometric shapes
 */
export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-red-400/10 rounded-full animate-pulse blur-xl"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/15 rounded-full animate-bounce blur-lg" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-red-300/8 rounded-full animate-pulse blur-2xl" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-300/12 rounded-full animate-bounce blur-xl" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Floating squares */}
      <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-gradient-to-br from-red-400/20 to-blue-400/20 rotate-45 animate-spin blur-sm" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-1/3 left-1/5 w-12 h-12 bg-gradient-to-tr from-blue-400/25 to-red-400/25 rotate-12 animate-spin blur-md" style={{ animationDuration: '15s', animationDelay: '3s' }}></div>
      
      {/* Moving gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-radial from-red-400/5 to-transparent rounded-full animate-pulse blur-3xl" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-radial from-blue-400/5 to-transparent rounded-full animate-pulse blur-3xl" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>
      
      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-blue-50/30 animate-pulse" style={{ animationDuration: '8s' }}></div>
    </div>
  );
};
