
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

/**
 * Hero section with main call-to-action
 */
export const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-18 md:pt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
              🚀 New Analytics Engine Available
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 sm:mb-8 md:mb-10 leading-[1.1] sm:leading-tight bg-gradient-to-r from-gray-900 via-primary to-secondary bg-clip-text text-transparent">
            Transform Your Data Into
            <span className="block mt-2 sm:mt-0 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Actionable Insights</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
            Experience the power of real-time analytics with our comprehensive dashboard solution. 
            Make data-driven decisions that drive your business forward.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-2 sm:px-4">
            <Button size="lg" className="w-full sm:w-auto text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 tap-target touch-manipulation min-h-[56px] md:min-h-[64px] bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started Free
              <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 tap-target touch-manipulation min-h-[56px] md:min-h-[64px] border-2 border-gray-300 hover:border-primary hover:bg-primary/5 transition-all duration-300">
              <Play className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
