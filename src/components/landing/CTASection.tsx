
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * Call-to-action section
 */
export const CTASection = () => (
  <section className="py-24 bg-gradient-to-r from-primary to-primary/80">
    <div className="container mx-auto px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-6">
          Ready to Transform Your Data?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
          Start exploring your analytics with our comprehensive dashboard. 
          Real-time insights, beautiful visualizations, and enterprise-grade features await.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
            <Link to="/dashboard">
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
