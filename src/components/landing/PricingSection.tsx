
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
    <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-white px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg lg:scale-105' : ''} card-mobile`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                <div className="mt-3 sm:mt-4">
                  <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1 text-sm sm:text-base">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">{plan.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full tap-target touch-manipulation text-sm sm:text-base py-2 sm:py-3" 
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
