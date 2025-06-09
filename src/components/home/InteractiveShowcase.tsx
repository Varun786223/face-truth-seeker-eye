
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Zap, Shield, Eye, Brain, Target, Sparkles } from "lucide-react";

export function InteractiveShowcase() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const demos = [
    {
      title: "Real-time Detection",
      description: "Watch as our AI analyzes content in real-time",
      icon: <Eye className="h-6 w-6" />,
      color: "bg-blue-500",
      progress: 85
    },
    {
      title: "Multi-layer Analysis", 
      description: "Deep learning models working together",
      icon: <Brain className="h-6 w-6" />,
      color: "bg-purple-500",
      progress: 92
    },
    {
      title: "Precision Targeting",
      description: "Identifying specific manipulation techniques", 
      icon: <Target className="h-6 w-6" />,
      color: "bg-green-500",
      progress: 78
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            <Sparkles className="h-4 w-4 mr-2" />
            Interactive Demo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            See Our AI in{" "}
            <span className="text-black dark:text-white">
              Action
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the power of our detection algorithms with this interactive demonstration
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-black dark:text-white">
                <Shield className="h-5 w-5 text-primary" />
                AI Detection Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Demo Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button 
                  variant={isPlaying ? "secondary" : "default"} 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? "Pause Demo" : "Start Demo"}
                </Button>
                <Button variant="outline" onClick={() => setIsPlaying(false)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Demo Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {demos.map((demo, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md ${activeDemo === index ? 'ring-2 ring-primary shadow-lg' : ''}`} 
                    onClick={() => setActiveDemo(index)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${demo.color} text-white mb-3`}>
                        {demo.icon}
                      </div>
                      <h3 className="font-semibold mb-2 text-black dark:text-white">{demo.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{demo.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Confidence</span>
                          <span className="text-black dark:text-white font-medium">{demo.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${isPlaying && activeDemo === index ? demo.color : 'bg-muted-foreground/30'}`} 
                            style={{
                              width: isPlaying && activeDemo === index ? `${demo.progress}%` : '0%'
                            }} 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Status Display */}
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className={`h-5 w-5 ${isPlaying ? 'text-green-500 animate-pulse' : 'text-muted-foreground'}`} />
                  <span className="font-medium text-black dark:text-white">
                    {isPlaying ? 'Analysis in Progress...' : 'Ready to Analyze'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isPlaying ? `Processing ${demos[activeDemo].title.toLowerCase()}...` : 'Click "Start Demo" to begin the interactive analysis'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
