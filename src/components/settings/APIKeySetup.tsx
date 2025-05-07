
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import aiService, { AIService } from "@/services/AIService";

export function APIKeySetup() {
  const [apiKey, setApiKey] = useState<string>("");
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  // Load saved API key on component mount
  useEffect(() => {
    const savedKey = AIService.getStoredApiKey();
    setIsConfigured(!!savedKey);
    // Don't set the key in the input for security
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      aiService.setApiKey(apiKey.trim());
      setIsConfigured(true);
      setApiKey(""); // Clear input after saving
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const handleRemoveKey = () => {
    aiService.resetApiKey();
    setIsConfigured(false);
    setApiKey("");
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-muted/50 p-4">
        <h3 className="text-sm font-medium">Gemini API Key</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Configure your Gemini API key to enable AI-powered deepfake detection.
          {isConfigured && (
            <span className="ml-1 text-green-500 font-medium">
              ✓ API key configured
            </span>
          )}
        </p>
      </div>

      <div>
        <Label htmlFor="api-key">API Key</Label>
        <div className="flex mt-1.5 gap-2">
          <Input
            type="password"
            id="api-key"
            placeholder={isConfigured ? "••••••••••••••••••••" : "Enter your Gemini API key"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          {isConfigured ? (
            <Button variant="outline" onClick={handleRemoveKey}>
              Remove
            </Button>
          ) : (
            <Button onClick={handleSaveKey}>Save</Button>
          )}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        <p>
          Get your API key from the{" "}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            Google AI Studio
          </a>
        </p>
      </div>
    </div>
  );
}
