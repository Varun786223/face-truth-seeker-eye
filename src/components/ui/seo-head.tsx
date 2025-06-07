
import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

export function SEOHead({
  title = "DeepSentinel - AI-Powered Deepfake Detection & Media Verification",
  description = "Advanced AI platform to detect deepfakes, verify authentic media, and protect against synthetic content manipulation. Real-time analysis for images, videos, and live streams.",
  keywords = ["deepfake detection", "AI verification", "media authentication", "synthetic content", "fraud prevention"],
  canonicalUrl,
  ogImage = "/placeholder.svg",
  ogType = "website"
}: SEOHeadProps) {
  
  useEffect(() => {
    // Set page title
    document.title = title;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords.join(', '));
    setMetaTag('author', 'DeepSentinel Team');
    setMetaTag('robots', 'index, follow');
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', 'DeepSentinel', true);

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "DeepSentinel",
      "description": description,
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, canonicalUrl, ogImage, ogType]);

  return null;
}
