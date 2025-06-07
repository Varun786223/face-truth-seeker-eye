
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface EnhancedSkeletonProps {
  variant?: "card" | "text" | "avatar" | "button" | "list" | "grid";
  className?: string;
  count?: number;
}

export function EnhancedSkeleton({ variant = "card", className, count = 1 }: EnhancedSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div className="space-y-4 p-6 border rounded-lg">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        );
      
      case "text":
        return (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        );
      
      case "avatar":
        return (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        );
      
      case "button":
        return <Skeleton className="h-10 w-24 rounded-md" />;
      
      case "list":
        return (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        );
      
      case "grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4 p-4 border rounded-lg">
                <Skeleton className="h-32 w-full rounded" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        );
      
      default:
        return <Skeleton className={className} />;
    }
  };

  return (
    <div className={cn("animate-pulse", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={count > 1 ? "mb-4" : ""}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}
