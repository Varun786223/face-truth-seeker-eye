
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Feature } from "@/types/features";

export function DragDropFeatureGrid({ features }: { features: Feature[] }) {
  const [items, setItems] = useState(features);
  const [expandedFeature, setExpandedFeature] = useState<Feature | null>(null);
  
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const newItems = [...items];
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);
    
    setItems(newItems);
  };
  
  const handleFeatureClick = (feature: Feature) => {
    setExpandedFeature(feature);
  };
  
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="features" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((feature, index) => (
                <Draggable key={feature.id} draggableId={feature.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-transform duration-200 ${
                        snapshot.isDragging ? "scale-105 shadow-lg z-50" : ""
                      }`}
                      onClick={() => handleFeatureClick(feature)}
                    >
                      <Card className="h-full cursor-grab hover:shadow-md overflow-hidden border border-muted">
                        <CardHeader className="pb-3 bg-muted/30">
                          <div className="flex justify-between items-start">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                              {getIconForFeature(feature.id)}
                            </div>
                            <Dialog>
                              <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Info className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>{feature.title}</DialogTitle>
                                  <DialogDescription className="pt-2">
                                    {feature.description}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium text-sm">Problem Solved:</h4>
                                    <p className="text-sm text-muted-foreground">{feature.problem}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm">Revenue Model:</h4>
                                    <p className="text-sm text-muted-foreground">{feature.revenue}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <CardTitle className="text-base">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-xs">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {expandedFeature && (
        <Dialog open={!!expandedFeature} onOpenChange={() => setExpandedFeature(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{expandedFeature.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{expandedFeature.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Problem Solved</h3>
                  <p className="text-muted-foreground">{expandedFeature.problem}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Revenue Model</h3>
                  <p className="text-muted-foreground">{expandedFeature.revenue}</p>
                </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
                <h3 className="font-medium mb-2">How It Works</h3>
                <p className="text-muted-foreground">
                  {expandedFeature.howItWorks || "Advanced AI algorithms analyze content to detect manipulation patterns and synthetic artifacts."}
                </p>
              </div>

              <div className="flex justify-end">
                <Button asChild>
                  <a href={`/feature/${expandedFeature.id}`}>Try This Feature</a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

function getIconForFeature(featureId: string) {
  // This would ideally map to specific icons per feature type
  // For now we'll use generic lucide icons based on the feature id
  const iconMap: Record<string, JSX.Element> = {
    // Icons for detection features
    "dna-sequence-validation": <span className="text-lg">🧬</span>,
    "quantum-hash-timestamping": <span className="text-lg">⏱️</span>,
    "neural-implant-authentication": <span className="text-lg">🧠</span>,
    "synthetic-olfactory-detection": <span className="text-lg">👃</span>,
    "climate-data-forgery-audit": <span className="text-lg">☁️</span>,
    
    // Default for all other features
    "default": <span className="text-lg">🛡️</span>,
  };
  
  return iconMap[featureId] || iconMap["default"];
}
