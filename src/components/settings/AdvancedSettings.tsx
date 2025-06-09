
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Save, RotateCcw } from "lucide-react";

interface UserSettings {
  apiKey: string;
  detectionSensitivity: number;
  autoAnalysis: boolean;
  saveHistory: boolean;
  theme: string;
  notifications: boolean;
  maxFileSize: number;
  preferredAnalysisType: string;
}

const defaultSettings: UserSettings = {
  apiKey: "",
  detectionSensitivity: 75,
  autoAnalysis: true,
  saveHistory: true,
  theme: "system",
  notifications: true,
  maxFileSize: 100,
  preferredAnalysisType: "comprehensive"
};

export function AdvancedSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
        toast.error("Failed to load saved settings");
      }
    }
  }, []);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanged(true);
  };

  const saveSettings = () => {
    try {
      localStorage.setItem("userSettings", JSON.stringify(settings));
      setHasChanged(false);
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Failed to save settings");
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    setHasChanged(true);
    toast.info("Settings reset to defaults");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key"
              value={settings.apiKey}
              onChange={(e) => updateSetting("apiKey", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detection Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Detection Sensitivity: {settings.detectionSensitivity}%</Label>
            <Slider
              value={[settings.detectionSensitivity]}
              onValueChange={(value) => updateSetting("detectionSensitivity", value[0])}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="analysisType">Preferred Analysis Type</Label>
            <Select
              value={settings.preferredAnalysisType}
              onValueChange={(value) => updateSetting("preferredAnalysisType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quick">Quick Scan</SelectItem>
                <SelectItem value="standard">Standard Analysis</SelectItem>
                <SelectItem value="comprehensive">Comprehensive</SelectItem>
                <SelectItem value="deep">Deep Learning</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Maximum File Size: {settings.maxFileSize} MB</Label>
            <Slider
              value={[settings.maxFileSize]}
              onValueChange={(value) => updateSetting("maxFileSize", value[0])}
              max={500}
              min={1}
              step={5}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>General Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="autoAnalysis">Auto-analyze uploaded files</Label>
            <Switch
              id="autoAnalysis"
              checked={settings.autoAnalysis}
              onCheckedChange={(checked) => updateSetting("autoAnalysis", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="saveHistory">Save analysis history</Label>
            <Switch
              id="saveHistory"
              checked={settings.saveHistory}
              onCheckedChange={(checked) => updateSetting("saveHistory", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Enable notifications</Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting("notifications", checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={(value) => updateSetting("theme", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button 
          onClick={saveSettings} 
          disabled={!hasChanged}
          className="flex-1"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
        <Button 
          variant="outline" 
          onClick={resetSettings}
          className="flex-1"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}
