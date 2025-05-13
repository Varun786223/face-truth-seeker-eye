
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, AlertTriangle, Download, Share2, CheckCircle, XCircle } from "lucide-react";

interface AnalysisResult {
  fileName: string;
  confidence: number;
  result: "authentic" | "modified" | "inconclusive";
  details: {
    category: string;
    score: number;
    description: string;
  }[];
}

interface ResultsPanelProps {
  results: AnalysisResult[];
  featureName: string;
  onClose: () => void;
}

export function ResultsPanel({ results, featureName, onClose }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<string>(results[0]?.fileName || "summary");
  
  const getSummary = () => {
    const authentic = results.filter(r => r.result === "authentic").length;
    const modified = results.filter(r => r.result === "modified").length;
    const inconclusive = results.filter(r => r.result === "inconclusive").length;
    
    return { authentic, modified, inconclusive, total: results.length };
  };
  
  const summary = getSummary();
  
  const getResultColor = (result: string) => {
    switch (result) {
      case "authentic": return "bg-green-500";
      case "modified": return "bg-red-500";
      case "inconclusive": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };
  
  const getResultBadge = (result: string) => {
    switch (result) {
      case "authentic": 
        return <Badge className="bg-green-500">Authentic</Badge>;
      case "modified": 
        return <Badge className="bg-red-500">Modified</Badge>;
      case "inconclusive": 
        return <Badge variant="outline">Inconclusive</Badge>;
      default: 
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <Card className="border-primary/20 animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>Using {featureName}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex">
              <TabsTrigger value="summary">
                Summary
              </TabsTrigger>
              {results.map((result) => (
                <TabsTrigger key={result.fileName} value={result.fileName}>
                  <div className="flex items-center gap-1 max-w-xs truncate">
                    <FileCheck className="h-3 w-3" />
                    <span className="truncate">{result.fileName}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="summary" className="pt-4">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="bg-muted/20 p-4 rounded-md flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Results Summary</h3>
                    <Badge>{summary.total} files</Badge>
                  </div>
                  
                  <div className="space-y-3 pt-1">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Authentic
                        </span>
                        <span>{summary.authentic} files</span>
                      </div>
                      <Progress value={(summary.authentic / summary.total) * 100} className="h-2 bg-muted" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-red-500"></span>
                          Modified
                        </span>
                        <span>{summary.modified} files</span>
                      </div>
                      <Progress value={(summary.modified / summary.total) * 100} className="h-2 bg-muted" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                          Inconclusive
                        </span>
                        <span>{summary.inconclusive} files</span>
                      </div>
                      <Progress value={(summary.inconclusive / summary.total) * 100} className="h-2 bg-muted" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-md flex-1">
                  <h3 className="font-medium mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Download className="h-4 w-4" />
                      Download Full Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Results
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Report Modified Files
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/20 p-4 rounded-md">
                <h3 className="font-medium mb-3">Analysis Summary</h3>
                <p className="text-sm text-muted-foreground">
                  {featureName} analyzed {summary.total} files and identified {summary.modified} files with potential modifications.
                  {summary.modified > 0 && ' Review the individual files for detailed results.'}
                </p>
              </div>
            </div>
          </TabsContent>
          
          {results.map((result) => (
            <TabsContent key={result.fileName} value={result.fileName} className="pt-4">
              <div className="space-y-4">
                <div className="bg-muted/20 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{result.fileName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {getResultBadge(result.result)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Confidence: {result.confidence}%
                        </span>
                      </div>
                    </div>
                    
                    {result.result === "authentic" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : result.result === "modified" ? (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Detection Details</h3>
                  
                  {result.details.map((detail, i) => (
                    <div key={i} className="bg-muted/20 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">{detail.category}</h4>
                        <Badge variant={detail.score > 70 ? "destructive" : detail.score > 30 ? "outline" : "secondary"}>
                          {detail.score}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{detail.description}</p>
                      <Progress value={detail.score} className="h-1.5 mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
