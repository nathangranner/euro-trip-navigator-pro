
import { TripDay, TripData } from "@/data/tripData";
import { Expense } from "@/components/ExpenseTracker";
import { Purchase } from "@/components/PurchaseTracker";

interface StoredData {
  tripDays?: TripDay[];
  expenses?: Record<string, Expense[]>;
  purchases?: Record<string, Purchase[]>;
  apiKeys?: Record<string, string>;
}

const STORAGE_KEY = "europe-trip-data";

export const loadStoredData = (): StoredData => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData) as StoredData;
    }
  } catch (error) {
    console.error("Error loading stored data:", error);
  }
  
  return {};
};

export const saveStoredData = (data: StoredData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to storage:", error);
  }
};

export const saveTripDays = (tripDays: TripDay[]): void => {
  const storedData = loadStoredData();
  saveStoredData({ ...storedData, tripDays });
};

export const saveExpenses = (dayId: string, expenses: Expense[]): void => {
  const storedData = loadStoredData();
  const updatedExpenses = { ...(storedData.expenses || {}), [dayId]: expenses };
  saveStoredData({ ...storedData, expenses: updatedExpenses });
};

export const savePurchases = (dayId: string, purchases: Purchase[]): void => {
  const storedData = loadStoredData();
  const updatedPurchases = { ...(storedData.purchases || {}), [dayId]: purchases };
  saveStoredData({ ...storedData, purchases: updatedPurchases });
};

export const loadExpenses = (dayId: string): Expense[] => {
  const storedData = loadStoredData();
  return storedData.expenses?.[dayId] || [];
};

export const loadPurchases = (dayId: string): Purchase[] => {
  const storedData = loadStoredData();
  return storedData.purchases?.[dayId] || [];
};

export const exportTripData = (): string => {
  const data = loadStoredData();
  return JSON.stringify(data, null, 2);
};

export const importTripData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString) as StoredData;
    saveStoredData(data);
    return true;
  } catch (error) {
    console.error("Error importing data:", error);
    return false;
  }
};

export const saveApiKey = (service: string, key: string): void => {
  const storedData = loadStoredData();
  const updatedApiKeys = { ...(storedData.apiKeys || {}), [service]: key };
  saveStoredData({ ...storedData, apiKeys: updatedApiKeys });
};

export const getApiKey = (service: string): string | null => {
  const storedData = loadStoredData();
  return storedData.apiKeys?.[service] || null;
};
