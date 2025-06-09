
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/page-transition";
import { AdvancedSettings } from "@/components/settings/AdvancedSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="container py-20 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold sm:text-4xl">Settings</h1>
              <p className="mt-4 text-muted-foreground">
                Configure your DeepSentinel experience
              </p>
            </div>

            <AdvancedSettings />
          </div>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
};

export default Settings;
