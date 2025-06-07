
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "@/components/ui/file-upload";
import { Upload, X, Play, Pause, FileText, Video, Image, Check } from "lucide-react";
import { toast } from "sonner";

interface FileItem {
  id: string;
  file: File;
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
  result?: "authentic" | "modified" | "inconclusive";
  confidence?: number;
}

export function AdvancedFileManager() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);

  const handleFileChange = useCallback((newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      file,
      status: "pending",
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...fileItems]);
    toast.success(`Added ${newFiles.length} file(s) for batch processing`);
  }, []);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const startBatchProcessing = async () => {
    if (files.length === 0) {
      toast.error("No files to process");
      return;
    }

    setIsProcessing(true);
    setBatchProgress(0);

    // Process files sequentially
    for (let i = 0; i < files.length; i++) {
      const fileId = files[i].id;
      
      // Update file status to processing
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, status: "processing" as const } : f
      ));

      // Simulate processing with progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }

      // Simulate analysis result
      const mockResults = ["authentic", "modified", "inconclusive"] as const;
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      const confidence = Math.floor(Math.random() * 30) + 70;

      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: "completed" as const, result, confidence, progress: 100 }
          : f
      ));

      // Update batch progress
      setBatchProgress(((i + 1) / files.length) * 100);
    }

    setIsProcessing(false);
    toast.success("Batch processing completed!");
  };

  const pauseProcessing = () => {
    setIsProcessing(false);
    toast.info("Processing paused");
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-4 w-4 text-blue-500" />;
    if (file.type.startsWith('video/')) return <Video className="h-4 w-4 text-purple-500" />;
    return <FileText className="h-4 w-4 text-gray-500" />;
  };

  const getStatusBadge = (status: FileItem['status']) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "processing":
        return <Badge className="bg-blue-500">Processing</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "error":
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getResultBadge = (result?: string) => {
    switch (result) {
      case "authentic":
        return <Badge className="bg-green-500">Authentic</Badge>;
      case "modified":
        return <Badge className="bg-red-500">Modified</Badge>;
      case "inconclusive":
        return <Badge variant="outline">Inconclusive</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Advanced File Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload Area */}
        <FileUpload
          onChange={handleFileChange}
          accept="image/*,video/*"
          multiple={true}
        />

        {/* Batch Controls */}
        {files.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="font-medium">{files.length} files queued</span>
              {isProcessing && (
                <div className="flex items-center gap-2">
                  <Progress value={batchProgress} className="w-32" />
                  <span className="text-sm text-muted-foreground">{Math.round(batchProgress)}%</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {!isProcessing ? (
                <Button onClick={startBatchProcessing} className="gap-2">
                  <Play className="h-4 w-4" />
                  Start Batch Processing
                </Button>
              ) : (
                <Button onClick={pauseProcessing} variant="outline" className="gap-2">
                  <Pause className="h-4 w-4" />
                  Pause Processing
                </Button>
              )}
            </div>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Files in Queue</h4>
            {files.map((fileItem) => (
              <div key={fileItem.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  {getFileIcon(fileItem.file)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{fileItem.file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {fileItem.status === "processing" && (
                    <div className="flex items-center gap-2">
                      <Progress value={fileItem.progress} className="w-20" />
                      <span className="text-xs">{fileItem.progress}%</span>
                    </div>
                  )}
                  
                  {getStatusBadge(fileItem.status)}
                  
                  {fileItem.result && getResultBadge(fileItem.result)}
                  
                  {fileItem.confidence && (
                    <span className="text-sm text-muted-foreground">{fileItem.confidence}%</span>
                  )}
                  
                  {fileItem.status === "completed" && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeFile(fileItem.id)}
                    disabled={fileItem.status === "processing"}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
