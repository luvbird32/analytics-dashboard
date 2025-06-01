
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
    <section id="about" className="py-24 bg-gradient-to-br from-red-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Built for Scale, Designed for Simplicity
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our analytics platform combines enterprise-grade capabilities with an intuitive interface 
              that anyone can use. Whether you're a startup or a Fortune 500 company, we scale with your needs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <Button size="lg">
              Learn More About Us
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" 
              alt="Analytics Dashboard"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
