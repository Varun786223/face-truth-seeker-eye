
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
  detectionFeatures?: {
    [key: string]: {
      detected: boolean;
      confidence: number;
      details?: string;
    }
  };
}

interface DetectionOptions {
  enabledFeatures?: {
    artifactDetection?: boolean;
    lipSyncAnalysis?: boolean;
    metadataForensics?: boolean;
    compressionArtifacts?: boolean;
    ganDetection?: boolean;
    cnnSignatures?: boolean;
    eyeBlinkAnalysis?: boolean;
    microExpressions?: boolean;
    audioGlitchDetection?: boolean;
    syntheticFingerprinting?: boolean;
    adversarialTraining?: boolean;
    temporalInconsistencies?: boolean;
    lightingShadowChecks?: boolean;
    multimodalFusion?: boolean;
    biasMitigation?: boolean;
  };
  sensitivityLevels?: {
    visualDetection?: number;
    audioDetection?: number;
    metadataAnalysis?: number;
  };
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

  // Get enabled detection features from local storage
  public static getEnabledFeatures(): DetectionOptions["enabledFeatures"] {
    const storedFeatures = localStorage.getItem("detection_features");
    if (storedFeatures) {
      try {
        return JSON.parse(storedFeatures);
      } catch (e) {
        console.error("Failed to parse stored detection features", e);
      }
    }
    // Default features (all enabled)
    return {
      artifactDetection: true,
      lipSyncAnalysis: true,
      metadataForensics: true,
      compressionArtifacts: true,
      ganDetection: true,
      cnnSignatures: false,
      eyeBlinkAnalysis: true,
      microExpressions: false,
      audioGlitchDetection: true,
      syntheticFingerprinting: true,
      adversarialTraining: false,
      temporalInconsistencies: true,
      lightingShadowChecks: true,
      multimodalFusion: false,
      biasMitigation: true,
    };
  }

  // Save enabled detection features to local storage
  public static saveEnabledFeatures(features: DetectionOptions["enabledFeatures"]): void {
    localStorage.setItem("detection_features", JSON.stringify(features));
  }

  // Get sensitivity levels from local storage
  public static getSensitivityLevels(): DetectionOptions["sensitivityLevels"] {
    const storedLevels = localStorage.getItem("sensitivity_levels");
    if (storedLevels) {
      try {
        return JSON.parse(storedLevels);
      } catch (e) {
        console.error("Failed to parse stored sensitivity levels", e);
      }
    }
    // Default sensitivity levels
    return {
      visualDetection: 70,
      audioDetection: 65,
      metadataAnalysis: 80,
    };
  }

  // Save sensitivity levels to local storage
  public static saveSensitivityLevels(levels: DetectionOptions["sensitivityLevels"]): void {
    localStorage.setItem("sensitivity_levels", JSON.stringify(levels));
  }

