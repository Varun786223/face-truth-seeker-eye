
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
  verificationData?: {
    reverseSearchMatches?: Array<{
      url: string;
      confidence: number;
      source: string;
      matchDate?: string;
    }>;
    blockchainVerification?: {
      verified: boolean;
      hashMatch?: boolean;
      timestamp?: string;
      blockchain?: string;
      transactionId?: string;
    };
    userReportStats?: {
      totalReports: number;
      flaggedAsDeepfake: number;
      flaggedAsReal: number;
      confidence: number;
    };
    networkPropagation?: {
      firstAppearance?: string;
      spreadVelocity?: "slow" | "medium" | "fast" | "viral";
      majorDistributors?: string[];
      suspiciousPattern: boolean;
    };
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
    reverseSearch?: boolean;
    blockchainVerification?: boolean;
    userReportAggregation?: boolean;
    networkPropagationAnalysis?: boolean;
  };
  sensitivityLevels?: {
    visualDetection?: number;
    audioDetection?: number;
    metadataAnalysis?: number;
    verificationSystems?: number;
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
      reverseSearch: true,
      blockchainVerification: true,
      userReportAggregation: true,
      networkPropagationAnalysis: true,
    };
  }

  // Save enabled detection features to local storage
  public static saveEnabledFeatures(features: DetectionOptions["enabledFeatures"]): void {
    localStorage.setItem("detection_features", JSON.stringify(features));
  }
  
  // Wrapper method to handle the actual saving with a toast notification
  public saveEnabledFeatures(features: DetectionOptions["enabledFeatures"]): void {
    AIService.saveEnabledFeatures(features);
    toast.success("Detection features saved");
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
      verificationSystems: 75
    };
  }

  // Save sensitivity levels to local storage
  public static saveSensitivityLevels(levels: DetectionOptions["sensitivityLevels"]): void {
    localStorage.setItem("sensitivity_levels", JSON.stringify(levels));
  }

  // Perform reverse image search
  private async reverseImageSearch(imageData: string): Promise<any> {
    console.log("Performing reverse image search");
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock response
    return {
      matches: [
        {
          url: "https://example.com/original-image.jpg",
          confidence: 92,
          source: "Stock photo website",
          matchDate: "2024-03-15"
        },
        {
          url: "https://socialmedia.example/user123/post",
          confidence: 87,
          source: "Social media",
          matchDate: "2024-04-02"
        }
      ]
    };
  }

  // Perform blockchain verification
  private async blockchainVerify(contentHash: string): Promise<any> {
    console.log("Verifying content against blockchain records");
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock response
    return {
      verified: Math.random() > 0.5,
      hashMatch: Math.random() > 0.6,
      timestamp: "2024-05-02T14:28:33Z",
      blockchain: "Ethereum",
      transactionId: "0x3a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t"
    };
  }

  // Get user reports
  private async getUserReports(contentId: string): Promise<any> {
    console.log("Getting user reported flags");
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Calculate random stats for demo
    const totalReports = Math.floor(Math.random() * 200) + 50;
    const flaggedAsDeepfake = Math.floor(Math.random() * totalReports);
    
    // Mock response
    return {
      totalReports,
      flaggedAsDeepfake,
      flaggedAsReal: totalReports - flaggedAsDeepfake,
      confidence: (flaggedAsDeepfake / totalReports) * 100
    };
  }

  // Analyze network propagation
  private async analyzeNetworkPropagation(contentId: string): Promise<any> {
    console.log("Analyzing network propagation patterns");
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Mock velocity
    const velocityOptions = ["slow", "medium", "fast", "viral"];
    const randomVelocity = velocityOptions[Math.floor(Math.random() * velocityOptions.length)];
    
    // Mock response
    return {
      firstAppearance: "2024-04-28T09:15:22Z",
      spreadVelocity: randomVelocity,
      majorDistributors: [
        "social_platform_A",
        "messaging_app_B",
        "forum_C"
      ],
      suspiciousPattern: Math.random() > 0.6
    };
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
      
      // Get enabled features from options or from stored settings
      const enabledFeatures = options?.enabledFeatures || AIService.getEnabledFeatures();
      
      // Mock analysis with advanced detection results
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API latency
      
      // Generate a random score for demo purposes
      const score = Math.random() * 100;
      
      // Mock detailed detection results based on enabled features
      const detectionFeatures: AIAnalysisResult["detectionFeatures"] = {};
      
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
      
      if (enabledFeatures?.compressionArtifacts) {
        detectionFeatures.compressionArtifacts = {
          detected: score > 45,
          confidence: Math.random() * 100,
          details: "Unusual compression patterns detected"
        };
      }
      
      if (enabledFeatures?.cnnSignatures) {
        detectionFeatures.cnnSignatures = {
          detected: score > 75,
          confidence: Math.random() * 100,
          details: "CNN-based forgery signatures identified"
        };
      }
      
      if (enabledFeatures?.eyeBlinkAnalysis) {
        detectionFeatures.eyeBlinkAnalysis = {
          detected: score > 55,
          confidence: Math.random() * 100,
          details: "Abnormal eye blinking patterns detected"
        };
      }
      
      if (enabledFeatures?.microExpressions) {
        detectionFeatures.microExpressions = {
          detected: score > 80,
          confidence: Math.random() * 100,
          details: "Unnatural micro-expressions detected"
        };
      }
      
      if (enabledFeatures?.syntheticFingerprinting) {
        detectionFeatures.syntheticFingerprinting = {
          detected: score > 70,
          confidence: Math.random() * 100,
          details: "Synthetic media fingerprints detected"
        };
      }
      
      if (enabledFeatures?.lightingShadowChecks) {
        detectionFeatures.lightingShadowChecks = {
          detected: score > 65,
          confidence: Math.random() * 100,
          details: "Inconsistencies in lighting and shadows identified"
        };
      }
      
      if (enabledFeatures?.multimodalFusion) {
        detectionFeatures.multimodalFusion = {
          detected: score > 60,
          confidence: Math.random() * 100,
          details: "Multimodal analysis revealed inconsistencies"
        };
      }
      
      if (enabledFeatures?.biasMitigation) {
        detectionFeatures.biasMitigation = {
          detected: score > 50,
          confidence: Math.random() * 100,
          details: "Analysis performed with bias mitigation techniques"
        };
      }

      // Prepare verification data
      const verificationData: AIAnalysisResult["verificationData"] = {};
      
      // Add reverse search results if enabled
      if (enabledFeatures?.reverseSearch) {
        const searchResults = await this.reverseImageSearch(imageData);
        verificationData.reverseSearchMatches = searchResults.matches;
      }
      
      // Add blockchain verification if enabled
      if (enabledFeatures?.blockchainVerification) {
        // In a real implementation, you would generate a hash from the image data
        const mockContentHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
        verificationData.blockchainVerification = await this.blockchainVerify(mockContentHash);
      }
      
      // Add user reports if enabled
      if (enabledFeatures?.userReportAggregation) {
        // In a real implementation, you would have a content ID
        const mockContentId = "img_" + Date.now().toString();
        verificationData.userReportStats = await this.getUserReports(mockContentId);
      }
      
      // Add network propagation analysis if enabled
      if (enabledFeatures?.networkPropagationAnalysis) {
        // In a real implementation, you would have a content ID
        const mockContentId = "img_" + Date.now().toString();
        verificationData.networkPropagation = await this.analyzeNetworkPropagation(mockContentId);
      }
      
      return {
        deepfakeScore: parseFloat(score.toFixed(1)),
        faceSwapDetected: score > 70,
        confidence: score > 70 ? "high" : score > 30 ? "medium" : "low",
        details: "Analyzed with Gemini AI using the enhanced detection suite",
        detectionFeatures,
        verificationData
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
      
      // Prepare verification data
      const verificationData: AIAnalysisResult["verificationData"] = {};
      
      // Add reverse search results if enabled
      if (enabledFeatures?.reverseSearch) {
        // For video, we'd typically use frames or thumbnails
        const mockVideoFrameData = "base64_encoded_video_frame";
        const searchResults = await this.reverseImageSearch(mockVideoFrameData);
        verificationData.reverseSearchMatches = searchResults.matches;
      }
      
      // Add blockchain verification if enabled
      if (enabledFeatures?.blockchainVerification) {
        const mockContentHash = "f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
        verificationData.blockchainVerification = await this.blockchainVerify(mockContentHash);
      }
      
      // Add user reports if enabled
      if (enabledFeatures?.userReportAggregation) {
        const mockContentId = "vid_" + Date.now().toString();
        verificationData.userReportStats = await this.getUserReports(mockContentId);
      }
      
      // Add network propagation analysis if enabled
      if (enabledFeatures?.networkPropagationAnalysis) {
        const mockContentId = "vid_" + Date.now().toString();
        verificationData.networkPropagation = await this.analyzeNetworkPropagation(mockContentId);
      }
      
      return {
        deepfakeScore: parseFloat(score.toFixed(1)),
        faceSwapDetected: score > 60,
        confidence: score > 70 ? "high" : score > 30 ? "medium" : "low",
        details: "Analyzed with Gemini AI using the enhanced detection suite",
        detectionFeatures,
        verificationData
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
      
      // For webcam, we likely wouldn't do complex verification but let's include some basic features
      const verificationData: AIAnalysisResult["verificationData"] = {};
      
      // For live webcam, network propagation doesn't apply, but we can check for similar faces
      if (enabledFeatures?.reverseSearch) {
        const searchResults = await this.reverseImageSearch(frameData);
        verificationData.reverseSearchMatches = searchResults.matches;
      }
      
      return {
        deepfakeScore: parseFloat(score.toFixed(1)),
        faceSwapDetected: score > 65,
        confidence: score > 70 ? "high" : score > 30 ? "medium" : "low",
        details: "Analyzed with Gemini AI using the enhanced detection suite",
        detectionFeatures,
        verificationData
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
