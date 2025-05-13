
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface AnimatedGradientProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  gradientClassName?: string;
}

export function AnimatedGradient({
  children,
  className,
  gradientClassName,
  ...props
}: AnimatedGradientProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-xl", className)}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-50 blur-xl filter",
          gradientClassName || "bg-gradient-to-r from-blue-600 to-indigo-500"
        )}
      />
      <div
        className="animate-pulse-slow absolute inset-x-0 top-0 h-[120%] w-[120%] rotate-12 translate-x-[-10%] opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
