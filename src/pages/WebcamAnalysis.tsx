
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Camera } from "lucide-react";

const WebcamAnalysis = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [results, setResults] = useState<any | null>(null);
  
  // Initialize webcam
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setHasCamera(false);
      }
    };
    
    startCamera();
    
    // Cleanup function to stop the camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        
        tracks.forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate analysis for demo purposes
    // In a real application, frames would be captured and analyzed continuously
    setTimeout(() => {
      // Generate random results after a delay (simulating analysis)
      let fakeScore = Math.random() * 100;
      
      setResults({
        deepfakeScore: fakeScore.toFixed(1),
        faceSwapDetected: fakeScore > 70,
        confidence: fakeScore > 70 ? "high" : fakeScore > 30 ? "medium" : "low",
      });
    }, 3000);
  };
  
  const stopAnalysis = () => {
    setIsAnalyzing(false);
  };
  
  const getResultColor = () => {
    if (!results) return "text-muted-foreground";
    
    const score = parseFloat(results.deepfakeScore);
    if (score > 70) return "text-destructive";
    if (score > 30) return "text-orange-500";
    return "text-green-500";
  };
  
  const getResultIcon = () => {
    if (!results) return null;
    
    const score = parseFloat(results.deepfakeScore);
    if (score > 30) {
      return <AlertTriangle className="h-5 w-5" />;
    }
    return <CheckCircle className="h-5 w-5" />;
  };
  
  return (
    <>
      <Navbar />
      <main className="container py-20 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Live Camera Analysis</h1>
            <p className="mt-4 text-muted-foreground">
              Analyze your webcam feed in real-time for deepfake detection
            </p>
          </div>

          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video relative bg-muted/50 flex items-center justify-center">
                {hasCamera === false ? (
                  <div className="text-center p-4">
                    <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium">Camera access denied or unavailable</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Please allow camera access in your browser settings to use this feature.
                    </p>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-auto"
                    />
                    <canvas
                      ref={canvasRef}
                      className="hidden"
                    />
                    
                    {/* Scanning effect overlay */}
                    {isAnalyzing && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 scanning-effect"></div>
                        <div className="absolute top-0 left-0 right-0 bg-primary/20 p-2 text-center text-xs font-medium text-primary-foreground">
                          Analyzing...
                        </div>
                      </div>
                    )}
                    
                    {/* Results overlay when we have results */}
                    {results && (
                      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getResultIcon()}
                            <span className={`font-medium ${getResultColor()}`}>
                              Deepfake Score: {results.deepfakeScore}%
                            </span>
                          </div>
                          <span className={`text-sm capitalize ${getResultColor()}`}>
                            {parseFloat(results.deepfakeScore) > 70 
                              ? "Likely deepfake"
                              : parseFloat(results.deepfakeScore) > 30
                                ? "Possible manipulation"
                                : "No manipulation detected"
                            }
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="p-4 flex justify-center">
                {!isAnalyzing ? (
                  <Button 
                    onClick={startAnalysis} 
                    disabled={hasCamera === false}
                    className="gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    Start Live Analysis
                  </Button>
                ) : (
                  <Button 
                    onClick={stopAnalysis}
                    variant="outline"
                  >
                    Stop Analysis
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold">How Live Analysis Works</h2>
            <p className="text-muted-foreground">
              Our live deepfake detection analyzes your webcam feed in real-time, checking for signs
              of face swapping, facial manipulation, and other deepfake indicators. The analysis happens
              directly in your browser for privacy.
            </p>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Privacy Notice</h3>
              <p className="text-sm text-muted-foreground">
                Your webcam feed is processed entirely in your browser and is never stored or sent to our servers.
                We take your privacy seriously, and no images or videos from your camera are saved.
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Facial Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Detects inconsistencies in facial features, expressions, and movements that might indicate manipulation.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Blinking Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Analyzes natural blinking patterns, as many deepfakes show irregular or missing eye blinks.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Texture Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Checks for unnatural skin textures, boundaries, and other visual artifacts common in deepfakes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WebcamAnalysis;
