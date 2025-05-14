
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">DeepSentinel</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              An AI-powered platform to detect and verify all types of synthetic content including AI-generated media, manipulated content, and digital fraud.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Analysis Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/image-analysis" className="text-muted-foreground hover:text-foreground">
                  Image Analysis
                </Link>
              </li>
              <li>
                <Link to="/video-analysis" className="text-muted-foreground hover:text-foreground">
                  Video Analysis
                </Link>
              </li>
              <li>
                <Link to="/webcam-analysis" className="text-muted-foreground hover:text-foreground">
                  Live Camera Analysis
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground">
                  Learn About Synthetic Media
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-muted-foreground hover:text-foreground">
                  Report Fraudulent Content
                </Link>
              </li>
              <li>
                <Link to="/blockchain" className="text-muted-foreground hover:text-foreground">
                  Blockchain Verification
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Enterprise Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Media Certification
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  API Access
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 DeepSentinel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
