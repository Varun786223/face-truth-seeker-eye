
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface DetectionFeature {
  detected: boolean;
  confidence: number;
  details?: string;
}

interface AdvancedResultsPanelProps {
  detectionFeatures?: {
    [key: string]: DetectionFeature;
  };
}

export function AdvancedResultsPanel({ detectionFeatures }: AdvancedResultsPanelProps) {
  if (!detectionFeatures || Object.keys(detectionFeatures).length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        <p>No advanced detection results available.</p>
        <p className="text-xs mt-1">Enable more detection features in Settings to see detailed results.</p>
      </div>
    );
  }

  // Helper function to get a human-readable name for the feature key
  const getFeatureName = (key: string): string => {
    const names: Record<string, string> = {
      artifactDetection: "Artifact Detection",
      lipSyncAnalysis: "Lip-Sync Analysis",
      metadataForensics: "Metadata Forensics",
      compressionArtifacts: "Compression Artifacts",
      ganDetection: "GAN Detection",
      cnnSignatures: "CNN Forgery Signatures",
      eyeBlinkAnalysis: "Eye Blink Analysis",
      microExpressions: "Micro-Expression Analysis",
      audioGlitchDetection: "Audio Glitch Detection",
      syntheticFingerprinting: "Synthetic Fingerprinting",
      adversarialTraining: "Adversarial Features",
      temporalInconsistencies: "Temporal Inconsistencies", 
      lightingShadowChecks: "Lighting/Shadow Checks",
      multimodalFusion: "Multimodal Analysis",
      biasMitigation: "Bias-Mitigated Results"
    };
    
    return names[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  // Helper function to get appropriate icon and color for a result
  const getResultDisplay = (feature: DetectionFeature) => {
    if (feature.detected) {
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        color: "text-orange-500",
        text: "Detected"
      };
    } else {
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        color: "text-green-500", 
        text: "Not detected"
      };
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Advanced Detection Results</h3>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(detectionFeatures).map(([key, feature]) => {
          const { icon, color, text } = getResultDisplay(feature);
          
          return (
            <div 
              key={key} 
              className="bg-muted/30 p-3 rounded-lg border border-muted"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{getFeatureName(key)}</h4>
                <div className={`flex items-center gap-1 text-xs ${color}`}>
                  {icon}
                  <span>{text}</span>
                </div>
              </div>
              
              {feature.details && (
                <p className="text-xs text-muted-foreground">{feature.details}</p>
              )}
              
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Confidence</span>
                  <span className="font-medium">{feature.confidence.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full mt-1 overflow-hidden">
                  <div 
                    className={`h-full ${feature.detected ? "bg-orange-500" : "bg-green-500"}`}
                    style={{ width: `${feature.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
