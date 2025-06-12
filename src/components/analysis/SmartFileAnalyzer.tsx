
import { useState, useEffect } from "react";
import { File, Upload, X, AlertTriangle, CheckCircle, Info, Zap } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface SmartFileAnalyzerProps {
  onFeatureSuggestion?: (featureId: string) => void;
}

interface FileAnalysis {
  fileName: string;
  fileSize: string;
  fileType: string;
  riskLevel: "low" | "medium" | "high";
  confidence: number;
  threats: string[];
  recommendations: string[];
}

export function SmartFileAnalyzer({ onFeatureSuggestion }: SmartFileAnalyzerProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileType, setFileType] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [fileAnalysis, setFileAnalysis] = useState<FileAnalysis | null>(null);
  const [suggestedFeatures, setSuggestedFeatures] = useState<Array<{id: string, name: string, description: string, confidence: number, priority: "high" | "medium" | "low"}>>([]);

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) {
      setFiles([]);
      setFileType(null);
      setSuggestedFeatures([]);
      setFileAnalysis(null);
      return;
    }
    
    setFiles(newFiles);
    const file = newFiles[0];
    
    // Enhanced file type detection
    if (file.type.startsWith('image/')) {
      setFileType('image');
    } else if (file.type.startsWith('video/')) {
      setFileType('video');
    } else if (file.type.startsWith('audio/')) {
      setFileType('audio');
    } else if (file.type === 'application/pdf' || file.type.includes('document')) {
      setFileType('document');
    } else if (file.type.includes('zip') || file.type.includes('archive')) {
      setFileType('archive');
    } else {
      setFileType('unknown');
    }
  };

  const removeFile = () => {
    setFiles([]);
    setFileType(null);
    setSuggestedFeatures([]);
    setFileAnalysis(null);
  };

  useEffect(() => {
    if (!fileType || files.length === 0) return;
    
    setAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate progressive analysis
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 300);
    
    // Simulate analysis time
    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      const file = files[0];
      
      // Generate detailed file analysis
      const mockAnalysis: FileAnalysis = {
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        fileType: fileType,
        riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        confidence: Math.floor(Math.random() * 30) + 70,
        threats: [],
        recommendations: []
      };

      // Add threats based on risk level
      if (mockAnalysis.riskLevel === 'high') {
        mockAnalysis.threats = ['Potential deepfake signatures detected', 'Unusual metadata patterns', 'Suspicious file origin'];
        mockAnalysis.recommendations = ['Run comprehensive deepfake analysis', 'Verify file source', 'Check blockchain verification'];
      } else if (mockAnalysis.riskLevel === 'medium') {
        mockAnalysis.threats = ['Minor inconsistencies found', 'Metadata anomalies'];
        mockAnalysis.recommendations = ['Perform standard verification', 'Review file history'];
      } else {
        mockAnalysis.threats = [];
        mockAnalysis.recommendations = ['File appears safe', 'Optional: Run basic verification'];
      }

      setFileAnalysis(mockAnalysis);
      
      // Generate suggested features based on file type and analysis
      let features: Array<{id: string, name: string, description: string, confidence: number, priority: "high" | "medium" | "low"}> = [];
      
      switch (fileType) {
        case 'image':
          features = [
            { id: 'image-deepfake', name: 'Advanced Deepfake Detection', description: 'AI-powered facial manipulation analysis', confidence: 95, priority: mockAnalysis.riskLevel === 'high' ? 'high' : 'medium' },
            { id: 'gan-artifact', name: 'GAN Artifact Detection', description: 'Identify AI-generated image signatures', confidence: 87, priority: 'high' },
            { id: 'metadata-check', name: 'Metadata Forensics', description: 'Analyze image metadata for tampering', confidence: 82, priority: 'medium' },
            { id: 'lighting-analysis', name: 'Lighting & Shadow Analysis', description: 'Check for lighting inconsistencies', confidence: 78, priority: 'low' }
          ];
          break;
        case 'video':
          features = [
            { id: 'video-deepfake', name: 'Video Deepfake Detection', description: 'Frame-by-frame deepfake analysis', confidence: 94, priority: 'high' },
            { id: 'audio-sync', name: 'Audio-Visual Sync Check', description: 'Detect lip-sync inconsistencies', confidence: 88, priority: 'high' },
            { id: 'motion-analysis', name: 'Motion Artifact Analysis', description: 'Identify unnatural movements', confidence: 79, priority: 'medium' },
            { id: 'compression-analysis', name: 'Compression Forensics', description: 'Analyze video compression patterns', confidence: 71, priority: 'low' }
          ];
          break;
        case 'audio':
          features = [
            { id: 'voice-clone', name: 'Voice Clone Detection', description: 'Detect AI-cloned voices', confidence: 92, priority: 'high' },
            { id: 'audio-splicing', name: 'Audio Splicing Analysis', description: 'Find editing artifacts in audio', confidence: 85, priority: 'medium' },
            { id: 'speech-pattern', name: 'Speech Pattern Analysis', description: 'Analyze for unnatural speech patterns', confidence: 78, priority: 'medium' },
            { id: 'background-noise', name: 'Background Noise Analysis', description: 'Check for artificial background sounds', confidence: 65, priority: 'low' }
          ];
          break;
        case 'document':
          features = [
            { id: 'text-ai', name: 'AI-Generated Text Detection', description: 'Identify AI-written content', confidence: 90, priority: 'high' },
            { id: 'document-forgery', name: 'Document Forgery Check', description: 'Detect document tampering', confidence: 83, priority: 'high' },
            { id: 'linguistic-analysis', name: 'Linguistic Pattern Analysis', description: 'Analyze writing style consistency', confidence: 76, priority: 'medium' },
            { id: 'plagiarism-check', name: 'Plagiarism Detection', description: 'Check for copied content', confidence: 70, priority: 'low' }
          ];
          break;
        default:
          features = [
            { id: 'general-analysis', name: 'General Content Analysis', description: 'Basic analysis for unknown file types', confidence: 65, priority: 'medium' },
            { id: 'hash-verification', name: 'File Hash Verification', description: 'Verify file integrity', confidence: 85, priority: 'high' }
          ];
      }
      
      setSuggestedFeatures(features);
      setAnalyzing(false);
      toast.success("File analysis completed!");
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [fileType, files]);

  const handleFeatureSelect = (featureId: string) => {
    if (onFeatureSuggestion) {
      onFeatureSuggestion(featureId);
    } else {
      const feature = suggestedFeatures.find(f => f.id === featureId);
      toast.success(`Selected: ${feature?.name}`);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800/30';
      case 'low': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800/30';
      default: return 'text-muted-foreground bg-muted/50 border-muted';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Info className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <File className="h-5 w-5 text-primary" />
          Smart File Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {files.length === 0 ? (
          <div className="space-y-4">
            <FileUpload
              onChange={handleFileChange}
              accept="*/*"
              multiple={false}
            />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Upload any file to get intelligent analysis and feature recommendations
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3">
                <File className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{files[0].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(files[0].size / 1024 / 1024).toFixed(2)} MB • {fileType}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile} className="hover:bg-destructive/10 hover:text-destructive">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {analyzing && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary animate-pulse" />
                    Analyzing file...
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="w-full h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  Running content analysis, metadata extraction, and threat detection...
                </p>
              </div>
            )}

            {fileAnalysis && !analyzing && (
              <div className="space-y-6">
                <div className="p-4 sm:p-6 border rounded-lg bg-muted/30 space-y-4">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Analysis Complete
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Risk Level</span>
                        <Badge className={getRiskLevelColor(fileAnalysis.riskLevel)}>
                          {getRiskIcon(fileAnalysis.riskLevel)}
                          <span className="ml-1 capitalize">{fileAnalysis.riskLevel}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Confidence</span>
                        <span className="text-sm font-medium">{fileAnalysis.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  {fileAnalysis.threats.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-destructive">Potential Threats</h5>
                      <ul className="space-y-1">
                        {fileAnalysis.threats.map((threat, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-destructive flex-shrink-0" />
                            {threat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {fileAnalysis.recommendations.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-green-600">Recommendations</h5>
                      <ul className="space-y-1">
                        {fileAnalysis.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        {!analyzing && suggestedFeatures.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Recommended Analysis Features</h3>
            <div className="space-y-3">
              {suggestedFeatures
                .sort((a, b) => {
                  const priorityOrder = { high: 3, medium: 2, low: 1 };
                  return priorityOrder[b.priority] - priorityOrder[a.priority];
                })
                .map((feature) => (
                <div key={feature.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 bg-card">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground">{feature.name}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            feature.priority === 'high' ? 'border-red-200 text-red-600 dark:border-red-800 dark:text-red-400' : 
                            feature.priority === 'medium' ? 'border-orange-200 text-orange-600 dark:border-orange-800 dark:text-orange-400' : 
                            'border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400'
                          }`}
                        >
                          {feature.priority} priority
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {feature.confidence}% match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleFeatureSelect(feature.id)}
                      variant={feature.priority === 'high' ? 'default' : 'outline'}
                      className="flex-shrink-0"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-border">
              <Link to="/resources" className="text-sm text-primary hover:underline font-medium">
                Learn more about our analysis techniques →
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
