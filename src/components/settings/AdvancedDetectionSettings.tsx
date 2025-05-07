
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export function AdvancedDetectionSettings() {
  // Feature toggles
  const [detectionFeatures, setDetectionFeatures] = useState({
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
  });

  // Sensitivity settings
  const [sensitivityLevels, setSensitivityLevels] = useState({
    visualDetection: 70,
    audioDetection: 65,
    metadataAnalysis: 80,
  });

  const handleFeatureToggle = (feature: keyof typeof detectionFeatures) => {
    setDetectionFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleSensitivityChange = (key: keyof typeof sensitivityLevels, value: number[]) => {
    setSensitivityLevels(prev => ({
      ...prev,
      [key]: value[0]
    }));
  };

  // Feature descriptions for tooltips
  const featureDescriptions: Record<keyof typeof detectionFeatures, string> = {
    artifactDetection: "Detects GAN fingerprints and blurring inconsistencies in generated images",
    lipSyncAnalysis: "Analyzes if lip movements match spoken words in videos",
    metadataForensics: "Examines EXIF data and editing tool traces",
    compressionArtifacts: "Uses Error Level Analysis to detect manipulation",
    ganDetection: "Specialized detection for GAN-generated media",
    cnnSignatures: "Advanced CNN-based forgery signature detection",
    eyeBlinkAnalysis: "Analyzes natural vs. unnatural eye blinking patterns",
    microExpressions: "Detects subtle facial expression inconsistencies",
    audioGlitchDetection: "Identifies unnatural pauses and tones in audio",
    syntheticFingerprinting: "Identifies unique patterns in synthetic media",
    adversarialTraining: "Enhanced model defense against adversarial examples",
    temporalInconsistencies: "Detects frame-by-frame anomalies in videos",
    lightingShadowChecks: "Analyzes lighting and shadow consistency",
    multimodalFusion: "Combines audio, visual, and text analysis for better results",
    biasMitigation: "Reduces algorithm bias in detection results"
  };

  const FeatureToggle = ({ 
    id, 
    label, 
    description
  }: { 
    id: keyof typeof detectionFeatures; 
    label: string;
    description: string;
  }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id} className="cursor-pointer">{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-[250px]">
              <p className="text-xs">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Switch
        id={id}
        checked={detectionFeatures[id]}
        onCheckedChange={() => handleFeatureToggle(id)}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Detection Sensitivity</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="visual-sensitivity">Visual Detection Sensitivity</Label>
              <span className="text-sm text-muted-foreground">{sensitivityLevels.visualDetection}%</span>
            </div>
            <Slider
              id="visual-sensitivity"
              min={0}
              max={100}
              step={1}
              value={[sensitivityLevels.visualDetection]}
              onValueChange={(value) => handleSensitivityChange('visualDetection', value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="audio-sensitivity">Audio Detection Sensitivity</Label>
              <span className="text-sm text-muted-foreground">{sensitivityLevels.audioDetection}%</span>
            </div>
            <Slider
              id="audio-sensitivity"
              min={0}
              max={100}
              step={1}
              value={[sensitivityLevels.audioDetection]}
              onValueChange={(value) => handleSensitivityChange('audioDetection', value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="metadata-sensitivity">Metadata Analysis Sensitivity</Label>
              <span className="text-sm text-muted-foreground">{sensitivityLevels.metadataAnalysis}%</span>
            </div>
            <Slider
              id="metadata-sensitivity"
              min={0}
              max={100}
              step={1}
              value={[sensitivityLevels.metadataAnalysis]}
              onValueChange={(value) => handleSensitivityChange('metadataAnalysis', value)}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Visual Analysis Features</h3>
        <div className="divide-y">
          <FeatureToggle id="artifactDetection" label="Artifact Detection" description={featureDescriptions.artifactDetection} />
          <FeatureToggle id="ganDetection" label="GAN-Generated Media Detection" description={featureDescriptions.ganDetection} />
          <FeatureToggle id="cnnSignatures" label="CNN-Based Forgery Signatures" description={featureDescriptions.cnnSignatures} />
          <FeatureToggle id="eyeBlinkAnalysis" label="Eye Blink Pattern Analysis" description={featureDescriptions.eyeBlinkAnalysis} />
          <FeatureToggle id="microExpressions" label="Micro-Expression Recognition" description={featureDescriptions.microExpressions} />
          <FeatureToggle id="lipSyncAnalysis" label="Lip-Sync Mismatch Detection" description={featureDescriptions.lipSyncAnalysis} />
          <FeatureToggle id="lightingShadowChecks" label="Lighting/Shadow Consistency" description={featureDescriptions.lightingShadowChecks} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Audio Analysis Features</h3>
        <div className="divide-y">
          <FeatureToggle id="audioGlitchDetection" label="Audio Glitch Detection" description={featureDescriptions.audioGlitchDetection} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Metadata & Technical Features</h3>
        <div className="divide-y">
          <FeatureToggle id="metadataForensics" label="Metadata Forensics" description={featureDescriptions.metadataForensics} />
          <FeatureToggle id="compressionArtifacts" label="Compression Artifact Analysis" description={featureDescriptions.compressionArtifacts} />
          <FeatureToggle id="syntheticFingerprinting" label="Synthetic Media Fingerprinting" description={featureDescriptions.syntheticFingerprinting} />
          <FeatureToggle id="temporalInconsistencies" label="Temporal Inconsistencies" description={featureDescriptions.temporalInconsistencies} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Advanced Features</h3>
        <div className="divide-y">
          <FeatureToggle id="multimodalFusion" label="Multimodal Fusion" description={featureDescriptions.multimodalFusion} />
          <FeatureToggle id="adversarialTraining" label="Adversarial Robustness Training" description={featureDescriptions.adversarialTraining} />
          <FeatureToggle id="biasMitigation" label="Bias Mitigation Audits" description={featureDescriptions.biasMitigation} />
        </div>
      </div>
    </div>
  );
}
