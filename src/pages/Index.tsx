
import { Hero } from "@/components/home/Hero";
import { FeatureCategories } from "@/components/home/FeatureCategories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FAQ } from "@/components/home/FAQ";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureCategories />
        <HowItWorks />
        
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="bg-primary/5 rounded-xl p-8 border border-primary/10 text-center">
              <h2 className="text-2xl font-semibold mb-4">Start Protecting Your Content Today</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                DeepSentinel offers comprehensive protection against all types of AI fraud. 
                Try our advanced analysis tools with your content now.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <a href="/image-analysis">
                    <Shield className="h-5 w-5" />
                    Try Image Analysis
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/video-analysis">
                    Try Video Analysis
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Index;
