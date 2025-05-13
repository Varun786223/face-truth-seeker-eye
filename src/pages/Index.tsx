
import { Hero } from "@/components/home/Hero";
import { FeatureCategories } from "@/components/home/FeatureCategories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FAQ } from "@/components/home/FAQ";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AllFeaturesSection } from "@/components/home/AllFeaturesSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* Main Features Categories Section */}
        <FeatureCategories />
        
        {/* All 50 Features with Drag and Drop */}
        <AllFeaturesSection />
        
        {/* How It Works Section */}
        <HowItWorks />
        
        {/* FAQ Section */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
