
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield } from "lucide-react";

export function CallToActionSection() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-primary/10 animate-gradient"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl animate-float animation-delay-1000"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Start Your Digital Protection Journey</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 leading-tight md:text-5xl text-black dark:text-white">
            Ready to{" "}
            <span className="text-black dark:text-white">
              Secure Truth
            </span>
            <br />
            in the Digital Age?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who trust DeepSentinel to protect their digital content from AI manipulation and fraud.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group px-8 py-4">
              <Link to="/image-analysis" className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Start Free Analysis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 px-8 py-4">
              <Link to="/resources">
                Learn More
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              No Credit Card Required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Instant Results
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Enterprise Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
