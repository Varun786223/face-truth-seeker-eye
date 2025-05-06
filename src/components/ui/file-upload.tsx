
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { File, X } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
  className?: string;
}

export function FileUpload({
  accept = "image/*",
  multiple = false,
  onChange,
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    
    const fileArray = Array.from(newFiles);
    setFiles(fileArray);
    onChange(fileArray);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChange(newFiles);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed p-6 transition-all",
          dragActive ? "border-primary bg-primary/5" : "border-muted",
          files.length > 0 && "border-primary/50 bg-primary/5"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
        
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
            <div className="rounded-full bg-muted p-3">
              <File className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                Drag & drop files here, or{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={openFileDialog}
                >
                  browse
                </Button>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {multiple ? "Upload multiple files" : "Upload a single file"}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between rounded-md bg-background p-3">
                <div className="flex items-center space-x-2">
                  <File className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => removeFile(i)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                className="text-xs"
              >
                {multiple ? "Add more files" : "Replace file"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
