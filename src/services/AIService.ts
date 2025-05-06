
// This is a service for handling Gemini API interactions
import { toast } from "sonner";

// Types for the service
interface AIServiceOptions {
  apiKey: string | null;
}

interface AIAnalysisResult {
  deepfakeScore: number;
  faceSwapDetected: boolean;
  confidence: "low" | "medium" | "high";
  details?: string;
}

export class AIService {
  private apiKey: string | null;

  constructor(options: AIServiceOptions) {
    this.apiKey = options.apiKey;
  }

  // Method to check if the API key is set
  public isConfigured(): boolean {
    return !!this.apiKey && this.apiKey.trim() !== "";
  }

  // Set a new API key
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    // Store in localStorage for persistence
    localStorage.setItem("gemini_api_key", apiKey);
    toast.success("API key saved");
  }

  // Get the stored API key
  public static getStoredApiKey(): string | null {
    return localStorage.getItem("gemini_api_key");
  }

  // Reset the API key
  public resetApiKey(): void {
    this.apiKey = null;
    localStorage.removeItem("gemini_api_key");
    toast.info("API key removed");
  }

  // Analyze image data with Gemini
  public async analyzeImage(imageData: string): Promise<AIAnalysisResult> {
    if (!this.isConfigured()) {
      toast.error("API key not configured");
      throw new Error("API key not configured");
    }

    try {
      // For demo purposes we're returning mock data
      // In a production app, this would make an actual API call to Gemini
      console.log("Would analyze image with Gemini API using key:", this.apiKey?.substring(0, 5) + "...");
      
      // Mock successful analysis - in a real app, this would be replaced with actual API call
      // TODO: Replace with actual Gemini API call implementation
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API latency
      
      // Generate a random score for demo purposes
      const score = Math.random() * 100;
      
      return {
        deepfakeScore: parseFloat(score.toFixed(1)),
        faceSwapDetected: score > 70,
        confidence: score > 70 ? "high" : score > 30 ? "medium" : "low",
        details: "Analyzed with Gemini AI. This is currently a simulation."
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Failed to analyze image");
      throw error;
    }
  }

  // Analyze video data with Gemini
  public async analyzeVideo(videoUrl: string): Promise<AIAnalysisResult> {
    if (!this.isConfigured()) {
      toast.error("API key not configured");
      throw new Error("API key not configured");
    }

    try {
      // For demo purposes we're returning mock data
      // In a production app, this would make an actual API call to Gemini
      console.log("Would analyze video with Gemini API using key:", this.apiKey?.substring(0, 5) + "...");
      
      // Mock successful analysis
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API latency
      
      // Generate a random score for demo purposes
      const score = Math.random() * 100;
      
      return {
        deepfakeScore: parseFloat(score.toFixed(1)),
        faceSwapDetected: score > 60,
        confidence: score > 70 ? "high" : score > 30 ? "medium" : "low",
        details: "Analyzed with Gemini AI. This is currently a simulation."
      };
    } catch (error) {
      console.error("Error analyzing video:", error);
      toast.error("Failed to analyze video");
      throw error;
    }
  }

  // Analyze webcam frame with Gemini
  public async analyzeWebcamFrame(frameData: string): Promise<AIAnalysisResult> {
    if (!this.isConfigured()) {
      toast.error("API key not configured");
      throw new Error("API key not configured");
    }

    try {
      // For demo purposes we're returning mock data
      console.log("Would analyze webcam frame with Gemini API");
      
      // Mock successful analysis
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API latency
      
      // Generate a random score for demo purposes
      const score = Math.random() * 100;
      
      return {
        deepfakeScore: parseFloat(score.toFixed(1)),
        faceSwapDetected: score > 65,
        confidence: score > 70 ? "high" : score > 30 ? "medium" : "low",
        details: "Analyzed with Gemini AI. This is currently a simulation."
      };
    } catch (error) {
      console.error("Error analyzing webcam frame:", error);
      toast.error("Failed to analyze webcam frame");
      throw error;
    }
  }
}

// Create singleton instance with stored API key
const aiService = new AIService({ 
  apiKey: AIService.getStoredApiKey()
});

export default aiService;
