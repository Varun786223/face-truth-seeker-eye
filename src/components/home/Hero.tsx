
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Image, FileText, Headphones } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 pattern-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="gradient-text">DeepSentinel</span> - Your Digital Reality Scanner
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Our advanced AI platform detects, verifies, and protects against all forms of AI-generated synthetic media and digital fraud across multiple formats.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 max-w-2xl mx-auto">
            <div className="bg-muted/40 rounded-lg p-4 flex flex-col items-center">
              <Image className="h-8 w-8 mb-2 text-primary" />
              <span className="text-sm font-medium">Visual Analysis</span>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 flex flex-col items-center">
              <Headphones className="h-8 w-8 mb-2 text-primary" />
              <span className="text-sm font-medium">Audio Verification</span>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 flex flex-col items-center">
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <span className="text-sm font-medium">Document Scanning</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/image-analysis">
                Analyze Image
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/video-analysis">
                Analyze Video
              </Link>
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white -ml-6">
              <img
                src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white -ml-6">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">Join thousands of people protecting digital truth</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
