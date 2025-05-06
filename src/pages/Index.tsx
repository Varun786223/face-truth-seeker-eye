
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FAQ } from "@/components/home/FAQ";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
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
