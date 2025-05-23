
import { useMemo } from "react";
import { TripDay } from "@/types/trip";
import { loadExpenses, loadPurchases } from "@/utils/storageUtils";

interface ExpenseItem {
  amount: number;
  currency: string;
  category: string;
  description: string;
}

interface PurchaseItem {
  price: number;
  currency: string;
  forCustoms: boolean;
}

export const useTripCalculations = (tripDays: TripDay[]) => {
  // Load expenses and purchases from storage
  const expensesByDay = loadExpenses();
  const purchasesByDay = loadPurchases();

  // Memoize calculations for performance
  const calculations = useMemo(() => {
    // Calculate total budget from accommodations
    const totalBudget = tripDays.reduce((total, day) => {
      if (day.accommodationPrice) {
        return total + day.accommodationPrice;
      }
      return total;
    }, 5000); // Base budget estimate

    // Calculate total expenses by currency
    const calculateTotalExpensesByCurrency = () => {
      const totals: Record<string, number> = {
        EUR: 0,
        USD: 0,
        GBP: 0,
        CHF: 0,
      };

      Object.values(expensesByDay).forEach(dayExpenses => {
        if (Array.isArray(dayExpenses)) {
          dayExpenses.forEach((expense: ExpenseItem) => {
            totals[expense.currency] = (totals[expense.currency] || 0) + expense.amount;
          });
        }
      });

      return totals;
    };

    // Calculate total purchases for customs by currency
    const calculateTotalPurchasesByCurrency = () => {
      const totals: Record<string, number> = {
        EUR: 0,
        USD: 0,
        GBP: 0,
        CHF: 0,
      };

      Object.values(purchasesByDay).forEach(dayPurchases => {
        if (Array.isArray(dayPurchases)) {
          dayPurchases
            .filter((p: PurchaseItem) => p.forCustoms)
            .forEach((purchase: PurchaseItem) => {
              totals[purchase.currency] = (totals[purchase.currency] || 0) + purchase.price;
            });
        }
      });

      return totals;
    };

    const totalExpenses = calculateTotalExpensesByCurrency();
    const totalPurchases = calculateTotalPurchasesByCurrency();
    
    // Calculate remaining budget (simplified - using EUR as primary currency)
    const remainingBudget = totalBudget - (totalExpenses.EUR || 0);
    
    // Calculate completed days
    const completedDays = tripDays.filter(day => 
      day.activities?.some(activity => activity.completed)
    ).length;

    return {
      totalBudget,
      totalExpenses,
      totalPurchases,
      remainingBudget,
      totalDays: tripDays.length,
      completedDays,
      expensesByDay,
      purchasesByDay,
    };
  }, [tripDays, expensesByDay, purchasesByDay]);

  return calculations;
};
