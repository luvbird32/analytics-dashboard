
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
      description: "Monitor your data in real-time with live updates and instant insights",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures your dashboards load in milliseconds",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights and collaborate with your team in real-time",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Built to handle massive datasets from around the world",
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Predictive Insights",
      description: "AI-powered predictions to help you stay ahead of trends",
      color: "from-red-500 to-pink-600"
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-white px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
              ✨ Powerful Features
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Everything You Need for Modern Analytics
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto px-2 sm:px-4 leading-relaxed">
            Transform raw data into actionable business intelligence with our comprehensive suite of tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] card-mobile h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white">
              <CardHeader className="pb-4 sm:pb-6 md:pb-8">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-r ${feature.color} p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl leading-tight text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
