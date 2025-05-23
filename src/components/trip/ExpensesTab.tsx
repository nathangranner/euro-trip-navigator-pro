import React from "react";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TripDay } from "@/types/trip";
import { Expense } from "@/components/ExpenseTracker";
import { 
  ChartContainer as Chart,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { formatCurrency } from "./CurrencyFormatter";

interface ExpensesTabProps {
  expensesByDay: Record<string, Expense[]>;
  tripDays: TripDay[];
}

export const ExpensesTab: React.FC<ExpensesTabProps> = ({ expensesByDay, tripDays }) => {
  // Calculate expenses by category
  const calculateExpensesByCategory = () => {
    const categories: Record<string, number> = {};

    Object.values(expensesByDay).forEach(dayExpenses => {
      dayExpenses.forEach(expense => {
        if (!categories[expense.category]) {
          categories[expense.category] = 0;
        }
        categories[expense.category] += expense.amount;
      });
    });

    return categories;
  };

  const expensesByCategory = calculateExpensesByCategory();

  // Prepare expense chart data
  const expenseChartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  // Chart configuration for categories
  const CHART_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
  
  const chartConfig = expenseChartData.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: CHART_COLORS[index % CHART_COLORS.length],
    };
    return acc;
  }, {});

  return (
    <TabsContent value="expenses">
      {expenseChartData.length > 0 ? (
        <div>
          <Card className="p-4 mb-4">
            <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
            <div className="h-80">
              <Chart config={chartConfig}>
                <PieChart>
                  <Pie
                    data={expenseChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => entry.name}
                  >
                    {expenseChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={CHART_COLORS[index % CHART_COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={<ChartTooltipContent />} 
                  />
                </PieChart>
              </Chart>
            </div>
          </Card>
          
          <div className="space-y-4">
            {Object.entries(expensesByDay).map(([dayId, expenses]) => {
              if (expenses.length === 0) return null;
              const dayNumber = parseInt(dayId.split('-')[1]);
              const day = tripDays.find(d => d.dayNumber === dayNumber);
              
              return (
                <Card key={dayId} className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Day {dayNumber}: {day?.city}
                  </h3>
                  <div className="space-y-2">
                    {expenses.map((expense, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{expense.description}</span>
                          <span className="text-gray-500 text-sm ml-2">({expense.category})</span>
                        </div>
                        <div className="font-medium">
                          {formatCurrency(expense.amount, expense.currency)}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No expenses recorded yet.</p>
        </Card>
      )}
    </TabsContent>
  );
};
