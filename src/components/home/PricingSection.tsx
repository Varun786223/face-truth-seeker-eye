import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Shield, Crown } from "lucide-react";
export function PricingSection() {
  const plans = [{
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals and small projects",
    icon: <Zap className="h-6 w-6" />,
    features: ["5 analyses per day", "Basic image detection", "Standard support", "Export to PDF", "Community access"],
    limitations: ["No video analysis", "No batch processing"],
    popular: false,
    cta: "Get Started",
    variant: "outline" as const
  }, {
    name: "Professional",
    price: "$29",
    period: "per month",
    description: "Ideal for professionals and small businesses",
    icon: <Shield className="h-6 w-6" />,
    features: ["Unlimited analyses", "All detection types", "Priority support", "Advanced reporting", "API access", "Batch processing", "Custom integrations"],
    limitations: [],
    popular: true,
    cta: "Start Free Trial",
    variant: "default" as const
  }, {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large organizations with specific needs",
    icon: <Crown className="h-6 w-6" />,
    features: ["Everything in Professional", "Dedicated support team", "Custom model training", "On-premise deployment", "SLA guarantees", "Advanced analytics", "White-label options"],
    limitations: [],
    popular: false,
    cta: "Contact Sales",
    variant: "outline" as const
  }];
  return <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Simple Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-zinc-950">
              Protection Level
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => <Card key={plan.name} className={`relative border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${plan.popular ? 'border-primary shadow-lg shadow-primary/20 scale-105' : 'border-muted hover:border-primary/30'}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    Most Popular
                  </Badge>
                </div>}
              
              <CardHeader className="text-center pb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    {plan.price}
                    {plan.price !== "Custom" && <span className="text-lg font-normal text-muted-foreground">
                        /{plan.period}
                      </span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, i) => <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>)}
                  {plan.limitations.map((limitation, i) => <div key={i} className="flex items-center gap-3 opacity-60">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">×</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>)}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant={plan.variant} className="w-full" size="lg">
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>)}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All plans include SSL encryption, data privacy protection, and 99.9% uptime guarantee.
          </p>
        </div>
      </div>
    </section>;
}