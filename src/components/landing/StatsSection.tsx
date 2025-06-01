
import React from 'react';

/**
 * Statistics section showcasing key metrics
 */
export const StatsSection = () => {
  const stats = [
    {
      value: "10M+",
      label: "Data Points Processed",
      description: "Every single day"
    },
    {
      value: "99.9%",
      label: "Uptime Guarantee",
      description: "Reliable performance"
    },
    {
      value: "500+",
      label: "Enterprise Customers",
      description: "Trusted worldwide"
    },
    {
      value: "24/7",
      label: "Expert Support",
      description: "Always here to help"
    }
  ];

  return (
    <section id="stats" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform powers analytics for companies of all sizes across the globe
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-xl font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
