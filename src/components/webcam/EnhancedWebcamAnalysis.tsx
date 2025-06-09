
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Camera, Square, AlertTriangle, CheckCircle, Eye, Brain } from "lucide-react";
import { toast } from "sonner";

interface DetectionResult {
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  features: {
    faceDetection: number;
    blinkRate: number;
    eyeMovement: number;
    skinTexture: number;
    lighting: number;
  };
  timestamp: string;
}

export function EnhancedWebcamAnalysis() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [results, setResults] = useState<DetectionResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<DetectionResult[]>([]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setCameraError(null);
        toast.success("Camera started successfully");
      }
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError("Unable to access camera. Please check permissions.");
      toast.error("Failed to start camera");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setIsAnalyzing(false);
  };

  const captureFrame = (): string | null => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return null;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const analyzeFrame = async () => {
    if (!isStreaming) return;
    
    const frameData = captureFrame();
    if (!frameData) return;

    // Simulate AI analysis
    const confidence = Math.floor(Math.random() * 40) + 60;
    const riskLevel = confidence > 85 ? "high" : confidence > 65 ? "medium" : "low";
    
    const result: DetectionResult = {
      confidence,
      riskLevel,
      features: {
        faceDetection: Math.floor(Math.random() * 20) + 80,
        blinkRate: Math.floor(Math.random() * 30) + 70,
        eyeMovement: Math.floor(Math.random() * 25) + 75,
        skinTexture: Math.floor(Math.random() * 35) + 65,
        lighting: Math.floor(Math.random() * 20) + 80
      },
      timestamp: new Date().toISOString()
    };

    setResults(result);
    setAnalysisHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    toast.info("Starting real-time analysis");
    
    const interval = setInterval(analyzeFrame, 2000);
    
    // Store interval ID for cleanup
    (window as any).analysisInterval = interval;
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    if ((window as any).analysisInterval) {
      clearInterval((window as any).analysisInterval);
      (window as any).analysisInterval = null;
    }
    toast.info("Analysis stopped");
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "text-destructive";
      case "medium": return "text-orange-500";
      case "low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high": return <AlertTriangle className="h-4 w-4" />;
      case "medium": return <Eye className="h-4 w-4" />;
      case "low": return <CheckCircle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Webcam Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
              {cameraError ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{cameraError}</p>
                  </div>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {isAnalyzing && results && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`flex items-center gap-2 ${getRiskColor(results.riskLevel)}`}>
                            {getRiskIcon(results.riskLevel)}
                            <span className="font-medium">
                              Confidence: {results.confidence}%
                            </span>
                          </div>
                          <Badge variant={results.riskLevel === "high" ? "destructive" : "secondary"}>
                            {results.riskLevel} risk
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Face: {results.features.faceDetection}%</div>
                          <div>Blink: {results.features.blinkRate}%</div>
                          <div>Eyes: {results.features.eyeMovement}%</div>
                          <div>Texture: {results.features.skinTexture}%</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {isAnalyzing && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="default" className="bg-red-500">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
                        ANALYZING
                      </Badge>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-2 justify-center">
              {!isStreaming ? (
                <Button onClick={startCamera}>
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button onClick={stopCamera} variant="outline">
                    <Square className="h-4 w-4 mr-2" />
                    Stop Camera
                  </Button>
                  {!isAnalyzing ? (
                    <Button onClick={startAnalysis}>
                      <Brain className="h-4 w-4 mr-2" />
                      Start Analysis
                    </Button>
                  ) : (
                    <Button onClick={stopAnalysis} variant="destructive">
                      <Square className="h-4 w-4 mr-2" />
                      Stop Analysis
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {analysisHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {analysisHistory.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    {getRiskIcon(result.riskLevel)}
                    <span className="text-sm">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${getRiskColor(result.riskLevel)}`}>
                      {result.confidence}%
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {result.riskLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
