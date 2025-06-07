import { useEffect, useState } from "react";
import { Shield, Users, Scan, Award } from "lucide-react";
export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    const section = document.getElementById('stats-section');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const stats = [{
    icon: <Shield className="h-8 w-8" />,
    value: "99.9%",
    label: "Detection Accuracy",
    description: "AI-powered precision"
  }, {
    icon: <Users className="h-8 w-8" />,
    value: "50K+",
    label: "Active Users",
    description: "Worldwide protection"
  }, {
    icon: <Scan className="h-8 w-8" />,
    value: "1M+",
    label: "Files Analyzed",
    description: "Media verified daily"
  }, {
    icon: <Award className="h-8 w-8" />,
    value: "24/7",
    label: "Real-time Protection",
    description: "Continuous monitoring"
  }];
  return <section id="stats-section" className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000 opacity-40"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-black">
              Thousands Worldwide
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join the global community protecting digital authenticity with cutting-edge AI technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => <div key={index} className={`group relative bg-background/60 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 text-center hover:border-primary/30 hover:bg-background/80 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{
          animationDelay: `${index * 150}ms`
        }}>
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}