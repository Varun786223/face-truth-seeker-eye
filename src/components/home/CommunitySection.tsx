
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github, MessageCircle, Users, Star, ExternalLink } from "lucide-react";

export function CommunitySection() {
  const communityStats = [
    { label: "Active Users", value: "50K+", icon: <Users className="h-5 w-5" /> },
    { label: "GitHub Stars", value: "12K+", icon: <Star className="h-5 w-5" /> },
    { label: "Community Posts", value: "5K+", icon: <MessageCircle className="h-5 w-5" /> },
    { label: "Contributors", value: "200+", icon: <Github className="h-5 w-5" /> }
  ];

  const communityMembers = [
    {
      name: "Alex Chen",
      role: "Core Contributor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      contribution: "AI Model Optimization"
    },
    {
      name: "Sarah Johnson",
      role: "Security Researcher",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      contribution: "Blockchain Integration"
    },
    {
      name: "Marcus Rodriguez",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      contribution: "User Experience"
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      contribution: "Detection Algorithms"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Open Source Community
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built by the{" "}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of developers, researchers, and security professionals building the future of digital truth
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {communityStats.map((stat, index) => (
            <Card key={index} className="text-center border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="text-primary">
                    {stat.icon}
                  </div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Contributors */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-xl font-semibold text-center mb-8">Featured Contributors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="font-semibold mb-1">{member.name}</h4>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{member.contribution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
              <p className="text-muted-foreground mb-6">
                Contribute to the platform, share ideas, get support, and help shape the future of digital authenticity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  View on GitHub
                  <ExternalLink className="h-3 w-3" />
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Join Discord
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
