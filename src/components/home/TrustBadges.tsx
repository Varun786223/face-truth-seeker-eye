
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Verified, Lock, Star, Globe } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: <Shield className="h-5 w-5" />,
      text: "SOC 2 Certified",
      color: "text-green-600 bg-green-50 border-green-200"
    },
    {
      icon: <Award className="h-5 w-5" />,
      text: "AI Excellence Award",
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      icon: <Verified className="h-5 w-5" />,
      text: "ISO 27001 Compliant",
      color: "text-purple-600 bg-purple-50 border-purple-200"
    },
    {
      icon: <Lock className="h-5 w-5" />,
      text: "GDPR Compliant",
      color: "text-orange-600 bg-orange-50 border-orange-200"
    },
    {
      icon: <Star className="h-5 w-5" />,
      text: "5-Star Security Rating",
      color: "text-yellow-600 bg-yellow-50 border-yellow-200"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      text: "Globally Trusted",
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    }
  ];

  return (
    <section className="py-12 border-y bg-muted/20">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            TRUSTED & CERTIFIED BY INDUSTRY STANDARDS
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((badge, index) => (
            <Badge
              key={index}
              variant="outline"
              className={`px-4 py-2 font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${badge.color}`}
            >
              {badge.icon}
              <span className="ml-2">{badge.text}</span>
            </Badge>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            Protecting digital authenticity with enterprise-grade security and compliance
          </p>
        </div>
      </div>
    </section>
  );
}
