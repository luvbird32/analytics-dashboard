
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { type Testimonial } from '@/types/testimonials';

/**
 * Testimonials section with customer reviews
 */
export const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Data Analyst",
      company: "TechCorp",
      content: "This dashboard has revolutionized how we analyze our data. The real-time insights are incredible.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "GrowthInc",
      content: "The visualization capabilities are outstanding. We've improved our decision-making process significantly.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Business Intelligence Manager",
      company: "DataFlow",
      content: "Easy to use, powerful features, and excellent customer support. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    }
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-blue-50 to-red-50 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4 md:mb-6 leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
            Trusted by thousands of businesses worldwide for their analytics needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <Card key={`${testimonial.name}-${index}`} className="bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 hover:scale-[1.02] card-mobile h-full">
              <CardContent className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary mb-3 sm:mb-4 md:mb-6 flex-shrink-0" aria-hidden="true" />
                <blockquote className="text-gray-700 mb-4 sm:mb-6 md:mb-8 leading-relaxed text-sm sm:text-base md:text-lg flex-grow">
                  "{testimonial.content}"
                </blockquote>
                <div className="mt-auto">
                  <div className="flex items-center gap-1 mb-3 sm:mb-4 md:mb-6" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ${
                          i < testimonial.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={`${testimonial.name}, ${testimonial.role} at ${testimonial.company}`}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg truncate">
                        {testimonial.name}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-gray-600 truncate">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
