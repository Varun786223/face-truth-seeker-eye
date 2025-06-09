
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
import { InteractiveShowcase } from "@/components/home/InteractiveShowcase";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { OpenSourceSection } from "@/components/home/OpenSourceSection";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { SEOHead } from "@/components/ui/seo-head";
import { PWAInstallPrompt } from "@/components/ui/pwa-install-prompt";
import { AccessibilityHelper } from "@/components/ui/accessibility-helper";

const Index = () => {
  return (
    <ErrorBoundary>
      <SEOHead />
      <AccessibilityHelper />
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main id="main-content" className="flex-grow">
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
          
          {/* Why Choose Us Section (replaces pricing) */}
          <WhyChooseUsSection />
          
          {/* Testimonials Section */}
          <TestimonialsSection />
          
          {/* Community Section */}
          <CommunitySection />
          
          {/* Open Source Section */}
          <OpenSourceSection />
          
          {/* How It Works */}
          <HowItWorks />
          
          {/* Call to Action */}
          <CallToActionSection />
          
          {/* FAQ Section */}
          <FAQ />
        </main>
        <Footer />
        
        {/* Phase 4 Components */}
        <FloatingActionButton />
        <PWAInstallPrompt />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
