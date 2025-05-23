
import { supabase } from "@/integrations/supabase/client";

// Keys for offline storage
const OFFLINE_QUEUE_KEY = "offline_queue";
const LAST_SYNC_KEY = "last_sync_timestamp";

// Check if the device is currently online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Get the offline operation queue
export const getOfflineQueue = (): Array<{
  type: string;
  data: any;
  timestamp: number;
}> => {
  const stored = localStorage.getItem(OFFLINE_QUEUE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Add operation to offline queue
export const addToOfflineQueue = (operation: {
  type: string;
  data: any;
  timestamp: number;
}): void => {
  const queue = getOfflineQueue();
  queue.push(operation);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
};

// Clear the offline queue
export const clearOfflineQueue = (): void => {
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify([]));
};

// Set the last sync timestamp
export const setLastSyncTimestamp = (): void => {
  localStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
};

// Get the last sync timestamp
export const getLastSyncTimestamp = (): number => {
  const stored = localStorage.getItem(LAST_SYNC_KEY);
  return stored ? parseInt(stored, 10) : 0;
};

// Check if there are pending changes to sync
export const hasPendingChanges = (): boolean => {
  return getOfflineQueue().length > 0;
};

// Process offline queue when connectivity is restored
export const processOfflineQueue = async (): Promise<boolean> => {
  if (!isOnline()) return false;
  
  try {
    const queue = getOfflineQueue();
    if (queue.length === 0) return true;
    
    console.log(`Processing ${queue.length} offline operations...`);
    
    for (const operation of queue) {
      try {
        // Currently we only support trip_update operations
        // which are already stored in localStorage
        switch (operation.type) {
          case "trip_update":
            // Trip data is already in localStorage, no server-side action needed
            console.log("Trip data already updated in localStorage");
            break;
          default:
            console.log(`Skipping operation type: ${operation.type} - not supported for server sync`);
        }
      } catch (err) {
        console.error(`Error processing operation: ${JSON.stringify(operation)}`, err);
        // Continue with next operation rather than failing entire sync
      }
    }
    
    // Clear the queue after processing
    clearOfflineQueue();
    setLastSyncTimestamp();
    return true;
  } catch (err) {
    console.error("Failed to process offline queue:", err);
    return false;
  }
};

// Network status change listeners
export const initOfflineListeners = (): void => {
  window.addEventListener("online", async () => {
    console.log("Network connection restored");
    // Auto-sync when connection is restored
    await processOfflineQueue();
  });
  
  window.addEventListener("offline", () => {
    console.log("Network connection lost");
    // Operations will automatically be queued when offline
  });
};

// Perform offline-compatible data operations
export const offlineDataOperation = async (
  type: string,
  data: any
): Promise<any> => {
  const timestamp = Date.now();
  const operation = { type, data, timestamp };
  
  // If we're offline, queue the operation
  if (!isOnline()) {
    addToOfflineQueue(operation);
    console.log(`Added to offline queue: ${type}`);
    
    // For trip data specifically, no additional action needed
    // as it's already handled by the localStorage utils
    return { data: operation.data, offline: true };
  }
  
  // If we're online, we don't need to do anything special for trip data
  // as it's already stored in localStorage
  return { data, offline: false };
};

// Initialize everything
export const initOfflineSupport = (): void => {
  initOfflineListeners();
  
  // Try to process any pending operations immediately if online
  if (isOnline()) {
    processOfflineQueue().then(success => {
      if (success && hasPendingChanges()) {
        console.log("Successfully processed offline queue");
      }
    });
  }
  
  // Check connectivity status on load
  if (!navigator.onLine) {
    console.log("Application started in offline mode");
  }
};
