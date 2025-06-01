
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

/**
 * About section highlighting company values and mission
 */
export const AboutSection = () => {
  const benefits = [
    "99.9% uptime guarantee",
    "24/7 expert support",
    "Advanced data visualization",
    "Custom integrations available",
    "GDPR & SOC 2 compliant",
    "No vendor lock-in"
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-red-50 to-blue-50 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
              Built for Scale, Designed for Simplicity
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Our analytics platform combines enterprise-grade capabilities with an intuitive interface 
              that anyone can use. Whether you're a startup or a Fortune 500 company, we scale with your needs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
                </div>
              ))}
            </div>
            
            <Button size="lg" className="w-full sm:w-auto tap-target touch-manipulation">
              Learn More About Us
            </Button>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" 
              alt="Analytics Dashboard"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
