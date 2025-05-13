
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { features } from "@/data/features";
import { Feature } from "@/types/features";
import { FileUpload } from "@/components/ui/file-upload";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Info, 
  Search, 
  Shield, 
  Filter,
  Star,
  SortAsc,
  Zap,
  FileCheck,
  Loader2,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

export function AllFeaturesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("detection");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [favoriteFeatures, setFavoriteFeatures] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<"default" | "az" | "popular">("default");
  const isMobile = useIsMobile();
  
  // Group features by category
  const categories = [...new Set(features.map(feature => feature.category))];
  const [featuresByCategory, setFeaturesByCategory] = useState<Record<string, Feature[]>>({});
  
  // Initialize features by category
  useEffect(() => {
    const initialFeaturesByCategory = features.reduce((acc, feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = [];
      }
      acc[feature.category].push(feature);
      return acc;
    }, {} as Record<string, Feature[]>);
    
    setFeaturesByCategory(initialFeaturesByCategory);
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteFeatures');
    if (savedFavorites) {
      setFavoriteFeatures(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Apply search filter and sorting
  const getFilteredFeatures = (category: string) => {
    if (!featuresByCategory[category]) return [];
    
    let filtered = [...featuresByCategory[category]];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(feature => 
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        feature.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by favorites if enabled
    if (showFavoritesOnly) {
      filtered = filtered.filter(feature => favoriteFeatures.includes(feature.id));
    }
    
    // Apply sorting
    switch (sortOrder) {
      case "az":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "popular":
        // This would ideally use actual popularity data
        // For now, just a placeholder that puts favorites first
        filtered.sort((a, b) => {
          const aFav = favoriteFeatures.includes(a.id);
          const bFav = favoriteFeatures.includes(b.id);
          return aFav === bFav ? 0 : aFav ? -1 : 1;
        });
        break;
    }
    
    return filtered;
  };
  
  // Handle drag end for features
  const onDragEnd = (result: DropResult, category: string) => {
    if (!result.destination) return;
    
    const items = Array.from(featuresByCategory[category] || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update the features list for the category
    setFeaturesByCategory(prev => ({
      ...prev,
      [category]: items
    }));
  };
  
  // Toggle favorite status for a feature
  const toggleFavorite = (featureId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    setFavoriteFeatures(prev => {
      const updated = prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId];
      
      // Save to localStorage
      localStorage.setItem('favoriteFeatures', JSON.stringify(updated));
      return updated;
    });
  };
  
  // Handle file upload
  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);
    
    if (files.length > 0) {
      toast.success(`${files.length} file(s) uploaded successfully`);
    }
  };
  
  // Handle analysis start
  const handleAnalyze = () => {
    if (!selectedFeature) {
      toast.error("Please select a feature first");
      return;
    }
    
    if (uploadedFiles.length === 0) {
      toast.error("Please upload files to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    toast.info(`Analyzing ${uploadedFiles.length} files using ${selectedFeature.title}...`, {
      duration: 2000,
    });
    
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success(`Analysis complete using ${selectedFeature.title}`);
    }, 3000);
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background" id="all-features">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            AI Analysis Toolkit
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore our comprehensive suite of AI analysis tools.
            Drag, drop and organize features to analyze your content.
          </p>
        </div>
        
        <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="mb-6">
            <div className="bg-muted/30 p-4 rounded-lg mb-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search features..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Checkbox
                  id="favorites-only"
                  checked={showFavoritesOnly}
                  onCheckedChange={(checked) => setShowFavoritesOnly(!!checked)}
                />
                <label htmlFor="favorites-only" className="text-sm cursor-pointer">
                  Favorites only
                </label>
              </div>
              
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setSortOrder(current => {
                    const orders: ("default" | "az" | "popular")[] = ["default", "az", "popular"];
                    const currentIndex = orders.indexOf(current);
                    return orders[(currentIndex + 1) % orders.length];
                  })}
                >
                  <SortAsc className="h-4 w-4" />
                  {sortOrder === "default" ? "Default" : sortOrder === "az" ? "A-Z" : "Popular"}
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto pb-2 mb-2">
              <TabsList className="inline-flex h-auto p-1">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="capitalize px-4 py-2"
                  >
                    {category.replace(/-/g, " ")}
                    <Badge variant="outline" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {featuresByCategory[category]?.length || 0}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`md:col-span-2 space-y-6 ${isMobile ? 'order-2' : 'order-1'}`}>
                  <Card className="border-primary/20">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="capitalize">
                            {category.replace(/-/g, " ")} Features
                          </CardTitle>
                          <CardDescription>
                            Drag and drop to reorder features
                          </CardDescription>
                        </div>
                        <Badge variant="outline">
                          {getFilteredFeatures(category).length} features
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {getFilteredFeatures(category).length > 0 ? (
                        <DragDropContext onDragEnd={(result) => onDragEnd(result, category)}>
                          <Droppable droppableId={`features-${category}`}>
                            {(provided) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-3"
                              >
                                {getFilteredFeatures(category).map((feature, index) => (
                                  <Draggable 
                                    key={feature.id} 
                                    draggableId={feature.id} 
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={cn(
                                          "p-3 rounded-lg border transition-all",
                                          snapshot.isDragging ? "bg-primary/5 shadow-lg" : "bg-card hover:shadow-md",
                                          selectedFeature?.id === feature.id ? "border-primary ring-1 ring-primary/30" : "border-muted",
                                          favoriteFeatures.includes(feature.id) && "bg-primary/5"
                                        )}
                                        onClick={() => setSelectedFeature(feature)}
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="flex gap-3">
                                            <div className="mt-0.5 bg-primary/10 p-2 rounded-md">
                                              <Shield className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                              <h3 className="font-medium text-sm flex items-center gap-1">
                                                {feature.title}
                                                {favoriteFeatures.includes(feature.id) && (
                                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                )}
                                              </h3>
                                              <p className="text-xs text-muted-foreground mt-1">
                                                {feature.description}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-7 w-7 p-0 rounded-full"
                                              onClick={(e) => toggleFavorite(feature.id, e)}
                                            >
                                              <Star 
                                                className={cn(
                                                  "h-4 w-4",
                                                  favoriteFeatures.includes(feature.id) && "fill-yellow-400 text-yellow-400"
                                                )} 
                                              />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-7 w-7 p-0 rounded-full"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedFeature(feature);
                                              }}
                                            >
                                              <Info className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      ) : (
                        <div className="py-10 text-center text-muted-foreground">
                          <Shield className="mx-auto h-10 w-10 opacity-20 mb-3" />
                          <p>No features match your search criteria</p>
                          {searchQuery && (
                            <Button 
                              variant="link" 
                              onClick={() => setSearchQuery("")}
                              className="mt-2"
                            >
                              Clear search
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div className={`${isMobile ? 'order-1' : 'order-2'}`}>
                  <Card className="sticky top-24 border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle>Analyze Content</CardTitle>
                      <CardDescription>
                        {selectedFeature 
                          ? `Using ${selectedFeature.title}` 
                          : "Select a feature and upload files"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedFeature ? (
                        <>
                          <div className="bg-muted/30 p-3 rounded-md">
                            <div className="flex items-center gap-2 mb-1">
                              <Shield className="h-4 w-4 text-primary" />
                              <h4 className="font-medium text-sm">
                                {selectedFeature.title}
                                {favoriteFeatures.includes(selectedFeature.id) && (
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1 inline-block" />
                                )}
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {selectedFeature.description}
                            </p>
                          </div>
                          
                          <FileUpload 
                            accept="*/*" 
                            multiple={true}
                            onChange={handleFileUpload}
                            className="mt-4" 
                          />
                          
                          {uploadedFiles.length > 0 && (
                            <div className="bg-muted/20 p-3 rounded-md">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Files Ready</span>
                                <Badge variant="outline">{uploadedFiles.length}</Badge>
                              </div>
                              <div className="max-h-20 overflow-y-auto text-xs text-muted-foreground">
                                {uploadedFiles.map((file, i) => (
                                  <div key={i} className="flex items-center gap-1 py-0.5">
                                    <FileCheck className="h-3 w-3" />
                                    <span className="truncate">{file.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="py-8 text-center text-muted-foreground">
                          <Shield className="mx-auto h-8 w-8 opacity-30 mb-3" />
                          <p>Select a feature to analyze content</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        disabled={!selectedFeature || uploadedFiles.length === 0 || isAnalyzing}
                        onClick={handleAnalyze}
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-2 h-4 w-4" />
                            Analyze Files
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Learn More Section */}
        <div className="flex justify-center mt-12">
          <Button 
            asChild 
            variant="outline" 
            className="group"
          >
            <a href="/resources">
              Learn more about our analysis technology
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
      
      {/* Feature Detail Dialog */}
      {selectedFeature && (
        <Dialog open={!!selectedFeature && !!selectedFeature.id} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedFeature.title}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedFeature) {
                      toggleFavorite(selectedFeature.id, e);
                    }
                  }}
                >
                  <Star 
                    className={cn(
                      "h-4 w-4",
                      selectedFeature && favoriteFeatures.includes(selectedFeature.id) && "fill-yellow-400 text-yellow-400"
                    )} 
                  />
                </Button>
              </DialogTitle>
              <DialogDescription className="pt-2">
                {selectedFeature.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium text-sm">Problem Solved:</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedFeature.problem}</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium text-sm">Revenue Model:</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedFeature.revenue}</p>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedFeature(null)}>
                  Close
                </Button>
                <Button asChild>
                  <a href={selectedFeature.link}>Try This Feature</a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
