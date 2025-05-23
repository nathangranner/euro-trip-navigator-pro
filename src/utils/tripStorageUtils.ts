
import { TripDay } from "@/data/tripData";

// Local storage keys
const TRIP_DAYS_KEY = "europe_trip_days";
const EXPENSES_KEY = "europe_trip_expenses";
const PURCHASES_KEY = "europe_trip_purchases";

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

// These functions are updated to handle dayId parameter
export const saveExpensesForDay = (dayId: string, expenses: any[]) => {
  const allExpenses = loadExpenses();
  allExpenses[dayId] = expenses;
  saveExpenses(allExpenses);
};

export const savePurchasesForDay = (dayId: string, purchases: any[]) => {
  const allPurchases = loadPurchases();
  allPurchases[dayId] = purchases;
  savePurchases(allPurchases);
};

export const loadExpenses = () => {
  const expensesString = localStorage.getItem(EXPENSES_KEY);
  return expensesString ? JSON.parse(expensesString) : {};
};

export const loadPurchases = () => {
  const purchasesString = localStorage.getItem(PURCHASES_KEY);
  return purchasesString ? JSON.parse(purchasesString) : {};
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
