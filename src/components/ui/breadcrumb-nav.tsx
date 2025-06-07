
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const routeMap: Record<string, string> = {
  "/": "Home",
  "/image-analysis": "Image Analysis",
  "/video-analysis": "Video Analysis", 
  "/webcam-analysis": "Webcam Analysis",
  "/blockchain": "Blockchain Features",
  "/report": "Reports",
  "/resources": "Resources",
  "/settings": "Settings"
};

export function BreadcrumbNav() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" }
  ];

  let currentPath = "";
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeMap[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ 
      label, 
      href: currentPath === location.pathname ? undefined : currentPath 
    });
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((item, index) => (
        <div key={item.href || item.label} className="flex items-center">
          {index === 0 && <Home className="h-4 w-4 mr-1" />}
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-foreground transition-colors duration-200 hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4 mx-2" />
          )}
        </div>
      ))}
    </nav>
  );
}
