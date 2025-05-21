
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Save, Euro } from "lucide-react";
import { toast } from "sonner";

export type Expense = {
  id: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
  date: string;
};

interface ExpenseTrackerProps {
  dayId: number;
  date: string;
  initialExpenses?: Expense[];
  onSave: (expenses: Expense[]) => void;
}

export const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ 
  dayId, 
  date, 
  initialExpenses = [],
  onSave 
}) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
    amount: 0,
    currency: "EUR",
    category: "food",
    description: "",
    date: date,
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddExpense = () => {
    if (newExpense.amount <= 0 || !newExpense.description) {
      toast.error("Please enter an amount and description");
      return;
    }

    const expense: Expense = {
      ...newExpense,
      id: `expense-${dayId}-${Date.now()}`,
    };

    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    onSave(updatedExpenses);
    
    // Reset form
    setNewExpense({
      amount: 0,
      currency: "EUR",
      category: "food",
      description: "",
      date: date,
    });
    
    setShowAddForm(false);
    toast.success("Expense added successfully");
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    onSave(updatedExpenses);
    toast.success("Expense deleted");
  };

  // Helper function to calculate total by currency
  const calculateTotalByCurrency = (currency: string) => {
    return expenses
      .filter(expense => expense.currency === currency)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const categoryOptions = [
    { value: "food", label: "Food & Dining" },
    { value: "gas", label: "Gas & Fuel" },
    { value: "accommodation", label: "Accommodation" },
    { value: "shopping", label: "Shopping" },
    { value: "attractions", label: "Attractions" },
    { value: "transportation", label: "Transportation" },
    { value: "other", label: "Other" },
  ];

  const currencyOptions = [
    { value: "EUR", label: "€ (EUR)" },
    { value: "USD", label: "$ (USD)" },
    { value: "GBP", label: "£ (GBP)" },
    { value: "CHF", label: "CHF" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center">
          <Euro className="h-5 w-5 mr-2" /> Expenses
        </h3>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          size="sm"
          variant={showAddForm ? "outline" : "default"}
        >
          {showAddForm ? <X className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
          {showAddForm ? "Cancel" : "Add Expense"}
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newExpense.amount === 0 ? "" : newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={newExpense.currency}
                  onValueChange={(value) => setNewExpense({ ...newExpense, currency: value })}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newExpense.category}
                onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                placeholder="e.g. Dinner at Restaurant"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button onClick={handleAddExpense} className="flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Expense
              </Button>
            </div>
          </div>
        </Card>
      )}

      {expenses.length > 0 ? (
        <>
          <div className="space-y-4">
            <div className="grid gap-2">
              {expenses.map((expense) => (
                <Card key={expense.id} className="p-3 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="font-medium">{expense.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {categoryOptions.find(c => c.value === expense.category)?.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-semibold">
                      {expense.currency === "EUR" && "€"}
                      {expense.currency === "USD" && "$"}
                      {expense.currency === "GBP" && "£"}
                      {expense.currency === "CHF" && "CHF "}
                      {expense.amount.toFixed(2)}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="font-semibold">Totals:</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["EUR", "USD", "GBP", "CHF"].map((currency) => {
                const total = calculateTotalByCurrency(currency);
                if (total > 0) {
                  return (
                    <div key={currency} className="flex justify-between">
                      <span>{currency}:</span>
                      <span className="font-medium">
                        {currency === "EUR" && "€"}
                        {currency === "USD" && "$"}
                        {currency === "GBP" && "£"}
                        {currency === "CHF" && "CHF "}
                        {total.toFixed(2)}
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </>
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          <p>No expenses recorded for this day.</p>
          <Button className="mt-2" size="sm" onClick={() => setShowAddForm(true)}>Add your first expense</Button>
        </Card>
      )}
    </div>
  );
};
