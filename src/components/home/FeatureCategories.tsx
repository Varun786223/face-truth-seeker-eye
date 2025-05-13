
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
            AI Fraud Detection Categories
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Explore our specialized detection solutions by category
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuresByCategory[category].slice(0, 3).map((feature, i) => (
                  <div 
                    key={feature.id}
                    className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <span className="text-lg">{getEmojiForFeature(feature.id)}</span>
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
                      className="w-full mt-2"
                    >
                      <a href={feature.link}>Try this feature</a>
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
          <Button size="lg" asChild>
            <a href="/settings">Configure Detection Settings</a>
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

function getEmojiForFeature(featureId: string): string {
  const emojiMap: Record<string, string> = {
    // Detection features
    "dna-sequence-validation": "🧬",
    "quantum-hash-timestamping": "⏱️",
    "neural-implant-authentication": "🧠",
    "synthetic-olfactory-detection": "👃",
    "climate-data-forgery-audit": "☁️",
    "robotic-motion-analysis": "🤖",
    "nanomaterial-blueprint-check": "🔬",
    "legal-doc-scanner": "📄",
    "political-speech-analyzer": "🗣️",
    "medication-ad-validator": "💊",
    
    // Citizen protection features
    "elder-scam-shield": "👵",
    "romance-bait-detector": "❤️",
    "job-interview-verifier": "💼",
    "child-digital-twin-alert": "👶",
    
    // Revenue features
    "deepfake-insurance": "💰",
    "virtual-notary": "✍️",
    "media-license-registry": "📝",
    
    // Government features
    "military-simulation-validator": "🎖️",
    "pandemic-early-warning": "🦠",
    "ai-news-monitoring": "📰",
    
    // Default
    "default": "🛡️"
  };
  
  return emojiMap[featureId] || emojiMap["default"];
}
