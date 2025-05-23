
import React from "react";
import { Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isOnline, getOfflineMode, toggleOfflineMode, processOfflineQueue } from "@/utils/offlineStorageUtils";
import { toast } from "@/components/ui/use-toast";

export const OfflineStatusBar: React.FC = () => {
  const [networkStatus, setNetworkStatus] = React.useState(isOnline());
  const [offlineMode, setOfflineMode] = React.useState(getOfflineMode());
  
  React.useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  
  const handleToggleOfflineMode = () => {
    const newMode = toggleOfflineMode();
    setOfflineMode(newMode);
    
    toast({
      title: newMode ? "Offline Mode Enabled" : "Online Mode Enabled",
      description: newMode 
        ? "App will not attempt to connect to the internet"
        : "App will sync data when connected",
      duration: 3000,
    });
  };
  
  const handleSyncNow = async () => {
    if (!networkStatus) {
      toast({
        title: "Cannot Sync",
        description: "No network connection available",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Syncing...",
      description: "Uploading pending changes",
      duration: 3000,
    });
    
    const success = await processOfflineQueue();
    
    if (success) {
      toast({
        title: "Sync Complete",
        description: "All changes have been synchronized",
        duration: 3000,
      });
    } else {
      toast({
        title: "Sync Failed",
        description: "Some changes could not be synchronized",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white px-4 py-2 flex items-center justify-between shadow-lg z-50">
      <div className="flex items-center space-x-2">
        {networkStatus ? (
          <Wifi className="h-4 w-4 text-green-400" />
        ) : (
          <WifiOff className="h-4 w-4 text-yellow-400" />
        )}
        <span className="text-sm">
          {networkStatus 
            ? offlineMode ? "Connected (Offline Mode)" : "Connected" 
            : "Offline"}
        </span>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          variant={offlineMode ? "default" : "outline"}
          className="text-xs" 
          onClick={handleToggleOfflineMode}
        >
          {offlineMode ? "Go Online" : "Go Offline"}
        </Button>
        
        {networkStatus && !offlineMode && (
          <Button 
            size="sm" 
            variant="outline"
            className="text-xs" 
            onClick={handleSyncNow}
          >
            Sync Now
          </Button>
        )}
      </div>
    </div>
  );
};
