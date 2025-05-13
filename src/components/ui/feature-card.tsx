
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  className?: string;
  category?: string;
  isFeatured?: boolean;
}

export function FeatureCard({
  title,
  description,
  icon,
  link,
  className,
  category,
  isFeatured = false,
}: FeatureCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md border-muted",
        isFeatured && "border-primary/20 bg-primary/5",
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {category && (
            <Badge variant="outline" className="capitalize text-xs">
              {category}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardContent>
      {link && (
        <CardFooter className="pt-0">
          <Button asChild variant="ghost" className="p-0 h-auto font-normal text-primary group">
            <Link to={link} className="flex items-center">
              Try this feature
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
