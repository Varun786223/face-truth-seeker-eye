
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { APIKeySetup } from "@/components/settings/APIKeySetup";
import { AdvancedDetectionSettings } from "@/components/settings/AdvancedDetectionSettings";
import { FeatureSelectionPanel } from "@/components/settings/FeatureSelectionPanel";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Key, Shield, Info } from "lucide-react";

const Settings = () => {
  return (
    <>
      <Navbar />
      <main className="container py-20 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <SettingsIcon className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold sm:text-4xl">Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Configure your application settings and AI connections for optimal deepfake detection
            </p>
          </div>
          
          <Separator className="my-6" />
          
          <Tabs defaultValue="api" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Keys
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Features
              </TabsTrigger>
              <TabsTrigger value="sensitivity">
                Sensitivity
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                About
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="api" className="space-y-8">
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">AI Configuration</h2>
                  <p className="text-muted-foreground text-sm">
                    Configure your AI provider API keys to enable automatic deepfake detection. 
                    Your keys are stored securely in your browser and never shared.
                  </p>
                </div>
                <APIKeySetup />
              </section>
              
              <Separator />
              
              <section>
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Quick Setup Guide</h3>
                  <div className="rounded-lg bg-muted/30 p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 text-primary w-6 h-6 flex items-center justify-center text-xs font-medium">
                        1
                      </div>
                      <div>
                        <p className="text-sm font-medium">Get your Gemini API key</p>
                        <p className="text-xs text-muted-foreground">
                          Visit Google AI Studio to generate your free API key
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 text-primary w-6 h-6 flex items-center justify-center text-xs font-medium">
                        2
                      </div>
                      <div>
                        <p className="text-sm font-medium">Configure API key above</p>
                        <p className="text-xs text-muted-foreground">
                          Paste your API key in the field above and click Save
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 text-primary w-6 h-6 flex items-center justify-center text-xs font-medium">
                        3
                      </div>
                      <div>
                        <p className="text-sm font-medium">Start analyzing</p>
                        <p className="text-xs text-muted-foreground">
                          Upload images or videos to begin automatic deepfake detection
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-10">
              <section>
                <h2 className="text-xl font-semibold mb-4">Feature Selection</h2>
                <p className="text-muted-foreground mb-6">
                  Configure which deepfake detection features are enabled. Drag and drop to reorder features based on priority.
                </p>
                <FeatureSelectionPanel />
              </section>
            </TabsContent>
            
            <TabsContent value="sensitivity" className="space-y-10">
              <section>
                <h2 className="text-xl font-semibold mb-4">Advanced Detection Settings</h2>
                <AdvancedDetectionSettings />
              </section>
            </TabsContent>
            
            <TabsContent value="about" className="space-y-10">
              <section>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <div className="rounded-lg bg-muted/50 p-6 space-y-4">
                  <div>
                    <h3 className="font-medium">Deepfake Detector</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      This application uses advanced AI models to detect potential deepfakes in images, videos, and live camera feeds.
                      For optimal performance, please configure your Gemini API key in the API Keys section.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Version</p>
                      <p className="text-muted-foreground">1.2.0</p>
                    </div>
                    <div>
                      <p className="font-medium">Last Updated</p>
                      <p className="text-muted-foreground">June 2025</p>
                    </div>
                    <div>
                      <p className="font-medium">AI Provider</p>
                      <p className="text-muted-foreground">Google Gemini</p>
                    </div>
                    <div>
                      <p className="font-medium">Detection Methods</p>
                      <p className="text-muted-foreground">19+ Advanced</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Privacy & Security</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• API keys are stored locally in your browser</li>
                      <li>• No data is sent to third parties without your consent</li>
                      <li>• All analysis is performed using your configured AI provider</li>
                      <li>• No user data is stored on our servers</li>
                    </ul>
                  </div>
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
