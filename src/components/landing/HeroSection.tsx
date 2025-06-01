
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

/**
 * Hero section with main call-to-action
 */
export const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-18 md:pt-20">
      <div className="container mx-auto text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 leading-[1.1] sm:leading-tight">
            Transform Your Data Into
            <span className="text-primary block mt-2 sm:mt-0 sm:inline"> Actionable Insights</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Experience the power of real-time analytics with our comprehensive dashboard solution. 
            Make data-driven decisions that drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2 sm:px-4">
            <Button size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 md:py-4 tap-target touch-manipulation min-h-[48px] md:min-h-[52px]">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 md:py-4 tap-target touch-manipulation min-h-[48px] md:min-h-[52px]">
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
