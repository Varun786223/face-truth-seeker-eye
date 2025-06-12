
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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b border-border/40 safe-area-top" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus-ring min-h-[44px] group"
            aria-label="DeepSentinel home"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
              <div className="absolute inset-0 h-7 w-7 sm:h-8 sm:w-8 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all"></div>
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              DeepSentinel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1" role="menubar">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                asChild
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 focus-ring text-sm font-medium px-3 py-2"
                role="menuitem"
              >
                <Link to={item.href} aria-current={location.pathname === item.href ? "page" : undefined}>
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />
            <Button 
              variant="default" 
              size="sm" 
              className="hidden sm:inline-flex focus-ring hover-lift text-sm font-medium bg-primary hover:bg-primary/90 shadow-lg"
              aria-label="Get started with DeepSentinel"
              asChild
            >
              <Link to="/image-analysis">
                <Zap className="h-4 w-4 mr-2" aria-hidden="true" />
                Get Started
              </Link>
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden focus-ring min-h-[44px] min-w-[44px] hover:bg-primary/10"
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
            className="lg:hidden border-t border-border/40 py-4 space-y-2 animate-fade-in safe-area-bottom bg-background/95 backdrop-blur-md"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                asChild
                className="w-full justify-start text-foreground focus-ring min-h-[48px] text-base font-medium hover:bg-primary/10"
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
              variant="default" 
              className="w-full mt-4 focus-ring min-h-[48px] text-base font-medium bg-primary hover:bg-primary/90 shadow-lg"
              aria-label="Get started with DeepSentinel"
              onClick={() => setIsOpen(false)}
              asChild
            >
              <Link to="/image-analysis">
                <Zap className="h-4 w-4 mr-2" aria-hidden="true" />
                Get Started
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
