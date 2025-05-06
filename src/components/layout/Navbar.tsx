
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Info, AlertTriangle } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll event listener
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-lg font-bold"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-deepfake-300 to-deepfake-700">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <span className="gradient-text font-extrabold">DeepfakeDetector</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/image-analysis" className="text-sm font-medium transition-colors hover:text-primary">
            Image Analysis
          </Link>
          <Link to="/video-analysis" className="text-sm font-medium transition-colors hover:text-primary">
            Video Analysis
          </Link>
          <Link to="/webcam-analysis" className="text-sm font-medium transition-colors hover:text-primary">
            Live Analysis
          </Link>
          <Link to="/report" className="text-sm font-medium transition-colors hover:text-primary">
            Report
          </Link>
          <Link to="/resources" className="text-sm font-medium transition-colors hover:text-primary">
            Learn More
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Learn about deepfakes">
            <Info className="h-5 w-5" />
          </Button>
          <Button variant="default">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
