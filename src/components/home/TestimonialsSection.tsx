import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Security Analyst",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "DeepSentinel caught a sophisticated deepfake attack that could have compromised our entire security infrastructure. The accuracy is incredible.",
      rating: 5,
      verified: true
    },
    {
      name: "Marcus Rodriguez",
      role: "Digital Forensics Expert",
      company: "CyberGuard Inc",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "The blockchain verification feature gives us immutable proof of authenticity. It's revolutionary for legal evidence handling.",
      rating: 5,
      verified: true
    },
    {
      name: "Dr. Emily Watson",
      role: "AI Research Director",
      company: "Innovation Labs",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      content: "As an AI researcher, I'm impressed by the detection capabilities. It's staying ahead of even the latest generation models.",
      rating: 5,
      verified: true
    },
    {
      name: "James Liu",
      role: "Media Verification Specialist",
      company: "NewsGuard",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "Essential tool for modern journalism. We've prevented multiple misinformation campaigns using DeepSentinel's analysis.",
      rating: 5,
      verified: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Trusted by Professionals
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our{" "}
            <span className="text-black dark:text-white">
              Users Say
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of security professionals, researchers, and organizations protecting digital authenticity
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="relative">
                <Quote className="absolute top-0 left-0 h-8 w-8 text-primary/20 -translate-x-2 -translate-y-2" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      <blockquote className="text-lg md:text-xl leading-relaxed">
                        "{testimonials[activeTestimonial].content}"
                      </blockquote>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonials[activeTestimonial].image} />
                        <AvatarFallback>
                          {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{testimonials[activeTestimonial].name}</h4>
                          {testimonials[activeTestimonial].verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-2xl"></div>
                      <Avatar className="relative h-32 w-32 mx-auto border-4 border-primary/20">
                        <AvatarImage src={testimonials[activeTestimonial].image} />
                        <AvatarFallback className="text-2xl">
                          {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
