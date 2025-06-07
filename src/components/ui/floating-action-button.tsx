
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Upload, 
  Camera, 
  Video, 
  FileText,
  X
} from "lucide-react";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <Upload className="h-4 w-4" />,
      label: "Upload Image",
      href: "/image-analysis"
    },
    {
      icon: <Video className="h-4 w-4" />,
      label: "Upload Video",
      href: "/video-analysis"
    },
    {
      icon: <Camera className="h-4 w-4" />,
      label: "Use Webcam",
      href: "/webcam-analysis"
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "View Report",
      href: "/report"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      {isOpen && (
        <div className="mb-4 space-y-2">
          {actions.map((action, index) => (
            <div 
              key={index}
              className="flex items-center justify-end animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="mr-3 px-3 py-2 bg-background/95 backdrop-blur-sm border border-border rounded-lg text-sm font-medium text-foreground shadow-lg">
                {action.label}
              </span>
              <Button
                size="sm"
                variant="outline"
                className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-background/95 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40"
                asChild
              >
                <a href={action.href}>
                  {action.icon}
                </a>
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="lg"
        className="h-16 w-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary-foreground/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-200" />
        ) : (
          <Plus className="h-6 w-6 transition-transform duration-200" />
        )}
      </Button>
    </div>
  );
}
