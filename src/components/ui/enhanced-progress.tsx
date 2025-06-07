
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface EnhancedProgressProps {
  value: number;
  max?: number;
  status?: "loading" | "success" | "error" | "warning";
  label?: string;
  showPercentage?: boolean;
  variant?: "default" | "circular" | "steps";
  steps?: string[];
  currentStep?: number;
  className?: string;
}

export function EnhancedProgress({
  value,
  max = 100,
  status = "loading",
  label,
  showPercentage = true,
  variant = "default",
  steps,
  currentStep = 0,
  className
}: EnhancedProgressProps) {
  const percentage = Math.round((value / max) * 100);

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-primary";
    }
  };

  if (variant === "steps" && steps) {
    return (
      <div className={cn("space-y-4", className)}>
        {label && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{label}</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
        )}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                index < currentStep ? "bg-green-500 text-white" :
                index === currentStep ? "bg-primary text-primary-foreground" :
                "bg-muted text-muted-foreground"
              )}>
                {index < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={cn(
                "text-sm",
                index <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "circular") {
    const strokeDasharray = 2 * Math.PI * 45;
    const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

    return (
      <div className={cn("flex flex-col items-center space-y-2", className)}>
        <div className="relative">
          <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/20"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={cn(
                "transition-all duration-500 ease-in-out",
                getProgressColor().replace("bg-", "text-")
              )}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold">{percentage}%</span>
          </div>
        </div>
        {label && <span className="text-sm text-center">{label}</span>}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            {label && <span className="text-sm font-medium">{label}</span>}
          </div>
          {showPercentage && (
            <span className="text-sm text-muted-foreground">{percentage}%</span>
          )}
        </div>
      )}
      <Progress 
        value={percentage} 
        className={cn(
          "h-2 transition-all duration-300",
          status === "success" && "[&>div]:bg-green-500",
          status === "error" && "[&>div]:bg-red-500",
          status === "warning" && "[&>div]:bg-yellow-500"
        )}
      />
    </div>
  );
}
