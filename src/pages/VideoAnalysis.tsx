
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const analyzeVideo = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress with intervals
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Mock results - in a real application, this would come from an API call
          setResults({
            deepfakeScore: 65.8,
            faceSwapDetected: true,
            audioManipulated: true,
            confidence: "medium",
            analysisTime: "8.5 seconds",
            frameAnalysis: {
              total: 240,
              suspicious: 78,
              clean: 162
            },
            suspiciousTimeRanges: [
              { start: "00:05", end: "00:12" },
              { start: "00:27", end: "00:34" }
            ]
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 200);
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
                    <span>{progress}%</span>
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
                  <div className="flex items-center gap-2 text-orange-500 font-semibold">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Potential manipulation detected</span>
                  </div>
                </div>
                
                <Tabs defaultValue="summary">
                  <TabsList className="mb-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="frames">Frame Analysis</TabsTrigger>
                    <TabsTrigger value="audio">Audio Analysis</TabsTrigger>
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
                            {results.audioManipulated ? "Detected" : "Not Detected"}
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
                          This video shows moderate indicators of manipulation. Our AI has detected inconsistencies
                          in certain frames and potential audio manipulation. The deepfake score indicates medium
                          confidence in our detection. Please examine the detailed analysis for more information.
                        </p>
                      </div>
                      
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
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="frames">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Frame Analysis</h3>
                        <div className="text-sm text-muted-foreground">
                          Total Frames: {results.frameAnalysis.total}
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Clean Frames</span>
                          </div>
                          <span className="text-sm font-medium">{results.frameAnalysis.clean} ({Math.round(results.frameAnalysis.clean / results.frameAnalysis.total * 100)}%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                            <span className="text-sm">Suspicious Frames</span>
                          </div>
                          <span className="text-sm font-medium">{results.frameAnalysis.suspicious} ({Math.round(results.frameAnalysis.suspicious / results.frameAnalysis.total * 100)}%)</span>
                        </div>
                        
                        <div className="mt-4 h-4 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${Math.round(results.frameAnalysis.clean / results.frameAnalysis.total * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Our frame-by-frame analysis detected inconsistencies in {results.frameAnalysis.suspicious} out of {results.frameAnalysis.total} frames.
                        Suspicious frames show potential signs of face swapping or other manipulations.
                      </p>
                      
                      <div className="bg-muted/30 p-4 rounded-lg mt-4">
                        <h4 className="text-sm font-medium mb-3">Common Issues Detected</h4>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                          <li>Temporal inconsistencies between adjacent frames</li>
                          <li>Unnatural blending at face boundaries</li>
                          <li>Flickering or warping around facial features</li>
                          <li>Inconsistent lighting changes between frames</li>
                          <li>Unusual head movements or eye blinks</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="audio">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-orange-500 font-semibold">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Audio manipulation detected</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Our analysis has detected potential audio manipulation in this video, including possible voice
                        synthesis or splicing. The audio shows signs of artificial generation or editing.
                      </p>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Voice Synthesis</h3>
                          <p className="text-xl font-bold">Detected</p>
                          <p className="text-xs text-muted-foreground">72% confidence</p>
                        </div>
                        
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Audio Splicing</h3>
                          <p className="text-xl font-bold">Suspected</p>
                          <p className="text-xs text-muted-foreground">58% confidence</p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="text-sm font-medium mb-3">Audio Analysis Details</h4>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                          <li>Unnatural voice modulation patterns detected</li>
                          <li>Inconsistent background noise levels</li>
                          <li>Digital artifacts in voice frequencies</li>
                          <li>Irregular breathing patterns</li>
                          <li>Mismatched lip synchronization with audio</li>
                        </ul>
                      </div>
                    </div>
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
