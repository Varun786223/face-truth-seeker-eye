
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">DeepSentinel</h3>
            <p className="text-sm text-muted-foreground">
              An AI-powered tool to detect and analyze all types of AI fraud including deepfakes, synthetic content, and manipulated data.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Tools</h4>
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
                  Learn About AI Fraud
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-muted-foreground hover:text-foreground">
                  Report Synthetic Content
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Contact
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
