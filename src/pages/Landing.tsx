
import React from 'react';
import { ArrowRight, BarChart3, TrendingUp, Users, DollarSign, Activity, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

/**
 * Hero section with compelling value proposition
 */
const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-24 lg:py-32">
    <div className="container mx-auto px-4 text-center">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6">
          Enterprise Analytics
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent block">
            Dashboard
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Comprehensive real-time analytics platform with 12+ chart types, advanced filtering, 
          and enterprise-grade visualization capabilities. Transform your data into actionable insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-4">
            <Link to="/">
              View Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">
            Learn More
          </Button>
        </div>
      </div>
    </div>
    
    {/* Floating elements for visual appeal */}
    <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
  </section>
);

/**
 * Features showcase section
 */
const FeaturesSection = () => {
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

/**
 * Statistics section showing capabilities
 */
const StatsSection = () => {
  const stats = [
    { value: "12+", label: "Chart Types", icon: BarChart3 },
    { value: "Real-time", label: "Data Updates", icon: Zap },
    { value: "100%", label: "Responsive", icon: Globe },
    { value: "Enterprise", label: "Grade Security", icon: Shield }
  ];

  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Call-to-action section
 */
const CTASection = () => (
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
            <Link to="/">
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

/**
 * Main landing page component
 */
const Landing = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Landing;
