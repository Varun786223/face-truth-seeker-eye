
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Image, FileText, Headphones, Sparkles, Zap, Globe, Play, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EnhancedHero() {
  const [currentDemo, setCurrentDemo] = useState(0);
  
  const demoItems = [
    { type: "Deepfake Detection", accuracy: "99.7%", color: "from-red-500 to-pink-500" },
    { type: "Voice Clone Analysis", accuracy: "98.9%", color: "from-blue-500 to-cyan-500" },
    { type: "AI Text Detection", accuracy: "99.2%", color: "from-green-500 to-emerald-500" },
    { type: "Document Verification", accuracy: "97.8%", color: "from-purple-500 to-violet-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32 pattern-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-float"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Enhanced badge */}
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-background border border-primary/20 rounded-full p-3">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-primary">AI Detection Platform</div>
                <div className="text-xs text-muted-foreground">Trusted by 50K+ users</div>
              </div>
            </div>
            
            {/* Enhanced title */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-gradient">
                  DeepSentinel
                </span>
                <br />
                <span className="text-foreground text-xl sm:text-2xl md:text-3xl font-medium">
                  Your Digital Reality Scanner
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Next-generation digital trust platform that detects, verifies, and protects against all forms of AI-generated synthetic media and digital fraud.
              </p>
            </div>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/image-analysis" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Start Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
                <Link to="#demo" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>
            
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1M+</div>
                <div className="text-xs text-muted-foreground">Files Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">Protection</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Interactive Demo */}
          <div className="relative">
            <Card className="border-primary/20 overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Live Detection Demo</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">Live</span>
                    </div>
                  </div>
                  
                  <div className="relative h-48 bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${demoItems[currentDemo].color} bg-clip-text text-transparent`}>
                          {demoItems[currentDemo].type}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Accuracy: {demoItems[currentDemo].accuracy}
                        </div>
                      </div>
                    </div>
                    
                    {/* Scanning effect */}
                    <div className="absolute inset-0 scanning-effect opacity-50"></div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {demoItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentDemo(index)}
                        className={`p-2 rounded text-xs transition-all ${
                          index === currentDemo 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {item.type.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
