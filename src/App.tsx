import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TripSummary from "./pages/TripSummary";
import TravelConciergePage from "./pages/TravelConciergePage";
import { EuropeTripPlanner } from "./components/EuropeTripPlanner";
import NavHome from "./components/NavHome";
import { initOfflineSupport, isOnline } from "./utils/offlineStorageUtils";
import { toast } from "./components/ui/use-toast";
import { OfflineStatusBar } from "./components/OfflineStatusBar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't retry if we're offline
      retry: (failureCount, error) => {
        // Don't retry more than 3 times
        if (failureCount > 3) return false;
        // Don't retry if we're offline
        if (!isOnline()) return false;
        return true;
      },
      // Keep data fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache data for 1 hour
      gcTime: 60 * 60 * 1000,
    },
  },
});

const App = () => {
  const [offlineReady, setOfflineReady] = useState(false);
  
  useEffect(() => {
    // Initialize offline support
    initOfflineSupport();
    setOfflineReady(true);
    
    // Set up network status listeners for UI feedback
    const handleOnline = () => {
      toast({
        title: "Back Online",
        description: "Your connection has been restored. Changes will sync automatically.",
        duration: 3000,
      });
    };
    
    const handleOffline = () => {
      toast({
        title: "You're Offline",
        description: "App is running in offline mode. Changes will sync when you reconnect.",
        duration: 5000,
      });
    };
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    // Show initial status
    if (!navigator.onLine) {
      toast({
        title: "Offline Mode",
        description: "App started in offline mode. Some features may be limited.",
        duration: 5000,
      });
    }
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/planner" element={<>
              <NavHome />
              <EuropeTripPlanner />
            </>} />
            <Route path="/summary" element={<>
              <NavHome />
              <TripSummary />
            </>} />
            <Route path="/travel-concierge" element={<>
              <NavHome />
              <TravelConciergePage />
            </>} />
            <Route path="/travel-buddy" element={<>
              <NavHome />
              <TravelConciergePage />
            </>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <OfflineStatusBar />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
