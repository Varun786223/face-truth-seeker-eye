
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";

const ImageAnalysis = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  
  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    setResults(null);
  };

  const analyzeImages = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis with a timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Mock results - in a real application, this would come from an API call
      setResults({
        deepfakeScore: 87.2,
        faceSwapDetected: true,
        manipulationAreas: [
          { x: 30, y: 45, width: 100, height: 120, confidence: 0.89 },
          { x: 150, y: 75, width: 80, height: 90, confidence: 0.76 }
        ],
        confidence: "high",
        analysisTime: "1.2 seconds"
      });
    }, 2000);
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
          <span>Some signs of possible manipulation</span>
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

  return (
    <>
      <Navbar />
      <main className="container py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Image Analysis</h1>
            <p className="mt-4 text-muted-foreground">
              Upload an image to analyze it for signs of deepfake manipulation
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <FileUpload
                accept="image/*"
                onChange={handleFileChange}
                multiple={false}
              />
              
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={analyzeImages}
                  disabled={isAnalyzing || files.length === 0}
                  className="min-w-[150px]"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                </Button>
              </div>
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
                    <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
                    <TabsTrigger value="visualization">Visualization</TabsTrigger>
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
                          <h3 className="text-sm font-medium text-muted-foreground">Confidence Level</h3>
                          <p className="text-2xl font-bold capitalize">{results.confidence}</p>
                        </div>
                        
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Analysis Time</h3>
                          <p className="text-2xl font-bold">{results.analysisTime}</p>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                        <h3 className="font-medium">Analysis Summary</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          This image shows strong indicators of manipulation. Our AI has detected inconsistencies in facial
                          features and lighting that suggest this may be a deepfake. We recommend verifying this content
                          from other sources before sharing.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details">
                    <div className="space-y-4">
                      <h3 className="font-medium">Technical Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Our analysis has detected the following technical indicators of manipulation:
                      </p>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                        <li>Inconsistent noise patterns across face and background regions</li>
                        <li>Unnatural blending at face boundaries</li>
                        <li>Inconsistent lighting direction on facial features</li>
                        <li>Unusual texture patterns in high-frequency image components</li>
                        <li>Geometric inconsistencies in facial proportions</li>
                      </ul>
                      
                      <h3 className="font-medium mt-6">Manipulation Areas</h3>
                      <p className="text-sm text-muted-foreground">
                        We've identified {results.manipulationAreas.length} primary areas with signs of manipulation:
                      </p>
                      <ul className="space-y-2 text-sm">
                        {results.manipulationAreas.map((area: any, i: number) => (
                          <li key={i} className="bg-muted/50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <span>Area {i+1}</span>
                              <span className="font-medium">{(area.confidence * 100).toFixed(1)}% confidence</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Position: x:{area.x}, y:{area.y}, width:{area.width}, height:{area.height}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="visualization">
                    <div className="text-center p-6">
                      <div className="mx-auto max-w-md relative mb-4">
                        {files.length > 0 && (
                          <div className="relative">
                            <img
                              src={URL.createObjectURL(files[0])}
                              alt="Analyzed"
                              className="w-full h-auto rounded-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20 rounded-lg scanning-effect pointer-events-none"></div>
                            
                            {/* Visualization overlays for detected manipulation areas */}
                            {results.manipulationAreas.map((area: any, i: number) => (
                              <div
                                key={i}
                                className="absolute border-2 border-destructive rounded-md bg-destructive/20 animate-pulse-slow"
                                style={{
                                  left: `${area.x}px`,
                                  top: `${area.y}px`,
                                  width: `${area.width}px`,
                                  height: `${area.height}px`
                                }}
                              ></div>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        This visualization highlights potential areas of manipulation detected in the image.
                      </p>
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

export default ImageAnalysis;
