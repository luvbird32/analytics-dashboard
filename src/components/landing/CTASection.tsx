
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

/**
 * Call-to-action section at the bottom of the page
 */
export const CTASection = () => {
  return (
    <section id="cta" className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-primary via-primary/90 to-secondary text-white px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-6 w-6 sm:h-8 sm:w-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg sm:text-xl opacity-90 mb-6">
              Rated 4.9/5 by 10,000+ customers
            </p>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight">
            Ready to Transform Your Data?
          </h2>
          
          <p className="text-xl sm:text-2xl md:text-3xl opacity-90 mb-8 sm:mb-12 px-4 leading-relaxed">
            Join thousands of companies already using our platform to make better decisions with their data.
            <span className="block mt-2">Start your free trial today and see the difference analytics can make.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 tap-target touch-manipulation bg-white text-primary hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 min-h-[64px]">
              Start Free Trial
              <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-2 border-white text-white hover:bg-white hover:text-primary tap-target touch-manipulation transition-all duration-300 transform hover:scale-105 min-h-[64px]">
              Schedule Demo
            </Button>
          </div>
          
          <div className="mt-12 sm:mt-16">
            <p className="text-sm sm:text-base opacity-75">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
