
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * Hero section with compelling value proposition and red/blue theme
 */
export const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-50 py-24 lg:py-32">
    <div className="container mx-auto px-4 text-center">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6">
          Enterprise Analytics
          <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent block">
            Dashboard
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Comprehensive real-time analytics platform with 12+ chart types, advanced filtering, 
          and enterprise-grade visualization capabilities. Transform your data into actionable insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-4">
            <Link to="/dashboard">
              View Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-blue-300 text-blue-600 hover:bg-blue-50">
            Learn More
          </Button>
        </div>
      </div>
    </div>
    
    {/* Floating elements with red and blue theme */}
    <div className="absolute top-20 left-10 w-20 h-20 bg-red-400/20 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-red-500/10 rounded-full blur-lg animate-pulse delay-500"></div>
  </section>
);
