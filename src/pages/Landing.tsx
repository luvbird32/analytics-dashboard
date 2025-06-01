
import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { CTASection } from '@/components/landing/CTASection';

/**
 * Main landing page component with comprehensive sections
 */
const Landing = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <AboutSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  );
};

export default Landing;
