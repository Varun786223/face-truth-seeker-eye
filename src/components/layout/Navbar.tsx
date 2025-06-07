
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
    { name: "Dashboard", href: "/dashboard" },
    { name: "Image Analysis", href: "/image-analysis" },
    { name: "Video Analysis", href: "/video-analysis" },
    { name: "Webcam Analysis", href: "/webcam-analysis" },
    { name: "Blockchain", href: "/blockchain" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus-ring"
            aria-label="DeepSentinel home"
          >
            <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold text-foreground">DeepSentinel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" role="menubar">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                asChild
                className="text-foreground hover:text-primary transition-colors focus-ring"
                role="menuitem"
              >
                <Link to={item.href} aria-current={location.pathname === item.href ? "page" : undefined}>
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:inline-flex focus-ring hover-lift"
              aria-label="Get started with DeepSentinel"
            >
              <Zap className="h-4 w-4 mr-2" aria-hidden="true" />
              Get Started
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden focus-ring"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            id="mobile-menu" 
            className="md:hidden border-t py-4 space-y-2 animate-fade-in"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                asChild
                className="w-full justify-start text-foreground focus-ring"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <Link 
                  to={item.href}
                  aria-current={location.pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </Button>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4 focus-ring"
              aria-label="Get started with DeepSentinel"
            >
              <Zap className="h-4 w-4 mr-2" aria-hidden="true" />
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
