
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Image, FileText, Headphones, Sparkles, Zap, Globe } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 pattern-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Enhanced badge */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-background border border-primary/20 rounded-full p-4">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Enhanced title with gradient */}
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-6xl md:text-7xl">
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-gradient">
              DeepSentinel
            </span>
            <br />
            <span className="text-foreground text-2xl sm:text-3xl md:text-4xl font-medium">
              Your Digital Reality Scanner
            </span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto leading-relaxed">
            Next-generation digital trust platform that detects, verifies, and protects against all forms of AI-generated synthetic media and digital fraud across multiple formats.
          </p>
          
          {/* Enhanced about section with better design */}
          <div className="bg-gradient-to-r from-muted/40 to-muted/20 backdrop-blur-sm border border-primary/10 p-8 rounded-2xl mb-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-xl">About DeepSentinel</h3>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              DeepSentinel serves as a comprehensive "Reality Scanner" for individuals, businesses, and governments, ensuring digital authenticity in an era of AI-driven deception. Our advanced AI models scan diverse media formats—images, videos, audio, documents, 3D models, and more—to identify manipulation, synthetic content generation, and fraud indicators while providing blockchain-verified certification for authentic content.
            </p>
          </div>
          
          {/* Enhanced capability cards with hover effects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10 max-w-3xl mx-auto">
            <div className="group bg-gradient-to-br from-muted/60 to-muted/30 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-primary/10 rounded-lg p-3 w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Image className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium">Visual Analysis</span>
              <p className="text-xs text-muted-foreground mt-2">Advanced deepfake & manipulation detection</p>
            </div>
            <div className="group bg-gradient-to-br from-muted/60 to-muted/30 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-primary/10 rounded-lg p-3 w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Headphones className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium">Audio Verification</span>
              <p className="text-xs text-muted-foreground mt-2">Voice clone & AI speech detection</p>
            </div>
            <div className="group bg-gradient-to-br from-muted/60 to-muted/30 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-primary/10 rounded-lg p-3 w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium">Document Scanning</span>
              <p className="text-xs text-muted-foreground mt-2">AI-generated text & fraud detection</p>
            </div>
          </div>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/image-analysis" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Analyze Image
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
              <Link to="/video-analysis" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Analyze Video
              </Link>
            </Button>
          </div>
          
          {/* Enhanced social proof with better styling */}
          <div className="flex items-center justify-center gap-4 p-6 bg-muted/30 rounded-xl border border-primary/10">
            <div className="flex -space-x-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative h-12 w-12 bg-primary/10 border-2 border-background rounded-full flex items-center justify-center shadow-lg">
                <span className="text-sm font-medium text-primary">1K+</span>
              </div>
            </div>
            <div className="text-left">
              <span className="text-sm font-medium">Join thousands protecting digital truth</span>
              <p className="text-xs text-muted-foreground">Trusted by users worldwide</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
