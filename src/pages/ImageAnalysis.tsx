
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/page-transition";
import { RealFileAnalyzer } from "@/components/analysis/RealFileAnalyzer";
import { SmartFileAnalyzer } from "@/components/analysis/SmartFileAnalyzer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ImageAnalysis = () => {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="container py-20 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold sm:text-4xl">Image Analysis</h1>
              <p className="mt-4 text-muted-foreground">
                Advanced AI-powered deepfake detection for images
              </p>
            </div>

            <Tabs defaultValue="upload" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
                <TabsTrigger value="smart">Smart Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload">
                <RealFileAnalyzer />
              </TabsContent>
              
              <TabsContent value="smart">
                <SmartFileAnalyzer />
              </TabsContent>
            </Tabs>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Face Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Advanced facial recognition and manipulation detection using state-of-the-art AI models.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Metadata Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive examination of image metadata for signs of tampering or artificial generation.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pattern Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Machine learning algorithms detect subtle patterns that indicate AI-generated content.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
};

export default ImageAnalysis;
