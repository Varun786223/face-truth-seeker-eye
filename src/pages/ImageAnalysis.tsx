
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import aiService from "@/services/AIService";
import { VerificationResultsPanel } from "@/components/analysis/VerificationResultsPanel";
import { AdvancedResultsPanel } from "@/components/analysis/AdvancedResultsPanel";
import { PDFReportGenerator } from "@/components/analysis/PDFReportGenerator";
import pdfReportService from "@/services/PDFReportService";

const ImageAnalysis = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  
  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    setResults(null);
  };

  const analyzeImages = async () => {
    if (files.length === 0) {
      toast.error("Please upload an image to analyze");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Check if API key is configured
      if (!aiService.isConfigured()) {
        toast.error("Please configure your API key in Settings first");
        setIsAnalyzing(false);
        return;
      }
      
      // Convert file to base64 for analysis
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result as string;
        
        try {
          // Call the AIService to analyze the image
          const analysisResult = await aiService.analyzeImage(base64Image);
          setResults(analysisResult);
          console.log("Analysis result:", analysisResult);
        } catch (error) {
          console.error("Error analyzing image:", error);
          toast.error("Failed to analyze image");
        } finally {
          setIsAnalyzing(false);
        }
      };
      
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        toast.error("Failed to read image file");
        setIsAnalyzing(false);
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Failed to analyze image");
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

  const handleGeneratePDFReport = (options: any) => {
    if (!results) {
      toast.error("No analysis results to generate report");
      return;
    }
    
    pdfReportService.generateReport(results, "image", options)
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
                          <h3 className="text-sm font-medium text-muted-foreground">Confidence Level</h3>
                          <p className="text-2xl font-bold capitalize">{results.confidence}</p>
                        </div>
                        
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Analysis Time</h3>
                          <p className="text-2xl font-bold">{results.analysisTime || "1.5 seconds"}</p>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                        <h3 className="font-medium">Analysis Summary</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {results.deepfakeScore > 70 ? (
                            "This image shows strong indicators of manipulation. Our AI has detected inconsistencies in facial features and lighting that suggest this may be a deepfake. We recommend verifying this content from other sources before sharing."
                          ) : results.deepfakeScore > 30 ? (
                            "This image shows some potential signs of manipulation. While not conclusive, our AI has detected some inconsistencies that may indicate editing or manipulation. We recommend reviewing the detailed analysis for more information."
                          ) : (
                            "This image appears to be authentic. Our AI didn't detect significant signs of manipulation or deepfake artifacts. However, no detection system is 100% accurate, so always exercise caution with sensitive content."
                          )}
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
                        {results.detectionFeatures?.artifactDetection?.detected && (
                          <li>Inconsistent noise patterns across face and background regions</li>
                        )}
                        {results.faceSwapDetected && (
                          <li>Unnatural blending at face boundaries</li>
                        )}
                        {results.detectionFeatures?.lightingShadowChecks?.detected && (
                          <li>Inconsistent lighting direction on facial features</li>
                        )}
                        {results.detectionFeatures?.ganDetection?.detected && (
                          <li>Unusual texture patterns in high-frequency image components</li>
                        )}
                        {results.detectionFeatures?.syntheticFingerprinting?.detected && (
                          <li>Geometric inconsistencies in facial proportions</li>
                        )}
                        {!Object.values(results.detectionFeatures || {}).some((f: any) => f.detected) && (
                          <li>No significant technical indicators of manipulation detected</li>
                        )}
                      </ul>
                      
                      <h3 className="font-medium mt-6">Active Detection Features</h3>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                        {Object.entries(results.detectionFeatures || {}).map(([feature, data]: [string, any]) => (
                          <div key={feature} className="bg-muted/50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <span className="text-sm capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="font-medium text-xs">{data.confidence.toFixed(1)}%</span>
                            </div>
                            <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${data.detected ? 'bg-destructive' : 'bg-green-500'}`}
                                style={{ width: `${data.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
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
                            {results.manipulationAreas && results.manipulationAreas.map((area: any, i: number) => (
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
                  
                  <TabsContent value="verification">
                    <VerificationResultsPanel verificationData={results.verificationData} />
                  </TabsContent>
                  
                  <TabsContent value="advanced">
                    <AdvancedResultsPanel detectionFeatures={results.detectionFeatures} />
                  </TabsContent>
                  
                  <TabsContent value="report">
                    <PDFReportGenerator 
                      analysisResults={results}
                      mediaType="image"
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

export default ImageAnalysis;
