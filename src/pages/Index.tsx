
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FAQ } from "@/components/home/FAQ";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Settings, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        
        <div className="container py-12">
          <div className="mx-auto max-w-4xl">
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h2 className="text-2xl font-semibold mb-4">Advanced Detection Features</h2>
              <p className="text-muted-foreground mb-6">
                Our deepfake detector now includes 15+ specialized detection techniques including:
              </p>
              
              <div className="grid gap-3 md:grid-cols-3 mb-6">
                <div className="bg-background rounded-lg p-3 border">
                  <h3 className="font-medium text-sm mb-2">Artifact Detection</h3>
                  <p className="text-xs text-muted-foreground">Identifies GAN fingerprints and blurring inconsistencies</p>
                </div>
                
                <div className="bg-background rounded-lg p-3 border">
                  <h3 className="font-medium text-sm mb-2">Lip-Sync Analysis</h3>
                  <p className="text-xs text-muted-foreground">Detects mismatches between lip movements and speech</p>
                </div>
                
                <div className="bg-background rounded-lg p-3 border">
                  <h3 className="font-medium text-sm mb-2">Eye Blink Analysis</h3>
                  <p className="text-xs text-muted-foreground">Analyzes natural vs unnatural eye blinking patterns</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="gap-2">
                  <Link to="/settings">
                    <Settings className="h-4 w-4" />
                    Configure Detection Features
                  </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <Link to="/image-analysis">
                    <Shield className="h-4 w-4" />
                    Try Advanced Detection
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container py-12">
          <div className="mx-auto max-w-xl text-center">
            <div className="rounded-xl bg-muted/50 p-6">
              <h2 className="text-lg font-semibold mb-2">AI-Powered Analysis</h2>
              <p className="text-muted-foreground mb-4">
                Configure your Gemini API key to enable accurate deepfake detection results
              </p>
              <Button asChild>
                <Link to="/settings" className="inline-flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configure API Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
