
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Shield, Zap } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Image Analysis", href: "/image-analysis" },
    { name: "Video Analysis", href: "/video-analysis" },
    { name: "Webcam Analysis", href: "/webcam-analysis" },
    { name: "Blockchain", href: "/blockchain" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">DeepSentinel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                asChild
                className="text-foreground hover:text-primary transition-colors"
              >
                <Link to={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden md:inline-flex">
              <Zap className="h-4 w-4 mr-2" />
              Get Started
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                asChild
                className="w-full justify-start text-foreground"
                onClick={() => setIsOpen(false)}
              >
                <Link to={item.href}>{item.name}</Link>
              </Button>
            ))}
            <Button variant="outline" className="w-full mt-4">
              <Zap className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
