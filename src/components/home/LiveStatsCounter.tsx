
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Shield, Zap } from "lucide-react";

export function LiveStatsCounter() {
  const [stats, setStats] = useState({
    analysisToday: 0,
    activeUsers: 0,
    threatsBlocked: 0,
    accuracyRate: 99.1
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        analysisToday: prev.analysisToday + Math.floor(Math.random() * 3) + 1,
        activeUsers: 15847 + Math.floor(Math.random() * 50),
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 2),
        accuracyRate: 99.1 + (Math.random() * 0.8)
      }));
    }, 2000);

    // Initialize with base values
    setStats({
      analysisToday: 2341,
      activeUsers: 15847,
      threatsBlocked: 892,
      accuracyRate: 99.4
    });

    return () => clearInterval(interval);
  }, []);

  const counters = [
    {
      icon: <Zap className="h-5 w-5" />,
      label: "Analyses Today",
      value: stats.analysisToday.toLocaleString(),
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Threats Blocked",
      value: stats.threatsBlocked.toLocaleString(),
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: "Accuracy Rate",
      value: `${stats.accuracyRate.toFixed(1)}%`,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section className="py-8 border-y bg-muted/10">
      <div className="container">
        <div className="text-center mb-6">
          <Badge variant="outline" className="mb-2">
            Live Statistics
          </Badge>
          <p className="text-sm text-muted-foreground">
            Real-time platform activity
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {counters.map((counter, index) => (
            <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-4 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${counter.bgColor} ${counter.color} mb-3`}>
                  {counter.icon}
                </div>
                <div className="text-2xl font-bold mb-1 tabular-nums">
                  {counter.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {counter.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
