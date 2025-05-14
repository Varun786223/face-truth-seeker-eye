
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { features } from "@/data/features";
import { toast } from "sonner";
import { ArrowLeft, FileCheck, Loader2, Shield } from "lucide-react";

const FeaturePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feature, setFeature] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    // Find the feature by ID
    const foundFeature = features.find(f => f.id === id);
    
    if (foundFeature) {
      setFeature(foundFeature);
      document.title = `${foundFeature.title} | Analysis Platform`;
    } else {
      // If feature not found, redirect to 404
      navigate("/not-found", { replace: true });
    }
  }, [id, navigate]);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    setResults(null);
    
    if (newFiles.length > 0) {
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
    }
  };

  const handleAnalyze = () => {
    if (files.length === 0) {
      toast.error("Please upload files to analyze");
      return;
    }

    setIsLoading(true);
    
    // Simulate analysis process
    toast.info(`Analyzing ${files.length} files using ${feature?.title}...`, {
      duration: 2000,
    });
    
    // Simulated analysis with timeout
    setTimeout(() => {
      setIsLoading(false);
      
      // Generate mock results based on the feature
      const mockResults = {
        score: Math.floor(Math.random() * 100),
        confidence: Math.random() > 0.5 ? "high" : "medium",
        detectionFeatures: {
          artifactDetection: { detected: Math.random() > 0.5, confidence: Math.random() * 100 },
          facialInconsistencies: { detected: Math.random() > 0.5, confidence: Math.random() * 100 },
          metadataAnalysis: { detected: Math.random() > 0.5, confidence: Math.random() * 100 }
        },
        analysisTime: `${(Math.random() * 10).toFixed(1)} seconds`,
        verificationData: {
          verified: Math.random() > 0.7,
          source: Math.random() > 0.5 ? "Blockchain verification" : "Unknown source"
        }
      };
      
      setResults(mockResults);
      toast.success(`Analysis complete using ${feature?.title}`);
    }, 3000);
  };

  if (!feature) {
    return (
      <>
        <Navbar />
        <div className="container py-20 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="mb-10">
            <h1 className="text-3xl font-bold sm:text-4xl">{feature.title}</h1>
            <p className="mt-4 text-muted-foreground">
              {feature.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Files for Analysis</CardTitle>
                  <CardDescription>
                    Use this feature to analyze your content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload 
                    accept="*/*" 
                    multiple={true}
                    onChange={handleFileChange}
                  />
                  
                  <div className="mt-6">
                    <Button 
                      onClick={handleAnalyze}
                      disabled={isLoading || files.length === 0}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze Files
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="mt-4 bg-muted/20 p-3 rounded-md">
                      <h3 className="text-sm font-medium mb-2">Files Ready for Analysis:</h3>
                      <div className="max-h-40 overflow-y-auto">
                        {files.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 py-1 text-sm">
                            <FileCheck className="h-4 w-4" />
                            <span className="truncate">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {results && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="summary">
                      <TabsList className="mb-4">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="verification">Verification</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="summary">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Analysis Score</h3>
                            <p className="text-2xl font-bold">{results.score}%</p>
                          </div>
                          
                          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Confidence</h3>
                            <p className="text-2xl font-bold capitalize">{results.confidence}</p>
                          </div>
                          
                          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Analysis Time</h3>
                            <p className="text-2xl font-bold">{results.analysisTime}</p>
                          </div>
                          
                          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                            <p className="text-2xl font-bold">
                              {results.score > 50 ? "Suspicious" : "Clear"}
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="details">
                        <div className="space-y-4">
                          <h3 className="font-medium">Detection Features</h3>
                          <div className="grid gap-2">
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
                      
                      <TabsContent value="verification">
                        <div className="space-y-4">
                          <div className={`p-4 rounded-md ${results.verificationData.verified ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
                            <h3 className="font-medium">
                              {results.verificationData.verified ? "Verified Content" : "Unverified Content"}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Source: {results.verificationData.source}
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Feature Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-primary/10 p-3 rounded-md flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-md">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium text-sm">Problem Solved:</h3>
                    <p className="text-sm text-muted-foreground mt-1">{feature.problem || "This feature addresses specific analysis needs in content verification."}</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium text-sm">How It Works:</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      This feature analyzes uploaded content using advanced AI algorithms to detect inconsistencies, patterns, and other indicators relevant to content verification.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FeaturePage;
