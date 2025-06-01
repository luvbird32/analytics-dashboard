
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Zap, Shield, Users, Globe, TrendingUp } from 'lucide-react';

/**
 * Features section showcasing key capabilities
 */
export const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor your data in real-time with live updates and instant insights"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures your dashboards load in milliseconds"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights and collaborate with your team in real-time"
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Built to handle massive datasets from around the world"
    },
    {
      icon: TrendingUp,
      title: "Predictive Insights",
      description: "AI-powered predictions to help you stay ahead of trends"
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4 md:mb-6 leading-tight">
            Powerful Features for Modern Analytics
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
            Everything you need to transform raw data into actionable business intelligence
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] card-mobile group h-full">
              <CardHeader className="pb-3 sm:pb-4 md:pb-6">
                <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 text-primary mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-lg sm:text-xl md:text-2xl leading-tight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
