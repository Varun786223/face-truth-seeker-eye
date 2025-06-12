
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, AlertTriangle, CheckCircle, Upload, Zap, Shield } from "lucide-react";
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
          toast.success("Image analysis completed successfully!");
        } catch (error) {
          console.error("Error analyzing image:", error);
          toast.error("Failed to analyze image. Please try again.");
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
      toast.error("Failed to analyze image. Please try again.");
      setIsAnalyzing(false);
    }
  };

  const renderResultIndicator = () => {
    if (!results) return null;
    
    if (results.deepfakeScore > 70) {
      return (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <div>
            <span className="font-semibold text-destructive">High Risk Detected</span>
            <p className="text-sm text-muted-foreground mt-1">This image shows strong signs of AI manipulation</p>
          </div>
        </div>
      );
    } else if (results.deepfakeScore > 30) {
      return (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-50 border border-orange-200 dark:bg-orange-950/20 dark:border-orange-800/30">
          <Info className="h-6 w-6 text-orange-600" />
          <div>
            <span className="font-semibold text-orange-600">Moderate Risk</span>
            <p className="text-sm text-muted-foreground mt-1">Some indicators of possible manipulation detected</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-800/30">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <span className="font-semibold text-green-600">Low Risk</span>
            <p className="text-sm text-muted-foreground mt-1">No significant manipulation detected</p>
          </div>
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                Image Analysis
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload an image to analyze it for signs of deepfake manipulation using advanced AI detection
            </p>
          </div>

          {/* Upload Section */}
          <Card className="mb-8 shadow-lg border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Upload className="h-5 w-5 text-primary" />
                Upload Image for Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload
                accept="image/*"
                onChange={handleFileChange}
                multiple={false}
              />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={analyzeImages}
                  disabled={isAnalyzing || files.length === 0}
                  className="min-w-[160px] h-12 text-base font-medium bg-primary hover:bg-primary/90 shadow-lg"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Analyze Image
                    </>
                  )}
                </Button>
                
                {files.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium">{files[0].name}</span>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {results && (
            <Card className="shadow-lg border-primary/20">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Shield className="h-5 w-5 text-primary" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Result Indicator */}
                <div className="mb-6">
                  {renderResultIndicator()}
                </div>
                
                {/* Tabs for detailed results */}
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-6 h-auto p-1 bg-muted/50">
                    <TabsTrigger value="summary" className="text-xs sm:text-sm py-2">Summary</TabsTrigger>
                    <TabsTrigger value="details" className="text-xs sm:text-sm py-2">Details</TabsTrigger>
                    <TabsTrigger value="visualization" className="text-xs sm:text-sm py-2">Visual</TabsTrigger>
                    <TabsTrigger value="verification" className="text-xs sm:text-sm py-2">Verify</TabsTrigger>
                    <TabsTrigger value="advanced" className="text-xs sm:text-sm py-2">Advanced</TabsTrigger>
                    <TabsTrigger value="report" className="text-xs sm:text-sm py-2">Report</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary" className="space-y-6">
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                      <div className="space-y-3 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-4 sm:p-6 border border-primary/20">
                        <h3 className="text-sm font-medium text-muted-foreground">Deepfake Score</h3>
                        <p className="text-3xl sm:text-4xl font-bold text-primary">{results.deepfakeScore}%</p>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${results.deepfakeScore}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 rounded-lg bg-muted/50 p-4 sm:p-6 border">
                        <h3 className="text-sm font-medium text-muted-foreground">Face Swap Detection</h3>
                        <p className="text-2xl sm:text-3xl font-bold">
                          {results.faceSwapDetected ? "Detected" : "Not Detected"}
                        </p>
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          results.faceSwapDetected ? 'bg-destructive/10 text-destructive' : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {results.faceSwapDetected ? "High Risk" : "Safe"}
                        </div>
                      </div>
                      
                      <div className="space-y-3 rounded-lg bg-muted/50 p-4 sm:p-6 border">
                        <h3 className="text-sm font-medium text-muted-foreground">Confidence Level</h3>
                        <p className="text-2xl sm:text-3xl font-bold capitalize">{results.confidence}</p>
                      </div>
                      
                      <div className="space-y-3 rounded-lg bg-muted/50 p-4 sm:p-6 border">
                        <h3 className="text-sm font-medium text-muted-foreground">Analysis Time</h3>
                        <p className="text-2xl sm:text-3xl font-bold">{results.analysisTime || "1.5s"}</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-primary/10 p-4 sm:p-6 border border-primary/20">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Info className="h-5 w-5 text-primary" />
                        Analysis Summary
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {results.deepfakeScore > 70 ? (
                          "This image shows strong indicators of manipulation. Our AI has detected inconsistencies in facial features and lighting that suggest this may be a deepfake. We recommend verifying this content from other sources before sharing."
                        ) : results.deepfakeScore > 30 ? (
                          "This image shows some potential signs of manipulation. While not conclusive, our AI has detected some inconsistencies that may indicate editing or manipulation. We recommend reviewing the detailed analysis for more information."
                        ) : (
                          "This image appears to be authentic. Our AI didn't detect significant signs of manipulation or deepfake artifacts. However, no detection system is 100% accurate, so always exercise caution with sensitive content."
                        )}
                      </p>
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
    </div>
  );
};

export default ImageAnalysis;
