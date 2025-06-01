
import React from 'react';

/**
 * Footer component for the landing page with copyright notice
 */
export const LandingFooter = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Victor Aniemeka. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
