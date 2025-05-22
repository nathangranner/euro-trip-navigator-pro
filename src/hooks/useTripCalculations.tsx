
import { Expense } from "@/components/ExpenseTracker";
import { Purchase } from "@/components/PurchaseTracker";
import { TripDay } from "@/data/tripData";

export const useTripCalculations = (
  expensesByDay: Record<string, Expense[]>,
  purchasesByDay: Record<string, Purchase[]>
) => {
  // Calculate total expenses by currency
  const calculateTotalExpensesByCurrency = () => {
    const totals: Record<string, number> = {
      EUR: 0,
      USD: 0,
      GBP: 0,
      CHF: 0,
    };

    Object.values(expensesByDay).forEach(dayExpenses => {
      dayExpenses.forEach(expense => {
        totals[expense.currency] = (totals[expense.currency] || 0) + expense.amount;
      });
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
      dayPurchases.filter(p => p.forCustoms).forEach(purchase => {
        totals[purchase.currency] = (totals[purchase.currency] || 0) + purchase.price;
      });
    });

    return totals;
  };

  return {
    totalExpenses: calculateTotalExpensesByCurrency(),
    totalPurchases: calculateTotalPurchasesByCurrency(),
  };
};
