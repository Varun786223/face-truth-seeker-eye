import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Download, GitFork, Heart, Lock, Shield } from "lucide-react";

export function OpenSourceSection() {
  const openSourceBenefits = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Transparent Code",
      description: "Every line of code is open for inspection. No black boxes, no hidden algorithms."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security Audited",
      description: "Community-reviewed security. Vulnerabilities are found and fixed quickly."
    },
    {
      icon: <GitFork className="h-6 w-6" />,
      title: "Fork & Customize",
      description: "Adapt the platform to your needs. Create custom implementations and features."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Community Driven",
      description: "Features are built based on real user needs and community feedback."
    }
  ];

  const repositoryStats = [
    { label: "License", value: "MIT" },
    { label: "Language", value: "TypeScript" },
    { label: "Framework", value: "React" },
    { label: "Last Updated", value: "2 hours ago" }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            <Lock className="h-3 w-3 mr-1" />
            Open Source
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Completely{" "}
            <span className="text-black dark:text-white">
              Open & Free
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            DeepSentinel is 100% open source. Use it, modify it, contribute to it - no restrictions, no licensing fees.
          </p>
        </div>

        {/* Repository Info */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Code className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">DeepSentinel Repository</CardTitle>
              <p className="text-muted-foreground">
                MIT Licensed • Production Ready • Actively Maintained
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {repositoryStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    <div className="font-semibold">{stat.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Clone Repository
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <GitFork className="h-4 w-4" />
                  Fork Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Open Source Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {openSourceBenefits.map((benefit, index) => (
            <Card key={index} className="border-muted hover:border-primary/30 transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
                    <div className="text-primary">
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border border-green-200 dark:border-green-800 rounded-full px-6 py-3">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">
              Made with ❤️ by the community • Forever free • Always open
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
