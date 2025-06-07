
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, FileText, History, Star, Download, Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface AnalysisHistory {
  id: string;
  fileName: string;
  type: "image" | "video" | "webcam";
  result: "authentic" | "modified" | "inconclusive";
  confidence: number;
  date: Date;
  isBookmarked: boolean;
}

export function Dashboard() {
  const [analysisHistory] = useState<AnalysisHistory[]>([
    {
      id: "1",
      fileName: "profile_photo.jpg",
      type: "image",
      result: "authentic",
      confidence: 92,
      date: new Date("2024-01-15"),
      isBookmarked: true
    },
    {
      id: "2",
      fileName: "interview_video.mp4",
      type: "video",
      result: "modified",
      confidence: 87,
      date: new Date("2024-01-14"),
      isBookmarked: false
    },
    {
      id: "3",
      fileName: "live_stream.webm",
      type: "webcam",
      result: "inconclusive",
      confidence: 45,
      date: new Date("2024-01-13"),
      isBookmarked: false
    }
  ]);

  const getResultBadge = (result: string) => {
    switch (result) {
      case "authentic":
        return <Badge className="bg-green-500">Authentic</Badge>;
      case "modified":
        return <Badge className="bg-red-500">Modified</Badge>;
      case "inconclusive":
        return <Badge variant="outline">Inconclusive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStats = () => {
    const total = analysisHistory.length;
    const authentic = analysisHistory.filter(h => h.result === "authentic").length;
    const modified = analysisHistory.filter(h => h.result === "modified").length;
    const bookmarked = analysisHistory.filter(h => h.isBookmarked).length;
    
    return { total, authentic, modified, bookmarked };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Authentic Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.authentic}</div>
            <p className="text-xs text-muted-foreground">{Math.round((stats.authentic / stats.total) * 100)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Modified Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.modified}</div>
            <p className="text-xs text-muted-foreground">{Math.round((stats.modified / stats.total) * 100)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bookmarked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.bookmarked}</div>
            <p className="text-xs text-muted-foreground">Saved for later</p>
          </CardContent>
        </Card>
      </div>

      {/* Analysis History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Analysis History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {analysisHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {item.type === "image" && <FileText className="h-4 w-4 text-blue-500" />}
                      {item.type === "video" && <BarChart3 className="h-4 w-4 text-purple-500" />}
                      {item.type === "webcam" && <Eye className="h-4 w-4 text-green-500" />}
                      <span className="font-medium">{item.fileName}</span>
                      {item.isBookmarked && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {getResultBadge(item.result)}
                    <span className="text-sm text-muted-foreground">{item.confidence}%</span>
                    <span className="text-sm text-muted-foreground">{format(item.date, "MMM dd, yyyy")}</span>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="bookmarked">
              <div className="text-center py-8 text-muted-foreground">
                <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your bookmarked analyses will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <div className="text-center py-8 text-muted-foreground">
                <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Recent analyses from the last 7 days</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
