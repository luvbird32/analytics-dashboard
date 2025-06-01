
import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Zap, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Features showcase section
 */
export const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "12+ Chart Types",
      description: "Line, Bar, Area, Pie, Donut, Scatter, Radar, Treemap, Funnel, Gauge, Sankey, Candlestick charts"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Live data streaming with WebSocket support for instant insights and notifications"
    },
    {
      icon: Activity,
      title: "Advanced Analytics",
      description: "Complex data visualization with sentiment analysis, engagement metrics, and performance tracking"
    },
    {
      icon: Users,
      title: "Social Media Insights",
      description: "Comprehensive social media analytics with hashtag tracking and engagement monitoring"
    },
    {
      icon: DollarSign,
      title: "Financial Data",
      description: "Cryptocurrency analytics with candlestick charts and market trend analysis"
    },
    {
      icon: Globe,
      title: "Responsive Design",
      description: "Perfect experience across desktop, tablet, and mobile devices with adaptive layouts"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for comprehensive data analysis and visualization
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-background/60 backdrop-blur">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
