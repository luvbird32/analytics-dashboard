
import React from 'react';

/**
 * Footer component for the landing page with copyright notice
 */
export const LandingFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Analytics Dashboard
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Transforming data into actionable insights for businesses worldwide
            </p>
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm sm:text-base text-muted-foreground">
              © {new Date().getFullYear()} Victor Aniemeka. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
