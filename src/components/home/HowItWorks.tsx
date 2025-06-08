
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Shield, Award } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload or Capture",
      description: "Upload your image, video, audio, or document — or use your webcam to capture live footage for analysis.",
      icon: <FileText className="h-5 w-5 text-primary" />
    },
    {
      number: "02", 
      title: "AI Analysis",
      description: "Our advanced AI models scan for multiple forms of manipulation, synthetic content generation, and fraud indicators.",
      icon: <Shield className="h-5 w-5 text-primary" />
    },
    {
      number: "03",
      title: "Get Results & Verification",
      description: "Receive a detailed report with confidence scores, optional blockchain certification, and tamper-proof verification.",
      icon: <Award className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black dark:text-white">
            How DeepSentinel Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our digital trust platform is simple to use, yet powered by sophisticated AI technology.
          </p>
        </div>
        
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="absolute top-6 left-12 hidden w-full border-t border-dashed border-muted-foreground/30 md:block"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/image-analysis">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
