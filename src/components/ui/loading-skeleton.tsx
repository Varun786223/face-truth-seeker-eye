
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  type: "card" | "list" | "dashboard" | "analysis";
  count?: number;
}

export function LoadingSkeleton({ type, count = 1 }: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className="space-y-3">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-20 w-full" />
          </div>
        );
      
      case "list":
        return (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        );
      
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3 p-4 border rounded-lg">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "analysis":
        return (
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        );
      
      default:
        return <Skeleton className="h-4 w-[250px]" />;
    }
  };

  return (
    <div className="animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={count > 1 ? "mb-4" : ""}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}
