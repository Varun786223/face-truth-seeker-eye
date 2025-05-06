
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Report = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      toast({
        title: "Report submitted",
        description: "Thank you for your report. We'll review it shortly.",
      });
    }, 1500);
  };
  
  return (
    <>
      <Navbar />
      <main className="container py-20 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Report a Deepfake</h1>
            <p className="mt-4 text-muted-foreground">
              Help us combat misinformation by reporting suspected deepfakes
            </p>
          </div>

          {!submitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Submit a Report</CardTitle>
                <CardDescription>
                  Please provide details about the suspected deepfake content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="contentType">Content Type</Label>
                    <select 
                      id="contentType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select content type</option>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="url">URL where you found it (if applicable)</Label>
                    <Input id="url" placeholder="https://example.com/content" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Please describe why you believe this content is a deepfake and any other relevant details" 
                      rows={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Upload Evidence (optional)</Label>
                    <FileUpload
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      multiple={true}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      You can upload screenshots, the original content, or other evidence to help us investigate.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email (optional)</Label>
                    <Input id="email" placeholder="email@example.com" type="email" />
                    <p className="text-xs text-muted-foreground">
                      If you'd like to receive updates about your report, please provide your email.
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Report Submitted Successfully</h2>
                  <p className="text-muted-foreground">
                    Thank you for helping to combat deepfakes and misinformation.
                    Our team will review your report as soon as possible.
                  </p>
                  <div className="pt-4">
                    <Button asChild variant="outline">
                      <a href="/">Return to Home</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold">Why Report Deepfakes?</h2>
            <p className="text-muted-foreground">
              Reporting suspected deepfakes helps us:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Combat misinformation and protect public discourse</li>
              <li>Improve our detection algorithms to better identify manipulated media</li>
              <li>Build a database of known deepfakes to train future AI systems</li>
              <li>Protect individuals from having their likeness misused</li>
            </ul>
            
            <div className="bg-muted/30 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-medium mb-3">Privacy Notice</h3>
              <p className="text-sm text-muted-foreground">
                All reports are confidential. If you choose to provide your email, we'll only use it to
                communicate with you about this report. Any media you upload will only be used for
                investigation purposes and to improve our detection systems.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Report;
