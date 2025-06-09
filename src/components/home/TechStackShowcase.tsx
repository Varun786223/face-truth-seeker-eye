
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Database, Lock, Zap, Globe } from "lucide-react";

export function TechStackShowcase() {
  const technologies = [
    {
      icon: <Brain className="h-6 w-6" />,
      name: "Advanced AI Models",
      description: "Neural networks trained on millions of samples",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      name: "Edge Computing",
      description: "Real-time processing at lightning speed",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Database className="h-6 w-6" />,
      name: "Blockchain Verification",
      description: "Immutable proof of authenticity",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      name: "Enterprise Security",
      description: "Military-grade encryption standards",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      name: "Quantum-Ready",
      description: "Future-proof cryptographic algorithms",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      name: "Global CDN",
      description: "Worldwide deployment and accessibility",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Powered by Advanced Technology
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            Built with{" "}
            <span className="text-black dark:text-white">
              Cutting-Edge Tech
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform leverages the latest advancements in AI, blockchain, and security technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group relative bg-background border border-muted rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${tech.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {tech.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors text-black dark:text-white">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
