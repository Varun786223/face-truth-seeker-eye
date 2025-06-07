import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Shield, AlertTriangle, CheckCircle } from "lucide-react";
export function InteractiveDemoSection() {
  const [activeDemo, setActiveDemo] = useState("deepfake");
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoResult, setDemoResult] = useState<string | null>(null);
  const demos = [{
    id: "deepfake",
    title: "Deepfake Detection",
    description: "See how our AI identifies manipulated faces",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face",
    result: {
      score: 87,
      status: "suspicious",
      confidence: "high"
    }
  }, {
    id: "voice-clone",
    title: "Voice Clone Detection",
    description: "Detect AI-generated speech patterns",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=200&fit=crop",
    result: {
      score: 23,
      status: "authentic",
      confidence: "medium"
    }
  }, {
    id: "document",
    title: "AI Text Detection",
    description: "Identify AI-written content",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
    result: {
      score: 94,
      status: "ai-generated",
      confidence: "high"
    }
  }];
  const runDemo = async () => {
    setIsPlaying(true);
    setDemoResult(null);

    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 2000));
    const demo = demos.find(d => d.id === activeDemo);
    if (demo) {
      setDemoResult(`Analysis complete: ${demo.result.score}% ${demo.result.status}`);
    }
    setIsPlaying(false);
  };
  const resetDemo = () => {
    setIsPlaying(false);
    setDemoResult(null);
  };
  const getStatusIcon = (score: number) => {
    if (score > 70) return <AlertTriangle className="h-5 w-5 text-destructive" />;
    if (score > 30) return <Shield className="h-5 w-5 text-orange-500" />;
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };
  return <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Interactive Demo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See{" "}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-zinc-950">
              AI Detection
            </span>{" "}
            in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience our advanced detection capabilities with live demonstrations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {demos.map(demo => <Button key={demo.id} variant={activeDemo === demo.id ? "default" : "outline"} className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => setActiveDemo(demo.id)}>
                <span className="font-medium">{demo.title}</span>
                <span className="text-xs text-muted-foreground">{demo.description}</span>
              </Button>)}
          </div>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Live Analysis Demo</span>
                <div className="flex gap-2">
                  <Button size="sm" onClick={runDemo} disabled={isPlaying} className="flex items-center gap-2">
                    {isPlaying ? <>
                        <Pause className="h-4 w-4" />
                        Analyzing...
                      </> : <>
                        <Play className="h-4 w-4" />
                        Run Analysis
                      </>}
                  </Button>
                  <Button size="sm" variant="outline" onClick={resetDemo}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="relative">
                    <img src={demos.find(d => d.id === activeDemo)?.image} alt="Demo content" className="w-full h-64 object-cover rounded-lg" />
                    {isPlaying && <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Analysis Results</h4>
                    {demoResult ? <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(demos.find(d => d.id === activeDemo)?.result.score || 0)}
                          <span className="text-sm">{demoResult}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Detection Score</span>
                            <span>{demos.find(d => d.id === activeDemo)?.result.score}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{
                          width: `${demos.find(d => d.id === activeDemo)?.result.score}%`
                        }} />
                          </div>
                        </div>
                      </div> : <p className="text-sm text-muted-foreground">
                        Click "Run Analysis" to see detection results
                      </p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
}