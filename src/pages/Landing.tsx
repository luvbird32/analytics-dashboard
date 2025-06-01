
import React from 'react';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { LandingSections } from '@/components/landing/LandingSections';
import { useLandingPage } from '@/hooks/useLandingPage';

/**
 * Main landing page component with comprehensive sections
 * Refactored for better maintainability and separation of concerns
 */
const Landing = () => {
  // Initialize landing page functionality
  useLandingPage();

  return (
    <LandingLayout>
      <LandingSections />
    </LandingLayout>
  );
};

export default Landing;
