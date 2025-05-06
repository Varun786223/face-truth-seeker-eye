
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Key } from "lucide-react";
import aiService from "@/services/AIService";

export function APIKeySetup() {
  const [apiKey, setApiKey] = useState<string>("");
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  useEffect(() => {
    // Check if API key is already stored
    const storedKey = aiService.getStoredApiKey();
    setIsConfigured(!!storedKey);
    if (storedKey) {
      setApiKey("•".repeat(12)); // Mask the key with bullets
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey || apiKey === "•".repeat(12)) return;
    
    aiService.setApiKey(apiKey);
    setIsConfigured(true);
    setApiKey("•".repeat(12)); // Mask the key for display
  };

  const handleResetKey = () => {
    aiService.resetApiKey();
    setIsConfigured(false);
    setApiKey("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Gemini API Configuration
        </CardTitle>
        <CardDescription>
          Configure your Gemini API key to enable AI-powered deepfake detection
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <Alert className="bg-muted/50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your API key is stored locally in your browser and is never sent to our servers.
              For better security, consider using the Supabase integration.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your Gemini API key"
              value={apiKey}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">
              You can get a Gemini API key from the{" "}
              <a 
                href="https://makersuite.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Google AI Studio
              </a>
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {isConfigured ? (
          <>
            <Button variant="outline" onClick={handleResetKey}>
              Reset API Key
            </Button>
            <Button onClick={handleSaveKey}>
              Update API Key
            </Button>
          </>
        ) : (
          <Button onClick={handleSaveKey} className="w-full">
            Save API Key
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
