
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { APIKeySetup } from "@/components/settings/APIKeySetup";
import { AdvancedDetectionSettings } from "@/components/settings/AdvancedDetectionSettings";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <>
      <Navbar />
      <main className="container py-20 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold sm:text-4xl">Settings</h1>
            <p className="mt-4 text-muted-foreground">
              Configure your application settings and AI connections
            </p>
          </div>
          
          <Separator className="my-6" />
          
          <Tabs defaultValue="api">
            <TabsList className="mb-6 w-full md:w-auto">
              <TabsTrigger value="api">API Configuration</TabsTrigger>
              <TabsTrigger value="features">Detection Features</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="api" className="space-y-10">
              <section>
                <h2 className="text-xl font-semibold mb-4">AI Configuration</h2>
                <APIKeySetup />
              </section>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-10">
              <section>
                <h2 className="text-xl font-semibold mb-4">Advanced Detection Settings</h2>
                <AdvancedDetectionSettings />
              </section>
            </TabsContent>
            
            <TabsContent value="about" className="space-y-10">
              <section>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <div className="rounded-lg bg-muted/50 p-6">
                  <h3 className="font-medium">Deepfake Detector</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    This application uses advanced AI models to detect potential deepfakes in images, videos, and live camera feeds.
                    For optimal performance, please configure your Gemini API key.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Version: 1.1.0
                  </p>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Settings;
