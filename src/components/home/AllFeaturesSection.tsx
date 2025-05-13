
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { features } from "@/data/features";
import { Feature } from "@/types/features";
import { FileUpload } from "@/components/ui/file-upload";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Search, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AllFeaturesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("detection");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Group features by category
  const categories = [...new Set(features.map(feature => feature.category))];
  const featuresByCategory = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);
  
  // Handle drag end for features
  const onDragEnd = (result: DropResult, category: string) => {
    if (!result.destination) return;
    
    const items = Array.from(featuresByCategory[category]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update the features list for the category
    featuresByCategory[category] = items;
  };
  
  // Handle file upload
  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);
    
    if (files.length > 0 && selectedFeature) {
      // Here we would normally process the files with the selected feature
      // For now, just show a toast notification
      toast({
        title: "Analysis Started",
        description: `Analyzing ${files.length} files with ${selectedFeature.title}`,
      });
    }
  };
  
  return (
    <section className="py-16 bg-muted/20" id="all-features">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            All DeepSentinel Features
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore our comprehensive suite of AI fraud detection tools. 
            Drag and drop features to analyze your content.
          </p>
        </div>
        
        <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="overflow-x-auto pb-4">
            <TabsList className="inline-flex h-auto p-1 bg-muted">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize px-4 py-2"
                >
                  {category.replace(/-/g, " ")}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="capitalize">{category.replace(/-/g, " ")} Features</CardTitle>
                      <CardDescription>
                        Drag and drop features to analyze your content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DragDropContext onDragEnd={(result) => onDragEnd(result, category)}>
                        <Droppable droppableId={`features-${category}`}>
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="space-y-3"
                            >
                              {featuresByCategory[category]?.map((feature, index) => (
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
                                        snapshot.isDragging ? "bg-primary/5 shadow-lg" : "bg-card",
                                        selectedFeature?.id === feature.id ? "border-primary" : "border-muted"
                                      )}
                                      onClick={() => setSelectedFeature(feature)}
                                    >
                                      <div className="flex items-start justify-between">
                                        <div className="flex gap-3">
                                          <div className="mt-0.5 bg-primary/10 p-2 rounded-md">
                                            <Shield className="h-4 w-4 text-primary" />
                                          </div>
                                          <div>
                                            <h3 className="font-medium text-sm">{feature.title}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">
                                              {feature.description}
                                            </p>
                                          </div>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 rounded-full"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedFeature(feature);
                                          }}
                                        >
                                          <Info className="h-4 w-4" />
                                        </Button>
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
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="sticky top-24">
                    <CardHeader>
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
                            <h4 className="font-medium text-sm">Feature: {selectedFeature.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {selectedFeature.description}
                            </p>
                          </div>
                          
                          <FileUpload 
                            accept="*/*" 
                            multiple={true}
                            onChange={handleFileUpload}
                            className="mt-4" 
                          />
                          
                          <div className="pt-2">
                            <Button 
                              disabled={uploadedFiles.length === 0} 
                              className="w-full"
                            >
                              <Search className="mr-2 h-4 w-4" />
                              Analyze Files
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="py-8 text-center text-muted-foreground">
                          <Shield className="mx-auto h-8 w-8 opacity-30 mb-3" />
                          <p>Select a feature to analyze content</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Feature Detail Dialog */}
      {selectedFeature && (
        <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedFeature.title}</DialogTitle>
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
              <div className="flex justify-end">
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

function toast({ title, description }: { title: string; description: string }) {
  console.log(`Toast: ${title} - ${description}`);
  // This is a placeholder for the toast notification system
  // We'd normally use something like sonner or react-toastify
}
