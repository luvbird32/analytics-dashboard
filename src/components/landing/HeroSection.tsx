
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Hero section component for the landing page
 * Features animated text, call-to-action buttons, and dashboard navigation
 */
export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Content */}
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Enterprise Analytics
            <span className="block text-primary">Dashboard</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your data into actionable insights with our powerful, 
            real-time analytics platform designed for modern enterprises.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
              <Link to="/dashboard">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
              <TrendingUp className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in-up animation-delay-300">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">Live data updates and interactive visualizations</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Charts</h3>
            <p className="text-gray-600">Multiple chart types for comprehensive data analysis</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <ArrowRight className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Integration</h3>
            <p className="text-gray-600">Seamless setup with your existing data sources</p>
          </div>
        </div>
      </div>
    </section>
  );
};
