
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "glow" | "scale" | "tilt";
  clickEffect?: boolean;
}

export function InteractiveCard({ 
  children, 
  className, 
  hoverEffect = "lift",
  clickEffect = true 
}: InteractiveCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  const getHoverClass = () => {
    switch (hoverEffect) {
      case "lift":
        return "hover:translate-y-[-4px] hover:shadow-lg";
      case "glow":
        return "hover:shadow-2xl hover:shadow-primary/20";
      case "scale":
        return "hover:scale-105";
      case "tilt":
        return "hover:rotate-1";
      default:
        return "";
    }
  };

  return (
    <Card
      className={cn(
        "transition-all duration-300 cursor-pointer",
        getHoverClass(),
        clickEffect && isPressed && "scale-95",
        className
      )}
      onMouseDown={() => clickEffect && setIsPressed(true)}
      onMouseUp={() => clickEffect && setIsPressed(false)}
      onMouseLeave={() => clickEffect && setIsPressed(false)}
    >
      {children}
    </Card>
  );
}

interface PulseButtonProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
  onClick?: () => void;
}

export function PulseButton({ 
  children, 
  variant = "default", 
  className, 
  onClick 
}: PulseButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    onClick?.();
  };

  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "error":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "";
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        getVariantClass(),
        isAnimating && "animate-pulse",
        className
      )}
    >
      {isAnimating && (
        <div className="absolute inset-0 bg-white/20 rounded-md animate-ping" />
      )}
      {children}
    </Button>
  );
}

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FloatingLabelInput({
  label,
  type = "text",
  value,
  onChange,
  className
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-3 pt-6 pb-2 border border-input rounded-md bg-background text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <label
        className={cn(
          "absolute left-3 transition-all duration-200 pointer-events-none text-muted-foreground",
          (isFocused || hasValue) 
            ? "top-2 text-xs text-primary" 
            : "top-4 text-base"
        )}
      >
        {label}
      </label>
    </div>
  );
}

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export function ProgressiveImage({ 
  src, 
  alt, 
  className, 
  placeholder = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20300'%3E%3Crect%20width='100%25'%20height='100%25'%20fill='%23f0f0f0'/%3E%3C/svg%3E"
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && (
        <img
          src={placeholder}
          alt=""
          className={cn("blur-sm", className)}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        className={cn(
          "transition-all duration-500",
          isLoaded ? "opacity-100" : "opacity-0 absolute inset-0",
          isError && "hidden",
          className
        )}
      />
    </div>
  );
}
