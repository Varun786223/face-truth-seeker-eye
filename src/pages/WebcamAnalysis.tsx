
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/page-transition";
import { EnhancedWebcamAnalysis } from "@/components/webcam/EnhancedWebcamAnalysis";

const WebcamAnalysis = () => {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="container py-20 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold sm:text-4xl">Live Camera Analysis</h1>
              <p className="mt-4 text-muted-foreground">
                Real-time deepfake detection using your webcam
              </p>
            </div>

            <EnhancedWebcamAnalysis />
            
            <div className="mt-12 space-y-4">
              <h2 className="text-xl font-bold">Privacy & Security</h2>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Your Privacy is Protected</h3>
                <p className="text-sm text-muted-foreground">
                  All webcam analysis happens directly in your browser. No video data is transmitted to our servers. 
                  Your camera feed remains completely private and secure.
                </p>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
};

export default WebcamAnalysis;
