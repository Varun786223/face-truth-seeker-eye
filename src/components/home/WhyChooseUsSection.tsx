import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Globe, Users, Code, Heart } from "lucide-react";

export function WhyChooseUsSection() {
  const benefits = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "100% Free Forever",
      description: "No hidden fees, no subscriptions, no limits. Full access to all premium features at no cost.",
      highlight: "Always Free"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Advanced AI models optimized for speed. Get results in seconds, not minutes.",
      highlight: "Ultra Fast"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Open Source",
      description: "Transparent, community-driven development. Contribute, audit, and customize as needed.",
      highlight: "Open Source"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Powered",
      description: "Built by the community, for the community. Join thousands of users protecting digital truth.",
      highlight: "Community"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Developer Friendly",
      description: "Full API access, webhooks, and integrations. Build DeepSentinel into your workflow.",
      highlight: "API Access"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Privacy First",
      description: "Your data stays yours. No tracking, no profiling, no data selling. Complete privacy.",
      highlight: "Privacy"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Why Choose DeepSentinel
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The World's Most{" "}
            <span className="text-black dark:text-white">
              Trusted Platform
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join the revolution in digital truth verification with our completely free, open-source platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 group">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary">
                    {benefit.icon}
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary" className="mb-2">
                    {benefit.highlight}
                  </Badge>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              All features included • No credit card required • Start immediately
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
