
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { TripDay } from "@/data/tripData";

const BUCKET_NAME = "trip_images";

// Local storage keys
const TRIP_DAYS_KEY = "europe_trip_days";
const EXPENSES_KEY = "europe_trip_expenses";
const PURCHASES_KEY = "europe_trip_purchases";
const API_KEY_PREFIX = "api_key_";

// Trip data storage and retrieval functions
export const loadStoredData = () => {
  const storedDataString = localStorage.getItem(TRIP_DAYS_KEY);
  const expensesString = localStorage.getItem(EXPENSES_KEY);
  const purchasesString = localStorage.getItem(PURCHASES_KEY);
  
  return {
    tripDays: storedDataString ? JSON.parse(storedDataString) : [],
    expenses: expensesString ? JSON.parse(expensesString) : {},
    purchases: purchasesString ? JSON.parse(purchasesString) : {}
  };
};

export const saveTripDays = (tripDays: TripDay[]) => {
  localStorage.setItem(TRIP_DAYS_KEY, JSON.stringify(tripDays));
};

export const saveExpenses = (expenses: Record<string, any>) => {
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
};

export const savePurchases = (purchases: Record<string, any>) => {
  localStorage.setItem(PURCHASES_KEY, JSON.stringify(purchases));
};

export const loadExpenses = () => {
  const expensesString = localStorage.getItem(EXPENSES_KEY);
  return expensesString ? JSON.parse(expensesString) : {};
};

export const loadPurchases = () => {
  const purchasesString = localStorage.getItem(PURCHASES_KEY);
  return purchasesString ? JSON.parse(purchasesString) : {};
};

// API key management
export const saveApiKey = (service: string, key: string) => {
  localStorage.setItem(`${API_KEY_PREFIX}${service}`, key);
};

export const getApiKey = (service: string): string => {
  return localStorage.getItem(`${API_KEY_PREFIX}${service}`) || "";
};

// Import/Export trip data
export const exportTripData = () => {
  const data = {
    tripDays: loadStoredData().tripDays,
    expenses: loadExpenses(),
    purchases: loadPurchases()
  };
  return JSON.stringify(data);
};

export const importTripData = (jsonData: string) => {
  try {
    const data = JSON.parse(jsonData);
    if (data.tripDays) saveTripDays(data.tripDays);
    if (data.expenses) saveExpenses(data.expenses);
    if (data.purchases) savePurchases(data.purchases);
    return true;
  } catch (error) {
    console.error("Error importing trip data:", error);
    return false;
  }
};

// Uploads a file to Supabase storage and returns the public URL
export const uploadImage = async (
  file: File,
  folder: string = "misc"
): Promise<string | null> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload the file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading file:", error);
      return null;
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadImage:", error);
    return null;
  }
};

// Delete an image from Supabase storage
export const deleteImage = async (imageUrl: string): Promise<boolean> => {
  try {
    // Extract the file path from the URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split("/");
    const bucketNameIndex = pathParts.findIndex(part => part === BUCKET_NAME);
    
    if (bucketNameIndex === -1) {
      console.error("Not a Supabase storage URL");
      return false;
    }
    
    // The path should be everything after the bucket name
    const filePath = pathParts.slice(bucketNameIndex + 1).join("/");
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);
    
    if (error) {
      console.error("Error deleting file:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in deleteImage:", error);
    return false;
  }
};

// Check if URL is from Supabase storage
export const isSupabaseUrl = (url: string): boolean => {
  try {
    return url.includes(BUCKET_NAME);
  } catch {
    return false;
  }
};
