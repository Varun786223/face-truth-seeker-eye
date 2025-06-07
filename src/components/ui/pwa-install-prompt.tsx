
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, X, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      toast.success("App installed successfully!");
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success("Installing app...");
    } else {
      toast.info("App installation cancelled");
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!showPrompt || isInstalled || localStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg border-2 border-primary/20 animate-slide-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Install DeepSentinel
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Install our app for faster access, offline capabilities, and a native mobile experience.
        </p>
        <div className="flex gap-2">
          <Button onClick={handleInstallClick} className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            Install App
          </Button>
          <Button variant="outline" onClick={handleDismiss}>
            Later
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
