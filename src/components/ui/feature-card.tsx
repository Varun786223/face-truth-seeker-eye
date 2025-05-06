
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  return (
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
  );
}
