
import { FeatureCard } from "@/components/ui/feature-card";
import { Camera, Image, Video, AlertTriangle, Info, Search, Link, Flag, Network } from "lucide-react";

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
      title: "Reverse Image Search",
      description: "Find identical or similar images across the web to verify content authenticity and original sources.",
      icon: <Search className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Blockchain Verification",
      description: "Check digital signatures against blockchain records to verify content provenance and authenticity.",
      icon: <Link className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "User Report Aggregation",
      description: "Leverage crowdsourced flags of suspicious content to enhance deepfake detection capabilities.",
      icon: <Flag className="h-5 w-5 text-primary" />,
      link: "/report"
    },
    {
      title: "Network Propagation Analysis",
      description: "Track how content spreads online to identify suspicious distribution patterns typical of deepfakes.",
      icon: <Network className="h-5 w-5 text-primary" />,
      link: "/image-analysis"
    },
    {
      title: "Report Deepfakes",
      description: "Submit suspected deepfakes with details and source information to help improve our detection systems.",
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
      link: "/report"
    },
    {
      title: "Educational Resources",
      description: "Learn about the latest deepfake technologies, detection methods, and how to protect yourself online.",
      icon: <Info className="h-5 w-5 text-primary" />,
      link: "/resources"
    }
  ];

  return (
    <section className="py-16 md:py-24" id="features">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Comprehensive Deepfake Detection
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Our suite of tools uses advanced AI to identify manipulated media across multiple formats.
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
