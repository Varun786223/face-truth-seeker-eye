
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ImageAnalysis from "./pages/ImageAnalysis";
import VideoAnalysis from "./pages/VideoAnalysis";
import WebcamAnalysis from "./pages/WebcamAnalysis";
import Report from "./pages/Report";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/image-analysis" element={<ImageAnalysis />} />
          <Route path="/video-analysis" element={<VideoAnalysis />} />
          <Route path="/webcam-analysis" element={<WebcamAnalysis />} />
          <Route path="/report" element={<Report />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
