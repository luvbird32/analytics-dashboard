
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
    <section id="features" className="py-12 sm:py-16 md:py-24 bg-white px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Powerful Features for Modern Analytics
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Everything you need to transform raw data into actionable business intelligence
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 card-mobile">
              <CardHeader className="pb-4">
                <feature.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
