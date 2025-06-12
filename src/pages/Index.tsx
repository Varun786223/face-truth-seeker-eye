
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
      <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
        <Navbar />
        <main id="main-content" className="flex-grow">
          <div className="container mx-auto mobile-container">
            <BreadcrumbNav />
          </div>
          
          {/* Enhanced Hero Section */}
          <section className="mobile-padding">
            <EnhancedHero />
          </section>
          
          {/* Trust Badges */}
          <section className="mobile-padding">
            <TrustBadges />
          </section>
          
          {/* Live Statistics Counter */}
          <section className="mobile-padding">
            <LiveStatsCounter />
          </section>
          
          {/* Interactive Showcase */}
          <section className="mobile-padding">
            <InteractiveShowcase />
          </section>
          
          {/* Stats Section */}
          <section className="mobile-padding">
            <StatsSection />
          </section>
          
          {/* Interactive Demo Section */}
          <section className="mobile-padding">
            <InteractiveDemoSection />
          </section>
          
          {/* Main Feature Categories */}
          <section className="mobile-padding">
            <FeatureCategories />
          </section>
          
          {/* Complete Feature List */}
          <section className="mobile-padding">
            <FeatureList />
          </section>
          
          {/* Technology Showcase */}
          <section className="mobile-padding">
            <TechStackShowcase />
          </section>
          
          {/* All Features Section with Drag and Drop */}
          <section className="mobile-padding">
            <AllFeaturesSection />
          </section>
          
          {/* Why Choose Us Section */}
          <section className="mobile-padding">
            <WhyChooseUsSection />
          </section>
          
          {/* Testimonials Section */}
          <section className="mobile-padding">
            <TestimonialsSection />
          </section>
          
          {/* Community Section */}
          <section className="mobile-padding">
            <CommunitySection />
          </section>
          
          {/* Open Source Section */}
          <section className="mobile-padding">
            <OpenSourceSection />
          </section>
          
          {/* How It Works */}
          <section className="mobile-padding">
            <HowItWorks />
          </section>
          
          {/* Call to Action */}
          <section className="mobile-padding">
            <CallToActionSection />
          </section>
          
          {/* FAQ Section */}
          <section className="mobile-padding">
            <FAQ />
          </section>
        </main>
        <Footer />
        
        {/* Mobile-optimized floating components */}
        <div className="no-print">
          <FloatingActionButton />
          <PWAInstallPrompt />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
