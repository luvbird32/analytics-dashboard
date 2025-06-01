
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

/**
 * Call-to-action section at the bottom of the page
 */
export const CTASection = () => {
  return (
    <section id="cta" className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
            Ready to Transform Your Data?
          </h2>
          <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 px-4 leading-relaxed">
            Join thousands of companies already using our platform to make better decisions with their data.
            Start your free trial today and see the difference analytics can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 tap-target touch-manipulation">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 border-white text-white hover:bg-white hover:text-primary tap-target touch-manipulation">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
