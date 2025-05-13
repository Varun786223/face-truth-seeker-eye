
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { featuresByCategory } from "@/data/features";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, ArrowRight } from "lucide-react";

export function FeatureCategories() {
  const [activeCategory, setActiveCategory] = useState<string>("detection");
  const categories = Object.keys(featuresByCategory);
  
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/20" id="features">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            AI Analysis Categories
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Explore our specialized analysis solutions by category
          </p>
        </div>
        
        <Tabs defaultValue="detection" className="w-full" onValueChange={setActiveCategory}>
          <div className="overflow-x-auto pb-2 mb-8">
            <TabsList className="inline-flex w-full md:w-auto justify-start md:justify-center p-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className={cn(
                    "text-sm md:text-base px-3 py-1.5 capitalize",
                    activeCategory === category ? "bg-primary text-primary-foreground" : ""
                  )}
                >
                  {category.replace("-", " ")}
                  <Badge variant="outline" className="ml-2">
                    {featuresByCategory[category]?.length || 0}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="bg-muted/20 rounded-lg p-4 mb-8">
                <p className="text-muted-foreground">
                  {getCategoryDescription(category)}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuresByCategory[category].slice(0, 3).map((feature, i) => (
                  <div 
                    key={feature.id}
                    className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {i === 0 ? (
                          <Zap className="h-4 w-4 text-primary" />
                        ) : (
                          <Shield className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild 
                      className="w-full mt-2 group"
                    >
                      <a href={feature.link}>
                        Try this feature
                        <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button asChild variant="default">
                  <a href="#all-features">See All {category.replace("-", " ")} Features</a>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-center mt-12">
          <Button size="lg" asChild className="gap-2">
            <a href="/settings">
              <Shield className="h-4 w-4" />
              Configure Analysis Settings
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    "detection": "Advanced algorithms to identify synthetic and manipulated content across multiple formats.",
    "citizen-protection": "Tools designed to protect individuals from AI-powered fraud and scams.",
    "revenue": "Enterprise solutions for businesses to protect against and monetize AI analysis.",
    "government": "Critical systems and infrastructure protection for governments and public institutions."
  };
  
  return descriptions[category] || "";
}
