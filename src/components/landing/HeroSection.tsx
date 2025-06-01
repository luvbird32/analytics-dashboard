
import React from 'react';
import { ArrowRight, BarChart3, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * Enhanced hero section with compelling value proposition and red/blue theme
 */
export const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-50 py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 mb-8 animate-fade-in">
          <Zap className="h-4 w-4 mr-2" />
          Enterprise-Grade Analytics Platform
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6 animate-fade-in">
          Transform Data Into
          <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent block mt-2">
            Actionable Insights
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          Comprehensive real-time analytics platform with 12+ chart types, advanced filtering, 
          and enterprise-grade visualization capabilities. Make data-driven decisions with confidence.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm font-medium text-muted-foreground animate-fade-in">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-red-500" />
            12+ Chart Types
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Real-time Updates
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-red-500" />
            Lightning Fast
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
          <Button asChild size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/dashboard">
              View Live Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300">
            Explore Features
          </Button>
        </div>

        {/* Social proof */}
        <div className="text-center animate-fade-in">
          <p className="text-sm text-muted-foreground mb-4">Trusted by 10,000+ businesses worldwide</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded">TechCorp</div>
            <div className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded">DataFlow</div>
            <div className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded">GrowthInc</div>
            <div className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded">Analytics Pro</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Enhanced floating elements with red and blue theme */}
    <div className="absolute top-20 left-10 w-20 h-20 bg-red-400/20 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
    <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-red-500/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '500ms' }}></div>
    <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-blue-500/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1500ms' }}></div>
    
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none"></div>
  </section>
);
