
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// Pages
import Index from "./pages/Index";
import ImageAnalysis from "./pages/ImageAnalysis";
import VideoAnalysis from "./pages/VideoAnalysis";
import WebcamAnalysis from "./pages/WebcamAnalysis";
import BlockchainFeatures from "./pages/BlockchainFeatures";
import Report from "./pages/Report";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import FeaturePage from "./pages/FeaturePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="deepsential-theme">
      <TooltipProvider>
        <div className="min-h-screen w-full">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/image-analysis" element={<ImageAnalysis />} />
              <Route path="/video-analysis" element={<VideoAnalysis />} />
              <Route path="/webcam-analysis" element={<WebcamAnalysis />} />
              <Route path="/blockchain" element={<BlockchainFeatures />} />
              <Route path="/report" element={<Report />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/feature/:id" element={<FeaturePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
