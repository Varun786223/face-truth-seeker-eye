
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeatureCategories } from "@/components/home/FeatureCategories";
import { AllFeaturesSection } from "@/components/home/AllFeaturesSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FAQ } from "@/components/home/FAQ";
import { FeatureList } from "@/components/home/FeatureList";
import { StatsSection } from "@/components/home/StatsSection";
import { TechStackShowcase } from "@/components/home/TechStackShowcase";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { InteractiveDemoSection } from "@/components/home/InteractiveDemoSection";
import { LiveStatsCounter } from "@/components/home/LiveStatsCounter";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/10">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Trust Badges */}
        <TrustBadges />
        
        {/* Live Statistics Counter */}
        <LiveStatsCounter />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Interactive Demo Section */}
        <InteractiveDemoSection />
        
        {/* Main Feature Categories */}
        <FeatureCategories />
        
        {/* Complete Feature List */}
        <FeatureList />
        
        {/* Technology Showcase */}
        <TechStackShowcase />
        
        {/* All Features Section with Drag and Drop */}
        <AllFeaturesSection />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Call to Action */}
        <CallToActionSection />
        
        {/* FAQ Section */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
