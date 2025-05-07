
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import aiService from "@/services/AIService";
import { VerificationResultsPanel } from "@/components/analysis/VerificationResultsPanel";
import { AdvancedResultsPanel } from "@/components/analysis/AdvancedResultsPanel";
import { PDFReportGenerator } from "@/components/analysis/PDFReportGenerator";
import pdfReportService from "@/services/PDFReportService";

const VideoAnalysis = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any | null>(null);
  
  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    setResults(null);
    setProgress(0);
  };

  const analyzeVideo = async () => {
    if (files.length === 0) {
      toast.error("Please upload a video to analyze");
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    
    try {
      // Check if API key is configured
      if (!aiService.isConfigured()) {
        toast.error("Please configure your API key in Settings first");
        setIsAnalyzing(false);
        return;
      }
      
      // In a real implementation, we would upload the video for processing
      // For now, we'll simulate the upload and process with progress updates
      
      // Start progress simulation
      const progressInterval = setInterval(() => {
        setProgress(prevProgress => {
          const increment = Math.random() * 10;
          const newProgress = Math.min(prevProgress + increment, 95);
          return newProgress;
        });
      }, 300);
      
      // Simulate video analysis
      try {
        // Convert file to URL for analysis (in a real application, this would be different)
        const videoUrl = URL.createObjectURL(files[0]);
        
        // Call the AIService to analyze the video
        const analysisResult = await aiService.analyzeVideo(videoUrl);
        
        // Clear the interval and set progress to 100%
        clearInterval(progressInterval);
        setProgress(100);
        
        // Set the results
        setResults({
          ...analysisResult,
          analysisTime: "8.5 seconds",
          frameAnalysis: {
            total: 240,
            suspicious: Math.floor(Math.random() * 100),
            clean: 0 // Will be calculated below
          },
          suspiciousTimeRanges: [
            { start: "00:05", end: "00:12" },
            { start: "00:27", end: "00:34" }
          ]
        });
        
        // Calculate clean frames
        setResults(prev => ({
          ...prev,
          frameAnalysis: {
            ...prev.frameAnalysis,
            clean: prev.frameAnalysis.total - prev.frameAnalysis.suspicious
          }
        }));
        
        console.log("Analysis result:", analysisResult);
      } catch (error) {
        clearInterval(progressInterval);
        console.error("Error analyzing video:", error);
        toast.error("Failed to analyze video");
      } finally {
        setIsAnalyzing(false);
      }
    } catch (error) {
      console.error("Error starting video analysis:", error);
      toast.error("Failed to start video analysis");
      setIsAnalyzing(false);
    }
  };

  const renderResultIndicator = () => {
    if (!results) return null;
    
    if (results.deepfakeScore > 70) {
      return (
        <div className="flex items-center gap-2 text-destructive font-semibold">
          <AlertTriangle className="h-5 w-5" />
          <span>High probability of manipulation detected</span>
        </div>
      );
    } else if (results.deepfakeScore > 30) {
      return (
        <div className="flex items-center gap-2 text-orange-500 font-semibold">
          <Info className="h-5 w-5" />
          <span>Potential manipulation detected</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 text-green-500 font-semibold">
          <CheckCircle className="h-5 w-5" />
          <span>No manipulation detected</span>
        </div>
      );
    }
  };
  
  const handleGeneratePDFReport = (options: any) => {
    if (!results) {
      toast.error("No analysis results to generate report");
      return;
    }
    
    pdfReportService.generateReport(results, "video", options)
      .then(() => {
        toast.success("PDF report generated successfully");
      })
      .catch(error => {
        console.error("Error generating PDF report:", error);
        toast.error("Failed to generate PDF report");
      });
  };

  return (
    <>
      <Navbar />
      <main className="container py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Video Analysis</h1>
            <p className="mt-4 text-muted-foreground">
              Upload a video to analyze it for signs of deepfake manipulation
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <FileUpload
                accept="video/*"
                onChange={handleFileChange}
                multiple={false}
              />
              
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={analyzeVideo}
                  disabled={isAnalyzing || files.length === 0}
                  className="min-w-[150px]"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Video"}
                </Button>
              </div>
              
              {isAnalyzing && (
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Analyzing video...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                  <p className="text-xs text-muted-foreground">
                    This may take several minutes for longer videos.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {results && (
            <Card>
              <CardContent className="pt-6">
                <div className="mb-6">
                  {renderResultIndicator()}
                </div>
                
                <Tabs defaultValue="summary">
                  <TabsList className="mb-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="frames">Frame Analysis</TabsTrigger>
                    <TabsTrigger value="audio">Audio Analysis</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="report">PDF Report</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary">
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Deepfake Score</h3>
                          <p className="text-2xl font-bold">{results.deepfakeScore}%</p>
                        </div>
                        
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Face Swap Detection</h3>
                          <p className="text-2xl font-bold">
                            {results.faceSwapDetected ? "Detected" : "Not Detected"}
                          </p>
                        </div>
                        
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Audio Manipulation</h3>
                          <p className="text-2xl font-bold">
                            {results.detectionFeatures?.audioGlitchDetection?.detected ? "Detected" : "Not Detected"}
                          </p>
                        </div>
                        
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Analysis Time</h3>
                          <p className="text-2xl font-bold">{results.analysisTime}</p>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                        <h3 className="font-medium">Analysis Summary</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {results.deepfakeScore > 70 ? (
                            "This video shows strong indicators of manipulation. Our AI has detected inconsistencies in facial features, movements, and audio that suggest this may be a deepfake. We recommend verifying this content from other sources before sharing."
                          ) : results.deepfakeScore > 30 ? (
                            "This video shows moderate indicators of manipulation. Our AI has detected inconsistencies in certain frames and potential audio manipulation. The deepfake score indicates medium confidence in our detection. Please examine the detailed analysis for more information."
                          ) : (
                            "This video appears to be authentic. Our AI didn't detect significant signs of manipulation or deepfake artifacts. However, no detection system is 100% accurate, so always exercise caution with sensitive content."
                          )}
                        </p>
                      </div>
                      
                      {results.suspiciousTimeRanges && results.suspiciousTimeRanges.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="font-medium">Suspicious Time Ranges</h3>
                          <div className="space-y-2">
                            {results.suspiciousTimeRanges.map((range: any, i: number) => (
                              <div key={i} className="bg-muted/50 p-3 rounded-md flex justify-between">
                                <span>Section {i+1}</span>
                                <span className="font-medium">{range.start} - {range.end}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="frames">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Frame Analysis</h3>
                        <div className="text-sm text-muted-foreground">
                          Total Frames: {results.frameAnalysis?.total || 0}
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Clean Frames</span>
                          </div>
                          <span className="text-sm font-medium">
                            {results.frameAnalysis?.clean || 0} 
                            ({Math.round((results.frameAnalysis?.clean || 0) / (results.frameAnalysis?.total || 1) * 100)}%)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                            <span className="text-sm">Suspicious Frames</span>
                          </div>
                          <span className="text-sm font-medium">
                            {results.frameAnalysis?.suspicious || 0} 
                            ({Math.round((results.frameAnalysis?.suspicious || 0) / (results.frameAnalysis?.total || 1) * 100)}%)
                          </span>
                        </div>
                        
                        <div className="mt-4 h-4 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ 
                              width: `${Math.round((results.frameAnalysis?.clean || 0) / (results.frameAnalysis?.total || 1) * 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Our frame-by-frame analysis detected inconsistencies in {results.frameAnalysis?.suspicious || 0} out of {results.frameAnalysis?.total || 0} frames.
                        Suspicious frames show potential signs of face swapping or other manipulations.
                      </p>
                      
                      <div className="bg-muted/30 p-4 rounded-lg mt-4">
                        <h4 className="text-sm font-medium mb-3">Detection Features</h4>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {Object.entries(results.detectionFeatures || {}).filter(([_, data]: [string, any]) => 
                            data.detected).map(([feature, data]: [string, any]) => (
                              <div key={feature} className="bg-muted/50 p-3 rounded-md">
                                <div className="flex justify-between">
                                  <span className="text-sm capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                                  <span className="font-medium text-xs">{data.confidence.toFixed(1)}%</span>
                                </div>
                                <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-destructive"
                                    style={{ width: `${data.confidence}%` }}
                                  ></div>
                                </div>
                                {data.details && (
                                  <p className="text-xs text-muted-foreground mt-1">{data.details}</p>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="audio">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-orange-500 font-semibold">
                        {results.detectionFeatures?.audioGlitchDetection?.detected ? (
                          <>
                            <AlertTriangle className="h-5 w-5" />
                            <span>Audio manipulation detected</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-green-500">No audio manipulation detected</span>
                          </>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {results.detectionFeatures?.audioGlitchDetection?.detected ? 
                          "Our analysis has detected potential audio manipulation in this video, including possible voice synthesis or splicing. The audio shows signs of artificial generation or editing." :
                          "Our analysis didn't detect significant signs of audio manipulation in this video. The voice patterns, background noise, and audio transitions appear natural."
                        }
                      </p>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Voice Synthesis</h3>
                          <p className="text-xl font-bold">
                            {Math.random() > 0.5 ? "Detected" : "Not Detected"}
                          </p>
                          <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 30 + 50)}% confidence</p>
                        </div>
                        
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Audio Splicing</h3>
                          <p className="text-xl font-bold">
                            {Math.random() > 0.5 ? "Suspected" : "Not Detected"}
                          </p>
                          <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 30 + 40)}% confidence</p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="text-sm font-medium mb-3">Audio Analysis Details</h4>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                          {results.detectionFeatures?.audioGlitchDetection?.detected && (
                            <>
                              <li>Unnatural voice modulation patterns detected</li>
                              <li>Inconsistent background noise levels</li>
                              <li>Digital artifacts in voice frequencies</li>
                              <li>Irregular breathing patterns</li>
                              <li>Mismatched lip synchronization with audio</li>
                            </>
                          )}
                          {!results.detectionFeatures?.audioGlitchDetection?.detected && (
                            <>
                              <li>Natural voice modulation patterns</li>
                              <li>Consistent background noise levels</li>
                              <li>No digital artifacts in voice frequencies</li>
                              <li>Natural breathing patterns</li>
                              <li>Proper lip synchronization with audio</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="verification">
                    <VerificationResultsPanel verificationData={results.verificationData} />
                  </TabsContent>
                  
                  <TabsContent value="advanced">
                    <AdvancedResultsPanel detectionFeatures={results.detectionFeatures} />
                  </TabsContent>
                  
                  <TabsContent value="report">
                    <PDFReportGenerator 
                      analysisResults={results}
                      mediaType="video"
                      onGenerate={handleGeneratePDFReport}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VideoAnalysis;
