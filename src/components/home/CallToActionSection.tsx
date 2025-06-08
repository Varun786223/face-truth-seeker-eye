
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Zap, Shield, Heart, ArrowRight, Sparkles } from "lucide-react";

export function CallToActionSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Sparkles className="h-3 w-3 mr-1" />
            100% Free Forever
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Start Protecting Digital Truth{" "}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Today
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who trust DeepSentinel to verify their digital content. 
            No registration required, no limits, completely free.
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Instant Analysis</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>No Registration</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Always Free</span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8">
              <Link to="/image-analysis" className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Analyze Image Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 px-8">
              <Link to="/video-analysis" className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Verify Video
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <Card className="max-w-2xl mx-auto border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Community Built</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Open Source</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
