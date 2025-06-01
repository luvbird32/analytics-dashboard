
import React from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';

/**
 * About section showcasing company values and mission
 */
export const AboutSection = () => {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security with end-to-end encryption and compliance certifications."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance delivering real-time insights with minimal latency."
    },
    {
      icon: Users,
      title: "Team Focused",
      description: "Built for collaboration with advanced sharing and permission management."
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized by industry leaders for innovation and user experience excellence."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-red-600/10 via-purple-500/10 to-blue-600/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Empowering Data-Driven 
              <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent block">
                Decision Making
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Founded in 2020, we've been at the forefront of analytics innovation. Our mission is to make 
              complex data analysis accessible to everyone, from startups to Fortune 500 companies.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white/60 backdrop-blur rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <value.icon className={`h-12 w-12 mb-4 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
