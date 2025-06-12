
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BreadcrumbNav />
          </div>
          
          {/* Enhanced Hero Section */}
          <section className="py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <EnhancedHero />
            </div>
          </section>
          
          {/* Trust Badges */}
          <section className="py-6 sm:py-8 lg:py-12 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <TrustBadges />
            </div>
          </section>
          
          {/* Live Statistics Counter */}
          <section className="py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <LiveStatsCounter />
            </div>
          </section>
          
          {/* Interactive Showcase */}
          <section className="py-8 sm:py-12 lg:py-16 bg-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <InteractiveShowcase />
            </div>
          </section>
          
          {/* Stats Section */}
          <section className="py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <StatsSection />
            </div>
          </section>
          
          {/* Interactive Demo Section */}
          <section className="py-8 sm:py-12 lg:py-16 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <InteractiveDemoSection />
            </div>
          </section>
          
          {/* Main Feature Categories */}
          <section className="py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <FeatureCategories />
            </div>
          </section>
          
          {/* Complete Feature List */}
          <section className="py-8 sm:py-12 lg:py-16 bg-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <FeatureList />
            </div>
          </section>
          
          {/* Technology Showcase */}
          <section className="py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <TechStackShowcase />
            </div>
          </section>
          
          {/* All Features Section with Drag and Drop */}
          <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <AllFeaturesSection />
            </div>
          </section>
          
          {/* Why Choose Us Section */}
          <section className="py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <WhyChooseUsSection />
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="py-8 sm:py-12 lg:py-16 bg-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <TestimonialsSection />
            </div>
          </section>
          
          {/* Community Section */}
          <section className="py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <CommunitySection />
            </div>
          </section>
          
          {/* Open Source Section */}
          <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <OpenSourceSection />
            </div>
          </section>
          
          {/* How It Works */}
          <section className="py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <HowItWorks />
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="py-8 sm:py-12 lg:py-16 bg-primary/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <CallToActionSection />
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-8 sm:py-12 lg:py-16 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <FAQ />
            </div>
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
