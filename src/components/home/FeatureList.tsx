
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Organizing all features in categories
const allFeatures = [
  {
    category: "Image Analysis",
    features: [
      { id: "1", name: "Image Deepfake Detection", description: "Detects face swaps, unnatural movements, GAN artifacts" },
      { id: "2", name: "Lighting & Shadow Analysis", description: "Analyzes lighting, shadows, and pixel inconsistencies" },
      { id: "3", name: "AI-Generated Face Detection", description: "Flags AI-generated human faces (e.g., fake profile pictures)" },
      { id: "4", name: "Metadata Verification", description: "Checks image metadata for signs of manipulation" },
      { id: "5", name: "GAN Artifact Detection", description: "Identifies artifacts specific to GAN-generated images" }
    ]
  },
  {
    category: "Video Analysis",
    features: [
      { id: "6", name: "Video Deepfake Detection", description: "Frame-by-frame analysis of manipulated videos" },
      { id: "7", name: "Motion Inconsistency Check", description: "Detects unnatural movements in video content" },
      { id: "8", name: "Lip-Sync Analysis", description: "Verifies synchronization between audio and lip movements" },
      { id: "9", name: "Video Splice Detection", description: "Identifies cut or spliced sections in videos" },
      { id: "10", name: "Real-time Video Scanner", description: "Live analysis of video streams and webcam footage" }
    ]
  },
  {
    category: "Audio Analysis",
    features: [
      { id: "11", name: "Voice Clone Detection", description: "Identifies AI-generated speech and cloned voices" },
      { id: "12", name: "Audio Artifact Analysis", description: "Detects unnatural pauses and synthetic tone patterns" },
      { id: "13", name: "Emotion Verification", description: "Analyzes emotional consistency in speech" },
      { id: "14", name: "Audio Splicing Detection", description: "Identifies edited or manipulated audio recordings" },
      { id: "15", name: "Voice Pattern Consistency", description: "Checks for consistency in voice patterns and characteristics" }
    ]
  },
  {
    category: "Document Analysis",
    features: [
      { id: "16", name: "AI-Generated Text Detection", description: "Spots ChatGPT-written fraud emails, phishing attempts" },
      { id: "17", name: "Contract Verification", description: "Validates authenticity of legal documents and contracts" },
      { id: "18", name: "Credential Analysis", description: "Verifies diplomas, certificates and other credentials" },
      { id: "19", name: "News Article Verification", description: "Checks authenticity of news content and sources" },
      { id: "20", name: "Academic Paper Analysis", description: "Detects AI-generated academic content" }
    ]
  },
  {
    category: "Advanced Protection",
    features: [
      { id: "21", name: "Blockchain Timestamping", description: "Generates cryptographic proofs for genuine media" },
      { id: "22", name: "NFT Authentication Badges", description: "Stamps real content with blockchain verification" },
      { id: "23", name: "Deepfake Blacklist", description: "Crowdsourced database of known synthetic media" },
      { id: "24", name: "DNA Sequence Validation", description: "Flags synthetic DNA sequences used in bioengineering" },
      { id: "25", name: "Quantum Hash Timestamping", description: "Future-proof hashing for long-term verification" }
    ]
  }
];

export function FeatureList() {
  const [activeCategory, setActiveCategory] = useState(allFeatures[0].category);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter features based on search query
  const filteredFeatures = searchQuery 
    ? allFeatures.map(category => ({
        ...category,
        features: category.features.filter(feature => 
          feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          feature.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.features.length > 0)
    : allFeatures;
    
  const totalFeatureCount = allFeatures.reduce((acc, category) => acc + category.features.length, 0);
  
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/10">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Complete Feature Overview
          </h2>
          <p className="mt-4 text-muted-foreground">
            DeepSentinel offers {totalFeatureCount} specialized features across multiple categories to protect your digital reality
          </p>
          
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search all features..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredFeatures.length > 0 ? (
          <Tabs 
            defaultValue={filteredFeatures[0].category} 
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <div className="overflow-x-auto pb-4 mb-6">
              <TabsList className="h-auto p-1">
                {filteredFeatures.map((category) => (
                  <TabsTrigger 
                    key={category.category} 
                    value={category.category}
                    className="px-4 py-2"
                  >
                    {category.category}
                    <Badge variant="outline" className="ml-2">
                      {category.features.length}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {filteredFeatures.map((category) => (
              <TabsContent key={category.category} value={category.category} className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {category.features.map((feature, index) => (
                        <div 
                          key={feature.id}
                          className={cn(
                            "p-4 rounded-lg border hover:border-primary/40 transition-all",
                            index < 2 ? "bg-primary/5" : ""
                          )}
                        >
                          <h3 className="font-medium">{feature.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground mb-3">
                            {feature.description}
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary text-xs p-0 h-auto"
                            asChild
                          >
                            <Link to={`/feature/${feature.id}`} className="flex items-center gap-1">
                              Try this feature
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No features found matching "{searchQuery}"</p>
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery("")}
              className="mt-4"
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
