
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Save, Search, Zap } from "lucide-react";
import { toast } from "sonner";
import aiService, { AIService } from "@/services/AIService";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Feature {
  id: string;
  name: string;
  description: string;
  category: "visual" | "audio" | "metadata" | "verification";
  enabled: boolean;
}

export function FeatureSelectionPanel() {
  // Get stored features from AIService
  const storedFeatures = AIService.getEnabledFeatures() || {};
  
  // Initial features state with enabled status from storage
  const [features, setFeatures] = useState<Feature[]>([
    // Visual detection features
    {
      id: "artifactDetection",
      name: "Artifact Detection",
      description: "Detects GAN fingerprints and blurring inconsistencies",
      category: "visual",
      enabled: !!storedFeatures?.artifactDetection
    },
    {
      id: "lipSyncAnalysis",
      name: "Lip-Sync Analysis",
      description: "Detects mismatches between lip movements and audio",
      category: "visual",
      enabled: !!storedFeatures?.lipSyncAnalysis
    },
    {
      id: "ganDetection",
      name: "GAN Detection",
      description: "Specialized detection for GAN-generated media",
      category: "visual",
      enabled: !!storedFeatures?.ganDetection
    },
    {
      id: "cnnSignatures",
      name: "CNN Forgery Detection",
      description: "Uses CNN models to detect manipulation signatures",
      category: "visual",
      enabled: !!storedFeatures?.cnnSignatures
    },
    {
      id: "eyeBlinkAnalysis",
      name: "Eye Blink Analysis",
      description: "Analyzes natural blinking patterns in video",
      category: "visual",
      enabled: !!storedFeatures?.eyeBlinkAnalysis
    },
    {
      id: "microExpressions",
      name: "Micro-Expression Detection",
      description: "Detects unnatural facial micro-expressions",
      category: "visual",
      enabled: !!storedFeatures?.microExpressions
    },
    {
      id: "temporalInconsistencies",
      name: "Temporal Analysis",
      description: "Detects frame-by-frame anomalies in videos",
      category: "visual",
      enabled: !!storedFeatures?.temporalInconsistencies
    },
    {
      id: "lightingShadowChecks",
      name: "Lighting Analysis",
      description: "Checks lighting and shadow consistency",
      category: "visual",
      enabled: !!storedFeatures?.lightingShadowChecks
    },
    
    // Audio detection features
    {
      id: "audioGlitchDetection",
      name: "Audio Glitch Detection",
      description: "Identifies unnatural pauses and tones in audio",
      category: "audio",
      enabled: !!storedFeatures?.audioGlitchDetection
    },
    
    // Metadata features
    {
      id: "metadataForensics",
      name: "Metadata Forensics",
      description: "Analyzes EXIF data and editing tool traces",
      category: "metadata",
      enabled: !!storedFeatures?.metadataForensics
    },
    {
      id: "compressionArtifacts",
      name: "Compression Analysis",
      description: "Identifies unusual compression artifacts",
      category: "metadata",
      enabled: !!storedFeatures?.compressionArtifacts
    },
    {
      id: "syntheticFingerprinting",
      name: "Synthetic Fingerprinting",
      description: "Detects synthetic media fingerprints",
      category: "metadata",
      enabled: !!storedFeatures?.syntheticFingerprinting
    },
    
    // Advanced ML features
    {
      id: "multimodalFusion",
      name: "Multimodal Fusion",
      description: "Combines audio-visual-text for comprehensive analysis",
      category: "visual",
      enabled: !!storedFeatures?.multimodalFusion
    },
    {
      id: "adversarialTraining",
      name: "Adversarial Detection",
      description: "Uses adversarial training to detect manipulation",
      category: "visual",
      enabled: !!storedFeatures?.adversarialTraining
    },
    {
      id: "biasMitigation",
      name: "Bias Mitigation",
      description: "Reduces bias in detection algorithms",
      category: "metadata",
      enabled: !!storedFeatures?.biasMitigation
    },
    
    // Verification features
    {
      id: "reverseSearch",
      name: "Reverse Search",
      description: "API-based reverse image/video search",
      category: "verification",
      enabled: !!storedFeatures?.reverseSearch
    },
    {
      id: "blockchainVerification",
      name: "Blockchain Verification",
      description: "Verifies content authenticity via blockchain",
      category: "verification",
      enabled: !!storedFeatures?.blockchainVerification
    },
    {
      id: "userReportAggregation",
      name: "User Reports",
      description: "Aggregates crowdsourced user flags",
      category: "verification",
      enabled: !!storedFeatures?.userReportAggregation
    },
    {
      id: "networkPropagationAnalysis",
      name: "Network Analysis",
      description: "Analyzes content spread and sharing patterns",
      category: "verification",
      enabled: !!storedFeatures?.networkPropagationAnalysis
    },
  ]);
  
  const [draggedFeature, setDraggedFeature] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter features by search query and category
  const filteredFeatures = features.filter(feature => {
    const matchesSearch = !searchQuery || 
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || feature.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle feature drag start
  const handleDragStart = (id: string) => {
    setDraggedFeature(id);
  };
  
  // Handle feature drop
  const handleDrop = (targetId: string) => {
    if (!draggedFeature || draggedFeature === targetId) return;
    
    const updatedFeatures = [...features];
    const draggedIndex = updatedFeatures.findIndex(f => f.id === draggedFeature);
    const targetIndex = updatedFeatures.findIndex(f => f.id === targetId);
    
    const [draggedItem] = updatedFeatures.splice(draggedIndex, 1);
    updatedFeatures.splice(targetIndex, 0, draggedItem);
    
    setFeatures(updatedFeatures);
    setDraggedFeature(null);
  };
  
  // Toggle feature enabled state
  const toggleFeature = (id: string) => {
    setFeatures(prev => 
      prev.map(feature => 
        feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
      )
    );
  };
  
  // Save features configuration
  const saveFeatures = () => {
    const enabledFeatures: Record<string, boolean> = {};
    
    features.forEach(feature => {
      enabledFeatures[feature.id] = feature.enabled;
    });
    
    if (aiService.saveEnabledFeatures) {
      aiService.saveEnabledFeatures(enabledFeatures);
      toast.success("Feature configuration saved");
    }
  };
  
  // Count features by category
  const getCategoryCount = (category: string) => {
    return features.filter(f => f.category === category).length;
  };
  
  // Count enabled features
  const getEnabledCount = () => {
    return features.filter(f => f.enabled).length;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Feature Selection</h2>
          <p className="text-muted-foreground text-sm">
            Drag and drop to reorder features and toggle to enable/disable
          </p>
        </div>
        <Button onClick={saveFeatures} className="gap-2">
          <Save className="h-4 w-4" />
          Save Configuration
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search features..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button 
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("all")}
            className="gap-2"
          >
            All Features
            <Badge variant="outline">{features.length}</Badge>
          </Button>
          <Button 
            variant={activeCategory === "visual" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("visual")}
            className="gap-2"
          >
            Visual
            <Badge variant="outline">{getCategoryCount("visual")}</Badge>
          </Button>
          <Button 
            variant={activeCategory === "audio" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("audio")}
            className="gap-2"
          >
            Audio
            <Badge variant="outline">{getCategoryCount("audio")}</Badge>
          </Button>
          <Button 
            variant={activeCategory === "metadata" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("metadata")}
            className="gap-2"
          >
            Metadata
            <Badge variant="outline">{getCategoryCount("metadata")}</Badge>
          </Button>
          <Button 
            variant={activeCategory === "verification" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("verification")}
            className="gap-2"
          >
            Verification
            <Badge variant="outline">{getCategoryCount("verification")}</Badge>
          </Button>
        </div>
      </div>
      
      <Alert className="bg-primary/5 border-primary/20">
        <Zap className="h-4 w-4 text-primary" />
        <AlertDescription>
          {getEnabledCount()} of {features.length} features enabled. Drag and drop features to reorder them. Click on a feature to toggle it on/off.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredFeatures.map(feature => (
          <Card 
            key={feature.id}
            className={`cursor-pointer transition-all ${feature.enabled ? 'border-primary/50 bg-primary/5' : 'opacity-75'}`}
            draggable
            onDragStart={() => handleDragStart(feature.id)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(feature.id)}
            onClick={() => toggleFeature(feature.id)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{feature.name}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {feature.category}
                </Badge>
              </div>
              <div className={`h-6 w-6 rounded-full ${feature.enabled ? 'bg-green-100' : 'bg-muted'} flex items-center justify-center`}>
                {feature.enabled && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredFeatures.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Search className="mx-auto h-8 w-8 opacity-20 mb-2" />
          <p>No features found matching your criteria</p>
          {searchQuery && (
            <Button 
              variant="link" 
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
