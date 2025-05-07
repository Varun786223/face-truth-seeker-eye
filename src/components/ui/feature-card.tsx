
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  link,
  className,
}: FeatureCardProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (link) {
      return (
        <Link to={link} className="block">
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };
  
  return (
    <CardWrapper>
      <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
        <CardHeader className="pb-2">
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
