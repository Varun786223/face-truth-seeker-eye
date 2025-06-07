
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnhancedHero } from "@/components/home/EnhancedHero";
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
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { InteractiveShowcase } from "@/components/home/InteractiveShowcase";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const Index = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4">
            <BreadcrumbNav />
          </div>
          
          {/* Enhanced Hero Section */}
          <EnhancedHero />
          
          {/* Trust Badges */}
          <TrustBadges />
          
          {/* Live Statistics Counter */}
          <LiveStatsCounter />
          
          {/* Interactive Showcase */}
          <InteractiveShowcase />
          
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
          
          {/* Testimonials Section */}
          <TestimonialsSection />
          
          {/* Pricing Section */}
          <PricingSection />
          
          {/* How It Works */}
          <HowItWorks />
          
          {/* Call to Action */}
          <CallToActionSection />
          
          {/* FAQ Section */}
          <FAQ />
        </main>
        <Footer />
        
        {/* Floating Action Button */}
        <FloatingActionButton />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
