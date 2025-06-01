
import React from 'react';
import { BarChart3, Zap, Globe, Shield } from 'lucide-react';

/**
 * Statistics section showing capabilities
 */
export const StatsSection = () => {
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
