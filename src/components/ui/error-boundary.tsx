
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
  variant?: "404" | "500" | "network" | "generic";
  title?: string;
  description?: string;
}

export function ErrorPage({ 
  error, 
  reset, 
  variant = "generic",
  title,
  description 
}: ErrorPageProps) {
  const getErrorContent = () => {
    switch (variant) {
      case "404":
        return {
          title: "Page Not Found",
          description: "The page you're looking for doesn't exist or has been moved.",
          icon: "🔍"
        };
      case "500":
        return {
          title: "Server Error",
          description: "Something went wrong on our end. Please try again later.",
          icon: "⚠️"
        };
      case "network":
        return {
          title: "Connection Error",
          description: "Unable to connect to our services. Please check your internet connection.",
          icon: "🌐"
        };
      default:
        return {
          title: title || "Something went wrong",
          description: description || error?.message || "An unexpected error occurred.",
          icon: "❌"
        };
    }
  };

  const content = getErrorContent();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="text-6xl mb-4">{content.icon}</div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {content.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            {content.description}
          </p>
          
          {error && (
            <details className="text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                Technical Details
              </summary>
              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                {error.stack || error.message}
              </pre>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {reset && (
              <Button onClick={reset} variant="default" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<any> },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || ErrorPage;
      return (
        <FallbackComponent 
          error={this.state.error}
          reset={() => this.setState({ hasError: false, error: undefined })}
        />
      );
    }

    return this.props.children;
  }
}
