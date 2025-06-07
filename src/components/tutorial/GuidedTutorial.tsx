
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, ChevronLeft, ChevronRight, Play, CheckCircle, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  content: React.ReactNode;
  action?: {
    type: "click" | "upload" | "navigate";
    target: string;
    description: string;
  };
}

interface GuidedTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function GuidedTutorial({ isOpen, onClose, onComplete }: GuidedTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const tutorialSteps: TutorialStep[] = [
    {
      id: "welcome",
      title: "Welcome to DeepSential",
      description: "Let's take a quick tour of our AI-powered deepfake detection platform",
      content: (
        <div className="space-y-4">
          <p>DeepSential uses advanced AI algorithms to detect manipulated media content.</p>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">What you'll learn:</h4>
            <ul className="text-sm space-y-1">
              <li>• How to upload and analyze files</li>
              <li>• Understanding analysis results</li>
              <li>• Using advanced features</li>
              <li>• Managing your analysis history</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "upload",
      title: "Upload Your First File",
      description: "Learn how to upload images or videos for analysis",
      content: (
        <div className="space-y-4">
          <p>You can upload files in several ways:</p>
          <div className="grid grid-cols-1 gap-3">
            <div className="border rounded-lg p-3">
              <h5 className="font-medium">Drag & Drop</h5>
              <p className="text-sm text-muted-foreground">Simply drag files onto the upload area</p>
            </div>
            <div className="border rounded-lg p-3">
              <h5 className="font-medium">Click to Browse</h5>
              <p className="text-sm text-muted-foreground">Click the upload button to select files</p>
            </div>
            <div className="border rounded-lg p-3">
              <h5 className="font-medium">Batch Upload</h5>
              <p className="text-sm text-muted-foreground">Upload multiple files at once</p>
            </div>
          </div>
        </div>
      ),
      action: {
        type: "upload",
        target: "file-upload",
        description: "Try uploading a sample file"
      }
    },
    {
      id: "analysis",
      title: "Understanding Analysis Results",
      description: "Learn how to interpret the AI analysis results",
      content: (
        <div className="space-y-4">
          <p>Our AI provides detailed analysis results:</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge className="bg-green-500">Authentic</Badge>
              <div>
                <p className="font-medium">Authentic Content</p>
                <p className="text-sm text-muted-foreground">No signs of manipulation detected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge className="bg-red-500">Modified</Badge>
              <div>
                <p className="font-medium">Modified Content</p>
                <p className="text-sm text-muted-foreground">AI manipulation detected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge variant="outline">Inconclusive</Badge>
              <div>
                <p className="font-medium">Inconclusive</p>
                <p className="text-sm text-muted-foreground">Unable to determine with confidence</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "features",
      title: "Advanced Features",
      description: "Discover powerful analysis tools",
      content: (
        <div className="space-y-4">
          <p>Explore our advanced detection features:</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="border rounded-lg p-3">
              <h5 className="font-medium text-sm">Facial Analysis</h5>
              <p className="text-xs text-muted-foreground">Detect face swaps and modifications</p>
            </div>
            <div className="border rounded-lg p-3">
              <h5 className="font-medium text-sm">Voice Clone Detection</h5>
              <p className="text-xs text-muted-foreground">Identify AI-generated voices</p>
            </div>
            <div className="border rounded-lg p-3">
              <h5 className="font-medium text-sm">Metadata Analysis</h5>
              <p className="text-xs text-muted-foreground">Check file origin and history</p>
            </div>
            <div className="border rounded-lg p-3">
              <h5 className="font-medium text-sm">Blockchain Verification</h5>
              <p className="text-xs text-muted-foreground">Verify content authenticity</p>
            </div>
          </div>
        </div>
      ),
      action: {
        type: "navigate",
        target: "/image-analysis",
        description: "Visit the Image Analysis page to see these features"
      }
    },
    {
      id: "dashboard",
      title: "Your Analysis Dashboard",
      description: "Manage your analysis history and bookmarks",
      content: (
        <div className="space-y-4">
          <p>Your dashboard helps you:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Track analysis history</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Bookmark important results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Export detailed reports</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Search and filter results</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "complete",
      title: "You're All Set!",
      description: "Start analyzing media content with confidence",
      content: (
        <div className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p>Congratulations! You've completed the tutorial.</p>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Next Steps:</h4>
            <ul className="text-sm space-y-1">
              <li>• Upload your first file for analysis</li>
              <li>• Explore different analysis features</li>
              <li>• Check out the blockchain verification tools</li>
              <li>• Visit the resources section for more information</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    onComplete();
    onClose();
  };

  const skipTutorial = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              Getting Started Tutorial
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Step {currentStep + 1} of {tutorialSteps.length}
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tutorial Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Current Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{tutorialSteps[currentStep].title}</CardTitle>
              <p className="text-muted-foreground">{tutorialSteps[currentStep].description}</p>
            </CardHeader>
            <CardContent>
              {tutorialSteps[currentStep].content}
              
              {tutorialSteps[currentStep].action && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Try it out:</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    {tutorialSteps[currentStep].action!.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={skipTutorial}>
                Skip Tutorial
              </Button>
              {currentStep > 0 && (
                <Button variant="outline" onClick={prevStep} className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
              )}
            </div>

            <Button onClick={nextStep} className="gap-2">
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Complete Tutorial
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
