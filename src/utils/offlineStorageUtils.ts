import { supabase } from "@/integrations/supabase/client";

// Keys for offline storage
const OFFLINE_MODE_KEY = "offline_mode";
const OFFLINE_QUEUE_KEY = "offline_queue";
const LAST_SYNC_KEY = "last_sync_timestamp";

// Check if the device is currently online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Toggle offline mode manually (user preference)
export const toggleOfflineMode = (forceOffline?: boolean): boolean => {
  const currentMode = getOfflineMode();
  const newMode = forceOffline !== undefined ? forceOffline : !currentMode;
  localStorage.setItem(OFFLINE_MODE_KEY, JSON.stringify(newMode));
  return newMode;
};

// Get current offline mode status
export const getOfflineMode = (): boolean => {
  const stored = localStorage.getItem(OFFLINE_MODE_KEY);
  return stored ? JSON.parse(stored) : false;
};

// Add operation to offline queue
export const addToOfflineQueue = (operation: {
  type: string;
  table: string;
  data: any;
  timestamp: number;
}): void => {
  const queue = getOfflineQueue();
  queue.push(operation);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
};

// Get the offline operation queue
export const getOfflineQueue = (): Array<{
  type: string;
  table: string;
  data: any;
  timestamp: number;
}> => {
  const stored = localStorage.getItem(OFFLINE_QUEUE_KEY);
  return stored ? JSON.parse(stored) : [];
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

// Process offline queue when connectivity is restored
export const processOfflineQueue = async (): Promise<boolean> => {
  if (!isOnline()) return false;
  
  try {
    const queue = getOfflineQueue();
    if (queue.length === 0) return true;
    
    console.log(`Processing ${queue.length} offline operations...`);
    
    for (const operation of queue) {
      try {
        switch (operation.type) {
          case "insert":
            await supabase.from(operation.table).insert(operation.data);
            break;
          case "update":
            if (operation.data.id) {
              await supabase
                .from(operation.table)
                .update(operation.data)
                .eq("id", operation.data.id);
            }
            break;
          case "delete":
            if (operation.data.id) {
              await supabase
                .from(operation.table)
                .delete()
                .eq("id", operation.data.id);
            }
            break;
          case "trip_update":
            // Special case for trip data which is stored in localStorage
            // No server-side action needed as it's already in localStorage
            break;
          default:
            console.warn(`Unknown operation type: ${operation.type}`);
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
    if (!getOfflineMode()) {
      // Only auto-sync if user hasn't manually enabled offline mode
      await processOfflineQueue();
    }
  });
  
  window.addEventListener("offline", () => {
    console.log("Network connection lost");
    // We don't need to do anything special here,
    // as operations will automatically be queued when offline
  });
};

// Perform offline-compatible data operations
export const offlineDataOperation = async (
  type: string,
  table: string,
  data: any
): Promise<any> => {
  const timestamp = Date.now();
  const operation = { type, table, data, timestamp };
  
  // If we're offline or in offline mode, queue the operation
  if (!isOnline() || getOfflineMode()) {
    addToOfflineQueue(operation);
    console.log(`Added to offline queue: ${type} on ${table}`);
    
    // For trip data specifically, we update localStorage directly
    if (table === "trip_days" || table.includes("trip")) {
      // This is handled by the existing localStorage utils
      return { data: operation.data, offline: true };
    }
    
    return { offline: true };
  }
  
  // Otherwise perform the operation online
  try {
    let result;
    switch (type) {
      case "insert":
        result = await supabase.from(table).insert(data).select();
        break;
      case "update":
        result = await supabase
          .from(table)
          .update(data)
          .eq("id", data.id)
          .select();
        break;
      case "delete":
        result = await supabase
          .from(table)
          .delete()
          .eq("id", data.id)
          .select();
        break;
      default:
        throw new Error(`Unknown operation type: ${type}`);
    }
    
    return { ...result, offline: false };
  } catch (err) {
    console.error(`Failed to perform online operation: ${type} on ${table}`, err);
    // Fall back to offline queue on error
    addToOfflineQueue(operation);
    return { error: err, offline: true };
  }
};

// Initialize everything
export const initOfflineSupport = (): void => {
  initOfflineListeners();
  
  // Try to process any pending operations immediately
  if (isOnline() && !getOfflineMode()) {
    processOfflineQueue().then(success => {
      if (success) {
        console.log("Successfully processed offline queue");
      }
    });
  }
  
  // Check connectivity status on load
  if (!navigator.onLine) {
    console.log("Application started in offline mode");
  }
};
