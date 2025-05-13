
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DragDropFeatureGrid } from "@/components/home/DragDropFeatureGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { featuresByCategory } from "@/data/features";

export function FeatureCategories() {
  const [activeCategory, setActiveCategory] = useState<string>("detection");
  const categories = Object.keys(featuresByCategory);
  
  return (
    <section className="py-12 md:py-20 bg-background" id="features">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            AI Fraud Detection Solutions
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Drag and drop features to explore our comprehensive suite of AI fraud detection tools
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
              <DragDropFeatureGrid features={featuresByCategory[category]} />
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-center mt-12">
          <Button size="lg" asChild>
            <a href="/settings">Configure Detection Features</a>
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
    "revenue": "Enterprise solutions for businesses to protect against and monetize AI fraud detection.",
    "government": "Critical systems and infrastructure protection for governments and public institutions."
  };
  
  return descriptions[category] || "";
}
