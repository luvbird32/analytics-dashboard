
import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { StatsSection } from './StatsSection';
import { AboutSection } from './AboutSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { CTASection } from './CTASection';
import { LandingFooter } from './LandingFooter';

/**
 * Container component for all landing page sections
 */
export const LandingSections = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <AboutSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <LandingFooter />
    </>
  );
};
