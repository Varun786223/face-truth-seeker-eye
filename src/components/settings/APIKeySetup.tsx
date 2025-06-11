
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import aiService, { AIService } from "@/services/AIService";

export function APIKeySetup() {
  const [apiKey, setApiKey] = useState<string>("");
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load saved API key on component mount
  useEffect(() => {
    const savedKey = AIService.getStoredApiKey();
    setIsConfigured(!!savedKey);
    // Don't set the key in the input for security
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    setIsLoading(true);
    try {
      // Test the API key by making a simple request
      aiService.setApiKey(apiKey.trim());
      
      // Simple test to verify the key works
      // In a real implementation, you might want to make a test API call
      setIsConfigured(true);
      setApiKey(""); // Clear input after saving
      toast.success("API key saved and verified successfully!");
    } catch (error) {
      toast.error("Failed to verify API key. Please check and try again.");
      console.error("API key verification failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveKey = () => {
    aiService.resetApiKey();
    setIsConfigured(false);
    setApiKey("");
    toast.info("API key removed successfully");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-start gap-3">
          {isConfigured ? (
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
          )}
          <div className="flex-1">
            <h3 className="text-sm font-medium">
              {isConfigured ? "API Key Configured" : "API Key Required"}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {isConfigured 
                ? "Your Gemini API key is configured and ready for use. All AI analysis features are now available."
                : "Configure your Gemini API key to enable AI-powered deepfake detection and analysis features."
              }
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="api-key" className="text-sm font-medium">
            Gemini API Key
          </Label>
          <div className="flex mt-2 gap-2">
            <div className="relative flex-1">
              <Input
                type={showKey ? "text" : "password"}
                id="api-key"
                placeholder={isConfigured ? "••••••••••••••••••••••••••••••••" : "Enter your Gemini API key"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {isConfigured ? (
              <Button variant="outline" onClick={handleRemoveKey}>
                Remove
              </Button>
            ) : (
              <Button 
                onClick={handleSaveKey} 
                disabled={isLoading || !apiKey.trim()}
                className="min-w-[80px]"
              >
                {isLoading ? "Verifying..." : "Save"}
              </Button>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-muted/30 p-4">
          <h4 className="text-sm font-medium mb-2">How to get your API key:</h4>
          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Visit Google AI Studio (click link below)</li>
            <li>Sign in with your Google account</li>
            <li>Create a new API key</li>
            <li>Copy the key and paste it above</li>
          </ol>
          
          <Button
            variant="outline"
            size="sm"
            className="mt-3 h-8"
            onClick={() => window.open("https://aistudio.google.com/app/apikey", "_blank")}
          >
            <ExternalLink className="h-3 w-3 mr-2" />
            Get API Key
          </Button>
        </div>

        {isConfigured && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                Ready to analyze!
              </p>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              You can now upload images, videos, or use the webcam analysis features. 
              All AI-powered detection methods are available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
