
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Dashboard as DashboardComponent } from "@/components/dashboard/Dashboard";
import { AdvancedFileManager } from "@/components/dashboard/AdvancedFileManager";
import { SearchAndFilter } from "@/components/dashboard/SearchAndFilter";
import { GuidedTutorial } from "@/components/tutorial/GuidedTutorial";
import { FeatureDiscovery } from "@/components/tutorial/FeatureDiscovery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Play, Settings } from "lucide-react";
import { toast } from "sonner";
import { SEOHead } from "@/components/ui/seo-head";
import { AccessibilityHelper } from "@/components/ui/accessibility-helper";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

const DashboardPage = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    if (query) {
      toast.info(`Searching for "${query}"`);
    }
  };

  const handleFilter = (filters: any) => {
    console.log("Applying filters:", filters);
    toast.info("Filters applied");
  };

  const handleSort = (sortBy: string, direction: "asc" | "desc") => {
    console.log("Sorting by:", sortBy, direction);
    toast.info(`Sorted by ${sortBy} (${direction})`);
  };

  const handleBookmark = (id: string) => {
    console.log("Bookmarking:", id);
    toast.success("Added to bookmarks");
  };

  const handleTutorialComplete = () => {
    toast.success("Tutorial completed! Welcome to DeepSentinel!");
  };

  return (
    <>
      <SEOHead 
        title="Dashboard - DeepSentinel"
        description="Manage your analysis history, batch process files, and access advanced deepfake detection tools."
      />
      <AccessibilityHelper />
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main id="main-content" className="flex-grow">
          <div className="container mx-auto px-4 py-6">
            <BreadcrumbNav />
            
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Manage your analysis history and explore features</p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowTutorial(true)} 
                  className="gap-2 hover-lift"
                  aria-label="Start guided tutorial"
                >
                  <Play className="h-4 w-4" />
                  Start Tutorial
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 hover-lift"
                  aria-label="Open settings"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Main Dashboard Content */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4" role="tablist">
                <TabsTrigger value="overview" className="transition-all duration-200">Overview</TabsTrigger>
                <TabsTrigger value="files" className="transition-all duration-200">File Manager</TabsTrigger>
                <TabsTrigger value="search" className="transition-all duration-200">Search & Filter</TabsTrigger>
                <TabsTrigger value="reports" className="transition-all duration-200">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 animate-fade-in">
                {isLoading ? (
                  <LoadingSkeleton type="dashboard" />
                ) : (
                  <DashboardComponent />
                )}
              </TabsContent>

              <TabsContent value="files" className="space-y-6 animate-fade-in">
                <AdvancedFileManager />
              </TabsContent>

              <TabsContent value="search" className="space-y-6 animate-fade-in">
                <SearchAndFilter
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  onSort={handleSort}
                  onBookmark={handleBookmark}
                />
                <DashboardComponent />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6 animate-fade-in">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Reports Coming Soon</h3>
                  <p className="text-muted-foreground">Advanced reporting features will be available in the next update.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
        
        {/* Tutorial and Feature Discovery */}
        <GuidedTutorial
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          onComplete={handleTutorialComplete}
        />
        
        <FeatureDiscovery
          showHints={showHints}
          onToggleHints={() => setShowHints(!showHints)}
        />
      </div>
    </>
  );
};

export default DashboardPage;
