
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function AccessibilityHelper() {
  const location = useLocation();

  useEffect(() => {
    // Announce route changes to screen readers
    const announceRouteChange = () => {
      const routeNames: Record<string, string> = {
        "/": "Home page",
        "/dashboard": "Dashboard page",
        "/image-analysis": "Image Analysis page",
        "/video-analysis": "Video Analysis page",
        "/webcam-analysis": "Webcam Analysis page",
        "/blockchain": "Blockchain Features page",
        "/report": "Report page",
        "/resources": "Resources page",
        "/settings": "Settings page"
      };

      const pageName = routeNames[location.pathname] || "Page";
      
      // Create announcement for screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Navigated to ${pageName}`;
      
      document.body.appendChild(announcement);
      
      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    };

    announceRouteChange();
  }, [location.pathname]);

  useEffect(() => {
    // Skip to main content functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50';
    skipLink.textContent = 'Skip to main content';
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Focus management for keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC key to close modals/dropdowns
      if (e.key === 'Escape') {
        const openDropdowns = document.querySelectorAll('[data-state="open"]');
        openDropdowns.forEach(dropdown => {
          const closeButton = dropdown.querySelector('[data-close]');
          if (closeButton) {
            (closeButton as HTMLElement).click();
          }
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
      }
    };
  }, []);

  return null;
}
