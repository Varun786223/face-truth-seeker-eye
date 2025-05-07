
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";

interface PDFReportOptions {
  includeSummary: boolean;
  includeDetailsView: boolean;
  includeVerification: boolean;
  includeAdvancedResults: boolean;
  includeScreenshot: boolean;
  includeMetadata: boolean;
}

interface PDFReportGeneratorProps {
  analysisResults: any;
  mediaType: "image" | "video" | "webcam";
  onGenerate: (options: PDFReportOptions) => void;
}

export function PDFReportGenerator({ analysisResults, mediaType, onGenerate }: PDFReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportOptions, setReportOptions] = useState<PDFReportOptions>({
    includeSummary: true,
    includeDetailsView: true,
    includeVerification: true,
    includeAdvancedResults: true,
    includeScreenshot: true,
    includeMetadata: true
  });

  const toggleOption = (option: keyof PDFReportOptions) => {
    setReportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleGenerateReport = async () => {
    if (!analysisResults) {
      toast.error("No analysis results to generate report");
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate report generation with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the onGenerate callback with the selected options
      onGenerate(reportOptions);
      
      toast.success("PDF report generated successfully");
    } catch (error) {
      console.error("Error generating PDF report:", error);
      toast.error("Failed to generate PDF report");
    } finally {
      setIsGenerating(false);
    }
  };

  // Format date for the report filename
  const getFormattedDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generate PDF Report
        </CardTitle>
        <CardDescription>
          Create a detailed PDF report of the {mediaType} analysis results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="summary"
              checked={reportOptions.includeSummary}
              onCheckedChange={() => toggleOption('includeSummary')}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="summary"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Summary
              </label>
              <p className="text-sm text-muted-foreground">
                Overall deepfake score and confidence level
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="details"
              checked={reportOptions.includeDetailsView}
              onCheckedChange={() => toggleOption('includeDetailsView')}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="details"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Detailed Analysis
              </label>
              <p className="text-sm text-muted-foreground">
                Technical details of the detection results
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="verification"
              checked={reportOptions.includeVerification}
              onCheckedChange={() => toggleOption('includeVerification')}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="verification"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Verification Results
              </label>
              <p className="text-sm text-muted-foreground">
                Reverse search, blockchain verification, and user reports
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="advanced"
              checked={reportOptions.includeAdvancedResults}
              onCheckedChange={() => toggleOption('includeAdvancedResults')}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="advanced"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Advanced Results
              </label>
              <p className="text-sm text-muted-foreground">
                Detailed results from all enabled detection features
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="screenshot"
              checked={reportOptions.includeScreenshot}
              onCheckedChange={() => toggleOption('includeScreenshot')}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="screenshot"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Media Screenshot
              </label>
              <p className="text-sm text-muted-foreground">
                Screenshot of the analyzed {mediaType}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="metadata"
              checked={reportOptions.includeMetadata}
              onCheckedChange={() => toggleOption('includeMetadata')}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="metadata"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include File Metadata
              </label>
              <p className="text-sm text-muted-foreground">
                Technical metadata about the analyzed file
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerateReport}
          className="w-full mt-6 gap-2"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>Generating Report...</>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF Report
            </>
          )}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-3">
          Report will be named: deepfake-analysis-{getFormattedDate()}.pdf
        </p>
      </CardContent>
    </Card>
  );
}
