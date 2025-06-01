
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
    <section id="stats" className="py-12 sm:py-16 md:py-24 bg-gray-900 text-white px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Our platform powers analytics for companies of all sizes across the globe
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-base sm:text-xl font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-gray-400 text-sm sm:text-base">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
