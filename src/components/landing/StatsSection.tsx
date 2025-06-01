
import React from 'react';

/**
 * Statistics section showcasing key metrics
 */
export const StatsSection = () => {
  const stats = [
    {
      value: "10M+",
      label: "Data Points Processed",
      description: "Every single day",
      color: "from-blue-500 to-blue-600"
    },
    {
      value: "99.9%",
      label: "Uptime Guarantee",
      description: "Reliable performance",
      color: "from-green-500 to-green-600"
    },
    {
      value: "500+",
      label: "Enterprise Customers",
      description: "Trusted worldwide",
      color: "from-purple-500 to-purple-600"
    },
    {
      value: "24/7",
      label: "Expert Support",
      description: "Always here to help",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section id="stats" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white border border-white/20">
              📊 Trusted Globally
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Powering Analytics Worldwide
          </h2>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
            Our platform powers analytics for companies of all sizes across the globe
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {stat.value.slice(0, 2)}
                </div>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                {stat.label}
              </div>
              <div className="text-gray-400 text-base sm:text-lg md:text-xl">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
