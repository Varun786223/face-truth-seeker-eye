
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, X, Lightbulb, Zap, Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureHint {
  id: string;
  element: string;
  title: string;
  description: string;
  category: "basic" | "advanced" | "pro";
  priority: "high" | "medium" | "low";
}

interface FeatureDiscoveryProps {
  showHints: boolean;
  onToggleHints: () => void;
}

export function FeatureDiscovery({ showHints, onToggleHints }: FeatureDiscoveryProps) {
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(new Set());
  const [activeHint, setActiveHint] = useState<string | null>(null);

  const featureHints: FeatureHint[] = [
    {
      id: "smart-analyzer",
      element: "smart-file-analyzer",
      title: "Smart File Analyzer",
      description: "Our AI automatically detects file type and suggests the best analysis features for your content.",
      category: "basic",
      priority: "high"
    },
    {
      id: "batch-processing",
      element: "batch-upload",
      title: "Batch Processing",
      description: "Upload multiple files at once and process them simultaneously to save time.",
      category: "advanced",
      priority: "high"
    },
    {
      id: "confidence-scoring",
      element: "confidence-display",
      title: "AI Confidence Scoring",
      description: "Each analysis comes with a confidence percentage showing how certain our AI is about the result.",
      category: "basic",
      priority: "medium"
    },
    {
      id: "blockchain-verification",
      element: "blockchain-features",
      title: "Blockchain Verification",
      description: "Verify content authenticity using decentralized blockchain technology for ultimate trust.",
      category: "pro",
      priority: "high"
    },
    {
      id: "export-reports",
      element: "export-pdf",
      title: "Professional Reports",
      description: "Generate detailed PDF reports with analysis results, perfect for legal or business use.",
      category: "advanced",
      priority: "medium"
    },
    {
      id: "real-time-webcam",
      element: "webcam-analysis",
      title: "Real-time Analysis",
      description: "Analyze live video streams in real-time to detect deepfakes as they happen.",
      category: "pro",
      priority: "high"
    }
  ];

  const visibleHints = featureHints.filter(hint => !dismissedHints.has(hint.id));

  const dismissHint = (hintId: string) => {
    setDismissedHints(prev => new Set([...prev, hintId]));
    if (activeHint === hintId) {
      setActiveHint(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "basic":
        return <HelpCircle className="h-4 w-4 text-blue-500" />;
      case "advanced":
        return <Zap className="h-4 w-4 text-orange-500" />;
      case "pro":
        return <Star className="h-4 w-4 text-purple-500" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "basic":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "advanced":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "pro":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {/* Toggle Button */}
        <Button
          onClick={onToggleHints}
          variant={showHints ? "default" : "outline"}
          size="sm"
          className="gap-2 shadow-lg"
        >
          <Lightbulb className="h-4 w-4" />
          {showHints ? "Hide Hints" : "Show Hints"}
        </Button>

        {/* Feature Hints Panel */}
        {showHints && visibleHints.length > 0 && (
          <Card className="w-80 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Feature Tips
                </h4>
                <Badge variant="outline" className="text-xs">
                  {visibleHints.length} tips
                </Badge>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {visibleHints
                  .sort((a, b) => {
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                  })
                  .map((hint) => (
                    <div
                      key={hint.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(hint.category)}
                          <span className="font-medium text-sm">{hint.title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissHint(hint.id)}
                          className="h-auto p-1"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2">
                        {hint.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getCategoryColor(hint.category)}`}>
                          {hint.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            hint.priority === 'high' ? 'border-red-200 text-red-600' :
                            hint.priority === 'medium' ? 'border-orange-200 text-orange-600' :
                            'border-gray-200 text-gray-600'
                          }`}
                        >
                          {hint.priority} priority
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>

              {visibleHints.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">All tips dismissed!</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Floating Tooltips for Specific Elements */}
      {showHints && (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="fixed top-20 right-4 z-40 pointer-events-none">
                <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full animate-pulse">
                  New!
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Check out our latest AI improvements!</p>
            </TooltipContent>
          </Tooltip>
        </>
      )}
    </TooltipProvider>
  );
}
