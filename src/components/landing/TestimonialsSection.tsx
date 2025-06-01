
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Testimonials section with customer reviews
 */
export const TestimonialsSection = () => {
  const testimonials = [
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
    <section id="testimonials" className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-blue-50 to-red-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Trusted by thousands of businesses worldwide for their analytics needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur hover:shadow-lg transition-shadow duration-300 card-mobile">
              <CardContent className="p-4 sm:p-6">
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" />
                <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
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
