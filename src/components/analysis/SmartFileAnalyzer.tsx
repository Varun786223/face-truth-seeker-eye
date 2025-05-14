
import { useState, useEffect } from "react";
import { File } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SmartFileAnalyzerProps {
  onFeatureSuggestion?: (featureId: string) => void;
}

export function SmartFileAnalyzer({ onFeatureSuggestion }: SmartFileAnalyzerProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileType, setFileType] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestedFeatures, setSuggestedFeatures] = useState<Array<{id: string, name: string, description: string, confidence: number}>>([]);

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) {
      setFiles([]);
      setFileType(null);
      setSuggestedFeatures([]);
      return;
    }
    
    setFiles(newFiles);
    const file = newFiles[0];
    
    // Detect file type
    if (file.type.startsWith('image/')) {
      setFileType('image');
    } else if (file.type.startsWith('video/')) {
      setFileType('video');
    } else if (file.type.startsWith('audio/')) {
      setFileType('audio');
    } else if (file.type === 'application/pdf' || file.type.includes('document')) {
      setFileType('document');
    } else {
      setFileType('unknown');
    }
  };

  useEffect(() => {
    if (!fileType) return;
    
    setAnalyzing(true);
    // Simulate analysis time
    const timer = setTimeout(() => {
      // Generate suggested features based on file type
      switch (fileType) {
        case 'image':
          setSuggestedFeatures([
            { id: 'image-deepfake', name: 'Image Deepfake Detection', description: 'Analyze for face swaps and manipulations', confidence: 95 },
            { id: 'gan-artifact', name: 'GAN Artifact Detection', description: 'Find telltale signs of AI generation', confidence: 87 },
            { id: 'metadata-check', name: 'Metadata Analysis', description: 'Verify image metadata integrity', confidence: 82 }
          ]);
          break;
        case 'video':
          setSuggestedFeatures([
            { id: 'video-deepfake', name: 'Video Deepfake Detection', description: 'Frame-by-frame deepfake analysis', confidence: 94 },
            { id: 'audio-sync', name: 'Audio-Visual Sync Check', description: 'Detect lip-sync inconsistencies', confidence: 88 },
            { id: 'motion-analysis', name: 'Motion Artifact Analysis', description: 'Identify unnatural movements', confidence: 79 }
          ]);
          break;
        case 'audio':
          setSuggestedFeatures([
            { id: 'voice-clone', name: 'Voice Clone Detection', description: 'Detect AI-cloned voices', confidence: 92 },
            { id: 'audio-splicing', name: 'Audio Splicing Analysis', description: 'Find editing artifacts in audio', confidence: 85 },
            { id: 'speech-pattern', name: 'Speech Pattern Analysis', description: 'Analyze for unnatural speech patterns', confidence: 78 }
          ]);
          break;
        case 'document':
          setSuggestedFeatures([
            { id: 'text-ai', name: 'AI-Written Text Detection', description: 'Identify AI-generated content', confidence: 90 },
            { id: 'document-forgery', name: 'Document Forgery Check', description: 'Detect document tampering', confidence: 83 },
            { id: 'linguistic-analysis', name: 'Linguistic Pattern Analysis', description: 'Analyze writing style consistency', confidence: 76 }
          ]);
          break;
        default:
          setSuggestedFeatures([
            { id: 'general-analysis', name: 'General Content Analysis', description: 'Basic analysis for unknown file types', confidence: 65 }
          ]);
      }
      setAnalyzing(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [fileType]);

  const handleFeatureSelect = (featureId: string) => {
    if (onFeatureSuggestion) {
      onFeatureSuggestion(featureId);
    } else {
      toast.info(`Selected feature: ${suggestedFeatures.find(f => f.id === featureId)?.name}`);
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <File className="h-5 w-5 text-primary" />
          Smart File Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileUpload
          onChange={handleFileChange}
          accept="*/*"
          multiple={false}
        />
        
        {analyzing && (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-muted-foreground">Analyzing file contents...</p>
          </div>
        )}
        
        {!analyzing && suggestedFeatures.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Recommended Analysis Features</h3>
            <div className="space-y-3">
              {suggestedFeatures.map((feature) => (
                <div key={feature.id} className="p-3 rounded-lg border flex justify-between items-start hover:border-primary/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{feature.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {feature.confidence}% match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleFeatureSelect(feature.id)}
                  >
                    Select
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="pt-2">
              <Link to="/resources" className="text-sm text-primary hover:underline">
                Learn more about our analysis techniques
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
