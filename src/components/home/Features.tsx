
import { FeatureCard } from "@/components/ui/feature-card";
import { Camera, Image, Video, AlertTriangle, Info, Search, Link, Flag, Network, FileSearch, Dna, Shield, Brain, FileCode, CloudLightning, Microscope, FileCheck, Rocket, Headphones, User } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Image Analysis",
      description: "Upload images to check for signs of manipulation, face swapping, and other deepfake indicators.",
      icon: <Image className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Video Analysis",
      description: "Analyze videos frame by frame to detect inconsistencies, facial manipulation, and audio tampering.",
      icon: <Video className="h-5 w-5 text-primary" />,
      link: "/video-analysis"
    },
    {
      title: "Live Camera Analysis",
      description: "Use your webcam for real-time deepfake detection and face swap identification.",
      icon: <Camera className="h-5 w-5 text-primary" />,
      link: "/webcam-analysis"
    },
    {
      title: "DNA Sequence Validation",
      description: "Advanced neural network to detect AI-generated synthetic DNA sequences in biotech research.",
      icon: <Dna className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Quantum Hash Timestamping",
      description: "Future-proof hashing algorithms resistant to quantum computing attacks.",
      icon: <Shield className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Neural Implant Authentication",
      description: "Verification system for brain-computer interface data legitimacy.",
      icon: <Brain className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "AI-Generated Legal Doc Scanner",
      description: "Tool to detect synthetic contracts and legal agreements.",
      icon: <FileCode className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Climate Data Forgery Audit",
      description: "System to detect manipulated weather models and climate data.",
      icon: <CloudLightning className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Robotic Motion Analysis",
      description: "Algorithm to detect AI-generated robotic movement patterns.",
      icon: <Microscope className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Political Speech Live Analyzer",
      description: "Real-time detection of AI-generated campaign promises and political speech.",
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Medication Ad Validator",
      description: "System to detect fake drug endorsement videos and medical misinformation.",
      icon: <Video className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Food Origin Blockchain",
      description: "Blockchain system to track and verify food supply chain authenticity.",
      icon: <Link className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Crisis Deepfake Alert",
      description: "Emergency system to detect and flag fake emergency broadcasts.",
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "AI-Generated Patent Check",
      description: "System to identify synthetic inventions in patent filings.",
      icon: <FileCheck className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Space Data Authentication",
      description: "Verification system for satellite and rover media authenticity.",
      icon: <Rocket className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Cultural Heritage Shield",
      description: "System to preserve and verify authenticity of historical media.",
      icon: <Headphones className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Dark Web Synthetic Monitor",
      description: "System to track illegal deepfake distribution on the dark web.",
      icon: <User className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Nanomaterial Blueprint Check",
      description: "Verification system for nanomaterial designs to identify hazardous AI creations.",
      icon: <FileSearch className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    }
  ];

  return (
    <section className="py-16 md:py-24" id="features">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Comprehensive AI Fraud Detection
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Our suite of tools uses advanced AI to identify manipulated media and synthetic content across multiple formats.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
