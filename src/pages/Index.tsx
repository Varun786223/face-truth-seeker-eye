
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FAQ } from "@/components/home/FAQ";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Index;
