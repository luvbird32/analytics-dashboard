
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

/**
 * Pricing section with subscription plans
 */
export const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 users",
        "10GB data storage",
        "Basic analytics",
        "Email support",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "For growing businesses with advanced needs",
      features: [
        "Up to 25 users",
        "100GB data storage",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with custom requirements",
      features: [
        "Unlimited users",
        "Unlimited storage",
        "Enterprise analytics",
        "24/7 dedicated support",
        "Custom development",
        "On-premise deployment"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4 md:mb-6 leading-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-xl lg:scale-105 ring-2 ring-primary/20' : 'hover:shadow-lg'} card-mobile transition-all duration-300 hover:scale-[1.02] h-full`}>
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-primary text-white px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4 sm:pb-6 pt-6 sm:pt-8">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl">{plan.name}</CardTitle>
                <div className="mt-3 sm:mt-4 md:mt-6">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1 sm:ml-2 text-sm sm:text-base md:text-lg">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg px-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="pt-0 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 flex flex-col flex-grow">
                <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8 md:mb-10 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 sm:gap-4">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full tap-target touch-manipulation text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-5 min-h-[48px] md:min-h-[52px] mt-auto" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