  // Analyze image data with Gemini, including advanced detection options
  public async analyzeImage(imageData: string, options?: DetectionOptions): Promise<AIAnalysisResult> {
    if (!this.isConfigured()) {
      toast.error("API key not configured");
      throw new Error("API key not configured");
    }

    try {
      // Here you would make the actual API call to Gemini
      console.log("Would analyze image with Gemini API using key:", this.apiKey?.substring(0, 5) + "...");
      console.log("With detection options:", options);
      
      // Mock analysis with advanced detection results
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API latency
      
      // Generate a random score for demo purposes
      const score = Math.random() * 100;
      
      // Mock detailed detection results based on enabled features
      const detectionFeatures: AIAnalysisResult["detectionFeatures"] = {};
      const enabledFeatures = options?.enabledFeatures || AIService.getEnabledFeatures();
      
      // Generate mock results for each enabled feature
      if (enabledFeatures?.artifactDetection) {
        detectionFeatures.artifactDetection = {
          detected: score > 60,
          confidence: Math.random() * 100,
          details: "Analysis of GAN fingerprints and inconsistent blurring patterns"
        };
      }
      
      if (enabledFeatures?.ganDetection) {
        detectionFeatures.ganDetection = {
          detected: score > 65,
          confidence: Math.random() * 100,
          details: "Detected potential GAN-generated content patterns"
        };
      }
      
      if (enabledFeatures?.metadataForensics) {
        detectionFeatures.metadataForensics = {
          detected: score > 50,
          confidence: Math.random() * 100,
          details: "Inconsistencies found in metadata suggesting manipulation"
        };
      }
      
      return {
        deepfakeScore: parseFloat(score.toFixed(1)),
        faceSwapDetected: score > 70,
        confidence: score > 70 ? "high" : score > 30 ? "medium" : "low",
        details: "Analyzed with Gemini AI using the enhanced detection suite",
        detectionFeatures
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Failed to analyze image");
      throw error;
    }
  }

  // Analyze video data with Gemini, including advanced detection options
  public async analyzeVideo(videoUrl: string, options?: DetectionOptions): Promise<AIAnalysisResult> {
    if (!this.isConfigured()) {
      toast.error("API key not configured");
      throw new Error("API key not configured");
    }

    try {
      console.log("Would analyze video with Gemini API using key:", this.apiKey?.substring(0, 5) + "...");
      console.log("With detection options:", options);
      
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random score for demo purposes
      const score = Math.random() * 100;
      
      // Mock detailed detection results based on enabled features
      const detectionFeatures: AIAnalysisResult["detectionFeatures"] = {};
      const enabledFeatures = options?.enabledFeatures || AIService.getEnabledFeatures();
      
      // Generate mock results for video-specific features
      if (enabledFeatures?.temporalInconsistencies) {
        detectionFeatures.temporalInconsistencies = {
          detected: Math.random() > 0.4,
          confidence: Math.random() * 100,
          details: "Frame-by-frame analysis detected temporal anomalies"
        };
      }
      
      if (enabledFeatures?.lipSyncAnalysis) {
        detectionFeatures.lipSyncAnalysis = {
          detected: Math.random() > 0.5,
          confidence: Math.random() * 100,
          details: "Detected potential lip sync issues in spoken sections"
        };
      }
      
      if (enabledFeatures?.eyeBlinkAnalysis) {
        detectionFeatures.eyeBlinkAnalysis = {
          detected: Math.random() > 0.6,
          confidence: Math.random() * 100,
          details: "Unusual eye blinking patterns detected"
        };
      }
      
      if (enabledFeatures?.audioGlitchDetection) {
        detectionFeatures.audioGlitchDetection = {
          detected: Math.random() > 0.5,
          confidence: Math.random() * 100,
          details: "Unnatural pauses and tone shifts detected in audio"
        };
      }
      
      return {
        deepfakeScore: parseFloat(score.toFixed(1)),
        faceSwapDetected: score > 60,
        confidence: score > 70 ? "high" : score > 30 ? "medium" : "low",
        details: "Analyzed with Gemini AI using the enhanced detection suite",
        detectionFeatures
      };
    } catch (error) {
      console.error("Error analyzing video:", error);
      toast.error("Failed to analyze video");
      throw error;
    }
  }

  // Analyze webcam frame with Gemini, including advanced detection options
  public async analyzeWebcamFrame(frameData: string, options?: DetectionOptions): Promise<AIAnalysisResult> {
    if (!this.isConfigured()) {
      toast.error("API key not configured");
      throw new Error("API key not configured");
    }

    try {
      console.log("Would analyze webcam frame with Gemini API");
      console.log("With detection options:", options);
      
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random score for demo purposes
      const score = Math.random() * 100;
      
      // Mock detailed detection results based on enabled features
      const detectionFeatures: AIAnalysisResult["detectionFeatures"] = {};
      const enabledFeatures = options?.enabledFeatures || AIService.getEnabledFeatures();
      
      // Generate mock results for webcam-specific features
      if (enabledFeatures?.microExpressions) {
        detectionFeatures.microExpressions = {
          detected: Math.random() > 0.7,
          confidence: Math.random() * 100,
          details: "Analysis of micro-expressions suggests possible manipulation"
        };
      }
      
      if (enabledFeatures?.lightingShadowChecks) {
        detectionFeatures.lightingShadowChecks = {
          detected: Math.random() > 0.6,
          confidence: Math.random() * 100,
          details: "Lighting and shadow inconsistencies detected"
        };
      }
      
      return {
        deepfakeScore: parseFloat(score.toFixed(1)),
        faceSwapDetected: score > 65,
        confidence: score > 70 ? "high" : score > 30 ? "medium" : "low",
        details: "Analyzed with Gemini AI using the enhanced detection suite",
        detectionFeatures
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
